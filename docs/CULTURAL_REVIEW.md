# Báo Cáo Rà Soát Dữ Liệu Văn Hóa (Cultural Review Dossier)
**Dự án:** Sắc Việt Stylist — Cuộc thi "Việt phục Remix"  
**Thời điểm lập:** Tháng 10/2026  
**Người lập:** Agent 1 — Foundation  
**Mục đích:** Liệt kê toàn bộ các nghi vấn, mâu thuẫn học thuật và sai lệch lịch sử phát hiện được trong cơ sở dữ liệu và mã nguồn cũ của dự án để hội đồng cố vấn văn hóa / con người độc lập thẩm định và hiệu đính sau.  
> **Nguyên tắc nền tảng:** *Hệ thống AI không tự ý sửa đổi ý nghĩa văn hóa cũ khi chưa có sự phê duyệt của chuyên gia di sản.*

---

## 1. Nghi vấn Trọng Tâm 1: Áo Tấc bị mô tả là "áo ngũ thân ngắn"

### Vị trí phát hiện trong mã nguồn
- `src/data/mockData.ts` (dòng 42–46):
  ```typescript
  export const costumeAoTac: BaseCostume = {
    name: "Áo Tấc",
    nameEn: "Short Heritage Tunic",
    type: "ao_tac",
    description: "Áo Tấc — còn gọi là áo ngũ thân ngắn — phổ biến trong dân gian thế kỷ 18–20. Thân ngắn hơn áo dài, thường mặc với quần lụng trắng. Linh hoạt hơn Ngũ Thân, phù hợp nhiều hoạt động đời thường.",
    region: "north",
  ```
- `src/components/stylist/StepCostumeContext.tsx` (dòng 54–64):
  ```typescript
  {
    id: "ao-tac",
    name: "Áo Tấc",
    nameEn: "Short Heritage Tunic",
    description: "Ngắn hơn · Linh hoạt · Đời thường",
  }
  ```

### Phân tích sai lệch văn hóa & Lịch sử
1. **Bản chất trang phục:**
   - Trong lịch sử trang phục triều Nguyễn, **Áo Tấc chính là Áo ngũ thân tay thụng** (tay áo may rộng một tấc vải ~ 30–40 cm theo lối đo cổ truyền).
   - Chiều dài thân áo của Áo Tấc dài qua đầu gối, hoàn toàn tương đương với Áo ngũ thân tay chẽn, **hoàn toàn không phải là áo "ngắn" hay "thân ngắn hơn áo dài"**.
2. **Cấp độ trang trọng:**
   - Áo Tấc không phải là thường phục dân gian tiện lợi cho sinh hoạt lao động hàng ngày. Ngược lại, Áo Tấc là **LỄ PHỤC TRANG TRỌNG** bậc nhất của toàn dân thời Nguyễn (từ thứ dân, sĩ phu cho đến hoàng thân quốc thích).
   - Áo Tấc được mặc vào các dịp đại lễ: cúng tế trời đất, giỗ chạp tổ tiên, hôn lễ (lễ cưới), lễ tiết triều đình và bái kiến bề trên. Đi kèm với áo tấc luôn là khăn đóng (hoặc khăn vấn) và quần trắng.
   - Trang phục sinh hoạt hàng ngày thanh thoát, gọn gàng thực chất là **Áo ngũ thân tay chẽn** (tay hẹp ôm sát cánh tay).

### Kiến nghị cho Hội đồng Thẩm định
- [ ] Đính chính tên tiếng Anh: Thay `Short Heritage Tunic` bằng `Wide-Sleeve Heritage Robe (Áo Tấc)`.
- [ ] Đính chính phần mô tả: Khẳng định Áo Tấc là lễ phục tay thụng thời Nguyễn, không dùng từ "ngắn hơn" hay "áo ngắn".
- [ ] Phân loại ngữ cảnh: Đưa Áo Tấc vào nhóm ưu tiên cho nghi lễ, cưới hỏi, cúng tế, Văn Miếu thay vì nhóm dạo phố tiện lợi.

---

## 2. Nghi vấn Trọng Tâm 2: Ý nghĩa "Ngũ Luân" & "Ngũ Thường" trong 5 vạt Áo Ngũ Thân

