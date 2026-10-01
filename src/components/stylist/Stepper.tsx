"use client";

/**
 * components/stylist/Stepper.tsx
 * ==============================
 * Thanh tiến trình Wizard 3 bước với viền vàng kim #D4AF37.
 * Hiển thị: completed (checkmark) | active (pulse ring) | pending (muted)
 * Click để navigate về step đã hoàn thành.
 */

import { Check } from "lucide-react";
import { useStylist } from "@/context/StylistContext";
import type { WizardStep } from "@/context/StylistContext";

const STEPS: { step: WizardStep; label: string; sublabel: string; icon: string }[] = [
  { step: 1, label: "Sắc Da", sublabel: "Nhận diện tông màu", icon: "✦" },
  { step: 2, label: "Cổ Phục", sublabel: "Chọn & Ngữ cảnh", icon: "👘" },
  { step: 3, label: "Phụ Kiện", sublabel: "Mix & Kiểm định", icon: "⚡" },
];

export function Stepper() {
  const { state, goToStep } = useStylist();
  const { currentStep, completedSteps } = state;

  return (
    <nav
      aria-label="Tiến trình phối đồ 3 bước"
      className="w-full"
    >
      <ol
        className="flex items-center justify-between"
        role="list"
      >
        {STEPS.map(({ step, label, sublabel, icon }, index) => {
          const isCompleted = completedSteps.has(step);
          const isActive = currentStep === step;
          const isPending = !isCompleted && !isActive;
          const isClickable = isCompleted;

          return (
            <li
              key={step}
              className="flex flex-1 items-center"
              role="listitem"
            >
              {/* Step node */}
              <button
                id={`stepper-step-${step}`}
                type="button"
                onClick={() => isClickable && goToStep(step)}
                disabled={!isClickable}
                aria-current={isActive ? "step" : undefined}
                aria-label={`Bước ${step}: ${label} — ${isCompleted ? "Đã hoàn thành" : isActive ? "Đang thực hiện" : "Chưa bắt đầu"}`}
                className={`group flex flex-col items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:ring-offset-2 ${
                  isClickable ? "cursor-pointer" : "cursor-default"
                }`}
              >
                {/* Circle indicator */}
                <div className="relative flex items-center justify-center">
                  {/* Pulse ring for active step */}
                  {isActive && (
                    <span
                      className="absolute inset-0 -m-1 rounded-full border-2 border-[#D4AF37] animate-ping opacity-40"
                      aria-hidden="true"
                    />
                  )}

                  <div
                    className={`relative z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                      isCompleted
                        ? "border-[#D4AF37] bg-[#D4AF37] shadow-md shadow-[#D4AF37]/30"
                        : isActive
                        ? "border-[#D4AF37] bg-white shadow-lg shadow-[#D4AF37]/20"
                        : "border-[#E5DECE] bg-[#FAF8F5]"
                    }`}
                  >
                    {isCompleted ? (
                      <Check
                        className="h-5 w-5 text-[#1E3A5F]"
                        strokeWidth={2.5}
                        aria-hidden="true"
                      />
                    ) : (
                      <span
                        className={`font-playfair text-lg font-bold leading-none transition-colors duration-300 ${
                          isActive ? "text-[#9E2A2B]" : "text-[#C0B8A8]"
                        }`}
                        aria-hidden="true"
                      >
                        {step}
                      </span>
                    )}
                  </div>
                </div>

                {/* Label */}
                <div className="text-center">
                  <p
                    className={`text-sm font-semibold transition-colors duration-200 ${
                      isActive
                        ? "text-[#9E2A2B]"
                        : isCompleted
                        ? "text-[#1E3A5F]"
                        : "text-[#C0B8A8]"
                    }`}
                  >
                    {label}
                  </p>
                  <p
                    className={`text-[10px] transition-colors duration-200 ${
                      isActive || isCompleted
                        ? "text-[#6B7280]"
                        : "text-[#C0B8A8]"
                    }`}
                  >
                    {sublabel}
                  </p>
                </div>
              </button>

              {/* Connector line (not after last step) */}
              {index < STEPS.length - 1 && (
                <div
                  className="mx-2 flex-1 sm:mx-4"
                  aria-hidden="true"
                >
                  <div className="relative h-0.5 w-full overflow-hidden rounded-full bg-[#E5DECE]">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#D4AF37] to-[#E8CC6E] transition-all duration-500 ease-out"
                      style={{
                        width: isCompleted ? "100%" : "0%",
                      }}
                    />
                  </div>
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
