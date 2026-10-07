import type { Metadata } from "next";
import { Playfair_Display, Be_Vietnam_Pro } from "next/font/google";
import { SiteHeader } from "@/components/common/SiteHeader";
import { SiteFooter } from "@/components/common/SiteFooter";
import "./globals.css";

/* ============================================================
   FONT SETUP — next/font/google (CSS variable pattern)
   Using CSS variable method so fonts work with Tailwind v4
   ============================================================ */

const playfairDisplay = Playfair_Display({
  subsets: ["latin", "vietnamese"],
  display: "swap",
  variable: "--font-playfair",
  // Playfair Display is a variable font — weight range supported
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  display: "swap",
  variable: "--font-be-vietnam",
  weight: ["300", "400", "500", "600", "700", "800"],
});

/* ============================================================
   GLOBAL METADATA — SEO & OpenGraph
   ============================================================ */

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://sacviet.ai"
  ),

  title: {
    template: "%s | Sắc Việt AI Stylist",
    default: "Sắc Việt AI Stylist — Phối Cổ Phục Việt Đương Đại cho Gen Z",
  },

  description:
    "Nền tảng AI tư vấn phối cổ phục Việt Nam đương đại. Khám phá vẻ đẹp của Áo Ngũ Thân, Áo Tấc và di sản văn hóa Việt qua lăng kính thời trang hiện đại dành cho thế hệ Gen Z.",

  keywords: [
    "cổ phục Việt Nam",
    "áo ngũ thân",
    "áo tấc",
    "thời trang truyền thống",
    "AI stylist",
    "Gen Z",
    "di sản văn hóa Việt",
    "phối đồ cổ phục",
  ],

  authors: [{ name: "Sắc Việt AI Stylist" }],

  creator: "Sắc Việt AI Stylist",

  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: "/",
    siteName: "Sắc Việt AI Stylist",
    title: "Sắc Việt AI Stylist — Phối Cổ Phục Việt Đương Đại",
    description:
      "Khám phá vẻ đẹp của cổ phục Việt qua AI. Phối đồ thông minh, tôn vinh di sản văn hóa.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Sắc Việt AI Stylist — Nền tảng phối cổ phục Việt đương đại",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Sắc Việt AI Stylist",
    description:
      "Nền tảng AI tư vấn phối cổ phục Việt Nam đương đại cho Gen Z.",
    images: ["/og-image.png"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },

  alternates: {
    canonical: "/",
  },

  icons: {
    icon: "/favicon.ico",
  },
};

/* ============================================================
   ROOT LAYOUT
   ============================================================ */

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="vi"
      className={`${playfairDisplay.variable} ${beVietnamPro.variable} h-full antialiased`}
    >
      {/*
        Semantic HTML structure:
        - lang="vi" for Vietnamese content (SEO + accessibility)
        - Font CSS variables injected on <html> for Tailwind v4 @theme access
        - body: background #FAF8F5, text #1E3A5F (defined in globals.css base layer)
      */}
      <body className="min-h-full flex flex-col bg-paper text-ink bg-[#FAF8F5] text-[#1E3A5F]">
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
