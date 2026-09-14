/** Üst menü, mobil menü ve alt bilgi bağlantıları */
export interface NavItem {
  to: string;
  label: string;
  /** Yalnızca geniş ekranda (xl) üst menüde gösterilir; mobil menü ve alt bilgide hep var */
  wideOnly?: boolean;
}

export const NAV_ITEMS: readonly NavItem[] = [
  { to: "/#filo", label: "Filo & Kapasite" },
  { to: "/#protokol", label: "İzin & Eskort" },
  { to: "/#projeler", label: "Proje Arşivi" },
  { to: "/bilgi", label: "Rehber" },
  { to: "/bilgi#hakkimizda", label: "Hakkımızda", wideOnly: true },
  { to: "/#iletisim", label: "İletişim" },
];
