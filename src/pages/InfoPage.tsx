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
  <section id={id} aria-labelledby={`${id ?? index}-title`} className="grid gap-8 border-t border-rule py-16 lg:grid-cols-12 lg:gap-12 lg:py-24">
    <div className="min-w-0 lg:col-span-4">
      <p className="label flex items-center gap-2.5 text-signal">
        <span className="font-mono text-xs font-semibold">{index}</span>
        <span aria-hidden="true" className="h-px w-8 bg-rule-strong" />
      </p>
      <h2 id={`${id ?? index}-title`} className="mt-4 text-balance font-display text-3xl font-bold uppercase tracking-tight text-bone sm:text-4xl lg:leading-[1.05]">
        {title}
      </h2>
    </div>
    <div className="min-w-0 lg:col-span-8">{children}</div>
  </section>
);

const InfoPage = () => (
  <>
    <SEO title={PAGES.bilgi.title} description={PAGES.bilgi.description} />
    <PageShell>
      <div className="border-b border-rule bg-gradient-to-b from-ink to-asphalt">
        <div className="container py-14 lg:py-20">
          <nav aria-label="Konum" className="label flex items-center gap-2 text-dim font-mono text-xs">
            <Link to="/" className="hover:text-bone transition-colors">
              Ana sayfa
            </Link>
            <span aria-hidden="true" className="text-dim/60">/</span>
            <span aria-current="page" className="text-signal">Lowbed rehberi</span>
          </nav>
          <h1 className="mt-6 max-w-4xl text-balance font-display text-4xl font-bold uppercase tracking-tight text-bone sm:text-6xl lg:text-7xl lg:leading-[0.95]">
            Lowbed Taşımacılık Rehberi
          </h1>
          <p className="mt-5 max-w-2xl text-pretty font-sans text-base leading-relaxed text-steel lg:text-lg">
            Dorse tipleri, yasal gabari sınırları, özel izin ve eskort süreci. Yükünüzü bildirmeden önce bilmeniz gereken teknik detaylar.
          </p>
        </div>
      </div>

      <div className="container">
        <Section id="lowbed-nedir" index="01" title="Lowbed nedir?">
          <div className="grid gap-5 text-pretty font-sans text-base leading-relaxed text-steel lg:text-lg">
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
          <p className="mb-6 text-pretty font-sans text-base leading-relaxed text-steel lg:text-lg">
            Standart lowbed çoğu iş makinesi için yeterlidir. Yük ağırlaştıkça dingil sayısı artar; yük yükseldikçe
            havuzlu dorseye, uzadıkça teleskopik dorseye geçilir.
          </p>
          <CapacityTable />
          <Link to="/#filo" className="btn btn-outline mt-8 group">
            <span>Spec sayfalarını incele</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Section>

        <Section id="ozel-izin" index="03" title="Ne zaman özel izin gerekir?">
          <div className="grid gap-5 text-pretty font-sans text-base leading-relaxed text-steel lg:text-lg">
            <p>
              Karayolları Trafik Yönetmeliği'nin genel sınırlarını aşan taşımalar Karayolları Genel Müdürlüğü'nden (KGM)
              alınan özel izinle yapılır. İzin belgesi güzergahı, sevk saatlerini ve eskort koşullarını tanımlar.
            </p>
          </div>
          <dl className="mt-8 grid grid-cols-2 gap-4 border-y border-rule py-6 sm:grid-cols-4">
            {[
              ["Genişlik", `${fmt(LEGAL_LIMITS.width)} m`],
              ["Yükseklik", `${fmt(LEGAL_LIMITS.height)} m`],
              ["Çekici + yarı römork", `${fmt(LEGAL_LIMITS.length)} m`],
              ["Toplam ağırlık", `${LEGAL_LIMITS.grossWeight} t`],
            ].map(([label, value]) => (
              <div key={label} className="border-l border-rule pl-4">
                <dt className="label text-dim">{label}</dt>
                <dd className="mt-2 font-display text-3xl font-bold tabular text-bone">{value}</dd>
              </div>
            ))}
          </dl>
          <ul className="mt-8 grid gap-4 text-sm font-sans text-steel">
            <li className="border-l-2 border-signal pl-4 leading-relaxed">
              Çekici ve boş lowbed yaklaşık {PAYLOAD_WITHOUT_PERMIT} t gelir; bu nedenle {PAYLOAD_WITHOUT_PERMIT} t
              üzerindeki makinelerde toplam ağırlık {LEGAL_LIMITS.grossWeight} t sınırını aşar ve izin gerekir.
            </li>
            <li className="border-l-2 border-signal pl-4 leading-relaxed">
              Toplam yükseklik yol yüzeyinden ölçülür: yük yüksekliğine platform yüksekliği (standart lowbedde ≈ 0,9–1,0 m)
              eklenir.
            </li>
            <li className="border-l-2 border-signal pl-4 leading-relaxed">
              Genişliği sınırı aşan yüklerde ön ve arka eskort aracı ve gerektiğinde trafik ekipleriyle geçiş planı yapılır.
            </li>
          </ul>
        </Section>

        <Section id="fiyat" index="04" title="Fiyatı neler belirler?">
          <ol className="grid gap-6 sm:grid-cols-2">
            {PRICE_FACTORS.map((f, i) => (
              <li key={f.title} className="border-t border-rule pt-4">
                <p className="font-mono text-xs font-semibold text-signal">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-2 font-display text-xl font-bold uppercase tracking-tight text-bone">{f.title}</h3>
                <p className="mt-1.5 text-pretty font-sans text-sm leading-relaxed text-steel">{f.text}</p>
              </li>
            ))}
          </ol>
          <Link to="/#fiyat-talebi" className="btn btn-primary mt-8 group">
            <span>Yük bildir · Fiyat al</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Section>

        <Section id="hakkimizda" index="05" title="Hakkımızda">
          <div className="grid gap-5 text-pretty font-sans text-base leading-relaxed text-steel lg:text-lg">
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
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {DISPATCHERS.map((d) => (
              <a key={d.id} href={telHref(d.phone)} className="btn btn-outline h-auto flex-wrap justify-between gap-y-1 whitespace-normal py-4">
                <span className="flex items-center gap-2.5">
                  <Phone className="h-4 w-4 text-signal" />
                  <span className="font-medium text-bone">{d.name}</span>
                </span>
                <span className="tabular font-mono text-sm tracking-normal text-signal font-semibold">{d.display}</span>
              </a>
            ))}
          </div>
        </Section>
      </div>
    </PageShell>
  </>
);

export default InfoPage;
