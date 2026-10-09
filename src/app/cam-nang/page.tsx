import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { BookOpen, ArrowUpRight } from "lucide-react";
import { getFlatlay, getLookImage } from "@/lib/images";

export const metadata: Metadata = {
  title: "Cẩm Nang Cổ Phục — Sắc Việt AI Stylist",
  description: "Khám phá kiến thức lịch sử, ý nghĩa hoa văn và quy tắc mặc cổ phục Việt Nam.",
};

const CATEGORIES = ["Tất cả", "Lịch sử", "Lễ nghi", "Biểu tượng", "Phối đồ"];

export default function CamNangPage() {
  const articles = [
    {
      id: "1",
      slug: "cach-mac-ao-ngu-than",
      title: "Cách mặc Áo Ngũ Thân đúng chuẩn",
      cat: "Lễ nghi",
      readTime: "5 phút",
      img: getFlatlay("ao-ngu-than").src,
      href: "/cam-nang/cach-mac-ao-ngu-than",
    },
    {
      id: "2",
      slug: "mac-gi-di-van-mieu",
      title: "Mặc gì đi Văn Miếu?",
      cat: "Lễ nghi",
      readTime: "4 phút",
      img: getLookImage("ao-tac-van-mieu").image?.src ?? "/hero-editorial.png",
      href: "/cam-nang/mac-gi-di-van-mieu",
    },
    {
      id: "3",
      slug: "phu-kien-viet-phuc",
      title: "Phụ kiện Việt phục thời nay",
      cat: "Phối đồ",
      readTime: "6 phút",
      img: getFlatlay("ao-nhat-binh").src,
      href: "/cam-nang/phu-kien-viet-phuc",
    },
    {
      id: "4",
      slug: "phoi-co-phuc-hien-dai",
      title: "Phối cổ phục hiện đại",
      cat: "Phối đồ",
      readTime: "7 phút",
      img: getLookImage("ngu-than-navy-dao-pho").image?.src ?? "/hero-editorial.png",
      href: "/cam-nang/phoi-co-phuc-hien-dai",
    },
  ];

  return (
    <main className="flex-1 bg-[#FAF8F5] py-12 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="mb-12 text-center">
          <div className="mb-4 mx-auto inline-flex items-center gap-1.5 rounded-full border border-[#E5DECE] bg-white px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-[#9E2A2B]">
            <BookOpen className="h-3.5 w-3.5 text-[#D4AF37]" />
            Cẩm Nang
          </div>
          <h1 className="font-playfair text-4xl font-bold text-[#1E3A5F]">Tủ sách Di sản</h1>
          <p className="mt-4 text-base text-[#4A6A8F]">Hiểu về cội nguồn để tự tin định hình phong cách.</p>
        </header>

        {/* Categories */}
        <div className="mb-10 flex flex-wrap justify-center gap-2">
          {CATEGORIES.map((cat, i) => (
            <button
              key={cat}
              className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${
                i === 0
                  ? "bg-[#1E3A5F] text-white"
                  : "border border-[#E5DECE] bg-white text-[#4A6A8F] hover:bg-[#F3EFE8]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Article Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {articles.map((article) => (
            <Link
              key={article.id}
              href={article.href}
              className="group flex flex-col rounded-2xl border border-[#E5DECE] bg-white p-5 transition-all hover:border-[#D4AF37] hover:shadow-lg"
            >
              <div className="mb-4 relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-[#F3EFE8]">
                <Image
                  src={article.img}
                  alt={article.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#9E2A2B]">
                  {article.cat}
                </span>
                <span className="text-[10px] text-[#9CA3AF]">{article.readTime}</span>
              </div>
              <h3 className="font-playfair text-lg font-bold text-[#1E3A5F] group-hover:text-[#9E2A2B]">
                {article.title}
              </h3>
              <div className="mt-4 flex items-center gap-1 text-xs font-bold text-[#D4AF37]">
                Đọc tiếp <ArrowUpRight className="h-3.5 w-3.5" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
