/**
 * components/common/SiteFooter.tsx
 * ==================================
 * Production-ready footer: nav columns, tagline, AI disclaimer, copyright.
 */

import Link from "next/link";
import { Sparkles, Mail } from "lucide-react";

const FOOTER_COLUMNS = [
  {
    title: "Khám phá",
    links: [
      { href: "/explore", label: "Tất cả trang phục" },
      { href: "/viet-phuc/ao-ngu-than", label: "Áo Ngũ Thân" },
      { href: "/viet-phuc/ao-tac", label: "Áo Tấc" },
      { href: "/viet-phuc/ao-nhat-binh", label: "Áo Nhật Bình" },
      { href: "/viet-phuc/ao-tu-than", label: "Áo Tứ Thân" },
      { href: "/viet-phuc/ao-dai", label: "Áo Dài" },
    ],
  },
  {
    title: "Cẩm nang",
    links: [
      { href: "/cam-nang", label: "Tổng quan" },
      { href: "/cam-nang/cach-mac-ao-ngu-than", label: "Cách mặc Áo Ngũ Thân" },
      { href: "/cam-nang/phu-kien-viet-phuc", label: "Phụ kiện Việt phục" },
      { href: "/cam-nang/mac-gi-di-van-mieu", label: "Mặc gì đi Văn Miếu?" },
      { href: "/cam-nang/pho-co-phuc-hien-dai", label: "Phối cổ phục hiện đại" },
    ],
  },
  {
    title: "Công cụ AI",
    links: [
      { href: "/stylist", label: "AI Stylist" },
      { href: "/lookbook", label: "Lookbook của tôi" },
      { href: "/about", label: "Về Sắc Việt" },
      { href: "/about#methodology", label: "Cultural Methodology" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer
      id="site-footer"
      role="contentinfo"
      className="border-t border-[#E5DECE] bg-[#FAF8F5]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ── Main footer grid ── */}
        <div className="grid grid-cols-2 gap-10 py-16 md:grid-cols-5 lg:py-20">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-2">
            {/* Logo */}
            <Link
              id="footer-logo"
              href="/"
              className="inline-flex items-center gap-2.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9E2A2B]"
              aria-label="Sắc Việt AI Stylist — Trang chủ"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#9E2A2B] to-[#D4AF37] text-[11px] font-black text-white">
                SV
              </span>
              <span className="font-playfair text-lg font-bold text-[#1E3A5F]">
                Sắc Việt
              </span>
              <span className="text-xs font-semibold uppercase tracking-widest text-[#D4AF37]">
                Stylist
              </span>
            </Link>

            {/* Tagline */}
            <p className="mt-4 max-w-[260px] text-sm leading-relaxed text-[#6B7280]">
              Nền tảng khám phá Việt phục + AI Stylist + Cultural Advisor cho thế hệ trẻ Việt Nam.
            </p>

            {/* Core message */}
            <p className="mt-4 text-[11px] font-bold uppercase tracking-[0.2em] text-[#D4AF37]">
              Mặc đẹp · Hiểu đúng · Giữ chất Việt
            </p>

            {/* Contact */}
            <a
              href="mailto:hello@sacviet.ai"
              className="mt-5 inline-flex items-center gap-1.5 text-xs font-medium text-[#4A6A8F] transition-colors hover:text-[#9E2A2B] focus-visible:outline-2 focus-visible:outline-[#D4AF37]"
            >
              <Mail className="h-3.5 w-3.5" aria-hidden="true" />
              hello@sacviet.ai
            </a>
          </div>

          {/* Nav columns */}
          {FOOTER_COLUMNS.map(({ title, links }) => (
            <nav key={title} aria-label={`Điều hướng ${title}`}>
              <h3 className="mb-4 text-[11px] font-bold uppercase tracking-[0.15em] text-[#1E3A5F]">
                {title}
              </h3>
              <ul className="space-y-2.5" role="list">
                {links.map(({ href, label }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="text-sm text-[#6B7280] transition-colors duration-200 hover:text-[#9E2A2B] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4AF37]"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* ── AI Disclaimer ── */}
        <div className="border-t border-[#E5DECE] py-5">
          <p className="text-center text-[11px] italic leading-relaxed text-[#4A6A8F]/80 sm:text-left">
            <strong>Lưu ý AI:</strong> Gợi ý phối đồ và thông tin lịch sử được AI tổng hợp, đã đối chiếu tài liệu văn hóa chuẩn (Viện VHNT Quốc gia, Lê Quý Đôn). AI có thể sai — người dùng nên tham khảo thêm từ chuyên gia văn hóa.
          </p>
        </div>

        {/* ── Bottom bar ── */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-[#E5DECE]/60 py-5 sm:flex-row">
          <p className="text-xs text-[#9CA3AF]">
            © 2026 Sắc Việt AI Stylist · Tham dự cuộc thi <em>Việt Phục Remix 2026</em>. Mọi quyền được bảo lưu.
          </p>
          <div className="flex items-center gap-4 text-xs text-[#9CA3AF]">
            <Link
              href="/about#privacy"
              className="transition-colors hover:text-[#9E2A2B] focus-visible:outline-2 focus-visible:outline-[#D4AF37]"
            >
              Chính sách riêng tư
            </Link>
            <span aria-hidden="true">·</span>
            <Link
              href="/about#methodology"
              className="transition-colors hover:text-[#9E2A2B] focus-visible:outline-2 focus-visible:outline-[#D4AF37]"
            >
              Cultural Methodology
            </Link>
            <span aria-hidden="true">·</span>
            <p className="inline-flex items-center gap-1 font-semibold text-[#D4AF37]">
              <Sparkles className="h-3 w-3" aria-hidden="true" />
              Made with love for Việt Nam
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default SiteFooter;
