import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { LOAD_EXAMPLES } from "@/data/fleet";
import { recordCode } from "@/data/projects";
import { cn } from "@/lib/utils";

/**
 * Bu dorseyle taşınan yükler (src/data/fleet.ts): her satır proje arşivindeki bir
 * kayda dayanır. Sınıf, makinenin üretici ağırlık sınıfıdır; dorse kapasitesi değildir.
 */
const LoadExamples = ({ className }: { className?: string }) => (
  <div className={cn("grid gap-8 lg:grid-cols-12 lg:gap-12", className)}>
    <div className="lg:col-span-4">
      <h3 className="text-balance text-display-md">Bu dorseyle taşınan yükler</h3>
      <p className="mt-4 max-w-[34ch] text-pretty text-fg-muted">
        Her satır proje arşivindeki bir saha fotoğrafına dayanır. Sınıf, makinenin üretici ağırlık sınıfıdır.
      </p>
      <Link to="/#projeler" className="group mt-8 inline-flex items-center gap-2.5 py-1 text-fg">
        <span className="link-rule">Proje arşivini incele</span>
        <ArrowRight aria-hidden="true" className="h-4 w-4 text-signal transition-transform duration-300 group-hover:translate-x-1" />
      </Link>
    </div>
    <div className="min-w-0 lg:col-span-8">
      <table className="w-full border-collapse text-left">
        <caption className="sr-only">Bu dorseyle taşınan yük örnekleri ve proje arşivi kayıtları</caption>
        <thead>
          <tr className="border-b border-rule-strong">
            <th scope="col" className="label w-16 pb-3 pr-4 font-medium sm:w-28">
              Sınıf
            </th>
            <th scope="col" className="label pb-3 pr-4 font-medium">
              Yük
            </th>
            <th scope="col" className="label pb-3 text-right font-medium">
              Kayıt
            </th>
          </tr>
        </thead>
        <tbody className="tabular">
          {LOAD_EXAMPLES.map((l) => (
            <tr key={l.slug} className="border-b border-rule">
              <td className="py-3.5 pr-4 align-baseline font-mono">
                {l.weightClass ? (
                  <>
                    <span className="text-xl tracking-[-0.02em] text-fg">{l.weightClass}</span>
                    <span className="ml-1.5 text-sm text-signal">t</span>
                  </>
                ) : (
                  <span className="text-fg-subtle">—</span>
                )}
              </td>
              <th scope="row" className="text-pretty py-3.5 pr-4 align-baseline font-normal text-fg">
                {l.load}
              </th>
              <td className="py-3.5 text-right align-baseline font-mono text-xs text-fg-subtle">{recordCode(l.slug)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default LoadExamples;
