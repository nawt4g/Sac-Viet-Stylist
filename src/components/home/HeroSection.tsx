"use client";

/**
 * components/home/HeroSection.tsx
 * ================================
 * Editorial Fashion Hero — Phong cách Tạp chí Thời trang Di sản (Neo-Heritage Editorial).
 *
 * Design System:
 *   - Layout: Asymmetric magazine spread with typography on the left, visual showcase on the right
 *   - Typography: Font Playfair Display serif headers, italic accents, Be Vietnam Pro body
 *   - Visual: /hero-editorial.png with gold double-frame editorial borders
 *   - CTA: Prominent, high-contrast button leading directly to /stylist
 *   - Motion: Framer Motion mask reveal & cinematic fade, fully respecting prefers-reduced-motion
 *   - Zero CLS: Fixed aspect ratios and next/image priority
 */

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, type Transition, type TargetAndTransition } from "framer-motion";
import { ArrowUpRight, Compass, ShieldCheck, Palette, Sparkles } from "lucide-react";
import { ImageSlot } from "@/components/common/ImageSlot";
import { getPatternImage } from "@/lib/images";

/* ── Editorial ticker items ── */
const TICKER_ITEMS = [
  { index: "01", label: "5 Nhóm Cổ Phục Lịch Sử", icon: Palette },
  { index: "02", label: "Màng Lọc Chuẩn Mực Văn Hóa", icon: ShieldCheck },
  { index: "03", label: "Phối Đồ Đương Đại Cho Gen Z", icon: Compass },
] as const;

