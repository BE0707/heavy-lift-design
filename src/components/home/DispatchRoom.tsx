import { Phone } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import CoverageMap, { MarkerGlyph } from "@/components/home/CoverageMap";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import { COMPANY, DISPATCHERS, telHref, whatsappHref, type Dispatcher } from "@/data/company";
import { PROVINCES_WITH_DISTANCE, TIER_LABEL, type Tier } from "@/data/coverage";

const DispatcherCard = ({ d }: { d: Dispatcher }) => (
  <article aria-labelledby={`dispatcher-${d.id}`} className="border border-rule-strong bg-asphalt/90 shadow-lg transition-all hover:border-rule-strong/80">
    <div className="flex items-center justify-between gap-4 border-b border-rule bg-ink/70 px-5 py-3.5">
      <p className="label text-dim">{d.line} · Sevk &amp; Operasyon</p>
      <p className="label flex items-center gap-2 text-signal">
        <span aria-hidden="true" className="h-1.5 w-1.5 bg-signal shadow-[0_0_6px_rgba(253,184,19,0.7)]" />
        {COMPANY.hours} Aktif
      </p>
    </div>
    <div className="px-5 py-6">
      <h3 id={`dispatcher-${d.id}`} className="font-display text-2xl font-bold uppercase tracking-tight text-bone sm:text-3xl">
        {d.name}
      </h3>
      <a
        href={telHref(d.phone)}
        className="tabular mt-2 inline-block font-mono text-2xl font-semibold text-signal transition-colors hover:text-signal-hover"
      >
        {d.display}
      </a>
    </div>
    <div className="grid grid-cols-2 divide-x divide-rule border-t border-rule bg-ink">
      <a
        href={telHref(d.phone)}
        className="btn border-0 bg-transparent text-bone hover:bg-graphite hover:text-signal"
      >
        <Phone className="text-signal h-4 w-4" />
        Ara
      </a>
      <a
        href={whatsappHref(d.phone)}
        target="_blank"
        rel="noopener noreferrer"
        className="btn border-0 bg-transparent text-bone hover:bg-graphite"
        aria-label={`${d.name} ile WhatsApp üzerinden fiyat al`}
      >
        <WhatsAppIcon className="text-[#25D366] h-4 w-4" />
        <span className="sm:hidden">WhatsApp</span>
        <span className="hidden sm:inline">WhatsApp fiyat al</span>
      </a>
    </div>
  </article>
);

const BASE_FACTS = [
  { label: "Üs", value: `${COMPANY.base}, Türkiye` },
  { label: "Çalışma", value: `${COMPANY.hours} operasyon hattı` },
  { label: "Ana bölge", value: "Güneydoğu & Doğu Anadolu" },
  { label: "Şehirlerarası", value: "Türkiye geneli sevkiyat" },
];

const LEGEND: { tier: Tier; label: string }[] = [
  { tier: "hub", label: `Üs · ${COMPANY.base}` },
  { tier: "core", label: TIER_LABEL.core },
  { tier: "extended", label: TIER_LABEL.extended },
];

const byDistance = [...PROVINCES_WITH_DISTANCE].sort((a, b) => a.km - b.km);

const DispatchRoom = () => (
  <section id="iletisim" aria-labelledby="iletisim-title" className="py-20 lg:py-28 border-b border-rule">
    <div className="container">
      <SectionHeader
        index="05"
        kicker="Operasyon masası"
        titleId="iletisim-title"
        title="Operasyon Masası & Hizmet Bölgesi"
        lead="Fiyat, müsaitlik, özel izin ve eskort planlaması için doğrudan sevk hattına ulaşın. WhatsApp butonu hazır mesajla açılır."
        layout="split"
      />

      <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:gap-10">
        <div className="grid content-start gap-5 lg:col-span-5">
          {DISPATCHERS.map((d) => (
            <DispatcherCard key={d.id} d={d} />
          ))}

          <dl className="grid grid-cols-2 divide-x divide-rule border border-rule bg-ink/70">
            {BASE_FACTS.map((f) => (
              <div key={f.label} className="p-4">
                <dt className="label text-dim">{f.label}</dt>
                <dd className="mt-1.5 font-sans text-sm font-medium text-bone">{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="min-w-0 lg:col-span-7">
          <div className="border border-rule-strong bg-ink/40 shadow-xl">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-rule bg-ink px-5 py-3.5">
              <h3 className="font-display text-lg font-bold uppercase tracking-tight text-bone">
                Operasyon bölgesi
              </h3>
              <p className="font-mono text-2xs uppercase tracking-label text-dim">
                Halkalar: üsse kuş uçuşu mesafe
              </p>
            </div>
            <div className="overflow-x-auto">
              <CoverageMap />
            </div>
            <ul className="flex flex-wrap gap-x-6 gap-y-2 border-t border-rule bg-ink px-5 py-3.5">
              {LEGEND.map((l) => (
                <li key={l.tier} className="flex items-center gap-2 text-xs font-mono text-steel">
                  <MarkerGlyph tier={l.tier} />
                  {l.label}
                </li>
              ))}
              <li className="text-xs font-mono text-steel/80">Şehirlerarası: Türkiye geneli</li>
            </ul>
          </div>

          <details className="group mt-4 border border-rule bg-asphalt/50">
            <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between px-5 font-condensed text-[1.0625rem] font-bold uppercase tracking-wider text-bone hover:bg-graphite transition-colors [&::-webkit-details-marker]:hidden">
              İl listesi ve mesafeler (tablo)
              <span aria-hidden="true" className="font-mono text-base text-steel transition-transform group-open:rotate-45">+</span>
            </summary>
            <div className="overflow-x-auto border-t border-rule">
              <table className="w-full min-w-[480px] border-collapse text-left">
                <caption className="sr-only">Diyarbakır üssüne kuş uçuşu mesafeye göre sıralı iller</caption>
                <thead className="bg-ink border-b border-rule">
                  <tr>
                    {["Plaka", "İl", "Bölge", "Kuş uçuşu"].map((h) => (
                      <th key={h} scope="col" className="label px-4 py-3 font-medium text-steel">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-rule tabular">
                  {byDistance.map((p) => (
                    <tr key={p.plate} className="transition-colors hover:bg-graphite/40">
                      <td className="px-4 py-2.5 font-mono text-sm text-dim">{p.plate}</td>
                      <th scope="row" className="px-4 py-2.5 font-sans font-medium text-bone">
                        {p.name}
                      </th>
                      <td className="px-4 py-2.5 font-sans text-sm text-steel">{TIER_LABEL[p.tier]}</td>
                      <td className="px-4 py-2.5 font-mono text-sm text-signal">{p.tier === "hub" ? "—" : `≈ ${p.km} km`}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </details>
        </div>
      </div>
    </div>
  </section>
);

export default DispatchRoom;
