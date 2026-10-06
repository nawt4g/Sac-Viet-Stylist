"use client";

/**
 * components/home/HeritageTopicGrid.tsx
 * ======================================
 * Grid 5 nhóm cổ phục Việt Nam chuẩn hóa (CostumeId):
 *   1. Áo Ngũ Thân (ao-ngu-than)
 *   2. Áo Tấc (ao-tac)
 *   3. Áo Nhật Bình (ao-nhat-binh)
 *   4. Áo Tứ Thân (ao-tu-than)
 *   5. Áo Dài (ao-dai)
 *
 * Sử dụng ImageSlot kết hợp getFlatlay từ src/lib/images.ts (CLS = 0).
 * Thẻ card hiển thị đầy đủ: Tên, Vùng miền và 1 dòng ý nghĩa ngắn gọn.
 * Animation tuân thủ prefers-reduced-motion.
 */

import React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Sparkles, MapPin } from "lucide-react";
import { ImageSlot } from "@/components/common/ImageSlot";
import { getFlatlay } from "@/lib/images";
import { COSTUMES } from "@/data/costumes";
import { COSTUME_ICON } from "@/components/icons";
import type { CostumeId } from "@/types/stylist";

/* ── Mapping vùng miền thân thiện với người dùng ── */
const REGION_LABELS: Record<string, string> = {
  north: "Bắc Bộ",
  central: "Trung Bộ (Huế)",
  south: "Nam Bộ",
  all: "Toàn quốc",
};

/* ── 1 dòng ý nghĩa ngắn gọn đúc kết cho từng cổ phục ── */
const MEANING_SUMMARY: Record<CostumeId, string> = {
  "ao-ngu-than": "5 vạt biểu trưng cho chuẩn mực ngũ luân, đạo hiếu và kỷ cương trang nhã của người Việt.",
  "ao-tac": "Lễ phục tay thụng trang trọng, uy nghiêm trong các nghi lễ, cúng bái và hôn sự truyền thống.",
  "ao-nhat-binh": "Triều phục cổ vuông thêu phượng vũ, biểu trưng cho phẩm giá cao quý của bậc mệnh phụ quý tộc.",
  "ao-tu-than": "Nét đẹp thuần khiết, duyên dáng và đảm đang gắn liền với người phụ nữ đồng bằng Kinh Bắc.",
  "ao-dai": "Biểu tượng quốc phục giao hòa trọn vẹn giữa cốt cách truyền thống và nhịp sống thời trang đương đại.",
};

export function HeritageTopicGrid() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="heritage-grid"
      aria-labelledby="heritage-grid-heading"
      className="relative bg-white py-20 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header section */}
        <div className="mb-14 text-center">
          <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-[#FAF8F5] px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-[#9E2A2B] border border-[#E5DECE]">
            <Sparkles className="h-3.5 w-3.5 text-[#D4AF37]" />
            Di Sản Trang Phục
          </div>
          <h2
            id="heritage-grid-heading"
            className="font-playfair text-3xl font-bold text-[#1E3A5F] sm:text-4xl lg:text-5xl"
          >
            5 Loại Cổ Phục Chuẩn Mực
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-[#4A6A8F]">
            Khám phá 5 dáng áo biểu tượng xuyên suốt các triều đại lịch sử Việt Nam. Mỗi bộ trang phục mang một câu chuyện văn hóa và linh hồn nghệ thuật riêng biệt.
          </p>
        </div>

        {/* ── Grid 5 cổ phục (3 cột trên desktop, 2 cột trên tablet, 1 cột trên mobile) ── */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8">
          {COSTUMES.map((costume, index) => {
            const costumeId = costume.id as CostumeId;
            const flatlay = getFlatlay(costumeId);
            const IconComponent = COSTUME_ICON[costumeId] ?? Sparkles;
            const regionText = REGION_LABELS[costume.region] ?? "Toàn quốc";
            const meaning = MEANING_SUMMARY[costumeId] ?? costume.description;

            return (
              <motion.article
                key={costume.id}
                id={`costume-card-${costume.id}`}
                initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.6, delay: index * 0.08 }}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-[#E5DECE] bg-[#FAF8F5] transition-all duration-300 hover:border-[#D4AF37] hover:shadow-xl hover:shadow-[#D4AF37]/10"
              >
                {/* Flatlay Image Slot with CLS = 0 */}
                <div className="relative overflow-hidden bg-white">
                  <ImageSlot
                    src={flatlay.src}
                    alt={flatlay.alt}
                    available={flatlay.available}
                    aspectRatio="4/3"
                    className="transition-transform duration-500 group-hover:scale-105"
                    quality={85}
                  />

                  {/* Icon badge overlay */}
                  <div className="absolute right-3.5 top-3.5 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-[#1E3A5F] shadow-sm backdrop-blur-xs">
                    <IconComponent className="h-4 w-4 text-[#9E2A2B]" />
                  </div>
                </div>

                {/* Card Body */}
                <div className="flex flex-1 flex-col justify-between p-6">
                  <div>
                    {/* Vùng miền & Triều đại tags */}
                    <div className="mb-2.5 flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center gap-1 rounded-md bg-[#FAF8F5] px-2.5 py-0.5 text-[11px] font-semibold text-[#1E3A5F] border border-[#E5DECE]">
                        <MapPin className="h-3 w-3 text-[#9E2A2B]" />
                        {regionText}
                      </span>
                      {costume.dynasty && (
                        <span className="text-[11px] text-[#4A6A8F]/80">
                          {costume.dynasty}
                        </span>
                      )}
                    </div>

                    {/* Tên cổ phục */}
                    <h3 className="font-playfair text-xl font-bold text-[#1E3A5F] transition-colors duration-200 group-hover:text-[#9E2A2B]">
                      {costume.name}
                    </h3>
                    <p className="mt-0.5 text-xs text-[#4A6A8F]">
                      {costume.nameEn}
                    </p>

                    {/* 1 dòng ý nghĩa ngắn gọn */}
                    <p className="mt-3 text-xs leading-relaxed text-[#4A6A8F] line-clamp-2">
                      {meaning}
                    </p>
                  </div>

                  {/* CTA link to Stylist Studio */}
                  <div className="mt-6 pt-4 border-t border-[#E5DECE]/80">
                    <Link
                      href="/stylist"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#9E2A2B] transition-colors duration-200 group-hover:text-[#7D1F20]"
                      aria-label={`Thử phối trang phục ${costume.name} ngay`}
                    >
                      <span>Trải nghiệm phối đồ</span>
                      <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default HeritageTopicGrid;
