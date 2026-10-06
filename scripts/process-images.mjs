/**
 * scripts/process-images.mjs
 * ==========================
 * Xử lý hình ảnh từ thư mục nguồn assets-src/approved/*
 *   - Định dạng đầu ra: WebP, chất lượng 80
 *   - Resize theo quy chuẩn hệ thống:
 *       • looks: 1200x1600 (3:4 aspect ratio)
 *       • scenes: 1600x1200 (4:3 aspect ratio)
 *       • accessories: 800x800 (1:1 square)
 *       • flatlay: 800x800 (1:1 square)
 *   - Ghi kết quả vào public/images/<loại>/
 *   - Kích hoạt đồng bộ hóa Image Manifest sau khi hoàn tất.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT_DIR = path.resolve(__dirname, "..");
const SOURCE_DIR = path.join(ROOT_DIR, "assets-src", "approved");
const OUTPUT_BASE = path.join(ROOT_DIR, "public", "images");

// Khởi tạo thư mục nguồn nếu chưa tồn tại
if (!fs.existsSync(SOURCE_DIR)) {
  fs.mkdirSync(SOURCE_DIR, { recursive: true });
  fs.writeFileSync(
    path.join(SOURCE_DIR, "README.md"),
    "# Thư mục ảnh nguồn đã duyệt (assets-src/approved)\n\nThả các file ảnh gốc (.png, .jpg, .webp) vào đây.\nSau đó chạy: npm run images:process\n"
  );
  console.log(`[images:process] Đã khởi tạo thư mục nguồn: ${SOURCE_DIR}`);
}

// Đảm bảo các thư mục đích trong public/images/ luôn tồn tại
const TARGET_DIRS = {
  looks: path.join(OUTPUT_BASE, "looks"),
  scenes: path.join(OUTPUT_BASE, "scenes"),
  accessories: path.join(OUTPUT_BASE, "accessories"),
  flatlay: path.join(OUTPUT_BASE, "flatlay"),
};

for (const dir of Object.values(TARGET_DIRS)) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// Kiểm tra thư viện sharp
let sharp;
try {
  const sharpModule = await import("sharp");
  sharp = sharpModule.default;
} catch (err) {
  console.error("Lỗi: Không tìm thấy thư viện 'sharp'. Vui lòng cài đặt qua 'npm install sharp'.", err);
  process.exit(1);
}

const SUPPORTED_INPUT_EXTS = new Set([".png", ".jpg", ".jpeg", ".webp", ".avif"]);

/**
 * Đọc toàn bộ ảnh từ thư mục nguồn
 */
function getSourceFiles(dir) {
  const files = [];
  if (!fs.existsSync(dir)) return files;

  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...getSourceFiles(fullPath));
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      if (SUPPORTED_INPUT_EXTS.has(ext)) {
        files.push(fullPath);
      }
    }
  }
  return files;
}

/**
 * Phân loại loại ảnh dựa trên đường dẫn hoặc tiền tố file
 */
function classifyImage(filePath) {
  const relative = path.relative(SOURCE_DIR, filePath).replace(/\\/g, "/");
  const fileName = path.parse(filePath).name.toLowerCase();

  if (relative.startsWith("scenes/") || fileName.startsWith("scene-")) {
    return {
      type: "scenes",
      width: 1600,
      height: 1200,
      fit: "cover",
    };
  }

  if (
    relative.startsWith("accessories/") ||
    relative.startsWith("acc/") ||
    fileName.startsWith("acc-") ||
    fileName.startsWith("accessory-")
  ) {
    return {
      type: "accessories",
      width: 800,
      height: 800,
      fit: "cover",
    };
  }

  if (relative.startsWith("flatlay/") || fileName.startsWith("flatlay-") || fileName.startsWith("ao-")) {
    return {
      type: "flatlay",
      width: 1200,
      height: 1600,
      fit: "cover",
      position: "top",
    };
  }

  // Mặc định là looks (người mẫu phối đồ)
  return {
    type: "looks",
    width: 1200,
    height: 1600,
    fit: "cover",
    position: "top",
  };
}

async function run() {
  console.log("=== SẮC VIỆT STYLIST: XỬ LÝ HÌNH ẢNH (sharp) ===");
  const files = getSourceFiles(SOURCE_DIR);

  if (files.length === 0) {
    console.log(`[images:process] Chưa có ảnh trong ${SOURCE_DIR}. Vui lòng thả ảnh nguồn vào và chạy lại.`);
    return;
  }

  console.log(`[images:process] Tìm thấy ${files.length} ảnh nguồn cần xử lý.`);
  let processedCount = 0;

  for (const filePath of files) {
    const config = classifyImage(filePath);
    const parsed = path.parse(filePath);
    const baseName = parsed.name;
    const destDir = TARGET_DIRS[config.type] || TARGET_DIRS.looks;
    const destFile = path.join(destDir, `${baseName}.webp`);

    try {
      let pipeline = sharp(filePath);

      pipeline = pipeline.resize(config.width, config.height, {
        fit: config.fit,
        position: config.position || "center",
        background: config.background,
      });

      pipeline = pipeline.webp({ quality: 80 });

      await pipeline.toFile(destFile);
      processedCount++;
      console.log(` ✓ [${config.type}] ${parsed.base} -> ${path.relative(ROOT_DIR, destFile)}`);
    } catch (err) {
      console.error(` ✗ Lỗi khi xử lý file ${filePath}:`, err.message);
    }
  }

  console.log(`[images:process] Hoàn tất xử lý ${processedCount}/${files.length} ảnh.`);

  // Đồng bộ lại manifest
  console.log("[images:process] Đang kích hoạt đồng bộ hóa Image Manifest...");
  try {
    const { syncImages } = await import("./sync-images.mjs");
    if (typeof syncImages === "function") {
      syncImages();
    }
  } catch {
    // Nếu sync-images.mjs chạy trực tiếp khi import
  }
}

run().catch((err) => {
  console.error("[images:process] Lỗi không xử lý được:", err);
  process.exit(1);
});

