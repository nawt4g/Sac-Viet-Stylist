import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Wand2, MapPin, Calendar, Palette } from "lucide-react";
import { COSTUME_MAP } from "@/data/costumes";
import type { CostumeId } from "@/types/stylist";
import { notFound } from "next/navigation";
import { getFlatlay } from "@/lib/images";

const REGION_LABELS: Record<string, string> = {
  north: "Miền Bắc",
  central: "Miền Trung",
  south: "Miền Nam",
  all: "Toàn quốc",
};

const COSTUME_STORIES: Record<CostumeId, { history: string; structure: string; etiquette: string }> = {
  "ao-ngu-than": {
    history:
      "Ra đời dưới thời Chúa Nguyễn Phúc Khoát vào thế kỷ 18 và được hoàn thiện dưới triều Nguyễn, Áo Ngũ Thân là chuẩn mực trang phục của người Việt suốt nhiều thế kỷ. Chiếc áo mang thông điệp về sự khiêm nhường, lễ độ và trật tự luân lý của người quân tử.",
    structure:
      "Gồm năm thân (vạt) vải ghép lại: hai thân trước, hai thân sau và một thân con nằm bên trong che kín ngực. Cổ đứng vuông vức cao 2-3 cm, tay chẽn ôm sát cổ tay linh hoạt trong sinh hoạt. Năm hạt cúc cài tượng trưng cho Ngũ thường: Nhân, Nghĩa, Lễ, Trí, Tín.",
    etiquette:
      "Mặc cùng áo lót trắng bên trong, cổ áo lộ nhẹ 1-2 mm thể hiện sự tươm tất. Nam giới thường kết hợp khăn đóng đen, nữ giới đội khăn vành hoặc vấn tóc gọn gàng.",
  },
  "ao-tac": {
    history:
      "Áo Tấc, hay còn gọi là áo thụng, áo lễ, là dạng áo ngũ thân tay rộng thụng trang trọng bậc nhất thời Nguyễn. Áo được quy định dùng trong các dịp đại lễ như tế giao, bái yết tổ tiên, triều hội và hôn lễ truyền thống.",
    structure:
      "Được may theo kết cấu ngũ thân nhưng hai tay áo buông rộng thụng với kích thước lên đến một tấc vải (khoảng 30-40 cm). Khi hạ tay, tay áo rủ thẳng tự nhiên, khi chắp tay tạo hình chữ bái khiêm nhường tôn nghiêm.",
    etiquette:
      "Người mặc luôn giữ tư thế chắp tay ngang ngực khi chào hỏi hay đứng lễ. Màu sắc ưa chuộng là xanh lam thẫm, đen huyền, tía hoặc lục trầm.",
  },
  "ao-nhat-binh": {
    history:
      "Nguyên là thường phục của Hoàng thái hậu, Hoàng hậu, Công chúa và là lễ phục của mệnh phụ phu nhân triều Nguyễn. Tên gọi Nhật Bình bắt nguồn từ dải cổ áo to bản ghép thành hình chữ nhật xẻ dọc phía trước.",
    structure:
      "Cổ áo hình chữ nhật viền chỉ ngũ sắc lộng lẫy, thân áo xòe rộng, tay áo có các dải ngũ hành (kim, mộc, thủy, hỏa, thổ) viền quanh cổ tay. Chất liệu cung đình thượng hạng gồm gấm sa thêu rồng phượng, mây hoa tinh xảo.",
    etiquette:
      "Thường phối cùng khăn vành dây vàng kim hoặc xanh ngọc, hài thêu phượng và trang sức ngọc phỉ thúy. Ngày nay Nhật Bình được trân quý đặc biệt trong lễ vu quy và các bộ ảnh nghệ thuật di sản.",
  },
  "ao-tu-than": {
    history:
      "Gắn bó sâu sắc với đời sống phụ nữ kinh kỳ và vùng đồng bằng sông Hồng từ thời Lý - Trần - Lê đến đầu thế kỷ 20. Chiếc áo là biểu tượng của người phụ nữ Việt Nam tần tảo, đoan trang, chịu thương chịu khó.",
    structure:
      "Bốn vạt áo tượng trưng cho tứ thân phụ mẫu (cha mẹ đẻ và cha mẹ chồng). Hai vạt sau may liền tạo sống lưng thẳng tắp, hai vạt trước để buông rủ hoặc thắt nút duyên dáng trước bụng. Kết hợp cùng yếm đào, áo cánh trắng và dải thắt lưng xanh/hồng.",
    etiquette:
      "Phối kèm nón quai thao, khăn mỏ quạ đen tuyền và guốc mộc thanh thoát trong các dịp trẩy hội mùa xuân, hát quan họ hay giao duyên.",
  },
  "ao-dai": {
    history:
      "Kế thừa phom dáng ngũ thân truyền thống và được cách tân qua bàn tay họa sĩ Lemur Cát Tường cùng các nghệ nhân thập niên 1930. Áo Dài đã trở thành quốc phục tinh hoa đại diện cho vẻ đẹp Việt Nam ra toàn thế giới.",
    structure:
      "Hai tà trước sau buông dài thướt tha, eo chít nhẹ tôn đường cong tự nhiên mà vẫn kín đáo. Cổ áo đa dạng từ cổ đứng 3 cm truyền thống đến cổ tròn, cổ thuyền hiện đại, mặc cùng quần ống rộng mềm mại.",
    etiquette:
      "Thích hợp từ môi trường học đường, công sở đến các sự kiện ngoại giao và lễ hội trang trọng. Kết hợp tự nhiên với hài cao gót, quạt xếp và trang sức bạc.",
  },
};

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return [
    { slug: "ao-ngu-than" },
    { slug: "ao-tac" },
    { slug: "ao-nhat-binh" },
    { slug: "ao-tu-than" },
    { slug: "ao-dai" },
  ];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const costume = COSTUME_MAP[slug as CostumeId];
  if (!costume) return { title: "Không tìm thấy trang phục — Sắc Việt AI Stylist" };

  return {
    title: `${costume.name} — Sắc Việt AI Stylist`,
    description: costume.description,
  };
}

