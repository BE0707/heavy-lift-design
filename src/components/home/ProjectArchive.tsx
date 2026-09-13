import { useMemo, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import Picture from "@/components/Picture";
import { PROJECTS, PROJECT_CATEGORIES, type Project, type ProjectCategory } from "@/data/projects";
import { cn } from "@/lib/utils";

type Filter = ProjectCategory | "all";

const categoryLabel = (id: ProjectCategory) => PROJECT_CATEGORIES.find((c) => c.id === id)?.label ?? "";
const pad = (n: number) => String(n).padStart(2, "0");

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
        <Dialog.Overlay className="fixed inset-0 z-50 bg-ink/95 backdrop-blur-md data-[state=open]:animate-overlay-in" />
        {item && index !== null && (
          <Dialog.Content
            aria-describedby={undefined}
            onCloseAutoFocus={(e) => {
              e.preventDefault();
              onClosed(item.slug);
            }}
            onKeyDown={(e) => {
              if (e.key === "ArrowRight") go(1);
              if (e.key === "ArrowLeft") go(-1);
            }}
            className="fixed inset-0 z-50 flex flex-col focus:outline-none"
          >
            <div className="flex items-center justify-between gap-4 border-b border-rule bg-ink/90 px-4 py-3 sm:px-8 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <span className="h-1.5 w-1.5 bg-signal" aria-hidden="true" />
                <p className="font-mono text-xs uppercase tracking-label text-steel">
                  {pad(index + 1)} / {pad(items.length)} · {categoryLabel(item.category)}
                </p>
              </div>
              <Dialog.Close className="btn btn-dark btn-sm h-10 w-10 px-0 hover:border-signal" aria-label="Kapat">
                <X className="h-4 w-4" />
              </Dialog.Close>
            </div>

            <div className="relative flex min-h-0 flex-1 items-center justify-center p-4 sm:p-8">
              <Picture
                key={item.slug}
                slug={item.slug}
                alt={item.alt}
                sizes="100vw"
                priority
                className="h-full max-h-full w-auto max-w-full object-contain shadow-2xl border border-rule-strong/40"
              />
            </div>

            <div className="border-t border-rule bg-ink/90 px-4 py-5 sm:px-8 backdrop-blur-sm">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="max-w-2xl">
                  <Dialog.Title className="font-display text-2xl font-bold uppercase tracking-tight text-bone sm:text-3xl">
                    {item.title}
                  </Dialog.Title>
                  <Dialog.Description id="lightbox-detail" className="mt-1 font-sans text-sm text-steel">
                    {item.detail}
                    {item.route ? ` · ${item.route}` : ""}
                  </Dialog.Description>
                </div>
                <div className="flex items-center gap-2">
                  <button type="button" onClick={() => go(-1)} className="btn btn-outline btn-sm" aria-label="Önceki fotoğraf">
                    <ChevronLeft className="h-4 w-4" />
                    Önceki
                  </button>
                  <button type="button" onClick={() => go(1)} className="btn btn-outline btn-sm" aria-label="Sonraki fotoğraf">
                    Sonraki
                    <ChevronRight className="h-4 w-4" />
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

const ProjectArchive = () => {
  const [filter, setFilter] = useState<Filter>("all");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const visible = useMemo(() => (filter === "all" ? PROJECTS : PROJECTS.filter((p) => p.category === filter)), [filter]);
  const filters: { id: Filter; label: string; count: number }[] = [
    { id: "all", label: "Tümü", count: PROJECTS.length },
    ...PROJECT_CATEGORIES.map((c) => ({ ...c, count: PROJECTS.filter((p) => p.category === c.id).length })),
  ];

  return (
    <section id="projeler" aria-labelledby="projeler-title" className="border-b border-rule bg-ink py-20 lg:py-28">
      <div className="container">
        <SectionHeader
          index="04"
          kicker="Saha kayıtları"
          titleId="projeler-title"
          title="Proje Arşivi"
          lead="Operasyonlarımızdan doğrulanmış saha fotoğrafları. Makine marka ve modelleri fotoğrafta okunabildiği şekilde arşivlenmiştir."
          layout="split"
        />

        {/* Filtre sekmesi: kutu pill'ler yerine rafine mimari filtre çubuğu */}
        <div className="mt-10 flex flex-wrap items-center gap-2 border-b border-rule pb-6" role="group" aria-label="Kategoriye göre filtrele">
          {filters.map((f) => (
            <button
              key={f.id}
              type="button"
              aria-pressed={filter === f.id}
              onClick={() => setFilter(f.id)}
              className={cn(
                "btn btn-sm gap-2.5 transition-all duration-150",
                filter === f.id
                  ? "border-signal bg-signal text-ink shadow-[0_0_12px_rgba(253,184,19,0.25)]"
                  : "btn-outline text-steel hover:text-bone hover:border-steel",
              )}
            >
              <span>{f.label}</span>
              <span className="tabular font-mono text-xs tracking-normal opacity-75">
                {pad(f.count)}
              </span>
            </button>
          ))}
        </div>

        <p aria-live="polite" className="sr-only">
          {visible.length} proje gösteriliyor
        </p>

        {/* Editoryal fotoğraf ızgarası: ilk kare öne çıkar, tüm kareler nefes alır */}
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((project, i) => {
            const isFeatured = i === 0;
            return (
              <li
                key={project.slug}
                className={cn(
                  "group flex flex-col border border-rule bg-asphalt/60 transition-all duration-200 hover:border-rule-strong hover:bg-asphalt",
                  isFeatured && "sm:col-span-2 lg:col-span-2",
                )}
              >
                <figure className="flex h-full flex-col">
                  <button
                    type="button"
                    data-project={project.slug}
                    onClick={() => setOpenIndex(i)}
                    aria-label={`${project.title}: fotoğrafı büyüt`}
                    className={cn(
                      "relative block w-full overflow-hidden bg-ink focus-visible:-outline-offset-4",
                      isFeatured ? "aspect-[16/10]" : "aspect-[4/3]",
                    )}
                  >
                    <Picture
                      slug={project.slug}
                      alt={project.alt}
                      sizes={
                        isFeatured
                          ? "(min-width: 1320px) 860px, (min-width: 1024px) 66vw, 100vw"
                          : "(min-width: 1320px) 410px, (min-width: 1024px) 31vw, (min-width: 640px) 48vw, 100vw"
                      }
                      maxWidth={isFeatured ? 1600 : 960}
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                      style={{ objectPosition: project.focus ?? "50% 50%" }}
                    />

                    {/* Fotoğraf üstü teknik indeks ve büyüteç etiketi */}
                    <div className="absolute inset-x-0 top-0 flex items-center justify-between p-3 pointer-events-none">
                      <span className="font-mono text-2xs font-semibold uppercase tracking-label text-bone bg-ink/80 backdrop-blur-sm px-2 py-1 border border-rule">
                        #{pad(PROJECTS.indexOf(project) + 1)}
                      </span>
                      {isFeatured && (
                        <span className="font-mono text-2xs font-medium uppercase tracking-label text-signal bg-ink/90 backdrop-blur-sm px-2.5 py-1 border border-signal/40">
                          Öne Çıkan Saha Kaydı
                        </span>
                      )}
                    </div>

                    <span
                      aria-hidden="true"
                      className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center border border-rule bg-ink/90 text-bone opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100"
                    >
                      <Maximize2 className="h-4 w-4" />
                    </span>
                  </button>

                  <figcaption className="flex flex-1 flex-col justify-between border-t border-rule p-5 sm:p-6">
                    <div>
                      <p className="font-mono text-2xs uppercase tracking-label text-signal">
                        {categoryLabel(project.category)}
                      </p>
                      <h3
                        className={cn(
                          "mt-2 font-display font-bold uppercase tracking-tight text-bone",
                          isFeatured ? "text-2xl sm:text-3xl" : "text-xl sm:text-2xl",
                        )}
                      >
                        {project.title}
                      </h3>
                      <p className="mt-2 text-pretty font-sans text-sm leading-relaxed text-steel">
                        {project.detail}
                      </p>
                    </div>

                    {project.route && (
                      <div className="mt-4 flex items-center gap-2 border-t border-rule/60 pt-3 text-xs font-mono text-bone/90">
                        <span className="text-signal">Güzergah:</span>
                        <span>{project.route}</span>
                      </div>
                    )}
                  </figcaption>
                </figure>
              </li>
            );
          })}
        </ul>
      </div>

      <Lightbox
        items={visible}
        index={openIndex}
        onIndexChange={setOpenIndex}
        onClosed={(slug) => document.querySelector<HTMLButtonElement>(`[data-project="${slug}"]`)?.focus()}
      />
    </section>
  );
};

export default ProjectArchive;
