"use client";
/**
 * components/result/VisualBreakdown.tsx
 * =======================================
 * Khung Visual Mockup (Model / Flat-lay toggle) + Breakdown Sheet.
 * Điểm nối API: imageUrl hiện dùng ảnh từ /public, Phase 5 sẽ thay bằng Pollinations.ai URL.
 */

import Image from "next/image";
import { useState } from "react";
import { User, LayoutGrid, Sparkles, Tag } from "lucide-react";
import type { StylingMix } from "@/types/stylist";

const CATEGORY_META: Record<string, { label: string; emoji: string; color: string }> = {
  top:       { label: "Trang phục chính",       emoji: "👘", color: "#9E2A2B" },
  bottom:    { label: "Phần dưới",               emoji: "👖", color: "#1E3A5F" },
  shoes:     { label: "Giày dép",               emoji: "👞", color: "#7B5E3A" },
  accessory: { label: "Phụ kiện đương đại",     emoji: "✨", color: "#D4AF37" },
  headwear:  { label: "Đội đầu",                emoji: "🎩", color: "#4A7856" },
  outerwear: { label: "Áo khoác ngoài",         emoji: "🧥", color: "#6B7280" },
};

interface Props {
  mix: StylingMix;
  imageUrl?: string | null;
  /** API hook: Phase 5 sẽ inject URL từ Pollinations.ai vào đây */
  aiGeneratedImageUrl?: string | null;
}

