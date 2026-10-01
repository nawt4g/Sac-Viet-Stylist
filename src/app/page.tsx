/**
 * app/page.tsx — Landing Page "/"
 * =================================
 * SSG (Static Site Generation) — generateStaticParams không cần vì đây là root.
 * Toàn bộ component là Server Components → zero client JS.
 *
 * Semantic structure:
 *   <header>     → Site navigation
 *   <main>
 *     <section>  → Hero (HeroSection)
 *     <section>  → Heritage Grid (HeritageTopicGrid)
 *     <section>  → Process / How it works
 *     <section>  → Trust / Cultural promise
 *   </main>
 *   <footer>     → Links, copyright
 *
 * JSON-LD: Organization + WebApplication schemas nhúng vào <head> qua layout
 */

import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, Wand2, ShieldCheck } from "lucide-react";

import { HeroSection } from "@/components/home/HeroSection";
import { HeritageTopicGrid } from "@/components/home/HeritageTopicGrid";
import { HomePageJsonLd } from "@/components/seo/JsonLd";

/* ── Page-level metadata (overrides root layout template) ── */
export const metadata: Metadata = {
  title: "Sắc Việt AI Stylist — Phối Cổ Phục Việt Đương Đại cho Gen Z",
  description:
    "Khám phá 5 nhóm cổ phục Việt Nam với AI Stylist. Gợi ý phối đồ thông minh, kiểm định văn hóa 3 cấp, tôn vinh di sản cho thế hệ trẻ.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Sắc Việt AI Stylist — Phối Cổ Phục Đương Đại",
    description:
      "AI đầu tiên tư vấn phối cổ phục Việt Nam. 5 nhóm phục trang, 100% kiểm định văn hóa.",
    url: "/",
    images: [{ url: "/hero-editorial.jpg", width: 900, height: 1200 }],
  },
};

/* ── How It Works section data ── */
const HOW_IT_WORKS = [
  {
    id: "step-explore",
    step: "01",
    icon: BookOpen,
    title: "Khám phá Cổ phục",
    description:
      "Duyệt qua 5 nhóm cổ phục Việt Nam — từ Ngũ Thân triều đại đến Áo Dài tân thời. Tìm hiểu lịch sử, triết lý và phong cách.",
    color: "#1E3A5F",
  },
  {
    id: "step-style",
    step: "02",
    icon: Wand2,
    title: "AI Gợi ý Phối đồ",
    description:
      "Mô tả ngữ cảnh của bạn — đi dạo phố, lễ hội, hay chụp ảnh — AI sẽ đề xuất combination hoàn hảo từ cổ phục đến phụ kiện.",
    color: "#9E2A2B",
  },
  {
    id: "step-verify",
    step: "03",
    icon: ShieldCheck,
    title: "Kiểm định Văn hóa",
    description:
      "Mỗi gợi ý đều được kiểm tra tính phù hợp văn hóa — hệ thống 3 màu (Xanh/Vàng/Đỏ) giúp bạn mặc đúng và mặc đẹp.",
    color: "#16A34A",
  },
] as const;

