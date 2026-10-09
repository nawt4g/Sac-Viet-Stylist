"use client";
/**
 * components/result/EdgeCaseRedModal.tsx
 * ========================================
 * Modal giáo dục văn minh cho trường hợp RED.
 * Hiển thị khối UI "Chưa phù hợp / Gợi ý sửa" đặt hai ảnh minh họa cạnh nhau.
 * Giải thích ý nghĩa văn hóa áo tấc + nút 1-Click Fix.
 * Không phán xét — chỉ giáo dục và gợi ý với ngôn ngữ thân thiện cho Gen Z.
 */

import { useEffect, useRef } from "react";
import { X, ArrowRight, BookOpen, ShieldCheck, XCircle, CheckCircle2 } from "lucide-react";
import { useStylist } from "@/context/StylistContext";
import { ImageSlot } from "@/components/common/ImageSlot";
import { getLookImage } from "@/lib/images";
import { resolveImageFile } from "@/data/imageManifest";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function EdgeCaseRedModal({ isOpen, onClose }: Props) {
  const { dispatch } = useStylist();
  const modalRef = useRef<HTMLDivElement>(null);

  // Trap focus & ESC key
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    modalRef.current?.focus();
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  // Prevent body scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleOnClickFix = () => {
    dispatch({ type: "ONE_CLICK_FIX" });
    onClose();
  };

  // Image lookup for error and fixed looks
  const errorResolved = resolveImageFile("looks", "ao-tac-short-loi");
  const errorLook = getLookImage("ao-tac-short-loi").image ?? {
    src: errorResolved.src,
    available: errorResolved.available,
    alt: "Minh họa lỗi: Áo Tấc phối Quần Short",
  };

  const fixedResolved = resolveImageFile("looks", "ao-tac-van-mieu");
  const fixedLook = getLookImage({ costumeId: "ao-tac", contextId: "van-mieu" }).image ?? {
    src: fixedResolved.src,
    available: fixedResolved.available,
    alt: "Minh họa chuẩn: Áo Tấc phối Quần Lụa Trắng",
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center p-0 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="red-modal-title"
      aria-describedby="red-modal-desc"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/65 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal panel */}
      <div
        ref={modalRef}
        tabIndex={-1}
        className="relative z-10 w-full max-w-2xl max-h-[92vh] flex flex-col overflow-hidden rounded-t-3xl bg-white shadow-2xl sm:rounded-3xl focus:outline-none"
      >
        {/* Red top stripe */}
        <div className="h-1.5 w-full shrink-0 bg-gradient-to-r from-[#DC2626] via-[#EF4444] to-[#DC2626]" aria-hidden="true" />

        {/* Header */}
        <div className="flex shrink-0 items-start justify-between gap-4 px-6 pt-5 pb-3 border-b border-[#E5DECE]/60">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1 rounded-full bg-[#FEE2E2] px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-[#DC2626]">
                <XCircle className="h-3 w-3" />
                Cảnh báo chuẩn mực văn hóa
              </span>
            </div>
            <h2
              id="red-modal-title"
              className="font-playfair mt-1.5 text-xl font-bold text-[#1E3A5F] sm:text-2xl"
            >
              Áo Tấc &amp; Quần Short — Chưa Tương Thích
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#E5DECE] text-[#6B7280] transition-colors hover:bg-[#FAF8F5] focus-visible:outline-2 focus-visible:outline-[#D4AF37]"
            aria-label="Đóng modal"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto px-6 py-4 space-y-4" id="red-modal-desc">
          {/* Cultural explanation */}
          <div className="flex gap-3 rounded-xl border border-[#FCA5A5] bg-[#FFF5F5] p-3.5">
            <BookOpen className="mt-0.5 h-5 w-5 shrink-0 text-[#DC2626]" aria-hidden="true" />
            <div className="text-xs leading-relaxed text-[#7F1D1D]">
              <p className="font-bold text-sm">Góc nhìn di sản:</p>
              <p className="mt-1">
                <strong>Áo Tấc</strong> là lễ phục tôn nghiêm thời Nguyễn gắn liền đạo lý <em>Ngũ Luân</em>.
                Việc kết hợp áo tấc tay thụng với quần short tạo độ tương phản quá mức giữa phần trên trang nghiêm
                và phần dưới đường phố, làm mất đi tính chỉnh thể vốn có.
              </p>
            </div>
          </div>

          {/* ── Visual Comparison: Side-by-Side Images ── */}
          <div>
            <p className="mb-2.5 text-xs font-bold uppercase tracking-wider text-[#1E3A5F]">
              Đối chiếu trực quan phương án phối đồ
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {/* Left: Lỗi (Chưa phù hợp) */}
              <div className="flex flex-col rounded-2xl border-2 border-[#DC2626]/40 bg-[#FFF5F5] p-3 shadow-xs">
                <div className="relative mb-2.5 overflow-hidden rounded-xl bg-white">
                  <ImageSlot
                    src={errorLook.src}
                    alt={errorLook.alt}
                    available={errorLook.available}
                    aspectRatio="3/4"
                    fallbackTitle="Áo Tấc + Quần Short"
                    fallbackSubtitle="Minh họa phối đồ chưa phù hợp"
                    className="w-full"
                  />
                  <div className="absolute top-2 left-2 z-10 flex items-center gap-1 rounded-full bg-[#DC2626] px-2 py-0.5 text-[10px] font-bold text-white shadow-xs">
                    <XCircle className="h-3 w-3" />
                    Chưa phù hợp
                  </div>
                  <div className="absolute bottom-2 right-2 z-10 rounded-full bg-black/60 px-2 py-0.5 text-[10px] font-bold text-white">
                    18 / 100 điểm
                  </div>
                </div>

                <div className="flex flex-col flex-1">
                  <p className="text-sm font-bold text-[#DC2626]">
                    Áo Tấc + Quần Short
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-[#7F1D1D]">
                    Gây đứt gãy phom dáng lễ nghi, thiếu sự hài hòa và tôn nghiêm khi xuất hiện tại không gian di tích văn hóa.
                  </p>
                </div>
              </div>

              {/* Right: Gợi ý sửa chuẩn */}
              <div className="flex flex-col rounded-2xl border-2 border-[#16A34A]/50 bg-[#F0FDF4] p-3 shadow-xs">
                <div className="relative mb-2.5 overflow-hidden rounded-xl bg-white">
                  <ImageSlot
                    src={fixedLook.src}
                    alt={fixedLook.alt}
                    available={fixedLook.available}
                    aspectRatio="3/4"
                    fallbackTitle="Áo Tấc + Quần Lụa Trắng"
                    fallbackSubtitle="Minh họa chuẩn lễ nghi tôn nghiêm"
                    className="w-full"
                  />
                  <div className="absolute top-2 left-2 z-10 flex items-center gap-1 rounded-full bg-[#16A34A] px-2 py-0.5 text-[10px] font-bold text-white shadow-xs">
                    <CheckCircle2 className="h-3 w-3" />
                    Gợi ý sửa chuẩn
                  </div>
                  <div className="absolute bottom-2 right-2 z-10 rounded-full bg-black/60 px-2 py-0.5 text-[10px] font-bold text-white">
                    95 / 100 điểm
                  </div>
                </div>

                <div className="flex flex-col flex-1">
                  <p className="text-sm font-bold text-[#16A34A]">
                    Áo Tấc + Quần Lụa Trắng Suông
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-[#14532D]">
                    Quần lụa trắng suông chuẩn quy thức giữ trọn 5 vạt áo Ngũ Luân, vừa thanh tao vừa tự tin chụp ảnh mọi góc độ!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-2.5 shrink-0 border-t border-[#E5DECE] bg-[#FAF8F5]/80 px-6 py-4">
          {/* 1-Click Fix CTA */}
          <button
            id="btn-one-click-fix"
            type="button"
            onClick={handleOnClickFix}
            className="flex min-h-[48px] items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-[#16A34A] to-[#15803D] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-[#16A34A]/25 transition-all hover:shadow-xl hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-[#16A34A]"
            aria-label="Áp dụng thay thế quần short sang quần lụa trắng và cập nhật kết quả ngay"
          >
            <ShieldCheck className="h-4 w-4" aria-hidden="true" />
            <span>Sửa Nhanh 1-Click: Thay sang Quần Lụa Trắng</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>

          {/* Dismiss */}
          <button
            type="button"
            onClick={onClose}
            className="min-h-[40px] rounded-xl border border-[#E5DECE] bg-white py-2 text-xs font-semibold text-[#6B7280] transition-colors hover:bg-[#FAF8F5] hover:text-[#1E3A5F] focus-visible:outline-2 focus-visible:outline-[#D4AF37]"
            aria-label="Giữ nguyên lựa chọn và đóng modal"
          >
            Tôi hiểu rồi, giữ nguyên phong cách hiện tại
          </button>
        </div>
      </div>
    </div>
  );
}
