"use client";
/**
 * components/result/VisualBreakdown.tsx
 * =======================================
 * Khung Visual Mockup (Model / Ảnh cổ phục / So sánh A/B) + Breakdown Sheet.
 * Tích hợp getLookImage và getFlatlay kết hợp ImageSlot (CLS = 0).
 */

import { useState } from "react";
import {
  User,
  LayoutGrid,
  Sparkles,
  SlidersHorizontal,
  Tag,
  Shirt,
  Scissors,
  Footprints,
  Crown,
  Layers,
  Lightbulb,
  Coins,
  ChevronsLeftRight,
} from "lucide-react";
import type { StylingMix, CostumeId, ContextType } from "@/types/stylist";
import { ImageSlot } from "@/components/common/ImageSlot";
import { getLookImage, getFlatlay } from "@/lib/images";

const CATEGORY_META: Record<string, { label: string; icon: typeof Shirt; color: string }> = {
  top:       { label: "Trang phục chính",   icon: Shirt,       color: "#9E2A2B" },
  bottom:    { label: "Phần dưới",           icon: Scissors,    color: "#1E3A5F" },
  shoes:     { label: "Giày dép",           icon: Footprints,  color: "#7B5E3A" },
  accessory: { label: "Phụ kiện đương đại", icon: Sparkles,    color: "#D4AF37" },
  headwear:  { label: "Đội đầu",            icon: Crown,       color: "#4A7856" },
  outerwear: { label: "Áo khoác ngoài",     icon: Layers,      color: "#6B7280" },
};

interface Props {
  mix: StylingMix;
  imageUrl?: string | null;
  aiGeneratedImageUrl?: string | null;
  costumeId?: CostumeId | string;
  contextId?: ContextType | string;
}

