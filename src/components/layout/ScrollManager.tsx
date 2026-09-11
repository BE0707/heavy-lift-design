import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Rota değişiminde sayfa başına döner; "/#filo" gibi bölüm bağlantılarında
 * (başka sayfadan gelinse bile) hedef bölüme kaydırır. React Router bunu
 * kendiliğinden yapmaz.
 */
const ScrollManager = () => {
  const { pathname, hash, key } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      return;
    }
    const frame = requestAnimationFrame(() => {
      document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView({ block: "start" });
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname, hash, key]);

  return null;
};

export default ScrollManager;
