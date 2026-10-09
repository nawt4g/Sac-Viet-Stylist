/**
 * data/mockData.ts
 * ================
 * Dữ liệu mẫu cho Sắc Việt AI Stylist — Phase 1 (No external API).
 * 3 case studies đầy đủ bao gồm cả 3 trạng thái guardrail:
 *
 *   Case 1 — Áo Ngũ Thân Tay Chẽn  → GREEN  (Approved)
 *   Case 2 — Áo Tấc tại Văn Miếu   → YELLOW (Context Caution)
 *   Case 3 — Áo Tấc + Quần Short    → RED    (Violation)
 */

import type {
  OutfitResponse,
  BaseCostume,
  StylingMix,
  CulturalGuardrail,
  HeritageCard,
} from "@/types/stylist";
import { COSTUMES } from "./costumes";
import { resolveImageFile } from "./imageManifest";

export { COSTUMES };

/* ============================================================
   BASE COSTUMES — Trang phục cổ truyền
   ============================================================ */

export const costumeNguThan: BaseCostume = {
  id: "costume-ngu-than-001",
  name: "Áo Ngũ Thân Tay Chẽn",
  nameEn: "Five-Panel Narrow-Sleeve Tunic",
  type: "ao-ngu-than",
  description:
    "Áo Ngũ Thân 5 vạt đặc trưng của văn hóa Việt, tay chẽn (tay hẹp) mang phong cách thanh thoát. Đây là trang phục chuẩn mực của sĩ phu và người dân thời Nguyễn, biểu tượng cho 5 mối quan hệ luân thường trong Nho giáo.",
  suitableContexts: ["daily", "festival", "ceremony", "photoshoot", "casual_modern"],
  traditionalColors: ["#1E3A5F", "#8B2635", "#2D5016", "#1A1A1A", "#F5F0E8"],
  materials: ["lụa", "gấm", "vải lanh", "cotton cao cấp", "tơ tằm"],
  period: "nguyen",
  region: "central",
  imageUrl: resolveImageFile("flatlay", "ao-ngu-than").src,
  tags: ["áo ngũ thân", "cổ phục", "trang trọng", "tay chẽn", "5 vạt", "Nhà Nguyễn"],
};

export const costumeAoTac: BaseCostume = {
  id: "costume-ao-tac-001",
  name: "Áo Tấc",
  nameEn: "Short Heritage Tunic",
  type: "ao-tac",
  description:
    "Áo Tấc — còn gọi là áo ngũ thân ngắn — phổ biến trong dân gian thế kỷ 18–20. Thân ngắn hơn áo dài, thường mặc với quần lụng trắng. Linh hoạt hơn Ngũ Thân, phù hợp nhiều hoạt động đời thường.",
  suitableContexts: ["daily", "festival", "casual_modern", "photoshoot"],
  traditionalColors: ["#2C3E50", "#8B2635", "#E8D5B7", "#1A1A1A", "#4A7856"],
  materials: ["lụa Hà Đông", "vải cotton", "linen", "tơ tằm"],
  period: "nguyen",
  region: "north",
  imageUrl: resolveImageFile("flatlay", "ao-tac").src,
  tags: ["áo tấc", "cổ phục", "dân gian", "linh hoạt", "ngắn"],
};

/* ============================================================
   HERITAGE CARDS — Thẻ tri thức di sản
   ============================================================ */

export const heritageCardNguThan: HeritageCard = {
  id: "heritage-ngu-than-history-001",
  title: "Nguồn gốc và Ý nghĩa của Áo Ngũ Thân",
  type: "history",
  content:
    "Áo Ngũ Thân ra đời vào thế kỷ 17–18, được chính thức hóa dưới thời Chúa Nguyễn Phúc Khoát (1744). Gồm 5 vạt: 2 vạt trước, 2 vạt sau và 1 vạt con bên trong — 5 vạt tượng trưng cho ngũ luân (5 mối quan hệ: quân-thần, phụ-tử, phu-phụ, huynh-đệ, bằng hữu) và ngũ thường (nhân, nghĩa, lễ, trí, tín) trong Nho giáo. Áo Ngũ Thân không chỉ là trang phục mà là tuyên ngôn về đạo đức và căn cước văn hóa Việt.",
  summary:
    "5 vạt của Áo Ngũ Thân tượng trưng cho ngũ luân và ngũ thường trong Nho giáo — ra đời từ thế kỷ 17 thời Chúa Nguyễn.",
  relatedCostumeIds: ["costume-ngu-than-001"],
  period: "nguyen",
  tags: ["lịch sử", "Nhà Nguyễn", "Nho giáo", "ngũ luân", "ngũ thường"],
  sources: [
    "Lê Quý Đôn — Phủ Biên Tạp Lục",
    "Viện Nghiên cứu Văn hóa Nghệ thuật Quốc gia",
  ],
  level: "intermediate",
};

