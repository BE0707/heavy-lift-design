import { Phone } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import CoverageMap, { MarkerGlyph } from "@/components/home/CoverageMap";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import { COMPANY, DISPATCHERS, telHref, whatsappHref, type Dispatcher } from "@/data/company";
import { PROVINCES_WITH_DISTANCE, TIER_LABEL, type Tier } from "@/data/coverage";

const DispatcherCard = ({ d }: { d: Dispatcher }) => (
  <article aria-labelledby={`dispatcher-${d.id}`} className="border border-rule-strong bg-graphite">
    <div className="flex items-center justify-between gap-4 border-b border-rule px-5 py-3">
      <p className="label">{d.line} · Sevk & operasyon</p>
      <p className="label flex items-center gap-2">
        <span aria-hidden="true" className="h-1.5 w-1.5 bg-signal" />
        {COMPANY.hours}
      </p>
    </div>
    <div className="px-5 py-5">
      <h3 id={`dispatcher-${d.id}`} className="text-3xl uppercase tracking-[0.02em]">
        {d.name}
      </h3>
      <a href={telHref(d.phone)} className="tabular mt-2 inline-block font-mono text-2xl text-bone transition-colors hover:text-signal">
        {d.display}
      </a>
    </div>
    <div className="grid grid-cols-2 gap-px border-t border-rule bg-rule">
      <a href={telHref(d.phone)} className="btn border-0 bg-graphite text-bone hover:bg-plate">
        <Phone className="text-signal" />
        Ara
      </a>
      <a
        href={whatsappHref(d.phone)}
        target="_blank"
        rel="noopener noreferrer"
        className="btn border-0 bg-graphite text-bone hover:bg-plate"
        aria-label={`${d.name} ile WhatsApp üzerinden fiyat al`}
      >
        <WhatsAppIcon className="text-[#25D366]" />
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
  <section id="iletisim" aria-labelledby="iletisim-title" className="py-20 lg:py-28">
    <div className="container">
      <SectionHeader
        index="05"
        kicker="Operasyon masası"
        titleId="iletisim-title"
        title="Operasyon Masası & Hizmet Bölgesi"
        lead="Fiyat, müsaitlik, özel izin ve eskort planlaması için doğrudan sevk hattına ulaşın. WhatsApp butonu hazır mesajla açılır."
      />

      <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:gap-10">
        <div className="grid content-start gap-4 lg:col-span-5">
          {DISPATCHERS.map((d) => (
            <DispatcherCard key={d.id} d={d} />
          ))}
          <dl className="grid grid-cols-2 gap-px border border-rule bg-rule">
            {BASE_FACTS.map((f) => (
              <div key={f.label} className="bg-asphalt px-4 py-4">
                <dt className="label">{f.label}</dt>
                <dd className="mt-1.5 text-bone">{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="min-w-0 lg:col-span-7">
          <div className="border border-rule-strong">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-rule-strong bg-ink px-5 py-3">
              <h3 className="text-xl uppercase tracking-[0.03em]">Operasyon bölgesi</h3>
              <p className="label">Halkalar: üsse kuş uçuşu mesafe</p>
            </div>
            <div className="overflow-x-auto">
              <CoverageMap />
            </div>
            <ul className="flex flex-wrap gap-x-6 gap-y-2 border-t border-rule-strong bg-ink px-5 py-3">
              {LEGEND.map((l) => (
                <li key={l.tier} className="flex items-center gap-2 text-sm text-steel">
                  <MarkerGlyph tier={l.tier} />
                  {l.label}
                </li>
              ))}
              <li className="text-sm text-steel">Şehirlerarası: Türkiye geneli</li>
            </ul>
          </div>

          <details className="group mt-4 border border-rule">
            <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between px-5 font-display text-[1.0625rem] font-semibold uppercase tracking-[0.03em] hover:bg-graphite [&::-webkit-details-marker]:hidden">
              İl listesi ve mesafeler (tablo)
              <span aria-hidden="true" className="font-mono text-lg text-steel transition-transform group-open:rotate-45">+</span>
            </summary>
            <div className="overflow-x-auto border-t border-rule">
              <table className="w-full min-w-[480px] border-collapse text-left">
                <caption className="sr-only">Diyarbakır üssüne kuş uçuşu mesafeye göre sıralı iller</caption>
                <thead className="bg-ink">
                  <tr>
                    {["Plaka", "İl", "Bölge", "Kuş uçuşu"].map((h) => (
                      <th key={h} scope="col" className="label px-4 py-2.5 font-medium">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="tabular">
                  {byDistance.map((p) => (
                    <tr key={p.plate} className="border-t border-rule">
                      <td className="px-4 py-2 font-mono text-sm text-dim">{p.plate}</td>
                      <th scope="row" className="px-4 py-2 font-normal text-bone">
                        {p.name}
                      </th>
                      <td className="px-4 py-2 text-sm text-steel">{TIER_LABEL[p.tier]}</td>
                      <td className="px-4 py-2 font-mono text-sm text-bone">{p.tier === "hub" ? "—" : `≈ ${p.km} km`}</td>
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
