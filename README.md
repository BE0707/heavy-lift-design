# Bumerang Ağır Nakliyat — web sitesi

Diyarbakır merkezli lowbed ve gabari dışı ağır taşımacılık firmasının sitesi:
<https://www.bumerangagirnakliyat.website>

React 18 + TypeScript + Vite + Tailwind CSS. Statik olarak GitHub Pages'e yayınlanır.

## Komutlar

| Komut | Açıklama |
| --- | --- |
| `npm run dev` | Geliştirme sunucusu (<http://localhost:8080>) |
| `npm run build` | Üretim derlemesi → `dist/` (`bilgi.html` ve `404.html` dahil) |
| `npm run preview` | Derlenmiş siteyi yerelde sunar |
| `npm test` | Birim ve sayfa testleri (Vitest + Testing Library) |
| `npm run lint` | ESLint |
| `npm run photos` | Proje fotoğraflarının WebP/JPEG türevlerini yeniden üretir |
| `npm run icons` | Favicon, uygulama ikonları ve `og-image.jpg` paylaşım görselini yeniden üretir |

`photos` ve `icons` betikleri ImageMagick 7 (`magick`) ister; çıktılar depoya işlenir,
derleme sırasında gerekmez.

## İçerik nerede?

Metin ve teknik veriler bileşenlerin içinde değil, `src/data/` altındadır:

| Dosya | İçerik |
| --- | --- |
| `company.ts` | Firma adı, sevk hatları (telefon/WhatsApp), hazır WhatsApp mesajı |
| `fleet.ts` | Filodaki tek dorse (3 dingilli, hidrolik rampalı lowbed) ve arşivden taşınan yük örnekleri |
| `projects.ts` | Proje arşivi fotoğrafları, kategori ve açıklamalar |
| `coverage.ts` | Operasyon bölgesi illeri (plaka, koordinat) |
| `seo.ts` | Sayfa başlıkları, açıklamalar, site adresi |

> **Yalnızca kesin bilgi:** Filoda tek dorse tipi var (3 dingilli, hidrolik rampalı lowbed).
> Faydalı yük, platform yüksekliği ve boyu ruhsat / tip onay belgesiyle doğrulanmadan
> yazılmaz. İzin ön kontrolündeki platform yüksekliği (≈ 1 m) ve dara (≈ 20 t)
> `src/lib/load-check.ts` içinde `ASSUMPTIONS` olarak durur ve sitede varsayım diye
> etiketlenir. Proje açıklamaları fotoğrafta okunabilen bilgilerden yazılmıştır; bilinen
> güzergahlar `route` alanına eklenebilir.

Yasal gabari sınırları ve izin ön kontrolü kuralları `src/lib/load-check.ts` içindedir.

## Tasarım sistemi

Basılı teknik katalog: beyaz zemin, siyah metin, yeşil vurgu (RAL 6032 sinyal yeşiline
yakın `#237F52`). Renkler `src/index.css` içinde CSS değişkeni olarak tanımlıdır
(`--surface`, `--fg`, `--signal` …) ve Tailwind'e `surface`, `fg`, `rule`, `signal`
adlarıyla bağlanır (`tailwind.config.ts`). Üst menü, alt bilgi, mobil menüler ve fotoğraf
görüntüleyici `.theme-dark` sınıfıyla aynı adları koyu değerlerle kullanır. Teknik
çizimlerin (SVG) paleti `src/lib/drawing.ts` içindedir. Yazı tipleri: IBM Plex Sans ve
Mono; Barlow Condensed yalnızca logo yazısında. Marka ikonları ve paylaşım görseli
`npm run icons` ile üretilir.

## Fotoğraflar

Orijinaller `assets-src/photos/` altında (tanımlayıcı dosya adlarıyla) durur.
`scripts/build-photos.mjs` ekran görüntüsü kenar bantlarını kırpar, yan çekilmiş kareyi
döndürür, meta veriyi siler ve `src/assets/photos/` altına 480/960/1600 px WebP + tek
JPEG yedeği üretir. Yeni fotoğraf eklemek için: dosyayı `assets-src/photos/<slug>.jpg`
olarak koyun, betikteki `PHOTOS` listesine ekleyin, `npm run photos` çalıştırın ve
`src/data/projects.ts` içine kaydını yazın.

## Yayın

`main` dalına push edildiğinde `.github/workflows/deploy.yml` siteyi GitHub Pages'e
yayınlar. Özel alan adı `www.bumerangagirnakliyat.website` (apex adres www'ye yönlenir).

GitHub Pages SPA rotalarını bilmediği için `vite.config.ts` içindeki `static-routes`
eklentisi derlemede `bilgi.html` (rotaya özel başlık/açıklama/canonical ile) ve
`404.html` üretir; böylece `/bilgi` doğrudan açıldığında 200 döner.
