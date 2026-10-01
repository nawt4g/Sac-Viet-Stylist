/**
 * components/seo/JsonLd.tsx
 * =========================
 * Server Component — nhúng JSON-LD Schema vào <head> để tối ưu Google Rich Snippets.
 * Hỗ trợ 2 schema types: Organization và WebApplication.
 * Không có client-side JS overhead — pure static HTML injection.
 */

interface JsonLdProps {
  type: "organization" | "web-application" | "article" | "breadcrumb";
  data?: Record<string, unknown>;
}

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://sacviet.ai";

/* ── Schema generators ── */

function buildOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${BASE_URL}/#organization`,
    name: "Sắc Việt AI Stylist",
    alternateName: "Sắc Việt",
    url: BASE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${BASE_URL}/logo.png`,
      width: 400,
      height: 400,
    },
    description:
      "Nền tảng AI tư vấn phối cổ phục Việt Nam đương đại. Khám phá vẻ đẹp của di sản văn hóa Việt qua lăng kính thời trang hiện đại dành cho Gen Z.",
    foundingDate: "2026",
    foundingLocation: {
      "@type": "Place",
      name: "Hà Nội, Việt Nam",
    },
    areaServed: {
      "@type": "Country",
      name: "Việt Nam",
    },
    knowsAbout: [
      "Áo Ngũ Thân",
      "Áo Tấc",
      "Áo Nhật Bình",
      "Cổ phục Việt Nam",
      "Thời trang truyền thống",
    ],
    sameAs: [
      "https://www.facebook.com/sacviet.ai",
      "https://www.instagram.com/sacviet.ai",
      "https://www.tiktok.com/@sacviet.ai",
    ],
  };
}

function buildWebApplicationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "@id": `${BASE_URL}/#webapp`,
    name: "Sắc Việt AI Stylist",
    url: BASE_URL,
    applicationCategory: "LifestyleApplication",
    applicationSubCategory: "FashionApplication",
    operatingSystem: "Web Browser",
    description:
      "Ứng dụng AI tư vấn phối cổ phục Việt Nam đương đại — Kiểm định văn hóa, gợi ý phối đồ và khám phá di sản cho Gen Z.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "VND",
    },
    featureList: [
      "Gợi ý phối cổ phục cá nhân hóa bằng AI",
      "Kiểm định văn hóa 3 cấp (Xanh/Vàng/Đỏ)",
      "Thư viện 5 nhóm cổ phục Việt Nam",
      "Thẻ tri thức di sản (Heritage Cards)",
      "Tư vấn trang phục theo dịp và ngữ cảnh",
    ],
    creator: {
      "@type": "Organization",
      "@id": `${BASE_URL}/#organization`,
    },
    inLanguage: "vi",
    audience: {
      "@type": "Audience",
      audienceType: "Gen Z, Người trẻ yêu văn hóa Việt",
    },
  };
}

/* ── Component ── */

export function OrganizationJsonLd() {
  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: controlled server-side JSON-LD injection
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(buildOrganizationSchema()),
      }}
    />
  );
}

export function WebApplicationJsonLd() {
  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: controlled server-side JSON-LD injection
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(buildWebApplicationSchema()),
      }}
    />
  );
}

/** Composite export — nhúng cả 2 schema cùng lúc */
export function HomePageJsonLd() {
  return (
    <>
      <OrganizationJsonLd />
      <WebApplicationJsonLd />
    </>
  );
}
