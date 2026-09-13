import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import * as Dialog from "@radix-ui/react-dialog";
import { Menu, Phone, X } from "lucide-react";
import { Wordmark } from "@/components/brand/BrandMark";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import { COMPANY, DISPATCHERS, PRIMARY_DISPATCHER, telHref, whatsappHref } from "@/data/company";
import { NAV_ITEMS } from "@/data/navigation";
import { cn } from "@/lib/utils";

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  cn(
    "relative flex h-16 items-center font-condensed text-[1.0625rem] font-semibold uppercase tracking-[0.07em] transition-colors hover:text-bone",
    isActive ? "text-bone after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:bg-signal" : "text-steel",
  );

const DispatchStrip = () => (
  <div className="hidden border-b border-rule bg-ink/95 md:block">
    <div className="container flex h-9 items-center justify-between gap-6">
      <p className="label flex items-center gap-2.5 text-steel">
        <span aria-hidden="true" className="h-1.5 w-1.5 bg-signal shadow-[0_0_5px_rgba(253,184,19,0.6)]" />
        {COMPANY.hours} operasyon hattı · Üs: {COMPANY.base}
      </p>
      <ul className="flex items-center gap-6">
        {DISPATCHERS.map((d) => (
          <li key={d.id}>
            <a href={telHref(d.phone)} className="label inline-flex items-center gap-2 transition-colors hover:text-bone">
              <span className="text-dim">{d.line}</span>
              <span className="text-steel">{d.name}</span>
              <span className="tabular text-signal font-semibold">{d.display}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

const MobileMenu = () => {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button type="button" className="btn btn-dark btn-sm h-11 w-11 px-0 lg:hidden" aria-label="Menüyü aç">
          <Menu />
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-ink/85 backdrop-blur-md data-[state=open]:animate-overlay-in" />
        <Dialog.Content
          aria-describedby={undefined}
          className="fixed inset-x-0 top-0 z-50 max-h-dvh overflow-y-auto border-b border-rule-strong bg-asphalt shadow-2xl data-[state=open]:animate-panel-in"
        >
          <div className="container flex h-16 items-center justify-between border-b border-rule">
            <Dialog.Title className="sr-only">Site menüsü</Dialog.Title>
            <Link to="/" onClick={close} aria-label={`${COMPANY.name} ana sayfa`}>
              <Wordmark />
            </Link>
            <Dialog.Close className="btn btn-dark btn-sm h-11 w-11 px-0" aria-label="Menüyü kapat">
              <X />
            </Dialog.Close>
          </div>
          <nav aria-label="Mobil menü" className="container">
            <ul>
              {NAV_ITEMS.map((item) => (
                <li key={item.to} className="border-b border-rule">
                  <Link to={item.to} onClick={close} className="flex min-h-14 items-center justify-between font-display text-2xl font-bold uppercase tracking-tight text-bone">
                    {item.label}
                    <span aria-hidden="true" className="font-mono text-sm text-dim">→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="container grid gap-3 py-6">
            <p className="label">Operasyon hattı · {COMPANY.hours}</p>
            {DISPATCHERS.map((d) => (
              <a key={d.id} href={telHref(d.phone)} className="btn btn-outline h-auto w-full flex-wrap justify-between gap-y-1 whitespace-normal py-3">
                <span className="flex items-center gap-2.5"><Phone className="h-4 w-4 text-signal" />{d.name}</span>
                <span className="tabular font-mono text-sm tracking-normal text-signal font-semibold">{d.display}</span>
              </a>
            ))}
            <Link to="/#fiyat-talebi" onClick={close} className="btn btn-primary w-full">
              Yük bildir · Fiyat al
            </Link>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

const SiteHeader = () => (
  <>
    <DispatchStrip />
    <header className="sticky top-0 z-40 border-b border-rule bg-ink/90 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between gap-6">
        <Link to="/" aria-label={`${COMPANY.name} ana sayfa`} className="-m-1 p-1">
          <Wordmark />
        </Link>

        <nav aria-label="Ana menü" className="hidden lg:block">
          <ul className="flex items-center gap-6 xl:gap-8">
            {NAV_ITEMS.map((item) => (
              <li key={item.to}>
                {/* NavLink yalnızca pathname eşleştirir; bölüm (#) bağlantılarında hep "aktif" görünmesin */}
                {item.to.includes("#") ? (
                  <Link to={item.to} className={navLinkClass({ isActive: false })}>
                    {item.label}
                  </Link>
                ) : (
                  <NavLink to={item.to} className={navLinkClass}>
                    {item.label}
                  </NavLink>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={whatsappHref(PRIMARY_DISPATCHER.phone)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-dark btn-sm hidden md:inline-flex lg:hidden xl:inline-flex"
          >
            <WhatsAppIcon className="text-[#25D366]" />
            WhatsApp
          </a>
          <Link to="/#fiyat-talebi" className="btn btn-primary btn-sm hidden sm:inline-flex">
            Fiyat talebi
          </Link>
          <a href={telHref(PRIMARY_DISPATCHER.phone)} className="btn btn-dark btn-sm h-11 w-11 px-0 sm:hidden" aria-label={`Operasyon hattını ara: ${PRIMARY_DISPATCHER.display}`}>
            <Phone />
          </a>
          <MobileMenu />
        </div>
      </div>
    </header>
  </>
);

export default SiteHeader;