export const heritageCardNguThanStyle: HeritageCard = {
  id: "heritage-ngu-than-style-001",
  title: "Cách Phối Áo Ngũ Thân Tay Chẽn — Hiện đại mà vẫn Truyền thống",
  type: "etiquette",
  content:
    "Khi phối Áo Ngũ Thân tay chẽn theo phong cách đương đại, cần giữ cân bằng giữa cổ điển và hiện đại. Phần trên (áo) giữ nguyên tính truyền thống; phần dưới có thể kết hợp quần âu hoặc quần suông hiện đại. Màu sắc áo nên chọn đơn sắc (navy, đen, trắng ngà, đất nung) để dễ phối. Tránh họa tiết to, màu neon hay phụ kiện quá hiện đại như sneakers chunky.",
  summary:
    "Giữ áo truyền thống, linh hoạt phần dưới — bí quyết phối Ngũ Thân đương đại thành công.",
  relatedCostumeIds: ["costume-ngu-than-001"],
  tags: ["phối đồ", "đương đại", "tips", "màu sắc"],
  level: "beginner",
};

export const heritageCardVanMieu: HeritageCard = {
  id: "heritage-van-mieu-etiquette-001",
  title: "Lễ Nghi Trang Phục tại Di tích Văn Hóa — Văn Miếu và Đền Chùa",
  type: "etiquette",
  content:
    "Tại các không gian tâm linh và di tích lịch sử như Văn Miếu Quốc Tử Giám, Chùa Hương hay Đền Hùng, trang phục cần đáp ứng tiêu chuẩn tôn kính: (1) Che kín vai, ngực và đùi; (2) Không mặc quần short, váy ngắn trên gối; (3) Tránh màu sắc quá sặc sỡ, họa tiết phản cảm; (4) Nên mặc trang phục có nguồn gốc văn hóa Việt để thể hiện sự tôn trọng với tiền nhân.",
  summary:
    "Di tích văn hóa yêu cầu trang phục kín đáo: che vai, che đùi, tránh quần short và màu sắc phản cảm.",
  relatedCostumeIds: ["costume-ao-tac-001", "costume-ngu-than-001"],
  tags: ["lễ nghi", "Văn Miếu", "đền chùa", "tôn kính", "quy định trang phục"],
  level: "beginner",
};

export const heritageCardColorMeaning: HeritageCard = {
  id: "heritage-color-meaning-001",
  title: "Ý Nghĩa Màu Sắc trong Cổ Phục Việt",
  type: "color_meaning",
  content:
    "Màu sắc trong cổ phục Việt Nam mang tầng nghĩa sâu sắc: Vàng/Vàng Kim (#D4AF37) — màu hoàng tộc, chỉ thiên tử dùng trong triều nghi (nay tự do hơn trong ứng dụng đương đại). Đỏ Son (#9E2A2B) — cát tường, niềm vui, lễ cưới. Xanh lam sẫm (#1E3A5F) — sĩ phu, tri thức, phẩm giá. Trắng — tang lễ trong văn hóa cổ (cần thận trọng khi phối nhiều trắng tại lễ vui). Đen — trang trọng, hiện đại. Các màu neon hoặc gradient nhiều màu không có nguồn gốc trong cổ phục.",
  summary:
    "Vàng = hoàng tộc, Đỏ = cát tường, Xanh lam = tri thức, Trắng = tang lễ (thận trọng), Đen = trang trọng.",
  relatedCostumeIds: ["costume-ngu-than-001", "costume-ao-tac-001"],
  tags: ["màu sắc", "ý nghĩa", "biểu tượng", "kiêng kỵ"],
  level: "intermediate",
};

