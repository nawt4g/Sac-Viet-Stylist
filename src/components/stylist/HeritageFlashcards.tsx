"use client";

/**
 * components/stylist/HeritageFlashcards.tsx
 * ==========================================
 * Màn hình chờ thông minh khi isProcessing = true.
 * Xoay vòng các câu đố & tri thức di sản Việt mỗi 2 giây.
 *
 * Polish:
 *   - Thay thế toàn bộ emoji bằng icon Lucide.
 *   - Viền vàng kim #D4AF37, background .paper-bg, thanh tiến trình mềm mại.
 *   - Touch target tối thiểu 44px cho nút lật thẻ.
 */

import React, { useEffect, useState, useCallback } from "react";
import {
  Loader2,
  BookOpen,
  HelpCircle,
  Sparkles,
  Palette,
  Leaf,
  Landmark,
  Award,
  Shirt,
  Lightbulb,
  ArrowRight,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useStylist } from "@/context/StylistContext";

/* ── Heritage knowledge data ── */
interface Flashcard {
  id: string;
  type: "fact" | "quiz" | "story";
  question?: string;
  answer?: string;
  content: string;
  icon: LucideIcon;
  source?: string;
}

const FLASHCARDS: Flashcard[] = [
  {
    id: "fc-1",
    type: "fact",
    icon: Shirt,
    content:
      "Áo Ngũ Thân có 5 vạt tượng trưng cho Ngũ Luân — 5 mối quan hệ trong đạo lý truyền thống: quân-thần, phụ-tử, phu-phụ, huynh-đệ, bằng hữu.",
    source: "Lê Quý Đôn — Phủ Biên Tạp Lục",
  },
  {
    id: "fc-2",
    type: "quiz",
    icon: HelpCircle,
    question: "Tại sao Áo Nhật Bình lại có hình cổ áo vuông?",
    answer:
      "Dải cổ áo hình chữ nhật của Nhật Bình tượng trưng cho quẻ Khôn (Đất) trong triết lý Thiên - Địa - Nhân, biểu trưng cho đức hạnh và sự vững chãi.",
    content: "Nhấn để xem giải đáp",
  },
  {
    id: "fc-3",
    type: "fact",
    icon: Palette,
    content:
      "Thời Nguyễn, màu vàng chính sắc thuộc về hoàng tộc. Dân gian mặc tông màu trầm thanh nhã như xanh chàm, nâu non, đen tuyền. Ngày nay, mọi sắc màu đều được tự do sáng tạo.",
    source: "Viện Nghiên cứu Di sản Văn hóa",
  },
  {
    id: "fc-4",
    type: "story",
    icon: BookOpen,
    content:
      "Áo Tứ Thân gắn liền với người phụ nữ đồng bằng Kinh Bắc — 4 vạt áo mềm mại cùng dải lụa thắt lưng đào thể hiện sự khéo léo, duyên dáng trong điệu hát Quan họ.",
  },
  {
    id: "fc-5",
    type: "fact",
    icon: Leaf,
    content:
      "Lụa tơ tằm Vạn Phúc - Hà Đông nức tiếng từ thế kỷ 13. Sợi tơ dệt thủ công thoáng mát vào mùa hạ và giữ ấm vào mùa đông — chất liệu di sản lý tưởng cho cổ phục.",
  },
  {
    id: "fc-6",
    type: "quiz",
    icon: Landmark,
    question: "Khi đến Văn Miếu Quốc Tử Giám, trang phục nào CẦN LƯU Ý?",
    answer:
      "Quần short, váy ngắn trên đầu gối và áo trễ vai không phù hợp với chốn tôn nghiêm. Cổ phục tay chẽn hoặc áo dài phối kín đáo là lựa chọn hoàn hảo nhất.",
    content: "Nhấn để xem giải đáp",
  },
  {
    id: "fc-7",
    type: "fact",
    icon: Sparkles,
    content:
      "Phong trào Cổ phục Việt đương đại bùng nổ mạnh mẽ nhờ thế hệ Gen Z — những người trẻ tiên phong remix di sản vào đời sống học đường và nghệ thuật.",
  },
  {
    id: "fc-8",
    type: "story",
    icon: Award,
    content:
      "Đồ án Phượng Hoàng thêu trên Áo Nhật Bình tượng trưng cho sự thanh cao, trí tuệ và đức hạnh của phụ nữ Việt. Từng đường chỉ kim tuyến đều được thêu tay tỉ mỉ.",
  },
];

/* ── Progress dots ── */
function ProgressDots({
  total,
  current,
}: {
  total: number;
  current: number;
}) {
  return (
    <div
      className="flex items-center justify-center gap-1.5"
      role="tablist"
      aria-label="Chỉ số thẻ tri thức"
    >
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          role="tab"
          aria-selected={i === current}
          aria-label={`Thẻ tri thức ${i + 1}${
            i === current ? " — đang hiển thị" : ""
          }`}
          className={`rounded-full transition-all duration-300 ${
            i === current ? "h-2 w-6 bg-[#D4AF37]" : "h-2 w-2 bg-[#E5DECE]"
          }`}
        />
      ))}
    </div>
  );
}

