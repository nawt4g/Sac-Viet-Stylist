/**
 * app/page.tsx — Landing Page "/"
 * =================================
 * SSG (Static Site Generation) — Trang chủ Sắc Việt Stylist.
 *
 * Cấu trúc ngữ nghĩa (Semantic structure):
 *   <header>     → Site Header & Navigation
 *   <main>
 *     <section>  → HeroSection (Editorial magazine style với hero-editorial.png)
 *     <divider>  → .gold-rule
 *     <section>  → HeritageTopicGrid (5 cổ phục chuẩn hóa với ImageSlot & getFlatlay)
 *     <divider>  → .gold-rule
 *     <section>  → LookbookPreview (Dải 6 looks nổi bật scroll ngang)
 *     <divider>  → .gold-rule
 *     <section>  → HowItWorks (Quy trình 3 bước phối đồ với AI)
 *     <section>  → CulturalPromise (Cam kết chuẩn mực văn hóa)
 *   </main>
 *   <footer>     → Links, Copyright & AI Disclaimer
 */

import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Wand2,
  ShieldCheck,
  Sparkles,
  Compass,
} from "lucide-react";

import { HeroSection } from "@/components/home/HeroSection";
import { HeritageTopicGrid } from "@/components/home/HeritageTopicGrid";
import { LookbookPreview } from "@/components/home/LookbookPreview";
import { HomePageJsonLd } from "@/components/seo/JsonLd";

/* ── Page-level metadata ── */
export const metadata: Metadata = {
  title: "Sắc Việt AI Stylist — Phối Cổ Phục Việt Đương Đại cho Gen Z",
  description:
    "Khám phá 5 nhóm cổ phục Việt Nam cùng AI Stylist. Gợi ý phối đồ thông minh theo 6 ngữ cảnh, kiểm định văn hóa 3 cấp độ, tôn vinh di sản cho thế hệ trẻ.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Sắc Việt AI Stylist — Phối Cổ Phục Đương Đại cho Gen Z",
    description:
      "Nền tảng AI đầu tiên tư vấn phối cổ phục Việt Nam: Áo Ngũ Thân, Áo Tấc, Nhật Bình, Tứ Thân, Áo Dài. 100% kiểm định chuẩn mực văn hóa.",
    url: "/",
    images: [{ url: "/hero-editorial.png", width: 1200, height: 630 }],
  },
};

/* ── How It Works section data ── */
const HOW_IT_WORKS = [
  {
    id: "step-explore",
    step: "01",
    icon: BookOpen,
    title: "Khám phá 5 Cổ phục",
    description:
      "Duyệt qua 5 nhóm cổ phục Việt Nam chuẩn mực — từ Ngũ Thân, Áo Tấc, Nhật Bình đến Tứ Thân và Áo Dài tân thời. Tìm hiểu lịch sử và ý nghĩa sâu sắc.",
    color: "#1E3A5F",
  },
  {
    id: "step-style",
    step: "02",
    icon: Wand2,
    title: "AI Phối đồ theo Ngữ cảnh",
    description:
      "Lựa chọn sắc tố da cá nhân và ngữ cảnh của bạn (Văn Miếu, Kỷ yếu, Dạo phố, Đám cưới...). AI đề xuất phối hợp hoàn hảo giữa cổ phục và phụ kiện hiện đại.",
    color: "#9E2A2B",
  },
  {
    id: "step-verify",
    step: "03",
    icon: ShieldCheck,
    title: "Màng lọc Chuẩn mực Văn hóa",
    description:
      "Mỗi phối set đều được kiểm tra tính phù hợp di sản — hệ thống 3 màu (Xanh/Vàng/Đỏ) hỗ trợ 1-Click Fix giúp bạn tự tin mặc đúng và mặc đẹp.",
    color: "#16A34A",
  },
] as const;

