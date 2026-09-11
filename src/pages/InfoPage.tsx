import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Phone } from "lucide-react";
import SEO from "@/components/SEO";
import PageShell from "@/components/layout/PageShell";
import CapacityTable from "@/components/CapacityTable";
import { COMPANY, DISPATCHERS, telHref } from "@/data/company";
import { PAGES } from "@/data/seo";
import { LEGAL_LIMITS, PAYLOAD_WITHOUT_PERMIT } from "@/lib/load-check";

const fmt = (n: number) => n.toLocaleString("tr-TR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const PRICE_FACTORS = [
  { title: "Mesafe ve güzergah", text: "Çıkış–varış arası kilometre, dağ yolu veya şehir içi geçişler, köprü ve üst geçit kısıtları." },
  { title: "Yük ağırlığı ve ölçüleri", text: "Dorse tipini ve dingil sayısını belirler; havuzlu veya çok dingilli dorse maliyeti artırır." },
  { title: "Özel izin ve eskort", text: "Gabari dışı genişlik, yükseklik veya ağırlıkta KGM izni ve refakat aracı ihtiyacı." },
  { title: "Yükleme ve indirme", text: "Makinenin kendi yürüyüşüyle rampadan çıkması ya da vinç gerektirmesi, sökülecek ataşmanlar." },
  { title: "Şantiye erişimi", text: "Dar giriş, rampalı veya stabilize yol, zemin durumu ve bekleme süresi." },
  { title: "Tarih esnekliği", text: "İzinli sevk saatleri, hafta sonu ve bayram kısıtları ile acil sevkiyat talebi." },
] as const;

const Section = ({ id, index, title, children }: { id?: string; index: string; title: string; children: ReactNode }) => (
  <section id={id} aria-labelledby={`${id ?? index}-title`} className="grid gap-6 border-t border-rule py-14 lg:grid-cols-12 lg:gap-10 lg:py-20">
    <div className="min-w-0 lg:col-span-4">
      <p className="label flex items-center gap-3">
        <span className="text-signal">{index}</span>
        <span aria-hidden="true" className="h-px w-10 bg-rule-strong" />
      </p>
      <h2 id={`${id ?? index}-title`} className="mt-4 text-balance text-4xl leading-[0.95]">
        {title}
      </h2>
    </div>
    {/* min-w-0: geniş tablo (overflow-x-auto) grid sütununu mobilde taşırmasın */}
    <div className="min-w-0 lg:col-span-8">{children}</div>
  </section>
);

