import { Link } from "react-router-dom";
import { ClipboardList, Phone } from "lucide-react";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import { PRIMARY_DISPATCHER, telHref, whatsappHref } from "@/data/company";

const item = "flex flex-col items-center justify-center gap-1.5 font-mono text-2xs font-medium uppercase tracking-label transition-colors";

/** Mobilde sabit alt çubuk: şantiyeden tek dokunuşla arama / WhatsApp / fiyat talebi */
const MobileDock = () => (
  <nav
    aria-label="Hızlı iletişim"
    className="fixed inset-x-0 bottom-0 z-40 border-t border-rule-strong bg-ink lg:hidden"
    style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
  >
    <div className="grid h-16 grid-cols-3">
      <a href={telHref(PRIMARY_DISPATCHER.phone)} className={`${item} border-r border-rule text-bone active:bg-plate`}>
        <Phone className="h-5 w-5 text-signal" aria-hidden="true" />
        Ara
      </a>
      <a
        href={whatsappHref(PRIMARY_DISPATCHER.phone)}
        target="_blank"
        rel="noopener noreferrer"
        className={`${item} border-r border-rule text-bone active:bg-plate`}
      >
        <WhatsAppIcon className="h-5 w-5 text-[#25D366]" />
        WhatsApp
      </a>
      <Link to="/#fiyat-talebi" className={`${item} bg-signal text-ink active:bg-signal-press`}>
        <ClipboardList className="h-5 w-5" aria-hidden="true" />
        Fiyat al
      </Link>
    </div>
  </nav>
);

export default MobileDock;