/* ============================================================
   CASE 1 — Áo Ngũ Thân Tay Chẽn
   STATUS: GREEN ✅ (Fully Approved)
   ============================================================ */

const guardrailCase1: CulturalGuardrail = {
  status: "GREEN",
  culturalScore: 95,
  statusMessage:
    "Xuất sắc! Cách phối đồ này thể hiện sự tôn trọng di sản văn hóa Việt Nam và hoàn toàn phù hợp với tiêu chuẩn văn hóa.",
  violations: [],
  suggestions: [
    {
      suggestion: "Có thể thêm khăn lụa quàng cổ tông màu vàng gold (#D4AF37) để tăng thêm điểm nhấn di sản.",
      reason: "Màu vàng gold là màu di sản, tạo sự kết nối với cổ phục mà không phá vỡ tính chỉnh thể.",
    },
  ],
  explanation:
    "Áo Ngũ Thân Tay Chẽn phối với quần âu tối màu và giày da là combination được cộng đồng cổ phục Việt đánh giá cao. Cách phối giữ nguyên linh hồn trang phục trong khi tạo sự tiện lợi cho sinh hoạt đương đại. Màu sắc đơn sắc navy và đen hài hòa với nhau.",
};

const stylingMixCase1: StylingMix = {
  id: "mix-ngu-than-daily-001",
  title: "Ngũ Thân Đường Phố — Neo-Heritage Minimal",
  style: "Neo-Heritage Minimalist",
  baseCostumeId: "costume-ngu-than-001",
  context: "casual_modern",
  overallDescription:
    "Áo Ngũ Thân Tay Chẽn navy phối cùng quần âu đen và Oxford shoes da đen. Phong cách tối giản đương đại giúp cổ phục hòa quyện tự nhiên vào nhịp sống Gen Z mà vẫn giữ được vẻ đẹp di sản.",
  items: [
    {
      name: "Áo Ngũ Thân Tay Chẽn",
      category: "top",
      colors: ["#1E3A5F"],
      materials: ["lụa cotton pha", "linen cao cấp"],
      rationale: "Màu navy tạo nền tảng sang trọng, dễ phối với nhiều item hiện đại.",
    },
    {
      name: "Quần âu suông cắt thẳng",
      category: "bottom",
      colors: ["#1A1A1A", "#2C2C2C"],
      materials: ["wool pha polyester", "cotton twill"],
      rationale:
        "Quần âu dáng suông (wide-leg hoặc straight cut) tạo silhouette hài hòa với thân áo 5 vạt. Tránh skinny jeans hoặc quần bó.",
      brandReferences: ["Uniqlo", "COS", "Hàng đặt may nội địa"],
    },
    {
      name: "Oxford shoes da đen",
      category: "shoes",
      colors: ["#1A1A1A"],
      materials: ["da bò thật", "da tổng hợp cao cấp"],
      rationale: "Oxford bán dress code — đủ trang trọng cho cổ phục, không quá formal.",
    },
    {
      name: "Khăn lụa quàng cổ nhẹ",
      category: "accessory",
      colors: ["#D4AF37", "#F5ECC8"],
      materials: ["lụa tơ tằm", "lụa nhân tạo cao cấp"],
      rationale: "Điểm nhấn vàng gold liên kết với màu di sản, thêm chiều sâu cho outfit.",
    },
  ],
  stylingTips: [
    "Để lộ cổ áo Ngũ Thân — đừng mặc áo cổ tàu bên trong vì sẽ che mất cổ áo đặc trưng.",
    "Cài khuy áo đầy đủ — để hở khuy giữa trông cẩu thả với cổ phục.",
    "Chọn quần không có túi hộp to (cargo style) — phá vỡ silhouette cổ điển.",
    "Tóc gọn gàng hoặc buộc thấp — để tóc xù sẽ xung đột với phong cách minimal của áo.",
  ],
  budgetRange: {
    min: 800000,
    max: 3500000,
    currency: "VND",
  },
};

