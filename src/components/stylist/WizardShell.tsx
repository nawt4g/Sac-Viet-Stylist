"use client";

/**
 * components/stylist/WizardShell.tsx
 * ====================================
 * Main Client orchestrator cho Wizard Studio 3 bước.
 * Renders: Header → Stepper → Step content → (HeritageFlashcards khi loading)
 *
 * Transition:
 *   - Mỗi step render ngay lập tức (no lazy import) để tránh flash
 *   - isProcessing = true → HeritageFlashcards thay thế toàn bộ content
 *   - isProcessing = false (sau 6s) → ResultPanel placeholder
 */

import Link from "next/link";
import { ArrowLeft, RotateCcw } from "lucide-react";

import { useStylist } from "@/context/StylistContext";
import { Stepper } from "@/components/stylist/Stepper";
import { StepSkinTone } from "@/components/stylist/StepSkinTone";
import { StepCostumeContext } from "@/components/stylist/StepCostumeContext";
import { StepAccessoryMix } from "@/components/stylist/StepAccessoryMix";
import { HeritageFlashcards } from "@/components/stylist/HeritageFlashcards";
import { ResultDashboard } from "@/components/result/ResultDashboard";

/* ── Result screen (post-processing placeholder) ── */
function ResultPlaceholder() {
  const { state, dispatch } = useStylist();
  const { selectedCostume, selectedContext, detectedUndertone, selectedAccessories } = state;

  const accessoryCount = selectedAccessories.size;
  const hasRisky = Array.from(selectedAccessories).includes("quan-short");

  const guardrailStatus = hasRisky ? "RED" : selectedContext === "van-mieu" ? "YELLOW" : "GREEN";
  const guardrailConfig = {
    GREEN: { color: "#16A34A", bg: "#DCFCE7", border: "#16A34A40", label: "✅ Phù hợp hoàn toàn", score: 95 },
    YELLOW: { color: "#D97706", bg: "#FEF3C7", border: "#D9770640", label: "⚠️ Chú ý ngữ cảnh", score: 65 },
    RED: { color: "#DC2626", bg: "#FEE2E2", border: "#DC262640", label: "🚫 Cần điều chỉnh", score: 20 },
  }[guardrailStatus];

  return (
    <div className="flex flex-col gap-6">
      <div className="text-center">
        <span className="inline-block rounded-full bg-[#D4AF37]/15 px-3 py-1 text-xs font-bold uppercase tracking-widest text-[#D4AF37]">
          Kết Quả Phân Tích
        </span>
        <h2 className="font-playfair mt-3 text-2xl font-bold text-[#1E3A5F] sm:text-3xl">
          Phong Cách Của Bạn
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {/* Outfit Summary */}
        <div className="rounded-2xl border border-[#E5DECE] bg-white p-6 shadow-sm">
          <h3 className="mb-4 font-playfair text-lg font-bold text-[#1E3A5F]">
            ✦ Bộ Phối Đồ
          </h3>
          <dl className="space-y-3 text-sm">
            <div className="flex items-center gap-2">
              <dt className="w-24 shrink-0 text-[#6B7280]">Tông da</dt>
              <dd className="font-semibold text-[#D97706]">
                {detectedUndertone?.label.split(" — ")[0] ?? "Warm Undertone"}
              </dd>
            </div>
            <div className="flex items-start gap-2">
              <dt className="w-24 shrink-0 text-[#6B7280]">Cổ phục</dt>
              <dd className="font-semibold text-[#1E3A5F]">
                <div className="flex items-center gap-2">
                  {selectedCostume?.color && (
                    <div
                      className="h-3.5 w-3.5 rounded-full border border-white shadow"
                      style={{ backgroundColor: selectedCostume.color }}
                    />
                  )}
                  {selectedCostume?.name ?? "Áo Ngũ Thân"}
                </div>
              </dd>
            </div>
            <div className="flex items-center gap-2">
              <dt className="w-24 shrink-0 text-[#6B7280]">Ngữ cảnh</dt>
              <dd className="font-semibold text-[#1E3A5F]">
                {selectedContext
                  ? ({
                    "dao-pho": "Dạo phố",
                    "ky-yeu": "Kỷ yếu",
                    "chup-anh": "Chụp ảnh NT",
                    "van-mieu": "Văn Miếu",
                    "dam-cuoi": "Đám cưới",
                    "le-hoi": "Lễ hội / Tết",
                  } as const)[selectedContext]
                  : "—"}
              </dd>
            </div>
            <div className="flex items-center gap-2">
              <dt className="w-24 shrink-0 text-[#6B7280]">Phụ kiện</dt>
              <dd className="font-semibold text-[#1E3A5F]">
                {accessoryCount} món đã chọn
              </dd>
            </div>
          </dl>
        </div>

        {/* Guardrail result */}
        <div
          className="rounded-2xl border p-6 shadow-sm"
          style={{ backgroundColor: guardrailConfig.bg, borderColor: guardrailConfig.border }}
        >
          <h3
            className="mb-2 font-playfair text-lg font-bold"
            style={{ color: guardrailConfig.color }}
          >
            Cultural Guardrail
          </h3>
          <p className="text-2xl font-playfair font-bold" style={{ color: guardrailConfig.color }}>
            {guardrailConfig.label}
          </p>
          <div className="mt-3 flex items-center gap-3">
            <span className="text-4xl font-playfair font-bold" style={{ color: guardrailConfig.color }}>
              {guardrailConfig.score}
            </span>
            <span className="text-sm font-medium" style={{ color: guardrailConfig.color }}>
              / 100<br />điểm văn hóa
            </span>
          </div>
          <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-black/10">
            <div
              className="h-full rounded-full transition-all duration-1000"
              style={{
                width: `${guardrailConfig.score}%`,
                backgroundColor: guardrailConfig.color,
              }}
            />
          </div>
          {guardrailStatus === "RED" && (
            <p className="mt-3 text-xs font-medium" style={{ color: guardrailConfig.color }}>
              💡 Gợi ý: Thay quần short bằng quần âu để tăng điểm văn hóa đáng kể.
            </p>
          )}
          {guardrailStatus === "YELLOW" && (
            <p className="mt-3 text-xs font-medium" style={{ color: guardrailConfig.color }}>
              💡 Văn Miếu yêu cầu trang phục kín đáo. Xem gợi ý điều chỉnh ở Phase 4.
            </p>
          )}
        </div>
      </div>

      {/* Phase 4 placeholder */}
      <div className="rounded-2xl border-2 border-dashed border-[#D4AF37]/40 bg-[#D4AF37]/5 p-8 text-center">
        <p className="text-2xl" aria-hidden="true">🎨</p>
        <p className="mt-2 font-playfair text-lg font-bold text-[#1E3A5F]">
          Visual Outfit Preview
        </p>
        <p className="mt-1 text-sm text-[#6B7280]">
          Ảnh minh họa cổ phục được dệt bằng AI (Pollinations.ai) sẽ hiển thị tại đây trong Phase 4.
        </p>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          id="btn-result-reset"
          type="button"
          onClick={() => dispatch({ type: "RESET" })}
          className="flex min-h-[44px] items-center gap-2 rounded-full border border-[#E5DECE] bg-white px-6 py-2.5 text-sm font-semibold text-[#1E3A5F] transition-all hover:border-[#D4AF37] hover:bg-[#FAF8F5]"
          aria-label="Bắt đầu lại từ đầu"
        >
          <RotateCcw className="h-4 w-4" aria-hidden="true" />
          Phối lại từ đầu
        </button>
        <Link
          id="btn-result-explore"
          href="/co-phuc"
          className="flex min-h-[44px] items-center gap-2 rounded-full bg-gradient-to-r from-[#9E2A2B] to-[#C4371C] px-6 py-2.5 text-sm font-bold text-white shadow-md transition-all hover:shadow-lg"
          aria-label="Khám phá thêm cổ phục"
        >
          Khám phá thêm Cổ phục
        </Link>
      </div>
    </div>
  );
}

