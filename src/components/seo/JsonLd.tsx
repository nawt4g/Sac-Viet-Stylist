/**
 * components/seo/JsonLd.tsx
 * =========================
 * Server Component — nhúng JSON-LD Schema vào <head> để tối ưu Google Rich Snippets.
 * Hỗ trợ các schema types: Organization, WebApplication, và ItemList (5 Cổ phục Việt Nam).
 * Không có client-side JS overhead — pure static HTML injection.
 */

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://sacviet.ai";

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
      url: `${BASE_URL}/hero-editorial.png`,
      width: 600,
      height: 600,
    },
    description:
      "Nền tảng AI tư vấn phối cổ phục Việt Nam đương đại cho học sinh, sinh viên và thế hệ trẻ. Khám phá 5 nhóm cổ phục lịch sử và di sản văn hóa Việt qua lăng kính thời trang hiện đại.",
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
      "Áo Ngũ Thân Tay Chẽn",
      "Áo Tấc",
      "Áo Nhật Bình",
      "Áo Tứ Thân",
      "Áo Dài Tân Thời",
      "Cổ phục Việt Nam",
      "Cuộc thi Việt Phục Remix",
      "Thời trang di sản đương đại",
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
      "Ứng dụng AI tư vấn phối cổ phục Việt Nam đương đại — Kiểm định văn hóa 3 cấp (Xanh/Vàng/Đỏ), gợi ý phối đồ theo 6 ngữ cảnh và khám phá di sản cho Gen Z.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "VND",
    },
    featureList: [
      "Gợi ý phối cổ phục cá nhân hóa bằng AI",
      "Màng lọc kiểm định văn hóa 3 cấp độ (Xanh/Vàng/Đỏ)",
      "Thư viện số hóa 5 nhóm cổ phục Việt Nam (Ngũ Thân, Áo Tấc, Nhật Bình, Tứ Thân, Áo Dài)",
      "Bộ sưu tập Lookbook theo 6 ngữ cảnh (Văn Miếu, Kỷ yếu, Dạo phố, Đám cưới, Lễ hội, Chụp ảnh)",
      "Thẻ tri thức di sản (Heritage Cards)",
      "Xuất Lookbook số hóa chất lượng cao",
    ],
    creator: {
      "@type": "Organization",
      "@id": `${BASE_URL}/#organization`,
    },
    inLanguage: "vi",
    audience: {
      "@type": "Audience",
      audienceType: "Học sinh, sinh viên, thế hệ Gen Z yêu thích di sản văn hóa Việt Nam",
    },
  };
}

function buildCostumesItemListSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "5 Nhóm Cổ Phục Việt Nam Chuẩn Mực",
    description: "Danh mục 5 loại trang phục cổ truyền Việt Nam được số hóa và chuẩn hóa trong Sắc Việt Stylist",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Áo Ngũ Thân Tay Chẽn",
        description: "5 vạt chuẩn mực của sĩ phu thời Nguyễn",
        image: `${BASE_URL}/images/flatlay/ao-ngu-than.jpg`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Áo Tấc",
        description: "Áo ngũ thân tay thụng, lễ phục trang trọng thời Nguyễn",
        image: `${BASE_URL}/images/flatlay/ao-tac.jpg`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Áo Nhật Bình",
        description: "Triều phục cổ vuông hoa văn phượng vũ thời Nguyễn",
        image: `${BASE_URL}/images/flatlay/ao-nhat-binh.jpg`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: "Áo Tứ Thân",
        description: "Trang phục truyền thống 4 vạt dân gian Bắc Bộ",
        image: `${BASE_URL}/images/flatlay/ao-tu-than.jpg`,
      },
      {
        "@type": "ListItem",
        position: 5,
        name: "Áo Dài Tân Thời",
        description: "Quốc phục Việt Nam giao hòa truyền thống và hiện đại",
        image: `${BASE_URL}/images/flatlay/ao-dai.jpg`,
      },
    ],
  };
}

/* ── Components ── */

export function OrganizationJsonLd() {
  return (
    <script
      type="application/ld+json"
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
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(buildWebApplicationSchema()),
      }}
    />
  );
}

export function CostumesJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(buildCostumesItemListSchema()),
      }}
    />
  );
}

/** Composite export — nhúng toàn bộ schema cần thiết */
export function HomePageJsonLd() {
  return (
    <>
      <OrganizationJsonLd />
      <WebApplicationJsonLd />
      <CostumesJsonLd />
    </>
  );
}
