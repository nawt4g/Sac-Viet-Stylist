"use client";

/**
 * components/home/LookbookPreview.tsx
 * =====================================
 * Lookbook Preview Section:
 * Hiển thị dải 4-6 looks nổi bật (carousel/scroll ngang trên mobile).
 * Lấy dữ liệu qua hàm getLookImage({ costumeId, colorHex, contextId }) từ src/lib/images.ts.
 * Dùng ImageSlot (CLS = 0) với fallback "Ảnh đang cập nhật" cho các look dự kiến.
 */

import React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Sparkles, ArrowRight, Camera } from "lucide-react";
import { ImageSlot } from "@/components/common/ImageSlot";
import { getLookImage } from "@/lib/images";
import { CONTEXT_ICON } from "@/components/icons";

const FEATURED_LOOK_SPECS = [
  { costumeId: "ao-ngu-than", colorHex: "#1E3A5F", contextId: "dao-pho" },
  { costumeId: "ao-tac", colorHex: "#4A7856", contextId: "van-mieu" },
  { costumeId: "ao-nhat-binh", colorHex: "#9E2A2B", contextId: "dam-cuoi" },
  { costumeId: "ao-tu-than", colorHex: "#7B5E3A", contextId: "le-hoi" },
  { costumeId: "ao-dai", colorHex: "#F5F0E8", contextId: "ky-yeu" },
  { costumeId: "ao-ngu-than", colorHex: "#9E2A2B", contextId: "chup-anh" },
] as const;

export function LookbookPreview() {
  const looks = FEATURED_LOOK_SPECS.map((spec) => getLookImage(spec).image).filter(
    (look): look is NonNullable<typeof look> => Boolean(look)
  );
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="lookbook-preview"
      aria-labelledby="lookbook-preview-heading"
      className="paper-bg relative overflow-hidden bg-paper py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-0.5 text-xs font-bold uppercase tracking-widest text-crimson border border-paper-border">
              <Camera className="h-3.5 w-3.5 text-gold" />
              Bộ Sưu Tập Lookbook
            </div>
            <h2
              id="lookbook-preview-heading"
              className="font-playfair text-3xl font-bold text-ink sm:text-4xl"
            >
              Phối Cảnh Đương Đại Nổi Bật
            </h2>
            <p className="mt-2 max-w-xl text-sm text-ink-muted">
              Xem trước các gợi ý phối trang phục theo 6 ngữ cảnh đời sống: Dạo phố, Kỷ yếu, Chụp ảnh, Văn Miếu, Đám cưới và Lễ hội.
            </p>
          </div>

          <Link
            href="/stylist"
            className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-gold bg-white px-5 py-2.5 text-xs font-bold text-ink shadow-xs transition-all duration-200 hover:bg-gold hover:text-ink hover:shadow-md"
          >
            <span>Tự tạo phối đồ mới</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* ── Carousel / Horizontal Scroll Band on Mobile, Responsive Grid on Desktop ── */}
        <div className="-mx-4 flex overflow-x-auto px-4 pb-4 pt-1 snap-x snap-mandatory gap-5 sm:mx-0 sm:grid sm:grid-cols-2 sm:px-0 sm:overflow-visible lg:grid-cols-3 xl:grid-cols-6">
          {looks.map((look, index) => {
            const ContextIcon = look.context ? CONTEXT_ICON[look.context] ?? Sparkles : Sparkles;

            return (
              <motion.div
                key={look.id}
                initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.5, delay: index * 0.07 }}
                className="min-w-[240px] flex-shrink-0 snap-start sm:min-w-0"
              >
                <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-paper-border bg-white shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-gold/60 hover:shadow-lg">
                  {/* Image Frame */}
                  <ImageSlot
                    src={look.src}
                    alt={look.alt}
                    available={look.available}
                    aspectRatio="3/4"
                    fallbackTitle={look.title}
                    fallbackSubtitle={look.description}
                    className="w-full"
                    quality={80}
                  />

                  {/* Context Pill overlay */}
                  <div className="p-3.5">
                    <div className="flex items-center gap-1.5 text-[11px] font-semibold text-crimson">
                      <ContextIcon className="h-3.5 w-3.5 text-gold" />
                      <span className="capitalize">
                        {look.context ? look.context.replace("-", " ") : "Phối cảnh"}
                      </span>
                    </div>

                    <h3 className="font-playfair mt-1 text-sm font-bold text-ink line-clamp-1 group-hover:text-crimson transition-colors">
                      {look.title}
                    </h3>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default LookbookPreview;
