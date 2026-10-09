/**
 * data/costumes.ts
 * ================
 * Nguồn dữ liệu DUY NHẤT chuẩn hóa (Single Source of Truth) cho 5 loại cổ phục Việt Nam:
 *   1. Áo Ngũ Thân (ao-ngu-than)
 *   2. Áo Tấc (ao-tac)
 *   3. Áo Nhật Bình (ao-nhat-binh)
 *   4. Áo Tứ Thân (ao-tu-than)
 *   5. Áo Dài (ao-dai)
 */

import type { BaseCostume, CostumeId } from "@/types/stylist";
import { resolveImageFile } from "@/data/imageManifest";

export const costumeAoNguThan: BaseCostume = {
  id: "ao-ngu-than",
  name: "Áo Ngũ Thân Tay Chẽn",
  nameEn: "Five-Panel Narrow-Sleeve Tunic",
  type: "ao-ngu-than",
  description:
    "Áo Ngũ Thân 5 vạt đặc trưng của văn hóa Việt, tay chẽn (tay hẹp) thanh thoát, là chuẩn mực y phục của sĩ phu và quan lại thời Nguyễn.",
  suitableContexts: ["daily", "festival", "ceremony", "photoshoot", "casual_modern"],
  traditionalColors: ["#1E3A5F", "#9E2A2B", "#1A1A1A", "#4A7856", "#F5F0E8"],
  materials: ["lụa", "gấm", "vải lanh", "cotton cao cấp", "tơ tằm"],
  period: "nguyen",
  region: "central",
  imageUrl: resolveImageFile("flatlay", "ao-ngu-than").src,
  tags: ["áo ngũ thân", "cổ phục", "trang trọng", "tay chẽn", "5 vạt", "Nhà Nguyễn"],
  dynasty: "Nhà Nguyễn · 1802–1945",
  colors: [
    { hex: "#1E3A5F", name: "Xanh lam sẫm" },
    { hex: "#9E2A2B", name: "Đỏ chu sa" },
    { hex: "#1A1A1A", name: "Đen huyền" },
    { hex: "#4A7856", name: "Xanh trầm" },
  ],
  accentColor: "#1E3A5F",
};

export const costumeAoTac: BaseCostume = {
  id: "ao-tac",
  name: "Áo Tấc",
  nameEn: "Wide-Sleeve Heritage Robe (Áo Tấc)",
  type: "ao-tac",
  description:
    "Áo ngũ thân tay thụng (tay rộng 1 tấc vải), là lễ phục trang trọng thời Nguyễn dùng trong các dịp cúng tế, hôn lễ, lễ tiết quan trọng.",
  suitableContexts: ["ceremony", "wedding", "festival", "temple", "photoshoot"],
  traditionalColors: ["#4A7856", "#1A1A1A", "#7B5E3A", "#1E3A5F", "#9E2A2B"],
  materials: ["lụa Hà Đông", "vải cotton", "linen", "tơ tằm", "gấm sa"],
  period: "nguyen",
  region: "central",
  imageUrl: resolveImageFile("flatlay", "ao-tac").src,
  tags: ["áo tấc", "lễ phục", "tay thụng", "trang trọng", "Nhà Nguyễn"],
  dynasty: "Nhà Nguyễn · Lễ phục trang trọng",
  colors: [
    { hex: "#4A7856", name: "Xanh trầm" },
    { hex: "#1A1A1A", name: "Đen huyền" },
    { hex: "#7B5E3A", name: "Nâu đất" },
    { hex: "#1E3A5F", name: "Xanh lam" },
  ],
  accentColor: "#4A7856",
};

export const costumeAoNhatBinh: BaseCostume = {
  id: "ao-nhat-binh",
  name: "Áo Nhật Bình",
  nameEn: "Square-Collar Court Robe (Nhật Bình)",
  type: "ao-nhat-binh",
  description:
    "Áo cổ vuông viền dải chữ nhật xẻ giữa đính hoa văn tinh xảo, nguyên là thường phục của hoàng hậu, công chúa và triều phục của mệnh phụ quý tộc thời Nguyễn.",
  suitableContexts: ["wedding", "ceremony", "festival", "photoshoot"],
  traditionalColors: ["#9E2A2B", "#1E3A5F", "#D4AF37", "#2C3E50"],
  materials: ["gấm", "lụa thêu", "sa đoạn hoàng cung", "tơ tằm"],
  period: "nguyen",
  region: "central",
  imageUrl: resolveImageFile("flatlay", "ao-nhat-binh").src,
  tags: ["áo nhật bình", "triều phục", "cổ vuông", "hoàng tộc", "lễ nghi"],
  dynasty: "Nhà Nguyễn · Triều phục nữ quý tộc",
  colors: [
    { hex: "#9E2A2B", name: "Đỏ son" },
    { hex: "#1E3A5F", name: "Xanh lam" },
    { hex: "#D4AF37", name: "Vàng kim" },
    { hex: "#2C3E50", name: "Xanh tối" },
  ],
  accentColor: "#9E2A2B",
};

