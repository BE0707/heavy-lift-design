import SectionHeader from "@/components/SectionHeader";
import CoverageMap, { MarkerGlyph } from "@/components/home/CoverageMap";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import { COMPANY, DISPATCHERS, telHref, whatsappHref } from "@/data/company";
import { PROVINCES_WITH_DISTANCE, TIER_LABEL, type Tier } from "@/data/coverage";
import { useReveal } from "@/hooks/use-reveal";

const BASE_FACTS = [
  { label: "Üs", value: `${COMPANY.base}, Türkiye` },
  { label: "Çalışma", value: `${COMPANY.hours} operasyon hattı` },
  { label: "Ana bölge", value: "Güneydoğu ve Doğu Anadolu" },
  { label: "Şehirlerarası", value: "Türkiye geneli sevkiyat" },
];

const LEGEND: { tier: Tier; label: string }[] = [
  { tier: "hub", label: `Üs · ${COMPANY.base}` },
  { tier: "core", label: TIER_LABEL.core },
  { tier: "extended", label: TIER_LABEL.extended },
];

const byDistance = [...PROVINCES_WITH_DISTANCE].sort((a, b) => a.km - b.km);

const DispatchRoom = () => {
  const revealRef = useReveal<HTMLDivElement>();

  return (
    <section id="iletisim" aria-labelledby="iletisim-title" className="border-t border-rule py-24 lg:py-32">
      <div ref={revealRef} className="container grid gap-16 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <SectionHeader
            index="05"
            kicker="Operasyon masası"
            titleId="iletisim-title"
            title="Operasyon Masası & Hizmet Bölgesi"
            lead="Fiyat, müsaitlik, özel izin ve eskort planlaması için doğrudan sevk hattına ulaşın. WhatsApp bağlantısı hazır mesajla açılır."
          />

          <ul className="mt-14 border-t border-rule">
            {DISPATCHERS.map((d) => (
              <li key={d.id} className="border-b border-rule py-7">
                <p className="font-mono text-xs text-dim">{d.line} · Sevk ve operasyon</p>
                <h3 className="mt-2.5 text-2xl">{d.name}</h3>
                <a
                  href={telHref(d.phone)}
                  className="tabular mt-1 inline-block font-mono text-[clamp(1.5rem,1.2rem+0.9vw,1.875rem)] tracking-[-0.02em] text-bone link-u"
                >
                  {d.display}
                </a>
                <p className="-mb-2.5 mt-1.5 flex flex-wrap gap-x-7 text-sm">
                  <a href={telHref(d.phone)} className="py-2.5 pr-2 text-steel transition-colors hover:text-bone">
                    <span className="link-rule">Ara</span>
                  </a>
                  <a
                    href={whatsappHref(d.phone)}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${d.name} ile WhatsApp üzerinden teklif al`}
                    className="inline-flex items-center gap-2 py-2.5 text-steel transition-colors hover:text-bone"
                  >
                    <WhatsAppIcon className="h-3.5 w-3.5" />
                    <span className="link-rule">WhatsApp'tan teklif al</span>
                  </a>
                </p>
              </li>
            ))}
          </ul>

          <dl className="mt-10 grid grid-cols-2 gap-y-6">
            {BASE_FACTS.map((f, i) => (
              <div key={f.label} className={i % 2 === 1 ? "border-l pl-5" : "pr-4"}>
                <dt className="text-sm text-dim">{f.label}</dt>
                <dd className="mt-1 text-bone">{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="min-w-0 lg:col-span-7 lg:pt-2">
          <figure>
            <div className="flex flex-wrap items-baseline justify-between gap-3 pb-4">
              <h3 className="text-xl">Operasyon bölgesi</h3>
              <p className="font-mono text-xs text-dim">Halkalar: üsse kuş uçuşu mesafe</p>
            </div>
            <div className="overflow-x-auto border-y border-rule">
              <CoverageMap />
            </div>
            <figcaption>
              <ul className="flex flex-wrap gap-x-6 gap-y-2 py-4">
                {LEGEND.map((l) => (
                  <li key={l.tier} className="flex items-center gap-2 text-sm text-steel">
                    <MarkerGlyph tier={l.tier} />
                    {l.label}
                  </li>
                ))}
                <li className="text-sm text-dim">Şehirlerarası sevk: Türkiye geneli</li>
              </ul>
            </figcaption>
          </figure>

          <details className="group border-t border-rule">
            <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between text-sm text-steel transition-colors hover:text-bone [&::-webkit-details-marker]:hidden">
              İl listesi ve kuş uçuşu mesafeler
              <span aria-hidden="true" className="font-mono text-base text-dim transition-transform duration-300 group-open:rotate-45">
                +
              </span>
            </summary>
            <div className="overflow-x-auto pb-4">
              <table className="w-full min-w-[480px] border-collapse text-left">
                <caption className="sr-only">Diyarbakır üssüne kuş uçuşu mesafeye göre sıralı iller</caption>
                <thead>
                  <tr className="border-b border-rule-strong">
                    {["Plaka", "İl", "Bölge", "Kuş uçuşu"].map((h) => (
                      <th key={h} scope="col" className="label pb-2.5 pr-4 font-medium">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="tabular">
                  {byDistance.map((p) => (
                    <tr key={p.plate} className="border-b border-rule">
                      <td className="py-2.5 pr-4 font-mono text-sm text-dim">{p.plate}</td>
                      <th scope="row" className="py-2.5 pr-4 font-normal text-bone">
                        {p.name}
                      </th>
                      <td className="py-2.5 pr-4 text-sm text-steel">{TIER_LABEL[p.tier]}</td>
                      <td className="py-2.5 font-mono text-sm text-bone">{p.tier === "hub" ? "—" : `≈ ${p.km} km`}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </details>
        </div>
      </div>
    </section>
  );
};

export default DispatchRoom;
