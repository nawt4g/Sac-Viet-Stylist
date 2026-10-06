/**
 * types/stylist.ts
 * ================
 * TypeScript interface definitions cho Sắc Việt AI Stylist.
 * Định nghĩa chuẩn xác theo JSON schema của PRD.
 *
 * Cấu trúc cây:
 *   OutfitResponse
 *     ├── BaseCostume[]       — danh sách trang phục cổ truyền
 *     ├── StylingMix[]        — gợi ý phối đồ hiện đại
 *     ├── CulturalGuardrail   — kiểm tra văn hóa
 *     └── HeritageCard        — thẻ tri thức di sản
 */

/* ============================================================
   ENUMS & UNION TYPES
   ============================================================ */

/** Trạng thái guardrail văn hóa — 3 mức độ */
export type GuardrailStatus = "GREEN" | "YELLOW" | "RED";

/** 5 Cổ phục chuẩn của hệ thống Sắc Việt Stylist */
export type CostumeId =
  | "ao-ngu-than"
  | "ao-tac"
  | "ao-nhat-binh"
  | "ao-tu-than"
  | "ao-dai";

/** Loại cổ phục Việt Nam (hỗ trợ CostumeId chuẩn và tương thích ngược với legacy types) */
export type CostumeType =
  | CostumeId
  | "ao_ngu_than"     // Áo Ngũ Thân
  | "ao_tac"          // Áo Tấc
  | "ao_nhat_binh"    // Áo Nhật Bình
  | "ao_dai"          // Áo Dài
  | "ao_ba_ba"        // Áo Bà Ba
  | "ao_tu_than"      // Áo Tứ Thân
  | "khan_dong"       // Khăn Đóng
  | "non_la"          // Nón Lá
  | "quan_lung"       // Quần Lụng
  | "quan_tay";       // Quần Tây

/** 6 Ngữ cảnh chuẩn trong Stylist Wizard */
export type ContextType =
  | "van-mieu"
  | "ky-yeu"
  | "dao-pho"
  | "dam-cuoi"
  | "le-hoi"
  | "chup-anh";

/** Dịp / Context sử dụng trang phục */
export type WearingContext =
  | "daily"           // Hàng ngày
  | "festival"        // Lễ hội, Tết
  | "ceremony"        // Nghi lễ trang trọng
  | "temple"          // Đền chùa, Văn Miếu
  | "wedding"         // Đám cưới
  | "performance"     // Biểu diễn, sự kiện
  | "photoshoot"      // Chụp ảnh nghệ thuật
  | "casual_modern";  // Phối đời thường hiện đại

/** Vùng miền văn hóa */
export type CulturalRegion = "north" | "central" | "south" | "all";

/** Triều đại lịch sử liên quan */
export type HistoricalPeriod =
  | "nguyen"      // Nhà Nguyễn (1802–1945) — phổ biến nhất
  | "le"          // Nhà Lê
  | "tran"        // Nhà Trần
  | "ly"          // Nhà Lý
  | "contemporary"; // Đương đại (phái sinh từ cổ phục)

/* ============================================================
   BASE COSTUME — Trang phục cổ truyền gốc
   ============================================================ */

export interface BaseCostume {
  /** ID định danh duy nhất (chuẩn: ao-ngu-than, ao-tac, ao-nhat-binh, ao-tu-than, ao-dai) */
  id: CostumeId | string;

  /** Tên trang phục (tiếng Việt có dấu) */
  name: string;

  /** Tên tiếng Anh để localization */
  nameEn: string;

  /** Loại cổ phục */
  type: CostumeType;

  /** Mô tả ngắn gọn (1-2 câu) */
  description: string;

  /** Các dịp phù hợp để mặc */
  suitableContexts: WearingContext[];

  /** Màu sắc truyền thống */
  traditionalColors: string[];

  /** Chất liệu vải phù hợp */
  materials: string[];

  /** Triều đại lịch sử liên quan */
  period: HistoricalPeriod;

  /** Vùng miền văn hóa gốc */
  region: CulturalRegion;

  /** URL ảnh minh họa (có thể null khi mock) */
  imageUrl: string | null;

  /** Tags tìm kiếm */
  tags: string[];

  /** Tên triều đại / thời kỳ hiển thị trên UI */
  dynasty?: string;

  /** Các biến thể màu sắc gợi ý */
  colors?: { hex: string; name: string }[];

  /** Màu sắc điểm nhấn thương hiệu */
  accentColor?: string;
}

/* ============================================================
   STYLING MIX — Gợi ý phối đồ đương đại
   ============================================================ */

export interface StylingMixItem {
  /** Tên item (vd: "Quần suông trắng", "Giày Oxford đen") */
  name: string;

  /** Danh mục (top, bottom, shoes, accessory, headwear) */
  category: "top" | "bottom" | "shoes" | "accessory" | "headwear" | "outerwear";

