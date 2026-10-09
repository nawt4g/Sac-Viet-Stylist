"use client";

/**
 * components/common/SiteHeader.tsx
 * =================================
 * Site-wide header với full navigation, mobile menu và CTA nổi bật.
 * 
 * IA mới:
 *   Khám phá → /explore (+ dropdown: 5 cổ phục)
 *   Cẩm nang → /cam-nang
 *   Lookbook  → /lookbook
 *   Phối đồ AI (CTA) → /stylist
 */

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Wand2, Menu, X, ChevronDown, BookOpen, Bookmark, Compass } from "lucide-react";

/* ── NAV DATA ── */
const EXPLORE_ITEMS = [
  { href: "/explore", label: "Tất cả trang phục" },
  { href: "/viet-phuc/ao-ngu-than", label: "Áo Ngũ Thân" },
  { href: "/viet-phuc/ao-tac", label: "Áo Tấc" },
  { href: "/viet-phuc/ao-nhat-binh", label: "Áo Nhật Bình" },
  { href: "/viet-phuc/ao-tu-than", label: "Áo Tứ Thân" },
  { href: "/viet-phuc/ao-dai", label: "Áo Dài" },
];

const NAV_ITEMS = [
  {
    href: "/explore",
    label: "Khám phá",
    icon: Compass,
    dropdown: EXPLORE_ITEMS,
  },
  {
    href: "/cam-nang",
    label: "Cẩm nang",
    icon: BookOpen,
    dropdown: null,
  },
  {
    href: "/lookbook",
    label: "Lookbook",
    icon: Bookmark,
    dropdown: null,
  },
];

