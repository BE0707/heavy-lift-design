import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { AlertTriangle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: Geçersiz Güzergah:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-asphalt-950 p-4 text-foreground relative">
      <div className="absolute inset-0 bg-technical-grid opacity-20 pointer-events-none" />
      <div className="max-w-md w-full bg-asphalt-900 border-2 border-machinery-yellow/60 p-8 rounded-sm text-center relative shadow-2xl z-10">
        <div className="w-14 h-14 bg-machinery-yellow/15 border border-machinery-yellow/40 rounded-sm flex items-center justify-center mx-auto mb-4 text-machinery-yellow">
          <AlertTriangle className="w-7 h-7" />
        </div>
        <span className="font-mono text-xs text-machinery-yellow font-bold uppercase tracking-widest block mb-1">
          HATA KODU // 404
        </span>
        <h1 className="font-display text-3xl font-extrabold uppercase text-foreground mb-2">
          Geçersiz Güzergah
        </h1>
        <p className="text-steel-light text-sm mb-6 font-sans">
          Aradığınız sayfa veya güzergah sistemde bulunamadı. Lütfen ana sevkiyat merkezine dönün.
        </p>
        <Link to="/">
          <Button variant="machinery" size="default" className="w-full font-display font-extrabold uppercase tracking-wider text-xs">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Ana Sayfaya Dön
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