/* ── Main Wizard Shell ── */
export function WizardShell() {
  const { state, dispatch } = useStylist();
  const { currentStep, isProcessing, resultOutfit } = state;

  // Show result dashboard when processing done and result is available
  const showResult = !isProcessing && resultOutfit !== null;

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      {/* Page header */}
      <header
        className="sticky top-0 z-50 border-b border-[#E5DECE]/60 bg-[#FAF8F5]/90 backdrop-blur-md"
        role="banner"
      >
        <div className="mx-auto flex h-14 max-w-5xl items-center gap-4 px-4 sm:px-6">
          <Link
            id="wizard-back-home"
            href="/"
            className="flex items-center gap-1.5 text-sm font-medium text-[#4A6A8F] transition-colors hover:text-[#9E2A2B] focus-visible:outline-2 focus-visible:outline-[#D4AF37]"
            aria-label="Quay về Trang chủ"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Trang chủ
          </Link>
          <div className="h-4 w-px bg-[#E5DECE]" aria-hidden="true" />
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-[#9E2A2B] to-[#D4AF37] text-[10px] font-bold text-white" aria-hidden="true">
              SV
            </span>
            <span className="font-playfair text-sm font-bold text-[#1E3A5F]">
              AI Stylist
            </span>
          </div>
          <div className="ml-auto">
            <button
              id="wizard-reset"
              type="button"
              onClick={() => dispatch({ type: "RESET" })}
              className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-[#6B7280] transition-all hover:bg-[#F3EFE8] hover:text-[#1E3A5F] focus-visible:outline-2 focus-visible:outline-[#D4AF37]"
              aria-label="Đặt lại wizard và bắt đầu lại"
            >
              <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
              Bắt đầu lại
            </button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main
        id="wizard-main"
        role="main"
        className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8"
      >
        {/* Conditional render: Processing | Result | Steps */}
        {isProcessing ? (
          <HeritageFlashcards />
        ) : showResult ? (
          <ResultDashboard />
        ) : (
          <div className="flex flex-col gap-8">
            {/* Stepper */}
            <div className="rounded-2xl border border-[#E5DECE] bg-white px-6 py-5 shadow-sm">
              <Stepper />
            </div>

            {/* Step content with transition */}
            <div
              className="rounded-2xl border border-[#E5DECE] bg-white p-6 shadow-sm sm:p-8"
              key={currentStep} // forces re-mount on step change (fresh animation)
            >
              {currentStep === 1 && <StepSkinTone />}
              {currentStep === 2 && <StepCostumeContext />}
              {currentStep === 3 && <StepAccessoryMix />}
            </div>

            {/* Step hints */}
            <p className="text-center text-xs text-[#C0B8A8]">
              {currentStep === 1 && "Bước 1 / 3 — Phân tích tông da để gợi ý màu sắc cổ phục chính xác nhất"}
              {currentStep === 2 && "Bước 2 / 3 — Chọn cổ phục và ngữ cảnh để AI điều chỉnh guardrail phù hợp"}
              {currentStep === 3 && "Bước 3 / 3 — Mix phụ kiện và kiểm tra điểm văn hóa trước khi hoàn tất"}
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
