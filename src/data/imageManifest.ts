/**
 * data/imageManifest.ts
 * =====================
 * Danh mục hệ thống ảnh chuẩn của Sắc Việt Stylist:
 *   - 10 Looks người mẫu thật
 *   - 5 Flatlay ảnh cổ phục
 *   - 6 Scenes bối cảnh
 *   - 10 Accessories phụ kiện
 *   - 4 Patterns hoa văn truyền thống
 *
 * Tự động định vị đuôi file (.webp ưu tiên, .png dự phòng) dựa trên imageAvailability.json.
 */

import type { CostumeId, ContextType } from "@/types/stylist";
import imageAvailabilityData from "./imageAvailability.json";

export interface ImageManifestItem {
  id: string;
  title: string;
  alt: string;
  category: "look" | "flatlay" | "scene" | "accessory" | "pattern";
  costumeId?: CostumeId;
  context?: ContextType;
  colorHex?: string;
  subfolder: string;
  baseName: string;
  expectedPath: string;
  available: boolean;
  aspectRatio: "3/4" | "4/3" | "1/1" | "16/9";
  description?: string;
  isRisky?: boolean;
}

/**
 * Tự động tìm đúng đuôi file (.webp ưu tiên, .png dự phòng) từ imageAvailability.json.
 * Tuyệt đối không để đường dẫn trỏ tới file không tồn tại trên đĩa khi available = true.
 */
export function resolveImageFile(
  subfolder: string,
  baseName: string
): { src: string; available: boolean } {
  const data = imageAvailabilityData as {
    availableMap?: Record<string, boolean>;
    images?: Array<{ publicPath: string; relativePath: string }>;
  };
  const availableMap = data.availableMap ?? {};

  // 1. Ưu tiên .webp
  const webpPath = `/images/${subfolder}/${baseName}.webp`;
  if (availableMap[webpPath]) {
    return { src: webpPath, available: true };
  }

  // 2. Dự phòng .png
  const pngPath = `/images/${subfolder}/${baseName}.png`;
  if (availableMap[pngPath]) {
    return { src: pngPath, available: true };
  }

  // 3. Quét danh sách images nếu file có đuôi khác (.jpg, .jpeg)
  const images = data.images ?? [];
  const found = images.find(
    (img) =>
      img.relativePath.startsWith(`${subfolder}/${baseName}.`) ||
      img.publicPath.startsWith(`/images/${subfolder}/${baseName}.`)
  );
  if (found) {
    return { src: found.publicPath, available: true };
  }

  // 4. Chưa có trên đĩa -> mặc định đường dẫn webp với available = false
  return { src: webpPath, available: false };
}

/**
 * Kiểm tra tính khả dụng thực tế của một ảnh trên đĩa
 */
export function isImageOnDisk(idOrPath: string): boolean {
  if (!idOrPath) return false;
  const map = (imageAvailabilityData as { availableMap?: Record<string, boolean> }).availableMap ?? {};
  return Boolean(map[idOrPath]);
}

/**
 * Danh sách tĩnh các look, flatlay, scene, accessory, pattern chuẩn của hệ thống.
 */
