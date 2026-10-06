"use client";

/**
 * components/stylist/StepCostumeContext.tsx
 * ==========================================
 * Bước 2: Chọn Cổ phục + Ngữ cảnh + Weather presets.
 *
 * Yêu cầu đặc tả:
 *   - Thẻ Cổ phục: Hiển thị bằng ảnh flatlay (dùng getFlatlay).
 *   - Thẻ Ngữ cảnh: Dùng ảnh/bối cảnh (getScene) kết hợp icon Lucide (không dùng emoji).
 *     Giữ nguyên các ghi chú guardrail (vd: "Cần trang phục kín đáo").
 *   - Chọn Màu sắc: Cập nhật ngay lập tức. Nếu chọn màu chưa có ảnh chính xác,
 *     hiển thị cảnh báo nhỏ "Ảnh tham khảo, màu thực tế có thể khác".
 *   - Touch target >= 44px tối ưu mobile, đảm bảo đầy đủ aria-labels.
 */

import React from "react";
import {
  Check,
  Thermometer,
  ChevronLeft,
  ChevronRight,
  Leaf,
  AlertTriangle,
  Sparkles,
} from "lucide-react";
import {
  useStylist,
  WEATHER_PRESETS,
  type CostumeId,
  type ContextType,
  type WeatherPreset,
} from "@/context/StylistContext";
import { ImageSlot } from "@/components/common/ImageSlot";
import { getFlatlay, getSceneImage } from "@/lib/images";
import { CONTEXT_ICON } from "@/components/icons";

/* ── Costume catalog ── */
interface CostumeOption {
  id: CostumeId;
  name: string;
  nameEn: string;
  dynasty: string;
  colors: { hex: string; name: string }[];
  description: string;
  accentColor: string;
}

const COSTUMES: CostumeOption[] = [
  {
    id: "ao-ngu-than",
    name: "Áo Ngũ Thân Tay Chẽn",
    nameEn: "Five-Panel Tunic",
    dynasty: "Nhà Nguyễn · 1802–1945",
    colors: [
      { hex: "#1E3A5F", name: "Xanh lam sẫm (Chàm)" },
      { hex: "#9E2A2B", name: "Đỏ chu sa" },
      { hex: "#1A1A1A", name: "Đen huyền" },
      { hex: "#4A7856", name: "Xanh trầm" },
    ],
    description: "5 vạt · Trang trọng · Phổ biến nhất",
    accentColor: "#1E3A5F",
  },
  {
    id: "ao-tac",
    name: "Áo Tấc",
    nameEn: "Wide-Sleeve Heritage Robe",
    dynasty: "Nhà Nguyễn · Lễ phục tay thụng",
    colors: [
      { hex: "#4A7856", name: "Xanh trầm" },
      { hex: "#1A1A1A", name: "Đen huyền" },
      { hex: "#7B5E3A", name: "Nâu đất" },
      { hex: "#1E3A5F", name: "Xanh lam" },
    ],
    description: "Tay thụng rộng · Uy nghiêm · Đại lễ",
    accentColor: "#4A7856",
  },
  {
    id: "ao-nhat-binh",
    name: "Áo Nhật Bình",
    nameEn: "Square-Collar Court Robe",
    dynasty: "Nhà Nguyễn · Triều phục nữ",
    colors: [
      { hex: "#9E2A2B", name: "Đỏ son" },
      { hex: "#1E3A5F", name: "Xanh lam" },
      { hex: "#D4AF37", name: "Vàng kim" },
      { hex: "#2C3E50", name: "Xanh tối" },
    ],
    description: "Cổ vuông · Thêu phượng · Nghi lễ",
    accentColor: "#9E2A2B",
  },
  {
    id: "ao-tu-than",
    name: "Áo Tứ Thân",
    nameEn: "Four-Panel Dress",
    dynasty: "Dân gian Bắc Bộ · Thế kỷ 17–20",
    colors: [
      { hex: "#7B5E3A", name: "Nâu mật" },
      { hex: "#2C1810", name: "Nâu sẫm" },
      { hex: "#6B4C8F", name: "Tím" },
      { hex: "#4A7856", name: "Xanh" },
    ],
    description: "4 vạt · Dải lụa · Lễ hội dân gian",
    accentColor: "#7B5E3A",
  },
  {
    id: "ao-dai",
    name: "Áo Dài Tân Thời",
    nameEn: "Modern Áo Dài",
    dynasty: "Đương đại · 1930s – nay",
    colors: [
      { hex: "#F5F0E8", name: "Trắng ngà" },
      { hex: "#9E2A2B", name: "Đỏ son" },
      { hex: "#1E3A5F", name: "Xanh lam" },
      { hex: "#D4AF37", name: "Vàng" },
    ],
    description: "Quốc phục · Thanh lịch · Đa năng",
    accentColor: "#D4AF37",
  },
];

