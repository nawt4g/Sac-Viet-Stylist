"use client";

/**
 * components/stylist/StepSkinTone.tsx
 * =====================================
 * Bước 1: Upload selfie + Mock laser scan + Kết quả tông da.
 *
 * Flow:
 *   (A) Empty → Dropzone hoặc nút "Dùng ảnh mẫu"
 *   (B) Image selected → Nút "Bắt đầu quét" + preview ảnh
 *   (C) Scanning → Laser animation overlay (CSS keyframes)
 *   (D) Result → Undertone card + Color chips palette
 */

import { useRef, useCallback } from "react";
import Image from "next/image";
import { Upload, Camera, Sparkles, ChevronRight, RotateCcw } from "lucide-react";
import { useStylist, type UndertoneType } from "@/context/StylistContext";

/* ── Undertone badge colors ── */
const UNDERTONE_BADGE: Record<NonNullable<UndertoneType>, { bg: string; text: string; border: string }> = {
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
      <div className="absolute inset-0 opacity-20"
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
        className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent shadow-[0_0_12px_3px_rgba(212,175,55,0.8)]"
        style={{ animation: "laserScan 1.4s ease-in-out forwards" }}
        aria-hidden="true"
      />

      {/* Corner markers */}
      {["top-2 left-2", "top-2 right-2", "bottom-2 left-2", "bottom-2 right-2"].map((pos) => (
        <div
          key={pos}
          className={`absolute ${pos} h-5 w-5 border-2 border-[#D4AF37] opacity-80`}
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
      ))}

      {/* Status text */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center">
        <div className="glass-card rounded-full px-4 py-1.5">
          <p className="text-xs font-semibold text-[#D4AF37]">
            ✦ Đang phân tích tông da…
          </p>
        </div>
      </div>
    </div>
  );
}

/* ── Color chip ── */
function ColorChip({ hex, nameVi }: { hex: string; nameVi: string }) {
  return (
    <div className="group flex flex-col items-center gap-1.5">
      <div
        className="h-10 w-10 rounded-full border-2 border-white shadow-md ring-1 ring-black/5 transition-transform duration-200 group-hover:scale-110"
        style={{ backgroundColor: hex }}
        aria-label={nameVi}
        title={nameVi}
      />
      <span className="text-center text-[10px] leading-tight text-[#6B7280]">
        {nameVi}
      </span>
    </div>
  );
}

