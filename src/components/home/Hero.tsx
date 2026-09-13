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
  <figure className="relative">
    <div className="corner-ticks relative aspect-[4/3] border border-rule-strong bg-graphite shadow-2xl">
      <Picture
        slug="sany-sy385h-ekskavator"
        alt="MAN TGX çekici ve kırmızı 3 dingilli hidrolik rampalı lowbed dorse üzerinde sarı Sany SY385H paletli ekskavatör, açık arazide stabilize yolda"
        sizes="(min-width: 1320px) 740px, (min-width: 1024px) 56vw, 100vw"
        priority
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div aria-hidden="true" className="absolute inset-0 hidden md:block pointer-events-none">
        <svg viewBox="0 0 1600 1200" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
          {CALLOUTS.map(({ point, label }) => (
            <g key={label.join()}>
              <line
                x1={point[0]}
                y1={point[1]}
                x2={label[0]}
                y2={label[1]}
                stroke="#FDB813"
                strokeWidth={1.2}
                strokeDasharray="4 3"
                vectorEffect="non-scaling-stroke"
                opacity={0.85}
              />
            </g>
          ))}
        </svg>
        {CALLOUTS.map(({ point, label, text }) => (
          <div key={text}>
            <span
              className="absolute h-2 w-2 -translate-x-1/2 -translate-y-1/2 border border-ink bg-signal shadow-[0_0_8px_rgba(253,184,19,0.6)]"
              style={{ left: pct(point[0], 1600), top: pct(point[1], 1200) }}
            />
            <span
              className="absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap border border-rule-strong bg-ink/95 px-2.5 py-1 font-mono text-2xs font-medium uppercase tracking-label text-bone backdrop-blur-sm"
              style={{ left: pct(label[0], 1600), top: pct(label[1], 1200) }}
            >
              {text}
            </span>
          </div>
        ))}
      </div>
    </div>
    <figcaption className="mt-3.5 flex flex-wrap items-center justify-between gap-x-6 gap-y-1 text-xs">
      <span className="label flex items-center gap-2 text-steel">
        <span className="inline-block h-1 w-1 bg-signal" aria-hidden="true" />
        Saha kaydı · paletli ekskavatör transferi
      </span>
      <span className="font-mono text-2xs uppercase tracking-label text-dim">
        Arşiv No: 2026-F01 · Doğrulanmış saha görseli
      </span>
    </figcaption>
  </figure>
);

const CAPABILITIES = [
  { index: "01", label: "Lowbed seçenekleri", value: "4–8 dingil", note: "Standart, havuzlu ve teleskopik dorse" },
  { index: "02", label: "Maks. faydalı yük", value: "80 ton", note: "Çok dingilli havuzlu dorseyle" },
  { index: "03", label: "Gabari dışı", value: "Ağır sanayi", note: "Genişlik > 2,55 m · yükseklik > 4,00 m" },
  { index: "04", label: "Türkiye geneli", value: "Güzergah & izin", note: "KGM özel izin · eskort koordinasyonu" },
] as const;

const CapabilityStrip = () => (
  <div className="border-t border-rule bg-ink/70">
    <div className="container">
      <dl className="grid grid-cols-2 divide-y divide-rule sm:divide-y-0 sm:divide-x divide-rule lg:grid-cols-4">
        {CAPABILITIES.map((c) => (
          <div key={c.label} className="group py-6 pr-4 sm:px-6 lg:py-8 transition-colors hover:bg-graphite/40">
            <dt className="label flex items-center justify-between text-dim">
              <span>{c.label}</span>
              <span className="font-mono text-2xs opacity-40 group-hover:text-signal group-hover:opacity-100 transition-colors">
                {c.index}
              </span>
            </dt>
            <dd className="mt-2.5 font-display text-2xl font-bold uppercase tracking-tight text-bone sm:text-3xl lg:text-[2rem]">
              {c.value}
            </dd>
            <dd className="mt-1.5 font-sans text-xs leading-relaxed text-steel/90">{c.note}</dd>
          </div>
        ))}
      </dl>
    </div>
  </div>
);

const Hero = () => (
  <section aria-labelledby="hero-title" className="border-b border-rule bg-gradient-to-b from-ink/60 to-asphalt">
    <div className="container py-12 sm:py-16 lg:py-24">
      <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-14">
        <div className="lg:col-span-6">
          <p className="label flex items-center gap-2.5 text-signal font-mono text-xs">
            <span aria-hidden="true" className="h-1.5 w-1.5 bg-signal" />
            <span>Diyarbakır ve Güneydoğu merkezli · 37.91° N, 40.23° E</span>
          </p>

          <h1
            id="hero-title"
            className="mt-6 text-balance font-display text-[2.75rem] font-bold uppercase tracking-[-0.03em] leading-[0.95] text-bone sm:text-6xl xl:text-[4.25rem]"
          >
            Gabari Dışı Ağır Taşımacılık &amp; Lowbed Operasyonları
          </h1>

          <p className="mt-6 max-w-xl text-pretty font-sans text-base leading-relaxed text-steel lg:text-lg">
            Ekskavatör, dozer, vinç, kule vinç ve ağır sanayi ekipmanları için özel izinli, eskort destekli şehirlerarası
            lowbed transfer çözümleri.
          </p>

          <div className="mt-9 flex flex-col gap-3.5 sm:flex-row sm:items-center">
            <Link to="/#fiyat-talebi" className="btn btn-primary group">
              <span>Yük bildir · Fiyat al</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <a href={telHref(PRIMARY_DISPATCHER.phone)} className="btn btn-outline group">
              <Phone className="h-4 w-4 text-signal transition-transform group-hover:scale-110" />
              <span className="tabular font-mono tracking-tight">{PRIMARY_DISPATCHER.display}</span>
            </a>
          </div>

          <div className="mt-8 flex items-center gap-6 border-t border-rule/80 pt-5 text-xs text-dim font-mono">
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 bg-signal" />
              7/24 Kesintisiz Sevk Hattı
            </span>
            <span>·</span>
            <span>KGM İzin &amp; Güzergah Etüdü</span>
          </div>
        </div>

        <div className="lg:col-span-6">
          <AnnotatedPhoto />
        </div>
      </div>
    </div>
    <CapabilityStrip />
  </section>
);

export default Hero;
