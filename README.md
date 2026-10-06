# 🪷 SẮC VIỆT STYLIST — VIỆT PHỤC REMIX

> Nền tảng khám phá, phối đồ và giải mã văn hóa cổ phục Việt Nam dành cho thế hệ trẻ — Cuộc thi **"Việt phục Remix"**.

---

## 🌟 Tính năng Cốt lõi (Core Features)

1. **🎨 Phân tích sắc tố da & gợi ý bảng màu:** Phân tích sắc tố người dùng (Warm/Cool/Neutral) và gợi ý phối màu cổ phục tôn dáng, tôn da theo phong cách Ngũ Hành và truyền thống Việt.
2. **🛡️ Màng lọc Văn hóa (Cultural Guardrails):** Hệ thống tự động đối soát quy thức trang phục (quy tắc vạt áo, độ trang trọng theo ngữ cảnh tôn nghiêm/đời thường) với 3 cấp độ cảnh báo trực quan `Xanh - Vàng - Đỏ` kèm nút **1-Click Fix** (Tự động sửa lỗi văn hóa nhanh).
3. **👗 Studio Phối đồ Trực tiếp (Live Preview & Visual Breakdown):** Hiển thị trực quan look phối đồ và flatlay trang sức, phụ kiện. Hỗ trợ so sánh phương án A/B và phân tích chi tiết từng lớp trang phục.
4. **📜 Thẻ Di sản Kỹ thuật số (Heritage Card 3D):** Trải nghiệm thẻ lật 3D giải mã ý nghĩa đồ án hoa văn, triều đại và điển tích lịch sử của từng món phục trang.
5. **📸 Xuất thẻ Lookbook:** Render trực tiếp DOM thành ảnh tỉ lệ 9:16 trên thiết bị người dùng, sẵn sàng chia sẻ lên Story mạng xã hội chỉ với 1 chạm.

---

## 🛠️ Ngăn xếp Công nghệ (Tech Stack)

Dự án được xây dựng trên nền tảng công nghệ hiện đại nhất:

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router & Turbopack)
- **Core Library:** [React 19](https://react.dev/) + TypeScript
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) (Khai báo token thiết kế Neo-Heritage trực tiếp trong `@theme` tại `globals.css`)
- **UI Components:** [shadcn/ui](https://ui.shadcn.com/)
- **Animation:** [Framer Motion](https://www.framer.com/motion/) (Tự động thích ứng với thiết lập `prefers-reduced-motion`)
- **Icons:** [Lucide React](https://lucide.dev/) (Chuẩn hóa toàn bộ icon hệ thống, loại bỏ hoàn toàn emoji)
- **DOM to Image:** `html-to-image` (Xuất thẻ Lookbook chất lượng cao trên client-side)

---

## 🖼️ Hướng dẫn Quản lý & Đồng bộ Ảnh (Dành cho Giám khảo & Lập trình viên)

Dự án trang bị sẵn hệ thống Manifest hình ảnh tự động (`src/data/imageManifest.ts`) và cơ chế Fallback mượt mà (Zero Layout Shift) thông qua `ImageSlot`:

### Thêm ảnh mới vào dự án:
1. Thả các file ảnh `.webp` hoặc `.png` trực tiếp vào thư mục `public/images/`.
2. Quy ước đặt tên file chuẩn hóa theo cú pháp:
   - Ảnh look người mẫu: `[costume-id]-[color]-[context-id].webp` *(Ví dụ: `ao-ngu-than-navy-dao-pho.webp`)*
   - Ảnh flatlay trang phục: `flatlay-[costume-id].webp` *(Ví dụ: `flatlay-ao-ngu-than.webp`)*
   - Ảnh bối cảnh: `scene-[context-id].webp` *(Ví dụ: `scene-van-mieu.webp`)*
   - Ảnh phụ kiện: `acc-[accessory-id].webp` *(Ví dụ: `acc-khan-van-nam.webp`)*

### Chạy lệnh đồng bộ tự động:
Sau khi thêm ảnh mới, chạy lệnh sau trong terminal:
```bash
npm run images:sync
```
Lệnh này kích hoạt script `scripts/sync-images.mjs` quét thư mục `public/images/`, tự động cập nhật cờ `available: true` trong `src/data/imageManifest.ts` mà không cần cấu hình thủ công.

---

## 📁 Cấu trúc Thư mục Dự án

```text
Sac-Viet-Stylist/
├── public/                 # Tài nguyên tĩnh
│   ├── images/             # Ảnh phục trang, flatlay, phụ kiện và bối cảnh
│   └── hero-editorial.png  # Ảnh banner Hero tạp chí nghệ thuật
├── scripts/
│   └── sync-images.mjs     # Script tự động quét và đồng bộ Image Manifest
├── src/
│   ├── app/                # Next.js App Router (page.tsx, stylist/page.tsx, globals.css)
│   ├── components/
│   │   ├── home/           # Các component trang chủ (HeroSection, HeritageTopicGrid, LookbookPreview...)
│   │   ├── stylist/        # Luồng wizard phối đồ 3 bước & LiveOutfitPreview
│   │   ├── result/         # VisualBreakdown, CulturalGuardrailBanner, HeritageCard3D, ExportLookbookModal...
│   │   ├── common/         # ImageSlot, Header, Footer
│   │   ├── icons/          # Bản đồ định danh icon Lucide chuẩn hóa
│   │   ├── seo/            # JsonLd structured data
│   │   └── ui/             # shadcn/ui primitives
│   ├── context/            # StylistContext (State management toàn cục)
│   ├── data/               # costumes.ts, imageManifest.ts, mockData.ts
│   ├── lib/                # images.ts, utils.ts
│   └── types/              # stylist.ts, costumes.ts
└── docs/
    └── CULTURAL_REVIEW.md  # Báo cáo đối chiếu lịch sử và quy thức văn hóa Việt
```

---

## ⚖️ Tuyên bố Bản quyền & Nguồn gốc Hình ảnh

> **Thông cáo:** Hệ thống hình ảnh minh họa do AI tạo (Google Gemini) và đã qua kiểm duyệt đối chiếu tài liệu văn hóa.
> 
> Mọi chi tiết phục trang, hoa văn và quy thức đều được tham chiếu từ các tư liệu lịch sử (*Khâm Định Đại Nam Hội Điển Sự Lệ*, *Ngàn Năm Áo Mũ*...) nhằm đảm bảo tính thẩm mỹ đương đại song hành cùng lòng tôn kính di sản văn hóa Việt Nam.