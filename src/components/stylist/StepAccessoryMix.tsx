"use client";

/**
 * components/stylist/StepAccessoryMix.tsx
 * =========================================
 * Bước 3: Chọn phụ kiện Gen Z + Preview panel + CTA "Kiểm tra Chuẩn mực".
 *
 * Layout (2 cột trên desktop):
 *   LEFT:  Danh sách phụ kiện (toggle chip cards)
 *   RIGHT: Preview "Bộ sưu tập đã chọn" + nút CTA
 *
 * Risky items (quần short) được đánh dấu cảnh báo.
 */

import {
  ChevronLeft,
  Wand2,
  ShieldCheck,
  AlertTriangle,
  X,
  CheckCircle2,
} from "lucide-react";
import {
  useStylist,
  ALL_ACCESSORIES,
  type AccessoryId,
} from "@/context/StylistContext";

/* ── Category group labels ── */
const CATEGORY_LABELS: Record<string, string> = {
  footwear: "👞 Giày dép",
  eyewear: "🕶️ Kính mắt",
  bag: "🛍️ Túi xách",
  neckwear: "🧣 Khăn cổ",
  headwear: "🎩 Đội đầu",
  jewelry: "💍 Trang sức",
  bottom: "👖 Quần",
};

/* ── Guardrail preview chip ── */
function AccessoryChip({
  accessory,
  isSelected,
  onToggle,
}: {
  accessory: (typeof ALL_ACCESSORIES)[0];
  isSelected: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      id={`accessory-${accessory.id}`}
      type="button"
      onClick={onToggle}
      aria-pressed={isSelected}
      aria-label={`${isSelected ? "Bỏ chọn" : "Chọn"} phụ kiện ${accessory.name}${accessory.isRisky ? " — Cảnh báo: có thể ảnh hưởng điểm văn hóa" : ""}`}
      className={`group relative flex min-h-[56px] flex-col items-center justify-center gap-1.5 rounded-xl border-2 px-3 py-2.5 text-center transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4AF37] ${
        isSelected
          ? accessory.isRisky
            ? "border-[#DC2626] bg-[#FEE2E2] shadow-md"
            : "border-[#D4AF37] bg-[#D4AF37]/15 shadow-md"
          : accessory.isRisky
          ? "border-[#FCA5A5] bg-[#FFF5F5] hover:border-[#DC2626]/50"
          : "border-[#E5DECE] bg-white hover:border-[#D4AF37]/50 hover:bg-[#FAF8F5]"
      }`}
    >
      {/* Risky warning badge */}
      {accessory.isRisky && (
        <span
          className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#DC2626] text-[9px] text-white shadow-sm"
          aria-hidden="true"
          title="Phụ kiện này có thể ảnh hưởng đến điểm văn hóa"
        >
          !
        </span>
      )}

      {/* Selected checkmark */}
      {isSelected && (
        <span
          className="absolute left-1.5 top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#D4AF37]"
          aria-hidden="true"
        >
          <CheckCircle2 className="h-3 w-3 text-[#1E3A5F]" strokeWidth={2.5} />
        </span>
      )}

      <span className="text-xl leading-none" aria-hidden="true">
        {accessory.emoji}
      </span>
      <span
        className={`text-[11px] font-semibold leading-tight ${
          isSelected
            ? accessory.isRisky
              ? "text-[#DC2626]"
              : "text-[#1E3A5F]"
            : "text-[#4A6A8F]"
        }`}
      >
        {accessory.name}
      </span>
    </button>
  );
}

