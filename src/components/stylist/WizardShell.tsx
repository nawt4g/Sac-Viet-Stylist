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
import { LiveOutfitPreview } from "@/components/stylist/LiveOutfitPreview";
import { HeritageFlashcards } from "@/components/stylist/HeritageFlashcards";
import { ResultDashboard } from "@/components/result/ResultDashboard";

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
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <Link
              id="wizard-back-home"
              href="/"
              className="flex min-h-[44px] items-center gap-1.5 text-sm font-medium text-[#4A6A8F] transition-colors hover:text-[#9E2A2B] focus-visible:outline-2 focus-visible:outline-[#D4AF37]"
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
          </div>
          <div>
            <button
              id="wizard-reset"
              type="button"
              onClick={() => dispatch({ type: "RESET" })}
              className="flex min-h-[44px] items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-[#6B7280] transition-all hover:bg-[#F3EFE8] hover:text-[#1E3A5F] focus-visible:outline-2 focus-visible:outline-[#D4AF37]"
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
        className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8"
      >
        {/* Conditional render: Processing | Result | Steps */}
        {isProcessing ? (
          <HeritageFlashcards />
        ) : showResult ? (
          <ResultDashboard />
        ) : (
          <div className="flex flex-col gap-6">
            {/* Mobile collapsible sticky live preview */}
            <LiveOutfitPreview mode="mobile" />

            {/* Responsive 2-column layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column (8 cols): Stepper + Step content + hints */}
              <div className="flex flex-col gap-8 lg:col-span-8">
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

              {/* Right Column (4 cols): Sticky Live Preview on desktop */}
              <div className="hidden lg:block lg:col-span-4">
                <LiveOutfitPreview mode="desktop" />
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
