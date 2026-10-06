"use client";

import type { OutfitResponse, CostumeId, ContextType } from "@/types/stylist";
import { OUTFIT_BY_STATUS } from "@/data/mockData";

export type { CostumeId, ContextType };

/**
 * context/StylistContext.tsx
 * ==========================
 * React Context + useReducer cho Wizard Studio 3 bước.
 * Toàn bộ wizard state được quản lý tập trung tại đây.
 * Client Component — dùng "use client" directive.
 */

import React, {
  createContext,
  useContext,
  useReducer,
  useCallback,
  type ReactNode,
} from "react";

/* ============================================================
   TYPE DEFINITIONS
   ============================================================ */

export type WizardStep = 1 | 2 | 3;

export type UndertoneType = "warm" | "cool" | "neutral" | null;

export interface UndertoneResult {
  type: UndertoneType;
  label: string;
  description: string;
  recommendedColors: ColorChip[];
  avoidColors: ColorChip[];
}

export interface ColorChip {
  hex: string;
  name: string;
  nameVi: string;
}

export interface SelectedCostume {
  id: CostumeId;
  name: string;
  nameEn: string;
  color: string; // selected color hex
}

export type WeatherPreset = "hanoi-hot" | "hanoi-cool" | "hcm-humid" | "danang-mild";

export interface WeatherInfo {
  preset: WeatherPreset;
  city: string;
  temp: number;
  condition: string;
  fabricSuggestion: string;
}

export type AccessoryId =
  | "loafer-den"
  | "kinh-ram"
  | "tui-tote"
  | "quan-short"
  | "khan-lua"
  | "khan-dau-riu"
  | "vong-tay"
  | "dep-sandal"
  | "giay-oxford"
  | "mu-beret";

export interface Accessory {
  id: AccessoryId;
  name: string;
  emoji: string;
  category: "footwear" | "eyewear" | "bag" | "bottom" | "headwear" | "jewelry" | "neckwear";
  isRisky?: boolean; // flags items that may trigger yellow/red guardrail
}

/* ── Wizard State ── */
export interface StylistState {
  // Step tracking
  currentStep: WizardStep;
  completedSteps: Set<WizardStep>;

  // Step 1 — Skin tone
  selfieImage: string | null;         // base64 or URL
  isScanning: boolean;                // laser scan animation active
  detectedUndertone: UndertoneResult | null;

  // Step 2 — Costume & Context
  selectedCostume: SelectedCostume | null;
  selectedContext: ContextType | null;
  selectedWeather: WeatherInfo | null;

  // Step 3 — Accessories
  selectedAccessories: Set<AccessoryId>;

  // Result generation
  isProcessing: boolean;              // loading/flashcard screen

  // Phase 4 — Result Dashboard
  resultOutfit: OutfitResponse | null;
  activeCase: "GREEN" | "YELLOW" | "RED";  // for demo switcher
}

/* ── Actions ── */
export type StylistAction =
  | { type: "GO_TO_STEP"; payload: WizardStep }
  | { type: "NEXT_STEP" }
  | { type: "PREV_STEP" }
  | { type: "SET_SELFIE"; payload: string }
  | { type: "USE_MODEL_SELFIE" }
  | { type: "START_SCAN" }
  | { type: "SCAN_COMPLETE"; payload: UndertoneResult }
  | { type: "SELECT_COSTUME"; payload: SelectedCostume }
  | { type: "SELECT_CONTEXT"; payload: ContextType }
  | { type: "SELECT_WEATHER"; payload: WeatherInfo }
  | { type: "TOGGLE_ACCESSORY"; payload: AccessoryId }
  | { type: "CLEAR_ACCESSORIES" }
  | { type: "START_PROCESSING" }
  | { type: "STOP_PROCESSING" }
  | { type: "SET_RESULT"; payload: OutfitResponse }
  | { type: "ONE_CLICK_FIX" }           // RED → GREEN by swapping accessory
  | { type: "SET_ACTIVE_CASE"; payload: "GREEN" | "YELLOW" | "RED" }
  | { type: "RESET" };

