import { DECK_HEIGHT, LEGAL_LIMITS } from "@/lib/load-check";

/**
 * Gabari profili (arka görünüş, şematik): yasal genişlik × yükseklik zarfı,
 * lowbed arka kesiti ve zarfı genişlikte aşan örnek bir yük. Ölçüler
 * LEGAL_LIMITS / DECK_HEIGHT sabitlerinden gelir; yük genişliği örnektir.
 */
const S = 80; // 1 m = 80 birim
const GROUND = 400;
const CX = 300;
const EXAMPLE_LOAD_WIDTH = 3.2;

const C = { line: "#ECE8DF", muted: "#8B877F", dim: "#FDB813", limit: "#FF7A1A", body: "#1B1B19" } as const;
const MONO = "'IBM Plex Mono', ui-monospace, monospace";
const fmt = (n: number) => n.toLocaleString("tr-TR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const Label = ({ x, y, children, anchor = "start", fill = C.line, size = 12 }: { x: number; y: number; children: string; anchor?: "start" | "middle" | "end"; fill?: string; size?: number }) => (
  <text x={x} y={y} textAnchor={anchor} fill={fill} fontSize={size} fontFamily={MONO} letterSpacing="0.03em">
    {children}
  </text>
);

const GaugeProfile = ({ className }: { className?: string }) => {
  const half = (LEGAL_LIMITS.width / 2) * S;
  const left = CX - half;
  const right = CX + half;
  const top = GROUND - LEGAL_LIMITS.height * S;
  const deck = GROUND - DECK_HEIGHT.standart * S;
  const loadHalf = (EXAMPLE_LOAD_WIDTH / 2) * S;
  const loadLeft = CX - loadHalf;
  const loadRight = CX + loadHalf;
  const id = "gauge";

  return (
    <svg
      viewBox="0 0 620 470"
      role="img"
      aria-labelledby={`${id}-title`}
      className={className}
    >
      <title id={`${id}-title`}>
        {`Gabari profili, arka görünüş: yasal zarf ${fmt(LEGAL_LIMITS.width)} m genişlik ve ${fmt(LEGAL_LIMITS.height)} m yükseklik; platform yüksekliği yaklaşık ${fmt(DECK_HEIGHT.standart)} m; zarfı genişlikte aşan ${fmt(EXAMPLE_LOAD_WIDTH)} m örnek yük özel izin gerektirir.`}
      </title>
      <defs>
        <marker id={`${id}-arrow`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
          <path d="M0 1.5L9 5L0 8.5z" fill={C.dim} />
        </marker>
        <pattern id={`${id}-hatch`} width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="7" stroke={C.limit} strokeWidth="1.2" />
        </pattern>
      </defs>

      <Label x={16} y={24} fill={C.muted} size={11}>ARKA GÖRÜNÜŞ · GABARİ PROFİLİ · ŞEMATİK</Label>

      {/* zemin */}
      <line x1={60} y1={GROUND} x2={560} y2={GROUND} stroke={C.muted} strokeWidth={1.25} />

      {/* örnek yük: paletli makine arka kesiti */}
      <g fill={C.body} stroke={C.line} strokeWidth={1.1}>
        <rect x={loadLeft} y={deck - 30} width={52} height={30} />
        <rect x={loadRight - 52} y={deck - 30} width={52} height={30} />
        <rect x={loadLeft + 12} y={deck - 115} width={loadHalf * 2 - 24} height={85} />
        <rect x={CX - 94} y={deck - 190} width={92} height={75} />
        <rect x={CX - 2} y={deck - 140} width={100} height={25} />
      </g>
      <rect x={loadLeft} y={deck - 115} width={left - loadLeft} height={115} fill={`url(#${id}-hatch)`} />
      <rect x={right} y={deck - 115} width={loadRight - right} height={115} fill={`url(#${id}-hatch)`} />

      {/* lowbed arka kesiti */}
      <g fill={C.body} stroke={C.line} strokeWidth={1.1}>
        <rect x={left} y={deck} width={half * 2} height={12} />
        <rect x={left + 52} y={deck + 12} width={12} height={34} />
        <rect x={right - 64} y={deck + 12} width={12} height={34} />
        <rect x={left + 64} y={deck + 46} width={half * 2 - 128} height={8} />
        <rect x={left + 4} y={GROUND - 60} width={20} height={60} />
        <rect x={left + 28} y={GROUND - 60} width={20} height={60} />
        <rect x={right - 48} y={GROUND - 60} width={20} height={60} />
        <rect x={right - 24} y={GROUND - 60} width={20} height={60} />
      </g>

      {/* yasal zarf */}
      <rect x={left} y={top} width={half * 2} height={GROUND - top} fill="none" stroke={C.limit} strokeWidth={1.25} strokeDasharray="8 6" />
      <Label x={left + 8} y={top + 18} fill={C.limit} size={11}>YASAL GABARİ</Label>

      {/* ölçüler */}
      <line x1={left} y1={GROUND + 8} x2={left} y2={GROUND + 40} stroke={C.muted} />
      <line x1={right} y1={GROUND + 8} x2={right} y2={GROUND + 40} stroke={C.muted} />
      <line x1={left + 1} y1={GROUND + 32} x2={right - 1} y2={GROUND + 32} stroke={C.dim} strokeWidth={1.2} markerStart={`url(#${id}-arrow)`} markerEnd={`url(#${id}-arrow)`} />
      <Label x={CX} y={GROUND + 56} anchor="middle">{`${fmt(LEGAL_LIMITS.width)} m`}</Label>

      <line x1={loadLeft} y1={top - 34} x2={loadLeft} y2={deck - 118} stroke={C.muted} strokeDasharray="2 4" />
      <line x1={loadRight} y1={top - 34} x2={loadRight} y2={deck - 118} stroke={C.muted} strokeDasharray="2 4" />
      <line x1={loadLeft + 1} y1={top - 26} x2={loadRight - 1} y2={top - 26} stroke={C.limit} strokeWidth={1.2} />
      <Label x={CX} y={top - 34} anchor="middle" fill={C.limit}>{`ÖRNEK YÜK ${fmt(EXAMPLE_LOAD_WIDTH)} m → ÖZEL İZİN`}</Label>

      <line x1={right + 18} y1={top} x2={right + 58} y2={top} stroke={C.muted} />
      <line x1={right + 48} y1={top + 1} x2={right + 48} y2={GROUND - 1} stroke={C.dim} strokeWidth={1.2} markerStart={`url(#${id}-arrow)`} markerEnd={`url(#${id}-arrow)`} />
      <Label x={right + 60} y={(top + GROUND) / 2 + 4}>{`${fmt(LEGAL_LIMITS.height)} m`}</Label>

      <line x1={left - 56} y1={deck} x2={left - 6} y2={deck} stroke={C.muted} />
      <line x1={left - 46} y1={deck + 1} x2={left - 46} y2={GROUND - 1} stroke={C.dim} strokeWidth={1.2} markerStart={`url(#${id}-arrow)`} markerEnd={`url(#${id}-arrow)`} />
      <Label x={left - 56} y={(deck + GROUND) / 2 + 4} anchor="end">{`≈ ${DECK_HEIGHT.standart.toLocaleString("tr-TR", { minimumFractionDigits: 1 })} m`}</Label>
    </svg>
  );
};

export default GaugeProfile;
