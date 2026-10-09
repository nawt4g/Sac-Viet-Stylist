import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const heroPath = path.join(rootDir, "public", "hero-editorial.png");
const ogPath = path.join(rootDir, "public", "og-image.png");

async function main() {
  const width = 1200;
  const height = 630;

  // Create an elegant SVG banner overlay
  const overlaySvg = Buffer.from(`
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="scrim" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#FAF8F5" stop-opacity="0.95"/>
          <stop offset="45%" stop-color="#FAF8F5" stop-opacity="0.85"/>
          <stop offset="70%" stop-color="#FAF8F5" stop-opacity="0.3"/>
          <stop offset="100%" stop-color="#FAF8F5" stop-opacity="0"/>
        </linearGradient>
      </defs>
      <rect width="${width}" height="${height}" fill="url(#scrim)"/>
      <rect x="40" y="40" width="${width - 80}" height="${height - 80}" fill="none" stroke="#D4AF37" stroke-width="2" stroke-opacity="0.5" rx="16"/>
      
      <!-- Brand badge -->
      <rect x="70" y="70" width="160" height="32" rx="16" fill="#9E2A2B"/>
      <text x="150" y="91" font-family="sans-serif" font-size="12" font-weight="bold" fill="#FFFFFF" text-anchor="middle" letter-spacing="2">VIỆT PHỤC REMIX</text>
      
      <!-- Typography -->
      <text x="70" y="190" font-family="serif" font-size="52" font-weight="bold" fill="#1E3A5F">Sắc Việt Stylist</text>
      <text x="70" y="250" font-family="serif" font-size="34" font-style="italic" fill="#9E2A2B">Mặc Việt. Theo cách của bạn.</text>
      
      <text x="70" y="320" font-family="sans-serif" font-size="18" fill="#4A6A8F">Nền tảng AI tư vấn phối cổ phục Việt Nam đương đại</text>
      <text x="70" y="350" font-family="sans-serif" font-size="16" fill="#6B7280">Áo Ngũ Thân · Áo Tấc · Áo Nhật Bình · Áo Tứ Thân · Áo Dài</text>

      <!-- URL Badge -->
      <rect x="70" y="490" width="160" height="40" rx="8" fill="#1E3A5F"/>
      <text x="150" y="515" font-family="sans-serif" font-size="14" font-weight="bold" fill="#FFFFFF" text-anchor="middle">sacviet.ai</text>
    </svg>
  `);

  if (fs.existsSync(heroPath)) {
    // Resize hero image to fill right half of the 1200x630 canvas
    const heroResized = await sharp(heroPath)
      .resize(1200, 630, { fit: "cover", position: "right top" })
      .toBuffer();

    await sharp(heroResized)
      .composite([{ input: overlaySvg, top: 0, left: 0 }])
      .png({ quality: 90 })
      .toFile(ogPath);
  } else {
    // Generate solid background with SVG if hero does not exist
    await sharp({
      create: {
        width,
        height,
        channels: 4,
        background: { r: 250, g: 248, b: 245, alpha: 1 },
      },
    })
      .composite([{ input: overlaySvg, top: 0, left: 0 }])
      .png()
      .toFile(ogPath);
  }

  console.log("Generated og-image.png (1200x630) at", ogPath);
}

main().catch((err) => {
  console.error("Error generating og-image:", err);
  process.exit(1);
});

