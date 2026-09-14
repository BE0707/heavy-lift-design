import { useState } from "react";
import { HUB, PROVINCES_WITH_DISTANCE, TIER_LABEL, type ProvinceWithDistance, type Tier } from "@/data/coverage";
import { INK, MONO } from "@/lib/drawing";
import { cn } from "@/lib/utils";

/**
 * Diyarbakır üssü merkezli operasyon bölgesi. Eşdikdörtgen projeksiyon,
 * üs enleminde ölçeklenmiş; 1 harita birimi ≈ 1 km. Halkalar kuş uçuşu mesafedir.
 */
const W = 760;
const H = 360;
const ORIGIN = { x: 350, y: 180 };
const KM_PER_LON = 111.32 * Math.cos((HUB.lat * Math.PI) / 180);
const KM_PER_LAT = 110.95;

const project = (lat: number, lon: number) => ({
  x: ORIGIN.x + (lon - HUB.lon) * KM_PER_LON,
  y: ORIGIN.y - (lat - HUB.lat) * KM_PER_LAT,
});

/** Açık zemin paleti (src/lib/drawing.ts ile aynı tonlar) */
const C = { surface: INK.paper, grid: "#E1E1DC", ring: "#C4C4BE", text: "#4A4A45", dim: INK.muted, fg: INK.line, hub: INK.dim } as const;
/** Halka etiketi açısı (derece, saat yönü 0° = doğu): üs etiketiyle çakışmaması için 100/200 km sağ üstte */
const RINGS = [
  { r: 100, angle: -40 },
  { r: 200, angle: -40 },
  { r: 300, angle: 180 },
];
const LONS = [37, 38, 39, 40, 41, 42, 43];
const LATS = [37, 38, 39];

interface PlottedProvince extends ProvinceWithDistance {
  x: number;
  y: number;
}

const POINTS: readonly PlottedProvince[] = PROVINCES_WITH_DISTANCE.map((p) => ({ ...p, ...project(p.lat, p.lon) }));

export const MarkerGlyph = ({ tier, size = 12 }: { tier: Tier; size?: number }) => (
  <svg viewBox="-8 -8 16 16" width={size} height={size} aria-hidden="true" className="shrink-0">
    {tier === "hub" ? (
      <rect x="-6" y="-6" width="12" height="12" fill={C.hub} />
    ) : (
      <circle r="4.5" fill={tier === "core" ? C.fg : C.surface} stroke={tier === "core" ? C.surface : C.text} strokeWidth={tier === "core" ? 2 : 1.5} />
    )}
  </svg>
);

const Marker = ({ p, active, onActivate }: { p: PlottedProvince; active: boolean; onActivate: (plate: string | null) => void }) => {
  const r = active ? 6.5 : 5;
  const summary = p.tier === "hub" ? `${p.plate} ${p.name}: üs` : `${p.plate} ${p.name}, ${TIER_LABEL[p.tier]}: üsse kuş uçuşu yaklaşık ${p.km} km`;
  return (
    <g
      tabIndex={0}
      role="img"
      aria-label={summary}
      className="cursor-default outline-none"
      onPointerEnter={() => onActivate(p.plate)}
      onPointerLeave={() => onActivate(null)}
      onFocus={() => onActivate(p.plate)}
      onBlur={() => onActivate(null)}
    >
      <circle cx={p.x} cy={p.y} r={14} fill="transparent" />
      {p.tier === "hub" ? (
        <>
          <rect x={p.x - 12} y={p.y - 12} width={24} height={24} fill="none" stroke={C.hub} strokeWidth={1} />
          <rect x={p.x - 7} y={p.y - 7} width={14} height={14} fill={C.hub} stroke={C.surface} strokeWidth={2} />
        </>
      ) : (
        <circle
          cx={p.x}
          cy={p.y}
          r={r}
          fill={p.tier === "core" ? C.fg : C.surface}
          stroke={p.tier === "core" ? C.surface : C.text}
          strokeWidth={p.tier === "core" ? 2 : 1.5}
        />
      )}
      <text
        x={p.x + p.label.dx}
        y={p.y + p.label.dy}
        textAnchor={p.label.anchor}
        fontFamily={MONO}
        fontSize={p.tier === "hub" ? 12 : 11}
        fontWeight={p.tier === "hub" || active ? 600 : 400}
        aria-hidden="true"
      >
        <tspan fill={C.dim}>{p.plate} </tspan>
        <tspan fill={p.tier === "hub" || active ? C.fg : C.text}>{p.tier === "hub" ? `${p.name.toLocaleUpperCase("tr-TR")} · ÜS` : p.name}</tspan>
      </text>
    </g>
  );
};