/* ── Site navigation component ── */
function SiteHeader() {
  return (
    <header
      id="site-header"
      className="sticky top-0 z-50 border-b border-[#E5DECE]/60 bg-[#FAF8F5]/90 backdrop-blur-md"
      role="banner"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo / Wordmark */}
        <Link
          id="nav-logo"
          href="/"
          className="flex items-center gap-2.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9E2A2B]"
          aria-label="Sắc Việt AI Stylist — Trang chủ"
        >
          {/* Gold diamond logo mark */}
          <span
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#9E2A2B] to-[#D4AF37] text-sm font-bold text-white shadow-sm"
            aria-hidden="true"
          >
            SV
          </span>
          <span className="font-playfair text-lg font-bold text-[#1E3A5F]">
            Sắc Việt
          </span>
          <span className="hidden text-sm font-medium text-[#D4AF37] sm:inline">
            AI Stylist
          </span>
        </Link>

        {/* Primary navigation */}
        <nav
          id="primary-nav"
          aria-label="Điều hướng chính"
          className="hidden md:block"
        >
          <ul className="flex items-center gap-6" role="list">
            {[
              { href: "/co-phuc", label: "Cổ Phục" },
              { href: "/stylist", label: "AI Stylist" },
              { href: "/di-san", label: "Di Sản" },
              { href: "/blog", label: "Blog" },
            ].map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="text-sm font-medium text-[#4A6A8F] transition-colors duration-200 hover:text-[#9E2A2B]"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Header CTA */}
        <Link
          id="nav-cta"
          href="/stylist"
          className="inline-flex items-center gap-1.5 rounded-full bg-[#9E2A2B] px-4 py-2 text-sm font-semibold text-white transition-all duration-200 hover:bg-[#7D2020] hover:shadow-md"
          aria-label="Bắt đầu sử dụng AI Stylist"
        >
          <Wand2 className="h-3.5 w-3.5" aria-hidden="true" />
          Dùng thử AI
        </Link>
      </div>
    </header>
  );
}

