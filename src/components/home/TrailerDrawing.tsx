import type { ReactNode } from "react";
import { INK as C, MONO } from "@/lib/drawing";

/**
 * 3 dingilli, hidrolik rampalı lowbed'in şematik yan görünüşü (ölçeksiz).
 * Yalnızca kesin bilgiler çizilir: dingil sayısı, rampa ve 4,00 m yasal yükseklik
 * sınırı. Platform yüksekliği sayı yerine "h" ile gösterilir; ön kontrolde
 * kullanılan varsayım çizimin altında açıkça yazılır.
 */

const GROUND = 250;
const LIMIT_Y = 90; // 4,00 m yasal yükseklik
const DECK_Y = 210;

const Text = ({ x, y, children, anchor = "start", fill = C.line, size = 13, rotate }: {
  x: number; y: number; children: string; anchor?: "start" | "middle" | "end"; fill?: string; size?: number; rotate?: number;
}) => (
  <text
    x={x}
    y={y}
    textAnchor={anchor}
    fill={fill}
    fontSize={size}
    fontFamily={MONO}
    letterSpacing="0.04em"
    transform={rotate ? `rotate(${rotate} ${x} ${y})` : undefined}
  >
    {children}
  </text>
);

const Defs = ({ id }: { id: string }) => (
  <defs>
    <marker id={`${id}-arrow`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
      <path d="M0 1.5L9 5L0 8.5z" fill={C.dim} />
    </marker>
    <pattern id={`${id}-hatch`} width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
      <line x1="0" y1="0" x2="0" y2="10" stroke={C.muted} strokeWidth="1" />
    </pattern>
  </defs>
);

const DimV = ({ id, x, y1, y2, label, side = "left" }: { id: string; x: number; y1: number; y2: number; label: string; side?: "left" | "rotated" }) => (
  <g>
    <line x1={x} y1={y1 + 1} x2={x} y2={y2 - 1} stroke={C.dim} strokeWidth={1.25} markerStart={`url(#${id}-arrow)`} markerEnd={`url(#${id}-arrow)`} />
    {side === "rotated" ? (
      <Text x={x - 7} y={(y1 + y2) / 2} anchor="middle" rotate={-90}>{label}</Text>
    ) : (
      <Text x={x - 8} y={(y1 + y2) / 2 + 4} anchor="end">{label}</Text>
    )}
  </g>
);

const Wheel = ({ cx, r }: { cx: number; r: number }) => (
  <g>
    <circle cx={cx} cy={GROUND - r} r={r} fill={C.paper} stroke={C.line} strokeWidth={1.25} />
    <circle cx={cx} cy={GROUND - r} r={r * 0.42} fill="none" stroke={C.muted} />
  </g>
);

/** Çekici (sağa bakar). x = arka (tahrik) dingil ekseni */
const Tractor = ({ x }: { x: number }) => (
  <g>
    <rect x={x - 52} y={GROUND - 50} width={278} height={12} fill={C.body} stroke={C.line} strokeWidth={1.25} />
    <rect x={x - 20} y={GROUND - 57} width={40} height={7} fill={C.body} stroke={C.line} />
    <path
      d={`M${x + 118} ${GROUND - 38} V${GROUND - 150} H${x + 200} L${x + 222} ${GROUND - 118} V${GROUND - 38} Z`}
      fill={C.body}
      stroke={C.line}
      strokeWidth={1.25}
    />
    <path d={`M${x + 172} ${GROUND - 138} H${x + 200} L${x + 214} ${GROUND - 116} V${GROUND - 98} H${x + 172} Z`} fill="none" stroke={C.muted} />
    <line x1={x + 162} y1={GROUND - 138} x2={x + 162} y2={GROUND - 46} stroke={C.muted} />
    <rect x={x + 44} y={GROUND - 36} width={52} height={15} fill="none" stroke={C.muted} />
    <rect x={x + 214} y={GROUND - 54} width={12} height={16} fill={C.body} stroke={C.line} />
    <Wheel cx={x} r={21} />
    <Wheel cx={x + 184} r={21} />
  </g>
);

const Frame = ({ id, title, children }: { id: string; title: string; children: ReactNode }) => (
  <svg viewBox="0 0 960 300" role="img" aria-labelledby={`${id}-title`} className="block h-auto w-full">
    <title id={`${id}-title`}>{title}</title>
    <Defs id={id} />
    <Text x={24} y={28} fill={C.muted} size={12}>YAN GÖRÜNÜŞ · ŞEMATİK · ÖLÇEKSİZ</Text>
    {children}
  </svg>
);

const TrailerDrawing = () => {
  const id = "dr-lowbed";
  return (
    <Frame
      id={id}
      title="3 dingilli, hidrolik rampalı lowbed; şematik yan görünüş. Yük zarfı, 4,00 m yasal yükseklik sınırından platform yüksekliği (h) çıkarılarak bulunur; ön kontrolde h yaklaşık 1 m varsayılır."
    >
      {/* yasal yükseklik sınırı */}
      <line x1="60" y1={LIMIT_Y} x2="940" y2={LIMIT_Y} stroke={C.limit} strokeWidth={1.25} strokeDasharray="9 6" />
      <Text x={940} y={LIMIT_Y - 8} anchor="end" fill={C.limit}>4,00 m · YASAL YÜKSEKLİK SINIRI</Text>

      {/* yük zarfı */}
      <rect x={190} y={LIMIT_Y} width={350} height={DECK_Y - LIMIT_Y} fill="none" stroke={C.muted} strokeDasharray="10 4 2 4" />
      <Text x={200} y={LIMIT_Y + 20} fill={C.muted} size={12}>YÜK ZARFI = 4,00 m − h</Text>

      {/* hidrolik rampa (kaldırılmış) */}
      <polygon points={`175,${DECK_Y} 189,${DECK_Y} 172,148 160,148`} fill={C.body} stroke={C.line} strokeWidth={1.25} />
      <line x1="163" y1="160" x2="176" y2="160" stroke={C.muted} />
      <line x1="167" y1="176" x2="181" y2="176" stroke={C.muted} />
      <line x1="171" y1="192" x2="185" y2="192" stroke={C.muted} />
      <polyline points="150,137 158,137 164,147" fill="none" stroke={C.muted} />
      <Text x={146} y={124} anchor="end" size={12}>HİDROLİK</Text>
      <Text x={146} y={140} anchor="end" size={12}>RAMPA</Text>

      {/* platform + kaz boynu */}
      <rect x="175" y={DECK_Y} width="382" height="10" fill={C.body} stroke={C.line} strokeWidth={1.25} />
      <polygon points={`549,${DECK_Y} 576,180 590,193 562,${DECK_Y + 10}`} fill={C.body} stroke={C.line} strokeWidth={1.25} />
      <rect x="576" y="180" width="146" height="14" fill={C.body} stroke={C.line} strokeWidth={1.25} />
      <Wheel cx={215} r={15} />
      <Wheel cx={267} r={15} />
      <Wheel cx={319} r={15} />
      <Tractor x={690} />

      {/* zemin */}
      <rect x="20" y={GROUND} width="920" height="7" fill={`url(#${id}-hatch)`} opacity="0.5" />
      <line x1="20" y1={GROUND} x2="940" y2={GROUND} stroke={C.muted} strokeWidth={1.25} />

      <Text x={267} y={272} anchor="middle" fill={C.muted} size={12}>3 DİNGİL</Text>
      <line x1="138" y1={DECK_Y} x2="170" y2={DECK_Y} stroke={C.muted} />
      <DimV id={id} x={130} y1={DECK_Y} y2={GROUND} label="h" />
      <DimV id={id} x={62} y1={LIMIT_Y} y2={GROUND} label="4,00 m" side="rotated" />
      <Text x={24} y={292} fill={C.muted} size={12}>h: PLATFORM YÜKSEKLİĞİ · ÖN KONTROLDE ≈ 1 m VARSAYILIR</Text>
    </Frame>
  );
};

export default TrailerDrawing;