const RAW_MANIFEST_DEFINITIONS = [
  // ── 10 LOOKS THẬT ──
  {
    id: "ngu-than-navy-dao-pho",
    title: "Áo Ngũ Thân Navy · Dạo Phố",
    alt: "Áo Ngũ Thân màu xanh navy dạo phố đương đại",
    category: "look" as const,
    costumeId: "ao-ngu-than" as CostumeId,
    context: "dao-pho" as ContextType,
    colorHex: "#1E3A5F",
    subfolder: "looks",
    baseName: "ngu-than-navy-dao-pho",
    aspectRatio: "3/4" as const,
    description: "Bộ phối Áo Ngũ Thân navy kết hợp quần âu suông và giày Oxford dạo phố",
  },
  {
    id: "ngu-than-do-dam-cuoi",
    title: "Áo Ngũ Thân Đỏ Son · Đám Cưới",
    alt: "Áo Ngũ Thân sắc đỏ chu sa ngày hôn lễ truyền thống",
    category: "look" as const,
    costumeId: "ao-ngu-than" as CostumeId,
    context: "dam-cuoi" as ContextType,
    colorHex: "#9E2A2B",
    subfolder: "looks",
    baseName: "ngu-than-do-dam-cuoi",
    aspectRatio: "3/4" as const,
    description: "Trang phục Áo Ngũ Thân sắc đỏ son trang trọng cho ngày hỷ sự",
  },
  {
    id: "ngu-than-xanh-le-hoi",
    title: "Áo Ngũ Thân Xanh · Lễ Hội",
    alt: "Áo Ngũ Thân xanh trầm trẩy hội mùa xuân",
    category: "look" as const,
    costumeId: "ao-ngu-than" as CostumeId,
    context: "le-hoi" as ContextType,
    colorHex: "#4A7856",
    subfolder: "looks",
    baseName: "ngu-than-xanh-le-hoi",
    aspectRatio: "3/4" as const,
    description: "Áo Ngũ Thân gam xanh lục trầm thanh nhã trong không khí lễ hội",
  },
  {
    id: "ngu-than-nam-van-mieu",
    title: "Áo Ngũ Thân Nam · Văn Miếu",
    alt: "Áo Ngũ Thân nam trang trọng tại Văn Miếu",
    category: "look" as const,
    costumeId: "ao-ngu-than" as CostumeId,
    context: "van-mieu" as ContextType,
    colorHex: "#1A1A1A",
    subfolder: "looks",
    baseName: "ngu-than-nam-van-mieu",
    aspectRatio: "3/4" as const,
    description: "Áo Ngũ Thân dáng nam uy nghiêm tại không gian tôn nghiêm Văn Miếu",
  },
  {
    id: "ao-tac-van-mieu",
    title: "Áo Tấc Navy · Văn Miếu",
    alt: "Lễ phục Áo Tấc tay thụng sắc xanh navy tại Văn Miếu",
    category: "look" as const,
    costumeId: "ao-tac" as CostumeId,
    context: "van-mieu" as ContextType,
    colorHex: "#1E3A5F", // Chuẩn màu navy theo yêu cầu
    subfolder: "looks",
    baseName: "ao-tac-van-mieu",
    aspectRatio: "3/4" as const,
    description: "Đại lễ phục Áo Tấc tay thụng uy nghiêm chốn cửa Khổng sân Trình",
  },
  {
    id: "ao-tac-short-loi",
    title: "Áo Tấc Phối Quần Short (Lỗi Phối Đồ)",
    alt: "Minh họa lỗi văn hóa: Áo Tấc đại lễ phối quần short ngắn",
    category: "look" as const,
    costumeId: "ao-tac" as CostumeId,
    context: "dao-pho" as ContextType,
    colorHex: "#1E3A5F",
    subfolder: "looks",
    baseName: "ao-tac-short-loi",
    aspectRatio: "3/4" as const,
    description: "Minh họa trường hợp vi phạm chuẩn mực: áo đại lễ thụng phối quần đùi dạo mát",
  },
  {
    id: "tu-than-nau-le-hoi",
    title: "Áo Tứ Thân Nâu Mật · Lễ Hội",
    alt: "Áo Tứ Thân sắc nâu mật cùng nón quai thao trẩy hội",
    category: "look" as const,
    costumeId: "ao-tu-than" as CostumeId,
    context: "le-hoi" as ContextType,
    colorHex: "#7B5E3A",
    subfolder: "looks",
    baseName: "tu-than-nau-le-hoi",
    aspectRatio: "3/4" as const,
    description: "Áo Tứ Thân bốn vạt dân gian duyên dáng vùng đồng bằng Bắc Bộ",
  },
  {
    id: "ao-dai-trang-ky-yeu",
    title: "Áo Dài Trắng · Kỷ Yếu",
    alt: "Áo Dài trắng ngà tinh khôi mùa kỷ yếu học đường",
    category: "look" as const,
    costumeId: "ao-dai" as CostumeId,
    context: "ky-yeu" as ContextType,
    colorHex: "#F5F0E8",
    subfolder: "looks",
    baseName: "ao-dai-trang-ky-yeu",
    aspectRatio: "3/4" as const,
    description: "Áo Dài truyền thống trắng ngà thanh tao cho mùa tốt nghiệp",
  },
  {
    id: "ao-dai-street-dao-pho",
    title: "Áo Dài Street · Dạo Phố",
    alt: "Áo Dài cách tân đương đại dạo phố",
    category: "look" as const,
    costumeId: "ao-dai" as CostumeId,
    context: "dao-pho" as ContextType,
    colorHex: "#D4AF37",
    subfolder: "looks",
    baseName: "ao-dai-street-dao-pho",
    aspectRatio: "3/4" as const,
    description: "Phong cách Áo Dài đương đại trẻ trung và năng động",
  },
  {
    id: "nhat-binh-chup-anh",
    title: "Áo Nhật Bình Đỏ · Chụp Ảnh Nghệ Thuật",
    alt: "Áo Nhật Bình sắc đỏ son chụp ảnh nghệ thuật",
    category: "look" as const,
    costumeId: "ao-nhat-binh" as CostumeId,
    context: "chup-anh" as ContextType,
    colorHex: "#9E2A2B",
    subfolder: "looks",
    baseName: "nhat-binh-chup-anh",
    aspectRatio: "3/4" as const,
    description: "Triều phục Nhật Bình cổ vuông thêu phượng hoàng rực rỡ sắc đỏ son",
  },

  // ── 5 FLATLAY (ẢNH CỔ PHỤC) ──
  {
    id: "flatlay-ao-ngu-than",
    title: "Ảnh Cổ Phục Áo Ngũ Thân",
    alt: "Chi tiết cổ phục Áo Ngũ Thân tay chẽn",
    category: "flatlay" as const,
    costumeId: "ao-ngu-than" as CostumeId,
    subfolder: "flatlay",
    baseName: "ao-ngu-than",
    aspectRatio: "3/4" as const,
    description: "Ảnh chụp cổ phục Áo Ngũ Thân truyền thống",
  },
  {
    id: "flatlay-ao-tac",
    title: "Ảnh Cổ Phục Áo Tấc",
    alt: "Chi tiết cổ phục Áo Tấc tay thụng",
    category: "flatlay" as const,
    costumeId: "ao-tac" as CostumeId,
    subfolder: "flatlay",
    baseName: "ao-tac",
    aspectRatio: "3/4" as const,
    description: "Ảnh chụp cổ phục Áo Tấc lễ nghi thời Nguyễn",
  },
  {
    id: "flatlay-ao-nhat-binh",
    title: "Ảnh Cổ Phục Áo Nhật Bình",
    alt: "Chi tiết cổ phục Áo Nhật Bình cổ vuông",
    category: "flatlay" as const,
    costumeId: "ao-nhat-binh" as CostumeId,
    subfolder: "flatlay",
    baseName: "ao-nhat-binh",
    aspectRatio: "3/4" as const,
    description: "Ảnh chụp cổ phục Áo Nhật Bình cung đình",
  },
  {
    id: "flatlay-ao-tu-than",
    title: "Ảnh Cổ Phục Áo Tứ Thân",
    alt: "Chi tiết cổ phục Áo Tứ Thân 4 vạt",
    category: "flatlay" as const,
    costumeId: "ao-tu-than" as CostumeId,
    subfolder: "flatlay",
    baseName: "ao-tu-than",
    aspectRatio: "3/4" as const,
    description: "Ảnh chụp cổ phục Áo Tứ Thân Kinh Bắc",
  },
  {
    id: "flatlay-ao-dai",
    title: "Ảnh Cổ Phục Áo Dài",
    alt: "Chi tiết cổ phục Áo Dài truyền thống",
    category: "flatlay" as const,
    costumeId: "ao-dai" as CostumeId,
    subfolder: "flatlay",
    baseName: "ao-dai",
    aspectRatio: "3/4" as const,
    description: "Ảnh chụp trang phục Áo Dài thanh lịch",
  },

  // ── 6 SCENES (BỐI CẢNH) ──
  {
    id: "scene-van-mieu",
    title: "Văn Miếu Quốc Tử Giám",
    alt: "Bối cảnh Văn Miếu Quốc Tử Giám Hà Nội",
    category: "scene" as const,
    context: "van-mieu" as ContextType,
    subfolder: "scenes",
    baseName: "van-mieu",
    aspectRatio: "16/9" as const,
    description: "Không gian di tích lịch sử tôn nghiêm ngàn năm văn hiến",
  },
  {
    id: "scene-ky-yeu",
    title: "Kỷ Yếu Học Đường",
    alt: "Bối cảnh sân trường mùa bế giảng kỷ yếu",
    category: "scene" as const,
    context: "ky-yeu" as ContextType,
    subfolder: "scenes",
    baseName: "ky-yeu",
    aspectRatio: "16/9" as const,
    description: "Không gian lưu giữ kỷ niệm tuổi học trò và lễ tốt nghiệp",
  },
  {
    id: "scene-dao-pho",
    title: "Dạo Phố Cổ",
    alt: "Bối cảnh dạo phố cổ Hà Nội và không gian phố phường",
    category: "scene" as const,
    context: "dao-pho" as ContextType,
    subfolder: "scenes",
    baseName: "dao-pho",
    aspectRatio: "16/9" as const,
    description: "Phố cổ, không gian đương đại năng động",
  },
  {
    id: "scene-dam-cuoi",
    title: "Hỷ Sự Đám Cưới",
    alt: "Bối cảnh hôn lễ và tiệc cưới truyền thống Việt Nam",
    category: "scene" as const,
    context: "dam-cuoi" as ContextType,
    subfolder: "scenes",
    baseName: "dam-cuoi",
    aspectRatio: "16/9" as const,
    description: "Không gian hỷ sự ấm cúng, trang trọng",
  },
  {
    id: "scene-le-hoi",
    title: "Lễ Hội Truyền Thống",
    alt: "Bối cảnh lễ hội dân gian và trẩy hội đầu xuân",
    category: "scene" as const,
    context: "le-hoi" as ContextType,
    subfolder: "scenes",
    baseName: "le-hoi",
    aspectRatio: "16/9" as const,
    description: "Không khí tưng bừng của lễ hội và Tết truyền thống",
  },
  {
    id: "scene-chup-anh",
    title: "Studio Chụp Ảnh Nghệ Thuật",
    alt: "Bối cảnh studio chụp ảnh nghệ thuật phong cách Neo-Heritage",
    category: "scene" as const,
    context: "chup-anh" as ContextType,
    subfolder: "scenes",
    baseName: "chup-anh",
    aspectRatio: "16/9" as const,
    description: "Không gian studio ánh sáng mỹ thuật cho bộ ảnh di sản",
  },

  // ── 10 ACCESSORIES (PHỤ KIỆN) ──
  {
    id: "acc-dep-sandal",
    title: "Dép Sandal",
    alt: "Phụ kiện dép sandal quai mảnh",
    category: "accessory" as const,
    subfolder: "accessories",
    baseName: "dep-sandal",
    aspectRatio: "1/1" as const,
    description: "Dép sandal nhẹ nhàng, thoải mái cho outfit dạo phố",
  },
  {
    id: "acc-giay-oxford",
    title: "Giày Oxford",
    alt: "Phụ kiện giày Oxford da lịch lãm",
    category: "accessory" as const,
    subfolder: "accessories",
    baseName: "giay-oxford",
    aspectRatio: "1/1" as const,
    description: "Giày da Oxford phương Tây phối cùng cổ phục nam",
  },
  {
    id: "acc-khan-dau-riu",
    title: "Khăn Đầu Rìu",
    alt: "Phụ kiện khăn đầu rìu truyền thống",
    category: "accessory" as const,
    subfolder: "accessories",
    baseName: "khan-dau-riu",
    aspectRatio: "1/1" as const,
    description: "Khăn vấn đầu rìu dân gian truyền thống",
  },
  {
    id: "acc-khan-lua",
    title: "Khăn Lụa",
    alt: "Phụ kiện khăn lụa tơ tằm mềm mại",
    category: "accessory" as const,
    subfolder: "accessories",
    baseName: "khan-lua",
    aspectRatio: "1/1" as const,
    description: "Khăn lụa tơ tằm quàng cổ thanh lịch",
  },
  {
    id: "acc-kinh-ram",
    title: "Kính Râm",
    alt: "Phụ kiện kính râm thời trang",
    category: "accessory" as const,
    subfolder: "accessories",
    baseName: "kinh-ram",
    aspectRatio: "1/1" as const,
    description: "Kính râm gọng cổ điển mang lại nét chấm phá Gen Z",
  },
  {
    id: "acc-loafer-den",
    title: "Giày Loafer Đen",
    alt: "Phụ kiện giày loafer đen da bóng",
    category: "accessory" as const,
    subfolder: "accessories",
    baseName: "loafer-den",
    aspectRatio: "1/1" as const,
    description: "Giày lười da đen hiện đại và tiện lợi",
  },
  {
    id: "acc-mu-beret",
    title: "Mũ Beret",
    alt: "Phụ kiện mũ beret phong cách",
    category: "accessory" as const,
    subfolder: "accessories",
    baseName: "mu-beret",
    aspectRatio: "1/1" as const,
    description: "Mũ nồi beret hoài cổ",
  },
  {
    id: "acc-quan-short",
    title: "Quần Short",
    alt: "Phụ kiện quần short hiện đại (Lưu ý văn hóa)",
    category: "accessory" as const,
    isRisky: true,
    subfolder: "accessories",
    baseName: "quan-short",
    aspectRatio: "1/1" as const,
    description: "Quần short ngắn — có thể gây phản cảm nếu phối cùng đại lễ phục Áo Tấc",
  },
  {
    id: "acc-tui-tote",
    title: "Túi Tote",
    alt: "Phụ kiện túi tote vải canvas",
    category: "accessory" as const,
    subfolder: "accessories",
    baseName: "tui-tote",
    aspectRatio: "1/1" as const,
    description: "Túi vải tote năng động và thân thiện",
  },
  {
    id: "acc-vong-tay",
    title: "Vòng Tay",
    alt: "Phụ kiện vòng tay chuỗi hạt phong thủy",
    category: "accessory" as const,
    subfolder: "accessories",
    baseName: "vong-tay",
    aspectRatio: "1/1" as const,
    description: "Vòng tay hạt gỗ/đá tự nhiên phong cách hoài niệm",
  },

  // ── 4 PATTERNS (HOA VĂN TRUYỀN THỐNG) ──
  {
    id: "pattern-hac-may",
    title: "Hoa Văn Hạc Mây",
    alt: "Họa tiết Hạc Mây cung đình",
    category: "pattern" as const,
    subfolder: "patterns",
    baseName: "hac-may",
    aspectRatio: "1/1" as const,
    description: "Đồ án hoa văn chim hạc bay lượn trên mây lành",
  },
  {
    id: "pattern-hoa-sen",
    title: "Hoa Văn Hoa Sen",
    alt: "Họa tiết Hoa Sen truyền thống Việt Nam",
    category: "pattern" as const,
    subfolder: "patterns",
    baseName: "hoa-sen",
    aspectRatio: "1/1" as const,
    description: "Quốc hoa sen thanh tao biểu tượng cho sự thuần khiết",
  },
  {
    id: "pattern-may-song",
    title: "Hoa Văn Mây Sóng",
    alt: "Họa tiết Mây Sóng thủy ba cung đình",
    category: "pattern" as const,
    subfolder: "patterns",
    baseName: "may-song",
    aspectRatio: "1/1" as const,
    description: "Đồ án mây cuộn và sóng nước thủy ba thời Nguyễn",
  },
  {
    id: "pattern-medallion",
    title: "Hoa Văn Medallion Cung Đình",
    alt: "Họa tiết Medallion hoa cúc triều đình",
    category: "pattern" as const,
    subfolder: "patterns",
    baseName: "medallion",
    aspectRatio: "1/1" as const,
    description: "Họa tiết hoa cúc / hoa phù dung dáng tròn huy chương cung đình",
  },
];

/**
 * Xây dựng Record IMAGE_MANIFEST động với đường dẫn và cờ available tự động phân giải từ imageAvailability.json.
 */
export const IMAGE_MANIFEST: Record<string, ImageManifestItem> = (() => {
  const manifestMap: Record<string, ImageManifestItem> = {};

  for (const def of RAW_MANIFEST_DEFINITIONS) {
    const { src, available } = resolveImageFile(def.subfolder, def.baseName);
    manifestMap[def.id] = {
      ...def,
      expectedPath: src,
      available,
    };
  }

  return manifestMap;
})();

/**
 * Lấy thông tin ảnh từ manifest kèm trạng thái khả dụng thực tế
 */
export function getImageManifestItem(
  id: string
): (ImageManifestItem & { isAvailableOnDisk: boolean }) | null {
  const item = IMAGE_MANIFEST[id];
  if (!item) return null;

  return {
    ...item,
    isAvailableOnDisk: item.available,
  };
}

/**
 * Lấy danh sách tất cả ảnh trong manifest
 */
export function getAllManifestImages(): ImageManifestItem[] {
  return Object.values(IMAGE_MANIFEST);
}
