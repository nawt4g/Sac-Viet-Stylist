"use client";
/**
 * components/result/ResultDashboard.tsx
 * =======================================
 * Premium Editorial Layout cho Dashboard Kết quả.
 * Layout: Split screen.
 * Left (Sticky): Oversized Image Gallery (Model / Flatlay / Compare).
 * Right (Scrolling): Title, Guardrail, Why this outfit, Breakdown, Heritage, Pose.
 */

import { useState } from "react";
import {
  RotateCcw, Download, Sparkles, CheckCircle2, AlertTriangle, XCircle,
  User, LayoutGrid, SlidersHorizontal, ChevronsLeftRight, ArrowRight
} from "lucide-react";
import Link from "next/link";
import { useStylist } from "@/context/StylistContext";
import { CulturalGuardrailBanner } from "@/components/result/CulturalGuardrailBanner";
import { EdgeCaseRedModal } from "@/components/result/EdgeCaseRedModal";
import { HeritageCard3D } from "@/components/result/HeritageCard3D";
import { PoseAndAudioStudio } from "@/components/result/PoseAndAudioStudio";
import { ExportLookbookModal } from "@/components/result/ExportLookbookModal";
import { VisualBreakdown } from "@/components/result/VisualBreakdown";
import { OUTFIT_BY_STATUS } from "@/data/mockData";
import { ImageSlot } from "@/components/common/ImageSlot";
import { getLookImage, getFlatlay } from "@/lib/images";
import type { CostumeId, ContextType } from "@/types/stylist";