export const outfitResponseCase1: OutfitResponse = {
  sessionId: "session-001-ngu-than-green",
  timestamp: "2026-10-01T07:00:00+07:00",
  userInput: {
    prompt:
      "Tôi muốn phối Áo Ngũ Thân Tay Chẽn màu navy để mặc đi cà phê và dạo phố cuối tuần. Style hiện đại nhưng vẫn giữ được hồn cổ phục.",
    context: "casual_modern",
    preferences: ["tối giản", "dễ di chuyển", "phong cách Gen Z"],
  },
  selectedCostumes: [costumeNguThan],
  stylingMixes: [stylingMixCase1],
  guardrail: guardrailCase1,
  heritageCards: [heritageCardNguThan, heritageCardNguThanStyle, heritageCardColorMeaning],
  confidenceScore: 0.95,
  modelVersion: "sac-viet-stylist-v1.0-mock",
};

/* ============================================================
   CASE 2 — Áo Tấc tại Văn Miếu
   STATUS: YELLOW ⚠️ (Context Caution)
   ============================================================ */

const guardrailCase2: CulturalGuardrail = {
  status: "YELLOW",
  culturalScore: 62,
  statusMessage:
    "Chú ý ngữ cảnh! Áo Tấc phù hợp về mặt văn hóa, nhưng cách phối cụ thể cần điều chỉnh để phù hợp với không gian Văn Miếu.",
  violations: [
    {
      type: "wrong_context",
      description:
        "Phối Áo Tấc với sneakers và túi canvas quá thường ngày (casual) khi đến Văn Miếu Quốc Tử Giám — không gian thờ tự và di tích lịch sử trang nghiêm.",
      severity: "minor",
    },
    {
      type: "inappropriate_combination",
      description:
        "Màu áo tấc đỏ tươi (bright red) có thể bị hiểu nhầm là phục trang biểu diễn, không phù hợp với tính tôn nghiêm của di tích.",
      severity: "minor",
    },
  ],
  suggestions: [
    {
      suggestion: "Đổi sneakers sang giày vải đế phẳng hoặc giày da đơn giản.",
      reason: "Sneakers chunky tạo sự tương phản quá lớn với không gian trang nghiêm của Văn Miếu.",
    },
    {
      suggestion: "Chọn màu áo tấc đơn sắc: navy, đen, nâu đất hoặc xanh lá trầm thay vì đỏ tươi.",
      reason:
        "Màu trầm thể hiện sự kính trọng; màu đỏ tươi có thể gây hiểu lầm về mục đích mặc.",
    },
    {
      suggestion: "Thêm quần lụng trắng truyền thống thay vì jeans — nếu muốn giữ phong cách thuần cổ phục.",
      reason: "Quần lụng là pair truyền thống với Áo Tấc, tăng sự phù hợp với ngữ cảnh di tích.",
    },
  ],
  explanation:
    "Áo Tấc là trang phục dân gian Việt có lịch sử, hoàn toàn phù hợp để mặc tại Văn Miếu. Tuy nhiên, cách PHỐI ĐỒ cần điều chỉnh: phần dưới và phụ kiện phải phản ánh sự tôn kính với không gian tâm linh. Đây là caution về styling, không phải về bản thân cổ phục.",
  contextualReason:
    "Văn Miếu Quốc Tử Giám là Quốc Tử Giám đầu tiên của Việt Nam, thờ Khổng Tử và các bậc hiền triết. Quy định không chính thức yêu cầu trang phục kín đáo và trang nghiêm.",
};