/* ============================================================
   INITIAL STATE
   ============================================================ */

const initialState: StylistState = {
  currentStep: 1,
  completedSteps: new Set(),
  selfieImage: null,
  isScanning: false,
  detectedUndertone: null,
  selectedCostume: null,
  selectedContext: null,
  selectedWeather: null,
  selectedAccessories: new Set(),
  isProcessing: false,
  resultOutfit: null,
  activeCase: "GREEN",
};

/* ============================================================
   REDUCER
   ============================================================ */

function stylistReducer(state: StylistState, action: StylistAction): StylistState {
  switch (action.type) {
    case "GO_TO_STEP":
      return { ...state, currentStep: action.payload };

    case "NEXT_STEP": {
      const next = Math.min(state.currentStep + 1, 3) as WizardStep;
      const completed = new Set(state.completedSteps);
      completed.add(state.currentStep);
      return { ...state, currentStep: next, completedSteps: completed };
    }

    case "PREV_STEP": {
      const prev = Math.max(state.currentStep - 1, 1) as WizardStep;
      return { ...state, currentStep: prev };
    }

    case "SET_SELFIE":
      return {
        ...state,
        selfieImage: action.payload,
        detectedUndertone: null,
        isScanning: false,
      };

    case "USE_MODEL_SELFIE":
      return {
        ...state,
        selfieImage: "/model-selfie-sample.jpg",
        detectedUndertone: null,
        isScanning: false,
      };

    case "START_SCAN":
      return { ...state, isScanning: true };

    case "SCAN_COMPLETE":
      return {
        ...state,
        isScanning: false,
        detectedUndertone: action.payload,
      };

    case "SELECT_COSTUME":
      return { ...state, selectedCostume: action.payload };

    case "SELECT_CONTEXT":
      return { ...state, selectedContext: action.payload };

    case "SELECT_WEATHER":
      return { ...state, selectedWeather: action.payload };

    case "TOGGLE_ACCESSORY": {
      const accessories = new Set(state.selectedAccessories);
      if (accessories.has(action.payload)) {
        accessories.delete(action.payload);
      } else {
        accessories.add(action.payload);
      }
      return { ...state, selectedAccessories: accessories };
    }

    case "CLEAR_ACCESSORIES":
      return { ...state, selectedAccessories: new Set() };

    case "START_PROCESSING":
      return { ...state, isProcessing: true };

    case "STOP_PROCESSING": {
      // When processing stops, derive result from wizard selections
      const hasRisky = state.selectedAccessories.has("quan-short");
      const isVanMieu = state.selectedContext === "van-mieu";
      const caseKey: "GREEN" | "YELLOW" | "RED" = hasRisky
        ? "RED"
        : isVanMieu
        ? "YELLOW"
        : "GREEN";
      return {
        ...state,
        isProcessing: false,
        activeCase: caseKey,
        resultOutfit: OUTFIT_BY_STATUS[caseKey],
        completedSteps: new Set([1, 2, 3] as WizardStep[]),
      };
    }

    case "SET_RESULT":
      return { ...state, resultOutfit: action.payload };

    case "ONE_CLICK_FIX": {
      // Swap RED → GREEN: remove quan-short, keep rest, load GREEN outfit
      const fixed = new Set(state.selectedAccessories);
      fixed.delete("quan-short");
      return {
        ...state,
        selectedAccessories: fixed,
        activeCase: "GREEN",
        resultOutfit: OUTFIT_BY_STATUS.GREEN,
      };
    }

    case "SET_ACTIVE_CASE":
      return {
        ...state,
        activeCase: action.payload,
        resultOutfit: OUTFIT_BY_STATUS[action.payload],
      };

    case "RESET":
      return {
        ...initialState,
        completedSteps: new Set<WizardStep>(),
        selectedAccessories: new Set<AccessoryId>(),
        resultOutfit: null,
        activeCase: "GREEN" as const,
      };

    default:
      return state;
  }
}

/* ============================================================
   MOCK DATA — Undertone results
   ============================================================ */