export function VisualBreakdown({
  mix,
  imageUrl,
  aiGeneratedImageUrl,
  costumeId = "ao-ngu-than",
  contextId = "dao-pho",
}: Props) {
  const [viewMode, setViewMode] = useState<"model" | "flatlay" | "compare">("model");
  const [sliderPosition, setSliderPosition] = useState<number>(50);

  // 1. Resolve look for the model using getLookImage params
  const { image: modelLook } = getLookImage({
    costumeId: costumeId as CostumeId,
    contextId: contextId as ContextType,
  });
  const modelImageSrc = aiGeneratedImageUrl ?? imageUrl ?? modelLook?.src ?? "/hero-editorial.png";
  const modelAvailable = Boolean(aiGeneratedImageUrl ?? modelLook?.available);

  // 2. Resolve flatlay (hỗ trợ .webp và .png)
  const flatlay = getFlatlay(costumeId);

  // 3. Alternative look for A/B comparison (khác ngữ cảnh)
  const altContext: ContextType = contextId === "dam-cuoi" ? "van-mieu" : "dam-cuoi";
  const { image: altLook } = getLookImage({
    costumeId: costumeId as CostumeId,
    contextId: altContext,
  });
  const hasAlternativeLook = Boolean(altLook?.available);

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
        {/* Toggle Mode */}
        <div
          className="flex overflow-hidden rounded-xl border border-paper-border bg-paper p-1"
          role="group"
          aria-label="Chế độ xem ảnh trang phục"
        >
          {(
            [
              { id: "model", label: "Model", icon: User },
              { id: "flatlay", label: "Ảnh cổ phục", icon: LayoutGrid },
              { id: "compare", label: "So sánh A/B", icon: SlidersHorizontal },
            ] as const
          ).map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              id={`view-toggle-${id}`}
              type="button"
              onClick={() => setViewMode(id)}
              aria-pressed={viewMode === id}
              className={`flex flex-1 min-h-[38px] items-center justify-center gap-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                viewMode === id
                  ? "bg-white text-ink shadow-sm"
                  : "text-muted-foreground hover:text-ink"
              }`}
            >
              <Icon className="h-3.5 w-3.5" aria-hidden="true" />
              <span>{label}</span>
            </button>
          ))}
        </div>

        {/* ── IMAGE FRAME CONTAINER ── */}
        <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl border border-gold/30 bg-paper shadow-xl shadow-ink/10">
          {/* A. MODEL VIEW */}
          {viewMode === "model" && (
            <div className="relative h-full w-full">
              <ImageSlot
                src={modelImageSrc}
                alt={`${mix.title} — ảnh người mẫu`}
                available={modelAvailable}
                aspectRatio="3/4"
                fallbackTitle={mix.title}
                fallbackSubtitle="Phối cảnh đang cập nhật hình ảnh chi tiết"
                className="h-full w-full"
                quality={90}
                priority
              />

              {/* Subtle AI Illustration Badge */}
              <div className="absolute bottom-3 left-3 z-20">
                <span className="flex items-center gap-1.5 rounded-full border border-white/20 bg-black/60 px-3 py-1 text-[11px] font-medium text-white/95 backdrop-blur-md shadow-sm">
                  <Sparkles className="h-3 w-3 text-gold" aria-hidden="true" />
                  Ảnh minh họa AI
                </span>
              </div>

              {/* Style badge */}
              <div className="absolute left-3 top-3 z-20">
                <span className="rounded-full bg-ink/85 px-2.5 py-0.5 text-[10px] font-semibold text-white backdrop-blur-sm shadow-xs">
                  {mix.style}
                </span>
              </div>
            </div>
          )}

          {/* B. FLAT-LAY VIEW (Ảnh cổ phục) */}
          {viewMode === "flatlay" && (
            <div className="relative h-full w-full">
              <ImageSlot
                src={flatlay.src}
                alt={flatlay.alt}
                available={flatlay.available}
                aspectRatio="3/4"
                fallbackTitle={flatlay.title}
                fallbackSubtitle="Ảnh cổ phục truyền thống"
                className="h-full w-full"
                quality={90}
              />

              {/* Flatlay / Ảnh cổ phục Label */}
              <div className="absolute left-3 top-3 z-20">
                <span className="rounded-full bg-gold/90 px-2.5 py-0.5 text-[10px] font-bold text-ink backdrop-blur-sm shadow-xs">
                  Ảnh cổ phục
                </span>
              </div>
            </div>
          )}

          {/* C. A/B COMPARISON SLIDER */}
          {viewMode === "compare" && (
            <div className="relative h-full w-full select-none">
              {hasAlternativeLook && altLook ? (
                <>
                  {/* Background: Look B (Alternative / Remix) */}
                  <div className="absolute inset-0">
                    <ImageSlot
                      src={altLook.src}
                      alt={`${mix.title} — phương án so sánh`}
                      available={altLook.available}
                      aspectRatio="3/4"
                      className="h-full w-full"
                    />
                    <div className="absolute top-3 right-3 z-10 rounded-full bg-black/60 px-2.5 py-0.5 text-[10px] font-bold text-white backdrop-blur-xs">
                      Look B (Biến thể)
                    </div>
                  </div>

                  {/* Foreground: Look A (Current Model) — clipped with slider */}
                  <div
                    className="absolute inset-0 overflow-hidden"
                    style={{ width: `${sliderPosition}%` }}
                  >
                    <ImageSlot
                      src={modelImageSrc}
                      alt={`${mix.title} — phương án chính`}
                      available={modelAvailable}
                      aspectRatio="3/4"
                      className="h-full w-full"
                    />
                    <div className="absolute top-3 left-3 z-10 rounded-full bg-ink/90 px-2.5 py-0.5 text-[10px] font-bold text-white">
                      Look A (Hiện tại)
                    </div>
                  </div>

                  {/* Vertical Divider Bar & Handle */}
                  <div
                    className="absolute top-0 bottom-0 z-30 w-1 bg-white shadow-[0_0_10px_rgba(0,0,0,0.5)] cursor-ew-resize"
                    style={{ left: `${sliderPosition}%` }}
                  >
                    <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-gold text-ink shadow-lg">
                      <ChevronsLeftRight className="h-4 w-4" />
                    </div>
                  </div>

                  {/* Invisible Range Input for dragging */}
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={sliderPosition}
                    onChange={(e) => setSliderPosition(Number(e.target.value))}
                    className="absolute inset-0 z-40 h-full w-full opacity-0 cursor-ew-resize"
                    aria-label="Thanh trượt so sánh phương án A và B"
                  />
                </>
              ) : (
                /* Elegant Placeholder when only 1 image exists */
                <div className="flex h-full w-full flex-col items-center justify-center bg-paper p-6 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold/15 text-gold">
                    <SlidersHorizontal className="h-6 w-6" />
                  </div>
                  <h4 className="font-playfair mt-3 text-base font-bold text-ink">
                    So Sánh Phương Án A/B
                  </h4>
                  <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                    Tính năng đang hoàn thiện dữ liệu hình ảnh cho phương án phụ. Bạn có thể xem ảnh
                    người mẫu hoặc ảnh cổ phục ở hai tab trên.
                  </p>
                  <button
                    type="button"
                    onClick={() => setViewMode("model")}
                    className="mt-4 rounded-full border border-gold px-4 py-1.5 text-xs font-semibold text-ink hover:bg-gold/10"
                  >
                    Quay lại xem Model
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Styling tips */}
        {mix.stylingTips.length > 0 && (
          <div className="rounded-xl border border-paper-border bg-paper p-4">
            <p className="mb-2.5 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-ink">
              <Lightbulb className="h-4 w-4 text-guardrail-yellow" />
              Tips Mặc Chuẩn
            </p>
            <ul className="space-y-1.5">
              {mix.stylingTips.slice(0, 3).map((tip, i) => (
                <li key={i} className="flex items-start gap-2 text-xs leading-relaxed text-ink-muted">
                  <span className="mt-0.5 shrink-0 text-gold">▸</span>
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
          <h3 className="font-playfair text-xl font-bold text-ink">
            {mix.title}
          </h3>
          <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">
            {mix.overallDescription}
          </p>
        </div>

        {/* Items by category */}
        <div className="space-y-3">
          {Object.entries(grouped).map(([cat, items]) => {
            const meta = CATEGORY_META[cat] ?? { label: cat, icon: Shirt, color: "#6B7280" };
            const Icon = meta.icon;
            return (
              <div
                key={cat}
                className="overflow-hidden rounded-xl border border-paper-border bg-white shadow-xs"
              >
                {/* Category header */}
                <div
                  className="flex items-center gap-2 px-4 py-2.5"
                  style={{ backgroundColor: `${meta.color}10` }}
                >
                  <Icon className="h-4 w-4" style={{ color: meta.color }} aria-hidden="true" />
                  <p className="text-xs font-bold uppercase tracking-wider" style={{ color: meta.color }}>
                    {meta.label}
                  </p>
                </div>

                {/* Items */}
                <div className="divide-y divide-paper-warm">
                  {items.map((item, i) => (
                    <div key={i} className="p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0 flex-1">
                          <p className="font-semibold text-ink">{item.name}</p>
                          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                            {item.rationale}
                          </p>
                          {/* Materials */}
                          {item.materials && (
                            <div className="mt-2 flex flex-wrap gap-1">
                              {item.materials.map((m) => (
                                <span
                                  key={m}
                                  className="rounded-full border border-paper-border bg-paper px-2 py-0.5 text-[10px] text-ink-muted"
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
                                  className="flex items-center gap-1 rounded-full bg-ink/10 px-2 py-0.5 text-[10px] font-medium text-ink"
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
                              className="h-5 w-5 rounded-full border border-white shadow-xs"
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
          <div className="flex items-center gap-3 rounded-xl border border-gold/30 bg-gold/10 px-4 py-3">
            <Coins className="h-5 w-5 text-gold" aria-hidden="true" />
            <div>
              <p className="text-xs font-bold text-ink">Ngân sách ước tính</p>
              <p className="text-sm font-semibold text-gold">
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

export default VisualBreakdown;
