import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import SEO from "@/components/SEO";
import PageShell from "@/components/layout/PageShell";
import CapacityTable from "@/components/CapacityTable";
import GaugeProfile from "@/components/GaugeProfile";
import Picture from "@/components/Picture";
import TrailerDrawing from "@/components/home/TrailerDrawing";
import { COMPANY, DISPATCHERS, telHref } from "@/data/company";
import { TRAILERS } from "@/data/fleet";
import { PAGES } from "@/data/seo";
import { useReveal } from "@/hooks/use-reveal";
import { DECK_HEIGHT, LEGAL_LIMITS, PAYLOAD_WITHOUT_PERMIT } from "@/lib/load-check";
import type { PhotoSlug } from "@/lib/photos";
import { cn } from "@/lib/utils";

const fmt = (n: number, digits = 2) => n.toLocaleString("tr-TR", { minimumFractionDigits: digits, maximumFractionDigits: digits });

const TOC = [
  { id: "lowbed-nedir", title: "Lowbed nedir?" },
  { id: "yukler", title: "Hangi yükler için kullanılır?" },
  { id: "dorse-tipleri", title: "Dorse tipleri" },
  { id: "ozel-izin", title: "Ne zaman özel izin gerekir?" },
  { id: "fiyat", title: "Fiyatı neler belirler?" },
  { id: "hakkimizda", title: "Hakkımızda" },
] as const;

const PRICE_FACTORS = [
  { title: "Mesafe ve güzergah", text: "Çıkış–varış arası kilometre, dağ yolu veya şehir içi geçişler, köprü ve üst geçit kısıtları." },
  { title: "Yük ağırlığı ve ölçüleri", text: "Dorse tipini ve dingil sayısını belirler; havuzlu veya çok dingilli dorse maliyeti artırır." },
  { title: "Özel izin ve eskort", text: "Gabari dışı genişlik, yükseklik veya ağırlıkta KGM izni ve refakat aracı ihtiyacı." },
  { title: "Yükleme ve indirme", text: "Makinenin kendi yürüyüşüyle rampadan çıkması ya da vinç gerektirmesi, sökülecek ataşmanlar." },
  { title: "Şantiye erişimi", text: "Dar giriş, rampalı veya stabilize yol, zemin durumu ve bekleme süresi." },
  { title: "Tarih esnekliği", text: "İzinli sevk saatleri, hafta sonu ve bayram kısıtları ile acil sevkiyat talebi." },
] as const;

const LOAD_PHOTOS: readonly { slug: PhotoSlug; alt: string; caption: string }[] = [
  {
    slug: "sany-sy385h-ekskavator",
    alt: "3 dingilli lowbed üzerinde sarı Sany SY385H paletli ekskavatör",
    caption: "Paletli ekskavatör, standart lowbed üzerinde",
  },
  {
    slug: "paletli-dozer-dag-yolu",
    alt: "Virajlı dağ yolunda lowbed üzerinde sarı Caterpillar paletli dozer",
    caption: "Paletli dozer, rampaları kaldırılmış lowbed",
  },
  {
    slug: "kleemann-mc110r-mobil-kirici",
    alt: "Hidrolik rampalardan lowbed dorseye çıkan Kleemann mobil çeneli kırıcı",
    caption: "Mobil kırıcı, rampadan kendi yürüyüşüyle yükleme",
  },
];

/** Bölüm başlığı: rehber içi bölüm numarası + büyük başlık */
const GuideHeading = ({ index, kicker, id, children, className }: { index: string; kicker: string; id: string; children: ReactNode; className?: string }) => (
  <div className={className}>
    <p className="section-mark">
      <span className="text-steel">{index}</span>
      <span>{kicker}</span>
    </p>
    <h2 id={`${id}-title`} className="mt-5 max-w-[16ch] text-balance text-display-lg">
      {children}
    </h2>
  </div>
);

// Kaydırma hedefi (id) hareket etmez; yalnızca içerik yerine oturur. Böylece içindekiler bağlantıları tam hizaya iner.
const RevealSection = ({ id, className, children }: { id: string; className?: string; children: ReactNode }) => {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={cn("border-t border-rule py-20 lg:py-28", className)}>
      <div ref={ref}>{children}</div>
    </section>
  );
};

