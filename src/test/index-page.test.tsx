import { describe, expect, it } from "vitest";
import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Index from "@/pages/Index";
import { WHATSAPP_GREETING } from "@/data/company";

const renderHome = (url = "/") =>
  render(
    <MemoryRouter initialEntries={[url]} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Index />
    </MemoryRouter>,
  );

describe("ana sayfa", () => {
  it("sektöre özgü başlığı ve bölümleri gösterir", () => {
    renderHome();
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Gabari Dışı Ağır Taşımacılık & Lowbed Operasyonları");
    for (const name of ["Filo & Taşıma Kapasitesi", "Hızlı Yük Bildirimi & Fiyat Talebi", "Proje Arşivi", "Operasyon Masası & Hizmet Bölgesi"]) {
      expect(screen.getByRole("heading", { level: 2, name })).toBeInTheDocument();
    }
    expect(document.body.textContent).not.toMatch(/8500\+|Güvenin Adı|Fark Yaratıyoruz/);
  });

  it("boş formda zorunlu alanları işaretler ve ilk hatalı alana odaklanır", () => {
    renderHome();
    const form = screen.getByRole("form", { name: "Hızlı Yük Bildirimi & Fiyat Talebi" });
    fireEvent.submit(form);
    expect(within(form).getByText(/Formda 4 alan eksik/)).toBeInTheDocument();
    const loadType = screen.getByLabelText(/Yük tipi/);
    expect(loadType).toHaveAttribute("aria-invalid", "true");
    expect(document.activeElement).toBe(loadType);
  });

  it("filoda yalnızca 3 dingilli lowbed anlatılır; doğrulanmamış dorse tipi ve kapasite yazılmaz", () => {
    renderHome();
    expect(screen.getByRole("heading", { level: 3, name: "3 dingilli lowbed, hidrolik rampalı" })).toBeInTheDocument();
    expect(screen.queryByRole("tablist")).not.toBeInTheDocument();
    expect(document.body.textContent).not.toMatch(/havuzlu|teleskopik|çok dingilli|4–8|5–8|80 t|faydalı yük/i);
  });

  it("izin ön kontrolü girilen ölçülere göre hesaplanır", () => {
    renderHome();
    fireEvent.change(screen.getByLabelText(/Tahmini ağırlık/), { target: { value: "38" } });
    fireEvent.change(screen.getByLabelText("En"), { target: { value: "3,2" } });
    const panel = screen.getByRole("complementary", { name: "İzin ön kontrolü" });
    expect(within(panel).getByText("Gerekli görünüyor")).toBeInTheDocument();
    // 38 t yük + ≈ 20 t dara varsayımı
    expect(within(panel).getByText("58")).toBeInTheDocument();
    expect(within(panel).getByText(/Dara ≈ 20 t varsayımıyla/)).toBeInTheDocument();
  });

  it("proje arşivi kategoriye göre filtrelenir", () => {
    renderHome();
    const archive = screen.getByRole("region", { name: "Proje Arşivi" });
    fireEvent.click(within(archive).getByRole("button", { name: /Gabari Dışı Ekipmanlar/ }));
    expect(within(archive).getAllByRole("button", { name: /fotoğrafı büyüt/ })).toHaveLength(4);
  });

  it("lightbox klavyeyle gezilir; kapanınca odak gösterilen fotoğrafın kartına döner", async () => {
    renderHome();
    const cards = screen.getAllByRole("button", { name: /fotoğrafı büyüt/ });
    cards[0].focus();
    fireEvent.click(cards[0]);
    const dialog = await screen.findByRole("dialog");
    expect(within(dialog).getByText(/01 \/ 15/)).toBeInTheDocument();
    fireEvent.keyDown(dialog, { key: "ArrowRight" });
    expect(within(dialog).getByText(/02 \/ 15/)).toBeInTheDocument();
    fireEvent.keyDown(dialog, { key: "Escape" });
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
    await waitFor(() => expect(document.activeElement).toBe(cards[1]));
  });

  it("WhatsApp bağlantıları hazır mesajla açılır", () => {
    renderHome();
    const links = screen.getAllByRole("link", { name: /WhatsApp/ });
    expect(links.length).toBeGreaterThan(0);
    for (const link of links) {
      expect(decodeURIComponent(link.getAttribute("href") ?? "")).toContain(WHATSAPP_GREETING);
    }
  });
});
