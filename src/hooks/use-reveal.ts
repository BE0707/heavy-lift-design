import { useLayoutEffect, useRef } from "react";

/**
 * Bölüm girişi: öğe görünür alana girince hafifçe yerine oturur (CSS: [data-reveal]).
 * IntersectionObserver yoksa, hareket azaltılmışsa ya da öğe ilk anda zaten
 * görünürdeyse hiçbir şey gizlenmez; içerik JS'e bağımlı kalmaz.
 */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.9) return;

    el.dataset.reveal = "pending";
    const reveal = () => {
      el.dataset.reveal = "in";
      observer.disconnect();
      window.clearTimeout(safety);
    };
    const observer = new IntersectionObserver((entries) => entries.some((e) => e.isIntersecting) && reveal(), {
      rootMargin: "0px 0px -8% 0px",
      threshold: 0.06,
    });
    observer.observe(el);
    // Güvenlik ağı: gözlemci tetiklenmezse (ör. arka plan sekmesi, iframe) görünür alandaki içerik gizli kalmasın
    const safety = window.setTimeout(() => {
      if (el.dataset.reveal === "pending" && el.getBoundingClientRect().top < window.innerHeight) reveal();
    }, 1200);
    return () => {
      observer.disconnect();
      window.clearTimeout(safety);
    };
  }, []);

  return ref;
}