/* ── Main Component ── */
export function StepSkinTone() {
  const { state, dispatch, simulateScan, nextStep, canProceedStep1 } = useStylist();
  const { selfieImage, isScanning, detectedUndertone } = state;
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

  const badge = detectedUndertone
    ? UNDERTONE_BADGE[detectedUndertone.type!]
    : null;

  return (
    <div className="flex flex-col gap-8">
      {/* Section heading */}
      <div>
        <h2 className="font-playfair text-2xl font-bold text-[#1E3A5F] sm:text-3xl">
          Nhận Diện Tông Da
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-[#4A6A8F]">
          Tải lên ảnh selfie của bạn — AI sẽ phân tích undertone và gợi ý bảng
          màu cổ phục phù hợp nhất trong vài giây.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* LEFT: Image area */}
        <div className="flex flex-col gap-4">
          {selfieImage ? (
            /* Image preview + scan overlay */
            <div className="relative aspect-square w-full overflow-hidden rounded-2xl border-2 border-[#D4AF37]/40 bg-[#FAF8F5]">
              <Image
                src={selfieImage}
                alt="Ảnh selfie của bạn để phân tích tông da"
                fill
                className="object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              {isScanning && <LaserScanOverlay />}

              {/* Reset button */}
              {!isScanning && (
                <button
                  type="button"
                  onClick={() => dispatch({ type: "SET_SELFIE", payload: "" })}
                  className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-all hover:bg-black/70"
                  aria-label="Xóa ảnh và chọn lại"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          ) : (
            /* Dropzone */
            <div
              role="button"
              tabIndex={0}
              id="selfie-dropzone"
              aria-label="Vùng tải ảnh selfie — nhấp để chọn hoặc kéo thả ảnh vào đây"
              className="flex aspect-square w-full cursor-pointer flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed border-[#D4AF37]/50 bg-gradient-to-b from-[#FAF8F5] to-[#F3EFE8] transition-all duration-200 hover:border-[#D4AF37] hover:bg-[#FAF8F5] focus-visible:outline-2 focus-visible:outline-[#D4AF37]"
              onClick={() => fileInputRef.current?.click()}
              onKeyDown={(e) => e.key === "Enter" && fileInputRef.current?.click()}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#D4AF37]/15 ring-4 ring-[#D4AF37]/10">
                <Upload className="h-7 w-7 text-[#D4AF37]" strokeWidth={1.5} aria-hidden="true" />
              </div>
              <div className="text-center">
                <p className="text-sm font-semibold text-[#1E3A5F]">
                  Kéo thả hoặc nhấp để tải ảnh
                </p>
                <p className="mt-1 text-xs text-[#6B7280]">
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

          {/* Action buttons */}
          <div className="flex flex-col gap-2.5">
            {/* Use model selfie */}
            {!selfieImage && (
              <button
                id="btn-use-model-selfie"
                type="button"
                onClick={() => dispatch({ type: "USE_MODEL_SELFIE" })}
                className="flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-[#E5DECE] bg-white px-4 py-2.5 text-sm font-medium text-[#1E3A5F] transition-all hover:border-[#D4AF37]/60 hover:bg-[#FAF8F5] focus-visible:outline-2 focus-visible:outline-[#D4AF37]"
                aria-label="Sử dụng ảnh người mẫu có sẵn để test nhanh"
              >
                <Camera className="h-4 w-4 text-[#D4AF37]" aria-hidden="true" />
                Dùng ảnh người mẫu có sẵn
              </button>
            )}

            {/* Scan button */}
            {selfieImage && !detectedUndertone && (
              <button
                id="btn-start-scan"
                type="button"
                onClick={simulateScan}
                disabled={isScanning}
                className="flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#9E2A2B] to-[#C4371C] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#9E2A2B]/25 transition-all hover:shadow-xl disabled:cursor-wait disabled:opacity-70 focus-visible:outline-2 focus-visible:outline-[#9E2A2B]"
                aria-label="Bắt đầu quét và phân tích tông da"
                aria-busy={isScanning}
              >
                <Sparkles className="h-4 w-4" aria-hidden="true" />
                {isScanning ? "Đang phân tích…" : "Bắt đầu Quét Tông Da"}
              </button>
            )}
          </div>
        </div>

        {/* RIGHT: Results panel */}
        <div className="flex flex-col gap-4">
          {detectedUndertone ? (
            <>
              {/* Undertone result card */}
              <div className="rounded-2xl border border-[#D4AF37]/30 bg-gradient-to-b from-white to-[#FAF8F5] p-5 shadow-sm">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span
                      className="inline-flex items-center rounded-full border px-3 py-0.5 text-xs font-bold uppercase tracking-wider"
                      style={{
                        backgroundColor: badge?.bg,
                        color: badge?.text,
                        borderColor: badge?.border,
                      }}
                    >
                      ✓ {detectedUndertone.label}
                    </span>
                    <p className="mt-3 text-sm leading-relaxed text-[#4A6A8F]">
                      {detectedUndertone.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Recommended colors */}
              <div className="rounded-2xl border border-[#E5DECE] bg-white p-5">
                <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-[#1E3A5F]">
                  ✦ Bảng Màu Cổ Phục Gợi Ý
                </h3>
                <div
                  className="grid grid-cols-6 gap-3"
                  role="list"
                  aria-label="Màu sắc cổ phục phù hợp với tông da của bạn"
                >
                  {detectedUndertone.recommendedColors.map((chip) => (
                    <div key={chip.hex} role="listitem">
                      <ColorChip hex={chip.hex} nameVi={chip.nameVi} />
                    </div>
                  ))}
                </div>

                {detectedUndertone.avoidColors.length > 0 && (
                  <div className="mt-4 border-t border-[#E5DECE] pt-4">
                    <p className="mb-3 text-xs font-semibold text-[#DC2626]">
                      ⚠ Nên tránh
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

              {/* CTA to next step */}
              <button
                id="btn-step1-next"
                type="button"
                onClick={nextStep}
                className="flex min-h-[52px] items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-[#1E3A5F] to-[#2C527F] px-6 py-3.5 text-sm font-bold text-white shadow-lg transition-all hover:shadow-xl hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-[#1E3A5F]"
                aria-label="Tiếp tục sang Bước 2: Chọn cổ phục và ngữ cảnh"
              >
                Tiếp theo: Chọn Cổ phục
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </>
          ) : (
            /* Placeholder when no result yet */
            <div className="flex h-full min-h-[280px] flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed border-[#E5DECE] bg-[#FAF8F5] p-8 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#D4AF37]/10">
                <span className="text-2xl" aria-hidden="true">✦</span>
              </div>
              <div>
                <p className="font-semibold text-[#1E3A5F]">
                  Kết quả sẽ hiện ở đây
                </p>
                <p className="mt-1 text-sm text-[#6B7280]">
                  Tải ảnh selfie và bấm quét để nhận phân tích tông da cùng bảng màu cổ phục phù hợp.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
