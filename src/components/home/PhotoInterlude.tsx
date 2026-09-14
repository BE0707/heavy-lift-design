import { Link } from "react-router-dom";
import Picture from "@/components/Picture";
import { PROJECTS, recordCode } from "@/data/projects";
import { useReveal } from "@/hooks/use-reveal";
import type { PhotoSlug } from "@/lib/photos";

interface PhotoInterludeProps {
  slug: PhotoSlug;
  caption: string;
  /** Geniş kırpımda odak noktası (object-position) */
  focus?: string;
}

/** Kenardan kenara saha fotoğrafı: bölümler arasında görsel süreklilik ve ağırlık */
const PhotoInterlude = ({ slug, caption, focus = "50% 50%" }: PhotoInterludeProps) => {
  const ref = useReveal<HTMLElement>();
  const project = PROJECTS.find((p) => p.slug === slug);

  return (
    <figure ref={ref} className="border-t border-rule">
      <div className="reveal-clip relative h-[clamp(240px,42vw,620px)] overflow-hidden bg-graphite">
        <Picture
          slug={slug}
          alt={project?.alt ?? caption}
          sizes="100vw"
          className="photo-grade absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: focus }}
        />
      </div>
      <figcaption className="container grid gap-2 py-5 sm:grid-cols-[5rem_1fr_auto] sm:items-baseline sm:gap-8">
        <span className="font-mono text-xs text-dim">{recordCode(slug)}</span>
        <span className="max-w-[62ch] text-pretty text-steel">{caption}</span>
        <Link to="/#projeler" className="-my-2 justify-self-start py-2 text-sm text-bone">
          <span className="link-rule">Proje arşivi</span>
        </Link>
      </figcaption>
    </figure>
  );
};

export default PhotoInterlude;
