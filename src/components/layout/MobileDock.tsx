import { Link } from "react-router-dom";
import { ArrowRight, Phone } from "lucide-react";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import { PRIMARY_DISPATCHER, telHref, whatsappHref } from "@/data/company";

const cell = "flex items-center justify-center gap-2 text-sm font-medium transition-colors";

/** Mobilde sabit alt çubuk: şantiyeden tek dokunuşla arama / WhatsApp / teklif */
const MobileDock = () => (
  <nav
    aria-label="Hızlı iletişim"
    className="fixed inset-x-0 bottom-0 z-40 border-t border-rule bg-ink lg:hidden"
    style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
  >
    <div className="grid h-16 grid-cols-[1fr_1fr_1.25fr]">
      <a href={telHref(PRIMARY_DISPATCHER.phone)} className={`${cell} border-r border-rule text-bone active:bg-graphite`}>
        <Phone className="h-4 w-4 text-steel" aria-hidden="true" />
        Ara
      </a>
      <a
        href={whatsappHref(PRIMARY_DISPATCHER.phone)}
        target="_blank"
        rel="noopener noreferrer"
        className={`${cell} border-r border-rule text-bone active:bg-graphite`}
      >
        <WhatsAppIcon className="h-4 w-4 text-steel" />
        WhatsApp
      </a>
      <Link to="/#fiyat-talebi" className={`${cell} bg-signal text-ink active:bg-signal-press`}>
        Teklif al
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </Link>
    </div>
  </nav>
);

export default MobileDock;
