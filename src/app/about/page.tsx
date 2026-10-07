import type { Metadata } from "next";
import { Sparkles, ShieldCheck, Heart } from "lucide-react";

export const metadata: Metadata = {
  title: "Về Sắc Việt & Cultural Methodology — Sắc Việt AI Stylist",
  description: "Tìm hiểu về sứ mệnh của Sắc Việt và cách hệ thống AI Stylist hoạt động để bảo vệ di sản văn hóa.",
};

export default function AboutPage() {
  return (
    <main className="flex-1 bg-[#FAF8F5] py-12 lg:py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <header className="mb-16 text-center">
          <h1 className="font-playfair text-4xl font-bold text-[#1E3A5F] sm:text-5xl">Về Sắc Việt</h1>
          <p className="mt-4 text-lg text-[#4A6A8F]">Mặc đẹp. Hiểu đúng. Giữ chất Việt.</p>
        </header>

        {/* Story Section */}
        <section className="mb-16 rounded-3xl bg-white p-8 shadow-sm lg:p-12">
          <div className="flex items-center gap-3 mb-6">
            <Heart className="h-6 w-6 text-[#9E2A2B]" />
            <h2 className="font-playfair text-2xl font-bold text-[#1E3A5F]">Câu chuyện của chúng tôi</h2>
          </div>
          <div className="space-y-4 text-[#4A6A8F] leading-relaxed">
            <p>
              Sắc Việt AI Stylist khởi nguồn từ một trăn trở: Làm sao để người trẻ Việt Nam có thể mặc cổ phục một cách hiện đại, tự tin mà không lo sợ vi phạm các chuẩn mực văn hóa lịch sử?
            </p>
            <p>
              Chúng tôi xây dựng Sắc Việt không chỉ là một công cụ AI tạo ảnh, mà là một nền tảng <strong>Cultural Advisor</strong> (Cố vấn Văn hóa). Chúng tôi tin rằng di sản chỉ thực sự sống khi nó được ứng dụng vào đời sống đương đại, và AI là cầu nối hoàn hảo để cá nhân hóa trải nghiệm đó.
            </p>
          </div>
        </section>

        {/* Methodology Section */}
        <section id="methodology" className="mb-16 rounded-3xl border border-[#D4AF37]/30 bg-[#FBF9F6] p-8 shadow-sm lg:p-12">
          <div className="flex items-center gap-3 mb-6">
            <ShieldCheck className="h-6 w-6 text-[#D4AF37]" />
            <h2 className="font-playfair text-2xl font-bold text-[#1E3A5F]">Cultural Methodology</h2>
          </div>
          <div className="space-y-6 text-[#4A6A8F] leading-relaxed">
            <p>
              Hệ thống của chúng tôi không để AI tự do tưởng tượng. Sắc Việt hoạt động dựa trên <strong>Curated Cultural Data</strong> (Dữ liệu văn hóa được kiểm duyệt) và <strong>Cultural Guardrails</strong> (Rào chắn văn hóa).
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="rounded-xl bg-white p-5 border border-[#E5DECE]">
                <h3 className="font-bold text-[#1E3A5F] mb-2">1. Dữ liệu tin cậy</h3>
                <p className="text-sm">Thông tin lịch sử và quy tắc mặc được đối chiếu từ các tài liệu chuẩn như Phủ Biên Tạp Lục và nghiên cứu của Viện VHNT Quốc gia.</p>
              </div>
              <div className="rounded-xl bg-white p-5 border border-[#E5DECE]">
                <h3 className="font-bold text-[#1E3A5F] mb-2">2. Rule Engine</h3>
                <p className="text-sm">Thay vì để LLM tự quyết định, chúng tôi dùng Rule Engine để bắt các vi phạm (ví dụ: mặc quần short với Áo Tấc sẽ tự động bị flag RED).</p>
              </div>
            </div>
            
            <div className="mt-4 p-4 rounded-xl bg-[#EFF3F8] text-sm text-[#1E3A5F] border border-[#1E3A5F]/20">
              <strong>Disclaimer:</strong> Sắc Việt nỗ lực cung cấp thông tin chính xác nhất, tuy nhiên AI có thể có sai sót. Hãy xem đây là công cụ tham khảo và luôn kiểm chứng với các nguồn học thuật khi cần thiết.
            </div>
          </div>
        </section>

        {/* Privacy Section */}
        <section id="privacy" className="rounded-3xl bg-white p-8 shadow-sm lg:p-12">
          <div className="flex items-center gap-3 mb-6">
            <Sparkles className="h-6 w-6 text-[#1E3A5F]" />
            <h2 className="font-playfair text-2xl font-bold text-[#1E3A5F]">Quyền riêng tư (Privacy)</h2>
          </div>
          <div className="space-y-4 text-[#4A6A8F] leading-relaxed">
            <p>
              Khi bạn tải ảnh lên để sử dụng AI Stylist, ảnh chỉ được sử dụng duy nhất cho mục đích tạo đề xuất phối đồ trong phiên làm việc hiện tại.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-sm mt-2">
              <li>Chúng tôi <strong>không</strong> lưu trữ ảnh cá nhân của bạn trên máy chủ sau khi tạo kết quả.</li>
              <li>Chúng tôi <strong>không</strong> dùng ảnh của bạn để train các AI model.</li>
              <li>Bạn có toàn quyền quản lý và xóa các Lookbook đã lưu trong trình duyệt của mình.</li>
            </ul>
          </div>
        </section>
      </div>
    </main>
  );
}