const stylingMixCase2: StylingMix = {
  id: "mix-ao-tac-temple-001",
  title: "Áo Tấc Thăm Di Tích — Trang Nghiêm & Thanh Lịch",
  style: "Traditional Respectful",
  baseCostumeId: "costume-ao-tac-001",
  context: "temple",
  overallDescription:
    "Áo Tấc navy/đen phối quần lụng trắng truyền thống, giày vải đế phẳng. Đây là combination chuẩn mực khi thăm Văn Miếu, tôn vinh di sản trong không gian tâm linh.",
  items: [
    {
      name: "Áo Tấc",
      category: "top",
      colors: ["#1E3A5F", "#1A1A1A"],
      materials: ["lụa", "vải satin mờ"],
      rationale: "Màu navy hoặc đen — trang nghiêm, phù hợp không gian di tích.",
    },
    {
      name: "Quần lụng trắng (cạp chun)",
      category: "bottom",
      colors: ["#F5F0E8", "#FFFFFF"],
      materials: ["lụa trắng", "vải Kate trắng"],
      rationale: "Quần lụng là pair truyền thống của Áo Tấc — hoàn toàn phù hợp ngữ cảnh Văn Miếu.",
    },
    {
      name: "Giày vải đế phẳng (Hán phong)",
      category: "shoes",
      colors: ["#1A1A1A", "#4A3728"],
      rationale: "Giày vải đế phẳng gần với footwear cổ truyền, hài hòa với outfit.",
    },
    {
      name: "Khăn đầu rìu hoặc để đầu trần",
      category: "headwear",
      colors: ["#1A1A1A"],
      rationale: "Khăn đầu rìu (khăn xếp đơn giản) tùy chọn — tăng tính truyền thống.",
    },
  ],
  stylingTips: [
    "Đến Văn Miếu: giữ áo cài đủ khuy, không để hở ngực.",
    "Tránh túi to (tote bag) — nên dùng túi vải nhỏ hoặc bỏ túi áo.",
    "Không đeo headphone hay tai nghe bluetooth khi trong khuôn viên thờ tự.",
    "Màu sắc trầm (navy, đen) thể hiện sự tôn kính hơn màu sáng.",
  ],
  budgetRange: {
    min: 500000,
    max: 2000000,
    currency: "VND",
  },
};

export const outfitResponseCase2: OutfitResponse = {
  sessionId: "session-002-ao-tac-yellow",
  timestamp: "2026-10-01T08:00:00+07:00",
  userInput: {
    prompt:
      "Tôi muốn mặc Áo Tấc đỏ phối sneakers và jeans để đến thăm Văn Miếu Quốc Tử Giám chụp ảnh kỷ niệm.",
    context: "temple",
    preferences: ["phong cách trẻ trung", "dễ di chuyển", "chụp ảnh đẹp"],
  },
  selectedCostumes: [costumeAoTac],
  stylingMixes: [stylingMixCase2],
  guardrail: guardrailCase2,
  heritageCards: [heritageCardVanMieu, heritageCardColorMeaning],
  confidenceScore: 0.72,
  modelVersion: "sac-viet-stylist-v1.0-mock",
};

/* ============================================================
   CASE 3 — Áo Tấc + Quần Short
   STATUS: RED 🚫 (Cultural Violation)
   ============================================================ */

const guardrailCase3: CulturalGuardrail = {
  status: "RED",
  culturalScore: 18,
  statusMessage:
    "Không khuyến nghị. Kết hợp này vi phạm nghiêm trọng chuẩn mực văn hóa cổ phục Việt Nam và gây hiểu lầm về di sản.",
  violations: [
    {
      type: "inappropriate_combination",
      description:
        "Phối Áo Tấc (cổ phục nghiêm trang) với quần short là sự kết hợp mâu thuẫn về thẩm mỹ và văn hóa. Áo Tấc yêu cầu phần dưới che đủ đùi và có độ trang trọng nhất định.",
      severity: "severe",
    },
    {
      type: "disrespectful_modification",
      description:
        "Quần short trong bối cảnh cổ phục bị cộng đồng văn hóa Việt đánh giá là thiếu tôn trọng với di sản, đặc biệt khi cố ý ghép với áo truyền thống.",
      severity: "severe",
    },
    {
      type: "historical_inaccuracy",
      description:
        "Không có tiền lệ lịch sử hay văn hóa nào cho việc mặc áo tấc/ngũ thân với quần short. Đây là sự kết hợp tùy tiện không có cơ sở.",
      severity: "moderate",
    },
  ],
  suggestions: [
    {
      suggestion: "Thay quần short bằng quần âu dáng thẳng hoặc quần lụng truyền thống.",
      reason:
        "Quần âu thẳng hoặc quần lụng đảm bảo sự hài hòa thẩm mỹ và tôn trọng tính toàn vẹn của cổ phục.",
    },
    {
      suggestion: "Nếu muốn mặc quần short, hãy bỏ áo Tấc và chọn áo thun/áo polo thông thường.",
      reason: "Đây là cách đơn giản nhất để tránh vi phạm văn hóa — không phối cổ phục với quần ngắn.",
    },
    {
      suggestion:
        "Tham khảo Case 1 (Ngũ Thân + quần âu) để có gợi ý phối cổ phục đường phố phù hợp.",
      reason: "Phối cổ phục casual hoàn toàn khả thi khi chọn đúng bottoms.",
    },
  ],
  explanation:
    "Áo Tấc là trang phục mang tính lịch sử và văn hóa cao. Kết hợp với quần short không chỉ phá vỡ thẩm mỹ truyền thống mà còn gửi thông điệp sai về di sản. Cộng đồng nghiên cứu cổ phục Việt và các nhà văn hóa học đều không ủng hộ sự kết hợp này. Sắc Việt AI Stylist khuyến nghị mạnh mẽ KHÔNG mặc combination này.",
  contextualReason:
    "Trong bất kỳ ngữ cảnh nào — dù casual, festival hay photoshoot — Áo Tấc yêu cầu phần dưới che ít nhất đến đầu gối và có tính trang trọng tương xứng.",
};

