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
  <article aria-labelledby={`spec-${item.id}`} className="flex flex-col bg-asphalt">
    <header className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-b border-rule px-5 py-4 sm:px-7">
      <h3 id={`spec-${item.id}`} className="font-display text-2xl font-bold uppercase tracking-tight text-bone sm:text-[1.75rem]">
        <span className="mr-3 font-mono text-sm font-semibold tracking-label text-signal">{item.code}</span>
        {item.title}
      </h3>
      <p className="font-mono text-2xs uppercase tracking-label text-dim">
        Spec sayfası · {item.tabMeta}
      </p>
    </header>

    <div className="bg-blueprint overflow-x-auto border-b border-rule">
      <div className="min-w-[640px] px-4 py-6 sm:px-8">
        <TrailerDrawing type={item.id} />
      </div>
    </div>

    <div className="grid lg:grid-cols-2">
      <div className="border-b border-rule px-5 py-6 sm:px-7 lg:border-b-0 lg:border-r">
        <p className="text-pretty font-sans text-base leading-relaxed text-bone/90 sm:text-lg">
          {item.summary}
        </p>

        <p className="label mt-6 text-dim">{item.tagsLabel}</p>
        <ul className="mt-2.5 flex flex-wrap gap-2">
          {item.tags.map((tag) => (
            <li key={tag} className="border border-rule bg-ink px-2.5 py-1 font-mono text-xs text-steel">
              {tag}
            </li>
          ))}
        </ul>

        {item.photo && (
          <figure className="mt-6">
            <div className="aspect-[4/3] overflow-hidden border border-rule bg-graphite">
              <Picture
                slug={item.photo.slug}
                alt={item.photo.alt}
                sizes="(min-width: 1320px) 560px, (min-width: 1024px) 40vw, 90vw"
                maxWidth={960}
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
            <figcaption className="mt-2 font-mono text-2xs uppercase tracking-label text-dim">
              {item.photo.caption}
            </figcaption>
          </figure>
        )}

        <Link
          to={{ pathname: "/", search: `?dorse=${item.id}`, hash: "#fiyat-talebi" }}
          className="btn btn-primary mt-7 w-full sm:w-auto group"
        >
          <span>{item.id === "eskort" ? "İzin & eskort için fiyat iste" : "Bu dorse için fiyat iste"}</span>
          <ArrowRight className="transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      <dl className="divide-y divide-rule px-5 py-2 sm:px-7">
        {item.specs.map((spec) => (
          <div key={spec.label} className="grid grid-cols-[minmax(0,11rem)_1fr] gap-4 py-3.5">
            <dt className="label pt-0.5 text-dim">{spec.label}</dt>
            <dd className="tabular font-mono text-sm text-pretty text-bone">{spec.value}</dd>
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
          layout="split"
        />

        <Tabs.Root
          defaultValue={FLEET[0].id}
          orientation={desktop ? "vertical" : "horizontal"}
          className="mt-12 grid border border-rule-strong bg-asphalt lg:grid-cols-12 shadow-xl"
        >
          <Tabs.List
            aria-label="Dorse ve hizmet tipleri"
            className="flex overflow-x-auto border-b border-rule bg-ink lg:col-span-3 lg:flex-col lg:border-b-0 lg:border-r"
          >
            {FLEET.map((item) => (
              <Tabs.Trigger
                key={item.id}
                value={item.id}
                className="group relative min-w-[11.5rem] shrink-0 border-r border-rule px-5 py-4 text-left transition-colors hover:bg-graphite focus-visible:-outline-offset-4 data-[state=active]:bg-asphalt lg:min-w-0 lg:border-b lg:border-r-0 lg:py-5"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-0.5 bg-signal opacity-0 group-data-[state=active]:opacity-100 lg:inset-y-0 lg:left-0 lg:right-auto lg:h-auto lg:w-1 transition-opacity"
                />
                <span className="label block text-dim group-data-[state=active]:text-signal">{item.code}</span>
                <span className="mt-1 block font-display text-xl font-bold uppercase leading-tight tracking-tight text-steel group-data-[state=active]:text-bone">
                  {item.tab}
                </span>
                <span className="mt-0.5 block font-mono text-xs text-dim">{item.tabMeta}</span>
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
