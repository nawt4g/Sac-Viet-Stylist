/**
 * app/stylist/page.tsx
 * =====================
 * Wizard Studio 3 bước — Trang chính.
 *
 * Architecture:
 *   - StylistProvider wraps everything (Client)
 *   - WizardShell renders the step-based UI (Client)
 *   - Each step component is lazy-rendered based on currentStep
 *   - HeritageFlashcards replaces content when isProcessing = true
 *
 * SSG note: This page is dynamic (uses client state) but no server data fetching needed.
 */

import type { Metadata } from "next";
import { StylistProvider } from "@/context/StylistContext";
import { WizardShell } from "@/components/stylist/WizardShell";

/* ── Page metadata ── */
export const metadata: Metadata = {
  title: "AI Stylist — Wizard Phối Cổ Phục 3 Bước",
  description:
    "Phối cổ phục Việt Nam đương đại qua 3 bước đơn giản: Nhận diện tông da, chọn cổ phục và ngữ cảnh, mix phụ kiện Gen Z và kiểm tra chuẩn mực văn hóa.",
  robots: { index: true, follow: true },
};

/* ── Page component (Server) ── */
export default function StylistPage() {
  return (
    <StylistProvider>
      <WizardShell />
    </StylistProvider>
  );
}
