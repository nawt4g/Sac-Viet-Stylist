"use client";

/**
 * components/stylist/StepAccessoryMix.tsx
 * =========================================
 * Bước 3: Mix Phụ kiện Gen Z + Màng lọc Kiểm định Chuẩn mực Văn hóa.
 *
 * Yêu cầu đặc tả:
 *   - Thẻ phụ kiện dùng ảnh/icon từ getAccessoryImage.
 *   - Món có thuộc tính isRisky (dễ gây sai lệch văn hóa) hiển thị huy hiệu cảnh báo vàng/đỏ rõ ràng,
 *     nhưng KHÔNG chặn người dùng chọn (họ vẫn được tự do thử nghiệm).
 *   - Thay thế toàn bộ emoji bằng icon Lucide.
 *   - Touch target tối thiểu 44px tối ưu mobile, giữ nguyên a11y & aria-labels.
 */

import React from "react";
import {
  ChevronLeft,
  Wand2,
  ShieldCheck,
  AlertTriangle,
  X,
  CheckCircle2,
  Sparkles,
  Footprints,
  Glasses,
  ShoppingBag,
  Crown,
  Gem,
  Scissors,
  Feather,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  useStylist,
  ALL_ACCESSORIES,
  type AccessoryId,
  type Accessory,
} from "@/context/StylistContext";
import { ImageSlot } from "@/components/common/ImageSlot";
import { getAccessoryImage } from "@/lib/images";

/* ── Category group labels & icons (No emoji) ── */
const CATEGORY_META: Record<string, { label: string; icon: LucideIcon }> = {
  footwear: { label: "Giày Dép", icon: Footprints },
  eyewear: { label: "Kính Mắt", icon: Glasses },
  bag: { label: "Túi Xách", icon: ShoppingBag },
  neckwear: { label: "Khăn Cổ", icon: Feather },
  headwear: { label: "Đội Đầu", icon: Crown },
  jewelry: { label: "Trang Sức", icon: Gem },
  bottom: { label: "Quần & Váy", icon: Scissors },
};

