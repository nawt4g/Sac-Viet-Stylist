import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, BookOpen, Clock, Tag, Wand2, CheckCircle2 } from "lucide-react";
import { notFound } from "next/navigation";
import { getFlatlay, getLookImage } from "@/lib/images";

interface ArticleData {
  slug: string;
  title: string;
  category: string;
  readTime: string;
  description: string;
  heroImage: string;
  sections: Array<{
    title: string;
    paragraphs: string[];
    tips?: string[];
  }>;
}

const ARTICLES: Record<string, ArticleData> = {
  "cach-mac-ao-ngu-than": {
    slug: "cach-mac-ao-ngu-than",
    title: "Cách mặc Áo Ngũ Thân đúng chuẩn phong thái",
    category: "Lễ nghi",
    readTime: "5 phút",
    description: "Tìm hiểu cấu trúc 5 thân, thứ tự cài khuy bên hữu và cách giữ phong thái đoan trang, nho nhã khi diện áo ngũ thân.",
    heroImage: getFlatlay("ao-ngu-than").src,
    sections: [
      {
        title: "1. Cấu trúc 5 vạt và triết lý ngũ thường",
        paragraphs: [
          "Áo ngũ thân được may từ 5 vạt vải: 2 vạt trước, 2 vạt sau và một vạt con (tiểu thân) nằm bên trong bên phải. Năm vạt áo biểu trưng cho tứ thân phụ mẫu ôm ấp lấy đứa con, đồng thời tượng trưng cho ngũ thường: Nhân, Nghĩa, Lễ, Trí, Tín.",
          "Cổ áo là dạng cổ đứng vuông góc, cao khoảng 2 đến 3 cm, ôm sát gáy giúp người mặc luôn giữ tư thế thẳng lưng, đầu ngẩng cao nhưng mắt nhìn đoan chính.",
        ],
      },
      {
        title: "2. Quy tắc lớp lót và thứ tự cài khuy",
        paragraphs: [
          "Khi diện áo ngũ thân, bắt buộc phải có một lớp áo lót trắng bên trong (thường là áo cánh trắng cổ tròn hoặc cổ viền mỏng). Lớp áo trắng lộ nhẹ 1-2 mm ở cổ áo ngoài tạo điểm nhấn thanh sạch, tinh tế.",
          "Áo được cài bằng hàng khuy bên tay phải, bắt đầu từ chân cổ, qua vai rồi xuống nách và hông. Phải cài khuy từ trên xuống dưới theo thứ tự ngay ngắn, tránh để vạt áo trong bị nhăn hay lộ ra ngoài.",
        ],
        tips: [
          "Luôn giữ cổ áo thẳng thớm, không bẻ cong hay kéo lệch cổ.",
          "Nút cài truyền thống làm từ gỗ quý, xương, ngọc hoặc kim loại mạ vàng/bạc.",
        ],
      },
      {
        title: "3. Kết hợp khăn vấn và phong thái",
        paragraphs: [
          "Nam giới đi kèm khăn đóng (khăn xếp) màu đen hoặc the tím, quấn đều nếp. Nữ giới vấn khăn vành gọn gàng. Bước đi nên khoan thai, hai tay buông nhẹ hoặc giữ trước bụng theo lễ nghi truyền thống.",
        ],
      },
    ],
  },
  "mac-gi-di-van-mieu": {
    slug: "mac-gi-di-van-mieu",
    title: "Mặc gì đi Văn Miếu? Gợi ý cổ phục tôn nghiêm và ăn ảnh",
    category: "Lễ nghi",
    readTime: "4 phút",
    description: "Bí quyết chọn cổ phục trang trọng, thanh nhã khi viếng thăm và chụp ảnh lưu niệm tại di tích Văn Miếu - Quốc Tử Giám.",
    heroImage: getLookImage("ao-tac-van-mieu").image?.src ?? "/hero-editorial.png",
    sections: [
      {
        title: "1. Áo Ngũ Thân & Áo Tấc: Lựa chọn hàng đầu",
        paragraphs: [
          "Văn Miếu – Quốc Tử Giám là biểu tượng của đạo học và Nho phong Việt Nam. Do đó, các trang phục mang tính lễ phục hoặc nho nhã như Áo Ngũ Thân tay chẽn và Áo Tấc tay thụng là lựa chọn số một.",
          "Áo Tấc mang lại sự trang trọng khi đứng trước các bia Tiến sĩ hay điện Đại Thành, trong khi Áo Ngũ Thân tay chẽn giúp các bạn trẻ năng động, dễ dàng di chuyển chụp ảnh giữa các khoảng sân gạch cổ kính.",
        ],
      },
      {
        title: "2. Sắc màu phù hợp không gian rêu phong",
        paragraphs: [
          "Không gian Văn Miếu mang tông màu chủ đạo là tường gạch đỏ, ngói mũi hài rêu phong và tán cây cổ thụ xanh mát. Những gam màu cổ phục tôn dáng nhất gồm có: Xanh lam sẫm (Navy), Đen tuyền, Xanh rêu (Trầm lục) và Đỏ chu sa trầm.",
          "Tránh các màu dạ quang, neon hoặc chất liệu quá mỏng xuyên thấu làm mất đi tính trang nghiêm của chốn tôn nghiêm học vấn.",
        ],
        tips: [
          "Màu Xanh lam sẫm tương phản tuyệt đẹp với nền tường đỏ và gạch Bát Tràng.",
          "Giày nên chọn hài thêu tối giản, giày da đen hoặc giày búp bê trơn màu.",
        ],
      },
      {
        title: "3. Ứng xử văn minh khi chụp ảnh cổ phục",
        paragraphs: [
          "Giữ trật tự, không ngồi lên rùa đá hay chạm vào văn bia. Tạo dáng nhẹ nhàng, tự nhiên với phong thái khiêm nhường sẽ giúp bức ảnh của bạn toát lên trọn vẹn vẻ đẹp sĩ tử thời xưa.",
        ],
      },
    ],
  },
  "phu-kien-viet-phuc": {
    slug: "phu-kien-viet-phuc",
    title: "Phụ kiện Việt phục thời nay: Tinh tế giữa truyền thống và đương đại",
    category: "Phối đồ",
    readTime: "6 phút",
    description: "Cách phối quạt nan, guốc mộc, ngọc bội và túi xách thủ công để tạo điểm nhấn hài hòa mà không làm lu mờ trang phục chính.",
    heroImage: getFlatlay("ao-nhat-binh").src,
    sections: [
      {
        title: "1. Quạt xếp và quạt lụa cầm tay",
        paragraphs: [
          "Quạt là phụ kiện bất ly thân của người mặc cổ phục ngày xưa. Nam giới thường dùng quạt nan giấy Tràng Tiền hoặc quạt gỗ thơm mộc mạc, thanh nhã.",
          "Nữ giới có thể chọn quạt lụa tròn, quạt thêu hoa mai, hoa sen hoặc quạt lông vũ thanh tao. Khi cầm quạt, nên khép nhẹ hoặc mở nửa chừng tạo dáng e ấp, duyên dáng.",
        ],
      },
      {
        title: "2. Guốc mộc và hài thêu truyền thống",
        paragraphs: [
          "Guốc mộc là vật dụng quen thuộc của người Việt qua nhiều thế kỷ. Guốc sơn then đen hoặc để mộc vân gỗ kết hợp quai nhung đỏ/xanh đem lại nét đẹp mộc mạc, gần gũi.",
          "Đối với các dịp lễ hội trang trọng, hài nhung thêu hoa văn chỉ vàng kim hoặc giày da tối giản là sự kết hợp chuẩn mực bảo đảm sự tôn nghiêm.",
        ],
        tips: [
          "Nên chọn guốc có độ cao vừa phải (3-5 cm) để tà áo rủ chấm mu bàn chân vừa đẹp.",
          "Tránh các loại dép lê, dép xỏ ngón khi diện áo ngũ thân hoặc áo tấc.",
        ],
      },
      {
        title: "3. Ngọc bội, kiềng bạc và túi xách thủ công",
        paragraphs: [
          "Dây ngọc bội đeo bên sườn áo ngũ thân tạo âm vang thanh khiết khi bước đi và điểm xuyết sự sang quý. Với phụ nữ, kiềng bạc trơn hoặc kiềng khắc hoa văn hoa cúc thời Lê - Nguyễn là bảo vật tôn vinh bờ cổ thon thả.",
          "Trong nhịp sống hiện đại, các bạn trẻ có thể phối cùng túi cói dệt, túi vải lanh nhuộm chàm hoặc túi da thủ công mang phom dáng tối giản.",
        ],
      },
    ],
  },
  "phoi-co-phuc-hien-dai": {
    slug: "phoi-co-phuc-hien-dai",
    title: "Phối cổ phục hiện đại: Sống động trong nhịp sống thị thành",
    category: "Phối đồ",
    readTime: "7 phút",
    description: "Táo bạo nhưng tôn trọng nguyên bản: Kết hợp áo ngũ thân, áo dài cùng sneaker, denim hay blazer cho những buổi dạo phố cuối tuần.",
    heroImage: getLookImage("ngu-than-navy-dao-pho").image?.src ?? "/hero-editorial.png",
    sections: [
      {
        title: "1. Áo Ngũ Thân dạng áo khoác ngoài (Outerwear)",
        paragraphs: [
          "Một xu hướng được các bạn trẻ Gen Z đón nhận nồng nhiệt là biến tấu áo ngũ thân tay chẽn thành chiếc áo khoác dáng dài. Bên trong phối cùng áo thun trắng trơn hoặc áo sơ mi cổ tàu, quần tây ống đứng.",
          "Cách phối này giữ nguyên kết cấu cổ đứng và đường cắt 5 vạt nhưng đem lại cảm giác tự do, phóng khoáng khi đi dạo phố hay làm việc sáng tạo.",
        ],
      },
      {
        title: "2. Sneaker tối giản & Phụ kiện đương đại",
        paragraphs: [
          "Thay vì hài thêu, một đôi sneaker da trắng tối giản (minimalist white sneakers) mang lại vẻ khỏe khoắn, năng động cho người mặc. Đi kèm là mũ beret, kính râm gọng kim loại hoặc túi đeo chéo mini.",
          "Sự tương phản giữa phom dáng cổ điển và phụ kiện công nghệ/streetwear tạo nên phong cách Neo-Heritage độc đáo, thể hiện tinh thần yêu di sản của người trẻ hiện đại.",
        ],
        tips: [
          "Chọn sneaker phom gọn gàng, tránh giày chunky quá khổ làm mất cân đối tà áo.",
          "Màu sắc tổng thể không nên vượt quá 3 tông màu chủ đạo.",
        ],
      },
      {
        title: "3. Tôn trọng tinh thần cốt lõi của di sản",
        paragraphs: [
          "Sáng tạo nhưng không lai căng: Hãy luôn giữ đúng tỷ lệ vạt áo, đường may cổ và cách gài vạt bên hữu. Tinh thần của cổ phục Việt nằm ở sự kín đáo, trang nhã và chỉn chu.",
        ],
      },
    ],
  },
};

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return [
    { slug: "cach-mac-ao-ngu-than" },
    { slug: "mac-gi-di-van-mieu" },
    { slug: "phu-kien-viet-phuc" },
    { slug: "phoi-co-phuc-hien-dai" },
  ];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = ARTICLES[slug];
  if (!article) return { title: "Không tìm thấy bài viết — Sắc Việt AI Stylist" };

  return {
    title: `${article.title} — Cẩm Nang Sắc Việt`,
    description: article.description,
  };
}

