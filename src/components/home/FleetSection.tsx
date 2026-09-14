import { Link } from "react-router-dom";
import * as Tabs from "@radix-ui/react-tabs";
import { ArrowRight } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import Picture from "@/components/Picture";
import TrailerDrawing from "@/components/home/TrailerDrawing";
import CapacityTable from "@/components/CapacityTable";
import { FLEET, type FleetItem } from "@/data/fleet";
import { useReveal } from "@/hooks/use-reveal";
import { splitMeasure } from "@/lib/measure";

/** Katalog dizini dolguları: mobil 2 sütun, lg 4 sütun */
const TAB_PAD = ["", "pl-5 lg:pl-6", "lg:pl-6", "pl-5 lg:pl-6"] as const;

/** Büyük ölçü satırında zaten gösterilen spec satırları; detay listesinde tekrarlanmaz */
const SHOWN_AS_MEASURE = new Set([
  "Dingil sayısı",
  "Platform yüksekliği",
  "Havuz yüksekliği",
  "Platform uzunluğu",
  "Havuz uzunluğu",
  "Kapalı platform boyu",
  "Uzatılmış platform boyu",
]);

const KEY_MEASURES = [
  { key: "deck", label: "Platform yüksekliği" },
  { key: "length", label: "Platform boyu" },
  { key: "payload", label: "Teknik faydalı yük" },
  { key: "axles", label: "Dingil" },
] as const;

const KeyMeasures = ({ item }: { item: FleetItem }) => (
  <dl className="grid grid-cols-2 border-b border-rule sm:grid-cols-4">
    {KEY_MEASURES.map(({ key, label }, i) => {
      const m = splitMeasure(item.table[key]);
      return (
        <div
          key={key}
          className={`animate-spec-in py-6 pr-4 ${i % 2 === 1 ? "border-l pl-5" : ""} ${i > 0 ? "sm:border-l sm:pl-5" : ""} ${i >= 2 ? "border-t sm:border-t-0" : ""}`}
          style={{ animationDelay: `${i * 60}ms` }}
        >
          <dt className="label">{label}</dt>
          <dd className="mt-3 flex items-baseline gap-1.5">
            {m.approx && <span className="font-mono text-sm text-dim">≈</span>}
            <span className="text-[clamp(1.75rem,1.3rem+1.2vw,2.5rem)] font-medium leading-none tracking-[-0.03em] text-bone">{m.value}</span>
            {m.unit && <span className="font-mono text-sm text-signal">{m.unit}</span>}
          </dd>
          {m.note && <dd className="mt-1.5 text-sm text-dim">{m.note}</dd>}
        </div>
      );
    })}
  </dl>
);

const SpecSheet = ({ item }: { item: FleetItem }) => {
  const isService = item.id === "eskort";
  const rows = isService ? item.specs : item.specs.filter((s) => !SHOWN_AS_MEASURE.has(s.label));

  return (
    <article aria-labelledby={`spec-${item.id}`} className="grid gap-y-12 pt-12 lg:grid-cols-12 lg:gap-x-12 lg:pt-16">
      <div className="lg:col-span-4">
        <p className="font-mono text-xs text-dim">{item.code}</p>
        <h3 id={`spec-${item.id}`} className="mt-3 text-balance text-display-md">
          {item.title}
        </h3>
        <p className="mt-5 text-pretty text-lg leading-relaxed text-steel">{item.summary}</p>

        <p className="label mt-9">{item.tagsLabel}</p>
        <p className="mt-3 text-pretty leading-relaxed text-bone">{item.tags.join(" · ")}</p>

        {item.photo && (
          <figure className="group mt-9">
            <div className="aspect-[4/3] overflow-hidden bg-graphite">
              <Picture
                slug={item.photo.slug}
                alt={item.photo.alt}
                sizes="(min-width: 1360px) 380px, (min-width: 1024px) 30vw, 90vw"
                maxWidth={960}
                className="photo-grade h-full w-full object-cover group-hover:scale-[1.025]"
              />
            </div>
            <figcaption className="mt-2.5 text-sm text-dim">{item.photo.caption}</figcaption>
          </figure>
        )}

        <Link
          to={{ pathname: "/", search: `?dorse=${item.id}`, hash: "#fiyat-talebi" }}
          className="group mt-9 inline-flex items-center gap-2.5 text-bone"
        >
          <span className="link-rule">{isService ? "İzin ve eskort için teklif iste" : "Bu dorse için teklif iste"}</span>
          <ArrowRight aria-hidden="true" className="h-4 w-4 text-signal transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>

      <div className="min-w-0 lg:col-span-8">
        <div className="bg-blueprint overflow-x-auto border-y border-rule">
          <div className="min-w-[640px] px-2 py-5 sm:px-4">
            <TrailerDrawing type={item.id} />
          </div>
        </div>

        {!isService && <KeyMeasures item={item} />}

        <dl className="mt-2 grid sm:grid-cols-2 sm:gap-x-10">
          {rows.map((spec) => (
            <div key={spec.label} className="grid grid-cols-[minmax(0,10rem)_1fr] gap-4 border-b border-rule py-4">
              <dt className="pt-0.5 text-sm text-dim">{spec.label}</dt>
              <dd className="tabular text-pretty text-[0.9375rem] text-bone">{spec.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </article>
  );
};

const FleetSection = () => {
  const revealRef = useReveal<HTMLDivElement>();

  return (
    <section id="filo" aria-labelledby="filo-title" className="border-t border-rule py-24 lg:py-32">
      <div ref={revealRef} className="container">
        <SectionHeader
          index="01"
          kicker="Teknik filo"
          titleId="filo-title"
          title="Teknik Filo & Taşıma Kapasiteleri"
          lead="Dorse seçimi yükün ağırlığı, boyu ve yüksekliğiyle yapılır. Değerler dorse tiplerinin tipik aralıklarıdır; kesin kapasite yük ölçüleri ve güzergah etüdüyle teyit edilir."
          layout="split"
        />

        <Tabs.Root defaultValue={FLEET[0].id} className="mt-16">
          <Tabs.List aria-label="Dorse ve hizmet tipleri" className="grid grid-cols-2 border-t border-rule lg:grid-cols-4">
            {FLEET.map((item, i) => (
              <Tabs.Trigger
                key={item.id}
                value={item.id}
                className={`group relative -mt-px border-t-2 border-transparent py-5 pr-6 text-left transition-colors hover:border-rule-strong focus-visible:outline-offset-[-2px] data-[state=active]:border-signal ${TAB_PAD[i]}`}
              >
                <span className="font-mono text-xs text-dim">{item.code}</span>
                <span className="mt-2 block text-lg leading-snug text-steel transition-colors group-hover:text-bone group-data-[state=active]:text-bone">
                  {item.tab}
                </span>
                <span className="mt-0.5 block text-sm text-dim">{item.tabMeta}</span>
              </Tabs.Trigger>
            ))}
          </Tabs.List>

          {FLEET.map((item) => (
            <Tabs.Content key={item.id} value={item.id} className="focus-visible:outline-offset-8">
              <SpecSheet item={item} />
            </Tabs.Content>
          ))}
        </Tabs.Root>

        <CapacityTable className="mt-24 lg:mt-32" />
      </div>
    </section>
  );
};

export default FleetSection;