export const costumeAoTuThan: BaseCostume = {
  id: "ao-tu-than",
  name: "Áo Tứ Thân",
  nameEn: "Four-Panel Traditional Dress",
  type: "ao-tu-than",
  description:
    "Trang phục truyền thống 4 vạt gắn liền với người phụ nữ kinh kỳ và vùng đồng bằng Bắc Bộ, kết hợp duyên dáng cùng yếm đào, dải thắt lưng lụa và khăn mỏ quạ.",
  suitableContexts: ["festival", "daily", "performance", "photoshoot"],
  traditionalColors: ["#7B5E3A", "#2C1810", "#6B4C8F", "#4A7856"],
  materials: ["đũi", "vải tơ sồi", "lụa thô", "cotton tự nhiên"],
  period: "le",
  region: "north",
  imageUrl: resolveImageFile("flatlay", "ao-tu-than").src,
  tags: ["áo tứ thân", "Bắc Bộ", "lễ hội", "dân gian", "yếm đào"],
  dynasty: "Dân gian Bắc Bộ · Thế kỷ 17–20",
  colors: [
    { hex: "#7B5E3A", name: "Nâu mật" },
    { hex: "#2C1810", name: "Nâu sẫm" },
    { hex: "#6B4C8F", name: "Tím" },
    { hex: "#4A7856", name: "Xanh" },
  ],
  accentColor: "#7B5E3A",
};

export const costumeAoDai: BaseCostume = {
  id: "ao-dai",
  name: "Áo Dài Tân Thời",
  nameEn: "Modern Áo Dài",
  type: "ao-dai",
  description:
    "Biểu tượng quốc phục Việt Nam kế thừa và cách tân từ áo ngũ thân thế kỷ 20, tôn vinh nét đẹp thanh tao, trang nhã và linh hoạt trong đời sống đương đại.",
  suitableContexts: ["daily", "ceremony", "wedding", "photoshoot", "casual_modern"],
  traditionalColors: ["#F5F0E8", "#9E2A2B", "#1E3A5F", "#D4AF37"],
  materials: ["lụa tơ tằm", "voan", "gấm hoa", "linen dệt thủ công"],
  period: "contemporary",
  region: "all",
  imageUrl: resolveImageFile("flatlay", "ao-dai").src,
  tags: ["áo dài", "quốc phục", "thanh lịch", "đương đại", "di sản"],
  dynasty: "Đương đại · 1930s – nay",
  colors: [
    { hex: "#F5F0E8", name: "Trắng ngà" },
    { hex: "#9E2A2B", name: "Đỏ son" },
    { hex: "#1E3A5F", name: "Xanh lam" },
    { hex: "#D4AF37", name: "Vàng" },
  ],
  accentColor: "#D4AF37",
};

/** Danh sách chuẩn 5 cổ phục Việt Nam */
export const COSTUMES: BaseCostume[] = [
  costumeAoNguThan,
  costumeAoTac,
  costumeAoNhatBinh,
  costumeAoTuThan,
  costumeAoDai,
];

/** Bảng tra cứu cổ phục theo id */
export const COSTUME_MAP: Record<CostumeId, BaseCostume> = {
  "ao-ngu-than": costumeAoNguThan,
  "ao-tac": costumeAoTac,
  "ao-nhat-binh": costumeAoNhatBinh,
  "ao-tu-than": costumeAoTuThan,
  "ao-dai": costumeAoDai,
};

/**
 * Tìm cổ phục theo id chuẩn hoặc legacy id
 */
export function getCostumeById(id: string): BaseCostume | undefined {
  if (id in COSTUME_MAP) {
    return COSTUME_MAP[id as CostumeId];
  }
  // Mapping fallback cho legacy IDs
  if (id === "costume-ngu-than-001" || id === "ao_ngu_than") return costumeAoNguThan;
  if (id === "costume-ao-tac-001" || id === "ao_tac") return costumeAoTac;
  if (id === "ao_nhat_binh") return costumeAoNhatBinh;
  if (id === "ao_tu_than") return costumeAoTuThan;
  if (id === "ao_dai") return costumeAoDai;
  return COSTUMES.find((c) => c.id === id);
}

