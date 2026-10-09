import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Wand2 } from "lucide-react";
import { HomePageJsonLd } from "@/components/seo/JsonLd";
import { getFlatlay } from "@/lib/images";

/* ── Page-level metadata ── */
export const metadata: Metadata = {
  title: "Sắc Việt AI Stylist — Mặc Việt. Theo cách của bạn.",
  description:
    "Nền tảng AI đầu tiên tư vấn phối cổ phục Việt Nam. Tôn vinh di sản bằng ngôn ngữ thời trang đương đại.",
  alternates: { canonical: "/" },
};

/* ================================================================
   1. HERO (Editorial, Visually Dominant, Huge Typography)
   ================================================================ */
function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-end pb-12 lg:pb-24 pt-32 bg-[#FAF8F5] overflow-hidden">
      {/* Background large image overlay - asymmetric */}
      <div className="absolute top-0 right-0 w-[90%] md:w-[70%] h-full opacity-90 transition-transform duration-[2s] ease-out hover:scale-105 origin-right">
        <Image
          src="/images/looks/nhat-binh-chup-anh.png"
          alt="Editorial Vietnamese Costume"
          fill
          priority
          className="object-cover object-[70%_20%]"
        />
        {/* Gradient fade into the background */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#FAF8F5] via-[#FAF8F5]/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#FAF8F5] via-transparent to-transparent" />
      </div>

      <div className="relative z-10 w-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="font-sans text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-[#9E2A2B] mb-6">
            Nền tảng Stylist Di Sản
          </p>
          <h1 className="font-playfair text-[4rem] sm:text-[6rem] lg:text-[7.5rem] leading-[0.9] font-bold text-[#1E3A5F] tracking-tight">
            Mặc Việt.<br />
            <span className="italic text-[#9E2A2B]">Theo cách</span><br />
            <span className="italic text-[#9E2A2B]">của bạn.</span>
          </h1>
          <p className="mt-8 max-w-lg text-lg text-[#4A6A8F] leading-relaxed font-sans">
            Giao thoa giữa công nghệ AI hiện đại và di sản văn hoá ngàn năm. Khám phá phong cách cá nhân qua lăng kính cổ phục Việt Nam.
          </p>
          
          <div className="mt-12 flex flex-col sm:flex-row items-start gap-6">
            <Link
              href="/stylist"
              className="group flex items-center justify-between gap-6 rounded-full bg-[#1A1A1A] px-8 py-5 text-sm font-bold text-white transition-all hover:bg-[#9E2A2B]"
            >
              <span className="uppercase tracking-widest">Bắt đầu trải nghiệm</span>
              <Wand2 className="h-5 w-5 transition-transform group-hover:rotate-12" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   2. CULTURAL STATEMENT (Large typography, generous whitespace)
   ================================================================ */
function StatementSection() {
  return (
    <section className="py-32 lg:py-48 bg-white">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-playfair text-3xl sm:text-5xl lg:text-6xl font-medium text-[#1E3A5F] leading-snug">
          &ldquo;Di sản không chỉ tồn tại trong bảo tàng hay sách sử. Nó chỉ thực sự sống khi trở thành một phần trong 
          <span className="italic text-[#D4AF37]"> nhịp thở đương đại.</span>&rdquo;
        </h2>
      </div>
    </section>
  );
}

/* ================================================================
   3. HERITAGE EDITORIAL ARCHIVE (Asymmetric composition, large images)
   ================================================================ */
function HeritageEditorialSection() {
  return (
    <section className="py-24 lg:py-32 bg-[#FAF8F5]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-[#E5DECE] pb-12">
          <h2 className="font-playfair text-5xl lg:text-7xl font-bold text-[#1E3A5F] tracking-tight">
            Kho lưu trữ<br />
            <span className="text-[#9E2A2B] italic">Di sản</span>
          </h2>
          <p className="max-w-sm text-base text-[#4A6A8F] leading-relaxed">
            5 dáng áo biểu tượng xuyên suốt các triều đại lịch sử Việt Nam, được tinh tuyển và số hoá chuẩn mực.
          </p>
        </div>

        {/* Asymmetric Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-16 md:gap-8 lg:gap-16">
          
          {/* Item 1: Large Left */}
          <div className="md:col-span-7 group">
            <Link href="/viet-phuc/ao-ngu-than" className="block relative aspect-[4/5] overflow-hidden bg-[#E5DECE]">
              <Image src={getFlatlay("ao-ngu-than").src} alt="Áo Ngũ Thân" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
            </Link>
            <div className="mt-6 flex justify-between items-start">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#D4AF37] mb-2">Nhà Nguyễn</p>
                <h3 className="font-playfair text-3xl font-bold text-[#1E3A5F]">Áo Ngũ Thân Tay Chẽn</h3>
              </div>
              <span className="text-[#9E2A2B]"><ArrowRight className="h-6 w-6 transition-transform group-hover:translate-x-2" /></span>
            </div>
          </div>

          {/* Item 2: Smaller Right, shifted down */}
          <div className="md:col-span-5 md:pt-32 group">
            <Link href="/viet-phuc/ao-tac" className="block relative aspect-[3/4] overflow-hidden bg-[#E5DECE]">
              <Image src={getFlatlay("ao-tac").src} alt="Áo Tấc" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
            </Link>
            <div className="mt-6 flex justify-between items-start">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#D4AF37] mb-2">Lễ Phục</p>
                <h3 className="font-playfair text-2xl font-bold text-[#1E3A5F]">Áo Tấc</h3>
              </div>
              <span className="text-[#9E2A2B]"><ArrowRight className="h-6 w-6 transition-transform group-hover:translate-x-2" /></span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

/* ================================================================
   4. PRODUCT SHOWCASE (Split layout, large image)
   ================================================================ */
function AIProductShowcase() {
  return (
    <section className="py-24 lg:py-40 bg-[#1A1A1A] text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div className="order-2 lg:order-1 relative aspect-[3/4] overflow-hidden">
            <Image src="/images/looks/ngu-than-navy-dao-pho.png" alt="AI Stylist" fill className="object-cover" />
          </div>

          <div className="order-1 lg:order-2">
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#D4AF37] mb-6">Công nghệ cá nhân hoá</p>
            <h2 className="font-playfair text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-8">
              Stylist AI<br />
              Dành riêng cho bạn.
            </h2>
            <p className="text-[#A3A3A3] text-lg leading-relaxed mb-10 max-w-md">
              Hệ thống AI phân tích Undertone da, bối cảnh thời tiết và mục đích sử dụng để gợi ý chính xác những phụ kiện, màu sắc đương đại phù hợp nhất với cổ phục truyền thống.
            </p>
            <Link
              href="/stylist"
              className="inline-flex items-center gap-4 text-sm font-bold uppercase tracking-widest text-white border-b border-[#D4AF37] pb-2 transition-all hover:text-[#D4AF37]"
            >
              Thử nghiệm AI
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}

/* ================================================================
   5. CULTURAL GUARDRAILS (Typography-led, full width)
   ================================================================ */
function GuardrailsSection() {
  return (
    <section className="py-24 lg:py-32 bg-[#9E2A2B] text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#E8CC6E] mb-6">Bảo chứng văn hoá</p>
        <h2 className="font-playfair text-4xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight max-w-4xl mx-auto">
          Sáng tạo không đồng nghĩa với phá vỡ chuẩn mực.
        </h2>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-12 text-left max-w-5xl mx-auto">
          <div>
            <h3 className="font-playfair text-2xl font-bold text-white mb-4">Tôn trọng bối cảnh</h3>
            <p className="text-white/80 leading-relaxed text-sm">AI tự động cảnh báo nếu trang phục không phù hợp với không gian linh thiêng (như Văn Miếu) hoặc sự kiện trang trọng.</p>
          </div>
          <div>
            <h3 className="font-playfair text-2xl font-bold text-white mb-4">Chuẩn mực phụ kiện</h3>
            <p className="text-white/80 leading-relaxed text-sm">Phân tích rủi ro khi kết hợp cổ phục với các phụ kiện đương đại quá phá cách, đưa ra gợi ý thay thế thanh lịch hơn.</p>
          </div>
          <div>
            <h3 className="font-playfair text-2xl font-bold text-white mb-4">Gợi ý mang tính giáo dục</h3>
            <p className="text-white/80 leading-relaxed text-sm">Không chỉ cấm đoán, mọi cảnh báo từ AI đều đi kèm với giải thích lịch sử, giúp người dùng hiểu rõ cội nguồn.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   6. VIET REMIX (Large fashion combinations)
   ================================================================ */
function VietRemixEditorial() {
  return (
    <section className="py-24 lg:py-40 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-20 text-center">
          <h2 className="font-playfair text-5xl lg:text-7xl font-bold text-[#1E3A5F]">
            Việt Remix
          </h2>
          <p className="mt-6 text-lg text-[#4A6A8F] max-w-2xl mx-auto">
            Khi di sản gặp gỡ nhịp điệu của thời trang đường phố và xu hướng đương đại.
          </p>
        </div>

        <div className="flex flex-col gap-24">
          {/* Outfit 1 */}
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="w-full lg:w-1/2 relative aspect-[3/4] overflow-hidden bg-[#FAF8F5]">
              <Image src="/images/looks/ao-dai-trang-ky-yeu.png" alt="Áo Dài Y2K" fill className="object-cover" />
            </div>
            <div className="w-full lg:w-1/2 lg:pl-16">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D4AF37] mb-4">Editorial</p>
              <h3 className="font-playfair text-4xl font-bold text-[#1E3A5F] mb-6">Áo Dài Y2K</h3>
              <p className="text-[#4A6A8F] text-lg leading-relaxed mb-8">
                Tái hiện tinh thần Áo Dài trắng truyền thống qua góc nhìn nhiếp ảnh thời trang đương đại, kết hợp cùng trang sức minimalism.
              </p>
              <Link href="/stylist" className="text-sm font-bold uppercase tracking-widest text-[#9E2A2B] hover:text-[#1A1A1A] transition-colors">
                Khám phá phong cách này
              </Link>
            </div>
          </div>

          {/* Outfit 2 (Reversed) */}
          <div className="flex flex-col lg:flex-row-reverse items-center gap-12">
            <div className="w-full lg:w-1/2 relative aspect-[3/4] overflow-hidden bg-[#FAF8F5]">
              <Image src="/images/looks/ao-tac-van-mieu.png" alt="Áo Tấc Chic" fill className="object-cover object-top" />
            </div>
            <div className="w-full lg:w-1/2 lg:pr-16 text-left lg:text-right">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D4AF37] mb-4">Modern Chic</p>
              <h3 className="font-playfair text-4xl font-bold text-[#1E3A5F] mb-6">Áo Tấc Đương Đại</h3>
              <p className="text-[#4A6A8F] text-lg leading-relaxed mb-8">
                Sự trầm mặc của xanh rêu phối hợp nhịp nhàng với quần âu phom suông rộng và Loafer da thật. Thanh lịch tuyệt đối.
              </p>
              <Link href="/stylist" className="text-sm font-bold uppercase tracking-widest text-[#9E2A2B] hover:text-[#1A1A1A] transition-colors">
                Khám phá phong cách này
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   7. FINAL CTA
   ================================================================ */
function FinalEditorialCTA() {
  return (
    <section className="py-32 lg:py-48 bg-[#FAF8F5] text-center">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-playfair text-5xl sm:text-6xl lg:text-8xl font-bold text-[#1E3A5F] mb-12">
          Định hình <span className="italic text-[#9E2A2B]">dấu ấn.</span>
        </h2>
        <Link
          href="/stylist"
          className="inline-flex items-center gap-4 bg-[#1E3A5F] text-white px-10 py-6 rounded-full text-sm font-bold uppercase tracking-[0.2em] transition-all hover:bg-[#9E2A2B] hover:scale-105"
        >
          Trải nghiệm AI Stylist
        </Link>
      </div>
    </section>
  );
}

/* ================================================================
   ROOT PAGE COMPONENT
   ================================================================ */
export default function HomePage() {
  return (
    <>
      <HomePageJsonLd />
      <main id="main-content" role="main" className="flex-1 bg-white">
        <HeroSection />
        <StatementSection />
        <HeritageEditorialSection />
        <AIProductShowcase />
        <GuardrailsSection />
        <VietRemixEditorial />
        <FinalEditorialCTA />
      </main>
    </>
  );
}