/* ── Animation ease curves ── */
const EASE_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function HeroSection() {
  const shouldReduceMotion = useReducedMotion();

  // Motion variants with reduced-motion fallback
  const maskRevealVariants = {
    hidden: { y: shouldReduceMotion ? 0 : "105%", opacity: shouldReduceMotion ? 1 : 0 },
    visible: (i: number): TargetAndTransition => ({
      y: 0,
      opacity: 1,
      transition: shouldReduceMotion
        ? { duration: 0 }
        : ({
            duration: 0.9,
            delay: i * 0.12,
            ease: EASE_EXPO,
          } satisfies Transition),
    }),
  };

  const fadeUpVariants = {
    hidden: { y: shouldReduceMotion ? 0 : 20, opacity: shouldReduceMotion ? 1 : 0 },
    visible: (i: number): TargetAndTransition => ({
      y: 0,
      opacity: 1,
      transition: shouldReduceMotion
        ? { duration: 0 }
        : ({
            duration: 0.7,
            delay: i * 0.1,
            ease: EASE_EXPO,
          } satisfies Transition),
    }),
  };

  const imageVariants = {
    hidden: { scale: shouldReduceMotion ? 1 : 1.06, opacity: shouldReduceMotion ? 1 : 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: shouldReduceMotion ? { duration: 0 } : { duration: 1.1, ease: EASE_EXPO },
    },
  };

  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="paper-bg relative min-h-[92vh] overflow-hidden bg-[#FAF8F5]"
    >
      {/* Decorative top gold hairline */}
      <div className="gold-rule" aria-hidden="true" />

      {/* Decorative background watermark patterns */}
      <div className="pointer-events-none absolute -top-16 -right-16 h-72 w-72 opacity-[0.06] mix-blend-multiply" aria-hidden="true">
        <ImageSlot
          src={getPatternImage("hoa-sen").src}
          alt="Họa tiết hoa sen nền"
          available={getPatternImage("hoa-sen").available}
          aspectRatio="1/1"
          className="h-full w-full object-contain"
        />
      </div>
      <div className="pointer-events-none absolute -bottom-20 -left-20 h-80 w-80 opacity-[0.05] mix-blend-multiply" aria-hidden="true">
        <ImageSlot
          src={getPatternImage("may-song").src}
          alt="Họa tiết mây sóng nền"
          available={getPatternImage("may-song").available}
          aspectRatio="1/1"
          className="h-full w-full object-contain"
        />
      </div>

      {/* ── Asymmetric editorial magazine grid ── */}
      <div className="mx-auto grid min-h-[calc(92vh-1px)] max-w-7xl grid-cols-1 items-center gap-10 px-4 py-8 sm:px-6 md:py-12 lg:grid-cols-12 lg:gap-12 lg:px-8">

        {/* ══════════════════════════════════════════
            LEFT COLUMN (col-span-7) — Typography & Primary CTA
        ═══════════════════════════════════════════ */}
        <div className="flex flex-col justify-center lg:col-span-7">

          {/* Issue Header / Edition stamp */}
          <motion.div
            custom={0}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="mb-6 flex flex-wrap items-center gap-3 border-b border-[#E5DECE] pb-4"
          >
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#9E2A2B]/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#9E2A2B]">
              <Sparkles className="h-3 w-3 text-[#D4AF37]" />
              Cuộc thi Việt Phục Remix 2026
            </span>
            <span className="hidden text-xs text-[#E5DECE] sm:inline">|</span>
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#4A6A8F]">
              Ấn Bản Kỹ Thuật Số · Vol. 01
            </p>
          </motion.div>

          {/* Heading with mask reveals */}
          <div className="space-y-1">
            <div className="overflow-hidden">
              <motion.span
                custom={1}
                variants={maskRevealVariants}
                initial="hidden"
                animate="visible"
                className="block font-playfair text-4xl font-normal leading-[1.1] tracking-tight text-[#1E3A5F] sm:text-6xl lg:text-6xl xl:text-7xl"
              >
                Giao&thinsp;hòa
              </motion.span>
            </div>

            <div className="overflow-hidden">
              <motion.span
                custom={2}
                variants={maskRevealVariants}
                initial="hidden"
                animate="visible"
                className="block font-playfair text-4xl font-light italic leading-[1.1] tracking-tight text-[#9E2A2B] sm:text-6xl lg:text-6xl xl:text-7xl"
              >
                nét&thinsp;xưa di&thinsp;sản
              </motion.span>
            </div>

            <div className="overflow-hidden">
              <motion.span
                custom={3}
                variants={maskRevealVariants}
                initial="hidden"
                animate="visible"
                className="block font-playfair text-4xl font-bold leading-[1.1] tracking-tight text-[#1E3A5F] sm:text-6xl lg:text-6xl xl:text-7xl"
              >
                Tự&thinsp;tin phong&thinsp;cách&thinsp;mới
              </motion.span>
            </div>
          </div>

          {/* Subtitle / Editorial description */}
          <motion.p
            custom={4}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="mt-6 max-w-xl text-base leading-relaxed text-[#4A6A8F] sm:text-lg"
          >
            Nền tảng AI tư vấn phối cổ phục Việt Nam đầu tiên dành cho học sinh, sinh viên và thế hệ trẻ. Khám phá 5 nhóm cổ phục lịch sử, phối cùng phong cách đương đại chuẩn mực và đầy cảm hứng.
          </motion.p>

          {/* Primary CTA cluster */}
          <motion.div
            custom={5}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            {/* Main CTA to /stylist */}
            <Link
              id="hero-cta-stylist"
              href="/stylist"
              aria-label="Bắt đầu phối cổ phục ngay cùng AI Stylist"
              className="group relative inline-flex min-h-[48px] items-center gap-3 overflow-hidden rounded-full bg-[#9E2A2B] px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#9E2A2B]/25 transition-all duration-300 hover:bg-[#7D1F20] hover:shadow-xl hover:shadow-[#9E2A2B]/35 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9E2A2B]"
            >
              <span>Phối Đồ Ngay Cùng AI</span>
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>

            {/* Secondary Link to catalog */}
            <Link
              id="hero-cta-explore"
              href="#heritage-grid"
              aria-label="Khám phá 5 loại cổ phục Việt Nam"
              className="inline-flex min-h-[48px] items-center gap-2 rounded-full border border-[#D4AF37] bg-white/70 px-6 py-3.5 text-sm font-semibold text-[#1E3A5F] backdrop-blur-xs transition-all duration-200 hover:border-[#1E3A5F] hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4AF37]"
            >
              <span>Khám Phá 5 Cổ Phục</span>
            </Link>
          </motion.div>

          {/* Editorial Ticker */}
          <motion.div
            custom={6}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="mt-10 border-t border-[#E5DECE] pt-5"
          >
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {TICKER_ITEMS.map(({ index, label, icon: Icon }) => (
                <div key={index} className="flex items-center gap-2.5">
                  <span className="font-mono text-[10px] font-bold text-[#D4AF37]">
                    [{index}]
                  </span>
                  <div className="flex items-center gap-1.5">
                    <Icon className="h-3.5 w-3.5 text-[#1E3A5F]/70" />
                    <span className="text-xs font-medium text-[#1E3A5F]/80">
                      {label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ══════════════════════════════════════════
            RIGHT COLUMN (col-span-5) — Magazine Cover Showcase
        ═══════════════════════════════════════════ */}
        <div className="relative mx-auto w-full max-w-md lg:col-span-5 lg:max-w-none">
          {/* Magazine frame container */}
          <motion.div
            variants={imageVariants}
            initial="hidden"
            animate="visible"
            className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl border-2 border-[#D4AF37]/40 shadow-2xl shadow-[#1E3A5F]/15"
          >
            <Image
              src="/hero-editorial.png"
              alt="Thiếu nữ Việt Nam mặc trang phục cổ phục thanh lịch trong không gian di sản Neo-Heritage đương đại"
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 42vw"
              priority
              quality={90}
              className="object-cover object-top transition-transform duration-700 hover:scale-105"
            />

            {/* Gradient wash overlay for readability */}
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1E3A5F]/80 via-transparent to-black/20"
              aria-hidden="true"
            />

            {/* Decorative gold hairline inner frame */}
            <div
              className="pointer-events-none absolute inset-3 border border-[#D4AF37]/40 rounded-xl"
              aria-hidden="true"
            />

            {/* Decorative Medallion pattern emblem */}
            <div
              className="pointer-events-none absolute top-4 right-4 z-20 h-10 w-10 opacity-75 drop-shadow-sm"
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

            {/* Editorial overlay badge */}
            <div className="absolute bottom-6 left-6 right-6">
              <span className="inline-block rounded-md bg-[#9E2A2B] px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-white shadow-sm">
                Sắc Việt Editorial
              </span>
              <p className="font-playfair mt-2 text-xl font-bold text-white drop-shadow-md">
                Áo Ngũ Thân & Áo Tấc
              </p>
              <p className="text-xs text-white/90">
                Tái hiện vẻ đẹp chuẩn mực y phục Việt Nam thế kỷ 19
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
