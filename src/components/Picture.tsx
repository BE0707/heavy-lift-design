import type { CSSProperties } from "react";
import { getPhoto, type PhotoSlug } from "@/lib/photos";

interface PictureProps {
  slug: PhotoSlug;
  alt: string;
  /** <source sizes>; ekranda kaplanan gerçek genişliği tarif eder */
  sizes: string;
  /** srcset üst sınırı (px) */
  maxWidth?: number;
  /** Ekranın ilk görünümündeki (LCP) görsel için */
  priority?: boolean;
  className?: string;
  style?: CSSProperties;
}

const Picture = ({ slug, alt, sizes, maxWidth, priority = false, className, style }: PictureProps) => {
  const photo = getPhoto(slug, maxWidth);
  // React 18 camelCase `fetchPriority` desteklemiyor; öznitelik küçük harfle geçilir.
  const priorityAttrs = priority ? { fetchpriority: "high" } : { loading: "lazy" as const, decoding: "async" as const };

  return (
    <picture className="contents">
      <source type="image/webp" srcSet={photo.srcSet} sizes={sizes} />
      <img src={photo.src} width={photo.width} height={photo.height} alt={alt} className={className} style={style} {...priorityAttrs} />
    </picture>
  );
};

export default Picture;