/* ── Main Component ── */
export function StepAccessoryMix() {
  const { state, dispatch, prevStep, nextStep } = useStylist();
  const { selectedAccessories, selectedCostume, selectedContext, detectedUndertone } =
    state;

  const toggleAccessory = (id: AccessoryId) => {
    dispatch({ type: "TOGGLE_ACCESSORY", payload: id });
  };

  // Group accessories by category
  const grouped = ALL_ACCESSORIES.reduce<Record<string, typeof ALL_ACCESSORIES>>(
    (acc, item) => {
      if (!acc[item.category]) acc[item.category] = [];
      acc[item.category].push(item);
      return acc;
    },
    {}
  );

  // Check if any risky items are selected
  const hasRiskyItems = ALL_ACCESSORIES.some(
    (a) => a.isRisky && selectedAccessories.has(a.id)
  );

  const selectedList = ALL_ACCESSORIES.filter((a) =>
    selectedAccessories.has(a.id)
  );

  // Mock guardrail preview score
  const baseScore = 90;
  const riskyPenalty = hasRiskyItems ? 45 : 0;
  const contextBonus = selectedContext === "van-mieu" ? -10 : 0;
  const previewScore = Math.max(10, baseScore - riskyPenalty + contextBonus);

  const scoreColor =
    previewScore >= 70
      ? { text: "#16A34A", bg: "#DCFCE7", label: "🟢 Phù hợp văn hóa" }
      : previewScore >= 40
      ? { text: "#D97706", bg: "#FEF3C7", label: "🟡 Cần chú ý" }
      : { text: "#DC2626", bg: "#FEE2E2", label: "🔴 Không khuyến nghị" };

  const handleSubmit = () => {
    dispatch({ type: "START_PROCESSING" });
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Heading */}
      <div>
        <h2 className="font-playfair text-2xl font-bold text-[#1E3A5F] sm:text-3xl">
          Mix Phụ Kiện Gen Z
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-[#4A6A8F]">
          Chọn các phụ kiện hiện đại để phối cùng cổ phục. AI sẽ kiểm tra tính
          tương thích văn hóa trước khi dệt gợi ý hoàn chỉnh.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* ── LEFT: Accessory selector ── */}
        <div className="flex flex-col gap-5 lg:col-span-2">
          {Object.entries(grouped).map(([category, items]) => (
            <section key={category} aria-labelledby={`cat-${category}`}>
              <h3
                id={`cat-${category}`}
                className="mb-3 text-xs font-bold uppercase tracking-wider text-[#6B7280]"
              >
                {CATEGORY_LABELS[category] ?? category}
              </h3>
              <div
                className="grid grid-cols-3 gap-2.5 sm:grid-cols-4 md:grid-cols-5"
                role="group"
                aria-label={`Phụ kiện nhóm ${CATEGORY_LABELS[category]}`}
              >
                {items.map((acc) => (
                  <AccessoryChip
                    key={acc.id}
                    accessory={acc}
                    isSelected={selectedAccessories.has(acc.id)}
                    onToggle={() => toggleAccessory(acc.id)}
                  />
                ))}
              </div>
            </section>
          ))}

          {/* Risky items warning */}
          {hasRiskyItems && (
            <div
              role="alert"
              className="flex items-start gap-3 rounded-xl border border-[#DC2626]/30 bg-[#FEE2E2] px-4 py-3.5"
            >
              <AlertTriangle
                className="mt-0.5 h-5 w-5 shrink-0 text-[#DC2626]"
                aria-hidden="true"
              />
              <div>
                <p className="text-sm font-bold text-[#DC2626]">
                  Phụ kiện có thể vi phạm chuẩn mực văn hóa
                </p>
                <p className="mt-1 text-xs text-[#7F1D1D]">
                  Quần short không phù hợp kết hợp với cổ phục Việt Nam trong
                  hầu hết ngữ cảnh. AI sẽ giải thích chi tiết ở kết quả.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* ── RIGHT: Preview panel ── */}
        <div className="flex flex-col gap-4">
          {/* Selection summary card */}
          <div className="rounded-2xl border border-[#E5DECE] bg-white p-5 shadow-sm">
            <h3 className="mb-3 text-sm font-bold text-[#1E3A5F]">
              ✦ Bộ sưu tập của bạn
            </h3>

            {/* Outfit summary */}
            <div className="space-y-2.5 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-[#6B7280]">Tông da:</span>
                <span className="font-semibold text-[#D97706]">
                  {detectedUndertone?.type
                    ? detectedUndertone.label.split(" — ")[0]
                    : "—"}
                </span>
              </div>
              <div className="flex items-start gap-2">
                <span className="shrink-0 text-[#6B7280]">Cổ phục:</span>
                <div className="flex items-center gap-1.5">
                  {selectedCostume?.color && (
                    <div
                      className="h-3 w-3 rounded-full border border-white shadow-sm"
                      style={{ backgroundColor: selectedCostume.color }}
                      aria-hidden="true"
                    />
                  )}
                  <span className="font-semibold text-[#1E3A5F]">
                    {selectedCostume?.name ?? "—"}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#6B7280]">Ngữ cảnh:</span>
                <span className="font-semibold text-[#1E3A5F]">
                  {selectedContext
                    ? {
                        "dao-pho": "Dạo phố",
                        "ky-yeu": "Kỷ yếu",
                        "chup-anh": "Chụp ảnh NT",
                        "van-mieu": "Văn Miếu",
                        "dam-cuoi": "Đám cưới",
                        "le-hoi": "Lễ hội / Tết",
                      }[selectedContext]
                    : "—"}
                </span>
              </div>
            </div>

            {/* Selected accessories */}
            {selectedList.length > 0 && (
              <div className="mt-4 border-t border-[#E5DECE] pt-4">
                <p className="mb-2 text-xs font-semibold text-[#6B7280]">
                  Phụ kiện ({selectedList.length})
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {selectedList.map((acc) => (
                    <button
                      key={acc.id}
                      type="button"
                      onClick={() => toggleAccessory(acc.id)}
                      aria-label={`Bỏ chọn ${acc.name}`}
                      className={`flex min-h-[32px] items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-medium transition-all hover:opacity-70 ${
                        acc.isRisky
                          ? "border-[#FCA5A5] bg-[#FEE2E2] text-[#DC2626]"
                          : "border-[#E5DECE] bg-[#FAF8F5] text-[#1E3A5F]"
                      }`}
                    >
                      {acc.emoji} {acc.name}
                      <X className="h-3 w-3" aria-hidden="true" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {selectedList.length === 0 && (
              <p className="mt-4 text-center text-xs text-[#C0B8A8]">
                Chọn phụ kiện ở bên trái
              </p>
            )}
          </div>

          {/* Guardrail preview score */}
          <div
            className="rounded-2xl border px-5 py-4"
            style={{ borderColor: `${scoreColor.text}40`, backgroundColor: scoreColor.bg }}
            role="status"
            aria-live="polite"
            aria-label={`Điểm văn hóa dự kiến: ${previewScore}/100 — ${scoreColor.label}`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck
                  className="h-5 w-5"
                  style={{ color: scoreColor.text }}
                  aria-hidden="true"
                />
                <p className="text-sm font-bold" style={{ color: scoreColor.text }}>
                  Điểm văn hóa dự kiến
                </p>
              </div>
              <p className="font-playfair text-2xl font-bold" style={{ color: scoreColor.text }}>
                {previewScore}
                <span className="text-sm font-normal opacity-60">/100</span>
              </p>
            </div>
            <p className="mt-1.5 text-xs font-semibold" style={{ color: scoreColor.text }}>
              {scoreColor.label}
            </p>
            {hasRiskyItems && (
              <p className="mt-1 text-[11px] opacity-80" style={{ color: scoreColor.text }}>
                ⚠ Quần short đang làm giảm điểm đáng kể.
              </p>
            )}
          </div>

          {/* Primary CTA */}
          <button
            id="btn-check-guardrail"
            type="button"
            onClick={handleSubmit}
            className="flex min-h-[52px] items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-[#9E2A2B] to-[#C4371C] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#9E2A2B]/30 transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9E2A2B]"
            aria-label="Kiểm tra chuẩn mực văn hóa và tạo gợi ý phối đồ hoàn chỉnh"
          >
            <Wand2 className="h-4 w-4" aria-hidden="true" />
            Kiểm tra Chuẩn mực & Dệt Visual
          </button>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center gap-3 border-t border-[#E5DECE] pt-6">
        <button
          id="btn-step3-back"
          type="button"
          onClick={prevStep}
          className="flex min-h-[48px] items-center gap-2 rounded-xl border border-[#E5DECE] bg-white px-5 py-2.5 text-sm font-semibold text-[#1E3A5F] transition-all hover:border-[#D4AF37]/50 hover:bg-[#FAF8F5] focus-visible:outline-2 focus-visible:outline-[#D4AF37]"
          aria-label="Quay lại Bước 2"
        >
          <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          Quay lại
        </button>
        <p className="flex-1 text-center text-xs text-[#6B7280]">
          {selectedList.length === 0
            ? "Có thể bỏ qua phụ kiện"
            : `${selectedList.length} phụ kiện đã chọn`}
        </p>
      </div>
    </div>
  );
}