export default async function VietPhucDetailPage({ params }: Props) {
  const { slug } = await params;
  const costume = COSTUME_MAP[slug as CostumeId];

  if (!costume) {
    notFound();
  }

  const regionLabel = REGION_LABELS[costume.region] || costume.region;
  const story = COSTUME_STORIES[costume.id as CostumeId];
  const flatlayImage = getFlatlay(costume.id);

  return (
    <main className="flex-1 bg-[#FAF8F5] py-12 lg:py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <Link
          href="/explore"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-[#4A6A8F] hover:text-[#9E2A2B] transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Quay lại Khám phá di sản
        </Link>

        <article className="rounded-3xl border border-[#E5DECE] bg-white p-6 shadow-sm sm:p-10 lg:p-12">
          {/* Top badges */}
          <div className="mb-6 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FAF8F5] border border-[#E5DECE] px-3.5 py-1 text-xs font-bold text-[#1E3A5F]">
              <Calendar className="h-3.5 w-3.5 text-[#D4AF37]" />
              {costume.dynasty}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FAF8F5] border border-[#E5DECE] px-3.5 py-1 text-xs font-bold text-[#1E3A5F]">
              <MapPin className="h-3.5 w-3.5 text-[#9E2A2B]" />
              {regionLabel}
            </span>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12 items-start mb-10">
            <div className="lg:col-span-7">
              <h1 className="font-playfair text-3xl font-bold text-[#1E3A5F] sm:text-4xl lg:text-5xl mb-2">
                {costume.name}
              </h1>
              <p className="text-base font-medium text-[#9CA3AF] mb-6">{costume.nameEn}</p>
              <p className="lead text-base sm:text-lg font-medium text-[#1E3A5F] leading-relaxed mb-6">
                {costume.description}
              </p>

              {/* Color palette */}
              <div className="mb-6 rounded-2xl bg-[#FAF8F5] border border-[#E5DECE] p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Palette className="h-4 w-4 text-[#D4AF37]" />
                  <span className="text-xs font-bold uppercase tracking-wider text-[#1E3A5F]">Sắc màu truyền thống</span>
                </div>
                <div className="flex flex-wrap gap-3">
                  {(costume.colors ?? []).map((c) => (
                    <div key={c.hex} className="flex items-center gap-2 rounded-lg bg-white px-3 py-1.5 border border-[#E5DECE]/60 text-xs shadow-xs">
                      <span className="h-3.5 w-3.5 rounded-full border border-black/10 shrink-0" style={{ backgroundColor: c.hex }} />
                      <span className="font-medium text-[#1E3A5F]">{c.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Materials */}
              <div className="text-xs text-[#4A6A8F]">
                <strong className="text-[#1E3A5F]">Chất liệu điển hình:</strong> {costume.materials.join(", ")}.
              </div>
            </div>

            {/* Flatlay image */}
            <div className="lg:col-span-5">
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl border border-[#E5DECE] bg-[#F5F0E8] shadow-inner">
                <Image
                  src={flatlayImage.src}
                  alt={costume.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 400px"
                  className="object-cover transition-transform duration-500 hover:scale-105"
                  priority
                />
                <span className="absolute bottom-3 left-3 rounded-full bg-black/60 px-3 py-1 text-[11px] font-semibold text-white backdrop-blur-xs">
                  Ảnh cổ phục di sản
                </span>
              </div>
            </div>
          </div>

          {/* Detailed sections */}
          {story && (
            <div className="border-t border-[#E5DECE] pt-8 space-y-8">
              <div>
                <h2 className="font-playfair text-2xl font-bold text-[#1E3A5F] mb-3">Lịch sử & Nguồn cội</h2>
                <p className="text-base text-[#4A6A8F] leading-relaxed">{story.history}</p>
              </div>

              <div>
                <h2 className="font-playfair text-2xl font-bold text-[#1E3A5F] mb-3">Cấu trúc & Ý nghĩa biểu tượng</h2>
                <p className="text-base text-[#4A6A8F] leading-relaxed">{story.structure}</p>
              </div>

              <div>
                <h2 className="font-playfair text-2xl font-bold text-[#1E3A5F] mb-3">Quy tắc mặc & Lễ nghi</h2>
                <p className="text-base text-[#4A6A8F] leading-relaxed">{story.etiquette}</p>
              </div>
            </div>
          )}

          {/* CTA Box */}
          <div className="mt-12 rounded-2xl bg-[#FBF9F6] p-8 text-center border border-[#D4AF37]/30">
            <h3 className="font-playfair text-xl font-bold text-[#1E3A5F] mb-3">Phối {costume.name} cùng AI Stylist</h3>
            <p className="text-sm text-[#4A6A8F] mb-6 max-w-md mx-auto">
              Thử nghiệm màu sắc, chọn bối cảnh phù hợp và nhận gợi ý phụ kiện hài hòa giữa cổ điển và đương đại.
            </p>
            <Link
              href={`/stylist?costume=${costume.id}`}
              className="inline-flex items-center gap-2 rounded-full bg-[#9E2A2B] px-6 py-3 text-sm font-bold text-white transition-all hover:bg-[#7D1F20] shadow-sm"
            >
              <Wand2 className="h-4 w-4" />
              Tạo outfit với {costume.name}
            </Link>
          </div>
        </article>
      </div>
    </main>
  );
}
