import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import SEO from "@/components/SEO";
import PageShell from "@/components/layout/PageShell";

const NotFound = () => (
  <>
    <SEO title="Sayfa bulunamadı | Bumerang Ağır Nakliyat" />
    <PageShell>
      <div className="container py-24 lg:py-36">
        <p className="section-mark">
          <span className="text-fg-muted">404</span>
          <span>Güzergah bulunamadı</span>
        </p>
        <h1 className="mt-7 max-w-[18ch] text-balance text-display-xl">Aradığınız sayfa bu güzergahta yok</h1>
        <p className="mt-6 max-w-[34rem] text-pretty text-lg leading-relaxed text-fg-muted">
          Bağlantı eski veya hatalı olabilir. Ana sayfadan devam edin ya da yükünüzü doğrudan bildirin.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
          <Link to="/#fiyat-talebi" className="btn btn-primary">
            Yük bildir, teklif al
            <ArrowRight />
          </Link>
          <Link to="/" className="text-fg link-rule">
            Ana sayfaya dön
          </Link>
        </div>
      </div>
    </PageShell>
  </>
);

export default NotFound;
