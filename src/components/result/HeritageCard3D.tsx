"use client";
/**
 * components/result/HeritageCard3D.tsx
 * =======================================
 * Thẻ di sản lật 3D — dùng CSS 3D preserve-3d + Framer Motion.
 * Mặt trước: Hoa văn mây ngũ sắc + tiêu đề.
 * Mặt sau: Nội dung triết lý đầy đủ.
 */

import { useState } from "react";
import { motion } from "framer-motion";
import type { HeritageCard } from "@/types/stylist";

const TYPE_META: Record<HeritageCard["type"], { emoji: string; color: string; label: string }> = {
  history:      { emoji: "📜", color: "#1E3A5F", label: "Lịch Sử" },
  symbolism:    { emoji: "🌸", color: "#9E2A2B", label: "Biểu Tượng" },
  etiquette:    { emoji: "🏛️", color: "#4A7856", label: "Lễ Nghi" },
  regional:     { emoji: "🗺️", color: "#7B5E3A", label: "Vùng Miền" },
  color_meaning:{ emoji: "🎨", color: "#D4AF37", label: "Màu Sắc" },
  material:     { emoji: "🧵", color: "#6B7280", label: "Chất Liệu" },
};

const LEVEL_BADGE: Record<HeritageCard["level"], { label: string; bg: string; text: string }> = {
  beginner:     { label: "Cơ Bản",    bg: "#DCFCE7", text: "#16A34A" },
  intermediate: { label: "Trung Cấp", bg: "#FEF3C7", text: "#D97706" },
  expert:       { label: "Nâng Cao",  bg: "#EFF6FF", text: "#2563EB" },
};

/* ── Cloud pattern SVG (decorative) ── */
function CloudPattern({ color }: { color: string }) {
  return (
    <svg
      className="absolute inset-0 h-full w-full opacity-[0.06]"
      viewBox="0 0 200 200"
      aria-hidden="true"
      fill={color}
    >
      {/* Mây ngũ sắc stylized */}
      <circle cx="40" cy="40" r="25" />
      <circle cx="65" cy="30" r="20" />
      <circle cx="90" cy="40" r="25" />
      <circle cx="115" cy="30" r="18" />
      <circle cx="140" cy="40" r="22" />
      <circle cx="30" cy="130" r="18" />
      <circle cx="55" cy="120" r="22" />
      <circle cx="80" cy="130" r="18" />
      <circle cx="150" cy="130" r="20" />
      <circle cx="175" cy="120" r="18" />
      <ellipse cx="100" cy="160" rx="60" ry="15" />
      <ellipse cx="100" cy="60" rx="50" ry="12" />
      {/* Lotus motif */}
      <path d="M100 100 Q90 85 100 75 Q110 85 100 100Z" />
      <path d="M100 100 Q85 90 80 100 Q90 108 100 100Z" />
      <path d="M100 100 Q115 90 120 100 Q110 108 100 100Z" />
    </svg>
  );
}

/* ── Single flip card ── */
function FlipCard({ card }: { card: HeritageCard }) {
  const [flipped, setFlipped] = useState(false);
  const meta = TYPE_META[card.type];
  const level = LEVEL_BADGE[card.level];

  return (
    <div
      className="group relative h-64 w-full cursor-pointer"
      style={{ perspective: "1200px" }}
      onClick={() => setFlipped((f) => !f)}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setFlipped((f) => !f)}
      role="button"
      tabIndex={0}
      aria-pressed={flipped}
      aria-label={`${flipped ? "Lật lại" : "Lật thẻ xem"}: ${card.title}`}
    >
      <motion.div
        className="relative h-full w-full"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
      >
        {/* ── FRONT FACE ── */}
        <div
          className="absolute inset-0 overflow-hidden rounded-2xl border-2 p-5"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            borderColor: `${meta.color}40`,
            background: `linear-gradient(135deg, #FAF8F5 0%, ${meta.color}08 100%)`,
          }}
        >
          <CloudPattern color={meta.color} />

          {/* Top row */}
          <div className="relative z-10 flex items-start justify-between gap-2">
            <span
              className="rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-white"
              style={{ backgroundColor: meta.color }}
            >
              {meta.emoji} {meta.label}
            </span>
            <span
              className="rounded-full px-2 py-0.5 text-[10px] font-semibold"
              style={{ backgroundColor: level.bg, color: level.text }}
            >
              {level.label}
            </span>
          </div>

          {/* Title */}
          <h4
            className="relative z-10 mt-4 font-playfair text-base font-bold leading-snug"
            style={{ color: meta.color === "#D4AF37" ? "#1E3A5F" : meta.color }}
          >
            {card.title}
          </h4>

          {/* Summary */}
          <p className="relative z-10 mt-3 line-clamp-3 text-xs leading-relaxed text-[#4A6A8F]">
            {card.summary}
          </p>

          {/* Flip hint */}
          <div className="absolute bottom-4 right-4 flex items-center gap-1">
            <div className="h-px w-4 bg-[#D4AF37]" aria-hidden="true" />
            <span className="text-[9px] font-bold uppercase tracking-widest text-[#D4AF37]">
              Lật thẻ
            </span>
          </div>
        </div>

        {/* ── BACK FACE ── */}
        <div
          className="absolute inset-0 overflow-hidden rounded-2xl border-2 p-5"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            borderColor: `${meta.color}60`,
            backgroundColor: meta.color,
          }}
        >
          <CloudPattern color="white" />

          {/* Back content */}
          <div className="relative z-10 flex h-full flex-col">
            <div className="flex items-center gap-2">
              <span className="text-lg text-white" aria-hidden="true">{meta.emoji}</span>
              <p className="text-xs font-bold uppercase tracking-widest text-white/80">
                {meta.label}
              </p>
            </div>

            <p className="mt-3 flex-1 overflow-y-auto text-xs leading-relaxed text-white/90">
              {card.content}
            </p>

            {/* Sources */}
            {card.sources && card.sources.length > 0 && (
              <p className="mt-3 text-[10px] italic text-white/60">
                Nguồn: {card.sources.join(", ")}
              </p>
            )}

            <p className="mt-2 text-center text-[9px] font-bold uppercase tracking-widest text-white/50">
              Nhấn để lật lại
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* ── Main component ── */
interface Props {
  cards: HeritageCard[];
}

export function HeritageCard3D({ cards }: Props) {
  return (
    <section aria-labelledby="heritage-3d-heading">
      <div className="mb-5 flex items-center gap-3">
        <div className="h-px flex-1 bg-[#E5DECE]" aria-hidden="true" />
        <h3
          id="heritage-3d-heading"
          className="text-xs font-bold uppercase tracking-[0.2em] text-[#D4AF37]"
        >
          ✦ Thẻ Di Sản Kỹ Thuật Số
        </h3>
        <div className="h-px flex-1 bg-[#E5DECE]" aria-hidden="true" />
      </div>

      <div
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        role="list"
        aria-label="Thẻ tri thức di sản — nhấn để lật"
      >
        {cards.map((card) => (
          <div key={card.id} role="listitem">
            <FlipCard card={card} />
          </div>
        ))}
      </div>

      <p className="mt-3 text-center text-xs text-[#C0B8A8]">
        Nhấn vào thẻ để lật và đọc nội dung đầy đủ
      </p>
    </section>
  );
}