/* ── Context & Scene Helper ── */
export interface SceneOption {
  id: ContextType;
  label: string;
  guardrailNote?: string;
  description: string;
  bgGradient: string;
}

export function getScene(id: ContextType): SceneOption {
  const SCENES: Record<ContextType, SceneOption> = {
    "dao-pho": {
      id: "dao-pho",
      label: "Dạo phố",
      description: "Phố cổ, không gian đương đại năng động",
      bgGradient: "from-[#1E3A5F]/85 to-[#0F172A]/95",
    },
    "ky-yeu": {
      id: "ky-yeu",
      label: "Kỷ yếu",
      description: "Mùa tốt nghiệp, khuôn viên giảng đường",
      bgGradient: "from-[#78350F]/85 to-[#451A03]/95",
    },
    "chup-anh": {
      id: "chup-anh",
      label: "Chụp ảnh NT",
      description: "Studio nghệ thuật, concept sáng tạo",
      bgGradient: "from-[#4C1D95]/85 to-[#2E1065]/95",
    },
    "van-mieu": {
      id: "van-mieu",
      label: "Văn Miếu / Di tích",
      guardrailNote: "Cần trang phục kín đáo",
      description: "Không gian tôn nghiêm, chốn đền đài",
      bgGradient: "from-[#064E3B]/85 to-[#022C22]/95",
    },
    "dam-cuoi": {
      id: "dam-cuoi",
      label: "Đám cưới",
      description: "Hỷ sự, hôn lễ cổ truyền trang trọng",
      bgGradient: "from-[#7F1D1D]/85 to-[#450A0A]/95",
    },
    "le-hoi": {
      id: "le-hoi",
      label: "Lễ hội / Tết",
      description: "Hội xuân, trẩy hội di sản náo nhiệt",
      bgGradient: "from-[#78350F]/85 to-[#3B1A04]/95",
    },
  };
  return SCENES[id];
}

const CONTEXT_LIST: ContextType[] = [
  "dao-pho",
  "ky-yeu",
  "chup-anh",
  "van-mieu",
  "dam-cuoi",
  "le-hoi",
];

