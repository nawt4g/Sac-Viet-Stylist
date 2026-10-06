"use client";

/**
 * components/stylist/LiveOutfitPreview.tsx
 * =========================================
 * Panel "Xem trước phối đồ" trực tiếp (Live Preview Panel):
 *   - Desktop: Cột phải cố định (sticky).
 *   - Mobile: Thanh sticky thu gọn ở đầu màn hình, có thể mở rộng xem chi tiết.
 *   - Cập nhật hình ảnh liên tục dựa trên các lựa chọn ở cả 3 bước (Undertone, Costume, Context, Accessories).
 *   - Lấy ảnh từ getLookImage / getFlatlay kết hợp ImageSlot (CLS = 0).
 *   - Hiển thị cảnh báo: "Ảnh tham khảo, màu thực tế có thể khác" khi chọn màu biến thể.
 */

import React, { useState } from "react";
import {
  Sparkles,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  MapPin,
  Eye,
} from "lucide-react";
import { useStylist, ALL_ACCESSORIES, type ContextType } from "@/context/StylistContext";
import { ImageSlot } from "@/components/common/ImageSlot";
import { getLookImage, getFlatlay } from "@/lib/images";
import { CONTEXT_ICON, ACCESSORY_ICON } from "@/components/icons";

/* ── Nhãn hiển thị cho 6 ngữ cảnh ── */
const CONTEXT_LABELS: Record<ContextType, string> = {
  "dao-pho": "Dạo phố",
  "ky-yeu": "Kỷ yếu",
  "chup-anh": "Chụp ảnh NT",
  "van-mieu": "Văn Miếu",
  "dam-cuoi": "Đám cưới",
  "le-hoi": "Lễ hội / Tết",
};

export interface LiveOutfitPreviewProps {
  mode?: "all" | "mobile" | "desktop";
}

