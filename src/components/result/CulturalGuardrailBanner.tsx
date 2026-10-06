"use client";
/**
 * components/result/CulturalGuardrailBanner.tsx
 * ================================================
 * Banner trạng thái màng lọc văn hóa — 3 trạng thái GREEN/YELLOW/RED.
 * Hiển thị score, violations, suggestions, giải thích và khối so sánh trực quan.
 */

import {
  ShieldCheck,
  ShieldAlert,
  ShieldOff,
  ChevronDown,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Lightbulb,
  Wrench,
  ArrowRight,
} from "lucide-react";
import { useState } from "react";
import type { CulturalGuardrail, GuardrailStatus } from "@/types/stylist";
import { ImageSlot } from "@/components/common/ImageSlot";
import { getLookImage } from "@/lib/images";
import { isImageOnDisk } from "@/data/imageManifest";

const CONFIG: Record<GuardrailStatus, {
  icon: typeof ShieldCheck;
  statusIcon: typeof CheckCircle2;
  bg: string; border: string; text: string; accent: string;
  badgeBg: string; label: string;
}> = {
  GREEN: {
    icon: ShieldCheck,
    statusIcon: CheckCircle2,
    bg: "from-[#F0FDF4] to-[#DCFCE7]",
    border: "#16A34A",
    text: "#14532D",
    accent: "#16A34A",
    badgeBg: "#16A34A",
    label: "Được Chứng Nhận — Phù Hợp Văn Hóa",
  },
  YELLOW: {
    icon: ShieldAlert,
    statusIcon: AlertTriangle,
    bg: "from-[#FFFBEB] to-[#FEF3C7]",
    border: "#D97706",
    text: "#78350F",
    accent: "#D97706",
    badgeBg: "#D97706",
    label: "Chú Ý — Cần Xem Xét Ngữ Cảnh",
  },
  RED: {
    icon: ShieldOff,
    statusIcon: XCircle,
    bg: "from-[#FFF5F5] to-[#FEE2E2]",
    border: "#DC2626",
    text: "#7F1D1D",
    accent: "#DC2626",
    badgeBg: "#DC2626",
    label: "Không Khuyến Nghị — Vi Phạm Chuẩn Mực",
  },
};

interface Props {
  guardrail: CulturalGuardrail;
  onOpenRedModal?: () => void;
}

