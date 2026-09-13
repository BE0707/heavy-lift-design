import { TRAILERS } from "@/data/fleet";

/** Dorse tiplerinin karşılaştırmalı kapasite tablosu (src/data/fleet.ts) */
const CapacityTable = ({ className }: { className?: string }) => (
  <div className={className}>
    <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-rule pb-3">
      <h3 className="font-display text-xl font-bold uppercase tracking-tight text-bone sm:text-2xl">
        Karşılaştırmalı kapasite tablosu
      </h3>
      <p className="font-mono text-2xs uppercase tracking-label text-dim">
        Tipik değerler · Kesin kapasite güzergah etüdüyle teyit edilir
      </p>
    </div>
    <div className="mt-4 overflow-x-auto border border-rule-strong bg-ink/50">
      <table className="w-full min-w-[640px] border-collapse text-left">
        <thead className="border-b border-rule-strong bg-ink">
          <tr>
            {["Dorse tipi", "Dingil", "Platform yüksekliği", "Platform boyu", "Teknik faydalı yük"].map((h) => (
              <th key={h} scope="col" className="label px-4 py-3.5 font-medium text-steel">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-rule tabular">
          {TRAILERS.map((t) => (
            <tr key={t.id} className="transition-colors hover:bg-graphite/60">
              <th scope="row" className="px-4 py-4 font-display text-base font-bold uppercase tracking-tight text-bone sm:text-lg">
                <span className="mr-2.5 font-mono text-xs font-semibold text-signal">{t.code}</span>
                {t.tab}
              </th>
              <td className="px-4 py-4 font-mono text-sm text-bone">{t.table.axles}</td>
              <td className="px-4 py-4 font-mono text-sm text-bone">{t.table.deck}</td>
              <td className="px-4 py-4 font-mono text-sm text-bone">{t.table.length}</td>
              <td className="px-4 py-4 font-mono text-sm font-semibold text-signal">{t.table.payload}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default CapacityTable;