const InfoPage = () => (
  <>
    <SEO title={PAGES.bilgi.title} description={PAGES.bilgi.description} />
    <PageShell>
      {/* Rehber başlığı ve içindekiler */}
      <header className="container grid gap-14 pb-16 pt-12 lg:grid-cols-12 lg:pb-24 lg:pt-16">
        <div className="lg:col-span-8">
          <nav aria-label="Konum" className="flex items-center gap-2 font-mono text-xs text-dim">
            <Link to="/" className="-my-1.5 inline-block py-1.5 transition-colors hover:text-bone">
              Ana sayfa
            </Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page" className="text-steel">
              Rehber
            </span>
          </nav>
          <h1 className="mt-10 max-w-[14ch] text-display-xl">Lowbed Taşımacılık Rehberi</h1>
          <p className="mt-7 max-w-[36rem] text-pretty text-xl leading-relaxed text-bone">
            Gabari dışı ve ağır yük taşımacılığını planlamak için pratik bir rehber.
          </p>
          <p className="mt-4 max-w-[36rem] text-pretty text-lg leading-relaxed text-steel">
            Dorse tipleri, yasal gabari sınırları, özel izin ve eskort süreci: yükünüzü bildirmeden önce bilmeniz gereken
            teknik ayrıntılar.
          </p>
        </div>
        <nav aria-label="İçindekiler" className="lg:col-span-4 lg:pt-24">
          <p className="text-sm text-dim">İçindekiler</p>
          <ol className="mt-4 border-t border-rule">
            {TOC.map((t, i) => (
              <li key={t.id} className="border-b border-rule">
                <a href={`#${t.id}`} className="group flex items-baseline gap-4 py-3 text-steel transition-colors hover:text-bone">
                  <span className="tabular font-mono text-xs text-dim">{String(i + 1).padStart(2, "0")}</span>
                  <span className="link-u">{t.title}</span>
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </header>

      {/* 01 · metin + çizim bandı */}
      <RevealSection id="lowbed-nedir">
        <div className="container grid gap-10 lg:grid-cols-12">
          <GuideHeading index="01" kicker="Tanım" id="lowbed-nedir" className="lg:col-span-4">
            Lowbed nedir?
          </GuideHeading>
          <div className="grid gap-5 text-pretty text-lg leading-relaxed text-steel lg:col-span-7 lg:col-start-6 lg:pt-10">
            <p>
              Lowbed, platform yüksekliği standart dorselere göre düşük tutulmuş, iş makineleri ve ağır ekipman için
              tasarlanmış yarı römorktur. Düşük platform, yükün yüksekliğine daha fazla pay bırakır; böylece ekskavatör,
              dozer veya mobil kırıcı gibi yüksek makineler {fmt(LEGAL_LIMITS.height)} m toplam yükseklik sınırına
              takılmadan taşınabilir.
            </p>
            <p>
              Paletli ve lastikli makineler çoğunlukla dorsenin hidrolik rampalarından kendi yürüyüşüyle yüklenir. Yük,
              zincir ve gerdirmelerle dorsenin bağlama noktalarına sabitlenir; ağırlık dingillere dengeli dağıtılacak
              şekilde konumlandırılır.
            </p>
          </div>
        </div>
        <figure className="mt-16">
          <div className="bg-blueprint overflow-x-auto border-y border-rule">
            <div className="container">
              <div className="mx-auto min-w-[640px] max-w-[1100px] py-6">
                <TrailerDrawing type="standart" />
              </div>
            </div>
          </div>
          <figcaption className="container mt-3 text-sm text-dim">
            Standart lowbed, yan görünüş: platform ≈ 0,9–1,0 m; 4,00 m yükseklik sınırına göre yük zarfı ≈ 3,0 m.
          </figcaption>
        </figure>
      </RevealSection>

      {/* 02 · görsel ağırlıklı */}
      <RevealSection id="yukler" className="bg-ink">
        <div className="container">
          <div className="grid gap-8 lg:grid-cols-12">
            <GuideHeading index="02" kicker="Yük tipleri" id="yukler" className="lg:col-span-6">
              Hangi yükler için kullanılır?
            </GuideHeading>
            <p className="max-w-[36rem] text-pretty text-lg leading-relaxed text-steel lg:col-span-5 lg:col-start-8 lg:self-end">
              Paletli ve lastikli iş makineleri, mobil kırıcı ve eleme tesisleri, sondaj ekipmanı, tarım makineleri ve
              uzun metrajlı yapı elemanları. Dorse, yükün ağırlığına, yüksekliğine ve boyuna göre seçilir.
            </p>
          </div>

          <div className="mt-14 grid gap-6 lg:grid-cols-12 lg:grid-rows-2">
            {LOAD_PHOTOS.map((photo, i) => (
              <figure key={photo.slug} className={cn("group", i === 0 ? "lg:col-span-7 lg:row-span-2" : "lg:col-span-5")}>
                <div className={cn("overflow-hidden bg-graphite", i === 0 ? "aspect-[4/3] lg:aspect-auto lg:h-[calc(100%-2.25rem)]" : "aspect-[16/9]")}>
                  <Picture
                    slug={photo.slug}
                    alt={photo.alt}
                    sizes={i === 0 ? "(min-width: 1360px) 760px, (min-width: 1024px) 56vw, 100vw" : "(min-width: 1360px) 540px, (min-width: 1024px) 40vw, 100vw"}
                    maxWidth={i === 0 ? 1600 : 960}
                    className="photo-grade h-full w-full object-cover group-hover:scale-[1.025]"
                  />
                </div>
                <figcaption className="mt-2.5 text-sm text-dim">{photo.caption}</figcaption>
              </figure>
            ))}
          </div>

          <dl className="mt-16 grid border-t border-rule lg:grid-cols-3">
            {TRAILERS.map((t, i) => (
              <div key={t.id} className={cn("border-b border-rule py-7 lg:border-b-0", i > 0 && "lg:border-l lg:pl-8", i < 2 && "lg:pr-8")}>
                <dt>
                  <span className="block font-mono text-xs text-dim">{t.code}</span>
                  <span className="mt-1.5 block text-xl">{t.tab}</span>
                </dt>
                <dd className="mt-3 text-pretty leading-relaxed text-steel">{t.tags.join(" · ")}</dd>
              </div>
            ))}
          </dl>
        </div>
      </RevealSection>

      {/* 03 · teknik tablo */}
      <RevealSection id="dorse-tipleri">
        <div className="container grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <GuideHeading index="03" kicker="Katalog" id="dorse-tipleri">
              Dorse tipleri
            </GuideHeading>
            <p className="mt-6 max-w-[34ch] text-pretty text-lg leading-relaxed text-steel">
              Standart lowbed çoğu iş makinesi için yeterlidir. Yük ağırlaştıkça dingil sayısı artar; yük yükseldikçe
              havuzlu dorseye, uzadıkça teleskopik dorseye geçilir.
            </p>
            <Link to="/#filo" className="group mt-8 inline-flex items-center gap-2.5 text-bone">
              <span className="link-rule">Spec sayfalarını incele</span>
              <ArrowRight aria-hidden="true" className="h-4 w-4 text-signal transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="min-w-0 lg:col-span-8 lg:pt-3">
            <CapacityTable bare />
            <p className="mt-4 text-sm text-dim">Tipik değerlerdir; kesin kapasite yük ölçüleri ve güzergah etüdüyle teyit edilir.</p>
          </div>
        </div>
      </RevealSection>

      {/* 04 · çizim ağırlıklı */}
      <RevealSection id="ozel-izin" className="bg-ink">
        <div className="container grid gap-12 lg:grid-cols-12">
          <figure className="min-w-0 lg:order-2 lg:col-span-7 lg:col-start-6">
            <div className="bg-blueprint overflow-x-auto border-y border-rule">
              <GaugeProfile className="mx-auto block h-auto w-full min-w-[520px] max-w-[680px]" />
            </div>
            <figcaption className="mt-3 text-sm text-dim">Arka görünüş: yasal zarf ve genişliği aşan örnek yük (taralı).</figcaption>
          </figure>
          <div className="lg:order-1 lg:col-span-4">
            <GuideHeading index="04" kicker="Mevzuat" id="ozel-izin">
              Ne zaman özel izin gerekir?
            </GuideHeading>
            <p className="mt-6 text-pretty text-lg leading-relaxed text-steel">
              Karayolları Trafik Yönetmeliği'nin genel sınırlarını aşan taşımalar Karayolları Genel Müdürlüğü'nden (KGM)
              alınan özel izinle yapılır. İzin belgesi güzergahı, sevk saatlerini ve eskort koşullarını tanımlar.
            </p>
            <dl className="mt-8 grid grid-cols-2 border-t border-rule">
              {[
                ["Genişlik", fmt(LEGAL_LIMITS.width), "m"],
                ["Yükseklik", fmt(LEGAL_LIMITS.height), "m"],
                ["Çekici + yarı römork", fmt(LEGAL_LIMITS.length), "m"],
                ["Toplam ağırlık", String(LEGAL_LIMITS.grossWeight), "t"],
              ].map(([label, value, unit], i) => (
                <div key={label} className={cn("border-b border-rule py-4", i % 2 === 1 && "border-l pl-5")}>
                  <dt className="text-sm text-dim">{label}</dt>
                  <dd className="mt-1 flex items-baseline gap-1.5">
                    <span className="text-3xl font-medium tracking-[-0.03em] text-bone">{value}</span>
                    <span className="font-mono text-sm text-signal">{unit}</span>
                  </dd>
                </div>
              ))}
            </dl>
            <ul className="mt-8 grid gap-4 text-pretty text-[0.9375rem] leading-relaxed text-steel">
              <li className="border-l border-rule-strong pl-4">
                Çekici ve boş lowbed yaklaşık {PAYLOAD_WITHOUT_PERMIT} t gelir; bu nedenle {PAYLOAD_WITHOUT_PERMIT} t
                üzerindeki makinelerde toplam ağırlık {LEGAL_LIMITS.grossWeight} t sınırını aşar ve izin gerekir.
              </li>
              <li className="border-l border-rule-strong pl-4">
                Toplam yükseklik yol yüzeyinden ölçülür: yük yüksekliğine platform yüksekliği (standart lowbedde ≈{" "}
                {DECK_HEIGHT.standart.toLocaleString("tr-TR", { minimumFractionDigits: 1 })} m) eklenir.
              </li>
              <li className="border-l border-rule-strong pl-4">
                Genişliği sınırı aşan yüklerde ön ve arka eskort aracı ve gerektiğinde trafik ekipleriyle geçiş planı yapılır.
              </li>
            </ul>
          </div>
        </div>
      </RevealSection>

      {/* 05 · metin ağırlıklı */}
      <RevealSection id="fiyat">
        <div className="container">
          <GuideHeading index="05" kicker="Fiyatlandırma" id="fiyat">
            Fiyatı neler belirler?
          </GuideHeading>
          {/* Sırasız etkenler: numaralı kart ızgarası yerine basılı kılavuz gibi sütunlara akan metin */}
          <ul className="mt-14 gap-x-12 border-t border-rule pt-8 sm:columns-2 lg:columns-3 lg:gap-x-16">
            {PRICE_FACTORS.map((f) => (
              <li key={f.title} className="break-inside-avoid pb-7">
                <p className="text-pretty text-lg leading-relaxed text-steel">
                  <strong className="font-medium text-bone">{f.title}.</strong> {f.text}
                </p>
              </li>
            ))}
          </ul>
          <Link to="/#fiyat-talebi" className="btn btn-primary mt-5">
            Yük bildir, teklif al
            <ArrowRight />
          </Link>
        </div>
      </RevealSection>

      {/* 06 · fotoğraf + metin */}
      <RevealSection id="hakkimizda" className="bg-ink">
        <div className="container grid gap-12 lg:grid-cols-12 lg:items-end">
          <figure className="group lg:col-span-5">
            <div className="aspect-[4/3] overflow-hidden bg-graphite">
              <Picture
                slug="man-tgx-3-dingil-lowbed"
                alt="Su kıyısındaki açık alanda park halinde beyaz MAN TGX çekici ve rampaları kaldırılmış kırmızı 3 dingilli lowbed dorse"
                sizes="(min-width: 1360px) 540px, (min-width: 1024px) 40vw, 100vw"
                className="photo-grade h-full w-full object-cover group-hover:scale-[1.025]"
              />
            </div>
            <figcaption className="mt-2.5 text-sm text-dim">Filodan: MAN TGX 18.440 çekici ve 3 dingil hidrolik rampalı lowbed</figcaption>
          </figure>
          <div className="lg:col-span-6 lg:col-start-7">
            <GuideHeading index="06" kicker="Firma" id="hakkimizda">
              Hakkımızda
            </GuideHeading>
            <div className="mt-6 grid gap-5 text-pretty text-lg leading-relaxed text-steel">
              <p>
                {COMPANY.name}, {COMPANY.base} merkezli bir ağır nakliyat firmasıdır. Lowbed dorselerle paletli ve lastikli
                iş makineleri, mobil kırıcı ve eleme tesisleri, sondaj ekipmanları, tarım makineleri ve şantiye ekipmanları
                taşır.
              </p>
              <p>
                Operasyonlar {DISPATCHERS.map((d) => d.name).join(" ve ")} tarafından yürütülür. Güneydoğu ve Doğu Anadolu
                merkezli olmak üzere Türkiye geneli şehirlerarası sevkiyat yapılır; özel izin ve eskort süreçleri
                sevkiyatla birlikte planlanır.
              </p>
            </div>
            <ul className="mt-9 border-t border-rule">
              {DISPATCHERS.map((d) => (
                <li key={d.id} className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-rule py-4">
                  <span className="text-steel">{d.name}</span>
                  <a href={telHref(d.phone)} className="tabular font-mono text-xl text-bone link-u">
                    {d.display}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </RevealSection>
    </PageShell>
  </>
);

export default InfoPage;
