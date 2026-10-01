/**
 * components/home/HeritageTopicGrid.tsx
 * ======================================
 * Server Component — Grid 5 nhóm cổ phục Việt Nam.
 *
 * CLS = 0: mỗi card có aspect-ratio cố định.
 * Hover effects: CSS-only transitions (không cần JS/Framer Motion).
 * Internal links: href="/co-phuc/[slug]" để hỗ trợ cấu trúc URL chuẩn SEO.
 */

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

/* ── Heritage costume data ── */
interface HeritageCostume {
  id: string;
  slug: string;
  name: string;
  nameEn: string;
  dynasty: string;
  dynastyEn: string;
  period: string;
  philosophy: string;
  colorHint: string; // accent color for the card
  suitableFor: string[];
  featured?: boolean;
}

const HERITAGE_COSTUMES: HeritageCostume[] = [
  {
    id: "ngu-than",
    slug: "ao-ngu-than-tay-chen",
    name: "Áo Ngũ Thân Tay Chẽn",
    nameEn: "Five-Panel Narrow-Sleeve Tunic",
    dynasty: "Nhà Nguyễn",
    dynastyEn: "Nguyễn Dynasty",
    period: "1802 – 1945",
    philosophy:
      "5 vạt tượng trưng Ngũ Luân — nền tảng đạo đức Nho giáo Việt. Tay chẽn (hẹp) thể hiện sự tinh tế và kỷ cương.",
    colorHint: "#1E3A5F",
    suitableFor: ["Đường phố", "Lễ hội", "Chụp ảnh"],
    featured: true,
  },
  {
    id: "ao-tac",
    slug: "ao-tac",
    name: "Áo Tấc",
    nameEn: "Short Heritage Tunic",
    dynasty: "Nhà Nguyễn · Dân gian",
    dynastyEn: "Nguyễn · Folk",
    period: "Thế kỷ 18–20",
    philosophy:
      "Phiên bản ngắn hơn của Ngũ Thân, gần gũi với đời sống dân gian. Linh hoạt, phóng khoáng — biểu tượng của tầng lớp bình dân.",
    colorHint: "#4A7856",
    suitableFor: ["Hàng ngày", "Festival", "Đời thường"],
  },
  {
    id: "nhat-binh",
    slug: "ao-nhat-binh",
    name: "Áo Nhật Bình",
    nameEn: "Square-Collar Court Robe",
    dynasty: "Nhà Nguyễn",
    dynastyEn: "Nguyễn Dynasty",
    period: "1802 – 1945",
    philosophy:
      "Áo triều phục nữ giới — cổ vuông (nhật bình) thêu phượng, long và hoa văn hoàng gia. Biểu tượng của phẩm giá và địa vị.",
    colorHint: "#9E2A2B",
    suitableFor: ["Lễ cưới", "Nghi lễ", "Sự kiện"],
  },
  {
    id: "tu-than",
    slug: "ao-tu-than",
    name: "Áo Tứ Thân",
    nameEn: "Four-Panel Traditional Dress",
    dynasty: "Nhà Lê · Bắc Bộ",
    dynastyEn: "Lê Dynasty · Northern",
    period: "Thế kỷ 15–19",
    philosophy:
      "Trang phục dân gian Bắc Bộ — 4 vạt với dải lụa buộc chéo. Gắn liền với hình ảnh người phụ nữ đồng bằng Sông Hồng.",
    colorHint: "#7B5E3A",
    suitableFor: ["Lễ hội dân gian", "Hát quan họ", "Lưu giữ di sản"],
  },
  {
    id: "ao-dai",
    slug: "ao-dai-tan-thoi",
    name: "Áo Dài Tân Thời",
    nameEn: "Modern Áo Dài",
    dynasty: "Đương đại",
    dynastyEn: "Contemporary",
    period: "1930s – nay",
    philosophy:
      "Biểu tượng quốc phục Việt Nam hiện đại — dung hòa nét truyền thống và vẻ đẹp đương đại. Được UNESCO vinh danh.",
    colorHint: "#D4AF37",
    suitableFor: ["Quốc phục", "Sự kiện", "Hàng ngày"],
    featured: true,
  },
];

/* ── Dynasty badge ── */
function DynastyBadge({
  dynasty,
  period,
  color,
}: {
  dynasty: string;
  period: string;
  color: string;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span
        className="inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white"
        style={{ backgroundColor: color }}
      >
        {dynasty}
      </span>
      <span className="text-[11px] text-[#6B7280]">{period}</span>
    </div>
  );
}

