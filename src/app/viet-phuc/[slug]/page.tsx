import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Wand2 } from "lucide-react";
import { COSTUME_MAP } from "@/data/costumes";
import type { CostumeId } from "@/types/stylist";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const costume = COSTUME_MAP[params.slug as CostumeId];
  if (!costume) return { title: "Không tìm thấy trang phục" };
  
  return {
    title: `${costume.name} — Sắc Việt AI Stylist`,
    description: costume.description,
  };
}

export default function VietPhucDetailPage({ params }: { params: { slug: string } }) {
  const costume = COSTUME_MAP[params.slug as CostumeId];
  
  if (!costume) {
    notFound();
  }

  return (
    <main className="flex-1 bg-[#FAF8F5] py-12 lg:py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Link href="/explore" className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-[#4A6A8F] hover:text-[#9E2A2B]">
          <ArrowLeft className="h-4 w-4" />
          Quay lại Khám phá
        </Link>
        
        <article className="rounded-3xl border border-[#E5DECE] bg-white p-8 shadow-sm lg:p-12">
          <div className="mb-6 flex flex-wrap gap-2">
            <span className="rounded-full bg-[#FAF8F5] px-3 py-1 text-xs font-bold text-[#1E3A5F]">{costume.dynasty}</span>
            <span className="rounded-full bg-[#FAF8F5] px-3 py-1 text-xs font-bold text-[#1E3A5F]">Vùng: {costume.region}</span>
          </div>
          
          <h1 className="font-playfair text-4xl font-bold text-[#1E3A5F] sm:text-5xl mb-4">{costume.name}</h1>
          <p className="text-lg text-[#9CA3AF] mb-8">{costume.nameEn}</p>
          
          <div className="prose prose-lg text-[#4A6A8F] max-w-none">
            <p className="lead font-medium text-[#1E3A5F]">{costume.description}</p>
            
            <h3 className="font-playfair text-2xl font-bold text-[#1E3A5F] mt-10 mb-4">Chi tiết và ý nghĩa</h3>
            <p>
              (Nội dung chi tiết về lịch sử, cấu tạo, và ý nghĩa của {costume.name} sẽ được cập nhật trong phiên bản đầy đủ).
            </p>
          </div>
          
          <div className="mt-12 rounded-2xl bg-[#FBF9F6] p-8 text-center border border-[#D4AF37]/30">
            <h3 className="font-playfair text-xl font-bold text-[#1E3A5F] mb-4">Phối {costume.name} theo cách của bạn</h3>
            <p className="text-sm text-[#4A6A8F] mb-6">Sử dụng AI Stylist để tạo ra outfit mang dấu ấn cá nhân mà vẫn tôn trọng bản sắc văn hóa.</p>
            <Link href={`/stylist?costume=${costume.id}`} className="inline-flex items-center gap-2 rounded-full bg-[#9E2A2B] px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-[#7D1F20]">
              <Wand2 className="h-4 w-4" />
              Tạo outfit với {costume.name}
            </Link>
          </div>
        </article>
      </div>
    </main>
  );
}
