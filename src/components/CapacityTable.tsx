import { TRAILERS } from "@/data/fleet";
import { cn } from "@/lib/utils";

const COLUMNS = ["Dingil", "Platform yüksekliği", "Platform boyu", "Teknik faydalı yük"] as const;

/**
 * Dorse tiplerinin karşılaştırmalı kapasite tablosu (src/data/fleet.ts); katalog tablosu düzeni.
 * bare: yalnızca tablo (başlığı sayfa kendisi verir).
 */
const CapacityTable = ({ className, bare = false }: { className?: string; bare?: boolean }) => {
  const table = (
    <table className="w-full min-w-[640px] border-collapse text-left">
      <thead>
        <tr className="border-b border-rule-strong">
          <th scope="col" className="label pb-3 pr-4 font-medium">
            Dorse tipi
          </th>
          {COLUMNS.map((h) => (
            <th key={h} scope="col" className="label px-4 pb-3 font-medium">
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="tabular">
        {TRAILERS.map((t) => (
          <tr key={t.id} className="border-b border-rule transition-colors hover:bg-graphite/60">
            <th scope="row" className="py-5 pr-4 align-baseline font-normal">
              <span className="block font-mono text-xs text-dim">{t.code}</span>
              <span className="mt-1 block text-[1.0625rem] font-medium text-bone">{t.tab}</span>
            </th>
            <td className="px-4 py-5 align-baseline font-mono text-[0.9375rem] text-bone">{t.table.axles}</td>
            <td className="px-4 py-5 align-baseline font-mono text-[0.9375rem] text-bone">{t.table.deck}</td>
            <td className="px-4 py-5 align-baseline font-mono text-[0.9375rem] text-bone">{t.table.length}</td>
            <td className="px-4 py-5 align-baseline font-mono text-[0.9375rem] text-bone">{t.table.payload}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  if (bare) return <div className={cn("min-w-0 overflow-x-auto", className)}>{table}</div>;

  return (
    <div className={cn("grid gap-8 lg:grid-cols-12 lg:gap-12", className)}>
      <div className="lg:col-span-4">
        <h3 className="text-balance text-display-md">Karşılaştırmalı kapasite tablosu</h3>
        <p className="mt-4 max-w-[34ch] text-pretty text-steel">
          Tipik değerlerdir. Kesin kapasite yük ölçüleri, dingil yükü dağılımı ve güzergah etüdüyle teyit edilir.
        </p>
      </div>
      <div className="min-w-0 overflow-x-auto lg:col-span-8">{table}</div>
    </div>
  );
};

export default CapacityTable;