/* ── Accessory Chip Button (Touch target >= 44px) ── */
function AccessoryChip({
  accessory,
  isSelected,
  onToggle,
}: {
  accessory: Accessory;
  isSelected: boolean;
  onToggle: () => void;
}) {
  const visual = getAccessoryImage(accessory.id);

  return (
    <button
      id={`accessory-${accessory.id}`}
      type="button"
      onClick={onToggle}
      aria-pressed={isSelected}
      aria-label={`${isSelected ? "Bỏ chọn" : "Chọn"} phụ kiện ${accessory.name}${
        accessory.isRisky
          ? " — Cảnh báo: món đồ này có thể kích hoạt màng lọc văn hóa mức đỏ/vàng"
          : ""
      }`}
      className={`group relative flex min-h-[96px] w-full flex-col items-center justify-between rounded-xl border-2 p-2.5 text-center transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold cursor-pointer ${
        isSelected
          ? accessory.isRisky
            ? "border-guardrail-red bg-guardrail-red-bg shadow-md ring-1 ring-guardrail-red"
            : "border-gold bg-gold/15 shadow-md ring-1 ring-gold"
          : accessory.isRisky
          ? "border-red-300 bg-red-50/50 hover:border-guardrail-red/60 hover:bg-guardrail-red-bg/40"
          : "border-paper-border bg-white hover:border-gold/60 hover:bg-paper"
      }`}
    >
      {/* Risky warning badge (giữ huy hiệu cảnh báo quan-short) */}
      {accessory.isRisky && (
        <span
          className="absolute -right-1 -top-1 z-10 flex h-5 px-1.5 items-center justify-center gap-0.5 rounded-full bg-guardrail-red text-[10px] font-bold text-white shadow-sm"
          title="Món đồ có nguy cơ kích hoạt guardrail văn hóa"
          aria-hidden="true"
        >
          <AlertTriangle className="h-3 w-3" />
          <span>Lưu ý</span>
        </span>
      )}

      {/* Selected checkmark indicator */}
      {isSelected && (
        <span
          className="absolute left-1.5 top-1.5 z-10 flex h-4 w-4 items-center justify-center rounded-full bg-gold"
          aria-hidden="true"
        >
          <CheckCircle2 className="h-3.5 w-3.5 text-ink" strokeWidth={2.5} />
        </span>
      )}

      {/* Accessory Image Slot */}
      <div className="relative aspect-square w-14 sm:w-16 overflow-hidden rounded-lg bg-paper">
        <ImageSlot
          src={visual.src}
          alt={accessory.name}
          available={visual.available}
          aspectRatio="1/1"
          fallbackTitle={accessory.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          quality={80}
        />
      </div>

      {/* Name */}
      <span
        className={`mt-1 text-[11px] font-semibold leading-tight line-clamp-1 ${
          isSelected
            ? accessory.isRisky
              ? "text-guardrail-red"
              : "text-ink"
            : "text-ink-muted"
        }`}
      >
        {accessory.name}
      </span>
    </button>
  );
}

/* ── Main Step Component ── */
export function StepAccessoryMix() {
  const { state, dispatch, prevStep } = useStylist();
  const { selectedAccessories, selectedContext } = state;

  const toggleAccessory = (id: AccessoryId) => {
    dispatch({ type: "TOGGLE_ACCESSORY", payload: id });
  };

  const handleStartProcessing = () => {
    dispatch({ type: "START_PROCESSING" });
  };

  // Group accessories by category
  const grouped = ALL_ACCESSORIES.reduce<Record<string, Accessory[]>>(
    (acc, item) => {
      if (!acc[item.category]) acc[item.category] = [];
      acc[item.category].push(item);
      return acc;
    },
    {}
  );

  // Selected items list
  const selectedList = ALL_ACCESSORIES.filter((a) =>
    selectedAccessories.has(a.id)
  );

  // Guardrail pre-calculation
  const hasRisky = selectedAccessories.has("quan-short");
  const isVanMieu = selectedContext === "van-mieu";
  const predictedStatus = hasRisky ? "RED" : isVanMieu ? "YELLOW" : "GREEN";

  const statusConfig = {
    GREEN: {
      color: "#16A34A",
      bg: "#DCFCE7",
      border: "#16A34A40",
      label: "Hài hòa chuẩn mực",
      desc: "Phối set trang nhã, sẵn sàng để xuất lookbook.",
    },
    YELLOW: {
      color: "#D97706",
      bg: "#FEF3C7",
      border: "#D9770640",
      label: "Chú ý ngữ cảnh",
      desc: "Văn Miếu yêu cầu trang nghiêm. AI sẽ đưa ra gợi ý tinh chỉnh.",
    },
    RED: {
      color: "#DC2626",
      bg: "#FEE2E2",
      border: "#DC262640",
      label: "Cần lưu ý văn hóa",
      desc: "Quần short kết hợp cổ phục dễ gây phản cảm. AI sẽ kích hoạt 1-Click Fix.",
    },
  }[predictedStatus];

  return (
    <div className="flex flex-col gap-8">
      {/* Step Header */}
      <div>
        <span className="inline-block rounded-full bg-gold/15 px-3 py-0.5 text-[11px] font-bold uppercase tracking-wider text-gold">
          Bước 3 / 3
        </span>
        <h2 className="font-playfair mt-1 text-2xl font-bold text-ink">
          Mix Phụ Kiện Đương Đại & Kiểm Định
        </h2>
        <p className="mt-1 text-xs text-ink-muted">
          Chọn các phụ kiện để hoàn thiện outfit. Hệ thống Cultural Guardrail sẽ tự động đánh giá độ phù hợp văn hóa.
        </p>
      </div>

      {/* Main Grid: Left Items + Right Summary */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* ── LEFT (col-span-8): Danh sách phụ kiện theo nhóm ── */}
        <div className="space-y-6 lg:col-span-8">
          {Object.entries(grouped).map(([category, items]) => {
            const meta = CATEGORY_META[category] ?? { label: category, icon: Sparkles };
            const CategoryIcon = meta.icon;

            return (
              <div key={category} className="rounded-xl border border-paper-border bg-white p-4 shadow-2xs">
                <div className="mb-3 flex items-center gap-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-md bg-paper text-crimson border border-paper-border">
                    <CategoryIcon className="h-3.5 w-3.5" />
                  </div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-ink">
                    {meta.label}
                  </h3>
                </div>

                <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                  {items.map((acc) => (
                    <AccessoryChip
                      key={acc.id}
                      accessory={acc}
                      isSelected={selectedAccessories.has(acc.id)}
                      onToggle={() => toggleAccessory(acc.id)}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* ── RIGHT (col-span-4): Preview Guardrail Tức Thời ── */}
        <div className="flex flex-col gap-4 lg:col-span-4">
          {/* Guardrail Live Status Card */}
          <div
            className="rounded-2xl border p-5 shadow-sm transition-all"
            style={{
              backgroundColor: statusConfig.bg,
              borderColor: statusConfig.border,
            }}
          >
            <div className="flex items-center gap-2">
              <ShieldCheck
                className="h-5 w-5 shrink-0"
                style={{ color: statusConfig.color }}
              />
              <h3
                className="font-playfair text-sm font-bold"
                style={{ color: statusConfig.color }}
              >
                Màng Lọc Văn Hóa
              </h3>
            </div>
            <p
              className="mt-2 text-base font-bold font-playfair"
              style={{ color: statusConfig.color }}
            >
              {statusConfig.label}
            </p>
            <p className="mt-1 text-xs leading-relaxed opacity-90" style={{ color: statusConfig.color }}>
              {statusConfig.desc}
            </p>
          </div>

          {/* Selected items chip box */}
          <div className="rounded-2xl border border-paper-border bg-white p-5 shadow-sm">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="font-playfair text-sm font-bold text-ink">
                Phụ kiện đã chọn
              </h3>
              <span className="rounded-full bg-paper px-2 py-0.5 text-xs font-bold text-crimson border border-paper-border">
                {selectedList.length} món
              </span>
            </div>

            {selectedList.length > 0 ? (
              <div className="flex flex-wrap gap-1.5 max-h-48 overflow-y-auto">
                {selectedList.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => toggleAccessory(item.id)}
                    className="inline-flex min-h-[36px] items-center gap-1.5 rounded-full border border-paper-border bg-paper px-3 py-1 text-xs font-semibold text-ink hover:bg-guardrail-red-bg hover:text-guardrail-red transition-colors cursor-pointer"
                    aria-label={`Bỏ chọn ${item.name}`}
                  >
                    <span>{item.name}</span>
                    <X className="h-3 w-3" />
                  </button>
                ))}
              </div>
            ) : (
              <p className="py-4 text-center text-xs italic text-muted-foreground">
                Chưa chọn món nào. Bạn có thể chọn hoặc bỏ qua để tiếp tục.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* ── FOOTER NAVIGATION (Touch target >= 44px) ── */}
      <div className="flex items-center justify-between border-t border-paper-border pt-6">
        <button
          type="button"
          onClick={prevStep}
          className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-paper-border bg-white px-6 py-2.5 text-xs font-bold text-ink transition-all hover:bg-paper focus-visible:outline-2 focus-visible:outline-gold cursor-pointer"
          aria-label="Quay lại Bước 2: Cổ phục & Ngữ cảnh"
        >
          <ChevronLeft className="h-4 w-4" />
          Quay lại Bước 2
        </button>

        <button
          id="btn-complete-styling"
          type="button"
          onClick={handleStartProcessing}
          className="inline-flex min-h-[48px] items-center gap-2 rounded-full bg-gradient-to-r from-crimson via-crimson-light to-crimson px-8 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-crimson/25 transition-all hover:shadow-xl hover:scale-[1.02] focus-visible:outline-2 focus-visible:outline-crimson cursor-pointer"
          aria-label="Hoàn tất và kiểm tra chuẩn mực văn hóa"
        >
          <Wand2 className="h-4 w-4" />
          <span>Kiểm Tra Chuẩn Mực & Xuất Lookbook</span>
        </button>
      </div>
    </div>
  );
}

export default StepAccessoryMix;
