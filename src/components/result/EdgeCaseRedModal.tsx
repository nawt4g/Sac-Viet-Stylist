"use client";
/**
 * components/result/EdgeCaseRedModal.tsx
 * ========================================
 * Modal giáo dục văn minh cho trường hợp RED.
 * Giải thích ý nghĩa văn hóa áo tấc + nút 1-Click Fix.
 * Không phán xét — chỉ giáo dục và gợi ý.
 */

import { useEffect, useRef } from "react";
import { X, ArrowRight, BookOpen, ShieldCheck } from "lucide-react";
import { useStylist } from "@/context/StylistContext";

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

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="red-modal-title"
      aria-describedby="red-modal-desc"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal panel */}
      <div
        ref={modalRef}
        tabIndex={-1}
        className="relative z-10 w-full max-w-lg overflow-hidden rounded-t-3xl bg-white shadow-2xl sm:rounded-3xl focus:outline-none"
      >
        {/* Red top stripe */}
        <div className="h-1.5 w-full bg-gradient-to-r from-[#DC2626] via-[#EF4444] to-[#DC2626]" aria-hidden="true" />

        {/* Header */}
        <div className="flex items-start justify-between gap-4 px-6 pt-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-[#FEE2E2] px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-widest text-[#DC2626]">
                Vi phạm văn hóa
              </span>
            </div>
            <h2
              id="red-modal-title"
              className="font-playfair mt-2 text-xl font-bold text-[#1E3A5F] sm:text-2xl"
            >
              Áo Tấc &amp; Quần Short — Không Tương Thích
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

        {/* Content */}
        <div className="px-6 py-5" id="red-modal-desc">
          {/* Cultural explanation */}
          <div className="flex gap-3 rounded-xl border border-[#FCA5A5] bg-[#FFF5F5] p-4">
            <BookOpen className="mt-0.5 h-5 w-5 shrink-0 text-[#DC2626]" aria-hidden="true" />
            <div className="text-sm leading-relaxed text-[#7F1D1D]">
              <p className="font-bold">Tại sao đây là vấn đề?</p>
              <p className="mt-1">
                <strong>Áo Tấc</strong> là trang phục nghi lễ của người Việt từ thế kỷ 18, mang triết
                lý <em>Ngũ Luân</em> qua 5 vạt áo. Mặc áo tấc với quần short tạo ra sự tương phản
                văn hóa rõ rệt — phần trên trang nghiêm, phần dưới quá thông thường — làm mất đi
                tính chỉnh thể của trang phục truyền thống.
              </p>
            </div>
          </div>

          {/* Comparison */}
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-[#FCA5A5] bg-[#FFF5F5] p-3.5 text-center">
              <p className="text-2xl" aria-hidden="true">🚫</p>
              <p className="mt-1.5 text-xs font-bold text-[#DC2626]">Không phù hợp</p>
              <p className="mt-1 text-xs text-[#7F1D1D]">Áo Tấc<br />+ Quần Short</p>
              <p className="mt-1.5 text-[10px] text-[#9CA3AF]">Điểm: 18/100</p>
            </div>
            <div className="rounded-xl border border-[#BBF7D0] bg-[#F0FDF4] p-3.5 text-center">
              <p className="text-2xl" aria-hidden="true">✅</p>
              <p className="mt-1.5 text-xs font-bold text-[#16A34A]">Phù hợp văn hóa</p>
              <p className="mt-1 text-xs text-[#14532D]">Áo Tấc<br />+ Quần lụa trắng</p>
              <p className="mt-1.5 text-[10px] text-[#9CA3AF]">Điểm: 95/100</p>
            </div>
          </div>

          {/* What is Quan Lua */}
          <div className="mt-4 flex gap-3 rounded-xl border border-[#E5DECE] bg-[#FAF8F5] p-4">
            <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#16A34A]" aria-hidden="true" />
            <p className="text-sm text-[#4A6A8F]">
              <strong className="text-[#1E3A5F]">Quần lụa trắng suông</strong> là phần dưới truyền
              thống của Áo Tấc — chất lụa tơ tằm mỏng nhẹ, dáng suông thẳng, phù hợp mọi ngữ cảnh
              từ đường phố đến nghi lễ.
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-2.5 border-t border-[#E5DECE] px-6 py-5">
          {/* 1-Click Fix CTA */}
          <button
            id="btn-one-click-fix"
            type="button"
            onClick={handleOnClickFix}
            className="flex min-h-[52px] items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-[#16A34A] to-[#15803D] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#16A34A]/30 transition-all hover:shadow-xl hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-[#16A34A]"
            aria-label="Áp dụng thay thế quần short sang quần lụa trắng và cập nhật kết quả ngay"
          >
            <ShieldCheck className="h-4 w-4" aria-hidden="true" />
            Áp dụng thay thế → Quần Lụa Trắng Suông
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>

          {/* Dismiss */}
          <button
            type="button"
            onClick={onClose}
            className="min-h-[44px] rounded-xl border border-[#E5DECE] py-2.5 text-sm font-medium text-[#6B7280] transition-colors hover:bg-[#FAF8F5] focus-visible:outline-2 focus-visible:outline-[#D4AF37]"
            aria-label="Giữ nguyên lựa chọn và đóng modal"
          >
            Giữ nguyên lựa chọn
          </button>
        </div>
      </div>
    </div>
  );
}
