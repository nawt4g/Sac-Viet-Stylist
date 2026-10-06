/**
 * scripts/sync-images.mjs
 * =======================
 * Script quét toàn bộ thư mục public/images/ (đệ quy)
 * Nhận diện các file ảnh định dạng .png, .jpg, .jpeg, .webp
 * Ghi kết quả khả dụng vào src/data/imageAvailability.json
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT_DIR = path.resolve(__dirname, "..");
const IMAGES_DIR = path.join(ROOT_DIR, "public", "images");
const OUTPUT_FILE = path.join(ROOT_DIR, "src", "data", "imageAvailability.json");

const SUPPORTED_EXTENSIONS = new Set([".png", ".jpg", ".jpeg", ".webp"]);

/**
 * Đệ quy quét thư mục tìm tất cả các file ảnh hỗ trợ
 */
function scanDirectory(dir, baseDir = dir) {
  const results = [];
  if (!fs.existsSync(dir)) {
    return results;
  }

  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      results.push(...scanDirectory(fullPath, baseDir));
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      if (SUPPORTED_EXTENSIONS.has(ext)) {
        const relativeToImages = path
          .relative(baseDir, fullPath)
          .replace(/\\/g, "/");
        const nameWithoutExt = path.parse(entry.name).name;
        const stats = fs.statSync(fullPath);

        results.push({
          id: nameWithoutExt,
          name: entry.name,
          extension: ext,
          relativePath: relativeToImages,
          publicPath: `/images/${relativeToImages}`,
          sizeBytes: stats.size,
          lastModified: stats.mtime.toISOString(),
        });
      }
    }
  }

  return results;
}

function syncImages() {
  console.log(`[sync-images] Bắt đầu quét thư mục: ${IMAGES_DIR}`);

  if (!fs.existsSync(IMAGES_DIR)) {
    console.warn(`[sync-images] Thư mục ${IMAGES_DIR} chưa tồn tại. Đang tạo...`);
    fs.mkdirSync(IMAGES_DIR, { recursive: true });
  }

  const foundImages = scanDirectory(IMAGES_DIR);
  console.log(`[sync-images] Tìm thấy ${foundImages.length} file ảnh.`);

  // Xây dựng map tra cứu khả dụng
  const availableMap = {};
  for (const img of foundImages) {
    // Tra cứu theo id (tên file không đuôi): "ao-dai" -> true
    availableMap[img.id] = true;
    // Tra cứu theo đường dẫn tương đối: "flatlay/ao-dai" -> true
    const relativeNoExt = img.relativePath.replace(/\.[^/.]+$/, "");
    availableMap[relativeNoExt] = true;
    // Tra cứu theo full public path: "/images/flatlay/ao-dai.png" -> true
    availableMap[img.publicPath] = true;
    availableMap[`/images/${relativeNoExt}`] = true;
  }

  const outputData = {
    scannedAt: new Date().toISOString(),
    totalFound: foundImages.length,
    availableMap,
    images: foundImages,
  };

  // Đảm bảo thư mục đích tồn tại
  const outputDir = path.dirname(OUTPUT_FILE);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(outputData, null, 2), "utf-8");
  console.log(`[sync-images] Đã lưu kết quả thành công vào: ${OUTPUT_FILE}`);
  console.log(`[sync-images] Danh sách ảnh khả dụng:`);
  for (const img of foundImages) {
    console.log(`  ✓ [${img.extension}] ${img.publicPath} (${(img.sizeBytes / 1024).toFixed(1)} KB)`);
  }
}

syncImages();

