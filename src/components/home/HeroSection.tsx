"use client";
/**
 * components/home/HeroSection.tsx
 * ================================
 * Editorial Fashion Hero — Phong cách Tạp chí Cao cấp (Vogue / L'Officiel).
 *
 * Design System:
 *   - Asymmetric grid: text left 55% / image right 45%
 *   - Typography: Playfair Display serif headers, italic accents
 *   - No pill badges, no SaaS stat cards
 *   - Hairline borders (1px), no rounded-full
 *   - Editorial ticker replacing stat boxes
 *   - Double-frame magazine cover offset effect
 *   - Framer Motion: text mask reveal + cinematic image entrance
 *
 * Performance:
 *   LCP < 1.8s → Image priority + fixed aspect-ratio (CLS = 0)
 */

import Image from "next/image";
import Link from "next/link";
import { motion, type Transition, type TargetAndTransition } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

/* ── Editorial ticker items ── */
const TICKER_ITEMS = [
  { index: "01", label: "5 Nhóm Cổ Phục Lịch Sử" },
  { index: "02", label: "Màng Lọc Quy Chuẩn Cung Đình" },
  { index: "03", label: "Tối Ưu Sắc Tố Da Cá Nhân" },
] as const;

/* ── Shared ease curves ── */
const EASE_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];
const EASE_CIRC: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

/* ── Framer Motion variants ── */
const maskRevealVariants = {
  hidden: { y: "105%", opacity: 0 },
  visible: (i: number): TargetAndTransition => ({
    y: "0%",
    opacity: 1,
    transition: {
      duration: 0.9,
      delay: i * 0.13,
      ease: EASE_EXPO,
    } satisfies Transition,
  }),
};

const imageVariants = {
  hidden:  { scale: 1.08, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 1.3, ease: EASE_CIRC } satisfies Transition,
  },
};

const fadeUpVariants = {
  hidden:  { y: 18, opacity: 0 },
  visible: (i: number): TargetAndTransition => ({
    y: 0,
    opacity: 1,
    transition: { duration: 0.7, delay: i * 0.1, ease: EASE_EXPO } satisfies Transition,
  }),
};

/* ── Text mask reveal line ── */
function RevealLine({
  children,
  index = 0,
  className = "",
}: {
  children: React.ReactNode;
  index?: number;
  className?: string;
}) {
  return (
    <div className={`overflow-hidden ${className}`} aria-hidden="false">
      <motion.div
        custom={index}
        variants={maskRevealVariants}
        initial="hidden"
        animate="visible"
      >
        {children}
      </motion.div>
    </div>
  );
}

