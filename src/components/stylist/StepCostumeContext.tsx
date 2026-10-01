"use client";

/**
 * components/stylist/StepCostumeContext.tsx
 * ==========================================
 * Bước 2: Carousel chọn cổ phục + Pills ngữ cảnh + Weather presets.
 *
 * Layout:
 *   (A) Costume cards — 5 loại, horizontal scroll on mobile, grid on desktop
 *   (B) Context pills — Văn Miếu, Kỷ yếu, Dạo phố, Đám cưới...
 *   (C) Weather quick-select — 4 preset buttons với fabric suggestion
 *   (D) Next button — enabled khi có costume + context
 */

import { Check, Thermometer, ChevronLeft, ChevronRight, Leaf } from "lucide-react";
import Image from "next/image";
import {
  useStylist,
  WEATHER_PRESETS,
  type CostumeId,
  type ContextType,
  type WeatherPreset,
  type SelectedCostume,
} from "@/context/StylistContext";

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
      { hex: "#1E3A5F", name: "Xanh lam sẫm" },
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
    nameEn: "Short Heritage Tunic",
    dynasty: "Dân gian · Thế kỷ 18–20",
    colors: [
      { hex: "#4A7856", name: "Xanh trầm" },
      { hex: "#1A1A1A", name: "Đen huyền" },
      { hex: "#7B5E3A", name: "Nâu đất" },
      { hex: "#1E3A5F", name: "Xanh lam" },
    ],
    description: "Ngắn hơn · Linh hoạt · Đời thường",
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
    dynasty: "Nhà Lê · Bắc Bộ",
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

/* ── Context options ── */
const CONTEXTS: { id: ContextType; label: string; emoji: string; guardrailNote?: string }[] = [
  { id: "dao-pho", label: "Dạo phố", emoji: "🌆" },
  { id: "ky-yeu", label: "Kỷ yếu", emoji: "🎓" },
  { id: "chup-anh", label: "Chụp ảnh NT", emoji: "📸" },
  { id: "van-mieu", label: "Văn Miếu / Di tích", emoji: "🏛️", guardrailNote: "Cần trang phục kín đáo" },
  { id: "dam-cuoi", label: "Đám cưới", emoji: "💒" },
  { id: "le-hoi", label: "Lễ hội / Tết", emoji: "🎆" },
];

