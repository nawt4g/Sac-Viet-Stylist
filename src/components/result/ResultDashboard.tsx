"use client";
/**
 * components/result/ResultDashboard.tsx
 * =======================================
 * Dashboard Kết quả — màn hình chính sau khi Wizard hoàn tất.
 * Orchestrates: Banner → VisualBreakdown → Heritage3D → PoseStudio → Export.
 * Kết nối với StylistContext để lấy resultOutfit và activeCase.
 */

import { useState } from "react";
import {
  RotateCcw,
  Download,
  ExternalLink,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  XCircle,
} from "lucide-react";
import Link from "next/link";
import { useStylist } from "@/context/StylistContext";
import { CulturalGuardrailBanner } from "@/components/result/CulturalGuardrailBanner";
import { EdgeCaseRedModal } from "@/components/result/EdgeCaseRedModal";
import { VisualBreakdown } from "@/components/result/VisualBreakdown";
import { HeritageCard3D } from "@/components/result/HeritageCard3D";
import { PoseAndAudioStudio } from "@/components/result/PoseAndAudioStudio";
import { ExportLookbookModal } from "@/components/result/ExportLookbookModal";
import { OUTFIT_BY_STATUS } from "@/data/mockData";

/* ── Demo case switcher (dev/demo tool) ── */
function DemoCaseSwitcher() {
  const { state, dispatch } = useStylist();
  const cases = [
    { id: "GREEN", label: "Phù hợp", icon: CheckCircle2 },
    { id: "YELLOW", label: "Chú ý", icon: AlertTriangle },
    { id: "RED", label: "Vi phạm", icon: XCircle },
  ] as const;

  return (
    <div
      className="flex flex-wrap items-center gap-2 rounded-xl border border-[#E5DECE] bg-white p-3 shadow-xs"
      aria-label="Chuyển đổi case demo"
      role="group"
    >
      <span className="text-xs font-bold uppercase tracking-wider text-[#6B7280]">
        Demo Case:
      </span>
      {cases.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          type="button"
          id={`demo-case-${id.toLowerCase()}`}
          onClick={() => dispatch({ type: "SET_ACTIVE_CASE", payload: id })}
          aria-pressed={state.activeCase === id}
          className={`flex min-h-[44px] items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-xs font-bold transition-all focus-visible:outline-2 focus-visible:outline-[#D4AF37] ${
            state.activeCase === id
              ? id === "GREEN"
                ? "bg-[#16A34A] text-white shadow-sm"
                : id === "YELLOW"
                ? "bg-[#D97706] text-white shadow-sm"
                : "bg-[#DC2626] text-white shadow-sm"
              : "border border-[#E5DECE] text-[#6B7280] hover:border-[#D4AF37]/40"
          }`}
        >
          <Icon className="h-3.5 w-3.5" />
          <span>{id} ({label})</span>
        </button>
      ))}
      <span className="ml-auto text-[10px] text-[#C0B8A8]">
        Chế độ kiểm thử chuẩn mực văn hóa (Cultural Guardrail)
      </span>
    </div>
  );
}

