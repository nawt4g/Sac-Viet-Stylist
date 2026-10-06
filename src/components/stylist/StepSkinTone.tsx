"use client";

/**
 * components/stylist/StepSkinTone.tsx
 * =====================================
 * Bước 1: Upload selfie + Mock laser scan + Kết quả tông da.
 *
 * Polish:
 *   - Thay thế toàn bộ emoji/ký tự đặc biệt bằng Lucide icon.
 *   - Vùng bấm (touch target) >= 44px tối ưu mobile.
 *   - Giữ nguyên a11y & aria-labels.
 *   - Nhấp chọn bảng màu đề xuất sẽ cập nhật trực tiếp vào trang phục xem trước.
 */

import React, { useRef, useCallback } from "react";
import Image from "next/image";
import {
  Upload,
  Camera,
  Sparkles,
  ChevronRight,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { useStylist, type UndertoneType, type CostumeId } from "@/context/StylistContext";

/* ── Undertone badge colors ── */
const UNDERTONE_BADGE: Record<
  NonNullable<UndertoneType>,
  { bg: string; text: string; border: string }
> = {
  warm: { bg: "#FEF3C7", text: "#D97706", border: "#D97706" },
  cool: { bg: "#EFF6FF", text: "#2563EB", border: "#2563EB" },
  neutral: { bg: "#F3F4F6", text: "#374151", border: "#6B7280" },
};

/* ── Laser scan overlay ── */
function LaserScanOverlay() {
  return (
    <div
      className="absolute inset-0 z-20 overflow-hidden rounded-2xl"
      aria-live="polite"
      aria-label="Đang quét tông da..."
      role="status"
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Scan grid lines */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(212,175,55,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(212,175,55,0.3) 1px, transparent 1px)
          `,
          backgroundSize: "20px 20px",
        }}
      />

      {/* Moving laser line */}
      <div
        className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent shadow-[0_0_12px_3px_rgba(212,175,55,0.8)]"
        style={{ animation: "laserScan 1.4s ease-in-out forwards" }}
        aria-hidden="true"
      />

      {/* Corner markers */}
      {["top-2 left-2", "top-2 right-2", "bottom-2 left-2", "bottom-2 right-2"].map(
        (pos) => (
          <div
            key={pos}
            className={`absolute ${pos} h-5 w-5 border-2 border-gold opacity-80`}
            style={{
              borderRadius: "2px",
              clipPath: pos.includes("top-2 left-2")
                ? "polygon(0 0, 60% 0, 60% 20%, 20% 20%, 20% 60%, 0 60%)"
                : pos.includes("top-2 right-2")
                ? "polygon(40% 0, 100% 0, 100% 60%, 80% 60%, 80% 20%, 40% 20%)"
                : pos.includes("bottom-2 left-2")
                ? "polygon(0 40%, 20% 40%, 20% 80%, 60% 80%, 60% 100%, 0 100%)"
                : "polygon(40% 80%, 80% 80%, 80% 40%, 100% 40%, 100% 100%, 40% 100%)",
            }}
            aria-hidden="true"
          />
        )
      )}

      {/* Status text */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center">
        <div className="glass-card flex items-center gap-1.5 rounded-full px-4 py-1.5 shadow-sm">
          <Sparkles className="h-3.5 w-3.5 text-gold animate-spin-slow" />
          <p className="text-xs font-semibold text-gold">
            Đang phân tích sắc tố da…
          </p>
        </div>
      </div>
    </div>
  );
}

/* ── Color chip tương tác ── */
function ColorChip({
  hex,
  nameVi,
  onClick,
  isSelected,
}: {
  hex: string;
  nameVi: string;
  onClick?: () => void;
  isSelected?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex flex-col items-center gap-1.5 focus:outline-hidden min-h-[44px] cursor-pointer"
      aria-label={`Chọn màu ${nameVi}`}
    >
      <div
        className={`h-10 w-10 rounded-full border-2 transition-all duration-200 group-hover:scale-110 shadow-md ${
          isSelected
            ? "scale-110 border-ink ring-2 ring-gold"
            : "border-white ring-1 ring-black/5"
        }`}
        style={{ backgroundColor: hex }}
        title={nameVi}
      />
      <span className="text-center text-[10px] leading-tight text-muted-foreground group-hover:text-ink">
        {nameVi}
      </span>
    </button>
  );
}

/* ── Main Component ── */
export function StepSkinTone() {
  const { state, dispatch, simulateScan, nextStep } = useStylist();
  const { selfieImage, isScanning, detectedUndertone, selectedCostume } = state;
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle file upload
  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        if (ev.target?.result) {
          dispatch({ type: "SET_SELFIE", payload: ev.target.result as string });
        }
      };
      reader.readAsDataURL(file);
    },
    [dispatch]
  );

  // Drag & drop
  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const file = e.dataTransfer.files?.[0];
      if (!file || !file.type.startsWith("image/")) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        if (ev.target?.result) {
          dispatch({ type: "SET_SELFIE", payload: ev.target.result as string });
        }
      };
      reader.readAsDataURL(file);
    },
    [dispatch]
  );

  const handleDragOver = (e: React.DragEvent) => e.preventDefault();

  const handleColorClick = (chipHex: string) => {
    const current = selectedCostume ?? {
      id: "ao-ngu-than" as CostumeId,
      name: "Áo Ngũ Thân Tay Chẽn",
      nameEn: "Five-Panel Tunic",
      color: chipHex,
    };
    dispatch({
      type: "SELECT_COSTUME",
      payload: {
        ...current,
        color: chipHex,
      },
    });
  };

  const badge = detectedUndertone
    ? UNDERTONE_BADGE[detectedUndertone.type ?? "warm"]
    : null;

  return (
    <div className="flex flex-col gap-8">
      {/* Step Header */}
      <div>
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-crimson text-xs font-bold text-white">
            1
          </span>
          <span className="text-xs font-bold uppercase tracking-widest text-crimson">
            Bước 1: Phân Tích Sắc Tố Da
          </span>
        </div>
        <h2 className="font-playfair mt-2 text-2xl font-bold text-ink sm:text-3xl">
          Tông Da & Bảng Màu Khởi Điểm
        </h2>
        <p className="mt-1 text-sm text-ink-muted">
          Tải ảnh selfie hoặc chọn ảnh người mẫu thử nghiệm để AI nhận diện Undertone và đề xuất gam màu cổ phục tôn vinh làn da của bạn.
        </p>
      </div>

      {/* Main Grid: Upload left, Results right */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* LEFT: Upload & Camera Area */}
        <div className="flex flex-col gap-4">
          {selfieImage ? (
            /* Image Preview Area with Laser Scan Overlay */
            <div className="relative aspect-square w-full overflow-hidden rounded-2xl border-2 border-paper-border bg-black/5 shadow-inner">
              <Image
                src={selfieImage}
                alt="Ảnh selfie của bạn để phân tích sắc tố da"
                fill
                className="object-cover"
                priority
              />

              {/* Laser scan animation overlay */}
              {isScanning && <LaserScanOverlay />}

              {/* Reset image button (Touch target >= 44px) */}
              {!isScanning && (
                <button
                  type="button"
                  onClick={() => dispatch({ type: "SET_SELFIE", payload: "" })}
                  className="absolute right-3 top-3 z-10 flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full bg-black/55 text-white backdrop-blur-sm transition-all hover:bg-black/75 focus-visible:outline-2 focus-visible:outline-gold"
                  aria-label="Xóa ảnh và chọn lại"
                >
                  <RotateCcw className="h-4 w-4" />
                </button>
              )}
            </div>
          ) : (
            /* Dropzone (Touch target >= 44px) */
            <div
              role="button"
              tabIndex={0}
              id="selfie-dropzone"
              aria-label="Vùng tải ảnh selfie — nhấp để chọn hoặc kéo thả ảnh vào đây"
              className="flex aspect-square w-full min-h-[44px] cursor-pointer flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed border-gold/50 bg-gradient-to-b from-paper to-paper-warm p-6 transition-all duration-200 hover:border-gold hover:bg-paper focus-visible:outline-2 focus-visible:outline-gold"
              onClick={() => fileInputRef.current?.click()}
              onKeyDown={(e) =>
                e.key === "Enter" && fileInputRef.current?.click()
              }
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gold/15 ring-4 ring-gold/10">
                <Upload
                  className="h-7 w-7 text-gold"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
              </div>
              <div className="text-center">
                <p className="text-sm font-semibold text-ink">
                  Kéo thả hoặc nhấp để tải ảnh
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  JPG, PNG, WEBP · Tối đa 5MB
                </p>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="sr-only"
                onChange={handleFileChange}
                aria-hidden="true"
                tabIndex={-1}
              />
            </div>
          )}

          {/* Action buttons (Touch targets >= 44px) */}
          <div className="flex flex-col gap-2.5">
            {!selfieImage && (
              <button
                id="btn-use-model-selfie"
                type="button"
                onClick={() => dispatch({ type: "USE_MODEL_SELFIE" })}
                className="flex min-h-[48px] items-center justify-center gap-2 rounded-xl border border-paper-border bg-white px-4 py-2.5 text-sm font-semibold text-ink shadow-xs transition-all hover:border-gold hover:bg-paper focus-visible:outline-2 focus-visible:outline-gold"
                aria-label="Sử dụng ảnh người mẫu có sẵn để test nhanh"
              >
                <Camera className="h-4 w-4 text-gold" aria-hidden="true" />
                <span>Dùng ảnh mẫu thử nghiệm</span>
              </button>
            )}

            {selfieImage && !detectedUndertone && (
              <button
                id="btn-start-scan"
                type="button"
                onClick={simulateScan}
                disabled={isScanning}
                className="flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-crimson to-crimson-light px-6 py-3 text-sm font-bold uppercase tracking-wider text-white shadow-lg shadow-crimson/25 transition-all hover:shadow-xl disabled:cursor-wait disabled:opacity-70 focus-visible:outline-2 focus-visible:outline-crimson"
                aria-label="Bắt đầu quét và phân tích tông da"
                aria-busy={isScanning}
              >
                <Sparkles className="h-4 w-4" aria-hidden="true" />
                <span>{isScanning ? "Đang phân tích…" : "Bắt Đầu Quét Tông Da"}</span>
              </button>
            )}
          </div>
        </div>

        {/* RIGHT: Results panel */}
        <div className="flex flex-col gap-4">
          {detectedUndertone ? (
            <>
              {/* Undertone result card */}
              <div className="rounded-2xl border border-gold/40 bg-gradient-to-b from-white to-paper p-5 shadow-sm">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span
                      className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-wider shadow-2xs"
                      style={{
                        backgroundColor: badge?.bg,
                        color: badge?.text,
                        borderColor: badge?.border,
                      }}
                    >
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      {detectedUndertone.label}
                    </span>
                    <p className="mt-3 text-xs sm:text-sm leading-relaxed text-ink-muted">
                      {detectedUndertone.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Recommended colors */}
              <div className="rounded-2xl border border-paper-border bg-white p-5 shadow-sm">
                <div className="mb-4 flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-gold" />
                  <h3 className="text-xs font-bold uppercase tracking-wider text-ink">
                    Bảng Màu Cổ Phục Gợi Ý (Nhấp để chọn)
                  </h3>
                </div>

                <div
                  className="grid grid-cols-3 sm:grid-cols-6 gap-3"
                  role="list"
                  aria-label="Màu sắc cổ phục phù hợp với tông da của bạn"
                >
                  {detectedUndertone.recommendedColors.map((chip) => (
                    <div key={chip.hex} role="listitem">
                      <ColorChip
                        hex={chip.hex}
                        nameVi={chip.nameVi}
                        isSelected={selectedCostume?.color === chip.hex}
                        onClick={() => handleColorClick(chip.hex)}
                      />
                    </div>
                  ))}
                </div>

                {detectedUndertone.avoidColors.length > 0 && (
                  <div className="mt-4 border-t border-paper-border pt-4">
                    <p className="mb-2.5 flex items-center gap-1.5 text-xs font-semibold text-guardrail-red">
                      <AlertCircle className="h-3.5 w-3.5" />
                      <span>Gam màu nên hạn chế</span>
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {detectedUndertone.avoidColors.map((chip) => (
                        <div key={chip.hex} className="relative">
                          <ColorChip hex={chip.hex} nameVi={chip.nameVi} />
                          <div
                            className="pointer-events-none absolute inset-0 flex items-center justify-center rounded-full"
                            aria-hidden="true"
                          >
                            <div className="h-px w-8 -rotate-45 bg-red-500 opacity-70" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* CTA to next step (Touch target >= 44px) */}
              <button
                id="btn-step1-next"
                type="button"
                onClick={nextStep}
                className="flex min-h-[48px] items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-ink to-ink-light px-6 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-ink/20 transition-all hover:shadow-xl hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-ink cursor-pointer"
                aria-label="Tiếp tục sang Bước 2: Chọn cổ phục và ngữ cảnh"
              >
                <span>Tiếp Theo: Chọn Cổ Phục</span>
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </>
          ) : (
            /* Placeholder when no result yet */
            <div className="flex h-full min-h-[280px] flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed border-paper-border bg-paper p-8 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gold/10 text-gold">
                <Sparkles className="h-6 w-6" aria-hidden="true" />
              </div>
              <div>
                <p className="font-playfair text-base font-bold text-ink">
                  Kết quả phân tích sẽ xuất hiện tại đây
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Tải ảnh selfie hoặc dùng ảnh mẫu để AI trích xuất bảng màu trang phục chuẩn.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default StepSkinTone;