/* ── Single costume card ── */
function CostumeCard({
  costume,
  priority = false,
}: {
  costume: HeritageCostume;
  priority?: boolean;
}) {
  return (
    <article
      id={`costume-card-${costume.id}`}
      aria-labelledby={`costume-name-${costume.id}`}
      className={`group relative flex flex-col overflow-hidden rounded-2xl border transition-all duration-500 hover:shadow-2xl ${
        costume.featured
          ? "border-[#D4AF37]/40 bg-gradient-to-b from-white to-[#FAF8F5]"
          : "border-[#E5DECE] bg-white hover:border-[#D4AF37]/30"
      }`}
    >
      {/* Card image — fixed aspect ratio → CLS = 0 */}
      <Link
        href={`/co-phuc/${costume.slug}`}
        className="relative block aspect-[4/3] w-full overflow-hidden"
        aria-label={`Xem chi tiết ${costume.name}`}
        tabIndex={-1}
      >
        <Image
          src="/costume-grid.jpg"
          alt={`${costume.name} — ${costume.nameEn}, ${costume.dynasty} (${costume.period})`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
          priority={priority}
          quality={80}
        />
        {/* Gradient overlay */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          aria-hidden="true"
        />

        {/* Featured badge */}
        {costume.featured && (
          <div className="absolute left-3 top-3">
            <span className="inline-flex items-center gap-1 rounded-full bg-[#D4AF37] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-[#1E3A5F]">
              ✦ Nổi bật
            </span>
          </div>
        )}
      </Link>

      {/* Card body */}
      <div className="flex flex-1 flex-col gap-3 p-5">
        <DynastyBadge
          dynasty={costume.dynasty}
          period={costume.period}
          color={costume.colorHint}
        />

        <h3
          id={`costume-name-${costume.id}`}
          className="font-playfair text-xl font-bold leading-snug text-[#1E3A5F] group-hover:text-[#9E2A2B] transition-colors duration-200"
        >
          {costume.name}
        </h3>
        <p className="text-xs font-medium text-[#6B7280] -mt-1">
          {costume.nameEn}
        </p>

        {/* Philosophy */}
        <p className="text-sm leading-relaxed text-[#4A6A8F] line-clamp-3">
          {costume.philosophy}
        </p>

        {/* Suitable contexts */}
        <div className="flex flex-wrap gap-1.5" aria-label="Phù hợp với">
          {costume.suitableFor.map((ctx) => (
            <span
              key={ctx}
              className="rounded-full border border-[#E5DECE] bg-[#FAF8F5] px-2.5 py-0.5 text-[11px] font-medium text-[#4A6A8F]"
            >
              {ctx}
            </span>
          ))}
        </div>

        {/* CTA link — spacer pushes to bottom */}
        <div className="mt-auto pt-2">
          <Link
            id={`link-costume-${costume.id}`}
            href={`/co-phuc/${costume.slug}`}
            className="group/link inline-flex items-center gap-1.5 text-sm font-semibold text-[#9E2A2B] transition-all duration-200 hover:gap-2.5"
            aria-label={`Khám phá ${costume.name} — xem chi tiết và gợi ý phối đồ`}
          >
            Khám phá &amp; Phối đồ
            <ArrowUpRight
              className="h-4 w-4 transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
              aria-hidden="true"
            />
          </Link>
        </div>
      </div>

      {/* Bottom accent line */}
      <div
        className="h-0.5 w-0 bg-gradient-to-r from-[#9E2A2B] to-[#D4AF37] transition-all duration-500 group-hover:w-full"
        aria-hidden="true"
      />
    </article>
  );
}

/* ── Main Grid Component ── */
export function HeritageTopicGrid() {
  return (
    <section
      id="heritage-grid"
      aria-labelledby="heritage-grid-heading"
      className="bg-gradient-to-b from-[#FAF8F5] to-[#F3EFE8] py-20 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <header className="mb-14 text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#D4AF37]">
            Kho Tàng Di Sản
          </p>
          <h2
            id="heritage-grid-heading"
            className="font-playfair text-3xl font-bold text-[#1E3A5F] sm:text-4xl lg:text-[2.75rem]"
          >
            5 Nhóm Cổ Phục Việt Nam
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-[#4A6A8F]">
            Từ triều phục hoàng gia đến trang phục dân gian — mỗi bộ đều mang
            một triết lý, một câu chuyện về văn hóa và phẩm cách người Việt.
          </p>

          {/* Decorative divider */}
          <div
            className="mx-auto mt-6 flex items-center justify-center gap-3"
            aria-hidden="true"
          >
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#D4AF37]" />
            <div className="text-[#D4AF37]">✦</div>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#D4AF37]" />
          </div>
        </header>

        {/*
          Responsive grid:
          - Mobile:  1 column
          - Tablet:  2 columns
          - Desktop: 3 columns (first row: 2+1, second row: 2)
          Featured items get visually emphasized via the `featured` prop.
        */}
        <div
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          role="list"
          aria-label="Danh sách nhóm cổ phục Việt Nam"
        >
          {HERITAGE_COSTUMES.map((costume, index) => (
            <div key={costume.id} role="listitem">
              <CostumeCard
                costume={costume}
                priority={index < 2} // preload first 2 images for performance
              />
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-14 text-center">
          <Link
            id="btn-explore-all"
            href="/co-phuc"
            className="group inline-flex items-center gap-2.5 rounded-full border border-[#D4AF37] bg-transparent px-8 py-3.5 text-sm font-semibold text-[#1E3A5F] transition-all duration-300 hover:bg-[#D4AF37] hover:text-white hover:shadow-lg hover:shadow-[#D4AF37]/30"
            aria-label="Xem toàn bộ danh mục cổ phục Việt Nam"
          >
            Xem toàn bộ danh mục
            <ArrowUpRight
              className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
