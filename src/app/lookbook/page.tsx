import type { Metadata } from "next";
import Link from "next/link";
import { FolderHeart, Plus } from "lucide-react";

export const metadata: Metadata = {
  title: "Lookbook Của Tôi — Sắc Việt AI Stylist",
  description: "Quản lý và so sánh các outfit cổ phục bạn đã lưu.",
};

export default function LookbookPage() {
  return (
    <main className="flex-1 bg-[#FAF8F5] py-12 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="mb-10 text-center">
          <h1 className="font-playfair text-4xl font-bold text-[#1E3A5F]">Lookbook Của Tôi</h1>
          <p className="mt-2 text-base text-[#4A6A8F]">Lưu trữ và so sánh các phong cách bạn yêu thích.</p>
        </header>

        {/* Empty State for MVP */}
        <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-[#D4AF37]/50 bg-white py-20 text-center shadow-sm">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#FAF8F5]">
            <FolderHeart className="h-8 w-8 text-[#D4AF37]" />
          </div>
          <h3 className="font-playfair text-xl font-bold text-[#1E3A5F]">Lookbook đang trống</h3>
          <p className="mt-2 max-w-md text-sm text-[#4A6A8F]">
            Bạn chưa lưu outfit nào. Hãy bắt đầu phối đồ cùng AI Stylist để thêm những bộ trang phục mang đậm dấu ấn cá nhân.
          </p>
          <Link
            href="/stylist"
            className="mt-6 flex items-center gap-2 rounded-full bg-[#9E2A2B] px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-[#7D1F20]"
          >
            <Plus className="h-4 w-4" />
            Tạo outfit đầu tiên
          </Link>
        </div>
      </div>
    </main>
  );
}