/* ── Flashcard Component ── */
function FlashcardDisplay({
  card,
  onFlip,
  flipped,
}: {
  card: Flashcard;
  onFlip: () => void;
  flipped: boolean;
}) {
  const isQuiz = card.type === "quiz";
  const showAnswer = isQuiz && flipped;
  const CardIcon = card.icon;

  return (
    <div
      className="w-full max-w-lg rounded-2xl border border-[#D4AF37]/35 bg-white p-7 shadow-xl shadow-[#D4AF37]/10"
      role="region"
      aria-label={`Thẻ tri thức: ${
        card.type === "quiz"
          ? "Câu đố"
          : card.type === "fact"
          ? "Tri thức"
          : "Câu chuyện"
      }`}
    >
      {/* Type badge */}
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#FAF8F5] text-[#9E2A2B] border border-[#E5DECE]">
          <CardIcon className="h-4 w-4" />
        </div>
        <span
          className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
            card.type === "quiz"
              ? "bg-[#FEF3C7] text-[#D97706]"
              : card.type === "fact"
              ? "bg-[#DCFCE7] text-[#16A34A]"
              : "bg-[#EFF6FF] text-[#2563EB]"
          }`}
        >
          {card.type === "quiz"
            ? "Câu đố di sản"
            : card.type === "fact"
            ? "Tri thức cổ phục"
            : "Điển tích văn hóa"}
        </span>
      </div>

      {/* Content */}
      {isQuiz ? (
        <div>
          <p className="font-playfair text-lg font-bold leading-snug text-[#1E3A5F]">
            {card.question}
          </p>
          {showAnswer ? (
            <div className="mt-4 rounded-xl border border-[#D4AF37]/30 bg-[#D4AF37]/10 p-4">
              <p className="flex items-start gap-2 text-sm leading-relaxed text-[#1E3A5F]">
                <Lightbulb className="h-4 w-4 text-[#D97706] shrink-0 mt-0.5" />
                <span>{card.answer}</span>
              </p>
            </div>
          ) : (
            <button
              type="button"
              onClick={onFlip}
              className="mt-4 flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl border border-[#D4AF37]/50 bg-[#FAF8F5] px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-[#9E2A2B] transition-all hover:bg-[#D4AF37]/15 focus-visible:outline-2 focus-visible:outline-[#D4AF37]"
              aria-label="Lật thẻ để xem giải đáp"
            >
              <span>Lật thẻ xem giải đáp</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      ) : (
        <p className="text-sm leading-relaxed text-[#4A6A8F] sm:text-base">
          {card.content}
        </p>
      )}

      {card.source && (
        <p className="mt-4 text-[10px] italic text-[#C0B8A8]">
          Nguồn: {card.source}
        </p>
      )}
    </div>
  );
}

/* ── Main HeritageFlashcards component ── */
export function HeritageFlashcards() {
  const { dispatch } = useStylist();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [elapsed, setElapsed] = useState(0); // seconds elapsed
  const TOTAL_DURATION = 5; // seconds before completion

  // Auto-advance flashcard every 2.2s
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % FLASHCARDS.length);
      setFlipped(false);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  // Progress counter
  useEffect(() => {
    const timer = setInterval(() => {
      setElapsed((prev) => {
        if (prev >= TOTAL_DURATION) {
          clearInterval(timer);
          return TOTAL_DURATION;
        }
        return prev + 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Auto complete after TOTAL_DURATION
  const handleDone = useCallback(() => {
    dispatch({ type: "STOP_PROCESSING" });
  }, [dispatch]);

  useEffect(() => {
    if (elapsed >= TOTAL_DURATION) {
      handleDone();
    }
  }, [elapsed, handleDone]);

  const currentCard = FLASHCARDS[currentIndex];
  const progressPercent = Math.min((elapsed / TOTAL_DURATION) * 100, 100);

  return (
    <div
      className="paper-bg flex min-h-[500px] flex-col items-center justify-center gap-8 rounded-2xl border border-[#E5DECE] bg-[#FAF8F5] p-6 text-center shadow-inner sm:p-10"
      aria-live="polite"
      aria-label="Đang tổng hợp phong cách và kiểm định văn hóa"
      role="status"
    >
      {/* Loading header */}
      <div className="flex flex-col items-center gap-3">
        <div className="relative flex h-16 w-16 items-center justify-center">
          <Loader2 className="h-16 w-16 animate-spin text-[#D4AF37]" strokeWidth={1.5} />
          <div className="absolute inset-0 flex items-center justify-center">
            <Sparkles className="h-6 w-6 text-[#9E2A2B]" />
          </div>
        </div>

        <div>
          <h2 className="font-playfair text-2xl font-bold text-[#1E3A5F]">
            Đang Dệt Phong Cách Di Sản
          </h2>
          <p className="mt-1 text-xs text-[#4A6A8F]">
            AI đang phân tích quy thức trang phục và tính toán điểm số Cultural Guardrail…
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full max-w-md">
        <div className="flex justify-between text-[11px] font-semibold text-[#4A6A8F] mb-1.5">
          <span>Tiến trình hoàn tất</span>
          <span className="text-[#D4AF37]">{Math.round(progressPercent)}%</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-[#E5DECE]">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#9E2A2B] via-[#D4AF37] to-[#E8CC6E] transition-all duration-1000 ease-linear shadow-xs"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Flashcard container */}
      <FlashcardDisplay
        card={currentCard}
        flipped={flipped}
        onFlip={() => setFlipped((prev) => !prev)}
      />

      {/* Progress dots indicator */}
      <ProgressDots total={FLASHCARDS.length} current={currentIndex} />
    </div>
  );
}

export default HeritageFlashcards;