export function CulturalGuardrailBanner({ guardrail, onOpenRedModal }: Props) {
  const [expanded, setExpanded] = useState(false);
  const cfg = CONFIG[guardrail.status];
  const Icon = cfg.icon;
  const StatusIcon = cfg.statusIcon;

  // Comparison images for RED status
  const errorLook = getLookImage("ao-tac-short-loi").image ?? {
    src: "/images/looks/ao-tac-short-loi.webp",
    available: isImageOnDisk("ao-tac-short-loi") || isImageOnDisk("/images/looks/ao-tac-short-loi.webp"),
    alt: "Ảnh lỗi: Áo Tấc phối Quần Short",
  };
  const fixedLook = getLookImage({ costumeId: "ao-tac", contextId: "van-mieu" }).image ?? {
    src: "/images/looks/ao-tac-van-mieu.webp",
    available: isImageOnDisk("ao-tac-van-mieu") || isImageOnDisk("/images/looks/ao-tac-van-mieu.webp"),
    alt: "Ảnh chuẩn: Áo Tấc phối Quần Lụa Trắng",
  };

  return (
    <div
      role="region"
      aria-label={`Trạng thái văn hóa: ${cfg.label}`}
      className={`overflow-hidden rounded-2xl border-2 bg-gradient-to-br ${cfg.bg} shadow-sm`}
      style={{ borderColor: cfg.border }}
    >
      {/* Main banner row */}
      <div className="flex items-center gap-4 px-5 py-4 sm:px-6">
        {/* Icon */}
        <div
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl shadow-xs"
          style={{ backgroundColor: `${cfg.accent}20` }}
          aria-hidden="true"
        >
          <Icon className="h-6 w-6" style={{ color: cfg.accent }} strokeWidth={2} />
        </div>

        {/* Text block */}
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className="flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-widest text-white shadow-xs"
              style={{ backgroundColor: cfg.badgeBg }}
            >
              <StatusIcon className="h-3 w-3" />
              {guardrail.status}
            </span>
            <p className="font-playfair text-base font-bold sm:text-lg" style={{ color: cfg.text }}>
              {cfg.label}
            </p>
          </div>
          <p className="mt-1 text-sm leading-relaxed" style={{ color: cfg.text, opacity: 0.9 }}>
            {guardrail.statusMessage}
          </p>
        </div>

        {/* Score ring */}
        <div className="hidden shrink-0 flex-col items-center sm:flex">
          <div
            className="relative flex h-16 w-16 items-center justify-center rounded-full border-4 bg-white shadow-xs"
            style={{ borderColor: cfg.accent }}
            aria-label={`Điểm văn hóa: ${guardrail.culturalScore}/100`}
          >
            <span className="font-playfair text-lg font-bold" style={{ color: cfg.accent }}>
              {guardrail.culturalScore}
            </span>
          </div>
          <span className="mt-1 text-[10px] font-semibold" style={{ color: cfg.text }}>
            / 100
          </span>
        </div>
      </div>

      {/* Score bar */}
      <div className="px-5 pb-3 sm:px-6">
        <div className="h-2 w-full overflow-hidden rounded-full bg-black/10">
          <div
            className="h-full rounded-full transition-all duration-1000"
            style={{ width: `${guardrail.culturalScore}%`, backgroundColor: cfg.accent }}
            role="progressbar"
            aria-valuenow={guardrail.culturalScore}
            aria-valuemin={0}
            aria-valuemax={100}
          />
        </div>
      </div>

      {/* Expand / collapse details */}
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="flex min-h-[44px] w-full items-center justify-between border-t px-5 py-2.5 text-xs font-semibold transition-colors hover:bg-black/5 sm:px-6"
        style={{ borderColor: `${cfg.border}40`, color: cfg.text }}
        aria-expanded={expanded}
        aria-controls="guardrail-details"
      >
        <span>{expanded ? "Thu gọn chi tiết" : "Xem phân tích chi tiết & đối chiếu phương án"}</span>
        <ChevronDown
          className="h-4 w-4 transition-transform duration-200"
          style={{ transform: expanded ? "rotate(180deg)" : undefined }}
          aria-hidden="true"
        />
      </button>

      {/* Expanded details */}
      {expanded && (
        <div id="guardrail-details" className="border-t px-5 py-5 sm:px-6 space-y-5" style={{ borderColor: `${cfg.border}40` }}>
          {/* Explanation */}
          <div>
            <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: cfg.accent }}>
              Đánh giá chuẩn mực
            </p>
            <p className="text-sm leading-relaxed" style={{ color: cfg.text }}>
              {guardrail.explanation}
            </p>
          </div>

          {/* ── Khối UI "Chưa phù hợp / Gợi ý sửa" khi có vi phạm hoặc cảnh báo ── */}
          {guardrail.status === "RED" && (
            <div className="rounded-2xl border border-[#DC2626]/30 bg-white/80 p-4 shadow-xs">
              <p className="mb-3 text-xs font-bold uppercase tracking-wider text-[#DC2626]">
                Đối chiếu trực quan: Chưa phù hợp vs Gợi ý sửa
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {/* Lỗi */}
                <div className="rounded-xl border border-[#DC2626]/30 bg-[#FFF5F5] p-3">
                  <div className="relative mb-2 overflow-hidden rounded-lg">
                    <ImageSlot
                      src={errorLook.src}
                      alt={errorLook.alt}
                      available={errorLook.available}
                      aspectRatio="3/4"
                      fallbackTitle="Áo Tấc + Quần Short"
                      fallbackSubtitle="Chưa phù hợp"
                      className="w-full"
                    />
                    <span className="absolute top-2 left-2 z-10 flex items-center gap-1 rounded-full bg-[#DC2626] px-2 py-0.5 text-[10px] font-bold text-white">
                      <XCircle className="h-3 w-3" /> Chưa phù hợp
                    </span>
                  </div>
                  <p className="text-xs font-bold text-[#DC2626]">Áo Tấc + Quần Short (18đ)</p>
                  <p className="mt-1 text-[11px] leading-relaxed text-[#7F1D1D]">
                    Gây tương phản quá mức giữa phần thân trên đại lễ phục và phần dưới đồ dạo mát.
                  </p>
                </div>

                {/* Sửa chuẩn */}
                <div className="rounded-xl border border-[#16A34A]/30 bg-[#F0FDF4] p-3">
                  <div className="relative mb-2 overflow-hidden rounded-lg">
                    <ImageSlot
                      src={fixedLook.src}
                      alt={fixedLook.alt}
                      available={fixedLook.available}
                      aspectRatio="3/4"
                      fallbackTitle="Áo Tấc + Quần Lụa Trắng"
                      fallbackSubtitle="Gợi ý sửa chuẩn"
                      className="w-full"
                    />
                    <span className="absolute top-2 left-2 z-10 flex items-center gap-1 rounded-full bg-[#16A34A] px-2 py-0.5 text-[10px] font-bold text-white">
                      <CheckCircle2 className="h-3 w-3" /> Gợi ý sửa chuẩn
                    </span>
                  </div>
                  <p className="text-xs font-bold text-[#16A34A]">Áo Tấc + Quần Lụa Trắng (95đ)</p>
                  <p className="mt-1 text-[11px] leading-relaxed text-[#14532D]">
                    Quần lụa trắng suông giữ trọn nét thanh tao, tôn vinh trọn vẹn 5 vạt áo Ngũ Luân.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Violations */}
          {guardrail.violations.length > 0 && (
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-wider" style={{ color: cfg.accent }}>
                Điểm cần lưu ý ({guardrail.violations.length})
              </p>
              <ul className="space-y-2" role="list">
                {guardrail.violations.map((v, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm" style={{ color: cfg.text }}>
                    <span
                      className="mt-0.5 shrink-0 rounded px-1.5 py-0.5 text-[10px] font-bold text-white"
                      style={{
                        backgroundColor: v.severity === "severe" ? "#DC2626" : v.severity === "moderate" ? "#D97706" : "#6B7280"
                      }}
                    >
                      {v.severity.toUpperCase()}
                    </span>
                    <span>{v.description}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Suggestions */}
          {guardrail.suggestions.length > 0 && (
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-wider" style={{ color: cfg.accent }}>
                Gợi ý cải thiện phong cách
              </p>
              <ul className="space-y-2">
                {guardrail.suggestions.map((s, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm" style={{ color: cfg.text }}>
                    <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-[#D97706]" aria-hidden="true" />
                    <span>{s.suggestion}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* RED: CTA to modal */}
          {guardrail.status === "RED" && onOpenRedModal && (
            <button
              id="btn-open-red-modal"
              type="button"
              onClick={onOpenRedModal}
              className="mt-2 flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-[#DC2626] px-5 py-3 text-sm font-bold text-white shadow-md transition-all hover:bg-[#B91C1C] hover:shadow-lg focus-visible:outline-2 focus-visible:outline-[#DC2626]"
              aria-label="Mở giải thích chi tiết và áp dụng sửa lỗi 1-click"
            >
              <Wrench className="h-4 w-4" aria-hidden="true" />
              <span>Xem Giải Thích Chi Tiết &amp; Sửa 1-Click</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}
