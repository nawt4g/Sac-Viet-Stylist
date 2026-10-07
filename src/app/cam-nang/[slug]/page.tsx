import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, BookOpen, Wand2 } from "lucide-react";

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  return {
    title: `Cẩm nang: ${params.slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')} — Sắc Việt AI Stylist`,
    description: "Khám phá cẩm nang chi tiết về cổ phục Việt Nam.",
  };
}

export default function CamNangDetailPage({ params }: { params: { slug: string } }) {
  // Mock title formatting
  const title = params.slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

  return (
    <main className="flex-1 bg-[#FAF8F5] py-12 lg:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Link href="/cam-nang" className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-[#4A6A8F] hover:text-[#9E2A2B]">
          <ArrowLeft className="h-4 w-4" />
          Quay lại Cẩm nang
        </Link>
        
        <article className="rounded-3xl border border-[#E5DECE] bg-white p-8 shadow-sm lg:p-12">
          <div className="mb-6 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-[#D4AF37]" />
            <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37]">Bài viết chuyên đề</span>
          </div>
          
          <h1 className="font-playfair text-3xl font-bold text-[#1E3A5F] sm:text-4xl mb-6">{title}</h1>
          
          <div className="prose prose-lg text-[#4A6A8F] max-w-none">
            <p className="lead font-medium text-[#1E3A5F]">
              (Bài viết SEO content mẫu cho chuyên đề <strong>{title}</strong>).
            </p>
            <p>
              Đây là nội dung placeholder. Trong môi trường production, nội dung này sẽ được render từ CMS hoặc markdown files với đầy đủ H2, H3, hình ảnh minh họa và semantic HTML để tối ưu SEO.
            </p>
            
            <h2 className="font-playfair text-2xl font-bold text-[#1E3A5F] mt-8 mb-4">Mục tiêu của trang này</h2>
            <ul>
              <li>Giáo dục kiến thức văn hóa về cổ phục.</li>
              <li>Thu hút traffic tự nhiên từ các công cụ tìm kiếm (SEO).</li>
              <li>Tạo internal link hướng người dùng đến công cụ AI Stylist.</li>
            </ul>
          </div>

          <div className="mt-12 border-t border-[#E5DECE] pt-8 text-center">
            <p className="text-sm font-bold text-[#1E3A5F] mb-4">Sẵn sàng áp dụng kiến thức vào thực tế?</p>
            <Link href="/stylist" className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37] bg-white px-6 py-3 text-sm font-bold text-[#1E3A5F] transition-all hover:bg-[#D4AF37] hover:text-[#1E3A5F]">
              <Wand2 className="h-4 w-4" />
              Mở AI Stylist
            </Link>
          </div>
        </article>
      </div>
    </main>
  );
}