const CoverageMap = () => {
  const [activePlate, setActivePlate] = useState<string | null>(null);
  const active = POINTS.find((p) => p.plate === activePlate) ?? null;

  return (
    <div className="relative min-w-[620px]">
      <svg viewBox={`0 0 ${W} ${H}`} role="group" aria-labelledby="map-title" className="block h-auto w-full">
        <title id="map-title">Operasyon bölgesi haritası: Diyarbakır üssü, 100–300 km kuş uçuşu halkaları ve il merkezleri</title>
        <defs>
          <clipPath id="map-clip">
            <rect x="0" y="0" width={W} height={H} />
          </clipPath>
        </defs>
        <rect x="0.5" y="0.5" width={W - 1} height={H - 1} fill={C.surface} stroke={C.grid} />

        <g aria-hidden="true" clipPath="url(#map-clip)">
          {LONS.map((lon) => {
            const { x } = project(HUB.lat, lon);
            return (
              <g key={lon}>
                <line x1={x} y1={0} x2={x} y2={H} stroke={C.grid} />
                <text x={x + 4} y={14} fontFamily={MONO} fontSize={10} fill={C.dim}>{`${lon}°D`}</text>
              </g>
            );
          })}
          {LATS.map((lat) => {
            const { y } = project(lat, HUB.lon);
            return (
              <g key={lat}>
                <line x1={0} y1={y} x2={W} y2={y} stroke={C.grid} />
                <text x={6} y={y - 5} fontFamily={MONO} fontSize={10} fill={C.dim}>{`${lat}°K`}</text>
              </g>
            );
          })}
          {RINGS.map(({ r, angle }) => {
            const a = (angle * Math.PI) / 180;
            return (
              <g key={r}>
                <circle cx={ORIGIN.x} cy={ORIGIN.y} r={r} fill="none" stroke={C.ring} />
                <text x={ORIGIN.x + r * Math.cos(a) + 5} y={ORIGIN.y + r * Math.sin(a) - 4} fontFamily={MONO} fontSize={10} fill={C.dim}>
                  {`${r} km`}
                </text>
              </g>
            );
          })}
          {/* ölçek çubuğu: 100 km */}
          <g transform={`translate(24 ${H - 22})`}>
            <line x1={0} y1={0} x2={100} y2={0} stroke={C.text} strokeWidth={1.5} />
            <line x1={0} y1={-5} x2={0} y2={5} stroke={C.text} />
            <line x1={50} y1={-3} x2={50} y2={3} stroke={C.text} />
            <line x1={100} y1={-5} x2={100} y2={5} stroke={C.text} />
            <text x={108} y={4} fontFamily={MONO} fontSize={10} fill={C.dim}>100 km</text>
          </g>
          {/* kuzey */}
          <g transform={`translate(${W - 26} 30)`}>
            <path d="M0 -12 L6 6 L0 2 L-6 6 Z" fill={C.text} />
            <text x={0} y={20} textAnchor="middle" fontFamily={MONO} fontSize={10} fill={C.dim}>K</text>
          </g>
        </g>

        {/* DOM sırası sabit: odaklı işaret yeniden sıralanırsa klavye odağı kaybolur */}
        {POINTS.map((p) => (
          <Marker key={p.plate} p={p} active={p.plate === activePlate} onActivate={setActivePlate} />
        ))}
        {active && (
          <circle cx={active.x} cy={active.y} r={11} fill="none" stroke={C.hub} strokeWidth={1.5} pointerEvents="none" aria-hidden="true" />
        )}
      </svg>

      {active && (
        <div
          role="presentation"
          className={cn(
            "theme-dark pointer-events-none absolute z-10 border border-rule-strong bg-surface px-3 py-2 ",
            // Kenardaki işaretlerde (Kilis, Hakkari) ipucu harita dışına taşmasın: ortalamak yerine kenara yasla
            active.x < W * 0.22 ? "translate-x-0" : active.x > W * 0.78 ? "-translate-x-full" : "-translate-x-1/2",
            active.y > H * 0.6 && "-translate-y-full",
          )}
          style={{
            left: `${((active.x < W * 0.22 ? active.x - 14 : active.x > W * 0.78 ? active.x + 14 : active.x) / W) * 100}%`,
            top: `${((active.y > H * 0.6 ? active.y - 16 : active.y + 16) / H) * 100}%`,
          }}
        >
          <p className="tabular font-display text-xl font-semibold leading-none text-fg">
            {active.tier === "hub" ? "Üs" : `≈ ${active.km} km`}
          </p>
          <p className="mt-1 whitespace-nowrap font-mono text-2xs uppercase tracking-label text-fg-muted">
            {active.plate} · {active.name}
          </p>
          <p className="whitespace-nowrap font-mono text-2xs uppercase tracking-label text-fg-subtle">
            {active.tier === "hub" ? "Operasyon merkezi" : `${TIER_LABEL[active.tier]} · kuş uçuşu`}
          </p>
        </div>
      )}
    </div>
  );
};

export default CoverageMap;
