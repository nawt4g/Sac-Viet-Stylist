"use client";
/**
 * components/result/HeritageCard3D.tsx
 * =======================================
 * Thẻ di sản lật 3D — dùng CSS 3D preserve-3d + Framer Motion.
 * Mặt trước: Họa tiết mây ngũ sắc truyền thống + tiêu đề & tóm tắt.
 * Mặt sau: Nội dung triết lý & nguồn dẫn đầy đủ.
 * Tối ưu responsive và độ tương phản dễ đọc trên thiết bị mobile.
 */

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Scroll,
  Flower2,
  Landmark,
  MapPin,
  Palette,
  Scissors,
  RotateCw,
  Sparkles,
} from "lucide-react";
import type { HeritageCard } from "@/types/stylist";
import { ImageSlot } from "@/components/common/ImageSlot";
import { getPatternImage } from "@/lib/images";

const TYPE_META: Record<HeritageCard["type"], { icon: typeof Scroll; color: string; label: string }> = {
  history:      { icon: Scroll,    color: "#1E3A5F", label: "Lịch Sử" },
  symbolism:    { icon: Flower2,   color: "#9E2A2B", label: "Biểu Tượng" },
  etiquette:    { icon: Landmark,  color: "#4A7856", label: "Lễ Nghi" },
  regional:     { icon: MapPin,    color: "#7B5E3A", label: "Vùng Miền" },
  color_meaning:{ icon: Palette,   color: "#D4AF37", label: "Màu Sắc" },
  material:     { icon: Scissors,  color: "#6B7280", label: "Chất Liệu" },
};

const LEVEL_BADGE: Record<HeritageCard["level"], { label: string; bg: string; text: string }> = {
  beginner:     { label: "Cơ Bản",    bg: "#DCFCE7", text: "#16A34A" },
  intermediate: { label: "Trung Cấp", bg: "#FEF3C7", text: "#D97706" },
  expert:       { label: "Nâng Cao",  bg: "#EFF6FF", text: "#2563EB" },
};

