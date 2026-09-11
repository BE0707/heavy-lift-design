import { Link } from "react-router-dom";
import { ArrowRight, Phone } from "lucide-react";
import Picture from "@/components/Picture";
import { PRIMARY_DISPATCHER, telHref } from "@/data/company";

/**
 * Fotoğraf üzerindeki teknik açıklamalar. Koordinatlar kaynak görselin
 * (1600×1200) piksel sistemindedir; çerçeve 4:3 kilitli olduğu için yüzdeler kaymaz.
 */
const CALLOUTS = [
  { point: [760, 610], label: [520, 300], text: "Sany SY385H · 38 t sınıfı" },
  { point: [1290, 700], label: [1180, 430], text: "MAN TGX çekici" },
  { point: [480, 862], label: [300, 1045], text: "3 dingil lowbed · hidrolik rampa" },
] as const;

const pct = (v: number, of: number) => `${(v / of) * 100}%`;

const AnnotatedPhoto = () => (
  <figure>
    <div className="corner-ticks relative aspect-[4/3] border border-rule-strong bg-graphite">
      <Picture
        slug="sany-sy385h-ekskavator"
        alt="MAN TGX çekici ve kırmızı 3 dingilli hidrolik rampalı lowbed dorse üzerinde sarı Sany SY385H paletli ekskavatör, açık arazide stabilize yolda"
        sizes="(min-width: 1320px) 740px, (min-width: 1024px) 56vw, 100vw"
        priority
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div aria-hidden="true" className="absolute inset-0 hidden md:block">
        <svg viewBox="0 0 1600 1200" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
          {CALLOUTS.map(({ point, label }) => (
            <line
              key={label.join()}
              x1={point[0]}
              y1={point[1]}
              x2={label[0]}
              y2={label[1]}
              stroke="#FDB813"
              strokeWidth={1.5}
              vectorEffect="non-scaling-stroke"
            />
          ))}
        </svg>
        {CALLOUTS.map(({ point, label, text }) => (
          <div key={text}>
            <span
              className="absolute h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 border-2 border-ink bg-signal"
              style={{ left: pct(point[0], 1600), top: pct(point[1], 1200) }}
            />
            <span
              className="absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap border border-rule-strong bg-ink/90 px-2.5 py-1.5 font-mono text-2xs font-medium uppercase tracking-label text-bone"
              style={{ left: pct(label[0], 1600), top: pct(label[1], 1200) }}
            >
              {text}
            </span>
          </div>
        ))}
      </div>
    </div>
    <figcaption className="mt-3 flex flex-wrap justify-between gap-x-6 gap-y-1">
      <span className="label">Saha kaydı · paletli ekskavatör transferi</span>
      <span className="label text-dim">Gerçek saha fotoğrafı</span>
    </figcaption>
  </figure>
);

const CAPABILITIES = [
  { label: "Lowbed seçenekleri", value: "4–8 dingil", note: "Standart, havuzlu ve teleskopik dorse" },
  { label: "Maks. faydalı yük", value: "80 ton", note: "Çok dingilli havuzlu dorseyle" },
  { label: "Gabari dışı", value: "Ağır sanayi", note: "Genişlik > 2,55 m · yükseklik > 4,00 m" },
  { label: "Türkiye geneli", value: "Güzergah & izin", note: "KGM özel izin · eskort koordinasyonu" },
] as const;

const CapabilityStrip = () => (
  <div className="border-t border-rule bg-ink">
    <div className="container">
      <dl className="grid grid-cols-2 gap-px border-x border-rule bg-rule lg:grid-cols-4">
        {CAPABILITIES.map((c) => (
          <div key={c.label} className="bg-ink px-4 py-6 sm:px-6 lg:py-8">
            <dt className="label">{c.label}</dt>
            <dd className="mt-2 font-display text-[1.75rem] font-semibold uppercase leading-none tracking-[0.01em] text-bone sm:text-3xl">
              {c.value}
            </dd>
            <dd className="mt-2 text-sm leading-snug text-steel">{c.note}</dd>
          </div>
        ))}
      </dl>
    </div>
  </div>
);

const Hero = () => (
  <section aria-labelledby="hero-title" className="border-b border-rule">
    <div className="container grid gap-10 py-10 sm:py-14 lg:grid-cols-12 lg:items-center lg:gap-12 lg:py-20">
      <div className="lg:col-span-5">
        <h1 id="hero-title">
          <span className="flex items-center gap-3 font-mono text-xs font-medium uppercase tracking-[0.12em] text-signal sm:text-sm">
            <span aria-hidden="true" className="h-px w-8 bg-signal" />
            Diyarbakır ve Güneydoğu merkezli
          </span>
          <span className="mt-5 block text-balance font-display text-[2.625rem] font-bold uppercase leading-[0.92] tracking-[0.005em] sm:text-6xl xl:text-7xl">
            Gabari Dışı Ağır Taşımacılık &amp; Lowbed Operasyonları
          </span>
        </h1>
        <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-steel">
          Ekskavatör, dozer, vinç, kule vinç ve ağır sanayi ekipmanları için özel izinli, eskort destekli şehirlerarası
          lowbed transfer çözümleri.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link to="/#fiyat-talebi" className="btn btn-primary">
            Yük bildir · Fiyat al
            <ArrowRight />
          </Link>
          <a href={telHref(PRIMARY_DISPATCHER.phone)} className="btn btn-outline">
            <Phone />
            <span className="tabular">{PRIMARY_DISPATCHER.display}</span>
          </a>
        </div>
      </div>
      <div className="lg:col-span-7">
        <AnnotatedPhoto />
      </div>
    </div>
    <CapabilityStrip />
  </section>
);

export default Hero;
