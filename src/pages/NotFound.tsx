import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import SEO from "@/components/SEO";
import PageShell from "@/components/layout/PageShell";

const NotFound = () => (
  <>
    <SEO title="Sayfa bulunamadı | Bumerang Ağır Nakliyat" />
    <PageShell>
      <div className="container py-24 lg:py-32">
        <p className="label flex items-center gap-3">
          <span className="text-signal">404</span>
          <span aria-hidden="true" className="h-px w-10 bg-rule-strong" />
          Güzergah bulunamadı
        </p>
        <h1 className="mt-5 max-w-3xl text-balance font-display text-5xl font-bold uppercase leading-[0.92] sm:text-6xl">
          Aradığınız sayfa bu güzergahta yok
        </h1>
        <p className="mt-5 max-w-xl text-lg text-steel">Bağlantı eski veya hatalı olabilir. Ana sayfadan devam edin ya da yükünüzü doğrudan bildirin.</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link to="/" className="btn btn-outline">
            Ana sayfa
          </Link>
          <Link to="/#fiyat-talebi" className="btn btn-primary">
            Yük bildir · Fiyat al
            <ArrowRight />
          </Link>
        </div>
      </div>
    </PageShell>
  </>
);

export default NotFound;
