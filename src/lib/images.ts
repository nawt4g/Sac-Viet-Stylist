/**
 * lib/images.ts
 * =============
 * Helper functions cung cấp dữ liệu hình ảnh cho toàn bộ giao diện:
 *   - getFlatlay: Lấy ảnh flatlay chuẩn của 5 cổ phục (.webp ưu tiên, .png dự phòng)
 *   - getLookImage: Tìm ảnh look theo thứ tự ưu tiên:
 *       1. Đúng áo + màu gần nhất (khoảng cách RGB) + ngữ cảnh
 *       2. Đúng áo + màu gần nhất
 *       3. Cùng áo
 *       4. null
 *   - getSceneImage: Lấy ảnh bối cảnh theo ngữ cảnh
 *   - getAccessoryImage: Lấy ảnh phụ kiện theo id
 *   - getPatternImage: Lấy ảnh hoa văn theo tên
 *   - getFeaturedLooks: Lấy danh sách looks nổi bật cho Lookbook Preview
 */

import type { CostumeId, ContextType } from "@/types/stylist";
import {
  IMAGE_MANIFEST,
  resolveImageFile,
  type ImageManifestItem,
} from "@/data/imageManifest";
import { COSTUME_MAP } from "@/data/costumes";

export interface FlatlayImageResult {
  costumeId: CostumeId;
  src: string;
  available: boolean;
  alt: string;
  title: string;
}

export interface LookImageResult {
  id: string;
  title: string;
  alt: string;
  category: "look" | "flatlay" | "scene" | "accessory" | "pattern";
  costumeId?: CostumeId;
  context?: ContextType;
  colorHex?: string;
  src: string;
  available: boolean;
  aspectRatio: "3/4" | "4/3" | "1/1" | "16/9";
  description?: string;
}

export interface SceneImageResult {
  contextId: ContextType;
  src: string;
  available: boolean;
  alt: string;
  title: string;
}

export interface AccessoryImageResult {
  id: string;
  src: string;
  available: boolean;
  alt: string;
  title: string;
  isRisky?: boolean;
}

export interface PatternImageResult {
  id: string;
  src: string;
  available: boolean;
  alt: string;
  title: string;
}

export interface GetLookImageParams {
  costumeId?: CostumeId | string;
  colorHex?: string;
  contextId?: ContextType | string;
}

export interface GetLookImageReturn {
  image: LookImageResult | null;
  exact: boolean;
}

/**
 * Tính khoảng cách Euclidean giữa 2 mã màu Hex trong không gian RGB
 */
function parseHexToRgb(hex?: string): [number, number, number] | null {
  if (!hex) return null;
  const clean = hex.replace("#", "").trim();
  if (clean.length === 3) {
    const r = parseInt(clean[0] + clean[0], 16);
    const g = parseInt(clean[1] + clean[1], 16);
    const b = parseInt(clean[2] + clean[2], 16);
    return [r, g, b];
  }
  if (clean.length === 6) {
    const r = parseInt(clean.slice(0, 2), 16);
    const g = parseInt(clean.slice(2, 4), 16);
    const b = parseInt(clean.slice(4, 6), 16);
    return [r, g, b];
  }
  return null;
}

function getRgbDistance(hexA?: string, hexB?: string): number {
  const rgbA = parseHexToRgb(hexA);
  const rgbB = parseHexToRgb(hexB);
  if (!rgbA || !rgbB) return 999999;
  const dr = rgbA[0] - rgbB[0];
  const dg = rgbA[1] - rgbB[1];
  const db = rgbA[2] - rgbB[2];
  return Math.sqrt(dr * dr + dg * dg + db * db);
}

function toLookImageResult(item: ImageManifestItem): LookImageResult {
  const resolved = resolveImageFile(item.subfolder, item.baseName);
  return {
    id: item.id,
    title: item.title,
    alt: item.alt,
    category: item.category,
    costumeId: item.costumeId,
    context: item.context,
    colorHex: item.colorHex,
    src: resolved.src,
    available: resolved.available,
    aspectRatio: item.aspectRatio,
    description: item.description,
  };
}

/**
 * Lấy ảnh flatlay cho 5 loại cổ phục
 * Tự động tìm đúng đuôi file (.webp ưu tiên, .png dự phòng)
 */
export function getFlatlay(costumeId: CostumeId | string): FlatlayImageResult {
  const normalizedId = (
    costumeId.startsWith("ao-") ? costumeId : `ao-${costumeId}`
  ) as CostumeId;
  const costume = COSTUME_MAP[normalizedId];
  const resolved = resolveImageFile("flatlay", normalizedId);

  return {
    costumeId: normalizedId,
    src: resolved.src,
    available: resolved.available,
    alt: `Ảnh cổ phục ${costume?.name ?? normalizedId}`,
    title: costume?.name ?? normalizedId,
  };
}

/**
 * Tìm ảnh look theo thứ tự ưu tiên:
 *   1. Đúng áo + màu gần nhất (khoảng cách RGB) + ngữ cảnh
 *   2. Đúng áo + màu gần nhất
 *   3. Cùng áo
 *   4. null
 */
