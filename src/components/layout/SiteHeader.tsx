import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import * as Dialog from "@radix-ui/react-dialog";
import { Menu, Phone, X } from "lucide-react";
import { Wordmark } from "@/components/brand/BrandMark";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import { COMPANY, DISPATCHERS, PRIMARY_DISPATCHER, telHref, whatsappHref } from "@/data/company";
import { NAV_ITEMS } from "@/data/navigation";
import { useScrolled } from "@/hooks/use-scrolled";
import { cn } from "@/lib/utils";

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  cn(
    "relative flex h-16 items-center text-[0.9375rem] transition-colors duration-200 hover:text-bone",
    "after:absolute after:inset-x-0 after:bottom-[18px] after:h-px after:origin-left after:bg-signal after:transition-transform after:duration-300",
    isActive ? "text-bone after:scale-x-100" : "text-steel after:scale-x-0",
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
        <Dialog.Overlay className="fixed inset-0 z-50 bg-ink/90 data-[state=open]:animate-overlay-in" />
        <Dialog.Content
          aria-describedby={undefined}
          className="fixed inset-x-0 top-0 z-50 max-h-dvh overflow-y-auto border-b border-rule bg-ink data-[state=open]:animate-panel-in"
        >
          <div className="container flex h-16 items-center justify-between">
            <Dialog.Title className="sr-only">Site menüsü</Dialog.Title>
            <Link to="/" onClick={close} aria-label={`${COMPANY.name} ana sayfa`}>
              <Wordmark />
            </Link>
            <Dialog.Close className="btn btn-dark btn-sm h-11 w-11 px-0" aria-label="Menüyü kapat">
              <X />
            </Dialog.Close>
          </div>
          <nav aria-label="Mobil menü" className="container pb-2 pt-4">
            <ul className="border-t border-rule">
              {NAV_ITEMS.map((item) => (
                <li key={item.to} className="border-b border-rule">
                  <Link to={item.to} onClick={close} className="flex min-h-14 items-center justify-between text-2xl tracking-[-0.02em] text-bone">
                    {item.label}
                    <span aria-hidden="true" className="font-mono text-sm text-dim">→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="container grid gap-5 pb-8 pt-6">
            <ul className="grid gap-4">
              {DISPATCHERS.map((d) => (
                <li key={d.id} className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <span className="text-steel">{d.name}</span>
                  <a href={telHref(d.phone)} className="tabular font-mono text-lg text-bone link-u">
                    {d.display}
                  </a>
                </li>
              ))}
            </ul>
            <Link to="/#fiyat-talebi" onClick={close} className="btn btn-primary w-full">
              Teklif al
            </Link>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

/** Sakin, kompakt üst menü: kaydırınca yalnızca zemin ve alt çizgi belirginleşir */
const SiteHeader = () => {
  const scrolled = useScrolled(12);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b transition-[background-color,border-color] duration-300",
        scrolled ? "border-rule bg-ink" : "border-transparent bg-asphalt",
      )}
    >
      <div className="container flex h-16 items-center gap-3 sm:gap-6">
        <Link to="/" aria-label={`${COMPANY.name} ana sayfa`} className="-m-1 mr-auto p-1 lg:mr-0">
          <Wordmark />
        </Link>

        <nav aria-label="Ana menü" className="ml-auto hidden lg:block">
          <ul className="flex items-center gap-7">
            {NAV_ITEMS.map((item) => (
              <li key={item.to} className={item.wideOnly ? "hidden xl:block" : undefined}>
                {/* NavLink yalnızca pathname eşleştirir; bölüm (#) bağlantılarında hep "aktif" görünmesin */}
                {item.to.includes("#") ? (
                  <Link to={item.to} className={navLinkClass({ isActive: false })}>
                    {item.label}
                  </Link>
                ) : (
                  <NavLink to={item.to} end className={navLinkClass}>
                    {item.label}
                  </NavLink>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2 sm:gap-4 lg:ml-4 xl:gap-5">
          <a
            href={telHref(PRIMARY_DISPATCHER.phone)}
            className="hidden items-center gap-2 py-3 font-mono text-sm text-bone md:inline-flex lg:hidden xl:inline-flex"
          >
            <Phone aria-hidden="true" className="h-3.5 w-3.5 text-steel" />
            <span className="tabular link-u">{PRIMARY_DISPATCHER.display}</span>
          </a>
          <a
            href={whatsappHref(PRIMARY_DISPATCHER.phone)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp ile yazın"
            className="hidden h-10 w-10 items-center justify-center text-steel transition-colors hover:text-bone xl:inline-flex"
          >
            <WhatsAppIcon className="h-[1.125rem] w-[1.125rem]" />
          </a>
          <Link to="/#fiyat-talebi" className="btn btn-primary btn-sm hidden sm:inline-flex">
            Teklif al
          </Link>
          <a
            href={telHref(PRIMARY_DISPATCHER.phone)}
            className="btn btn-dark btn-sm h-11 w-11 px-0 sm:hidden"
            aria-label={`Operasyon hattını ara: ${PRIMARY_DISPATCHER.display}`}
          >
            <Phone />
          </a>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
};

export default SiteHeader;
