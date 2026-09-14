import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import Picture from "@/components/Picture";
import LoadExamples from "@/components/LoadExamples";
import TrailerDrawing from "@/components/home/TrailerDrawing";
import { LOWBED } from "@/data/fleet";
import { useReveal } from "@/hooks/use-reveal";

/** Tek dorsenin katalog sayfası: çizim, kesin bilgiler, filodan fotoğraf ve taşınan yükler */
const FleetSection = () => {
  const revealRef = useReveal<HTMLDivElement>();

  return (
    <section id="filo" aria-labelledby="filo-title" className="border-t border-rule py-24 lg:py-32">
      <div ref={revealRef} className="container">
        <SectionHeader
          index="01"
          kicker="Filo"
          titleId="filo-title"
          title="Filo & Taşıma Kapasitesi"
          lead="Taşımalar 3 dingilli, hidrolik rampalı lowbed dorseyle yapılır. Kapasiteyi bu dorseyle taşınmış gerçek yükler gösterir; yükünüzün uygunluğunu ağırlık ve ölçülerle operasyon masası teyit eder."
          layout="split"
        />

        <article aria-labelledby="spec-lowbed" className="mt-16 grid gap-y-12 border-t border-rule pt-12 lg:grid-cols-12 lg:gap-x-12 lg:pt-16">
          <div className="lg:col-span-4">
            <p className="font-mono text-xs text-dim">{LOWBED.code}</p>
            <h3 id="spec-lowbed" className="mt-3 text-balance text-display-md">
              {LOWBED.title}
            </h3>
            <p className="mt-5 text-pretty text-lg leading-relaxed text-steel">{LOWBED.summary}</p>

            <dl className="mt-9 border-t border-rule">
              {LOWBED.facts.map((f) => (
                <div key={f.label} className="grid grid-cols-[6.5rem_1fr] gap-4 border-b border-rule py-3.5">
                  <dt className="text-sm text-dim">{f.label}</dt>
                  <dd className="text-pretty text-[0.9375rem] text-bone">{f.value}</dd>
                </div>
              ))}
            </dl>

            <Link to="/#fiyat-talebi" className="group mt-9 inline-flex items-center gap-2.5 py-1 text-bone">
              <span className="link-rule">Yükünüz için teklif isteyin</span>
              <ArrowRight aria-hidden="true" className="h-4 w-4 text-signal transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="min-w-0 lg:col-span-8">
            <div className="bg-blueprint overflow-x-auto border-y border-rule">
              <div className="min-w-[640px] px-2 py-5 sm:px-4">
                <TrailerDrawing />
              </div>
            </div>
            <figure className="group mt-8 grid gap-4 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)] sm:items-end sm:gap-8">
              <div className="aspect-[4/3] overflow-hidden bg-graphite sm:order-2">
                <Picture
                  slug={LOWBED.photo.slug}
                  alt={LOWBED.photo.alt}
                  sizes="(min-width: 1360px) 480px, (min-width: 1024px) 36vw, (min-width: 640px) 55vw, 90vw"
                  maxWidth={960}
                  className="photo-grade h-full w-full object-cover group-hover:scale-[1.025]"
                />
              </div>
              <figcaption className="text-pretty text-sm leading-relaxed text-dim sm:order-1 sm:pb-1">
                {LOWBED.photo.caption}. Rampalar kaldırılmış, dorse boş.
              </figcaption>
            </figure>
          </div>
        </article>

        <LoadExamples className="mt-24 lg:mt-32" />
      </div>
    </section>
  );
};

export default FleetSection;
