import fs from "fs";
import path from "path";
import https from "https";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fontsDir = path.join(__dirname, "..", "src", "fonts");
if (!fs.existsSync(fontsDir)) {
  fs.mkdirSync(fontsDir, { recursive: true });
}

const FONTS_TO_DOWNLOAD = [
  {
    name: "BeVietnamPro-Light.woff2",
    url: "https://fonts.gstatic.com/s/bevietnampro/v12/QdVMSTAyLFyeg_IDWvOJmVES_HScJ281Rb0.woff2",
  },
  {
    name: "BeVietnamPro-Regular.woff2",
    url: "https://fonts.gstatic.com/s/bevietnampro/v12/QdVPSTAyLFyeg_IDWvOJmVES_Hw3BXo.woff2",
  },
  {
    name: "BeVietnamPro-Medium.woff2",
    url: "https://fonts.gstatic.com/s/bevietnampro/v12/QdVMSTAyLFyeg_IDWvOJmVES_HTEJm81Rb0.woff2",
  },
  {
    name: "BeVietnamPro-SemiBold.woff2",
    url: "https://fonts.gstatic.com/s/bevietnampro/v12/QdVMSTAyLFyeg_IDWvOJmVES_HToIW81Rb0.woff2",
  },
  {
    name: "BeVietnamPro-Bold.woff2",
    url: "https://fonts.gstatic.com/s/bevietnampro/v12/QdVMSTAyLFyeg_IDWvOJmVES_HSMIG81Rb0.woff2",
  },
  {
    name: "BeVietnamPro-ExtraBold.woff2",
    url: "https://fonts.gstatic.com/s/bevietnampro/v12/QdVMSTAyLFyeg_IDWvOJmVES_HSQI281Rb0.woff2",
  },
  {
    name: "PlayfairDisplay-Regular.woff2",
    url: "https://fonts.gstatic.com/s/playfairdisplay/v40/nuFvD-vYSZviVYUb_rj3ij__anPXJzDwcbmjWBN2PKdFvXDXbtM.woff2",
  },
  {
    name: "PlayfairDisplay-Medium.woff2",
    url: "https://fonts.gstatic.com/s/playfairdisplay/v40/nuFvD-vYSZviVYUb_rj3ij__anPXJzDwcbmjWBN2PKd3vXDXbtM.woff2",
  },
  {
    name: "PlayfairDisplay-SemiBold.woff2",
    url: "https://fonts.gstatic.com/s/playfairdisplay/v40/nuFvD-vYSZviVYUb_rj3ij__anPXJzDwcbmjWBN2PKebunDXbtM.woff2",
  },
  {
    name: "PlayfairDisplay-Bold.woff2",
    url: "https://fonts.gstatic.com/s/playfairdisplay/v40/nuFvD-vYSZviVYUb_rj3ij__anPXJzDwcbmjWBN2PKeiunDXbtM.woff2",
  },
  {
    name: "PlayfairDisplay-ExtraBold.woff2",
    url: "https://fonts.gstatic.com/s/playfairdisplay/v40/nuFvD-vYSZviVYUb_rj3ij__anPXJzDwcbmjWBN2PKfFunDXbtM.woff2",
  },
  {
    name: "PlayfairDisplay-Italic.woff2",
    url: "https://fonts.gstatic.com/s/playfairdisplay/v40/nuFRD-vYSZviVYUb_rj3ij__anPXDTnCjmHKM4nYO7KN_qiTXtHA-Q.woff2",
  },
  {
    name: "PlayfairDisplay-BoldItalic.woff2",
    url: "https://fonts.gstatic.com/s/playfairdisplay/v40/nuFRD-vYSZviVYUb_rj3ij__anPXDTnCjmHKM4nYO7KN_k-UXtHA-Q.woff2",
  },
];

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https
      .get(url, (response) => {
        if (response.statusCode !== 200) {
          reject(new Error(`Failed to download ${url}: status ${response.statusCode}`));
          return;
        }
        response.pipe(file);
        file.on("finish", () => {
          file.close(resolve);
        });
      })
      .on("error", (err) => {
        fs.unlink(dest, () => {});
        reject(err);
      });
  });
}

async function main() {
  console.log("Downloading fonts to src/fonts...");
  for (const font of FONTS_TO_DOWNLOAD) {
    const dest = path.join(fontsDir, font.name);
    console.log(`Downloading ${font.name}...`);
    await downloadFile(font.url, dest);
  }
  console.log("All fonts downloaded successfully.");
}

main().catch((err) => {
  console.error("Error downloading fonts:", err);
  process.exit(1);
});

