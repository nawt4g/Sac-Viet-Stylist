import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Sparkles, SlidersHorizontal } from "lucide-react";

export const metadata: Metadata = {
  title: "Khám Phá Việt Phục — Sắc Việt AI Stylist",
  description: "Khám phá các gợi ý phối đồ cổ phục Việt Nam theo phong cách đương đại.",
};

const MOCK_EXPLORE_ITEMS = [
  { id: "1", title: "Minimal Ngũ Thân", costume: "Áo Ngũ Thân", context: "Dạo phố", img: "/images/looks/ngu-than-navy-dao-pho.png" },
  { id: "2", title: "Tấc Kỷ Yếu", costume: "Áo Tấc", context: "Kỷ yếu", img: "/images/looks/ao-tac-van-mieu.png" },
  { id: "3", title: "Nhật Bình Đương Đại", costume: "Nhật Bình", context: "Chụp ảnh", img: "/images/looks/nhat-binh-chup-anh.png" },
  { id: "4", title: "Áo Dài Y2K", costume: "Áo Dài", context: "Dạo phố", img: "/images/looks/ao-dai-trang-ky-yeu.png" },
  { id: "5", title: "Tứ Thân Lễ Hội", costume: "Tứ Thân", context: "Lễ hội", img: "/images/looks/tu-than-nau-le-hoi.png" },
  { id: "6", title: "Đám Cưới Cổ Truyền", costume: "Ngũ Thân", context: "Lễ cưới", img: "/images/looks/ngu-than-do-dam-cuoi.png" },
];

export default function ExplorePage() {
  return (
    <main className="flex-1 bg-[#FAF8F5] py-12 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="font-playfair text-4xl font-bold text-[#1E3A5F]">Khám phá</h1>
            <p className="mt-2 text-base text-[#4A6A8F]">Nguồn cảm hứng phối cổ phục Việt đương đại.</p>
          </div>
          <button className="inline-flex items-center gap-2 rounded-lg border border-[#E5DECE] bg-white px-4 py-2 text-sm font-medium text-[#1E3A5F] hover:bg-[#F3EFE8]">
            <SlidersHorizontal className="h-4 w-4" />
            Bộ lọc
          </button>
        </header>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {MOCK_EXPLORE_ITEMS.map((item) => (
            <div key={item.id} className="group relative flex flex-col overflow-hidden rounded-2xl border border-[#E5DECE] bg-white transition-all hover:shadow-xl hover:-translate-y-1">
              <div className="relative aspect-[3/4] bg-[#F3EFE8]">
                <Image src={item.img} alt={item.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute right-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-bold text-[#1E3A5F] backdrop-blur-sm">
                  {item.context}
                </div>
              </div>
              <div className="flex flex-1 flex-col justify-between p-4">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37]">{item.costume}</p>
                  <h3 className="font-playfair mt-1 text-sm font-bold text-[#1E3A5F] group-hover:text-[#9E2A2B]">{item.title}</h3>
                </div>
                <Link href={`/stylist?style=${item.id}`} className="mt-4 flex items-center gap-1 text-[11px] font-bold text-[#9E2A2B]">
                  Thử phong cách <ArrowUpRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