export default async function CamNangDetailPage({ params }: Props) {
  const { slug } = await params;
  const article = ARTICLES[slug];

  if (!article) {
    notFound();
  }

  return (
    <main className="flex-1 bg-[#FAF8F5] py-12 lg:py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Link
          href="/cam-nang"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-[#4A6A8F] hover:text-[#9E2A2B] transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Quay lại Tủ sách Di sản
        </Link>

        <article className="rounded-3xl border border-[#E5DECE] bg-white p-6 shadow-sm sm:p-10 lg:p-12">
          {/* Metadata header */}
          <div className="mb-6 flex flex-wrap items-center gap-4 text-xs font-bold">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FAF8F5] border border-[#E5DECE] px-3.5 py-1 text-[#9E2A2B] uppercase tracking-wider">
              <Tag className="h-3 w-3 text-[#D4AF37]" />
              {article.category}
            </span>
            <span className="inline-flex items-center gap-1 text-[#9CA3AF]">
              <Clock className="h-3.5 w-3.5" />
              {article.readTime}
            </span>
          </div>

          <h1 className="font-playfair text-3xl font-bold text-[#1E3A5F] sm:text-4xl lg:text-5xl leading-tight mb-4">
            {article.title}
          </h1>

          <p className="text-base sm:text-lg font-medium text-[#4A6A8F] leading-relaxed mb-8">
            {article.description}
          </p>

          {/* Hero image */}
          <div className="relative mb-10 aspect-[16/9] w-full overflow-hidden rounded-2xl border border-[#E5DECE] bg-[#F5F0E8]">
            <Image
              src={article.heroImage}
              alt={article.title}
              fill
              sizes="(max-width: 1024px) 100vw, 800px"
              className="object-cover"
              priority
            />
          </div>

          {/* Article sections */}
          <div className="space-y-10">
            {article.sections.map((section, idx) => (
              <section key={idx} className="space-y-4">
                <h2 className="font-playfair text-2xl font-bold text-[#1E3A5F]">
                  {section.title}
                </h2>
                {section.paragraphs.map((p, pIdx) => (
                  <p key={pIdx} className="text-base text-[#4A6A8F] leading-relaxed">
                    {p}
                  </p>
                ))}

                {section.tips && (
                  <div className="mt-4 rounded-xl border border-[#D4AF37]/30 bg-[#FAF8F5] p-5">
                    <div className="flex items-center gap-2 mb-2 font-bold text-xs uppercase tracking-wider text-[#9E2A2B]">
                      <BookOpen className="h-4 w-4 text-[#D4AF37]" />
                      Mẹo nhỏ cho bạn
                    </div>
                    <ul className="space-y-2">
                      {section.tips.map((tip, tIdx) => (
                        <li key={tIdx} className="flex items-start gap-2 text-sm text-[#1E3A5F]">
                          <CheckCircle2 className="h-4 w-4 text-[#4A7856] shrink-0 mt-0.5" />
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </section>
            ))}
          </div>

          {/* Call to action */}
          <div className="mt-14 rounded-2xl bg-[#FBF9F6] p-8 text-center border border-[#D4AF37]/30">
            <h3 className="font-playfair text-xl font-bold text-[#1E3A5F] mb-3">
              Trải nghiệm phối đồ cùng AI Stylist
            </h3>
            <p className="text-sm text-[#4A6A8F] mb-6 max-w-md mx-auto">
              Áp dụng ngay những kiến thức trên để phối một bộ cổ phục mang đậm dấu ấn cá nhân của bạn.
            </p>
            <Link
              href="/stylist"
              className="inline-flex items-center gap-2 rounded-full bg-[#9E2A2B] px-6 py-3 text-sm font-bold text-white transition-all hover:bg-[#7D1F20] shadow-sm"
            >
              <Wand2 className="h-4 w-4" />
              Bắt đầu phối đồ ngay
            </Link>
          </div>
        </article>
      </div>
    </main>
  );
}
