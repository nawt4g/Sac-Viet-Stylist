# 🪷 SẮC VIỆT STYLIST 

---

## 🌟 Tính năng Cốt lõi (Core Features)

1. **🎨 Phân tích sắc tố da (Undertone AI):** Sử dụng Gemini 1.5 Multimodal để đọc ảnh selfie, phân tích sắc tố da (Warm/Cool/Neutral) và đề xuất bảng màu cổ phục tôn vinh diện mạo người mặc.
2. **🛡️ Màng lọc Văn hóa (Cultural Guardrails):** Hệ thống tự động đối soát quy thức (ví dụ: vạt phải đè vạt trái, quy tắc ăn mặc nơi tôn nghiêm) và cảnh báo rủi ro qua 3 cấp độ `(Xanh - Vàng - Đỏ)` kèm tính năng **1-Click Fix** (Tự động sửa lỗi văn hóa).
3. **👗 Visual Mockup Studio:** Khởi tạo ảnh phối đồ toàn thân chất lượng cao qua engine AI (Flux) với độ trễ thấp, hỗ trợ tính năng thanh trượt so sánh A/B trực quan.
4. **📜 Thẻ Di sản Kỹ thuật số (Heritage Card):** Trải nghiệm thẻ lật 3D giải mã ý nghĩa đồ án hoa văn, triều đại và điển tích lịch sử của từng món trang phục.
5. **📸 Xuất thẻ Lookbook:** Render trực tiếp DOM thành ảnh tỉ lệ 9:16 trên máy người dùng, sẵn sàng chia sẻ lên Instagram Story / TikTok chỉ bằng 1 chạm.

---

## 🛠️ Ngăn xếp Công nghệ (Tech Stack)

Dự án được kiến trúc theo mô hình **Zero-Cost Serverless**, đảm bảo chi phí vận hành 0đ nhưng vẫn mang lại hiệu suất tối đa.

- **Framework chính:** Next.js 14 (App Router) + React 18 + TypeScript.
- **UI & Giao diện:** 
  - [Tailwind CSS](https://tailwindcss.com/) (Hệ thống lưới và Utility-first CSS).
  - [shadcn/ui](https://ui.shadcn.com/) (Bộ component xây dựng sẵn có thể tùy biến).
  - [Framer Motion](https://www.framer.com/motion/) (Xử lý animation, hiệu ứng lật thẻ 3D).
  - [Lucide React](https://lucide.dev/) (Bộ icon SVG tinh gọn).
- **Trí tuệ Nhân tạo (AI):**
  - **Logic & Guardrails:** `@google/genai` (Sử dụng model *Gemini 1.5 Flash*).
  - **Image Generation:** [Pollinations.ai](https://pollinations.ai/) (API sinh ảnh Flux 0đ không cần đăng ký).
- **Thư viện Hỗ trợ:**
  - `html-to-image`: Chụp ảnh DOM thẻ Lookbook.
  - `canvas-confetti`: Hiệu ứng chúc mừng khi tạo thành công bộ đồ hợp chuẩn.
- **Triển khai (Deployment):** Vercel (Hobby Tier).

---

## 📁 Cấu trúc Thư mục Hệ thống (Project Directory)

Toàn bộ mã nguồn dự án được tổ chức chặt chẽ bên trong thư mục `src/`:

```text
sac-viet-ai-stylist/
├── public/                 # Chứa tài nguyên tĩnh (không qua xử lý webpack)
│   ├── assets/             # Ảnh tĩnh: costumes (áo mẫu), fallbacks, patterns
│   └── audio/              # Chứa file nhạc demo lofi ca trù
│
├── src/
│   ├── app/                # 🌐 NƠI ĐỊNH TUYẾN & CHỨA API ROUTER
│   │   ├── api/            # (Backend) Chứa các route: /analyze-skin, /cultural-guardrail, /generate-mockup
│   │   ├── stylist/        # (Frontend) Trang làm việc chính chứa luồng phối đồ 3 bước
│   │   ├── layout.tsx      # Layout gốc của toàn ứng dụng
│   │   └── page.tsx        # Landing page giới thiệu (Hero section)
│   │
│   ├── components/         # 🧩 NƠI CHỨA CÁC KHỐI GIAO DIỆN (UI COMPONENTS)
│   │   ├── common/         # Các khối dùng chung (Header, Footer, Stepper)
│   │   ├── results/        # Các khối kết quả (Visual Mockup, Heritage Card, Guardrail Badge)
│   │   ├── ui/             # Các component cơ bản sinh ra từ shadcn/ui (Button, Card, Badge...)
│   │   └── wizard/         # Các form thuộc 3 bước cấu hình phối đồ
│   │
│   ├── config/             # 🗄️ NƠI CHỨA DỮ LIỆU TĨNH & CẤU HÌNH
│   │   ├── costumes.ts     # Dữ liệu tĩnh của 5 nhóm cổ phục & Triều đại
│   │   └── rules.ts        # Tập hợp quy tắc cho Màng lọc văn hóa
│   │
│   ├── context/            # 🧠 NƠI QUẢN LÝ STATE GLOBAL
│   │   └── StylistContext.tsx # Quản lý trạng thái luồng phối đồ xuyên suốt
│   │
│   ├── hooks/              # 🪝 NƠI CHỨA CUSTOM HOOKS (Logic React)
│   │   └── useMockupGenerator.ts
│   │
│   ├── lib/                # ⚙️ NƠI CHỨA LOGIC CỐT LÕI & TIỆN ÍCH
│   │   ├── ai/             # Khởi tạo SDK Gemini & quản lý System Prompts
│   │   ├── image-engine/   # Xử lý logic gọi sinh ảnh qua Pollinations
│   │   └── utils.ts        # Các hàm tiện ích (clsx, twMerge...)
│   │
│   └── types/              # 🏷️ NƠI ĐỊNH NGHĨA TYPESCRIPT INTERFACES
│       └── stylist.ts      # Khóa chặt Schema JSON đầu ra của LLM
│
├── .env.example            # File mẫu chứa các biến môi trường cần thiết
└── tailwind.config.ts      # Cấu hình màu sắc Neo-Heritage (Đỏ chu sa, Vàng kim...)