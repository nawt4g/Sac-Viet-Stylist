"use client";
/**
 * components/result/CulturalGuardrailBanner.tsx
 * ================================================
 * Banner trạng thái màng lọc văn hóa — 3 trạng thái GREEN/YELLOW/RED.
 * Hiển thị score, violations, suggestions và explanation.
 */

import { ShieldCheck, ShieldAlert, ShieldOff, ChevronDown } from "lucide-react";
import { useState } from "react";
import type { CulturalGuardrail, GuardrailStatus } from "@/types/stylist";

const CONFIG: Record<GuardrailStatus, {
  icon: typeof ShieldCheck;
  bg: string; border: string; text: string; accent: string;
  badgeBg: string; label: string; emoji: string;
}> = {
  GREEN: {
    icon: ShieldCheck,
    bg: "from-[#F0FDF4] to-[#DCFCE7]",
    border: "#16A34A",
    text: "#14532D",
    accent: "#16A34A",
    badgeBg: "#16A34A",
    label: "Được Chứng Nhận — Phù Hợp Văn Hóa",
    emoji: "✅",
  },
  YELLOW: {
    icon: ShieldAlert,
    bg: "from-[#FFFBEB] to-[#FEF3C7]",
    border: "#D97706",
    text: "#78350F",
    accent: "#D97706",
    badgeBg: "#D97706",
    label: "Chú Ý — Cần Xem Xét Ngữ Cảnh",
    emoji: "⚠️",
  },
  RED: {
    icon: ShieldOff,
    bg: "from-[#FFF5F5] to-[#FEE2E2]",
    border: "#DC2626",
    text: "#7F1D1D",
    accent: "#DC2626",
    badgeBg: "#DC2626",
    label: "Không Khuyến Nghị — Vi Phạm Chuẩn Mực",
    emoji: "🚫",
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

  return (
    <div
      role="region"
      aria-label={`Trạng thái văn hóa: ${cfg.label}`}
      className={`overflow-hidden rounded-2xl border-2 bg-gradient-to-br ${cfg.bg}`}
      style={{ borderColor: cfg.border }}
    >
      {/* Main banner row */}
      <div className="flex items-center gap-4 px-5 py-4 sm:px-6">
        {/* Icon */}
        <div
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl shadow-sm"
          style={{ backgroundColor: `${cfg.accent}20` }}
          aria-hidden="true"
        >
          <Icon className="h-6 w-6" style={{ color: cfg.accent }} strokeWidth={2} />
        </div>

        {/* Text block */}
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className="rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-widest text-white"
              style={{ backgroundColor: cfg.badgeBg }}
            >
              {guardrail.status}
            </span>
            <p className="font-playfair text-base font-bold sm:text-lg" style={{ color: cfg.text }}>
              {cfg.label}
            </p>
          </div>
          <p className="mt-1 text-sm leading-relaxed" style={{ color: cfg.text, opacity: 0.85 }}>
            {guardrail.statusMessage}
          </p>
        </div>

        {/* Score ring */}
        <div className="hidden shrink-0 flex-col items-center sm:flex">
          <div
            className="relative flex h-16 w-16 items-center justify-center rounded-full border-4 bg-white"
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
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-black/10">
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
        className="flex w-full items-center justify-between border-t px-5 py-2.5 text-xs font-semibold transition-colors hover:bg-black/5 sm:px-6"
        style={{ borderColor: `${cfg.border}40`, color: cfg.text }}
        aria-expanded={expanded}
        aria-controls="guardrail-details"
      >
        {expanded ? "Thu gọn chi tiết" : "Xem giải thích chi tiết"}
        <ChevronDown
          className="h-4 w-4 transition-transform duration-200"
          style={{ transform: expanded ? "rotate(180deg)" : undefined }}
          aria-hidden="true"
        />
      </button>

      {/* Expanded details */}
      {expanded && (
        <div id="guardrail-details" className="border-t px-5 py-5 sm:px-6" style={{ borderColor: `${cfg.border}40` }}>
          {/* Explanation */}
          <p className="text-sm leading-relaxed" style={{ color: cfg.text }}>
            {guardrail.explanation}
          </p>

          {/* Violations */}
          {guardrail.violations.length > 0 && (
            <div className="mt-4">
              <p className="mb-2 text-xs font-bold uppercase tracking-wider" style={{ color: cfg.accent }}>
                Vi phạm được phát hiện ({guardrail.violations.length})
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
                    {v.description}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Suggestions */}
          {guardrail.suggestions.length > 0 && (
            <div className="mt-4">
              <p className="mb-2 text-xs font-bold uppercase tracking-wider" style={{ color: cfg.accent }}>
                Gợi ý cải thiện
              </p>
              <ul className="space-y-2">
                {guardrail.suggestions.map((s, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm" style={{ color: cfg.text }}>
                    <span className="mt-0.5 shrink-0 text-base">💡</span>
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
              className="mt-5 flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl bg-[#DC2626] px-5 py-2.5 text-sm font-bold text-white shadow-md transition-all hover:bg-[#B91C1C] hover:shadow-lg focus-visible:outline-2 focus-visible:outline-[#DC2626]"
              aria-label="Mở giải thích chi tiết và áp dụng sửa lỗi 1-click"
            >
              🛠 Xem Giải Thích &amp; Sửa 1-Click
            </button>
          )}
        </div>
      )}
    </div>
  );
}
