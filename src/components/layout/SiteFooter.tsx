import { Link } from "react-router-dom";
import { Wordmark } from "@/components/brand/BrandMark";
import { NAV_ITEMS } from "@/data/navigation";
import { COMPANY, DISPATCHERS, telHref, whatsappHref } from "@/data/company";

const SiteFooter = () => (
  <footer className="border-t border-rule bg-ink">
    <div aria-hidden="true" className="hazard-band h-1.5" />
    <div className="container grid gap-10 py-14 md:grid-cols-12">
      <div className="md:col-span-5">
        <Wordmark />
        <p className="mt-5 max-w-sm text-pretty leading-relaxed text-steel">
          {COMPANY.base} merkezli lowbed ve gabari dışı ağır yük taşımacılığı. İş makinesi, sanayi ekipmanı ve şantiye
          nakliyesi; KGM özel izin ve eskort koordinasyonu.
        </p>
      </div>

      <nav aria-label="Alt menü" className="md:col-span-3">
        <p className="label">Site</p>
        <ul className="mt-4 grid gap-2.5">
          {NAV_ITEMS.map((item) => (
            <li key={item.to}>
              <Link to={item.to} className="text-steel transition-colors hover:text-bone">
                {item.label}
              </Link>
            </li>
          ))}
          <li>
            <Link to="/#fiyat-talebi" className="text-steel transition-colors hover:text-bone">
              Fiyat talebi
            </Link>
          </li>
        </ul>
      </nav>

      <div className="md:col-span-4">
        <p className="label">Operasyon hattı · {COMPANY.hours}</p>
        <ul className="mt-4 grid gap-4">
          {DISPATCHERS.map((d) => (
            <li key={d.id}>
              <p className="text-steel">{d.name}</p>
              <p className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1">
                <a href={telHref(d.phone)} className="tabular font-mono text-lg text-bone hover:text-signal">
                  {d.display}
                </a>
                <a
                  href={whatsappHref(d.phone)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="label underline decoration-rule-strong underline-offset-4 hover:text-bone"
                >
                  WhatsApp
                </a>
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
    <div className="border-t border-rule">
      <div className="container flex flex-col gap-2 py-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="label">© {new Date().getFullYear()} {COMPANY.name}</p>
        <p className="label">{COMPANY.base} · Türkiye</p>
      </div>
    </div>
  </footer>
);

export default SiteFooter;
