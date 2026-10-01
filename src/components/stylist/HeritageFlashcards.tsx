"use client";

/**
 * components/stylist/HeritageFlashcards.tsx
 * ==========================================
 * Màn hình chờ thông minh khi isProcessing = true.
 * Xoay vòng các câu đố / tri thức di sản Việt mỗi 2 giây.
 *
 * Features:
 *   - Auto-advance every 2s
 *   - Animated progress bar
 *   - Simulated 5s processing then dispatch STOP_PROCESSING
 *   - Gold shimmer on card transition
 */

import { useEffect, useState, useCallback } from "react";
import { Loader2, BookOpen } from "lucide-react";
import { useStylist } from "@/context/StylistContext";

/* ── Heritage knowledge data ── */
interface Flashcard {
  id: string;
  type: "fact" | "quiz" | "story";
  question?: string;
  answer?: string;
  content: string;
  emoji: string;
  source?: string;
}

const FLASHCARDS: Flashcard[] = [
  {
    id: "fc-1",
    type: "fact",
    emoji: "👘",
    content:
      "Áo Ngũ Thân có 5 vạt tượng trưng cho Ngũ Luân — 5 mối quan hệ trong Nho giáo Việt: quân-thần, phụ-tử, phu-phụ, huynh-đệ, bằng hữu.",
    source: "Lê Quý Đôn — Phủ Biên Tạp Lục",
  },
  {
    id: "fc-2",
    type: "quiz",
    emoji: "🧠",
    question: "Tại sao Áo Nhật Bình có cổ vuông?",
    answer:
      "Cổ vuông (chữ nhật) của Nhật Bình tượng trưng cho \"đất\" trong triết lý Thiên-Địa-Nhân — đối lập với cổ tròn của vua (tượng trưng cho trời).",
    content: "Nhấn để xem đáp án",
  },
  {
    id: "fc-3",
    type: "fact",
    emoji: "🎨",
    content:
      "Màu vàng trong cổ phục Việt thuộc về hoàng tộc dưới thời Nguyễn. Người dân bình thường mặc tông lam, nâu, đen. Nay màu vàng đã được tự do hóa trong ứng dụng đương đại.",
    source: "Viện Nghiên cứu Văn hóa Quốc gia",
  },
  {
    id: "fc-4",
    type: "story",
    emoji: "📖",
    content:
      "Áo Tứ Thân gắn liền với hình ảnh người phụ nữ Bắc Bộ — 4 vạt và dải lụa buộc chéo thể hiện sự khéo léo, đảm đang. Thường mặc khi hát Quan họ Bắc Ninh.",
  },
  {
    id: "fc-5",
    type: "fact",
    emoji: "🌿",
    content:
      "Lụa tơ tằm Hà Đông nổi tiếng từ thế kỷ 13. Chất lụa mỏng nhẹ, thoáng mát vào mùa hè và ấm áp vào mùa đông — lý tưởng cho cổ phục mọi mùa.",
  },
  {
    id: "fc-6",
    type: "quiz",
    emoji: "🏛️",
    question: "Khi thăm Văn Miếu, trang phục nào KHÔNG phù hợp?",
    answer:
      "Quần short, váy ngắn trên gối, trang phục hở vai và màu sắc quá sặc sỡ đều không phù hợp. Nên mặc kín đáo, màu trầm thể hiện sự tôn kính.",
    content: "Nhấn để xem đáp án",
  },
  {
    id: "fc-7",
    type: "fact",
    emoji: "✦",
    content:
      "Phong trào Cổ phục Việt bùng nổ từ 2018 — thế hệ Gen Z Việt Nam là lực lượng tiên phong đưa cổ phục trở lại đời sống đương đại qua mạng xã hội.",
  },
  {
    id: "fc-8",
    type: "story",
    emoji: "🦢",
    content:
      "Chim Phượng Hoàng thêu trên Áo Nhật Bình tượng trưng cho phẩm giá, đức hạnh và vẻ đẹp của người phụ nữ. Mỗi đường thêu được thực hiện thủ công, mất hàng tuần.",
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
    <div className="flex items-center justify-center gap-1.5" role="tablist" aria-label="Thẻ tri thức">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          role="tab"
          aria-selected={i === current}
          aria-label={`Thẻ ${i + 1}${i === current ? " — đang hiển thị" : ""}`}
          className={`rounded-full transition-all duration-300 ${
            i === current
              ? "h-2 w-6 bg-[#D4AF37]"
              : "h-2 w-2 bg-[#E5DECE]"
          }`}
        />
      ))}
    </div>
  );
}