export const UNDERTONE_RESULTS: Record<NonNullable<UndertoneType>, UndertoneResult> = {
  warm: {
    type: "warm",
    label: "Warm Undertone — Tông Ấm",
    description:
      "Làn da bạn có ánh vàng/đào — hài hòa với các màu đất nung, nâu mật, đỏ son và vàng kim. Cổ phục tông trầm ấm sẽ làm rạng rỡ sắc da của bạn.",
    recommendedColors: [
      { hex: "#9E2A2B", name: "Crimson", nameVi: "Đỏ chu sa" },
      { hex: "#D4AF37", name: "Gold", nameVi: "Vàng kim" },
      { hex: "#8B4513", name: "Sienna", nameVi: "Nâu đất" },
      { hex: "#4A7856", name: "Forest", nameVi: "Xanh trầm" },
      { hex: "#C4813A", name: "Amber", nameVi: "Hổ phách" },
      { hex: "#1E3A5F", name: "Navy", nameVi: "Xanh lam sẫm" },
    ],
    avoidColors: [
      { hex: "#808080", name: "Gray", nameVi: "Xám lạnh" },
      { hex: "#C0C0C0", name: "Silver", nameVi: "Bạc" },
    ],
  },
  cool: {
    type: "cool",
    label: "Cool Undertone — Tông Lạnh",
    description:
      "Làn da bạn có ánh hồng/xanh — hài hòa với màu lam, tím, bạc và hồng phấn. Cổ phục tông lạnh sẽ làm nổi bật sự thanh lịch.",
    recommendedColors: [
      { hex: "#1E3A5F", name: "Navy", nameVi: "Xanh lam sẫm" },
      { hex: "#6B4C8F", name: "Purple", nameVi: "Tím hoàng gia" },
      { hex: "#2E8B8B", name: "Teal", nameVi: "Xanh ngọc" },
      { hex: "#C0C0C0", name: "Silver", nameVi: "Bạc" },
      { hex: "#F5F0E8", name: "Ivory", nameVi: "Trắng ngà" },
      { hex: "#8B6B8B", name: "Mauve", nameVi: "Hồng tím" },
    ],
    avoidColors: [
      { hex: "#C4813A", name: "Amber", nameVi: "Hổ phách" },
      { hex: "#8B4513", name: "Sienna", nameVi: "Nâu đất" },
    ],
  },
  neutral: {
    type: "neutral",
    label: "Neutral Undertone — Tông Trung Tính",
    description:
      "Bạn có tông da trung tính — linh hoạt phối được hầu hết màu sắc. Đây là loại tông da hiếm và lý tưởng nhất để phối cổ phục.",
    recommendedColors: [
      { hex: "#1A1A1A", name: "Black", nameVi: "Đen huyền" },
      { hex: "#F5F0E8", name: "Ivory", nameVi: "Trắng ngà" },
      { hex: "#9E2A2B", name: "Crimson", nameVi: "Đỏ chu sa" },
      { hex: "#D4AF37", name: "Gold", nameVi: "Vàng kim" },
      { hex: "#1E3A5F", name: "Navy", nameVi: "Xanh lam sẫm" },
      { hex: "#4A7856", name: "Forest", nameVi: "Xanh trầm" },
    ],
    avoidColors: [],
  },
};

/* ============================================================
   WEATHER PRESETS
   ============================================================ */

export const WEATHER_PRESETS: Record<WeatherPreset, WeatherInfo> = {
  "hanoi-hot": {
    preset: "hanoi-hot",
    city: "Hà Nội",
    temp: 28,
    condition: "Nắng nóng",
    fabricSuggestion: "Đũi tơ tằm, lụa mỏng — thoáng mát, thấm hút tốt",
  },
  "hanoi-cool": {
    preset: "hanoi-cool",
    city: "Hà Nội",
    temp: 18,
    condition: "Mát mẻ",
    fabricSuggestion: "Gấm dày, nhung, lụa dệt kép — ấm áp và trang trọng",
  },
  "hcm-humid": {
    preset: "hcm-humid",
    city: "TP. HCM",
    temp: 33,
    condition: "Nóng ẩm",
    fabricSuggestion: "Cotton cao cấp, linen — siêu thoáng, chống nhăn tốt",
  },
  "danang-mild": {
    preset: "danang-mild",
    city: "Đà Nẵng",
    temp: 24,
    condition: "Dịu mát",
    fabricSuggestion: "Lụa nhẹ, cotton pha — linh hoạt mọi hoạt động",
  },
};