const stylingMixCase3Rejected: StylingMix = {
  id: "mix-ao-tac-short-rejected-001",
  title: "Áo Tấc + Quần Short",
  style: "Rejected Combination",
  baseCostumeId: "costume-ao-tac-001",
  context: "casual_modern",
  overallDescription:
    "Kết hợp này bị từ chối bởi Cultural Guardrail. Xem mục Gợi ý thay thế để có các lựa chọn phù hợp hơn.",
  items: [
    {
      name: "Áo Tấc (đề xuất gốc)",
      category: "top",
      colors: ["#8B2635"],
      rationale: "Áo Tấc không phù hợp khi phối với quần short.",
    },
    {
      name: "Quần short (Chưa phù hợp)",
      category: "bottom",
      colors: ["#1A1A1A"],
      rationale:
        "CHƯA PHÙ HỢP: Quần short vi phạm chuẩn mực văn hóa khi phối với cổ phục Việt Nam.",
    },
  ],
  stylingTips: [
    "Khuyến nghị không nên mặc combination này trong bất kỳ ngữ cảnh nào.",
    "Gợi ý thay thế: Áo Tấc + Quần âu đen thẳng + Oxford shoes — xem Case 1.",
    "Gợi ý thay thế: Áo Tấc + Quần lụng trắng — truyền thống và đúng mực.",
    "Khi chọn quần short: Chọn áo thun đơn giản thay vì ghép với cổ phục.",
  ],
};

export const outfitResponseCase3: OutfitResponse = {
  sessionId: "session-003-ao-tac-red-violation",
  timestamp: "2026-10-01T09:00:00+07:00",
  userInput: {
    prompt:
      "Cho tôi gợi ý phối Áo Tấc với quần short jeans và sneakers trắng để đi chơi hè.",
    context: "casual_modern",
    preferences: ["mát mẻ", "năng động", "mùa hè"],
  },
  selectedCostumes: [costumeAoTac],
  stylingMixes: [stylingMixCase3Rejected],
  guardrail: guardrailCase3,
  heritageCards: [heritageCardColorMeaning, heritageCardNguThanStyle],
  confidenceScore: 0.18,
  modelVersion: "sac-viet-stylist-v1.0-mock",
};

/* ============================================================
   EXPORTS — Aggregated collections
   ============================================================ */

/** Tất cả BaseCostume mẫu (5 loại chuẩn hóa) */
export const ALL_COSTUMES: BaseCostume[] = COSTUMES;

/** Tất cả HeritageCard mẫu */
export const ALL_HERITAGE_CARDS: HeritageCard[] = [
  heritageCardNguThan,
  heritageCardNguThanStyle,
  heritageCardVanMieu,
  heritageCardColorMeaning,
];

/** Tất cả OutfitResponse mẫu (3 cases) */
export const ALL_OUTFIT_RESPONSES: OutfitResponse[] = [
  outfitResponseCase1,
  outfitResponseCase2,
  outfitResponseCase3,
];

/** Map nhanh theo guardrail status */
export const OUTFIT_BY_STATUS = {
  GREEN: outfitResponseCase1,
  YELLOW: outfitResponseCase2,
  RED: outfitResponseCase3,
} as const;