export function getLookImage(
  params: GetLookImageParams | string
): GetLookImageReturn {
  // Tương thích khi truyền trực tiếp string ID
  if (typeof params === "string") {
    const directItem = IMAGE_MANIFEST[params];
    if (directItem && directItem.category === "look") {
      return { image: toLookImageResult(directItem), exact: true };
    }
    return { image: null, exact: false };
  }

  const { costumeId, colorHex, contextId } = params;
  if (!costumeId) {
    return { image: null, exact: false };
  }

  // Chuẩn hóa costumeId
  const normalizedCostumeId = costumeId.startsWith("ao-")
    ? costumeId
    : costumeId.startsWith("ngu-than")
    ? "ao-ngu-than"
    : `ao-${costumeId}`;

  // Lọc tất cả looks thật của loại cổ phục này
  const allLooks = Object.values(IMAGE_MANIFEST).filter(
    (item) => item.category === "look" && item.costumeId === normalizedCostumeId
  );

  if (allLooks.length === 0) {
    return { image: null, exact: false };
  }

  // 1. Đúng áo + màu gần nhất (khoảng cách RGB) + ngữ cảnh
  if (contextId) {
    const matchingContext = allLooks.filter(
      (item) => item.context === contextId
    );

    if (matchingContext.length > 0) {
      if (colorHex) {
        const sorted = [...matchingContext].sort((a, b) => {
          const distA = getRgbDistance(a.colorHex, colorHex);
          const distB = getRgbDistance(b.colorHex, colorHex);
          return distA - distB;
        });
        const best = sorted[0];
        const distance = getRgbDistance(best.colorHex, colorHex);
        const isExactColor = distance < 45;
        return {
          image: toLookImageResult(best),
          exact: isExactColor,
        };
      }
      return {
        image: toLookImageResult(matchingContext[0]),
        exact: true,
      };
    }
  }

  // 2. Đúng áo + màu gần nhất (nếu không trùng ngữ cảnh)
  if (colorHex) {
    const sorted = [...allLooks].sort((a, b) => {
      const distA = getRgbDistance(a.colorHex, colorHex);
      const distB = getRgbDistance(b.colorHex, colorHex);
      return distA - distB;
    });
    const best = sorted[0];
    return {
      image: toLookImageResult(best),
      exact: false,
    };
  }

  // 3. Cùng áo
  return {
    image: toLookImageResult(allLooks[0]),
    exact: false,
  };
}

/**
 * Lấy ảnh bối cảnh (scene) theo ContextType
 */
export function getSceneImage(contextId: ContextType | string): SceneImageResult {
  const item = IMAGE_MANIFEST[`scene-${contextId}`];
  if (item) {
    const resolved = resolveImageFile(item.subfolder, item.baseName);
    return {
      contextId: contextId as ContextType,
      src: resolved.src,
      available: resolved.available,
      alt: item.alt,
      title: item.title,
    };
  }

  const resolved = resolveImageFile("scenes", contextId);
  return {
    contextId: contextId as ContextType,
    src: resolved.src,
    available: resolved.available,
    alt: `Bối cảnh ${contextId}`,
    title: contextId,
  };
}

/**
 * Lấy ảnh phụ kiện theo id
 */
export function getAccessoryImage(accessoryId: string): AccessoryImageResult {
  const item = IMAGE_MANIFEST[`acc-${accessoryId}`];
  if (item) {
    const resolved = resolveImageFile(item.subfolder, item.baseName);
    return {
      id: accessoryId,
      src: resolved.src,
      available: resolved.available,
      alt: item.alt,
      title: item.title,
      isRisky: item.isRisky,
    };
  }

  const resolved = resolveImageFile("accessories", accessoryId);
  return {
    id: accessoryId,
    src: resolved.src,
    available: resolved.available,
    alt: `Phụ kiện ${accessoryId}`,
    title: accessoryId,
    isRisky: accessoryId === "quan-short",
  };
}

/**
 * Lấy ảnh hoa văn truyền thống (pattern) theo id
 */
export function getPatternImage(
  patternId: "hac-may" | "hoa-sen" | "may-song" | "medallion" | string
): PatternImageResult {
  const item = IMAGE_MANIFEST[`pattern-${patternId}`];
  if (item) {
    const resolved = resolveImageFile(item.subfolder, item.baseName);
    return {
      id: patternId,
      src: resolved.src,
      available: resolved.available,
      alt: item.alt,
      title: item.title,
    };
  }

  const resolved = resolveImageFile("patterns", patternId);
  return {
    id: patternId,
    src: resolved.src,
    available: resolved.available,
    alt: `Hoa văn ${patternId}`,
    title: patternId,
  };
}

/**
 * Lấy danh sách 6 looks nổi bật cho Lookbook Preview từ các look thật
 */
export function getFeaturedLooks(limit: number = 6): LookImageResult[] {
  const featuredIds = [
    "ngu-than-navy-dao-pho",
    "ao-tac-van-mieu",
    "ngu-than-do-dam-cuoi",
    "tu-than-nau-le-hoi",
    "ao-dai-trang-ky-yeu",
    "nhat-binh-chup-anh",
  ];

  const looks: LookImageResult[] = [];
  for (const id of featuredIds.slice(0, limit)) {
    const { image } = getLookImage(id);
    if (image) looks.push(image);
  }
  return looks;
}
