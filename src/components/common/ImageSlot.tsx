"use client";

/**
 * components/common/ImageSlot.tsx
 * =================================
 * Image Slot bọc ngoài next/image với tỷ lệ cố định (CLS = 0),
 * có skeleton animate-pulse khi loading.
 * Nếu available === false (hoặc ảnh chưa có/lỗi), hiển thị div màu paper
 * kèm nhãn "Ảnh đang cập nhật".
 */

import React, { useState } from "react";
import Image from "next/image";
import { Sparkles, Image as ImageIcon } from "lucide-react";

export type AspectRatioType = "3/4" | "4/3" | "1/1" | "16/9" | "auto";

export interface ImageSlotProps {
  /** Đường dẫn ảnh (Next.js Image src) */
  src?: string | null;

  /** Alt text bắt buộc để đảm bảo Accessibility (a11y) & SEO */
  alt: string;

  /** Cờ khả dụng của ảnh. Nếu false, hiển thị fallback màu paper "Ảnh đang cập nhật" */
  available?: boolean;

  /** Tỷ lệ cố định của khung ảnh (mặc định: "3/4" cho chân dung / lookbook cổ phục) */
  aspectRatio?: AspectRatioType;

  /** Class CSS bổ sung cho container bên ngoài */
  className?: string;

  /** Class CSS bổ sung cho thẻ next/image */
  imageClassName?: string;

  /** Tiêu đề hiển thị trong fallback (tùy chọn) */
  fallbackTitle?: string;

  /** Phụ đề hiển thị trong fallback (tùy chọn) */
  fallbackSubtitle?: string;

  /** Thuộc tính sizes cho responsive next/image */
  sizes?: string;

  /** Ưu tiên load ảnh (LCP hero image) */
  priority?: boolean;

  /** Chất lượng nén ảnh (mặc định 80) */
  quality?: number;

  /** Thuộc tính object-fit */
  objectFit?: "cover" | "contain" | "fill";
}

const ASPECT_RATIO_CLASSES: Record<AspectRatioType, string> = {
  "3/4": "aspect-[3/4]",
  "4/3": "aspect-[4/3]",
  "1/1": "aspect-square",
  "16/9": "aspect-[16/9]",
  "auto": "",
};

export function ImageSlot({
  src,
  alt,
  available = true,
  aspectRatio = "3/4",
  className = "",
  imageClassName = "",
  fallbackTitle,
  fallbackSubtitle,
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
  priority = false,
  quality = 80,
  objectFit = "cover",
}: ImageSlotProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const aspectClass = ASPECT_RATIO_CLASSES[aspectRatio];
  const isImageReady = Boolean(src) && available && !hasError;

  return (
    <div
      className={`relative w-full overflow-hidden rounded-2xl ${aspectClass} ${className}`}
      data-testid="image-slot"
      aria-label={alt}
    >
      {/* ── TRƯỜNG HỢP: ẢNH KHẢ DỤNG & ĐANG LOAD / ĐÃ LOAD ── */}
      {isImageReady && src ? (
        <>
          {/* Skeleton placeholder (CLS = 0) */}
          {!isLoaded && (
            <div
              className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#F3EFE8] animate-pulse"
              aria-hidden="true"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E5DECE]/60 text-[#D4AF37]">
                <Sparkles className="h-5 w-5 animate-spin-slow opacity-60" />
              </div>
            </div>
          )}

          {/* Next.js Image component */}
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            priority={priority}
            quality={quality}
            onLoad={() => setIsLoaded(true)}
            onError={() => setHasError(true)}
            className={`transition-all duration-500 ${
              isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
            } ${
              objectFit === "cover"
                ? "object-cover object-top"
                : objectFit === "contain"
                ? "object-contain"
                : "object-fill"
            } ${imageClassName}`}
          />
        </>
      ) : (
        /* ── TRƯỜNG HỢP: available === false HOẶC CHƯA CÓ ẢNH / LỖI ── */
        <div
          className="paper-bg absolute inset-0 flex flex-col items-center justify-center border-2 border-dashed border-[#E5DECE] p-6 text-center select-none"
          role="status"
          aria-live="polite"
        >
          {/* Icon minh họa di sản */}
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#FAF8F5] border border-[#D4AF37]/30 shadow-sm text-[#D4AF37]">
            <ImageIcon className="h-5 w-5 text-[#D4AF37]" strokeWidth={1.75} />
          </div>

          {/* Nhãn chính: "Ảnh đang cập nhật" */}
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FAF8F5] px-3 py-1 text-xs font-semibold text-[#1E3A5F] border border-[#E5DECE] shadow-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
            Ảnh đang cập nhật
          </span>

          {/* Tiêu đề & phụ đề context (nếu có) */}
          {fallbackTitle && (
            <p className="font-playfair mt-2 text-sm font-bold text-[#1E3A5F]">
              {fallbackTitle}
            </p>
          )}

          {fallbackSubtitle ? (
            <p className="mt-1 text-xs text-[#4A6A8F] max-w-[85%]">
              {fallbackSubtitle}
            </p>
          ) : (
            <p className="mt-1 text-[11px] text-[#4A6A8F]/80">
              Tư liệu hình ảnh đang được số hóa
            </p>
          )}

          {/* Đường chỉ vàng trang trí */}
          <div className="mt-3 w-12 h-0.5 bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent" />
        </div>
      )}
    </div>
  );
}

export default ImageSlot;
