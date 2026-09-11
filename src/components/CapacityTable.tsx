import { TRAILERS } from "@/data/fleet";

/** Dorse tiplerinin karşılaştırmalı kapasite tablosu (src/data/fleet.ts) */
const CapacityTable = ({ className }: { className?: string }) => (
  <div className={className}>
    <div className="flex flex-wrap items-end justify-between gap-3">
      <h3 className="text-2xl uppercase tracking-[0.02em]">Karşılaştırmalı kapasite tablosu</h3>
      <p className="label">Tipik değerler · kesin kapasite güzergah etüdüyle teyit edilir</p>
    </div>
    <div className="mt-4 overflow-x-auto border border-rule-strong">
      <table className="w-full min-w-[640px] border-collapse text-left">
        <thead className="bg-ink">
          <tr>
            {["Dorse tipi", "Dingil", "Platform yüksekliği", "Platform boyu", "Teknik faydalı yük"].map((h) => (
              <th key={h} scope="col" className="label border-b border-rule-strong px-4 py-3 font-medium">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="tabular">
          {TRAILERS.map((t) => (
            <tr key={t.id} className="border-b border-rule last:border-b-0 hover:bg-graphite">
              <th scope="row" className="px-4 py-3.5 font-display text-lg font-semibold uppercase tracking-[0.02em] text-bone">
                <span className="mr-2 font-mono text-xs font-medium text-signal">{t.code}</span>
                {t.tab}
              </th>
              <td className="px-4 py-3.5 font-mono text-sm text-bone">{t.table.axles}</td>
              <td className="px-4 py-3.5 font-mono text-sm text-bone">{t.table.deck}</td>
              <td className="px-4 py-3.5 font-mono text-sm text-bone">{t.table.length}</td>
              <td className="px-4 py-3.5 font-mono text-sm text-bone">{t.table.payload}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default CapacityTable;