  /** Màu sắc gợi ý */
  colors: string[];

  /** Chất liệu gợi ý */
  materials?: string[];

  /** Lý do phù hợp với cổ phục */
  rationale: string;

  /** Thương hiệu tham khảo (tùy chọn) */
  brandReferences?: string[];
}

export interface StylingMix {
  /** ID định danh */
  id: string;

  /** Tiêu đề set phối */
  title: string;

  /** Phong cách phối (vd: "Tối giản đương đại", "Streetwear Heritage") */
  style: string;

  /** BaseCostume ID được phối */
  baseCostumeId: string;

  /** Danh sách items phối */
  items: StylingMixItem[];

  /** Dịp phù hợp */
  context: WearingContext;

  /** Mô tả tổng thể outfit */
  overallDescription: string;

  /** Tips mặc cụ thể */
  stylingTips: string[];

  /** Budget estimate (VND range) */
  budgetRange?: {
    min: number;
    max: number;
    currency: "VND";
  };
}

/* ============================================================
   CULTURAL GUARDRAIL — Kiểm duyệt văn hóa
   ============================================================ */

export interface GuardrailViolation {
  /** Loại vi phạm */
  type:
    | "inappropriate_combination"  // Phối đồ không phù hợp
    | "wrong_context"              // Sai dịp/ngữ cảnh
    | "disrespectful_modification" // Chỉnh sửa thiếu tôn trọng
    | "historical_inaccuracy"      // Sai lệch lịch sử
    | "color_taboo";               // Màu sắc kiêng kỵ

  /** Mô tả vi phạm */
  description: string;

  /** Độ nghiêm trọng */
  severity: "minor" | "moderate" | "severe";
}

export interface GuardrailSuggestion {
  /** Gợi ý thay thế */
  suggestion: string;

  /** Lý do */
  reason: string;
}

export interface CulturalGuardrail {
  /** Trạng thái tổng thể */
  status: GuardrailStatus;

  /** Điểm số văn hóa (0–100, 100 = hoàn toàn phù hợp) */
  culturalScore: number;

  /**
   * GREEN: Được approve hoàn toàn
   * YELLOW: Chú ý ngữ cảnh, cần thêm hướng dẫn
   * RED: Vi phạm nghiêm trọng, không khuyến nghị
   */
  statusMessage: string;

  /** Danh sách vi phạm (rỗng nếu GREEN) */
  violations: GuardrailViolation[];

  /** Gợi ý cải thiện */
  suggestions: GuardrailSuggestion[];

  /** Giải thích chi tiết cho người dùng */
  explanation: string;

  /** Lý do ngữ cảnh cụ thể (vd: "Văn Miếu yêu cầu trang phục kín đáo") */
  contextualReason?: string;
}

/* ============================================================
   HERITAGE CARD — Thẻ tri thức di sản
   ============================================================ */

export interface HeritageCard {
  /** ID định danh */
  id: string;

  /** Tiêu đề thẻ tri thức */
  title: string;

  /** Loại nội dung */
  type:
    | "history"       // Lịch sử
    | "symbolism"     // Ý nghĩa biểu tượng
    | "etiquette"     // Lễ nghi, cách mặc đúng
    | "regional"      // Đặc trưng vùng miền
    | "color_meaning" // Ý nghĩa màu sắc
    | "material";     // Chất liệu truyền thống

  /** Nội dung chính */
  content: string;

  /** Tóm tắt ngắn (cho card preview) */
  summary: string;

  /** Liên kết đến BaseCostume IDs */
  relatedCostumeIds: string[];

  /** Triều đại/giai đoạn liên quan */
  period?: HistoricalPeriod;

  /** Tags */
  tags: string[];

  /** Nguồn tham khảo */
  sources?: string[];

  /** Cấp độ thông tin (beginner | intermediate | expert) */
  level: "beginner" | "intermediate" | "expert";
}

/* ============================================================
   OUTFIT RESPONSE — Response chính của AI Stylist
   ============================================================ */

export interface OutfitResponse {
  /** ID phiên tư vấn */
  sessionId: string;

  /** Timestamp (ISO 8601) */
  timestamp: string;

  /** Input từ người dùng */
  userInput: {
    /** Mô tả yêu cầu */
    prompt: string;
    /** Ngữ cảnh mặc */
    context: WearingContext;
    /** Preferences bổ sung */
    preferences?: string[];
  };

  /** Trang phục cổ truyền được chọn */
  selectedCostumes: BaseCostume[];

  /** Gợi ý phối đồ */
  stylingMixes: StylingMix[];

  /** Kết quả kiểm duyệt văn hóa */
  guardrail: CulturalGuardrail;

  /** Thẻ tri thức di sản liên quan */
  heritageCards: HeritageCard[];

  /** AI confidence score (0.0 – 1.0) */
  confidenceScore: number;

  /** Model version */
  modelVersion: string;
}
