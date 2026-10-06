"use client";
/**
 * components/result/ExportLookbookModal.tsx
 * ===========================================
 * Modal xuất Lookbook tỉ lệ 9:16 — Story/Reels-ready format.
 * Sử dụng html-to-image để chụp và tải về ảnh PNG chất lượng cao.
 * Đảm bảo hiển thị đầy đủ hình ảnh (không bị lỗi CORS do next/image optimizer).
 */

import { useRef, useState, useCallback, useEffect } from "react";
import {
  X,
  Download,
  Loader2,
  ShieldCheck,
  ShieldAlert,
  ShieldOff,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import type { OutfitResponse, GuardrailStatus } from "@/types/stylist";
import { ImageSlot } from "@/components/common/ImageSlot";
import { getLookImage, getPatternImage } from "@/lib/images";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  outfitResponse: OutfitResponse;
  aiImageUrl?: string | null;
}

const STATUS_CONFIG: Record<GuardrailStatus, {
  label: string;
  color: string;
  badgeBg: string;
  icon: typeof ShieldCheck;
}> = {
  GREEN:  { label: "ĐẠT CHUẨN VĂN HÓA", color: "#16A34A", badgeBg: "rgba(22, 163, 74, 0.25)", icon: ShieldCheck },
  YELLOW: { label: "CHÚ Ý NGỮ CẢNH",   color: "#D97706", badgeBg: "rgba(217, 119, 6, 0.25)",  icon: ShieldAlert },
  RED:    { label: "CẦN ĐIỀU CHỈNH",   color: "#DC2626", badgeBg: "rgba(220, 38, 38, 0.25)",  icon: ShieldOff },
};

