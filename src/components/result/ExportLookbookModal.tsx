"use client";
/**
 * components/result/ExportLookbookModal.tsx
 * ===========================================
 * Modal xuất Lookbook tỉ lệ 9:16 — Story-ready format.
 * Dùng html-to-image để chụp và tải về ảnh PNG.
 * Phase 5: thay /model-selfie-sample.jpg bằng Pollinations.ai generated image.
 */

import { useRef, useState, useCallback, useEffect } from "react";
import { X, Download, Share2, Loader2, ShieldCheck } from "lucide-react";
import Image from "next/image";
import type { OutfitResponse } from "@/types/stylist";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  outfitResponse: OutfitResponse;
  /** API hook: Pollinations.ai generated image URL — Phase 5 */
  aiImageUrl?: string | null;
}

const STATUS_CONFIG = {
  GREEN:  { label: "Được Chứng Nhận",   color: "#16A34A", badge: "✅ CERTIFIED" },
  YELLOW: { label: "Cần Chú Ý",         color: "#D97706", badge: "⚠️ CAUTION" },
  RED:    { label: "Không Khuyến Nghị", color: "#DC2626", badge: "🚫 REJECTED" },
};

export function ExportLookbookModal({ isOpen, onClose, outfitResponse, aiImageUrl }: Props) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [exporting, setExporting] = useState(false);
  const [exported, setExported] = useState(false);

  const { guardrail, selectedCostumes, stylingMixes, heritageCards } = outfitResponse;
  const mix = stylingMixes[0];
  const costume = selectedCostumes[0];
  const statusCfg = STATUS_CONFIG[guardrail.status];
  const displayImage = aiImageUrl ?? "/hero-editorial.jpg";

  // ESC key and body scroll
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  const handleExport = useCallback(async () => {
    if (!cardRef.current || exporting) return;
    setExporting(true);
    try {
      // Dynamic import — only load html-to-image when needed
      const { toPng } = await import("html-to-image");
      const dataUrl = await toPng(cardRef.current, {
        quality: 0.95,
        pixelRatio: 2, // 2x for retina
        skipAutoScale: false,
      });
      const link = document.createElement("a");
      link.download = `sac-viet-lookbook-${outfitResponse.sessionId}.png`;
      link.href = dataUrl;
      link.click();
      setExported(true);
      setTimeout(() => setExported(false), 3000);
    } catch (err) {
      console.error("Export failed:", err);
    } finally {
      setExporting(false);
    }
  }, [exporting, outfitResponse.sessionId]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="lookbook-modal-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="relative z-10 flex w-full max-w-4xl flex-col overflow-hidden rounded-3xl bg-[#1A1A2E] shadow-2xl lg:flex-row">
        {/* Left: 9:16 story preview */}
        <div className="flex items-center justify-center bg-[#0F0F1A] p-6 lg:w-auto">
          {/* 9:16 card — 270×480 px preview */}
          <div
            ref={cardRef}
            className="relative overflow-hidden rounded-2xl shadow-xl"
            style={{
              width: 270,
              height: 480,
              minWidth: 270,
              minHeight: 480,
              backgroundColor: "#FAF8F5",
              fontFamily: "Be Vietnam Pro, sans-serif",
            }}
            aria-label="Lookbook Story 9:16 preview"
          >
            {/* Background image */}
            <div style={{ position: "absolute", inset: 0 }}>
              <Image
                src={displayImage}
                alt={costume?.name ?? "Cổ phục"}
                fill
                style={{ objectFit: "cover", objectPosition: "top" }}
                priority
                quality={90}
              />
            </div>

            {/* Gradient overlay */}
            <div
              style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.0) 40%, rgba(0,0,0,0.85) 100%)",
              }}
              aria-hidden="true"
            />

            {/* Top: Logo watermark */}
            <div
              style={{
                position: "absolute", top: 12, left: 12, right: 12,
                display: "flex", alignItems: "center", gap: 6,
              }}
            >
              <div
                style={{
                  height: 22, width: 22, borderRadius: 6,
                  background: "linear-gradient(135deg, #9E2A2B, #D4AF37)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 9, fontWeight: 700, color: "white",
                }}
              >
                SV
              </div>
              <span style={{ fontSize: 11, fontWeight: 700, color: "white", letterSpacing: "0.05em" }}>
                Sắc Việt AI Stylist
              </span>
            </div>

            {/* Center: Certified badge */}
            <div
              style={{
                position: "absolute", top: "42%", left: "50%",
                transform: "translate(-50%, -50%)",
                display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
              }}
            >
              <div
                style={{
                  borderRadius: 999, border: `2px solid ${statusCfg.color}`,
                  background: `${statusCfg.color}20`,
                  padding: "4px 14px", backdropFilter: "blur(4px)",
                  fontSize: 11, fontWeight: 700, color: statusCfg.color,
                  letterSpacing: "0.08em",
                }}
              >
                {statusCfg.badge}
              </div>
            </div>

            {/* Bottom info block */}
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "0 14px 14px" }}>
              {/* Costume name */}
              <p style={{
                fontFamily: "Playfair Display, serif",
                fontSize: 17, fontWeight: 700, color: "white", lineHeight: 1.25,
                textShadow: "0 1px 4px rgba(0,0,0,0.5)",
              }}>
                {costume?.name ?? "Cổ Phục Việt"}
              </p>

              {/* Mix title */}
              {mix && (
                <p style={{ fontSize: 10, color: "rgba(255,255,255,0.7)", marginTop: 3 }}>
                  {mix.style} · {mix.title}
                </p>
              )}

              {/* Heritage card snippet */}
              {heritageCards[0] && (
                <div style={{
                  marginTop: 8,
                  background: "rgba(255,255,255,0.12)",
                  backdropFilter: "blur(8px)",
                  borderRadius: 8,
                  padding: "7px 10px",
                  border: "1px solid rgba(212,175,55,0.3)",
                }}>
                  <p style={{ fontSize: 9, color: "#D4AF37", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>
                    ✦ Di Sản
                  </p>
                  <p style={{ fontSize: 10, color: "rgba(255,255,255,0.85)", marginTop: 3, lineHeight: 1.4 }}>
                    {heritageCards[0].summary.slice(0, 80)}…
                  </p>
                </div>
              )}

              {/* Guardrail score */}
              <div style={{
                marginTop: 8,
                display: "flex", alignItems: "center", gap: 6,
              }}>
                <div style={{
                  height: 3, flex: 1, borderRadius: 999,
                  background: "rgba(255,255,255,0.2)",
                  overflow: "hidden",
                }}>
                  <div style={{
                    height: "100%", borderRadius: 999,
                    width: `${guardrail.culturalScore}%`,
                    background: statusCfg.color,
                  }} />
                </div>
                <span style={{ fontSize: 10, fontWeight: 700, color: statusCfg.color }}>
                  {guardrail.culturalScore}/100
                </span>
              </div>

              {/* Bottom watermark */}
              <p style={{
                marginTop: 8, fontSize: 8,
                color: "rgba(255,255,255,0.35)", textAlign: "center",
                letterSpacing: "0.05em",
              }}>
                sacviet.ai · {new Date().toLocaleDateString("vi-VN")}
              </p>
            </div>
          </div>
        </div>

        {/* Right: Controls panel */}
        <div className="flex flex-1 flex-col p-6">
          {/* Header */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 id="lookbook-modal-title" className="font-playfair text-xl font-bold text-white">
                Xuất Lookbook Story
              </h2>
              <p className="mt-1 text-sm text-white/60">
                Tải về ảnh PNG tỉ lệ 9:16 — sẵn sàng đăng Story Instagram/TikTok
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 text-white/60 transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-[#D4AF37]"
              aria-label="Đóng modal"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          {/* Spec list */}
          <div className="mt-5 space-y-2.5">
            {[
              { label: "Tỉ lệ", value: "9:16 (Story / Reels)" },
              { label: "Độ phân giải", value: "540 × 960 px (2x retina)" },
              { label: "Định dạng", value: "PNG · Nền trong" },
              { label: "Nội dung", value: "Ảnh, Huy hiệu, Di sản, Điểm văn hóa" },
              { label: "Ảnh trang phục", value: aiImageUrl ? "✅ Ảnh AI Generated" : "⚠ Ảnh mẫu (Phase 5: AI thật)" },
            ].map(({ label, value }) => (
              <div key={label} className="flex items-center gap-2 text-sm">
                <span className="w-32 shrink-0 text-white/50">{label}</span>
                <span className="font-medium text-white/90">{value}</span>
              </div>
            ))}
          </div>

          {/* API hook note */}
          <div className="mt-4 rounded-xl border border-[#D4AF37]/20 bg-[#D4AF37]/5 px-4 py-3">
            <p className="text-xs text-[#D4AF37]">
              <strong>Phase 5 API Hook:</strong> Khi Pollinations.ai tích hợp, prop{" "}
              <code className="rounded bg-white/10 px-1 font-mono text-[10px]">aiImageUrl</code>{" "}
              sẽ tự động nhận URL ảnh AI để thay ảnh mẫu.
            </p>
          </div>

          <div className="mt-auto flex flex-col gap-3 pt-6">
            {/* Download */}
            <button
              id="btn-export-download"
              type="button"
              onClick={handleExport}
              disabled={exporting}
              className="flex min-h-[52px] items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#E8CC6E] px-6 py-3.5 text-sm font-bold text-[#1E3A5F] shadow-lg shadow-[#D4AF37]/30 transition-all hover:shadow-xl hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-70 focus-visible:outline-2 focus-visible:outline-[#D4AF37]"
              aria-label={exporting ? "Đang xuất ảnh..." : "Tải về Lookbook PNG"}
              aria-busy={exporting}
            >
              {exporting ? (
                <><Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />Đang xuất…</>
              ) : exported ? (
                <><ShieldCheck className="h-4 w-4" aria-hidden="true" />Đã tải về!</>
              ) : (
                <><Download className="h-4 w-4" aria-hidden="true" />Tải về PNG (2x)</>
              )}
            </button>

            {/* Share placeholder */}
            <button
              id="btn-export-share"
              type="button"
              disabled
              className="flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-white/10 px-6 py-2.5 text-sm font-semibold text-white/40 transition-colors"
              aria-label="Chia sẻ trực tiếp — sẽ có trong Phase 5"
            >
              <Share2 className="h-4 w-4" aria-hidden="true" />
              Chia sẻ trực tiếp (Phase 5)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
