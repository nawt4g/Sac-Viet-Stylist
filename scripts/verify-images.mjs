import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const srcDir = path.join(rootDir, "src");
const publicDir = path.join(rootDir, "public");

// Regex to capture image paths like "/images/..." or "/og-image.png", etc.
const IMAGE_PATH_REGEX = /["'`]((\/(?:images|fonts)[^"'`\s]+?\.(?:png|jpg|jpeg|webp|svg|woff2))|\/([a-zA-Z0-9_-]+?\.(?:png|jpg|jpeg|webp|svg)))["'`]/g;

function getFilesRecursively(dir, extensions = [".ts", ".tsx", ".js", ".mjs", ".json"]) {
  const results = [];
  if (!fs.existsSync(dir)) return results;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...getFilesRecursively(fullPath, extensions));
    } else if (entry.isFile() && extensions.some((ext) => entry.name.endsWith(ext))) {
      results.push(fullPath);
    }
  }
  return results;
}

function verifyImages() {
  console.log("==> Đang kiểm tra các đường dẫn tài nguyên tĩnh trong src/ ...");
  const files = getFilesRecursively(srcDir);
  const foundPaths = new Map(); // path -> Array of { file, line }

  for (const file of files) {
    // Skip imageAvailability.json since it's an auto-generated index of existing files
    if (file.endsWith("imageAvailability.json")) continue;

    const content = fs.readFileSync(file, "utf8");
    const lines = content.split("\n");

    lines.forEach((line, lineIndex) => {
      let match;
      IMAGE_PATH_REGEX.lastIndex = 0;
      while ((match = IMAGE_PATH_REGEX.exec(line)) !== null) {
        const imagePath = match[1];
        // Ignore external URLs or variable patterns
        if (imagePath.startsWith("http") || imagePath.includes("${")) continue;
        
        if (!foundPaths.has(imagePath)) {
          foundPaths.set(imagePath, []);
        }
        foundPaths.get(imagePath).push({
          file: path.relative(rootDir, file),
          line: lineIndex + 1,
        });
      }
    });
  }

  let hasError = false;
  let totalChecked = 0;

  console.log(`Tìm thấy ${foundPaths.size} đường dẫn tài nguyên độc nhất trong code:`);

  for (const [assetPath, locations] of foundPaths.entries()) {
    totalChecked++;
    const diskPath = path.join(publicDir, assetPath.replace(/^\//, ""));
    const exists = fs.existsSync(diskPath);

    if (!exists) {
      hasError = true;
      console.error(`❌ THIẾU TỆP: ${assetPath}`);
      locations.forEach((loc) => {
        console.error(`   -> Tại ${loc.file}:${loc.line}`);
      });
    } else {
      console.log(`✓ [OK] ${assetPath}`);
    }
  }

  console.log(`\nTổng kết: Đã kiểm tra ${totalChecked} đường dẫn.`);
  if (hasError) {
    console.error("❌ Phát hiện đường dẫn ảnh không tồn tại trong public/!");
    process.exit(1);
  } else {
    console.log("✅ Tất cả các đường dẫn ảnh trong src/ đều tồn tại hợp lệ trong public/!");
  }
}

verifyImages();