/* ============================================================
   ACCESSORIES DATA
   ============================================================ */

export const ALL_ACCESSORIES: Accessory[] = [
  { id: "giay-oxford", name: "Oxford da đen", emoji: "👞", category: "footwear" },
  { id: "loafer-den", name: "Loafer lười đen", emoji: "🥿", category: "footwear" },
  { id: "dep-sandal", name: "Sandal da bò", emoji: "👡", category: "footwear" },
  { id: "kinh-ram", name: "Kính râm oversized", emoji: "🕶️", category: "eyewear" },
  { id: "tui-tote", name: "Túi tote canvas", emoji: "🛍️", category: "bag" },
  { id: "khan-lua", name: "Khăn lụa quàng cổ", emoji: "🧣", category: "neckwear" },
  { id: "khan-dau-riu", name: "Khăn đầu rìu", emoji: "🎀", category: "headwear" },
  { id: "mu-beret", name: "Mũ beret", emoji: "🎩", category: "headwear" },
  { id: "vong-tay", name: "Vòng tay ngọc bích", emoji: "💚", category: "jewelry" },
  { id: "quan-short", name: "Quần short", emoji: "🩳", category: "bottom", isRisky: true },
];

/* ============================================================
   CONTEXT
   ============================================================ */

interface StylistContextValue {
  state: StylistState;
  dispatch: React.Dispatch<StylistAction>;
  // Convenience helpers
  goToStep: (step: WizardStep) => void;
  nextStep: () => void;
  prevStep: () => void;
  simulateScan: () => Promise<void>;
  canProceedStep1: boolean;
  canProceedStep2: boolean;
  canProceedStep3: boolean;
}

const StylistContext = createContext<StylistContextValue | null>(null);

/* ============================================================
   PROVIDER
   ============================================================ */

export function StylistProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(stylistReducer, {
    ...initialState,
    completedSteps: new Set<WizardStep>(),
    selectedAccessories: new Set<AccessoryId>(),
  });

  const goToStep = useCallback(
    (step: WizardStep) => dispatch({ type: "GO_TO_STEP", payload: step }),
    []
  );

  const nextStep = useCallback(() => dispatch({ type: "NEXT_STEP" }), []);
  const prevStep = useCallback(() => dispatch({ type: "PREV_STEP" }), []);

  /** Mock scan — 1.4s laser animation then resolves with Warm Undertone */
  const simulateScan = useCallback(async () => {
    dispatch({ type: "START_SCAN" });
    await new Promise((r) => setTimeout(r, 1400));
    dispatch({
      type: "SCAN_COMPLETE",
      payload: UNDERTONE_RESULTS.warm, // always warm in mock
    });
  }, []);

  // Step gate conditions
  const canProceedStep1 = state.detectedUndertone !== null;
  const canProceedStep2 =
    state.selectedCostume !== null && state.selectedContext !== null;
  const canProceedStep3 = state.selectedAccessories.size >= 0; // always true, can submit empty

  return (
    <StylistContext.Provider
      value={{
        state,
        dispatch,
        goToStep,
        nextStep,
        prevStep,
        simulateScan,
        canProceedStep1,
        canProceedStep2,
        canProceedStep3,
      }}
    >
      {children}
    </StylistContext.Provider>
  );
}

/* ============================================================
   HOOK
   ============================================================ */

export function useStylist() {
  const ctx = useContext(StylistContext);
  if (!ctx) {
    throw new Error("useStylist must be used inside <StylistProvider>");
  }
  return ctx;
}
