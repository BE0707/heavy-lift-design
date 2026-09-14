import { Link } from "react-router-dom";
import { BrandMark } from "@/components/brand/BrandMark";
import { NAV_ITEMS } from "@/data/navigation";
import { COMPANY, DISPATCHERS, telHref, whatsappHref } from "@/data/company";
import { PROVINCES } from "@/data/coverage";

/** Katalogun son sayfası gibi: büyük marka ifadesi, iletişim, hizmet bölgesi, teknik alt satır */
const SiteFooter = () => (
  <footer className="border-t border-rule bg-ink">
    <div className="container pb-12 pt-20 lg:pt-28">
      <div className="flex items-start gap-5">
        <BrandMark className="mt-2 h-10 w-10 outline outline-1 outline-rule-strong sm:h-14 sm:w-14" />
        <div>
          <p className="font-brand text-[clamp(3.25rem,1.9rem+6vw,8rem)] font-bold uppercase leading-[0.85] tracking-[0.02em] text-bone">
            Bumerang
          </p>
          <p className="mt-4 max-w-[24ch] text-balance text-display-md text-steel">
            Gabari dışı ağır taşımacılık &amp; lowbed operasyonları
          </p>
        </div>
      </div>

      <div className="mt-16 grid gap-12 border-t border-rule pt-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <p className="text-sm text-dim">Operasyon hattı · {COMPANY.hours}</p>
          <ul className="mt-4 grid gap-5">
            {DISPATCHERS.map((d) => (
              <li key={d.id}>
                <p className="text-steel">{d.name}</p>
                <p className="mt-1 flex flex-wrap items-baseline gap-x-5 gap-y-1">
                  <a href={telHref(d.phone)} className="tabular font-mono text-xl text-bone link-u">
                    {d.display}
                  </a>
                  <a
                    href={whatsappHref(d.phone)}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${d.name} ile WhatsApp üzerinden yazın`}
                    className="-my-1.5 py-1.5 text-sm text-steel transition-colors hover:text-bone"
                  >
                    <span className="link-rule">WhatsApp</span>
                  </a>
                </p>
              </li>
            ))}
          </ul>
        </div>

        <nav aria-label="Alt menü" className="lg:col-span-2">
          <p className="text-sm text-dim">Sayfalar</p>
          <ul className="mt-3 grid gap-0.5">
            {[...NAV_ITEMS, { to: "/#fiyat-talebi", label: "Teklif al" }].map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="inline-block py-1 text-steel transition-colors hover:text-bone">
                  <span className="link-u">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="lg:col-span-4">
          <p className="text-sm text-dim">Hizmet bölgesi</p>
          <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-1.5 sm:grid-cols-3">
            {PROVINCES.map((p) => (
              <li key={p.plate} className="flex items-baseline gap-2 text-sm text-steel">
                <span className="tabular w-5 font-mono text-xs text-dim">{p.plate}</span>
                {p.name}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-dim">Şehirlerarası sevk: Türkiye geneli</p>
        </div>

        <div className="lg:col-span-2">
          <p className="text-sm text-dim">Üs</p>
          <p className="mt-4 text-steel">{COMPANY.base}, Türkiye</p>
          <p className="tabular mt-1 font-mono text-sm text-dim">37,91° K · 40,23° D</p>
        </div>
      </div>
    </div>

    <div className="border-t border-rule">
      <div className="container flex flex-col gap-2 py-5 font-mono text-2xs text-dim sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {COMPANY.name}
        </p>
        <p>Lowbed · gabari dışı yük · KGM özel izin ve eskort koordinasyonu</p>
        <p>{COMPANY.base} · Güneydoğu Anadolu · Türkiye</p>
      </div>
    </div>
  </footer>
);

export default SiteFooter;