/* ── Costume Card ── */
function CostumeCard({
  costume,
  isSelected,
  onSelect,
}: {
  costume: CostumeOption;
  isSelected: boolean;
  onSelect: (costume: CostumeOption, colorHex: string) => void;
}) {
  return (
    <div
      id={`costume-card-${costume.id}`}
      className={`group relative flex flex-col overflow-hidden rounded-2xl border-2 transition-all duration-300 ${
        isSelected
          ? "border-[#D4AF37] shadow-xl shadow-[#D4AF37]/20"
          : "border-[#E5DECE] hover:border-[#D4AF37]/50 hover:shadow-lg"
      }`}
    >
      {/* Selected checkmark */}
      {isSelected && (
        <div
          className="absolute right-3 top-3 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-[#D4AF37] shadow-md"
          aria-hidden="true"
        >
          <Check className="h-4 w-4 text-[#1E3A5F]" strokeWidth={2.5} />
        </div>
      )}

      {/* Image area */}
      <button
        type="button"
        onClick={() => onSelect(costume, costume.colors[0].hex)}
        aria-pressed={isSelected}
        aria-label={`${isSelected ? "Đang chọn" : "Chọn"} ${costume.name} — ${costume.dynasty}`}
        className="relative block aspect-[3/4] w-full overflow-hidden bg-[#F3EFE8] focus-visible:outline-2 focus-visible:outline-[#D4AF37]"
      >
        <Image
          src="/hero-editorial.jpg"
          alt={`${costume.name} — ${costume.nameEn}`}
          fill
          sizes="(max-width: 640px) 50vw, 20vw"
          className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
          quality={75}
        />
        {/* Gradient overlay */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"
          aria-hidden="true"
        />
        {/* Dynasty label */}
        <div className="absolute bottom-3 left-3 right-3">
          <p className="font-playfair text-sm font-bold text-white drop-shadow-sm">
            {costume.name}
          </p>
          <p className="mt-0.5 text-[10px] text-white/80">{costume.dynasty}</p>
        </div>
      </button>

      {/* Color selector */}
      {isSelected && (
        <div className="flex gap-2 bg-white p-3">
          <p className="text-[10px] font-semibold uppercase tracking-wide text-[#6B7280]">
            Màu:
          </p>
          <div className="flex flex-1 flex-wrap gap-1.5">
            {costume.colors.map((c) => (
              <button
                key={c.hex}
                type="button"
                onClick={() => onSelect(costume, c.hex)}
                title={c.name}
                aria-label={`Chọn màu ${c.name}`}
                className="h-5 w-5 rounded-full border-2 border-white shadow ring-1 ring-black/10 transition-transform hover:scale-110 focus-visible:outline-2 focus-visible:outline-[#D4AF37]"
                style={{ backgroundColor: c.hex }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Main component ── */
export function StepCostumeContext() {
  const { state, dispatch, nextStep, prevStep, canProceedStep2 } = useStylist();
  const { selectedCostume, selectedContext, selectedWeather } = state;

  const handleSelectCostume = (costume: CostumeOption, colorHex: string) => {
    const payload: SelectedCostume = {
      id: costume.id,
      name: costume.name,
      nameEn: costume.nameEn,
      color: colorHex,
    };
    dispatch({ type: "SELECT_COSTUME", payload });
  };

  const handleSelectContext = (ctx: ContextType) => {
    dispatch({ type: "SELECT_CONTEXT", payload: ctx });
  };

  const handleSelectWeather = (preset: WeatherPreset) => {
    dispatch({ type: "SELECT_WEATHER", payload: WEATHER_PRESETS[preset] });
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Heading */}
      <div>
        <h2 className="font-playfair text-2xl font-bold text-[#1E3A5F] sm:text-3xl">
          Chọn Cổ Phục & Ngữ Cảnh
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-[#4A6A8F]">
          Lựa chọn trang phục và cho chúng tôi biết bạn sẽ mặc ở đâu — AI sẽ
          điều chỉnh gợi ý phụ kiện và kiểm định văn hóa phù hợp.
        </p>
      </div>

      {/* ── COSTUME CAROUSEL ── */}
      <section aria-labelledby="costume-select-heading">
        <h3
          id="costume-select-heading"
          className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-[#1E3A5F]"
        >
          <span className="h-px flex-1 bg-[#E5DECE]" aria-hidden="true" />
          <span>✦ Chọn loại cổ phục</span>
          <span className="h-px flex-1 bg-[#E5DECE]" aria-hidden="true" />
        </h3>

        {/* Horizontal scroll on mobile, grid on md+ */}
        <div
          className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5"
          role="group"
          aria-label="Danh sách cổ phục — chọn một loại"
        >
          {COSTUMES.map((costume) => (
            <CostumeCard
              key={costume.id}
              costume={costume}
              isSelected={selectedCostume?.id === costume.id}
              onSelect={handleSelectCostume}
            />
          ))}
        </div>

        {/* Selected summary */}
        {selectedCostume && (
          <div className="mt-3 flex items-center gap-2.5 rounded-xl border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-4 py-2.5">
            <div
              className="h-4 w-4 rounded-full border border-white shadow-sm"
              style={{ backgroundColor: selectedCostume.color }}
              aria-hidden="true"
            />
            <p className="text-sm font-semibold text-[#1E3A5F]">
              Đã chọn: {selectedCostume.name}
            </p>
          </div>
        )}
      </section>

      {/* ── CONTEXT PILLS ── */}
      <section aria-labelledby="context-select-heading">
        <h3
          id="context-select-heading"
          className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-[#1E3A5F]"
        >
          <span className="h-px flex-1 bg-[#E5DECE]" aria-hidden="true" />
          <span>✦ Bạn sẽ mặc ở đâu?</span>
          <span className="h-px flex-1 bg-[#E5DECE]" aria-hidden="true" />
        </h3>

        <div
          className="flex flex-wrap gap-2.5"
          role="group"
          aria-label="Ngữ cảnh mặc trang phục"
        >
          {CONTEXTS.map(({ id, label, emoji, guardrailNote }) => {
            const isSelected = selectedContext === id;
            return (
              <button
                key={id}
                id={`ctx-btn-${id}`}
                type="button"
                onClick={() => handleSelectContext(id)}
                aria-pressed={isSelected}
                aria-label={`${isSelected ? "Đang chọn" : "Chọn"} ngữ cảnh ${label}${guardrailNote ? ` — Lưu ý: ${guardrailNote}` : ""}`}
                className={`flex min-h-[44px] items-center gap-2 rounded-full border-2 px-4 py-2 text-sm font-semibold transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4AF37] ${
                  isSelected
                    ? "border-[#9E2A2B] bg-[#9E2A2B] text-white shadow-md"
                    : "border-[#E5DECE] bg-white text-[#1E3A5F] hover:border-[#9E2A2B]/40 hover:bg-[#FAF8F5]"
                }`}
              >
                <span aria-hidden="true">{emoji}</span>
                {label}
                {guardrailNote && (
                  <span
                    className={`text-[10px] font-normal ${isSelected ? "text-white/80" : "text-[#D97706]"}`}
                    title={guardrailNote}
                  >
                    ⚠
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </section>

      {/* ── WEATHER PRESETS ── */}
      <section aria-labelledby="weather-select-heading">
        <h3
          id="weather-select-heading"
          className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-[#1E3A5F]"
        >
          <span className="h-px flex-1 bg-[#E5DECE]" aria-hidden="true" />
          <span>✦ Thời tiết (tùy chọn)</span>
          <span className="h-px flex-1 bg-[#E5DECE]" aria-hidden="true" />
        </h3>

        <div
          className="grid grid-cols-2 gap-3 sm:grid-cols-4"
          role="group"
          aria-label="Chọn thời tiết để AI gợi ý chất liệu vải"
        >
          {(Object.keys(WEATHER_PRESETS) as WeatherPreset[]).map((preset) => {
            const w = WEATHER_PRESETS[preset];
            const isSelected = selectedWeather?.preset === preset;
            const isHot = w.temp >= 28;
            return (
              <button
                key={preset}
                id={`weather-btn-${preset}`}
                type="button"
                onClick={() => handleSelectWeather(preset)}
                aria-pressed={isSelected}
                aria-label={`${isSelected ? "Đang chọn" : "Chọn"} thời tiết ${w.city} ${w.temp}°C ${w.condition}`}
                className={`flex min-h-[44px] flex-col items-start gap-1 rounded-xl border-2 p-3 text-left transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4AF37] ${
                  isSelected
                    ? "border-[#D4AF37] bg-[#D4AF37]/15 shadow-md"
                    : "border-[#E5DECE] bg-white hover:border-[#D4AF37]/40"
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <Thermometer
                    className={`h-3.5 w-3.5 ${isHot ? "text-[#D97706]" : "text-[#2563EB]"}`}
                    aria-hidden="true"
                  />
                  <span className="text-sm font-bold text-[#1E3A5F]">
                    {w.city} {w.temp}°C
                  </span>
                </div>
                <span className="text-xs text-[#6B7280]">{w.condition}</span>
              </button>
            );
          })}
        </div>

        {/* Fabric suggestion */}
        {selectedWeather && (
          <div className="mt-3 flex items-start gap-2.5 rounded-xl border border-[#4A7856]/30 bg-[#4A7856]/10 px-4 py-3">
            <Leaf className="mt-0.5 h-4 w-4 shrink-0 text-[#4A7856]" aria-hidden="true" />
            <div>
              <p className="text-xs font-bold text-[#4A7856]">Gợi ý chất liệu vải</p>
              <p className="mt-0.5 text-sm text-[#1E3A5F]">
                {selectedWeather.fabricSuggestion}
              </p>
            </div>
          </div>
        )}
      </section>

      {/* ── NAVIGATION BUTTONS ── */}
      <div className="flex items-center justify-between gap-3 border-t border-[#E5DECE] pt-6">
        <button
          id="btn-step2-back"
          type="button"
          onClick={prevStep}
          className="flex min-h-[48px] items-center gap-2 rounded-xl border border-[#E5DECE] bg-white px-5 py-2.5 text-sm font-semibold text-[#1E3A5F] transition-all hover:border-[#D4AF37]/50 hover:bg-[#FAF8F5] focus-visible:outline-2 focus-visible:outline-[#D4AF37]"
          aria-label="Quay lại Bước 1"
        >
          <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          Quay lại
        </button>

        <button
          id="btn-step2-next"
          type="button"
          onClick={nextStep}
          disabled={!canProceedStep2}
          className="flex min-h-[48px] flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#9E2A2B] to-[#C4371C] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-[#9E2A2B]/20 transition-all hover:shadow-xl hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50 disabled:translate-y-0 disabled:shadow-none focus-visible:outline-2 focus-visible:outline-[#9E2A2B]"
          aria-label={
            canProceedStep2
              ? "Tiếp tục sang Bước 3: Mix phụ kiện"
              : "Chưa đủ điều kiện — chọn cổ phục và ngữ cảnh"
          }
          aria-disabled={!canProceedStep2}
        >
          Tiếp theo: Mix Phụ kiện
          <ChevronRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