/* ── Costume Card với Flatlay Image ── */
function CostumeCard({
  costume,
  isSelected,
  selectedColor,
  onSelect,
}: {
  costume: CostumeOption;
  isSelected: boolean;
  selectedColor: string;
  onSelect: (costume: CostumeOption, colorHex: string) => void;
}) {
  const flatlay = getFlatlay(costume.id);
  const isCustomColor = isSelected && selectedColor !== costume.colors[0].hex;

  return (
    <div
      id={`costume-card-${costume.id}`}
      className={`group relative flex flex-col overflow-hidden rounded-2xl border-2 transition-all duration-300 ${
        isSelected
          ? "border-[#D4AF37] shadow-xl shadow-[#D4AF37]/20 bg-white"
          : "border-[#E5DECE] bg-[#FAF8F5] hover:border-[#D4AF37]/50 hover:shadow-md"
      }`}
    >
      {/* Selected checkmark badge */}
      {isSelected && (
        <div
          className="absolute right-3 top-3 z-20 flex h-7 w-7 items-center justify-center rounded-full bg-[#D4AF37] text-[#1E3A5F] shadow-md"
          aria-hidden="true"
        >
          <Check className="h-4 w-4" strokeWidth={2.5} />
        </div>
      )}

      {/* Main Flatlay Image Area (touch target >= 44px) */}
      <button
        type="button"
        onClick={() => onSelect(costume, selectedColor || costume.colors[0].hex)}
        aria-pressed={isSelected}
        aria-label={`${isSelected ? "Đang chọn" : "Chọn"} ${costume.name} — ${costume.dynasty}`}
        className="relative block aspect-[3/4] w-full min-h-[44px] overflow-hidden bg-white text-left focus-visible:outline-2 focus-visible:outline-[#D4AF37]"
      >
        <ImageSlot
          src={flatlay.src}
          alt={`Ảnh flatlay ${costume.name}`}
          available={flatlay.available}
          aspectRatio="3/4"
          className="w-full"
        />

        {/* Text overlay bottom */}
        <div className="absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-black/75 via-black/30 to-transparent p-3.5">
          <p className="font-playfair text-sm font-bold text-white drop-shadow-sm">
            {costume.name}
          </p>
          <p className="mt-0.5 text-[10px] text-white/80">{costume.dynasty}</p>
        </div>
      </button>

      {/* Color Swatch Selector (Touch targets >= 44px) */}
      <div className="border-t border-[#E5DECE] bg-white p-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B7280]">
            Bảng màu:
          </span>
          {isCustomColor && (
            <span className="text-[9px] text-[#D97706] italic flex items-center gap-0.5">
              <Sparkles className="h-2.5 w-2.5" />
              Đã đổi màu
            </span>
          )}
        </div>

        <div className="flex flex-wrap gap-1" role="radiogroup" aria-label={`Chọn màu cho ${costume.name}`}>
          {costume.colors.map((c) => {
            const isColorActive = isSelected && selectedColor === c.hex;
            return (
              <button
                key={c.hex}
                type="button"
                onClick={() => onSelect(costume, c.hex)}
                title={c.name}
                aria-label={`Chọn màu ${c.name}`}
                aria-checked={isColorActive}
                role="radio"
                className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg transition-transform focus-visible:outline-2 focus-visible:outline-[#D4AF37]"
              >
                <span
                  className={`h-6 w-6 rounded-full border-2 transition-all shadow-xs ${
                    isColorActive
                      ? "scale-110 border-[#1E3A5F] ring-2 ring-[#D4AF37]"
                      : "border-white hover:scale-105"
                  }`}
                  style={{ backgroundColor: c.hex }}
                />
              </button>
            );
          })}
        </div>

        {/* Dòng cảnh báo màu sắc nếu chọn màu biến thể */}
        {isCustomColor && (
          <p className="mt-2 text-[10px] leading-tight text-[#D97706] italic">
            * Ảnh tham khảo, màu thực tế có thể khác
          </p>
        )}
      </div>
    </div>
  );
}

/* ── Context Card với Scene & Icon ── */
function ContextCard({
  contextId,
  isSelected,
  onSelect,
}: {
  contextId: ContextType;
  isSelected: boolean;
  onSelect: (id: ContextType) => void;
}) {
  const scene = getScene(contextId);
  const sceneImg = getSceneImage(contextId);
  const IconComponent = CONTEXT_ICON[contextId] ?? Sparkles;

  return (
    <button
      id={`context-btn-${contextId}`}
      type="button"
      onClick={() => onSelect(contextId)}
      aria-pressed={isSelected}
      aria-label={`Ngữ cảnh ${scene.label}${scene.guardrailNote ? ` — Lưu ý: ${scene.guardrailNote}` : ""}`}
      className={`group relative flex w-full flex-col overflow-hidden rounded-xl border-2 p-2.5 text-left transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4AF37] cursor-pointer ${
        isSelected
          ? "border-[#D4AF37] bg-white shadow-md shadow-[#D4AF37]/15 ring-1 ring-[#D4AF37]"
          : "border-[#E5DECE] bg-[#FAF8F5] hover:border-[#D4AF37]/50 hover:bg-white"
      }`}
    >
      {/* Scene Image Frame */}
      <div className="relative mb-2 aspect-[16/9] w-full overflow-hidden rounded-lg bg-[#FAF8F5]">
        <ImageSlot
          src={sceneImg.src}
          alt={scene.label}
          available={sceneImg.available}
          aspectRatio="16/9"
          fallbackTitle={scene.label}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          quality={80}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent" />

        {/* Selected checkmark indicator */}
        {isSelected && (
          <span className="absolute top-2 right-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#D4AF37] text-[#1E3A5F] shadow-sm">
            <Check className="h-3 w-3" strokeWidth={2.5} />
          </span>
        )}

        <div className="absolute bottom-1.5 left-2 flex items-center gap-1.5 text-white">
          <div className="flex h-5 w-5 items-center justify-center rounded bg-black/40 backdrop-blur-xs">
            <IconComponent className="h-3 w-3 text-[#D4AF37]" />
          </div>
          <span className="font-playfair text-xs font-bold drop-shadow-xs">{scene.label}</span>
        </div>
      </div>

      <p className="text-[11px] leading-snug text-[#4A6A8F] line-clamp-1">{scene.description}</p>

      {/* Guardrail Warning Note (ví dụ: Văn Miếu) */}
      {scene.guardrailNote && (
        <div className="mt-2 flex items-center gap-1 rounded bg-[#FEF3C7] px-2 py-0.5 text-[10px] font-semibold text-[#D97706] border border-[#D97706]/20">
          <AlertTriangle className="h-3 w-3 shrink-0" />
          <span>{scene.guardrailNote}</span>
        </div>
      )}
    </button>
  );
}

/* ── Main Component ── */
export function StepCostumeContext() {
  const { state, dispatch, nextStep, prevStep } = useStylist();
  const { selectedCostume, selectedContext, selectedWeather } = state;

  const handleSelectCostume = (costume: CostumeOption, colorHex: string) => {
    dispatch({
      type: "SELECT_COSTUME",
      payload: {
        id: costume.id,
        name: costume.name,
        nameEn: costume.nameEn,
        color: colorHex,
      },
    });
  };

  const handleSelectContext = (contextId: ContextType) => {
    dispatch({ type: "SELECT_CONTEXT", payload: contextId });
  };

  const handleSelectWeather = (preset: WeatherPreset) => {
    dispatch({ type: "SELECT_WEATHER", payload: WEATHER_PRESETS[preset] });
  };

  const canProceed = selectedCostume !== null && selectedContext !== null;

  return (
    <div className="flex flex-col gap-10">
      {/* ── SECTION 1: CHỌN CỔ PHỤC (Ảnh flatlay) ── */}
      <section aria-labelledby="heading-costumes">
        <div className="mb-4">
          <span className="inline-block rounded-full bg-[#D4AF37]/15 px-3 py-0.5 text-[11px] font-bold uppercase tracking-wider text-[#D4AF37]">
            Bước 2.1
          </span>
          <h2
            id="heading-costumes"
            className="font-playfair mt-1 text-2xl font-bold text-[#1E3A5F]"
          >
            Chọn Cổ Phục & Màu Sắc
          </h2>
          <p className="mt-1 text-xs text-[#4A6A8F]">
            Chiêm ngưỡng hình ảnh bóc tách phẳng (flatlay) chuẩn xác của từng dáng áo và chọn màu ưng ý.
          </p>
        </div>

        {/* 5 Costume Cards Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {COSTUMES.map((costume) => (
            <CostumeCard
              key={costume.id}
              costume={costume}
              isSelected={selectedCostume?.id === costume.id}
              selectedColor={
                selectedCostume?.id === costume.id
                  ? selectedCostume.color
                  : costume.colors[0].hex
              }
              onSelect={handleSelectCostume}
            />
          ))}
        </div>
      </section>

      {/* ── SECTION 2: CHỌN NGỮ CẢNH (getScene + Icons, No Emoji) ── */}
      <section aria-labelledby="heading-context">
        <div className="mb-4">
          <span className="inline-block rounded-full bg-[#D4AF37]/15 px-3 py-0.5 text-[11px] font-bold uppercase tracking-wider text-[#D4AF37]">
            Bước 2.2
          </span>
          <h2
            id="heading-context"
            className="font-playfair mt-1 text-2xl font-bold text-[#1E3A5F]"
          >
            Chọn Ngữ Cảnh Sử Dụng
          </h2>
          <p className="mt-1 text-xs text-[#4A6A8F]">
            Mỗi không gian có một chuẩn mực y phục riêng biệt — AI sẽ tinh chỉnh gợi ý phù hợp.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {CONTEXT_LIST.map((ctxId) => (
            <ContextCard
              key={ctxId}
              contextId={ctxId}
              isSelected={selectedContext === ctxId}
              onSelect={handleSelectContext}
            />
          ))}
        </div>
      </section>

      {/* ── SECTION 3: THỜI TIẾT DỰ BÁO (Tùy chọn) ── */}
      <section aria-labelledby="heading-weather" className="rounded-2xl border border-[#E5DECE] bg-[#FAF8F5] p-5">
        <div className="mb-3 flex items-center gap-2">
          <Thermometer className="h-4 w-4 text-[#9E2A2B]" />
          <h3 id="heading-weather" className="font-playfair text-base font-bold text-[#1E3A5F]">
            Gợi ý Theo Thời Tiết (Tùy chọn)
          </h3>
        </div>

        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
          {(Object.keys(WEATHER_PRESETS) as WeatherPreset[]).map((key) => {
            const w = WEATHER_PRESETS[key];
            const isWSelected = selectedWeather?.preset === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => handleSelectWeather(key)}
                className={`flex min-h-[44px] flex-col justify-center rounded-xl border p-2.5 text-left transition-all ${
                  isWSelected
                    ? "border-[#D4AF37] bg-white shadow-xs"
                    : "border-[#E5DECE] bg-white/70 hover:border-[#D4AF37]/50"
                }`}
                aria-pressed={isWSelected}
                aria-label={`Thời tiết ${w.city}: ${w.condition}, ${w.temp} độ C`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#1E3A5F]">{w.city}</span>
                  <span className="text-xs font-semibold text-[#D4AF37]">{w.temp}°C</span>
                </div>
                <span className="text-[10px] text-[#4A6A8F]">{w.condition}</span>
              </button>
            );
          })}
        </div>

        {selectedWeather && (
          <div className="mt-3 flex items-center gap-2 rounded-lg bg-white p-2.5 border border-[#E5DECE] text-xs text-[#4A6A8F]">
            <Leaf className="h-3.5 w-3.5 text-[#16A34A] shrink-0" />
            <span>Gợi ý chất liệu: <strong>{selectedWeather.fabricSuggestion}</strong></span>
          </div>
        )}
      </section>

      {/* ── NAVIGATION BUTTONS (Touch targets >= 44px) ── */}
      <div className="flex items-center justify-between border-t border-[#E5DECE] pt-6">
        <button
          type="button"
          onClick={prevStep}
          className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-[#E5DECE] bg-white px-6 py-2.5 text-xs font-bold text-[#1E3A5F] transition-all hover:bg-[#FAF8F5] focus-visible:outline-2 focus-visible:outline-[#D4AF37]"
          aria-label="Quay lại Bước 1: Sắc da"
        >
          <ChevronLeft className="h-4 w-4" />
          Quay lại Bước 1
        </button>

        <button
          type="button"
          onClick={nextStep}
          disabled={!canProceed}
          className={`inline-flex min-h-[44px] items-center gap-2 rounded-full px-8 py-2.5 text-xs font-bold uppercase tracking-wider transition-all focus-visible:outline-2 focus-visible:outline-[#9E2A2B] ${
            canProceed
              ? "bg-[#9E2A2B] text-white shadow-md hover:bg-[#7D1F20] hover:shadow-lg cursor-pointer"
              : "bg-[#E5DECE] text-[#A0988A] cursor-not-allowed"
          }`}
          aria-label="Tiếp tục sang Bước 3: Mix Phụ kiện"
        >
          Tiếp tục sang Bước 3
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

export default StepCostumeContext;