### Vị trí phát hiện trong mã nguồn
- `src/data/mockData.ts` (dòng 30, dòng 64–70):
  ```typescript
  "gồm 5 vạt: 2 vạt trước, 2 vạt sau và 1 vạt con bên trong — 5 vạt tượng trưng cho ngũ luân (5 mối quan hệ: quân-thần, phụ-tử, phu-phụ, huynh-đệ, bằng hữu) và ngũ thường (nhân, nghĩa, lễ, trí, tín) trong Nho giáo."
  ```

### Phân tích tư liệu lịch sử
1. **Nguồn gốc kỹ thuật may:**
   - Theo các nhà nghiên cứu trang phục cổ Việt Nam (Trần Quang Đức — *Ngàn năm áo mũ*, Trịnh Bách, các nghệ nhân phục dựng cổ phục Huế): Khung cửi dệt truyền thống của người Việt xưa có khổ hẹp (chỉ khoảng 35–40 cm).
   - Để ghép thành một tấm áo phủ kín cơ thể và có thể cử động tự do, người xưa bắt buộc phải ghép hai khổ vải phía trước (vạt trước), hai khổ vải phía sau (vạt sau). Thêm vào đó, để che kín vùng ngực bên phải và cài nút dưới nách, họ đệm thêm một khổ vải bên trong gọi là **tiền thân hữu** hay **vạt con**. Vì vậy tạo nên cấu trúc 5 thân (ngũ thân).
2. **Tầng nghĩa triết lý và đạo đức:**
   - Diễn giải về "Ngũ luân" (quân-thần, phụ-tử, phu-phụ, huynh-đệ, bằng hữu) và "Ngũ thường" (nhân, nghĩa, lễ, trí, tín) là lớp nghĩa đạo lý Nho gia được tầng lớp nho sĩ và Nho học thời Nguyễn lồng ghép vào trang phục để răn dạy người mặc.
   - Dân gian còn một lớp nghĩa phổ biến khác: 4 vạt ngoài đại diện cho **Tứ thân phụ mẫu** (cha mẹ đẻ và cha mẹ vợ/chồng), vạt con nằm bên trong đại diện cho người mặc được cha mẹ yêu thương che chở; 5 chiếc cúc áo tượng trưng cho 5 đức tính người quân tử (Nhân - Lễ - Nghĩa - Trí - Tín).

### Kiến nghị cho Hội đồng Thẩm định
- [ ] Cung cấp góc nhìn toàn diện cho người dùng: Giới thiệu cả nguồn gốc kỹ thuật cắt may từ khổ vải truyền thống lẫn giá trị biểu tượng đạo đức nhân văn của tiền nhân, tránh diễn giải một chiều mang tính giáo điều.

---

## 3. Nghi vấn 3: Phân định vùng miền (Cultural Region) của Cổ phục

### Vị trí phát hiện trong mã nguồn
- `src/data/mockData.ts`:
  - `costumeNguThan.region = "central"` (Gán Áo Ngũ Thân cho miền Trung)
  - `costumeAoTac.region = "north"` (Gán Áo Tấc cho miền Bắc)

### Phân tích tư liệu lịch sử
1. **Quá trình định hình Quốc phục:**
   - Năm 1744, Chúa Nguyễn Phúc Khoát ban hành lệnh cải cách trang phục ở Đàng Trong, chính thức hóa Áo Ngũ Thân cài nút bên phải.
   - Đến thời vua Minh Mạng (triều Nguyễn), nhà vua đã liên tục ban hành các chỉ dụ (nổi tiếng nhất là chỉ dụ năm 1827 và 1837) thống nhất y phục từ sông Gianh trở ra Bắc: nam phụ lão ấu cả nước đều mặc chung quy chuẩn Áo Ngũ Thân (bao gồm cả tay chẽn và tay thụng).
   - Do đó, Áo Ngũ Thân và Áo Tấc không phải là y phục riêng của miền Trung hay miền Bắc, mà là **Quốc phục chung của người Việt trên toàn cõi ba miền** trong hơn hai thế kỷ.

### Kiến nghị cho Hội đồng Thẩm định
- [ ] Cập nhật trường `region` của Áo Ngũ Thân và Áo Tấc thành `all` (Toàn quốc) hoặc ghi rõ xuất xứ gốc thời Nguyễn nhưng phổ quát toàn quốc.

---

## 4. Nghi vấn 4: Thời kỳ lịch sử của Áo Tứ Thân

### Vị trí phát hiện trong mã nguồn
- `src/components/stylist/StepCostumeContext.tsx` (dòng 84):
  ```typescript
  dynasty: "Nhà Lê · Bắc Bộ"
  ```