export function LiveOutfitPreview({ mode = "all" }: LiveOutfitPreviewProps) {
  const { state } = useStylist();
  const {
    detectedUndertone,
    selectedCostume,
    selectedContext,
    selectedAccessories,
    currentStep,
  } = state;

  const [isMobileExpanded, setIsMobileExpanded] = useState(false);

  // 1. Tìm look ảnh theo getLookImage({ costumeId, colorHex, contextId })
  let isApproximateColor = false;
  let previewSrc: string | null = null;
  let previewAvailable = false;
  let previewAlt = "Xem trước phối đồ";
  let previewTitle: string | undefined = undefined;
  let previewSubtitle: string | undefined = undefined;

  const targetCostumeId = selectedCostume?.id ?? "ao-ngu-than";
  const targetColor = selectedCostume?.color;
  const targetContext = selectedContext ?? undefined;

  const { image: lookResult, exact } = getLookImage({
    costumeId: targetCostumeId,
    colorHex: targetColor,
    contextId: targetContext,
  });

  if (selectedCostume) {
    isApproximateColor = !exact;
  }

  if (lookResult) {
    previewSrc = lookResult.src;
    previewAvailable = lookResult.available;
    previewAlt = lookResult.alt;
    previewTitle = lookResult.title;
    previewSubtitle = lookResult.description;
  }

  // Nếu chưa có look image, fallback về ảnh của cổ phục đã chọn
  if (!previewSrc && selectedCostume) {
    const flatlay = getFlatlay(selectedCostume.id);
    previewSrc = flatlay.src;
    previewAvailable = flatlay.available;
    previewAlt = flatlay.alt;
    previewTitle = selectedCostume.name;
    previewSubtitle = "Ảnh cổ phục truyền thống";
  }

  // Nếu vẫn chưa chọn gì (ở bước 1)
  if (!previewSrc) {
    previewSrc = "/hero-editorial.png";
    previewAvailable = true;
    previewAlt = "Sắc Việt AI Stylist — Bắt đầu phối đồ";
    previewTitle = "Chưa chọn cổ phục";
    previewSubtitle = "Vui lòng hoàn thành các bước để xem phối đồ";
  }

  // 3. Phụ kiện đã chọn
  const chosenAccessories = ALL_ACCESSORIES.filter((a) =>
    selectedAccessories.has(a.id)
  );
  const hasRiskyItem = chosenAccessories.some((a) => a.isRisky);

  // Context Icon
  const ContextIcon = selectedContext ? CONTEXT_ICON[selectedContext] ?? MapPin : MapPin;

  return (
    <>
      {/* ── A. MOBILE STICKY COLLAPSIBLE BAR (Hiện trên mobile) ── */}
      {mode !== "desktop" && (
        <div className="lg:hidden sticky top-14 z-30 mb-6 rounded-2xl border border-paper-border bg-white/95 p-3 shadow-md backdrop-blur-md">
          <button
            type="button"
            onClick={() => setIsMobileExpanded((prev) => !prev)}
            className="flex min-h-[44px] w-full items-center justify-between gap-3 text-left"
            aria-expanded={isMobileExpanded}
            aria-label="Thu gọn hoặc mở rộng bảng xem trước phối đồ"
          >
            <div className="flex items-center gap-2.5">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-crimson/10 text-crimson">
                <Eye className="h-4 w-4" />
              </span>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-crimson">
                  Xem trước phối đồ
                </p>
                <p className="text-xs font-semibold text-ink">
                  {selectedCostume?.name ?? "Đang chọn trang phục..."}
                  {selectedContext && ` · ${CONTEXT_LABELS[selectedContext]}`}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {hasRiskyItem && (
                <span
                  className="flex h-5 w-5 items-center justify-center rounded-full bg-guardrail-red text-[10px] font-bold text-white"
                  title="Có phụ kiện cần chú ý"
                >
                  !
                </span>
              )}
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-paper text-ink">
                {isMobileExpanded ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </div>
            </div>
          </button>

          {/* Nội dung chi tiết mở rộng trên mobile */}
          {isMobileExpanded && (
            <div className="mt-3 border-t border-paper-border pt-3">
              <div className="max-w-[260px] mx-auto mb-3">
                <ImageSlot
                  src={previewSrc}
                  alt={previewAlt}
                  available={previewAvailable}
                  aspectRatio="3/4"
                  fallbackTitle={previewTitle}
                  fallbackSubtitle={previewSubtitle}
                  className="w-full shadow-sm"
                />
              </div>
              {isApproximateColor && (
                <p className="text-center text-[10px] italic text-guardrail-yellow mb-2">
                  * Ảnh tham khảo, màu thực tế có thể khác
                </p>
              )}
            </div>
          )}
        </div>
      )}

      {/* ── B. DESKTOP STICKY LIVE PREVIEW PANEL (Cột phải) ── */}
      {mode !== "mobile" && (
        <aside
          id="live-outfit-preview-desktop"
          aria-label="Panel xem trước phối đồ trực tiếp"
          className="hidden lg:block sticky top-20 rounded-2xl border border-paper-border bg-white p-5 shadow-lg shadow-ink/5 transition-all"
        >
          {/* Panel Header */}
          <div className="mb-4 flex items-center justify-between border-b border-paper-border pb-3">
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-md bg-crimson/10 text-crimson">
                <Sparkles className="h-3.5 w-3.5 text-gold" />
              </span>
              <h3 className="font-playfair text-base font-bold text-ink">
                Xem Trước Phối Đồ
              </h3>
            </div>
            <span className="rounded-full bg-paper px-2.5 py-0.5 text-[10px] font-semibold text-ink-muted border border-paper-border">
              Live Studio
            </span>
          </div>

          {/* Live Image Showcase */}
          <div className="relative overflow-hidden rounded-xl bg-paper">
            <ImageSlot
              src={previewSrc}
              alt={previewAlt}
              available={previewAvailable}
              aspectRatio="3/4"
              fallbackTitle={previewTitle}
              fallbackSubtitle={previewSubtitle}
              className="w-full shadow-inner"
              quality={85}
            />

            {/* Color swatch indicator */}
            {selectedCostume?.color && (
              <div className="absolute left-3 top-3 z-20 flex items-center gap-1.5 rounded-full bg-white/90 px-2.5 py-1 shadow-sm backdrop-blur-xs">
                <span
                  className="h-3.5 w-3.5 rounded-full border border-black/10 shadow-xs"
                  style={{ backgroundColor: selectedCostume.color }}
                  aria-hidden="true"
                />
                <span className="text-[10px] font-semibold text-ink">
                  Đang chọn màu
                </span>
              </div>
            )}
          </div>

          {/* Dòng cảnh báo màu sắc gần đúng nếu chọn màu biến thể */}
          {isApproximateColor && (
            <p className="mt-2 text-center text-[11px] font-medium text-guardrail-yellow bg-guardrail-yellow-bg/60 rounded-md py-1 px-2 border border-guardrail-yellow/20 flex items-center justify-center gap-1">
              <AlertTriangle className="h-3 w-3" />
              <span>Ảnh tham khảo, màu thực tế có thể khác</span>
            </p>
          )}

          {/* Live Selections Breakdown */}
          <div className="mt-4 space-y-3">
            {/* 1. Tông da */}
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Tông da:</span>
              {detectedUndertone ? (
                <span className="font-semibold text-guardrail-yellow">
                  {detectedUndertone.label.split(" — ")[0]}
                </span>
              ) : (
                <span className="text-paper-border italic">Đang chờ quét...</span>
              )}
            </div>

            {/* 2. Cổ phục */}
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Cổ phục:</span>
              {selectedCostume ? (
                <span className="font-semibold text-ink">
                  {selectedCostume.name}
                </span>
              ) : (
                <span className="text-paper-border italic">Chưa chọn</span>
              )}
            </div>

            {/* 3. Ngữ cảnh */}
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Ngữ cảnh:</span>
              {selectedContext ? (
                <span className="inline-flex items-center gap-1 font-semibold text-crimson">
                  <ContextIcon className="h-3 w-3" />
                  {CONTEXT_LABELS[selectedContext]}
                </span>
              ) : (
                <span className="text-paper-border italic">Chưa chọn</span>
              )}
            </div>

            {/* 4. Phụ kiện */}
            <div className="border-t border-paper-border pt-2.5">
              <div className="mb-1.5 flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Phụ kiện ({chosenAccessories.length}):</span>
                {hasRiskyItem && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-guardrail-red">
                    <AlertTriangle className="h-3 w-3" />
                    Có cảnh báo
                  </span>
                )}
              </div>

              {chosenAccessories.length > 0 ? (
                <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto">
                  {chosenAccessories.map((acc) => {
                    const AccIcon = ACCESSORY_ICON[acc.id] ?? Sparkles;
                    return (
                      <span
                        key={acc.id}
                        className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[10px] font-medium border ${
                          acc.isRisky
                            ? "border-guardrail-red/40 bg-guardrail-red-bg text-guardrail-red"
                            : "border-paper-border bg-paper text-ink"
                        }`}
                      >
                        <AccIcon className="h-2.5 w-2.5" />
                        {acc.name}
                      </span>
                    );
                  })}
                </div>
              ) : (
                <p className="text-[11px] text-paper-border italic">
                  {currentStep === 3 ? "Chưa chọn món nào" : "Sẽ chọn ở bước 3"}
                </p>
              )}
            </div>
          </div>
        </aside>
      )}
    </>
  );
}

export default LiveOutfitPreview;