/* ── Traditional Pattern with ImageSlot ── */
function HeritageTraditionalPattern({
  type,
  isLight = false,
}: {
  type: HeritageCard["type"];
  isLight?: boolean;
}) {
  const patternName =
    type === "symbolism" || type === "regional"
      ? "hoa-sen"
      : type === "history" || type === "etiquette"
      ? "hac-may"
      : type === "color_meaning"
      ? "medallion"
      : "may-song";

  const pattern = getPatternImage(patternName);

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${
        isLight ? "opacity-15 mix-blend-screen" : "opacity-[0.08] mix-blend-multiply"
      }`}
      aria-hidden="true"
    >
      <ImageSlot
        src={pattern.src}
        alt={pattern.title}
        available={pattern.available}
        aspectRatio="1/1"
        className="h-full w-full object-cover scale-110"
      />
    </div>
  );
}

/* ── Single flip card ── */
function FlipCard({ card }: { card: HeritageCard }) {
  const [flipped, setFlipped] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const meta = TYPE_META[card.type] ?? { icon: Scroll, color: "#1E3A5F", label: "Di Sản" };
  const level = LEVEL_BADGE[card.level] ?? LEVEL_BADGE.beginner;
  const Icon = meta.icon;

  return (
    <div
      className="group relative h-72 sm:h-80 w-full cursor-pointer select-none"
      style={{ perspective: "1200px" }}
      onClick={() => setFlipped((f) => !f)}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setFlipped((f) => !f)}
      role="button"
      tabIndex={0}
      aria-pressed={flipped}
      aria-label={`${flipped ? "Lật lại mặt trước" : "Lật thẻ xem chi tiết"}: ${card.title}`}
    >
      <motion.div
        className="relative h-full w-full"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
      >
        {/* ── FRONT FACE ── */}
        <div
          className="absolute inset-0 flex flex-col justify-between overflow-hidden rounded-2xl border-2 p-5 shadow-sm transition-shadow hover:shadow-md"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            borderColor: `${meta.color}40`,
            background: `linear-gradient(145deg, #FAF8F5 0%, ${meta.color}0A 100%)`,
          }}
        >
          <HeritageTraditionalPattern type={card.type} />

          {/* Top row */}
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-1.5 sm:gap-2">
            <span
              className="flex items-center gap-1 sm:gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-xs shrink-0"
              style={{ backgroundColor: meta.color }}
            >
              <Icon className="h-3 w-3" />
              <span>{meta.label}</span>
            </span>
            <span
              className="rounded-full px-2 py-0.5 text-[10px] font-semibold shrink-0"
              style={{ backgroundColor: level.bg, color: level.text }}
            >
              {level.label}
            </span>
          </div>

          {/* Center: Title & Summary */}
          <div className="relative z-10 my-auto py-1 sm:py-2">
            <h4
              className="font-playfair text-base sm:text-lg font-bold leading-snug line-clamp-3"
              style={{ color: meta.color === "#D4AF37" ? "#1E3A5F" : meta.color }}
            >
              {card.title}
            </h4>
            <p className="mt-1.5 line-clamp-3 text-xs leading-relaxed text-[#4A6A8F]">
              {card.summary}
            </p>
          </div>

          {/* Bottom hint */}
          <div className="relative z-10 flex items-center justify-between border-t border-[#E5DECE]/60 pt-2.5">
            <span className="flex items-center gap-1 text-[10px] text-[#D4AF37] font-semibold">
              <Sparkles className="h-3 w-3" /> Tri thức di sản
            </span>
            <span className="flex items-center gap-1 rounded-full bg-[#D4AF37]/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#9E2A2B]">
              <RotateCw className="h-3 w-3" /> Chạm để lật
            </span>
          </div>
        </div>

        {/* ── BACK FACE ── */}
        <div
          className="absolute inset-0 flex flex-col overflow-hidden rounded-2xl border-2 p-5 shadow-md"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            borderColor: `${meta.color}60`,
            backgroundColor: meta.color,
          }}
        >
          <HeritageTraditionalPattern type={card.type} isLight={true} />

          {/* Back content */}
          <div className="relative z-10 flex h-full flex-col">
            <div className="flex flex-wrap items-center justify-between gap-1.5 border-b border-white/20 pb-2">
              <div className="flex items-center gap-1.5 shrink-0">
                <Icon className="h-4 w-4 text-white" />
                <p className="text-xs font-bold uppercase tracking-wider text-white">
                  {meta.label} · Chi tiết
                </p>
              </div>
              <span className="rounded-full bg-white/20 px-2 py-0.5 text-[9px] font-semibold text-white shrink-0">
                {level.label}
              </span>
            </div>

            <div className="mt-3 flex-1 overflow-y-auto pr-1">
              <p className="text-xs leading-relaxed text-white/95">
                {card.content}
              </p>

              {/* Sources */}
              {card.sources && card.sources.length > 0 && (
                <div className="mt-3 rounded-lg bg-black/15 p-2 border border-white/10">
                  <p className="text-[10px] italic text-white/80">
                    Nguồn tài liệu: {card.sources.join(", ")}
                  </p>
                </div>
              )}
            </div>

            <div className="mt-3 flex items-center justify-center border-t border-white/20 pt-2">
              <p className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-white/75">
                <RotateCw className="h-3 w-3" /> Nhấn để lật lại mặt trước
              </p>
            </div>
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
          className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#D4AF37]"
        >
          <Sparkles className="h-3.5 w-3.5" />
          Thẻ Di Sản Kỹ Thuật Số
        </h3>
        <div className="h-px flex-1 bg-[#E5DECE]" aria-hidden="true" />
      </div>

      <div
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3"
        role="list"
        aria-label="Thẻ tri thức di sản — nhấn để lật"
      >
        {cards.map((card) => (
          <div key={card.id} role="listitem">
            <FlipCard card={card} />
          </div>
        ))}
      </div>

      <p className="mt-3.5 text-center text-xs text-[#6B7280]">
        Chạm hoặc nhấn vào thẻ để lật xem điển tích, lễ nghi và nguồn trích dẫn lịch sử
      </p>
    </section>
  );
}
