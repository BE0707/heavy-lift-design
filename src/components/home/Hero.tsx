import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Picture from "@/components/Picture";
import { PRIMARY_DISPATCHER, telHref } from "@/data/company";
import { EXCAVATOR_CLASS_RANGE } from "@/data/fleet";
import { recordCode } from "@/data/projects";
import { cn } from "@/lib/utils";

const HERO_SLUG = "sany-sy385h-ekskavator" as const;

/**
 * Teknik çizim "balon" açıklamaları. Koordinatlar kaynak görselin (1600×1200)
 * piksel sistemindedir; SVG `xMidYMid slice` ile görselin `object-cover` kırpımına
 * birebir oturur. Yalnızca fotoğrafta görülen/okunan bilgi yazılır.
 */
const CALLOUTS = [
  { n: 1, point: [760, 600], balloon: [760, 395], key: "Yük", value: "Sany SY385H paletli ekskavatör", note: "38 t sınıfı" },
  { n: 2, point: [480, 858], balloon: [340, 1010], key: "Dorse", value: "3 dingil lowbed", note: "Hidrolik rampa" },
  { n: 3, point: [1295, 690], balloon: [1295, 470], key: "Çekici", value: "MAN TGX", note: "4×2 çekici" },
] as const;

const Balloons = () => (
  <svg
    viewBox="0 0 1600 1200"
    preserveAspectRatio="xMidYMid slice"
    aria-hidden="true"
    className="pointer-events-none absolute inset-0 hidden h-full w-full md:block"
  >
    {CALLOUTS.map(({ n, point, balloon }) => {
      const dir = Math.sign(point[1] - balloon[1]);
      return (
        <g key={n}>
          <line
            x1={balloon[0]}
            y1={balloon[1] + dir * 27}
            x2={point[0]}
            y2={point[1]}
            stroke="#FFFFFF"
            strokeWidth={1}
            vectorEffect="non-scaling-stroke"
          />
          <circle cx={point[0]} cy={point[1]} r={7} fill="#237F52" stroke="#FFFFFF" strokeWidth={1.5} vectorEffect="non-scaling-stroke" />
          <circle cx={balloon[0]} cy={balloon[1]} r={27} fill="#121211" fillOpacity={0.8} stroke="#FFFFFF" strokeWidth={1} vectorEffect="non-scaling-stroke" />
          <text
            x={balloon[0]}
            y={balloon[1] + 9}
            textAnchor="middle"
            fontFamily="'IBM Plex Mono', ui-monospace, monospace"
            fontSize={26}
            fill="#FFFFFF"
          >
            {n}
          </text>
        </g>
      );
    })}
  </svg>
);

/** 2 sütun (mobil) → 4 sütun (sm+) geçişinde hücre çizgileri */
const CELL_BORDERS = ["", "border-l", "border-t sm:border-l sm:border-t-0"] as const;

/** Çizim antet bloğu gibi: balon numaralarının karşılığı ve arşiv kaydı */
const TitleBlock = () => (
  <figcaption className="grid grid-cols-2 border-t border-rule bg-surface-alt sm:grid-cols-[1.25fr_1fr_1fr_0.8fr]">
    {CALLOUTS.map((c, i) => (
      <div key={c.n} className={cn("px-5 py-3.5 lg:px-6 lg:py-4", CELL_BORDERS[i])}>
        <p className="label">
          <span className="hidden text-fg-muted md:inline">{c.n} · </span>
          {c.key}
        </p>
        <p className="mt-1.5 text-sm text-fg">{c.value}</p>
        <p className="text-sm text-fg-subtle">{c.note}</p>
      </div>
    ))}
    <div className="border-l border-t px-5 py-3.5 sm:border-t-0 lg:px-6 lg:py-4">
      <p className="label">Kayıt</p>
      <Link to="/#projeler" className="-mb-1.5 block w-fit py-1.5 font-mono text-sm text-fg">
        <span className="link-u">{recordCode(HERO_SLUG)}</span>
      </Link>
      <p className="text-sm text-fg-subtle">Proje arşivi</p>
    </div>
  </figcaption>
);