/* ── Site navigation component ── */
function SiteHeader() {
  return (
    <header
      id="site-header"
      className="sticky top-0 z-50 border-b border-[#E5DECE]/70 bg-[#FAF8F5]/90 backdrop-blur-md"
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
          <span className="hidden text-xs font-semibold text-[#D4AF37] sm:inline">
            Stylist
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
              { href: "#heritage-grid", label: "5 Cổ Phục" },
              { href: "#lookbook-preview", label: "Lookbook" },
              { href: "#how-it-works", label: "Cách Hoạt Động" },
              { href: "/stylist", label: "AI Studio" },
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
          className="inline-flex items-center gap-1.5 rounded-full bg-[#9E2A2B] px-4 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-sm transition-all duration-200 hover:bg-[#7D1F20] hover:shadow-md"
          aria-label="Bắt đầu sử dụng AI Stylist"
        >
          <Wand2 className="h-3.5 w-3.5" aria-hidden="true" />
          <span>Thử Ngay</span>
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
          <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-[#FAF8F5] px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-[#9E2A2B] border border-[#E5DECE]">
            <Compass className="h-3.5 w-3.5 text-[#D4AF37]" />
            Quy Trình Sáng Tạo
          </div>
          <h2
            id="how-it-works-heading"
            className="font-playfair text-3xl font-bold text-[#1E3A5F] sm:text-4xl"
          >
            3 Bước Đến Phong Cách Di Sản
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-[#4A6A8F]">
            Đơn giản, thông minh và tôn trọng văn hóa — quy trình được thiết kế dành riêng cho thế hệ Gen Z Việt Nam.
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
                {/* Connector arrow between steps on desktop */}
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
          mặc đẹp và mặc đúng văn hóa hoàn toàn có thể song hành.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            id="promise-cta"
            href="/stylist"
            className="inline-flex items-center gap-2 rounded-full bg-[#D4AF37] px-8 py-3.5 text-sm font-bold text-[#1E3A5F] transition-all duration-300 hover:bg-[#E8CC6E] hover:shadow-lg hover:shadow-[#D4AF37]/30"
            aria-label="Trải nghiệm AI Stylist ngay"
          >
            <span>Trải nghiệm ngay</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link
            id="promise-learn"
            href="#heritage-grid"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 px-8 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:border-white/40 hover:bg-white/10"
          >
            <span>Tìm hiểu 5 Cổ phục</span>
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
              Nền tảng AI tư vấn phối cổ phục Việt Nam đương đại — Nơi di sản ngàn năm giao hòa cùng phong cách trẻ.
            </p>
          </div>

          {/* Nav columns */}
          {[
            {
              title: "Khám phá",
              links: [
                { href: "#heritage-grid", label: "5 Nhóm Cổ Phục" },
                { href: "#lookbook-preview", label: "Bộ Sưu Tập Lookbook" },
                { href: "/stylist", label: "Studio Phối Đồ AI" },
              ],
            },
            {
              title: "Tài liệu",
              links: [
                { href: "#how-it-works", label: "Hướng dẫn sử dụng" },
                { href: "#cultural-promise", label: "Chuẩn mực văn hóa" },
                { href: "/stylist", label: "Trắc nghiệm tông da" },
              ],
            },
            {
              title: "Cuộc thi",
              links: [
                { href: "/", label: "Việt Phục Remix 2026" },
                { href: "/stylist", label: "Tạo bài thi Lookbook" },
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

        {/* ── AI Cultural Disclaimer Credit (bắt buộc) ── */}
        <div className="mt-10 border-t border-[#E5DECE] pt-6">
          <p className="text-center text-xs italic text-[#4A6A8F]/90 sm:text-left">
            Ảnh minh họa do AI tạo (Google Gemini), đã đối chiếu tài liệu văn hóa.
          </p>
        </div>

        {/* Copyright & Sign-off */}
        <div className="mt-4 flex flex-col items-center justify-between gap-4 border-t border-[#E5DECE]/60 pt-4 sm:flex-row">
          <p className="text-xs text-[#6B7280]">
            © 2026 Sắc Việt AI Stylist · Dự án tham dự cuộc thi &quot;Việt phục Remix&quot;. Mọi quyền được bảo lưu.
          </p>
          <p className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#D4AF37]">
            <Sparkles className="h-3.5 w-3.5" />
            Được tạo với tình yêu dành cho Di sản Việt Nam
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
      {/* JSON-LD structured data */}
      <HomePageJsonLd />

      {/* Site header */}
      <SiteHeader />

      {/* Main content */}
      <main id="main-content" role="main">
        {/* ① Hero section — phong cách editorial tạp chí với hero-editorial.png */}
        <HeroSection />

        {/* Section divider */}
        <div className="gold-rule" aria-hidden="true" />

        {/* ② Lưới 5 cổ phục chuẩn hóa kết hợp ImageSlot & getFlatlay */}
        <HeritageTopicGrid />

        {/* Section divider */}
        <div className="gold-rule" aria-hidden="true" />

        {/* ③ Lookbook Preview Section — 6 looks nổi bật scroll ngang */}
        <LookbookPreview />

        {/* Section divider */}
        <div className="gold-rule" aria-hidden="true" />

        {/* ④ How it works — quy trình 3 bước */}
        <HowItWorks />

        {/* ⑤ Cultural promise — cam kết văn hóa */}
        <CulturalPromise />
      </main>

      {/* Site footer with AI disclaimer credit */}
      <SiteFooter />
    </>
  );
}
