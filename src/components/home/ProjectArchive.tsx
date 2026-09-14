import { useMemo, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import Picture from "@/components/Picture";
import manifest from "@/assets/photos/photos.json";
import { PROJECTS, PROJECT_CATEGORIES, recordCode, type Project, type ProjectCategory } from "@/data/projects";
import { useReveal } from "@/hooks/use-reveal";
import { cn } from "@/lib/utils";

type Filter = ProjectCategory | "all";
type RowType = "lead" | "pair" | "wide" | "single";

const categoryLabel = (id: ProjectCategory) => PROJECT_CATEGORIES.find((c) => c.id === id)?.label ?? "";
const pad = (n: number) => String(n).padStart(2, "0");

/** Editoryal ritim: büyük kayıt → asimetrik ikili → panorama → ters ikili … */
const PATTERN: readonly RowType[] = ["lead", "pair", "wide", "pair"];

const ratio = (p: Project) => manifest[p.slug].width / manifest[p.slug].height;
/** Öne çıkan (lead/wide) kareler yalnızca yüksek çözünürlüklü yatay fotoğrafla dolar; aksi hâlde kırpım bozulur ya da görüntü yumuşar */
const suitsFeature = (p: Project) => manifest[p.slug].width >= 1200 && ratio(p) >= 1.2;

interface Row {
  type: RowType;
  items: Project[];
  mirrored: boolean;
}

/** Görünür kayıtları satırlara yerleştirir; öne çıkan kare için en fazla 3 kayıt ileriye bakar */
function arrange(items: readonly Project[]) {
  const queue = [...items];
  const rows: Row[] = [];
  let pairCount = 0;
  for (let step = 0; queue.length; step++) {
    const type = PATTERN[step % PATTERN.length];
    if (type === "pair") {
      if (queue.length === 1) rows.push({ type: "single", items: queue.splice(0, 1), mirrored: false });
      else rows.push({ type: "pair", items: queue.splice(0, 2), mirrored: pairCount++ % 2 === 1 });
      continue;
    }
    const pick = queue.slice(0, 3).findIndex(suitsFeature);
    if (pick === -1) rows.push({ type: "single", items: queue.splice(0, 1), mirrored: false });
    else rows.push({ type, items: queue.splice(pick, 1), mirrored: false });
  }
  return { rows, order: rows.flatMap((r) => r.items) };
}

interface LightboxProps {
  items: readonly Project[];
  index: number | null;
  onIndexChange: (i: number | null) => void;
  /** Kapanınca odak, o an gösterilen fotoğrafın kartına döner */
  onClosed: (slug: Project["slug"]) => void;
}

const Lightbox = ({ items, index, onIndexChange, onClosed }: LightboxProps) => {
  const item = index === null ? null : items[index];
  const go = (delta: number) => {
    if (index === null) return;
    onIndexChange((index + delta + items.length) % items.length);
  };

  return (
    <Dialog.Root open={item !== null} onOpenChange={(open) => !open && onIndexChange(null)}>
      <Dialog.Portal>
        <Dialog.Overlay className="theme-dark fixed inset-0 z-50 bg-surface data-[state=open]:animate-overlay-in" />
        {item && index !== null && (
          <Dialog.Content
            aria-describedby={undefined}
            // Radix odağı Dialog.Trigger'a döndürür; burada tetikleyici ızgaradaki görsel olduğu için elle yönetilir
            onCloseAutoFocus={(e) => {
              e.preventDefault();
              onClosed(item.slug);
            }}
            onKeyDown={(e) => {
              if (e.key === "ArrowRight") go(1);
              if (e.key === "ArrowLeft") go(-1);
            }}
            className="theme-dark fixed inset-0 z-50 flex flex-col focus:outline-none"
          >
            <div className="flex items-center justify-between gap-4 border-b border-rule px-4 py-3 sm:px-8">
              <p className="font-mono text-xs text-fg-muted">
                {pad(index + 1)} / {pad(items.length)} · {recordCode(item.slug)} · {categoryLabel(item.category)}
              </p>
              <Dialog.Close className="btn btn-dark btn-sm h-10 w-10 px-0" aria-label="Kapat">
                <X />
              </Dialog.Close>
            </div>

            <div className="relative flex min-h-0 flex-1 items-center justify-center p-4 sm:p-8">
              <Picture
                key={item.slug}
                slug={item.slug}
                alt={item.alt}
                sizes="100vw"
                priority
                className="h-full max-h-full w-auto max-w-full object-contain"
              />
            </div>

            <div className="border-t border-rule px-4 py-5 sm:px-8">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div className="max-w-3xl">
                  <Dialog.Title className="text-2xl sm:text-3xl">{item.title}</Dialog.Title>
                  <Dialog.Description id="lightbox-detail" className="mt-1.5 text-fg-muted">
                    {item.detail}
                    {item.route ? ` · ${item.route}` : ""}
                  </Dialog.Description>
                </div>
                <div className="flex items-center gap-2">
                  <button type="button" onClick={() => go(-1)} className="btn btn-outline btn-sm" aria-label="Önceki fotoğraf">
                    <ChevronLeft />
                    Önceki
                  </button>
                  <button type="button" onClick={() => go(1)} className="btn btn-outline btn-sm" aria-label="Sonraki fotoğraf">
                    Sonraki
                    <ChevronRight />
                  </button>
                </div>
              </div>
            </div>
          </Dialog.Content>
        )}
      </Dialog.Portal>
    </Dialog.Root>
  );
};

interface EntryProps {
  project: Project;
  onOpen: () => void;
  aspect: string;
  sizes: string;
  maxWidth?: number;
  className?: string;
}

/** Arşiv görseli: kart çerçevesi yok; görsel butonu lightbox'ı açar */
const EntryImage = ({ project, onOpen, aspect, sizes, maxWidth = 960, className }: EntryProps) => (
  <button
    type="button"
    data-project={project.slug}
    onClick={onOpen}
    aria-label={`${project.title}: fotoğrafı büyüt`}
    className={cn("reveal-clip relative block w-full overflow-hidden bg-surface-sunken focus-visible:outline-offset-4", aspect, className)}
  >
    <Picture
      slug={project.slug}
      alt={project.alt}
      sizes={sizes}
      maxWidth={maxWidth}
      className="photo-grade h-full w-full object-cover group-hover:scale-[1.025]"
      style={{ objectPosition: project.focus ?? "50% 50%" }}
    />
  </button>
);

const Fragments = ({ detail, className }: { detail: string; className?: string }) => (
  <ul className={cn("text-sm text-fg-subtle transition-colors duration-300 group-hover:text-fg-muted", className)}>
    {detail.split(" · ").map((part) => (
      <li key={part} className="border-t border-rule py-2 first:border-t-0 first:pt-0">
        {part}
      </li>
    ))}
  </ul>
);

const Caption = ({ project, size = "md" }: { project: Project; size?: "md" | "lg" }) => (
  <>
    <p className="flex flex-wrap items-baseline gap-x-3 font-mono text-xs text-fg-subtle">
      <span className="text-fg-muted">{recordCode(project.slug)}</span>
      <span>{categoryLabel(project.category)}</span>
    </p>
    <h3 className={cn("mt-2.5 text-balance", size === "lg" ? "text-display-md" : "text-xl leading-snug")}>{project.title}</h3>
    {project.route && <p className="mt-1.5 font-mono text-sm text-fg">{project.route}</p>}
  </>
);

const ProjectArchive = () => {
  const [filter, setFilter] = useState<Filter>("all");
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const revealRef = useReveal<HTMLDivElement>();

  const visible = useMemo(() => (filter === "all" ? PROJECTS : PROJECTS.filter((p) => p.category === filter)), [filter]);
  // Lightbox sırası ekrandaki sırayla aynı olsun diye düzenlenmiş sıra kullanılır
  const { rows, order } = useMemo(() => arrange(visible), [visible]);
  const open = (project: Project) => setOpenIndex(order.indexOf(project));
  const filters: { id: Filter; label: string; count: number }[] = [
    { id: "all", label: "Tümü", count: PROJECTS.length },
    ...PROJECT_CATEGORIES.map((c) => ({ ...c, count: PROJECTS.filter((p) => p.category === c.id).length })),
  ];

  return (
    <section id="projeler" aria-labelledby="projeler-title" className="border-t border-rule bg-surface-alt py-24 lg:py-32">
      <div ref={revealRef} className="container">
        <SectionHeader
          index="04"
          kicker="Saha kayıtları"
          titleId="projeler-title"
          title="Proje Arşivi"
          lead="Operasyonlarımızdan saha fotoğrafları. Makine marka ve modelleri fotoğrafta okunabildiği şekilde kayda geçirilmiştir; güzergah yalnızca bilindiğinde yazılır."
          layout="split"
        />

        <div className="mt-14 flex flex-wrap gap-x-8 border-b border-rule" role="group" aria-label="Kategoriye göre filtrele">
          {filters.map((f) => (
            <button
              key={f.id}
              type="button"
              aria-pressed={filter === f.id}
              onClick={() => setFilter(f.id)}
              className={cn(
                "-mb-px flex items-baseline gap-2 border-b py-4 text-[0.9375rem] transition-colors",
                filter === f.id ? "border-signal text-fg" : "border-transparent text-fg-muted hover:text-fg",
              )}
            >
              {f.label}
              <span className="tabular font-mono text-xs text-fg-subtle">{pad(f.count)}</span>
            </button>
          ))}
        </div>

        <p aria-live="polite" className="sr-only">
          {visible.length} proje gösteriliyor
        </p>

        <ul className="mt-12 grid gap-16 lg:mt-16 lg:gap-24">
          {rows.map((row) => {
            if (row.type === "lead") {
              const [p] = row.items;
              return (
                <li key={p.slug} className="group grid gap-6 lg:grid-cols-12 lg:gap-10">
                  <EntryImage
                    project={p}
                    onOpen={() => open(p)}
                    aspect="aspect-[4/3] lg:aspect-[3/2]"
                    sizes="(min-width: 1360px) 860px, (min-width: 1024px) 64vw, 100vw"
                    maxWidth={1600}
                    className="lg:col-span-8"
                  />
                  <div className="flex flex-col lg:col-span-4 lg:justify-end">
                    <Caption project={p} size="lg" />
                    <Fragments detail={p.detail} className="mt-6 border-t border-rule pt-3" />
                  </div>
                </li>
              );
            }

            if (row.type === "single") {
              const [p] = row.items;
              return (
                <li key={p.slug} className="group grid gap-6 sm:grid-cols-12 sm:gap-8 lg:gap-10">
                  <EntryImage
                    project={p}
                    onOpen={() => open(p)}
                    aspect={ratio(p) > 1.5 ? "aspect-[16/9]" : "aspect-[4/3]"}
                    sizes="(min-width: 1360px) 740px, (min-width: 640px) 56vw, 100vw"
                    className="sm:col-span-7"
                  />
                  <div className="flex flex-col sm:col-span-5 sm:justify-end">
                    <Caption project={p} />
                    <Fragments detail={p.detail} className="mt-5 border-t border-rule pt-3" />
                  </div>
                </li>
              );
            }

            if (row.type === "wide") {
              const [p] = row.items;
              return (
                <li key={p.slug} className="group">
                  <EntryImage
                    project={p}
                    onOpen={() => open(p)}
                    aspect="aspect-[4/3] sm:aspect-[16/7]"
                    sizes="(min-width: 1360px) 1280px, 100vw"
                    maxWidth={1600}
                  />
                  <div className="mt-5 grid gap-3 lg:grid-cols-12 lg:gap-10">
                    <div className="lg:col-span-5">
                      <Caption project={p} />
                    </div>
                    <p className="text-pretty text-sm text-fg-subtle transition-colors duration-300 group-hover:text-fg-muted lg:col-span-7 lg:pt-7">
                      {p.detail}
                    </p>
                  </div>
                </li>
              );
            }

            return (
              <li key={row.items.map((p) => p.slug).join()} className="grid gap-14 sm:grid-cols-12 sm:gap-8 lg:gap-10">
                {row.items.map((p, j) => {
                  const large = row.mirrored ? j === 1 : j === 0;
                  return (
                    <div key={p.slug} className={cn("group", large ? "sm:col-span-7" : "sm:col-span-5", !large && "sm:pt-16")}>
                      <EntryImage
                        project={p}
                        onOpen={() => open(p)}
                        aspect={large ? "aspect-[4/3]" : "aspect-[4/3] sm:aspect-[4/5]"}
                        sizes={large ? "(min-width: 1360px) 740px, (min-width: 640px) 56vw, 100vw" : "(min-width: 1360px) 520px, (min-width: 640px) 40vw, 100vw"}
                      />
                      <div className="mt-5">
                        <Caption project={p} />
                        <p className="mt-2 text-pretty text-sm text-fg-subtle transition-colors duration-300 group-hover:text-fg-muted">{p.detail}</p>
                      </div>
                    </div>
                  );
                })}
              </li>
            );
          })}
        </ul>
      </div>

      <Lightbox
        items={order}
        index={openIndex}
        onIndexChange={setOpenIndex}
        onClosed={(slug) => document.querySelector<HTMLButtonElement>(`[data-project="${slug}"]`)?.focus()}
      />
    </section>
  );
};

export default ProjectArchive;