/* ── Main Hero ── */
export function HeroSection() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative min-h-screen bg-[#FAF8F5]"
    >
      {/* Subtle grain texture overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        aria-hidden="true"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px",
        }}
      />

      {/* Top hairline — crimson / gold gradient */}
      <div
        className="h-px w-full bg-gradient-to-r from-[#9E2A2B] via-[#D4AF37] to-[#9E2A2B]"
        aria-hidden="true"
      />

      {/* ── Asymmetric editorial grid ── */}
      <div className="mx-auto grid min-h-[calc(100vh-1px)] max-w-[1600px] grid-cols-1 lg:grid-cols-[1fr_auto]">

        {/* ══════════════════════════════════════════
            LEFT COLUMN — Typography & CTA
        ═══════════════════════════════════════════ */}
        <div className="flex flex-col justify-between px-6 py-12 sm:px-10 lg:px-16 lg:py-16 xl:px-20">

          {/* Top row: editorial sub-header + issue info */}
          <motion.div
            custom={0}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap items-center justify-between gap-4 border-b border-[#1E3A5F]/10 pb-6"
          >
            <p className="text-[10px] uppercase tracking-[0.28em] text-[#1E3A5F]/60">
              Vol.&thinsp;01&ensp;—&ensp;Bản Sắc &amp; Đương Đại
            </p>
            <div className="flex items-center gap-5">
              <p className="text-[10px] uppercase tracking-[0.28em] text-[#1E3A5F]/40">
                Hà Nội, 2026
              </p>
              <span className="h-3 w-px bg-[#D4AF37]/40" aria-hidden="true" />
              <p className="text-[10px] uppercase tracking-[0.28em] text-[#1E3A5F]/40">
                Archive &amp; AI CV
              </p>
            </div>
          </motion.div>

          {/* ── Hero H1 ── */}
          <div className="flex flex-1 flex-col justify-center gap-8 py-10 lg:py-0">

            {/* Pre-title ornament */}
            <motion.div
              custom={1}
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              className="flex items-center gap-3"
              aria-hidden="true"
            >
              <div className="h-px w-10 bg-[#D4AF37]" />
              <span className="font-mono text-[9px] uppercase tracking-[0.35em] text-[#D4AF37]">
                Sắc Việt AI Stylist
              </span>
            </motion.div>

            {/* Main heading — mask reveal per line */}
            <h1
              id="hero-heading"
              className="space-y-1"
              aria-label="Giao hòa nét xưa — Tự tin bản lĩnh phong cách mới"
            >
              {/* Line 1: "Giao hòa" */}
              <RevealLine index={0}>
                <span className="block font-playfair text-5xl font-normal leading-[1.05] tracking-tight text-[#1E3A5F] sm:text-6xl lg:text-7xl xl:text-[5.5rem]">
                  Giao&thinsp;hòa
                </span>
              </RevealLine>

              {/* Line 2: "nét xưa" — italic crimson accent */}
              <RevealLine index={1}>
                <span className="block font-playfair text-5xl font-light italic leading-[1.05] tracking-tight text-[#9E2A2B] sm:text-6xl lg:text-7xl xl:text-[5.5rem]">
                  nét&thinsp;xưa
                </span>
              </RevealLine>

              {/* Line 3: "Tự tin bản lĩnh" */}
              <RevealLine index={2}>
                <span className="block font-playfair text-5xl font-bold leading-[1.05] tracking-tight text-[#1E3A5F] sm:text-6xl lg:text-7xl xl:text-[5.5rem]">
                  Tự&thinsp;tin&thinsp;bản&thinsp;lĩnh
                </span>
              </RevealLine>

              {/* Line 4: "phong cách mới" — lighter weight */}
              <RevealLine index={3}>
                <span className="block font-playfair text-5xl font-normal leading-[1.05] tracking-tight text-[#1E3A5F]/50 sm:text-6xl lg:text-7xl xl:text-[5.5rem]">
                  phong&thinsp;cách&thinsp;mới
                </span>
              </RevealLine>
            </h1>

            {/* Description — fade up */}
            <motion.p
              custom={5}
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              className="max-w-sm text-sm leading-[1.9] text-[#4A6A8F]"
            >
              Nền tảng đầu tiên tại Việt Nam phối cổ phục chuẩn văn hóa —
              từ Áo Ngũ Thân đến Áo Tấc —
              {" "}<em className="not-italic font-medium text-[#1E3A5F]">đẹp không cần nỗ lực.</em>
            </motion.p>

            {/* ── Editorial CTA cluster ── */}
            <motion.div
              custom={6}
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-wrap items-center gap-6"
            >
              {/* Primary: rectangle, crimson border, black hover slide */}
              <Link
                id="cta-primary"
                href="/stylist"
                aria-label="Bắt đầu phối trang phục với AI Stylist"
                className="group relative overflow-hidden border border-[#9E2A2B] px-8 py-3.5 text-[11px] uppercase tracking-[0.22em] text-[#9E2A2B] transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#9E2A2B]"
              >
                {/* Sliding fill on hover */}
                <span
                  className="absolute inset-0 -translate-x-full bg-[#9E2A2B] transition-transform duration-300 ease-in-out group-hover:translate-x-0"
                  aria-hidden="true"
                />
                <span className="relative flex items-center gap-2.5 font-semibold group-hover:text-white transition-colors duration-300">
                  Bắt Đầu Phối Đồ
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
              </Link>

              {/* Secondary: text underline, no border */}
              <Link
                id="cta-secondary"
                href="/co-phuc"
                aria-label="Khám phá danh mục cổ phục Việt Nam"
                className="group text-[11px] uppercase tracking-[0.22em] text-[#1E3A5F]/60 underline decoration-[#D4AF37]/50 decoration-[0.5px] underline-offset-[6px] transition-all duration-200 hover:text-[#1E3A5F] hover:decoration-[#D4AF37] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D4AF37]"
              >
                Khám Phá Bộ Sưu Tập
              </Link>
            </motion.div>
          </div>

          {/* ── Editorial Ticker — replaces stat cards ── */}
          <motion.div
            custom={8}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Hairline gold divider */}
            <div className="mb-5 h-px w-full bg-[#D4AF37]/25" aria-hidden="true" />

            <div
              className="flex flex-wrap gap-x-8 gap-y-3"
              role="list"
              aria-label="Tính năng nổi bật"
            >
              {TICKER_ITEMS.map(({ index, label }) => (
                <div
                  key={index}
                  role="listitem"
                  className="flex items-center gap-3"
                >
                  <span
                    className="font-mono text-[9px] text-[#D4AF37]/70"
                    aria-hidden="true"
                  >
                    [{index}]
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.18em] text-[#1E3A5F]/55">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ══════════════════════════════════════════
            RIGHT COLUMN — Magazine Cover Image
        ═══════════════════════════════════════════ */}
        <div
          className="relative flex items-stretch lg:w-[44vw] xl:w-[42vw]"
          style={{ maxWidth: "680px" }}
        >
          {/* Full-bleed image container */}
          <div className="relative w-full overflow-hidden">
            {/* Cinematic entrance animation */}
            <motion.div
              variants={imageVariants}
              initial="hidden"
              animate="visible"
              className="relative h-full w-full"
              style={{ minHeight: "60vh" }}
            >
              <Image
                src="/hero-editorial.jpg"
                alt="Thiếu nữ Việt mặc Áo Ngũ Thân Tay Chẽn navy phối quần âu đen — phong cách Neo-Heritage đương đại"
                fill
                sizes="(max-width: 1024px) 100vw, 44vw"
                className="object-cover object-top"
                priority
                quality={90}
              />

              {/* Subtle darkening gradient bottom */}
              <div
                className="absolute inset-0 bg-gradient-to-t from-[#1E3A5F]/40 via-transparent to-transparent"
                aria-hidden="true"
              />
            </motion.div>

            {/* ── Offset double-frame hairline ── */}
            {/* Outer offset frame — gold, 12px behind */}
            <div
              className="pointer-events-none absolute inset-0 m-5 border border-[#D4AF37]/30"
              aria-hidden="true"
            />
            {/* Inner tight frame — 2px from edge */}
            <div
              className="pointer-events-none absolute inset-0 m-2 border border-[#FAF8F5]/20"
              aria-hidden="true"
            />

            {/* ── Archive label — vertical text, right edge ── */}
            <div
              className="absolute bottom-16 right-3 flex items-center"
              aria-hidden="true"
              style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
            >
              <p className="font-mono text-[8px] uppercase tracking-[0.25em] text-white/40">
                Sắc Việt Archive N°&thinsp;01
              </p>
            </div>

            {/* ── Seal / Triện corner ornament ── */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2, duration: 0.5, ease: "backOut" }}
              className="absolute left-4 top-4"
              aria-hidden="true"
            >
              {/* Octagonal triện seal */}
              <svg width="48" height="48" viewBox="0 0 48 48">
                {/* Gold border */}
                <polygon
                  points="14,2 34,2 46,14 46,34 34,46 14,46 2,34 2,14"
                  fill="none"
                  stroke="#D4AF37"
                  strokeWidth="1"
                  opacity="0.7"
                />
                {/* Inner red fill */}
                <polygon
                  points="16,6 32,6 42,16 42,32 32,42 16,42 6,32 6,16"
                  fill="#9E2A2B"
                  opacity="0.15"
                />
                {/* Center text */}
                <text
                  x="24"
                  y="19"
                  textAnchor="middle"
                  fill="#D4AF37"
                  fontSize="6"
                  fontFamily="serif"
                  letterSpacing="1"
                >
                  SẮC
                </text>
                <text
                  x="24"
                  y="27"
                  textAnchor="middle"
                  fill="#D4AF37"
                  fontSize="6"
                  fontFamily="serif"
                  letterSpacing="1"
                >
                  VIỆT
                </text>
                <text
                  x="24"
                  y="36"
                  textAnchor="middle"
                  fill="#D4AF37"
                  fontSize="5"
                  fontFamily="monospace"
                  opacity="0.7"
                >
                  2026
                </text>
              </svg>
            </motion.div>

            {/* ── Bottom editorial caption strip ── */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.6 }}
              className="absolute bottom-0 left-0 right-0 flex items-end justify-between gap-3 px-5 pb-5"
            >
              <div>
                <p className="font-playfair text-sm font-semibold leading-tight text-white">
                  Áo Ngũ Thân Tay Chẽn
                </p>
                <p className="mt-0.5 text-[10px] uppercase tracking-[0.15em] text-white/60">
                  Nhà Nguyễn · Neo-Heritage Minimal
                </p>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="h-1.5 w-1.5 rounded-full bg-[#16A34A]" aria-hidden="true" />
                <span className="text-[9px] uppercase tracking-[0.15em] text-white/70">
                  Cultural&thinsp;Approved
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom hairline */}
      <div
        className="h-px w-full bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent"
        aria-hidden="true"
      />
    </section>
  );
}