const InfoPage = () => (
  <>
    <SEO title={PAGES.bilgi.title} description={PAGES.bilgi.description} />
    <PageShell>
      <div className="border-b border-rule bg-ink">
        <div className="container py-12 lg:py-16">
          <nav aria-label="Konum" className="label">
            <Link to="/" className="-my-1.5 inline-block py-1.5 hover:text-bone">
              Ana sayfa
            </Link>
            <span aria-hidden="true" className="mx-2 text-dim">/</span>
            <span aria-current="page" className="text-bone">Lowbed rehberi</span>
          </nav>
          <h1 className="mt-6 max-w-4xl text-balance font-display text-5xl font-bold uppercase leading-[0.92] sm:text-6xl">
            Lowbed Taşımacılık Rehberi
          </h1>
          <p className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-steel">
            Dorse tipleri, yasal gabari sınırları, özel izin ve eskort süreci. Yükünüzü bildirmeden önce bilmeniz gerekenler.
          </p>
        </div>
      </div>

      <div className="container">
        <Section id="lowbed-nedir" index="01" title="Lowbed nedir?">
          <div className="grid gap-5 text-pretty text-lg leading-relaxed text-steel">
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
        </Section>

        <Section id="dorse-tipleri" index="02" title="Dorse tipleri">
          <p className="mb-6 text-pretty text-lg leading-relaxed text-steel">
            Standart lowbed çoğu iş makinesi için yeterlidir. Yük ağırlaştıkça dingil sayısı artar; yük yükseldikçe
            havuzlu dorseye, uzadıkça teleskopik dorseye geçilir.
          </p>
          <CapacityTable />
          <Link to="/#filo" className="btn btn-outline mt-6">
            Spec sayfalarını incele
            <ArrowRight />
          </Link>
        </Section>

        <Section id="ozel-izin" index="03" title="Ne zaman özel izin gerekir?">
          <div className="grid gap-5 text-pretty text-lg leading-relaxed text-steel">
            <p>
              Karayolları Trafik Yönetmeliği'nin genel sınırlarını aşan taşımalar Karayolları Genel Müdürlüğü'nden (KGM)
              alınan özel izinle yapılır. İzin belgesi güzergahı, sevk saatlerini ve eskort koşullarını tanımlar.
            </p>
          </div>
          <dl className="mt-6 grid grid-cols-2 gap-px border border-rule bg-rule sm:grid-cols-4">
            {[
              ["Genişlik", `${fmt(LEGAL_LIMITS.width)} m`],
              ["Yükseklik", `${fmt(LEGAL_LIMITS.height)} m`],
              ["Çekici + yarı römork", `${fmt(LEGAL_LIMITS.length)} m`],
              ["Toplam ağırlık", `${LEGAL_LIMITS.grossWeight} t`],
            ].map(([label, value]) => (
              <div key={label} className="bg-asphalt px-4 py-4">
                <dt className="label">{label}</dt>
                <dd className="mt-1.5 font-display text-3xl font-semibold text-bone">{value}</dd>
              </div>
            ))}
          </dl>
          <ul className="mt-6 grid gap-3 text-steel">
            <li className="border-l-2 border-signal pl-4">
              Çekici ve boş lowbed yaklaşık {PAYLOAD_WITHOUT_PERMIT} t gelir; bu nedenle {PAYLOAD_WITHOUT_PERMIT} t
              üzerindeki makinelerde toplam ağırlık {LEGAL_LIMITS.grossWeight} t sınırını aşar ve izin gerekir.
            </li>
            <li className="border-l-2 border-signal pl-4">
              Toplam yükseklik yol yüzeyinden ölçülür: yük yüksekliğine platform yüksekliği (standart lowbedde ≈ 0,9–1,0 m)
              eklenir.
            </li>
            <li className="border-l-2 border-signal pl-4">
              Genişliği sınırı aşan yüklerde ön ve arka eskort aracı ve gerektiğinde trafik ekipleriyle geçiş planı yapılır.
            </li>
          </ul>
        </Section>

        <Section id="fiyat" index="04" title="Fiyatı neler belirler?">
          <ol className="grid gap-px border border-rule bg-rule sm:grid-cols-2">
            {PRICE_FACTORS.map((f, i) => (
              <li key={f.title} className="bg-asphalt p-5">
                <p className="font-mono text-sm text-signal">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-2 text-xl uppercase tracking-[0.02em]">{f.title}</h3>
                <p className="mt-1.5 text-pretty text-steel">{f.text}</p>
              </li>
            ))}
          </ol>
          <Link to="/#fiyat-talebi" className="btn btn-primary mt-6">
            Yük bildir · Fiyat al
            <ArrowRight />
          </Link>
        </Section>

        <Section id="hakkimizda" index="05" title="Hakkımızda">
          <div className="grid gap-5 text-pretty text-lg leading-relaxed text-steel">
            <p>
              {COMPANY.name}, {COMPANY.base} merkezli bir ağır nakliyat firmasıdır. Lowbed dorselerle paletli ve lastikli
              iş makineleri, mobil kırıcı ve eleme tesisleri, sondaj ekipmanları, tarım makineleri ve şantiye
              ekipmanları taşır.
            </p>
            <p>
              Operasyonlar {DISPATCHERS.map((d) => d.name).join(" ve ")} tarafından yürütülür. Güneydoğu ve Doğu
              Anadolu merkezli olmak üzere Türkiye geneli şehirlerarası sevkiyat yapılır; özel izin ve eskort süreçleri
              sevkiyatla birlikte planlanır.
            </p>
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {DISPATCHERS.map((d) => (
              <a key={d.id} href={telHref(d.phone)} className="btn btn-outline h-auto flex-wrap justify-between gap-y-1 whitespace-normal py-3">
                <span className="flex items-center gap-2.5">
                  <Phone />
                  {d.name}
                </span>
                <span className="tabular font-mono text-sm tracking-normal">{d.display}</span>
              </a>
            ))}
          </div>
        </Section>
      </div>
    </PageShell>
  </>
);

export default InfoPage;