export function VisualBreakdown({ mix, imageUrl, aiGeneratedImageUrl }: Props) {
  const [viewMode, setViewMode] = useState<"model" | "flatlay">("model");

  const displayImage = aiGeneratedImageUrl ?? imageUrl ?? "/hero-editorial.jpg";
  const flatlayImage = "/costume-grid.jpg";

  // Group items by category
  const grouped = mix.items.reduce<Record<string, typeof mix.items>>((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
      {/* ── LEFT: Visual Mockup ── */}
      <div className="flex flex-col gap-4 lg:col-span-2">
        {/* Toggle */}
        <div
          className="flex overflow-hidden rounded-xl border border-[#E5DECE] bg-[#FAF8F5] p-1"
          role="group"
          aria-label="Chế độ xem ảnh trang phục"
        >
          {(["model", "flatlay"] as const).map((mode) => (
            <button
              key={mode}
              id={`view-toggle-${mode}`}
              type="button"
              onClick={() => setViewMode(mode)}
              aria-pressed={viewMode === mode}
              className={`flex flex-1 min-h-[36px] items-center justify-center gap-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                viewMode === mode
                  ? "bg-white text-[#1E3A5F] shadow-sm"
                  : "text-[#6B7280] hover:text-[#1E3A5F]"
              }`}
            >
              {mode === "model" ? (
                <><User className="h-3.5 w-3.5" aria-hidden="true" /> Model</>
              ) : (
                <><LayoutGrid className="h-3.5 w-3.5" aria-hidden="true" /> Flat-lay</>
              )}
            </button>
          ))}
        </div>

        {/* Image frame — fixed aspect ratio → CLS = 0 */}
        <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl border border-[#D4AF37]/30 bg-[#F3EFE8] shadow-xl shadow-[#1E3A5F]/10">
          <Image
            src={viewMode === "model" ? displayImage : flatlayImage}
            alt={`${mix.title} — ${viewMode === "model" ? "ảnh người mẫu" : "ảnh flat-lay"}`}
            fill
            sizes="(max-width: 1024px) 100vw, 40vw"
            className="object-cover object-top transition-opacity duration-500"
            priority
            quality={85}
          />

          {/* AI placeholder overlay when no AI image yet */}
          {!aiGeneratedImageUrl && viewMode === "model" && (
            <div className="absolute bottom-3 left-3 right-3">
              <div className="glass-card rounded-xl px-3 py-2 text-center">
                <p className="flex items-center justify-center gap-1.5 text-[10px] font-semibold text-[#D4AF37]">
                  <Sparkles className="h-3 w-3" aria-hidden="true" />
                  {/* API hook label */}
                  Ảnh AI sẽ được tạo bởi Pollinations.ai trong Phase 5
                </p>
              </div>
            </div>
          )}

          {/* Style label */}
          <div className="absolute left-3 top-3">
            <span className="rounded-full bg-[#1E3A5F]/80 px-2.5 py-0.5 text-[10px] font-semibold text-white backdrop-blur-sm">
              {mix.style}
            </span>
          </div>
        </div>

        {/* Styling tips */}
        {mix.stylingTips.length > 0 && (
          <div className="rounded-xl border border-[#E5DECE] bg-[#FAF8F5] p-4">
            <p className="mb-2.5 text-xs font-bold uppercase tracking-wider text-[#1E3A5F]">
              💡 Tips Mặc Đúng
            </p>
            <ul className="space-y-1.5">
              {mix.stylingTips.slice(0, 3).map((tip, i) => (
                <li key={i} className="flex items-start gap-2 text-xs leading-relaxed text-[#4A6A8F]">
                  <span className="mt-0.5 shrink-0 text-[#D4AF37]">▸</span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* ── RIGHT: Breakdown Sheet ── */}
      <div className="flex flex-col gap-4 lg:col-span-3">
        {/* Header */}
        <div>
          <h3 className="font-playfair text-xl font-bold text-[#1E3A5F]">
            {mix.title}
          </h3>
          <p className="mt-1.5 text-sm leading-relaxed text-[#4A6A8F]">
            {mix.overallDescription}
          </p>
        </div>

        {/* Items by category */}
        <div className="space-y-3">
          {Object.entries(grouped).map(([cat, items]) => {
            const meta = CATEGORY_META[cat] ?? { label: cat, emoji: "•", color: "#6B7280" };
            return (
              <div
                key={cat}
                className="overflow-hidden rounded-xl border border-[#E5DECE] bg-white"
              >
                {/* Category header */}
                <div
                  className="flex items-center gap-2 px-4 py-2.5"
                  style={{ backgroundColor: `${meta.color}10` }}
                >
                  <span className="text-base" aria-hidden="true">{meta.emoji}</span>
                  <p className="text-xs font-bold uppercase tracking-wider" style={{ color: meta.color }}>
                    {meta.label}
                  </p>
                </div>

                {/* Items */}
                <div className="divide-y divide-[#F3EFE8]">
                  {items.map((item, i) => (
                    <div key={i} className="p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0 flex-1">
                          <p className="font-semibold text-[#1E3A5F]">{item.name}</p>
                          <p className="mt-1 text-xs leading-relaxed text-[#6B7280]">
                            {item.rationale}
                          </p>
                          {/* Materials */}
                          {item.materials && (
                            <div className="mt-2 flex flex-wrap gap-1">
                              {item.materials.map((m) => (
                                <span
                                  key={m}
                                  className="rounded-full border border-[#E5DECE] bg-[#FAF8F5] px-2 py-0.5 text-[10px] text-[#4A6A8F]"
                                >
                                  {m}
                                </span>
                              ))}
                            </div>
                          )}
                          {/* Brand refs */}
                          {item.brandReferences && (
                            <div className="mt-2 flex flex-wrap gap-1">
                              {item.brandReferences.map((b) => (
                                <span
                                  key={b}
                                  className="flex items-center gap-1 rounded-full bg-[#1E3A5F]/10 px-2 py-0.5 text-[10px] font-medium text-[#1E3A5F]"
                                >
                                  <Tag className="h-2.5 w-2.5" aria-hidden="true" />
                                  {b}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                        {/* Color swatches */}
                        <div className="flex shrink-0 gap-1">
                          {item.colors.map((c) => (
                            <div
                              key={c}
                              className="h-5 w-5 rounded-full border border-white shadow"
                              style={{ backgroundColor: c }}
                              title={c}
                              aria-label={`Màu ${c}`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Budget */}
        {mix.budgetRange && (
          <div className="flex items-center gap-3 rounded-xl border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-4 py-3">
            <span className="text-lg" aria-hidden="true">💰</span>
            <div>
              <p className="text-xs font-bold text-[#1E3A5F]">Ngân sách ước tính</p>
              <p className="text-sm font-semibold text-[#D4AF37]">
                {mix.budgetRange.min.toLocaleString("vi-VN")}₫ –{" "}
                {mix.budgetRange.max.toLocaleString("vi-VN")}₫
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