/* ── Demo case switcher ── */
function DemoCaseSwitcher() {
  const { state, dispatch } = useStylist();
  const cases = [
    { id: "GREEN", label: "Phù hợp", icon: CheckCircle2 },
    { id: "YELLOW", label: "Chú ý", icon: AlertTriangle },
    { id: "RED", label: "Vi phạm", icon: XCircle },
  ] as const;

  return (
    <div className="flex flex-wrap items-center gap-2 border-b border-[#E5DECE] pb-6 mb-8">
      <span className="text-[10px] font-bold uppercase tracking-widest text-[#9CA3AF]">
        Test Guardrail:
      </span>
      {cases.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          type="button"
          onClick={() => dispatch({ type: "SET_ACTIVE_CASE", payload: id })}
          className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider transition-all ${
            state.activeCase === id
              ? id === "GREEN" ? "bg-[#16A34A] text-white" : id === "YELLOW" ? "bg-[#D97706] text-white" : "bg-[#DC2626] text-white"
              : "border border-[#E5DECE] text-[#6B7280] hover:bg-[#FAF8F5]"
          }`}
        >
          <Icon className="h-3 w-3" />
          {id}
        </button>
      ))}
    </div>
  );
}

/* ── Image Gallery Component (Sticky Left Side) ── */
function ResultImageGallery({ costumeId, contextId, mixTitle, aiImageUrl, fallbackUrl }: {
  costumeId: string;
  contextId: string;
  mixTitle: string;
  aiImageUrl: string | null;
  fallbackUrl: string | null | undefined;
}) {
  const [viewMode, setViewMode] = useState<"model" | "flatlay" | "compare">("model");
  const [sliderPosition, setSliderPosition] = useState(50);

  const { image: modelLook } = getLookImage({ costumeId: costumeId as CostumeId, contextId: contextId as ContextType });
  const modelImageSrc = aiImageUrl ?? fallbackUrl ?? modelLook?.src ?? "/hero-editorial.png";
  const modelAvailable = Boolean(aiImageUrl ?? modelLook?.available);

  const flatlay = getFlatlay(costumeId as CostumeId);
  const altContext = contextId === "dam-cuoi" ? "van-mieu" : "dam-cuoi";
  const { image: altLook } = getLookImage({ costumeId: costumeId as CostumeId, contextId: altContext });
  const hasAlt = Boolean(altLook?.available);

  return (
    <div className="flex flex-col h-full w-full bg-[#FAF8F5]">
      {/* Top Toggle */}
      <div className="absolute top-6 left-6 right-6 z-30 flex justify-center">
        <div className="flex bg-white/80 backdrop-blur-md p-1 rounded-full shadow-sm border border-white/20">
          {[
            { id: "model", icon: User, label: "Editorial" },
            { id: "flatlay", icon: LayoutGrid, label: "Archive" },
            { id: "compare", icon: SlidersHorizontal, label: "Compare" }
          ].map((mode) => (
            <button
              key={mode.id}
              onClick={() => setViewMode(mode.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-colors ${
                viewMode === mode.id ? "bg-[#1E3A5F] text-white" : "text-[#4A6A8F] hover:text-[#1E3A5F]"
              }`}
            >
              <mode.icon className="h-3.5 w-3.5" />
              {mode.label}
            </button>
          ))}
        </div>
      </div>

      {/* Massive Image Container */}
      <div className="relative w-full h-[60vh] lg:h-screen overflow-hidden">
        {viewMode === "model" && (
          <ImageSlot src={modelImageSrc} alt={mixTitle} available={modelAvailable} aspectRatio="3/4" className="w-full h-full object-cover" priority quality={100} />
        )}
        
        {viewMode === "flatlay" && (
          <div className="w-full h-full bg-white flex items-center justify-center p-12">
            <ImageSlot src={flatlay.src} alt={flatlay.alt} available={flatlay.available} aspectRatio="3/4" className="w-full h-full object-contain" quality={100} />
          </div>
        )}

        {viewMode === "compare" && (
          <div className="relative w-full h-full select-none">
            {hasAlt && altLook ? (
              <>
                {/* Background (Look B) */}
                <div className="absolute inset-0">
                  <ImageSlot src={altLook.src} alt="B" available={altLook.available} aspectRatio="3/4" className="w-full h-full object-cover" />
                </div>
                {/* Foreground (Look A) */}
                <div className="absolute inset-0 overflow-hidden" style={{ width: `${sliderPosition}%` }}>
                  <ImageSlot src={modelImageSrc} alt="A" available={modelAvailable} aspectRatio="3/4" className="w-full h-full object-cover" />
                </div>
                {/* Slider handle */}
                <div className="absolute top-0 bottom-0 z-30 w-0.5 bg-white shadow-xl cursor-ew-resize" style={{ left: `${sliderPosition}%` }}>
                  <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#1E3A5F] shadow-lg">
                    <ChevronsLeftRight className="h-4 w-4" />
                  </div>
                </div>
                <input type="range" min="0" max="100" value={sliderPosition} onChange={(e) => setSliderPosition(Number(e.target.value))} className="absolute inset-0 z-40 w-full h-full opacity-0 cursor-ew-resize" />
              </>
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-white p-6 text-center">
                <p className="text-sm text-[#4A6A8F]">Không có ảnh so sánh cho ngữ cảnh này.</p>
              </div>
            )}
          </div>
        )}

        {/* Style Badge overlay */}
        {viewMode === "model" && (
          <div className="absolute bottom-6 left-6 z-20">
            <h2 className="font-playfair text-4xl lg:text-6xl font-bold text-white drop-shadow-lg">{mixTitle}</h2>
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Main Dashboard ── */
export function ResultDashboard() {
  const { state, dispatch } = useStylist();
  const [redModalOpen, setRedModalOpen] = useState(false);
  const [exportModalOpen, setExportModalOpen] = useState(false);

  const outfit = state.resultOutfit ?? OUTFIT_BY_STATUS[state.activeCase];
  const { guardrail, selectedCostumes, stylingMixes, heritageCards } = outfit;
  const mix = stylingMixes[0];

  const currentCostumeId = state.selectedCostume?.id ?? selectedCostumes[0]?.id ?? "ao-ngu-than";
  const currentContextId = state.selectedContext ?? "dao-pho";

  return (
    <>
      <EdgeCaseRedModal isOpen={redModalOpen} onClose={() => setRedModalOpen(false)} />
      <ExportLookbookModal isOpen={exportModalOpen} onClose={() => setExportModalOpen(false)} outfitResponse={outfit} aiImageUrl={null} />

      <div className="flex flex-col lg:flex-row min-h-screen bg-white">
        
        {/* Left Side: Massive Sticky Image */}
        <div className="w-full lg:w-1/2 lg:sticky lg:top-0 lg:h-screen">
          <ResultImageGallery 
            costumeId={currentCostumeId} 
            contextId={currentContextId} 
            mixTitle={mix.title} 
            aiImageUrl={null} 
            fallbackUrl={selectedCostumes[0]?.imageUrl} 
          />
        </div>

        {/* Right Side: Editorial Content Scroll */}
        <div className="w-full lg:w-1/2 p-6 sm:p-12 lg:p-20 overflow-y-auto">
          
          {/* Header Actions */}
          <div className="flex items-center justify-between mb-16">
            <DemoCaseSwitcher />
            <div className="flex gap-3">
              <button onClick={() => setExportModalOpen(true)} className="flex h-10 w-10 items-center justify-center rounded-full border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-white transition-colors" title="Xuất Lookbook">
                <Download className="h-4 w-4" />
              </button>
              <button onClick={() => dispatch({ type: "RESET" })} className="flex h-10 items-center gap-2 rounded-full bg-[#1E3A5F] px-4 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#9E2A2B] transition-colors">
                <RotateCcw className="h-3 w-3" />
                Phối lại
              </button>
            </div>
          </div>

          {/* Typography-led Title */}
          <div className="mb-16">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#D4AF37] mb-4">Kết quả phong cách</p>
            <h1 className="font-playfair text-4xl sm:text-5xl font-bold text-[#1E3A5F] leading-tight">
              {mix.title}
            </h1>
            <p className="mt-6 text-lg text-[#4A6A8F] leading-relaxed font-sans">
              {mix.overallDescription}
            </p>
          </div>

          {/* Cultural Guardrail Banner (Full width of the column) */}
          <div className="mb-16">
            <CulturalGuardrailBanner guardrail={guardrail} onOpenRedModal={guardrail.status === "RED" ? () => setRedModalOpen(true) : undefined} />
          </div>

          {/* Styling Tips */}
          {mix.stylingTips && mix.stylingTips.length > 0 && (
            <div className="mb-16">
              <h3 className="font-playfair text-2xl font-bold text-[#1E3A5F] mb-6 border-b border-[#E5DECE] pb-4">
                Styling Notes
              </h3>
              <ul className="space-y-4">
                {mix.stylingTips.map((tip, idx) => (
                  <li key={idx} className="flex items-start gap-4 text-[#4A6A8F] text-base leading-relaxed">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#FAF8F5] text-[10px] font-bold text-[#9E2A2B]">{idx + 1}</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Heritage Cards (Editorial Style) */}
          <div className="mb-16">
            <h3 className="font-playfair text-2xl font-bold text-[#1E3A5F] mb-6 border-b border-[#E5DECE] pb-4">
              Dấu ấn Di sản
            </h3>
            <HeritageCard3D cards={heritageCards} />
          </div>

          {/* Pose & Audio */}
          <div className="mb-16">
            <h3 className="font-playfair text-2xl font-bold text-[#1E3A5F] mb-6 border-b border-[#E5DECE] pb-4">
              Thần thái & Khí chất
            </h3>
            <PoseAndAudioStudio />
          </div>

          {/* Breakdown / Components using existing VisualBreakdown (but visually we only need the right part)
              Wait, since we moved image to the left, using VisualBreakdown as is will render an image again.
              Let's just render the breakdown items manually to fit the premium look! */}
          <div className="mb-16">
            <h3 className="font-playfair text-2xl font-bold text-[#1E3A5F] mb-6 border-b border-[#E5DECE] pb-4">
              Bóc tách Item
            </h3>
            <div className="grid grid-cols-1 gap-6">
              {mix.items.map((item, idx) => (
                <div key={idx} className="flex gap-4 p-5 rounded-2xl bg-[#FAF8F5] border border-[#E5DECE]">
                  <div className="flex-1">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#D4AF37] mb-1">{item.category}</p>
                    <h4 className="font-playfair text-lg font-bold text-[#1E3A5F] mb-2">{item.name}</h4>
                    <p className="text-sm text-[#4A6A8F] leading-relaxed">{item.rationale}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Footer Area */}
          <div className="pt-12 border-t border-[#E5DECE] text-center">
            <Link href="/explore" className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-[#9E2A2B] hover:text-[#1E3A5F] transition-colors">
              Khám phá thêm outfit <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

        </div>
      </div>
    </>
  );
}
