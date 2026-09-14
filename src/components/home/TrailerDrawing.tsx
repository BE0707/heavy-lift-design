import type { ReactNode } from "react";
import type { FleetId } from "@/data/fleet";

/**
 * Dorse tiplerinin şematik teknik çizimleri (ölçeksiz). Ölçü etiketleri
 * src/data/fleet.ts değerleriyle aynı aralıkları gösterir.
 */

const C = {
  line: "#ECE8DF",
  dim: "#FDB813",
  limit: "#FF7A1A",
  muted: "#8B877F",
  body: "#1B1B19",
  ground: "#131312",
} as const;

const GROUND = 250;
const LIMIT_Y = 90; // 4,00 m yasal yükseklik
const MONO = "'IBM Plex Mono', ui-monospace, monospace";

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

const DimH = ({ id, x1, x2, y, label }: { id: string; x1: number; x2: number; y: number; label: string }) => (
  <g>
    <line x1={x1} y1={y - 10} x2={x1} y2={y + 4} stroke={C.muted} />
    <line x1={x2} y1={y - 10} x2={x2} y2={y + 4} stroke={C.muted} />
    <line x1={x1 + 1} y1={y} x2={x2 - 1} y2={y} stroke={C.dim} strokeWidth={1.25} markerStart={`url(#${id}-arrow)`} markerEnd={`url(#${id}-arrow)`} />
    <Text x={(x1 + x2) / 2} y={y - 6} anchor="middle">{label}</Text>
  </g>
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

const Wheel = ({ cx, r, phantom = false }: { cx: number; r: number; phantom?: boolean }) => (
  <g>
    <circle cx={cx} cy={GROUND - r} r={r} fill={phantom ? "none" : C.ground} stroke={phantom ? C.muted : C.line} strokeWidth={1.25} strokeDasharray={phantom ? "4 3" : undefined} />
    {!phantom && <circle cx={cx} cy={GROUND - r} r={r * 0.42} fill="none" stroke={C.muted} />}
  </g>
);

const Ground = ({ id }: { id: string }) => (
  <g>
    <rect x="20" y={GROUND} width="920" height="7" fill={`url(#${id}-hatch)`} opacity="0.5" />
    <line x1="20" y1={GROUND} x2="940" y2={GROUND} stroke={C.muted} strokeWidth={1.25} />
  </g>
);

const LegalLimit = () => (
  <g>
    <line x1="60" y1={LIMIT_Y} x2="940" y2={LIMIT_Y} stroke={C.limit} strokeWidth={1.25} strokeDasharray="9 6" />
    <Text x={940} y={LIMIT_Y - 8} anchor="end" fill={C.limit}>4,00 m · YASAL YÜKSEKLİK SINIRI</Text>
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

const Frame = ({ id, view, title, children }: { id: string; view: string; title: string; children: ReactNode }) => (
  <svg viewBox="0 0 960 300" role="img" aria-labelledby={`${id}-title`} className="block h-auto w-full">
    <title id={`${id}-title`}>{title}</title>
    <Defs id={id} />
    <Text x={24} y={28} fill={C.muted} size={12}>{`${view} · ŞEMATİK · ÖLÇEKSİZ`}</Text>
    {children}
  </svg>
);

const Envelope = ({ x, y, w, h, label }: { x: number; y: number; w: number; h: number; label: string }) => (
  <g>
    <rect x={x} y={y} width={w} height={h} fill="none" stroke={C.muted} strokeDasharray="10 4 2 4" />
    <Text x={x + 10} y={y + 20} fill={C.muted} size={12}>{label}</Text>
  </g>
);

const Standard = () => {
  const id = "dr-standart";
  return (
    <Frame id={id} view="YAN GÖRÜNÜŞ" title="Standart lowbed şematik yan görünüş: platform yüksekliği yaklaşık 0,9–1,0 m, platform uzunluğu yaklaşık 9,5–10,5 m, 3 veya 4 dingil, 4,00 m yasal yükseklik sınırı.">
      <LegalLimit />
      <Envelope x={190} y={LIMIT_Y} w={350} h={120} label="YÜK ZARFI · ≈ 3,0 m" />
      {/* rampa (kaldırılmış) */}
      <polygon points="175,210 189,210 172,148 160,148" fill={C.body} stroke={C.line} strokeWidth={1.25} />
      <line x1="163" y1="160" x2="176" y2="160" stroke={C.muted} />
      <line x1="167" y1="176" x2="181" y2="176" stroke={C.muted} />
      <line x1="171" y1="192" x2="185" y2="192" stroke={C.muted} />
      {/* platform + kaz boynu */}
      <rect x="175" y="210" width="382" height="10" fill={C.body} stroke={C.line} strokeWidth={1.25} />
      <polygon points="549,210 576,180 590,193 562,220" fill={C.body} stroke={C.line} strokeWidth={1.25} />
      <rect x="576" y="180" width="146" height="14" fill={C.body} stroke={C.line} strokeWidth={1.25} />
      <Wheel cx={215} r={15} />
      <Wheel cx={267} r={15} />
      <Wheel cx={319} r={15} />
      <Wheel cx={371} r={15} phantom />
      <Tractor x={690} />
      <Ground id={id} />
      <Text x={293} y={270} anchor="middle" fill={C.muted} size={12}>3 (+1) DİNGİL</Text>
      <line x1="138" y1="210" x2="170" y2="210" stroke={C.muted} />
      <DimV id={id} x={130} y1={210} y2={GROUND} label="≈ 0,9–1,0 m" />
      <DimV id={id} x={62} y1={LIMIT_Y} y2={GROUND} label="4,00 m" side="rotated" />
      <DimH id={id} x1={175} x2={557} y={292} label="PLATFORM ≈ 9,5–10,5 m" />
    </Frame>
  );
};

const Well = () => {
  const id = "dr-havuzlu";
  return (
    <Frame id={id} view="YAN GÖRÜNÜŞ" title="Havuzlu çok dingilli dorse şematik yan görünüş: havuz yüksekliği yaklaşık 0,4–0,5 m, havuz uzunluğu yaklaşık 7–9 m, 5–8 dingil, 4,00 m yasal yükseklik sınırı.">
      <LegalLimit />
      <Envelope x={412} y={LIMIT_Y} w={158} h={142} label="≈ 3,5 m" />
      <rect x="150" y="212" width="242" height="10" fill={C.body} stroke={C.line} strokeWidth={1.25} />
      <polygon points="388,212 402,212 414,232 400,232" fill={C.body} stroke={C.line} strokeWidth={1.25} />
      <rect x="400" y="232" width="182" height="8" fill={C.body} stroke={C.line} strokeWidth={1.25} />
      <polygon points="576,232 603,180 617,193 590,240" fill={C.body} stroke={C.line} strokeWidth={1.25} />
      <rect x="603" y="180" width="119" height="14" fill={C.body} stroke={C.line} strokeWidth={1.25} />
      {[172, 200, 228, 256, 284].map((cx) => <Wheel key={cx} cx={cx} r={12} />)}
      {[312, 340, 368].map((cx) => <Wheel key={cx} cx={cx} r={12} phantom />)}
      <Tractor x={690} />
      <Ground id={id} />
      <Text x={270} y={272} anchor="middle" fill={C.muted} size={12}>5–8 DİNGİL</Text>
      <line x1="491" y1={232} x2="491" y2={GROUND} stroke={C.dim} strokeWidth={1.25} markerStart={`url(#${id}-arrow)`} markerEnd={`url(#${id}-arrow)`} />
      <Text x={484} y={272} anchor="end">HAVUZ ≈ 0,4–0,5 m</Text>
      <DimV id={id} x={62} y1={LIMIT_Y} y2={GROUND} label="4,00 m" side="rotated" />
      <DimH id={id} x1={400} x2={582} y={295} label="HAVUZ BOYU ≈ 7–9 m" />
    </Frame>
  );
};

const Telescopic = () => {
  const id = "dr-teleskopik";
  return (
    <Frame id={id} view="YAN GÖRÜNÜŞ" title="Teleskopik uzatmalı lowbed şematik yan görünüş: kapalı platform yaklaşık 13,6 m, uzatılmış yaklaşık 24 m'ye kadar; arkada çıkıntılı uzun yük.">
      {/* uzun yük (kiriş) */}
      <rect x="44" y="176" width="498" height="32" fill={C.body} stroke={C.line} strokeWidth={1.25} />
      <Text x={293} y={197} anchor="middle" fill={C.muted} size={12}>KİRİŞ / BORU / KULE ELEMANI</Text>
      <rect x="30" y="176" width="14" height="14" fill={`url(#${id}-hatch)`} stroke={C.limit} />
      <Text x={30} y={166} fill={C.limit} size={12}>ARKA ÇIKINTI</Text>
      {/* uzatma bölgesi (iç kiriş) + ana kiriş */}
      <rect x="190" y="211" width="142" height="6" fill="none" stroke={C.muted} strokeDasharray="4 3" />
      <rect x="60" y="208" width="130" height="10" fill={C.body} stroke={C.line} strokeWidth={1.25} />
      <rect x="332" y="208" width="225" height="10" fill={C.body} stroke={C.line} strokeWidth={1.25} />
      <polygon points="549,208 576,180 590,193 562,218" fill={C.body} stroke={C.line} strokeWidth={1.25} />
      <rect x="576" y="180" width="146" height="14" fill={C.body} stroke={C.line} strokeWidth={1.25} />
      <Wheel cx={88} r={15} />
      <Wheel cx={128} r={15} />
      <Wheel cx={168} r={15} />
      <Tractor x={690} />
      <Ground id={id} />
      <Text x={261} y={236} anchor="middle" fill={C.muted} size={12}>← UZATMA →</Text>
      <DimH id={id} x1={332} x2={690} y={272} label="KAPALI ≈ 13,6 m" />
      <DimH id={id} x1={60} x2={690} y={294} label="UZATILMIŞ ≈ 24 m'ye kadar" />
    </Frame>
  );
};

const Escort = () => {
  const id = "dr-eskort";
  const car = (x: number, label: string) => (
    <g>
      <rect x={x} y={177} width={90} height={36} fill={C.body} stroke={C.line} strokeWidth={1.25} />
      <rect x={x + 34} y={187} width={22} height={16} fill={C.dim} />
      <Text x={x + 45} y={150} anchor="middle">{label}</Text>
      <line x1={x + 45} y1={156} x2={x + 45} y2={174} stroke={C.muted} />
    </g>
  );
  return (
    <Frame id={id} view="PLAN GÖRÜNÜŞ" title="Eskort düzeni şematik plan görünüş: önde ve arkada refakat aracı, ortada gabari dışı genişlikte yük taşıyan çekici ve lowbed.">
      {/* yol */}
      <line x1="20" y1="90" x2="940" y2="90" stroke={C.muted} strokeWidth={1.25} />
      <line x1="20" y1="230" x2="940" y2="230" stroke={C.muted} strokeWidth={1.25} />
      <line x1="20" y1="160" x2="940" y2="160" stroke={C.muted} strokeDasharray="18 14" />
      <Text x={24} y={112} fill={C.muted} size={12}>KARŞI ŞERİT</Text>
      {car(60, "ARKA ESKORT")}
      {/* dorse + gabari dışı yük */}
      <rect x="220" y="170" width="330" height="50" fill="none" stroke={C.line} strokeWidth={1.25} />
      <rect x="250" y="163" width="280" height="64" fill={C.body} stroke={C.limit} strokeWidth={1.25} />
      <Text x={390} y={200} anchor="middle" fill={C.muted} size={12}>GABARİ DIŞI YÜK</Text>
      {/* çekici */}
      <rect x="556" y="172" width="98" height="46" fill={C.body} stroke={C.line} strokeWidth={1.25} />
      <rect x="628" y="174" width="26" height="42" fill="none" stroke={C.muted} />
      <Text x={440} y={150} anchor="middle">ÇEKİCİ + LOWBED</Text>
      {car(760, "ÖN ESKORT")}
      <path d="M880 250 H930" stroke={C.dim} strokeWidth={1.25} markerEnd={`url(#${id}-arrow)`} />
      <Text x={876} y={254} anchor="end" fill={C.muted} size={12}>SEYİR YÖNÜ</Text>
      <line x1="232" y1={163} x2="232" y2={227} stroke={C.dim} strokeWidth={1.25} markerStart={`url(#${id}-arrow)`} markerEnd={`url(#${id}-arrow)`} />
      <Text x={236} y={278} anchor="middle">GENİŞLİK &gt; 2,55 m → ÖZEL İZİN + ESKORT DEĞERLENDİRMESİ</Text>
      <line x1="232" y1={232} x2="232" y2={262} stroke={C.muted} />
    </Frame>
  );
};

const DRAWINGS: Record<FleetId, () => JSX.Element> = {
  standart: Standard,
  havuzlu: Well,
  teleskopik: Telescopic,
  eskort: Escort,
};

const TrailerDrawing = ({ type }: { type: FleetId }) => {
  const Drawing = DRAWINGS[type];
  return <Drawing />;
};

export default TrailerDrawing;