/* ── Main Dashboard ── */
export function ResultDashboard() {
  const { state, dispatch } = useStylist();
  const [redModalOpen, setRedModalOpen] = useState(false);
  const [exportModalOpen, setExportModalOpen] = useState(false);

  // Auto-open RED modal when status is RED
  const outfit = state.resultOutfit ?? OUTFIT_BY_STATUS[state.activeCase];
  const { guardrail, selectedCostumes, stylingMixes, heritageCards } = outfit;
  const mix = stylingMixes[0];

  const currentCostumeId = state.selectedCostume?.id ?? selectedCostumes[0]?.id ?? "ao-ngu-than";
  const currentContextId = state.selectedContext ?? "dao-pho";

  return (
    <>
      {/* ── Modals ── */}
      <EdgeCaseRedModal
        isOpen={redModalOpen}
        onClose={() => setRedModalOpen(false)}
      />
      <ExportLookbookModal
        isOpen={exportModalOpen}
        onClose={() => setExportModalOpen(false)}
        outfitResponse={outfit}
        aiImageUrl={null}
      />

      {/* ── Page layout ── */}
      <div className="flex flex-col gap-8">
        {/* Top actions */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <span className="inline-flex items-center gap-1 rounded-full bg-[#D4AF37]/15 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#D4AF37]">
              <Sparkles className="h-3 w-3" />
              Kết Quả Phân Tích
            </span>
            <h1 className="font-playfair mt-1.5 text-2xl font-bold text-[#1E3A5F] sm:text-3xl">
              Phong Cách Của Bạn
            </h1>
          </div>
          <div className="flex flex-wrap gap-2">
            {/* Export */}
            <button
              id="btn-open-export"
              type="button"
              onClick={() => setExportModalOpen(true)}
              className="flex min-h-[44px] items-center gap-1.5 rounded-full border border-[#D4AF37] bg-white px-5 py-2 text-xs font-semibold text-[#1E3A5F] shadow-xs transition-all hover:bg-[#D4AF37]/10 focus-visible:outline-2 focus-visible:outline-[#D4AF37]"
              aria-label="Xuất Lookbook Story 9:16"
            >
              <Download className="h-4 w-4 text-[#D4AF37]" aria-hidden="true" />
              Xuất Lookbook
            </button>
            {/* Reset */}
            <button
              id="btn-result-reset"
              type="button"
              onClick={() => dispatch({ type: "RESET" })}
              className="flex min-h-[44px] items-center gap-1.5 rounded-full border border-[#E5DECE] bg-white px-5 py-2 text-xs font-semibold text-[#6B7280] shadow-xs transition-all hover:border-[#D4AF37]/40 hover:text-[#1E3A5F] focus-visible:outline-2 focus-visible:outline-[#D4AF37]"
              aria-label="Bắt đầu lại từ đầu"
            >
              <RotateCcw className="h-4 w-4" aria-hidden="true" />
              Làm lại
            </button>
          </div>
        </div>

        {/* Demo switcher */}
        <DemoCaseSwitcher />

        {/* ① Cultural Guardrail Banner */}
        <section aria-label="Trạng thái văn hóa">
          <CulturalGuardrailBanner
            guardrail={guardrail}
            onOpenRedModal={
              guardrail.status === "RED" ? () => setRedModalOpen(true) : undefined
            }
          />
        </section>

        {/* ② Visual Breakdown */}
        <section
          className="rounded-2xl border border-[#E5DECE] bg-white p-5 shadow-sm sm:p-7"
          aria-labelledby="breakdown-heading"
        >
          <h2
            id="breakdown-heading"
            className="font-playfair mb-5 flex items-center gap-2 text-xl font-bold text-[#1E3A5F]"
          >
            <Sparkles className="h-4 w-4 text-[#D4AF37]" />
            Bảng Bóc Tách Phong Cách
          </h2>
          <VisualBreakdown
            mix={mix}
            imageUrl={selectedCostumes[0]?.imageUrl}
            aiGeneratedImageUrl={null}
            costumeId={currentCostumeId}
            contextId={currentContextId}
          />
        </section>

        {/* ③ Heritage 3D Cards */}
        <section className="rounded-2xl border border-[#E5DECE] bg-white p-5 shadow-sm sm:p-7">
          <HeritageCard3D cards={heritageCards} />
        </section>

        {/* ④ Pose & Audio Studio */}
        <section className="rounded-2xl border border-[#E5DECE] bg-white p-5 shadow-sm sm:p-7">
          <PoseAndAudioStudio />
        </section>

        {/* ⑤ Bottom CTA row */}
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[#D4AF37]/20 bg-gradient-to-r from-[#1E3A5F] to-[#2C527F] px-6 py-5">
          <div>
            <p className="font-playfair text-lg font-bold text-white">
              Muốn phối thêm trang phục khác?
            </p>
            <p className="mt-0.5 text-sm text-white/60">
              Khám phá 5 nhóm cổ phục và thử lại với phong cách mới.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => dispatch({ type: "RESET" })}
              className="flex min-h-[44px] items-center gap-2 rounded-full bg-[#D4AF37] px-5 py-2.5 text-sm font-bold text-[#1E3A5F] transition-all hover:bg-[#E8CC6E] focus-visible:outline-2 focus-visible:outline-[#D4AF37]"
              aria-label="Phối lại trang phục mới từ đầu"
            >
              <RotateCcw className="h-4 w-4" aria-hidden="true" />
              Phối lại
            </button>
            <Link
              href="/co-phuc"
              className="flex min-h-[44px] items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-[#D4AF37]"
              aria-label="Khám phá danh mục cổ phục"
            >
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
              Khám phá Cổ phục
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
