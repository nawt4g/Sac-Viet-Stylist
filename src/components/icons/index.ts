/**
 * components/icons/index.ts
 * =========================
 * Icon mappings using lucide-react to replace legacy emojis across Sắc Việt Stylist.
 * Provides type-safe icon maps for categories, contexts, accessories, and costumes.
 */

import type { LucideIcon } from "lucide-react";
import {
  Footprints,
  Glasses,
  ShoppingBag,
  Sparkles,
  Crown,
  Gem,
  Scissors,
  Shirt,
  Layers,
  Compass,
  GraduationCap,
  Camera,
  Landmark,
  Heart,
  PartyPopper,
  Feather,
  Flower2,
  Sun,
  Award,
  HelpCircle,
} from "lucide-react";

/**
 * Mapping cho danh mục phụ kiện & thời trang (thay thế emoji: 👞, 🕶️, 🛍️, 🧣, 🎩, 💍, 👖...)
 */
export const CATEGORY_ICON: Record<string, LucideIcon> = {
  // Phụ kiện categories trong Wizard
  footwear: Footprints,
  eyewear: Glasses,
  bag: ShoppingBag,
  neckwear: Sparkles,
  headwear: Crown,
  jewelry: Gem,
  bottom: Scissors,

  // Styling mix categories trong OutfitResponse
  top: Shirt,
  shoes: Footprints,
  accessory: Sparkles,
  outerwear: Layers,
};

/**
 * Mapping cho ngữ cảnh sử dụng trang phục (thay thế emoji: 🌆, 🎓, 📸, 🏛️, 💒, 🎆...)
 */
export const CONTEXT_ICON: Record<string, LucideIcon> = {
  // ContextType chuẩn trong Stylist Wizard
  "dao-pho": Compass,          // Dạo phố (trước dùng 🌆)
  "ky-yeu": GraduationCap,      // Kỷ yếu (trước dùng 🎓)
  "chup-anh": Camera,          // Chụp ảnh NT (trước dùng 📸)
  "van-mieu": Landmark,        // Văn Miếu / Di tích (trước dùng 🏛️)
  "dam-cuoi": Heart,           // Đám cưới (trước dùng 💒)
  "le-hoi": PartyPopper,       // Lễ hội / Tết (trước dùng 🎆)

  // WearingContext chuẩn trong stylist types
  daily: Sun,
  festival: PartyPopper,
  ceremony: Landmark,
  temple: Landmark,
  wedding: Heart,
  performance: Sparkles,
  photoshoot: Camera,
  casual_modern: Compass,
};

/**
 * Mapping cho các phụ kiện cụ thể (thay thế emoji trong ALL_ACCESSORIES)
 */
export const ACCESSORY_ICON: Record<string, LucideIcon> = {
  "giay-oxford": Footprints,   // 👞 Oxford da đen
  "loafer-den": Footprints,    // 🥿 Loafer lười đen
  "dep-sandal": Footprints,    // 𑑡 Sandal da bò
  "kinh-ram": Glasses,         // 🕶️ Kính râm oversized
  "tui-tote": ShoppingBag,     // 🛍️ Túi tote canvas
  "khan-lua": Feather,         // 🧣 Khăn lụa quàng cổ
  "khan-dau-riu": Award,       // 🎀 Khăn đầu rìu
  "mu-beret": Crown,           // 🎩 Mũ beret
  "vong-tay": Gem,             // 💚 Vòng tay ngọc bích
  "quan-short": Scissors,      // 🩳 Quần short (risky item)
};

/**
 * Mapping cho 5 loại cổ phục Việt Nam (CostumeId chuẩn)
 */
export const COSTUME_ICON: Record<string, LucideIcon> = {
  "ao-ngu-than": Shirt,        // Áo Ngũ Thân Tay Chẽn
  "ao-tac": Sparkles,          // Áo Tấc (ngũ thân tay thụng)
  "ao-nhat-binh": Crown,       // Áo Nhật Bình (triều phục hoàng gia)
  "ao-tu-than": Feather,       // Áo Tứ Thân (dân gian Bắc Bộ)
  "ao-dai": Flower2,           // Áo Dài Tân Thời (quốc phục thanh tao)

  // Tương thích legacy snake_case ids
  ao_ngu_than: Shirt,
  ao_tac: Sparkles,
  ao_nhat_binh: Crown,
  ao_tu_than: Feather,
  ao_dai: Flower2,
};

/**
 * Helper an toàn để lấy icon hoặc fallback sang HelpCircle nếu không tìm thấy key
 */
export function getCategoryIcon(category: string): LucideIcon {
  return CATEGORY_ICON[category] ?? HelpCircle;
}

export function getContextIcon(context: string): LucideIcon {
  return CONTEXT_ICON[context] ?? HelpCircle;
}

export function getAccessoryIcon(accessoryId: string): LucideIcon {
  return ACCESSORY_ICON[accessoryId] ?? HelpCircle;
}

export function getCostumeIcon(costumeId: string): LucideIcon {
  return COSTUME_ICON[costumeId] ?? Shirt;
}