export function ExportLookbookModal({ isOpen, onClose, outfitResponse, aiImageUrl }: Props) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [exporting, setExporting] = useState(false);
  const [exported, setExported] = useState(false);

  const { guardrail, selectedCostumes, stylingMixes, heritageCards } = outfitResponse;
  const mix = stylingMixes[0];
  const costume = selectedCostumes[0];
  const statusCfg = STATUS_CONFIG[guardrail.status] ?? STATUS_CONFIG.GREEN;

  // Resolve best look image for export using getLookImage params
  const { image: manifestLook } = getLookImage({
    costumeId: costume?.id,
    colorHex: (costume as { color?: string })?.color,
    contextId: "dao-pho",
  });

  // Chỉ dùng ảnh khi available === true, nếu không thì dùng ảnh hero, không để đường dẫn 404 vào <img>
  let displayImage = "/hero-editorial.png";
  if (aiImageUrl) {
    displayImage = aiImageUrl;
  } else if (costume?.imageUrl) {
    displayImage = costume.imageUrl;
  } else if (manifestLook && manifestLook.available) {
    displayImage = manifestLook.src;
  }

  // ESC key and body scroll lock
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
      // Dynamic import — load html-to-image on demand
      const { toPng } = await import("html-to-image");

      // Ensure images in container are pre-loaded
      const imgElements = cardRef.current.querySelectorAll("img");
      await Promise.all(
        Array.from(imgElements).map((img) => {
          if (img.complete) return Promise.resolve();
          return new Promise((resolve) => {
            img.onload = resolve;
            img.onerror = resolve;
          });
        })
      );

      const dataUrl = await toPng(cardRef.current, {
        quality: 0.95,
        pixelRatio: 2, // 2x for sharp retina rendering
        cacheBust: false,
        backgroundColor: "#FAF8F5",
      });

      const link = document.createElement("a");
      link.download = `sac-viet-lookbook-${outfitResponse.sessionId || Date.now()}.png`;
      link.href = dataUrl;
      link.click();
      setExported(true);
      setTimeout(() => setExported(false), 3000);
    } catch (err) {
      console.error("Xuất ảnh Lookbook thất bại:", err);
    } finally {
      setExporting(false);
    }
  }, [exporting, outfitResponse.sessionId]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-5"
      role="dialog"
      aria-modal="true"
      aria-labelledby="lookbook-modal-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/75 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Container */}
      <div className="relative z-10 flex w-full max-w-4xl max-h-[95vh] flex-col overflow-hidden rounded-3xl bg-[#1E293B] shadow-2xl lg:flex-row">
        {/* ── Left: 9:16 Social Story Preview ── */}
        <div className="flex items-center justify-center bg-[#0F172A] p-4 sm:p-6 overflow-y-auto">
          {/* 9:16 card (288×512 px) */}
          <div
            ref={cardRef}
            className="relative overflow-hidden rounded-2xl shadow-2xl"
            style={{
              width: 288,
              height: 512,
              minWidth: 288,
              minHeight: 512,
              backgroundColor: "#FAF8F5",
              fontFamily: "var(--font-be-vietnam, sans-serif)",
            }}
            aria-label="Xem trước Thẻ Lookbook Story 9:16"
          >
            {/* Background image (unoptimized img element to avoid CORS/proxy issues in html-to-image) */}
            <div style={{ position: "absolute", inset: 0 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={displayImage}
                alt={costume?.name ?? "Cổ phục Việt Nam"}
                crossOrigin="anonymous"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (target.src !== "/hero-editorial.png") {
                    target.src = "/hero-editorial.png";
                  }
                }}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "top center",
                }}
              />
            </div>

            {/* Gradient Scrim Overlay */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to bottom, rgba(15,23,42,0.65) 0%, rgba(15,23,42,0.1) 35%, rgba(15,23,42,0.4) 65%, rgba(15,23,42,0.92) 100%)",
              }}
              aria-hidden="true"
            />

            {/* Decorative Gold Frame Border */}
            <div
              style={{
                position: "absolute",
                inset: 10,
                border: "1px solid rgba(212, 175, 55, 0.45)",
                borderRadius: 14,
                pointerEvents: "none",
              }}
              aria-hidden="true"
            />

            {/* Decorative Heritage Pattern Motif */}
            <div
              style={{
                position: "absolute",
                top: 12,
                right: 12,
                width: 32,
                height: 32,
                opacity: 0.25,
                pointerEvents: "none",
                zIndex: 5,
              }}
              aria-hidden="true"
            >
              <ImageSlot
                src={getPatternImage("medallion").src}
                alt="Họa tiết Medallion cung đình"
                available={getPatternImage("medallion").available}
                aspectRatio="1/1"
                className="h-full w-full object-contain"
              />
            </div>

            {/* Top Bar: Brand & Contest */}
            <div
              style={{
                position: "absolute",
                top: 18,
                left: 18,
                right: 18,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                zIndex: 10,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                <div
                  style={{
                    height: 24,
                    width: 24,
                    borderRadius: 7,
                    background: "linear-gradient(135deg, #9E2A2B, #D4AF37)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 10,
                    fontWeight: 800,
                    color: "white",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.3)",
                  }}
                >
                  SV
                </div>
                <div>
                  <p style={{ fontSize: 11, fontWeight: 800, color: "white", letterSpacing: "0.04em", margin: 0, lineHeight: 1.1 }}>
                    Sắc Việt Stylist
                  </p>
                  <p style={{ fontSize: 8, color: "#D4AF37", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", margin: 0 }}>
                    Việt Phục Remix
                  </p>
                </div>
              </div>

              {/* Status Badge */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                  borderRadius: 999,
                  border: `1.5px solid ${statusCfg.color}`,
                  background: statusCfg.badgeBg,
                  padding: "3px 8px",
                  backdropFilter: "blur(6px)",
                  fontSize: 8,
                  fontWeight: 800,
                  color: "white",
                  letterSpacing: "0.06em",
                }}
              >
                <span style={{ height: 6, width: 6, borderRadius: "50%", backgroundColor: statusCfg.color }} />
                <span>{statusCfg.label}</span>
              </div>
            </div>

            {/* Bottom Content Block */}
            <div
              style={{
                position: "absolute",
                bottom: 16,
                left: 18,
                right: 18,
                zIndex: 10,
                display: "flex",
                flexDirection: "column",
                gap: 6,
              }}
            >
              {/* Costume & Style Name */}
              <div>
                <p
                  style={{
                    fontFamily: "var(--font-playfair, serif)",
                    fontSize: 18,
                    fontWeight: 800,
                    color: "white",
                    lineHeight: 1.2,
                    margin: 0,
                    textShadow: "0 2px 6px rgba(0,0,0,0.7)",
                  }}
                >
                  {costume?.name ?? "Áo Ngũ Thân Truyền Thống"}
                </p>
                {mix && (
                  <p style={{ fontSize: 11, color: "#E2E8F0", marginTop: 2, marginBottom: 0, fontWeight: 500 }}>
                    {mix.style} · {mix.title}
                  </p>
                )}
              </div>

              {/* Score bar */}
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 2 }}>
                <div style={{ height: 4, flex: 1, borderRadius: 999, background: "rgba(255,255,255,0.25)", overflow: "hidden" }}>
                  <div
                    style={{
                      height: "100%",
                      borderRadius: 999,
                      width: `${guardrail.culturalScore}%`,
                      background: statusCfg.color,
                    }}
                  />
                </div>
                <span style={{ fontSize: 10, fontWeight: 800, color: statusCfg.color }}>
                  {guardrail.culturalScore}/100 điểm
                </span>
              </div>

              {/* Heritage Fact Box */}
              {heritageCards[0] && (
                <div
                  style={{
                    background: "rgba(15, 23, 42, 0.65)",
                    border: "1px solid rgba(212, 175, 55, 0.35)",
                    borderRadius: 8,
                    padding: "6px 9px",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  <p style={{ fontSize: 8, color: "#D4AF37", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", margin: 0 }}>
                    Tri thức di sản
                  </p>
                  <p style={{ fontSize: 9.5, color: "#F1F5F9", margin: "2px 0 0 0", lineHeight: 1.35 }}>
                    {heritageCards[0].summary.slice(0, 85)}…
                  </p>
                </div>
              )}

              {/* Required Credit Line */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginTop: 2,
                  borderTop: "1px solid rgba(255,255,255,0.15)",
                  paddingTop: 4,
                }}
              >
                <span style={{ fontSize: 8, color: "rgba(255,255,255,0.7)", fontWeight: 500 }}>
                  Ảnh minh họa AI (Google Gemini)
                </span>
                <span style={{ fontSize: 8, color: "#D4AF37", fontWeight: 600 }}>
                  sacviet.ai
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Right: Download Controls ── */}
        <div className="relative flex flex-1 flex-col p-6 sm:p-7 justify-between overflow-hidden">
          {/* Subtle Heritage Pattern Watermark */}
          <div className="pointer-events-none absolute -bottom-10 -right-10 h-48 w-48 opacity-[0.06]">
            <ImageSlot
              src={getPatternImage("medallion").src}
              alt="Họa tiết Medallion cung đình"
              available={getPatternImage("medallion").available}
              aspectRatio="1/1"
              className="h-full w-full object-contain"
            />
          </div>

          <div>
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-widest text-[#D4AF37]">
                  <Sparkles className="h-3.5 w-3.5" />
                  Social Lookbook Story
                </span>
                <h2 id="lookbook-modal-title" className="font-playfair mt-1 text-2xl font-bold text-white">
                  Xuất Thẻ Phối Đồ 9:16
                </h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 text-white/70 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-[#D4AF37]"
                aria-label="Đóng modal"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            <p className="mt-2 text-xs leading-relaxed text-slate-300">
              Thẻ ảnh được tối ưu hóa cho định dạng Story Instagram, Facebook và TikTok. Thiết kế sang trọng
              kết hợp điểm chuẩn mực văn hóa và góc nhìn lịch sử.
            </p>

            {/* Spec list */}
            <div className="mt-5 space-y-2 rounded-xl bg-slate-900/60 p-4 border border-slate-700/50">
              {[
                { label: "Tỉ lệ khung hình", value: "9:16 (Story / Reels / TikTok)" },
                { label: "Độ phân giải xuất", value: "576 × 1024 px (2x Retina sắc nét)" },
                { label: "Định dạng tải về", value: "PNG không nén" },
                { label: "Chuẩn mực văn hóa", value: `${statusCfg.label} (${guardrail.culturalScore}/100đ)` },
                { label: "Bản quyền hình ảnh", value: "Ảnh minh họa AI (Google Gemini)" },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">{label}:</span>
                  <span className="font-medium text-slate-200">{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <div className="mt-6 flex flex-col gap-3">
            <button
              id="btn-export-download"
              type="button"
              onClick={handleExport}
              disabled={exporting}
              className="flex min-h-[50px] items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#E8CC6E] px-6 py-3.5 text-sm font-bold text-[#1E3A5F] shadow-lg shadow-[#D4AF37]/25 transition-all hover:shadow-xl hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-70 focus-visible:outline-2 focus-visible:outline-[#D4AF37]"
              aria-label={exporting ? "Đang xuất ảnh PNG..." : "Tải về Thẻ Lookbook PNG"}
              aria-busy={exporting}
            >
              {exporting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                  <span>Đang tổng hợp thẻ ảnh…</span>
                </>
              ) : exported ? (
                <>
                  <CheckCircle2 className="h-4 w-4 text-[#16A34A]" aria-hidden="true" />
                  <span>Đã tải về máy thành công!</span>
                </>
              ) : (
                <>
                  <Download className="h-4 w-4" aria-hidden="true" />
                  <span>Tải Về Ảnh PNG (9:16)</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="flex min-h-[44px] items-center justify-center rounded-xl border border-white/10 px-6 py-2.5 text-xs font-semibold text-slate-300 transition-colors hover:bg-white/5 hover:text-white"
            >
              Đóng lại
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
