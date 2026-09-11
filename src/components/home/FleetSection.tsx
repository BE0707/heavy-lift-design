import { Link } from "react-router-dom";
import * as Tabs from "@radix-ui/react-tabs";
import { ArrowRight } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import Picture from "@/components/Picture";
import TrailerDrawing from "@/components/home/TrailerDrawing";
import CapacityTable from "@/components/CapacityTable";
import { FLEET, type FleetItem } from "@/data/fleet";
import { useMediaQuery } from "@/hooks/use-media-query";

const SpecSheet = ({ item }: { item: FleetItem }) => (
  <article aria-labelledby={`spec-${item.id}`}>
    <header className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-b border-rule-strong px-5 py-4 sm:px-7">
      <h3 id={`spec-${item.id}`} className="text-2xl uppercase tracking-[0.02em] sm:text-[1.75rem]">
        <span className="mr-3 font-mono text-sm font-medium tracking-label text-signal">{item.code}</span>
        {item.title}
      </h3>
      <p className="label">Spec sayfası · {item.tabMeta}</p>
    </header>

    <div className="bg-blueprint overflow-x-auto border-b border-rule-strong">
      <div className="min-w-[640px] px-3 py-4 sm:px-5">
        <TrailerDrawing type={item.id} />
      </div>
    </div>

    <div className="grid lg:grid-cols-2">
      <div className="border-b border-rule-strong px-5 py-6 sm:px-7 lg:border-b-0 lg:border-r">
        <p className="text-pretty text-lg leading-relaxed text-bone">{item.summary}</p>

        <p className="label mt-6">{item.tagsLabel}</p>
        <ul className="mt-3 flex flex-wrap gap-2">
          {item.tags.map((tag) => (
            <li key={tag} className="border border-rule-strong bg-ink px-2.5 py-1.5 font-mono text-xs text-steel">
              {tag}
            </li>
          ))}
        </ul>

        {item.photo && (
          <figure className="mt-6">
            <div className="aspect-[4/3] overflow-hidden border border-rule-strong bg-graphite">
              <Picture
                slug={item.photo.slug}
                alt={item.photo.alt}
                sizes="(min-width: 1320px) 560px, (min-width: 1024px) 40vw, 90vw"
                maxWidth={960}
                className="h-full w-full object-cover"
              />
            </div>
            <figcaption className="label mt-2">{item.photo.caption}</figcaption>
          </figure>
        )}

        <Link
          to={{ pathname: "/", search: `?dorse=${item.id}`, hash: "#fiyat-talebi" }}
          className="btn btn-primary mt-7 w-full sm:w-auto"
        >
          {item.id === "eskort" ? "İzin & eskort için fiyat iste" : "Bu dorse için fiyat iste"}
          <ArrowRight />
        </Link>
      </div>

      <dl className="px-5 py-3 sm:px-7">
        {item.specs.map((spec) => (
          <div key={spec.label} className="grid grid-cols-[minmax(0,11rem)_1fr] gap-4 border-b border-rule py-3.5 last:border-b-0">
            <dt className="label pt-0.5">{spec.label}</dt>
            <dd className="tabular text-pretty text-bone">{spec.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  </article>
);

const FleetSection = () => {
  const desktop = useMediaQuery("(min-width: 1024px)");

  return (
    <section id="filo" aria-labelledby="filo-title" className="border-b border-rule py-20 lg:py-28">
      <div className="container">
        <SectionHeader
          index="01"
          kicker="Teknik filo"
          titleId="filo-title"
          title="Teknik Filo & Taşıma Kapasiteleri"
          lead="Dorse seçimi yükün ağırlığı, boyu ve yüksekliğiyle yapılır. Aşağıdaki spec sayfaları dorse tiplerinin tipik değerleridir; kesin kapasite yük ölçüleri ve güzergah etüdüyle teyit edilir."
        />

        <Tabs.Root
          defaultValue={FLEET[0].id}
          orientation={desktop ? "vertical" : "horizontal"}
          className="mt-12 grid border border-rule-strong bg-asphalt lg:grid-cols-12"
        >
          <Tabs.List
            aria-label="Dorse ve hizmet tipleri"
            className="flex overflow-x-auto border-b border-rule-strong bg-ink lg:col-span-3 lg:flex-col lg:border-b-0 lg:border-r"
          >
            {FLEET.map((item) => (
              <Tabs.Trigger
                key={item.id}
                value={item.id}
                className="group relative min-w-[11.5rem] shrink-0 border-r border-rule px-5 py-4 text-left transition-colors hover:bg-graphite focus-visible:-outline-offset-4 data-[state=active]:bg-asphalt lg:min-w-0 lg:border-b lg:border-r-0 lg:py-5"
              >
                <span aria-hidden="true" className="absolute inset-x-0 top-0 h-0.5 bg-signal opacity-0 group-data-[state=active]:opacity-100 lg:inset-y-0 lg:left-0 lg:right-auto lg:h-auto lg:w-0.5" />
                <span className="label block text-dim group-data-[state=active]:text-signal">{item.code}</span>
                <span className="mt-1 block font-display text-xl font-semibold uppercase leading-tight tracking-[0.02em] text-steel group-data-[state=active]:text-bone">
                  {item.tab}
                </span>
                <span className="mt-0.5 block text-sm text-dim">{item.tabMeta}</span>
              </Tabs.Trigger>
            ))}
          </Tabs.List>

          {FLEET.map((item) => (
            <Tabs.Content key={item.id} value={item.id} className="min-w-0 focus-visible:-outline-offset-4 lg:col-span-9">
              <SpecSheet item={item} />
            </Tabs.Content>
          ))}
        </Tabs.Root>

        <CapacityTable className="mt-14" />
      </div>
    </section>
  );
};

export default FleetSection;