- `src/types/stylist.ts` (dòng 28, 51):
  ```typescript
  period: "le"
  ```

### Phân tích tư liệu lịch sử
1. **Tính dân gian trường tồn:**
   - Áo Tứ Thân là trang phục lao động và lễ hội của tầng lớp bình dân vùng đồng bằng Bắc Bộ, có dấu vết từ thời Trần - Lê và tiếp tục phát triển rực rỡ qua thế kỷ 18, 19 cho đến tận đầu thế kỷ 20.
   - Việc chỉ ghi thời kỳ là "Nhà Lê" thu hẹp không gian văn hóa sống động của Áo Tứ Thân trong lịch sử dân gian Việt Nam.

### Kiến nghị cho Hội đồng Thẩm định
- [ ] Chuẩn hóa mô tả thời kỳ: `Dân gian Bắc Bộ · Thế kỷ 17–20` để phản ánh đúng tính kế thừa qua nhiều thời kỳ.

---

## 5. Nghi vấn 5: Tiêu chí Guardrail Văn hóa cho cuộc thi "Việt phục Remix"

### Vị trí phát hiện trong mã nguồn
- `src/data/mockData.ts` (Case 3):
  - Gán nhãn `RED: Vi phạm nghiêm trọng chuẩn mực văn hóa` khi người dùng phối áo cổ phục với quần short hoặc phụ kiện phá cách.

### Phân tích góc nhìn thời trang đương đại
1. **Mục tiêu cuộc thi:**
   - Dự án hướng tới cuộc thi **"Việt phục Remix"** dành cho học sinh, sinh viên và thế hệ Gen Z nhằm khám phá và đương đại hóa di sản văn hóa.
2. **Cân bằng giữa Tôn trọng Di sản & Tự do Sáng tạo:**
   - **Không gian Linh thiêng / Lễ nghi (Văn Miếu, chùa chiền, lễ hội tôn nghiêm):** Quần short, váy ngắn đi kèm cổ phục bị gắn cờ `RED` hoặc cảnh báo nghiêm ngặt là hoàn toàn chính xác.
   - **Không gian Sáng tạo / Sàn diễn nghệ thuật / Streetwear:** Cần có sự mềm dẻo (nhãn `YELLOW` hoặc `CREATIVE EXPERIMENT`) kèm theo lời giải thích mang tính giáo dục, hướng dẫn cách điệu trang nhã thay vì cấm đoán cực đoan khiến giới trẻ e ngại tiếp cận cổ phục.

### Kiến nghị cho Hội đồng Thẩm định
- [ ] Xây dựng hướng dẫn Guardrail phân biệt theo **Ngữ cảnh (Context-dependent)**:
  - Khi `context === "van-mieu"` hoặc `"ceremony"`: Áp dụng quy chuẩn nghiêm ngặt.
  - Khi `context === "dao-pho"` hoặc `"photoshoot"`: Nhắc nhở gợi ý phối đồ hài hòa, khuyến khích sáng tạo có hiểu biết.

---

## Bảng Tổng Hợp Kiểm Tra (Verification Checklist)

| Mục rà soát | Tình trạng hiện tại trong code | Hướng giải quyết đề xuất | Trạng thái |
| :--- | :--- | :--- | :--- |
| **Áo Tấc là ngũ thân ngắn** | Ghi "ngũ thân ngắn", "Short Heritage Tunic" | Sửa thành "Áo ngũ thân tay thụng, lễ phục trang trọng" | Chờ duyệt |
| **Ý nghĩa 5 vạt** | Gán cứng cho Nho giáo Ngũ Luân | Bổ sung nguồn gốc khổ dệt vải và Tứ thân phụ mẫu | Chờ duyệt |
| **Vùng miền Áo Ngũ Thân** | Gán riêng `central` hoặc `north` | Thống nhất là quốc phục chung toàn quốc (`all`) | Chờ duyệt |
| **Thời kỳ Áo Tứ Thân** | Gán cứng triều đại `le` | Mở rộng thành `Dân gian truyền thống thế kỷ 17–20` | Chờ duyệt |
| **Guardrail Gen Z Remix** | Phạt RED cứng nhắc với mọi đồ phối hiện đại | Linh hoạt theo ngữ cảnh không gian (linh thiêng vs sáng tạo) | Chờ duyệt |

---
*Tài liệu này được lưu trữ tại `docs/CULTURAL_REVIEW.md` phục vụ công tác đối soát chuyên môn.*