/* ── How it works section ── */
function HowItWorks() {
  return (
    <section
      id="how-it-works"
      aria-labelledby="how-it-works-heading"
      className="bg-white py-20 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="mb-14 text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#9E2A2B]">
            Cách Hoạt Động
          </p>
          <h2
            id="how-it-works-heading"
            className="font-playfair text-3xl font-bold text-[#1E3A5F] sm:text-4xl"
          >
            3 Bước Đến Phong Cách Di Sản
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-[#4A6A8F]">
            Đơn giản, thông minh và tôn trọng văn hóa — quy trình được thiết
            kế dành riêng cho thế hệ Gen Z Việt Nam.
          </p>
        </header>

        <ol
          className="grid grid-cols-1 gap-8 md:grid-cols-3"
          aria-label="Các bước sử dụng Sắc Việt AI Stylist"
        >
          {HOW_IT_WORKS.map((step, index) => {
            const Icon = step.icon;
            return (
              <li
                key={step.id}
                id={step.id}
                className="relative flex flex-col items-start gap-4 rounded-2xl border border-[#E5DECE] bg-[#FAF8F5] p-7 transition-shadow duration-300 hover:shadow-xl"
              >
                {/* Connector arrow between steps */}
                {index < HOW_IT_WORKS.length - 1 && (
                  <div
                    className="absolute -right-4 top-1/2 z-10 hidden -translate-y-1/2 text-[#D4AF37] md:block"
                    aria-hidden="true"
                  >
                    <ArrowRight className="h-5 w-5" />
                  </div>
                )}

                {/* Step number */}
                <span
                  className="font-playfair text-5xl font-bold opacity-10"
                  style={{ color: step.color }}
                  aria-hidden="true"
                >
                  {step.step}
                </span>

                {/* Icon */}
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-xl"
                  style={{ backgroundColor: `${step.color}15` }}
                  aria-hidden="true"
                >
                  <Icon
                    className="h-6 w-6"
                    style={{ color: step.color }}
                    strokeWidth={1.8}
                  />
                </div>

                <div>
                  <h3 className="font-playfair text-xl font-bold text-[#1E3A5F]">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#4A6A8F]">
                    {step.description}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

/* ── Cultural Promise / Trust section ── */
function CulturalPromise() {
  return (
    <section
      id="cultural-promise"
      aria-labelledby="promise-heading"
      className="relative overflow-hidden bg-[#1E3A5F] py-20 lg:py-24"
    >
      {/* Subtle pattern overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-5"
        aria-hidden="true"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, #D4AF37 1px, transparent 0)`,
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-[#D4AF37]">
          Cam Kết Văn Hóa
        </p>
        <h2
          id="promise-heading"
          className="font-playfair text-3xl font-bold text-white sm:text-4xl lg:text-[2.5rem]"
        >
          Không chỉ là thời trang —<br />
          <span className="text-[#D4AF37]">Đó là danh dự của di sản.</span>
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-[#94A3B8]">
          Sắc Việt AI Stylist xây dựng hệ thống Cultural Guardrail để đảm bảo
          mỗi gợi ý phối đồ đều tôn trọng chiều sâu lịch sử. Chúng tôi tin rằng
          mặc đẹp và mặc đúng văn hóa có thể song hành.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            id="promise-cta"
            href="/stylist"
            className="inline-flex items-center gap-2 rounded-full bg-[#D4AF37] px-8 py-3.5 text-sm font-bold text-[#1E3A5F] transition-all duration-300 hover:bg-[#E8CC6E] hover:shadow-lg hover:shadow-[#D4AF37]/30"
            aria-label="Trải nghiệm AI Stylist ngay"
          >
            Trải nghiệm ngay
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link
            id="promise-learn"
            href="/di-san"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 px-8 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:border-white/40 hover:bg-white/10"
          >
            Tìm hiểu Di sản
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ── Site Footer ── */
function SiteFooter() {
  return (
    <footer
      id="site-footer"
      role="contentinfo"
      className="border-t border-[#E5DECE] bg-[#FAF8F5] py-12"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link
              id="footer-logo"
              href="/"
              className="inline-flex items-center gap-2"
              aria-label="Sắc Việt — Trang chủ"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-md bg-gradient-to-br from-[#9E2A2B] to-[#D4AF37] text-xs font-bold text-white">
                SV
              </span>
              <span className="font-playfair text-base font-bold text-[#1E3A5F]">
                Sắc Việt
              </span>
            </Link>
            <p className="mt-3 text-xs leading-relaxed text-[#6B7280]">
              Nền tảng AI tôn vinh cổ phục Việt Nam — nơi di sản gặp gỡ đương đại.
            </p>
          </div>

          {/* Nav columns */}
          {[
            {
              title: "Khám phá",
              links: [
                { href: "/co-phuc", label: "Danh mục Cổ phục" },
                { href: "/stylist", label: "AI Stylist" },
                { href: "/di-san", label: "Di Sản" },
              ],
            },
            {
              title: "Tìm hiểu",
              links: [
                { href: "/blog", label: "Blog" },
                { href: "/huong-dan", label: "Hướng dẫn" },
                { href: "/ve-chung-toi", label: "Về chúng tôi" },
              ],
            },
            {
              title: "Pháp lý",
              links: [
                { href: "/chinh-sach", label: "Chính sách" },
                { href: "/dieu-khoan", label: "Điều khoản" },
              ],
            },
          ].map(({ title, links }) => (
            <nav key={title} aria-label={`Điều hướng ${title}`}>
              <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-[#1E3A5F]">
                {title}
              </h3>
              <ul className="space-y-2" role="list">
                {links.map(({ href, label }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="text-sm text-[#6B7280] transition-colors hover:text-[#9E2A2B]"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Copyright */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-[#E5DECE] pt-6 sm:flex-row">
          <p className="text-xs text-[#6B7280]">
            © 2026 Sắc Việt AI Stylist. Mọi quyền được bảo lưu.
          </p>
          <p className="text-xs text-[#D4AF37]">
            ✦ Được tạo với tình yêu dành cho Di sản Việt Nam
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ── ROOT PAGE COMPONENT ── */
export default function HomePage() {
  return (
    <>
      {/* JSON-LD structured data — injected into document head via React */}
      <HomePageJsonLd />

      {/* Site header — sticky navigation */}
      <SiteHeader />

      {/* Main content */}
      <main id="main-content" role="main">
        {/* Hero section — LCP target element */}
        <HeroSection />

        {/* Heritage costume grid */}
        <HeritageTopicGrid />

        {/* How it works — process flow */}
        <HowItWorks />

        {/* Cultural promise / CTA section */}
        <CulturalPromise />
      </main>

      {/* Site footer */}
      <SiteFooter />
    </>
  );
}