/* ── Flashcard component ── */
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

  return (
    <div
      className="w-full max-w-lg rounded-2xl border border-[#D4AF37]/30 bg-white p-7 shadow-xl shadow-[#D4AF37]/10"
      role="region"
      aria-label={`Thẻ tri thức: ${card.type === "quiz" ? "Câu đố" : card.type === "fact" ? "Sự kiện" : "Câu chuyện"}`}
    >
      {/* Type badge */}
      <div className="mb-4 flex items-center gap-2">
        <span className="text-2xl" aria-hidden="true">{card.emoji}</span>
        <span
          className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest ${
            card.type === "quiz"
              ? "bg-[#FEF3C7] text-[#D97706]"
              : card.type === "fact"
              ? "bg-[#DCFCE7] text-[#16A34A]"
              : "bg-[#EFF6FF] text-[#2563EB]"
          }`}
        >
          {card.type === "quiz"
            ? "🧠 Câu đố"
            : card.type === "fact"
            ? "✦ Tri thức"
            : "📖 Câu chuyện"}
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
              <p className="text-sm leading-relaxed text-[#1E3A5F]">
                💡 {card.answer}
              </p>
            </div>
          ) : (
            <button
              type="button"
              onClick={onFlip}
              className="mt-4 flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-[#D4AF37]/40 bg-[#FAF8F5] px-4 py-2.5 text-sm font-medium text-[#D4AF37] transition-all hover:bg-[#D4AF37]/10 focus-visible:outline-2 focus-visible:outline-[#D4AF37]"
              aria-label="Lật thẻ để xem đáp án"
            >
              Lật thẻ xem đáp án →
            </button>
          )}
        </div>
      ) : (
        <p className="text-base leading-relaxed text-[#4A6A8F]">
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
  const TOTAL_DURATION = 6; // seconds before auto-complete

  // Auto-advance flashcard every 2s
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % FLASHCARDS.length);
      setFlipped(false);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Progress counter
  useEffect(() => {
    const timer = setInterval(() => {
      setElapsed((prev) => {
        if (prev >= TOTAL_DURATION) {
          clearInterval(timer);
          dispatch({ type: "STOP_PROCESSING" });
          return prev;
        }
        return prev + 0.1;
      });
    }, 100);
    return () => clearInterval(timer);
  }, [dispatch]);

  const progressPercent = Math.min((elapsed / TOTAL_DURATION) * 100, 100);
  const currentCard = FLASHCARDS[currentIndex];

  return (
    <div
      className="flex min-h-[60vh] flex-col items-center justify-center gap-8 px-4 py-12"
      role="status"
      aria-live="polite"
      aria-label="Đang tạo gợi ý phối đồ — đang tải"
    >
      {/* Spinner + title */}
      <div className="text-center">
        <div className="relative mx-auto mb-5 flex h-16 w-16 items-center justify-center">
          <div
            className="absolute inset-0 rounded-full border-4 border-[#D4AF37]/20"
            aria-hidden="true"
          />
          <Loader2
            className="h-8 w-8 animate-spin text-[#D4AF37]"
            aria-hidden="true"
          />
        </div>
        <h2 className="font-playfair text-xl font-bold text-[#1E3A5F]">
          Đang Dệt Gợi Ý Của Bạn
        </h2>
        <p className="mt-2 text-sm text-[#4A6A8F]">
          AI đang kiểm định văn hóa và tạo phong cách phù hợp nhất…
        </p>
      </div>

      {/* Progress bar */}
      <div
        className="w-full max-w-lg"
        role="progressbar"
        aria-valuenow={Math.round(progressPercent)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Tiến trình xử lý: ${Math.round(progressPercent)}%`}
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-[#6B7280]">Đang phân tích…</span>
          <span className="text-xs font-semibold text-[#D4AF37]">
            {Math.round(progressPercent)}%
          </span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-[#E5DECE]">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#9E2A2B] to-[#D4AF37] transition-all duration-100 ease-linear"
            style={{ width: `${progressPercent}%` }}
            aria-hidden="true"
          />
        </div>
      </div>

      {/* Flashcard */}
      <FlashcardDisplay
        card={currentCard}
        flipped={flipped}
        onFlip={() => setFlipped(true)}
      />

      {/* Progress dots */}
      <ProgressDots total={FLASHCARDS.length} current={currentIndex} />

      {/* Knowledge counter */}
      <div className="flex items-center gap-2 rounded-full border border-[#E5DECE] bg-white px-4 py-2">
        <BookOpen className="h-3.5 w-3.5 text-[#D4AF37]" aria-hidden="true" />
        <span className="text-xs text-[#6B7280]">
          Bạn đang đọc thẻ tri thức{" "}
          <strong className="text-[#1E3A5F]">{currentIndex + 1}/{FLASHCARDS.length}</strong>
        </span>
      </div>
    </div>
  );
}