/** Yalnızca kesin bilgiler: dorse fotoğraflarda görülür, sınıf aralığı proje arşivinden gelir */
const SPECS = [
  { label: "Dorse", figure: "3", unit: "dingil", note: "Hidrolik rampalı lowbed; makine kendi yürüyüşüyle yüklenir" },
  { label: "Arşivdeki ekskavatörler", figure: EXCAVATOR_CLASS_RANGE, unit: "t sınıfı", note: "Hyundai HX210'dan Sany SY385H'ye" },
  { label: "Gabari dışı genişlik", figure: "2,55", unit: "m üzeri", note: "KGM özel izni ve eskort koordinasyonuyla" },
  { label: "Operasyon hattı", figure: "7/24", unit: "", note: "Diyarbakır üssünden Türkiye geneli sevk" },
] as const;

/** Teknik şartname satırı: büyük değer, küçük birim, kısa açıklama; eşit olmayan sütunlar */
const SpecLine = () => (
  <div className="border-t border-rule">
    <dl className="container grid grid-cols-2 lg:grid-cols-[1.45fr_1fr_1fr_0.85fr]">
      {SPECS.map((s, i) => (
        <div
          key={s.label}
          className={cn(
            "py-7 lg:py-10",
            i % 2 === 1 && "border-l pl-5",
            i > 0 && "lg:border-l lg:pl-8",
            i >= 2 && "border-t lg:border-t-0",
          )}
        >
          <dt className="label">{s.label}</dt>
          <dd className="mt-4 flex flex-wrap items-baseline gap-x-2 gap-y-1">
            <span className={cn("whitespace-nowrap font-medium text-fg", i === 0 ? "text-figure-lg" : "text-[clamp(2.25rem,1.6rem+1.6vw,3.25rem)] leading-none tracking-[-0.035em]")}>
              {s.figure}
            </span>
            {s.unit && <span className="font-mono text-sm text-fg-muted">{s.unit}</span>}
          </dd>
          <dd className="mt-3 max-w-[24ch] text-pretty text-sm leading-snug text-fg-muted">{s.note}</dd>
        </div>
      ))}
    </dl>
  </div>
);

const Hero = () => (
  <section aria-labelledby="hero-title" className="overflow-hidden">
    <div className="container grid lg:min-h-[min(720px,calc(100svh-4rem))] lg:grid-cols-12">
      <div className="flex flex-col justify-center pb-10 pt-10 sm:pt-14 lg:col-span-5 lg:py-20 lg:pr-12">
        <p className="section-mark">
          <span className="text-fg-muted">Diyarbakır · Güneydoğu Anadolu</span>
          <span className="hidden sm:inline">37,91° K · 40,23° D</span>
        </p>

        <h1 id="hero-title" className="mt-7 text-display-xl">
          <span className="block text-fg">Gabari Dışı Ağır Taşımacılık</span>{" "}
          <span className="block text-fg-muted">&amp; Lowbed Operasyonları</span>
        </h1>

        <p className="mt-7 max-w-[34rem] text-pretty text-lg leading-relaxed text-fg-muted">
          Ekskavatör, dozer, mobil kırıcı, sondaj ve tarım makineleri için hidrolik rampalı lowbed ile şehirlerarası
          transfer; gabari dışı yüklerde KGM özel izni ve eskort koordinasyonu.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
          <Link to="/#fiyat-talebi" className="btn btn-primary">
            Yük bildir, teklif al
            <ArrowRight />
          </Link>
          <a href={telHref(PRIMARY_DISPATCHER.phone)} className="-my-2 inline-flex items-baseline gap-3 py-2">
            <span className="text-sm text-fg-subtle">veya arayın</span>
            <span className="tabular font-mono text-lg text-fg link-u">{PRIMARY_DISPATCHER.display}</span>
          </a>
        </div>
      </div>

      <figure className="-mx-5 flex flex-col sm:-mx-6 lg:col-span-7 lg:mx-0 lg:bleed-right">
        <div className="relative h-[clamp(300px,64vw,560px)] overflow-hidden bg-surface-sunken lg:h-auto lg:min-h-[520px] lg:flex-1">
          <Picture
            slug={HERO_SLUG}
            alt="MAN TGX çekici ve kırmızı 3 dingilli hidrolik rampalı lowbed dorse üzerinde sarı Sany SY385H paletli ekskavatör, açık arazide stabilize yolda"
            sizes="(min-width: 1360px) 60vw, (min-width: 1024px) 62vw, 100vw"
            priority
            className="absolute inset-0 h-full w-full object-cover"
          />
          <Balloons />
        </div>
        <TitleBlock />
      </figure>
    </div>
    <SpecLine />
  </section>
);

export default Hero;
