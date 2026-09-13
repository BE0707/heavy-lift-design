import { Link } from "react-router-dom";
import { Wordmark } from "@/components/brand/BrandMark";
import { NAV_ITEMS } from "@/data/navigation";
import { COMPANY, DISPATCHERS, telHref, whatsappHref } from "@/data/company";

const SiteFooter = () => (
  <footer className="border-t border-rule bg-ink">
    <div aria-hidden="true" className="h-0.5 w-full bg-gradient-to-r from-signal via-signal/40 to-transparent" />
    <div className="container grid gap-10 py-16 md:grid-cols-12">
      <div className="md:col-span-5">
        <Wordmark />
        <p className="mt-5 max-w-sm text-pretty font-sans text-sm leading-relaxed text-steel">
          {COMPANY.base} merkezli lowbed ve gabari dışı ağır yük taşımacılığı. İş makinesi, sanayi ekipmanı ve şantiye
          nakliyesi; KGM özel izin ve eskort koordinasyonu.
        </p>
      </div>

      <nav aria-label="Alt menü" className="md:col-span-3">
        <p className="font-mono text-2xs uppercase tracking-label text-signal">Sayfalar</p>
        <ul className="mt-4 grid gap-2.5">
          {NAV_ITEMS.map((item) => (
            <li key={item.to}>
              <Link to={item.to} className="font-sans text-sm text-steel transition-colors hover:text-bone">
                {item.label}
              </Link>
            </li>
          ))}
          <li>
            <Link to="/#fiyat-talebi" className="font-sans text-sm text-steel transition-colors hover:text-bone">
              Fiyat talebi
            </Link>
          </li>
        </ul>
      </nav>

      <div className="md:col-span-4">
        <p className="font-mono text-2xs uppercase tracking-label text-signal">Operasyon hattı · {COMPANY.hours}</p>
        <ul className="mt-4 grid gap-4">
          {DISPATCHERS.map((d) => (
            <li key={d.id} className="border-b border-rule/50 pb-3 last:border-b-0 last:pb-0">
              <p className="font-sans text-sm font-medium text-bone">{d.name}</p>
              <p className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1">
                <a href={telHref(d.phone)} className="tabular font-mono text-lg font-semibold text-signal hover:text-signal-hover transition-colors">
                  {d.display}
                </a>
                <a
                  href={whatsappHref(d.phone)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs uppercase tracking-label text-steel hover:text-bone transition-colors underline decoration-rule-strong underline-offset-4"
                >
                  WhatsApp
                </a>
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
    <div className="border-t border-rule/80">
      <div className="container flex flex-col gap-2 py-5 sm:flex-row sm:items-center sm:justify-between text-xs">
        <p className="font-mono text-2xs text-dim">© {new Date().getFullYear()} {COMPANY.name} · Tüm hakları saklıdır.</p>
        <p className="font-mono text-2xs text-dim">{COMPANY.base} · Güneydoğu Anadolu · Türkiye</p>
      </div>
    </div>
  </footer>
);

export default SiteFooter;