/* ── Dropdown for Explore ── */
function ExploreDropdown({
  items,
  onItemClick,
}: {
  items: typeof EXPLORE_ITEMS;
  onItemClick?: () => void;
}) {
  return (
    <div
      className="absolute left-0 top-full mt-1.5 w-52 origin-top-left overflow-hidden rounded-xl border border-[#E5DECE] bg-white shadow-xl shadow-[#1E3A5F]/08 z-50"
      role="menu"
    >
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          role="menuitem"
          onClick={onItemClick}
          className="flex items-center px-4 py-2.5 text-sm font-medium text-[#4A6A8F] transition-colors duration-150 hover:bg-[#FAF8F5] hover:text-[#9E2A2B] focus-visible:bg-[#FAF8F5] focus-visible:outline-none"
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
}

/* ── Main Component ── */
export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  const pathname = usePathname();

  const closeMenu = useCallback(() => {
    setMobileOpen(false);
    setDropdownOpen(null);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const target = e.target as HTMLElement;
      if (!target.closest("[data-nav-item]")) {
        setDropdownOpen(null);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Prevent body scroll when mobile menu open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  return (
    <>
      <header
        id="site-header"
        className="sticky top-0 z-50 border-b border-[#E5DECE]/70 bg-[#FAF8F5]/92 backdrop-blur-md"
        role="banner"
      >
        <div className="mx-auto flex h-14 sm:h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* ── Logo ── */}
          <Link
            id="nav-logo"
            href="/"
            onClick={closeMenu}
            className="flex items-center gap-2.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9E2A2B]"
            aria-label="Sắc Việt AI Stylist — Trang chủ"
          >
            <span
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#9E2A2B] to-[#D4AF37] text-[11px] font-black tracking-tight text-white shadow-sm"
              aria-hidden="true"
            >
              SV
            </span>
            <span className="font-playfair text-lg font-bold text-[#1E3A5F]">
              Sắc Việt
            </span>
            <span className="hidden text-xs font-semibold text-[#D4AF37] sm:inline tracking-widest uppercase">
              Stylist
            </span>
          </Link>

          {/* ── Desktop Navigation ── */}
          <nav
            id="primary-nav"
            aria-label="Điều hướng chính"
            className="hidden lg:block"
          >
            <ul className="flex items-center gap-1" role="list">
              {NAV_ITEMS.map(({ href, label, icon: Icon, dropdown }) => (
                <li key={href} className="relative" data-nav-item>
                  {dropdown ? (
                    <button
                      type="button"
                      id={`nav-${label.toLowerCase().replace(" ", "-")}`}
                      onClick={() =>
                        setDropdownOpen(dropdownOpen === href ? null : href)
                      }
                      aria-expanded={dropdownOpen === href}
                      aria-haspopup="menu"
                      className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-[#D4AF37] ${
                        isActive(href)
                          ? "bg-[#9E2A2B]/8 text-[#9E2A2B]"
                          : "text-[#4A6A8F] hover:bg-[#FAF8F5] hover:text-[#1E3A5F]"
                      }`}
                    >
                      <Icon className="h-4 w-4" aria-hidden="true" />
                      {label}
                      <ChevronDown
                        className={`h-3.5 w-3.5 transition-transform duration-200 ${
                          dropdownOpen === href ? "rotate-180" : ""
                        }`}
                        aria-hidden="true"
                      />
                    </button>
                  ) : (
                    <Link
                      href={href}
                      id={`nav-${label.toLowerCase().replace(" ", "-")}`}
                      className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-[#D4AF37] ${
                        isActive(href)
                          ? "bg-[#9E2A2B]/8 text-[#9E2A2B]"
                          : "text-[#4A6A8F] hover:bg-[#FAF8F5] hover:text-[#1E3A5F]"
                      }`}
                    >
                      <Icon className="h-4 w-4" aria-hidden="true" />
                      {label}
                    </Link>
                  )}

                  {/* Dropdown */}
                  {dropdown && dropdownOpen === href && (
                    <ExploreDropdown items={dropdown} onItemClick={closeMenu} />
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* ── Right: CTA + Mobile Toggle ── */}
          <div className="flex items-center gap-2">
            {/* Primary CTA */}
            <Link
              id="nav-cta"
              href="/stylist"
              onClick={closeMenu}
              className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-[#9E2A2B] px-4 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-sm transition-all duration-200 hover:bg-[#7D1F20] hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9E2A2B]"
              aria-label="Tạo outfit với AI Stylist"
            >
              <Wand2 className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Tạo outfit</span>
            </Link>

            {/* Mobile toggle */}
            <button
              id="mobile-menu-toggle"
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#E5DECE] text-[#4A6A8F] transition-colors hover:bg-[#FAF8F5] hover:text-[#1E3A5F] focus-visible:outline-2 focus-visible:outline-[#D4AF37] lg:hidden"
              aria-label={mobileOpen ? "Đóng menu" : "Mở menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
            >
              {mobileOpen ? (
                <X className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Menu className="h-5 w-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile Menu Overlay ── */}
      {mobileOpen && (
        <div
          id="mobile-menu"
          className="fixed inset-0 z-40 lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Menu điều hướng"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-[#1E3A5F]/40 backdrop-blur-sm"
            onClick={closeMenu}
            aria-hidden="true"
          />

          {/* Drawer */}
          <div className="absolute right-0 top-0 h-full w-[min(85vw,360px)] overflow-y-auto bg-[#FAF8F5] shadow-2xl">
            {/* Drawer header */}
            <div className="flex items-center justify-between border-b border-[#E5DECE] px-5 py-4">
              <div className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-md bg-gradient-to-br from-[#9E2A2B] to-[#D4AF37] text-[10px] font-black text-white">
                  SV
                </span>
                <span className="font-playfair text-base font-bold text-[#1E3A5F]">
                  Sắc Việt
                </span>
              </div>
              <button
                type="button"
                onClick={closeMenu}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-[#6B7280] hover:bg-[#F3EFE8] focus-visible:outline-2 focus-visible:outline-[#D4AF37]"
                aria-label="Đóng menu"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            {/* Drawer content */}
            <nav
              className="px-4 py-6"
              aria-label="Điều hướng di động"
              onClick={(e) => {
                if ((e.target as HTMLElement).closest("a")) {
                  closeMenu();
                }
              }}
            >
              {/* Primary CTA */}
              <Link
                href="/stylist"
                className="flex min-h-[52px] w-full items-center justify-center gap-2 rounded-xl bg-[#9E2A2B] px-5 py-3.5 text-sm font-bold text-white shadow-sm"
              >
                <Wand2 className="h-4 w-4" aria-hidden="true" />
                Tạo outfit ngay
              </Link>

              {/* Nav sections */}
              <div className="mt-6 space-y-1">
                {NAV_ITEMS.map(({ href, label, icon: Icon, dropdown }) => (
                  <div key={href}>
                    <Link
                      href={href}
                      className={`flex min-h-[48px] items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-colors ${
                        isActive(href)
                          ? "bg-[#9E2A2B]/8 text-[#9E2A2B]"
                          : "text-[#1E3A5F] hover:bg-[#F3EFE8]"
                      }`}
                    >
                      <Icon className="h-5 w-5 shrink-0 text-[#D4AF37]" aria-hidden="true" />
                      {label}
                    </Link>

                    {/* Dropdown items (always show in mobile) */}
                    {dropdown && (
                      <div className="ml-5 mt-1 space-y-0.5 border-l border-[#E5DECE] pl-4">
                        {dropdown.slice(1).map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="flex min-h-[40px] items-center text-sm font-medium text-[#4A6A8F] transition-colors hover:text-[#9E2A2B]"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Bottom links */}
              <div className="mt-8 border-t border-[#E5DECE] pt-6 space-y-1">
                <Link
                  href="/about"
                  className="flex min-h-[44px] items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-[#4A6A8F] transition-colors hover:bg-[#F3EFE8] hover:text-[#1E3A5F]"
                >
                  Về Sắc Việt
                </Link>
                <Link
                  href="/about#methodology"
                  className="flex min-h-[44px] items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-[#4A6A8F] transition-colors hover:bg-[#F3EFE8] hover:text-[#1E3A5F]"
                >
                  Cultural Methodology
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}

export default SiteHeader;
