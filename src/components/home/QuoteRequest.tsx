import { useEffect, useMemo, useRef, useState, type ChangeEvent, type FormEvent, type ReactNode } from "react";
import { useSearchParams } from "react-router-dom";
import { Phone } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import LoadCheckPanel from "@/components/home/LoadCheckPanel";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import { DISPATCHERS, PRIMARY_DISPATCHER, telHref, whatsappHref } from "@/data/company";
import { FLEET } from "@/data/fleet";
import { assessLoad } from "@/lib/load-check";
import { LOAD_TYPES, buildQuoteMessage, parseDecimal, validateQuote, type QuoteErrors, type QuoteForm } from "@/lib/quote";
import { cn } from "@/lib/utils";

const trailerOption = (id: string | null) => {
  const item = FLEET.find((f) => f.id === id);
  return item ? `${item.tab} (${item.tabMeta})` : "";
};

const EMPTY: QuoteForm = {
  loadType: "",
  model: "",
  weight: "",
  length: "",
  width: "",
  height: "",
  origin: "",
  destination: "",
  date: "",
  trailer: "",
  contact: "",
  note: "",
  dispatcherId: PRIMARY_DISPATCHER.id,
};

const Field = ({ id, label, required = false, error, className, children }: {
  id: string; label: string; required?: boolean; error?: string; className?: string; children: ReactNode;
}) => (
  <div className={className}>
    <label htmlFor={id} className="mb-2 flex items-baseline justify-between gap-3">
      <span className="font-display text-[1.0625rem] font-semibold uppercase tracking-[0.03em] text-bone">{label}</span>
      <span className={cn("label", required && "text-signal")}>{required ? "Zorunlu" : "İsteğe bağlı"}</span>
    </label>
    {children}
    {error && (
      <p id={`${id}-error`} className="mt-1.5 text-sm text-hazard-text">
        {error}
      </p>
    )}
  </div>
);

const QuoteRequest = () => {
  const [params] = useSearchParams();
  const preset = params.get("dorse");
  const [form, setForm] = useState<QuoteForm>(() => ({ ...EMPTY, trailer: trailerOption(preset) }));
  const [errors, setErrors] = useState<QuoteErrors>({});
  const [sentUrl, setSentUrl] = useState<string | null>(null);
  const detailsRef = useRef<HTMLDetailsElement>(null);

  // Filo bölümündeki "Bu dorse için fiyat iste" bağlantısı ?dorse=<id> ile gelir
  useEffect(() => {
    const option = trailerOption(preset);
    if (!option) return;
    setForm((f) => ({ ...f, trailer: option }));
    if (detailsRef.current) detailsRef.current.open = true;
  }, [preset]);

  const assessment = useMemo(
    () =>
      assessLoad({
        weight: parseDecimal(form.weight),
        length: parseDecimal(form.length),
        width: parseDecimal(form.width),
        height: parseDecimal(form.height),
      }),
    [form.weight, form.length, form.width, form.height],
  );

  const update = (key: keyof QuoteForm) => (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { value } = e.target;
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((errs) => {
      if (!errs[key]) return errs;
      const next = { ...errs };
      delete next[key];
      return next;
    });
  };

  const a11y = (key: keyof QuoteForm, required = false) => ({
    id: `q-${key}`,
    name: key,
    "aria-required": required || undefined,
    "aria-invalid": errors[key] ? true : undefined,
    "aria-describedby": errors[key] ? `q-${key}-error` : undefined,
  });

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const found = validateQuote(form);
    setErrors(found);
    const first = Object.keys(found)[0];
    if (first) {
      document.getElementById(`q-${first}`)?.focus();
      return;
    }
    const dispatcher = DISPATCHERS.find((d) => d.id === form.dispatcherId) ?? PRIMARY_DISPATCHER;
    const url = whatsappHref(dispatcher.phone, buildQuoteMessage(form));
    const win = window.open(url, "_blank");
    if (win) win.opener = null;
    else window.location.assign(url);
    setSentUrl(url);
  };

  const errorCount = Object.keys(errors).length;

  return (
    <section id="fiyat-talebi" aria-labelledby="fiyat-title" className="border-b border-rule py-20 lg:py-28">
      <div className="container">
        <SectionHeader
          index="03"
          kicker="Hızlı yük bildirimi"
          titleId="fiyat-title"
          title="Hızlı Yük Bildirimi & Fiyat Talebi"
          lead="Yük tipini, tahmini ağırlığı ve çıkış–varış noktasını girin. Bilgiler WhatsApp üzerinden doğrudan operasyon masasına iletilir; form verisi sunucuya kaydedilmez."
          layout="split"
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:gap-10">
          <form noValidate onSubmit={onSubmit} className="border border-rule-strong bg-asphalt/80 lg:col-span-7 shadow-xl" aria-labelledby="fiyat-title">
            <div aria-live="assertive">
              {errorCount > 0 && (
                <p className="border-b border-hazard bg-hazard/10 px-5 py-3.5 text-sm text-bone sm:px-7 font-sans">
                  Formda {errorCount} alan eksik veya hatalı. İşaretli alanları kontrol edin.
                </p>
              )}
            </div>

            <fieldset className="grid gap-5 border-b border-rule px-5 py-6 sm:grid-cols-2 sm:px-7">
              <legend className="label float-left mb-1 w-full text-signal sm:col-span-2">01 · Yük Bilgileri</legend>
              <Field id="q-loadType" label="Yük tipi" required error={errors.loadType}>
                <select className="field" value={form.loadType} onChange={update("loadType")} {...a11y("loadType", true)}>
                  <option value="">Seçin…</option>
                  {LOAD_TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </Field>
              <Field id="q-weight" label="Tahmini ağırlık (ton)" required error={errors.weight}>
                <input
                  className="field tabular font-mono"
                  type="text"
                  inputMode="decimal"
                  autoComplete="off"
                  placeholder="Örn. 38 veya 12,5"
                  value={form.weight}
                  onChange={update("weight")}
                  {...a11y("weight", true)}
                />
              </Field>
              <div className="sm:col-span-2">
                <p className="mb-2 flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                  <span className="font-condensed text-[1.125rem] font-bold uppercase tracking-wider text-bone">Ölçüler (metre)</span>
                  <span className="font-mono text-2xs uppercase tracking-label text-dim">Ön kontrol için önerilir</span>
                </p>
                <div className="grid grid-cols-3 gap-3">
                  {(
                    [
                      ["length", "Boy"],
                      ["width", "En"],
                      ["height", "Yükseklik"],
                    ] as const
                  ).map(([key, label]) => (
                    <div key={key}>
                      <label htmlFor={`q-${key}`} className="label mb-1.5 block text-dim">
                        {label}
                      </label>
                      <input
                        className="field tabular font-mono text-sm"
                        type="text"
                        inputMode="decimal"
                        autoComplete="off"
                        placeholder="0,00"
                        value={form[key]}
                        onChange={update(key)}
                        {...a11y(key)}
                      />
                      {errors[key] && (
                        <p id={`q-${key}-error`} className="mt-1.5 text-xs text-hazard-text">
                          {errors[key]}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </fieldset>

            <fieldset className="grid gap-5 border-b border-rule px-5 py-6 sm:grid-cols-2 sm:px-7">
              <legend className="label float-left mb-1 w-full text-signal sm:col-span-2">02 · Güzergah &amp; Zamanlama</legend>
              <Field id="q-origin" label="Çıkış noktası" required error={errors.origin}>
                <input className="field" type="text" autoComplete="off" placeholder="İl / ilçe veya şantiye" value={form.origin} onChange={update("origin")} {...a11y("origin", true)} />
              </Field>
              <Field id="q-destination" label="Varış noktası" required error={errors.destination}>
                <input className="field" type="text" autoComplete="off" placeholder="İl / ilçe veya şantiye" value={form.destination} onChange={update("destination")} {...a11y("destination", true)} />
              </Field>
              <Field id="q-date" label="Planlanan yükleme">
                <input className="field tabular font-mono text-sm" type="date" value={form.date} onChange={update("date")} {...a11y("date")} />
              </Field>
              <Field id="q-trailer" label="Dorse / hizmet tercihi">
                <select className="field" value={form.trailer} onChange={update("trailer")} {...a11y("trailer")}>
                  <option value="">Operasyon masası önersin</option>
                  {FLEET.map((f) => (
                    <option key={f.id} value={trailerOption(f.id)}>
                      {trailerOption(f.id)}
                    </option>
                  ))}
                </select>
              </Field>
            </fieldset>

            <details ref={detailsRef} className="group border-b border-rule">
              <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between px-5 font-condensed text-[1.125rem] font-bold uppercase tracking-wider text-bone hover:bg-graphite sm:px-7 [&::-webkit-details-marker]:hidden transition-colors">
                03 · Ek bilgiler
                <span aria-hidden="true" className="font-mono text-base text-steel transition-transform group-open:rotate-45">+</span>
              </summary>
              <div className="grid gap-5 px-5 pb-6 pt-2 sm:grid-cols-2 sm:px-7">
                <Field id="q-model" label="Marka / model">
                  <input className="field" type="text" autoComplete="off" placeholder="Örn. CAT 336, Hidromek HMK 220" value={form.model} onChange={update("model")} {...a11y("model")} />
                </Field>
                <Field id="q-contact" label="Ad / firma / telefon">
                  <input className="field" type="text" autoComplete="off" placeholder="Geri dönüş için" value={form.contact} onChange={update("contact")} {...a11y("contact")} />
                </Field>
                <Field id="q-note" label="Not" className="sm:col-span-2">
                  <textarea
                    className="field min-h-24 resize-y"
                    rows={3}
                    placeholder="Şantiye girişi, rampa/vinç durumu, sökülecek parça vb."
                    value={form.note}
                    onChange={update("note")}
                    {...a11y("note")}
                  />
                </Field>
              </div>
            </details>

            <div className="grid gap-6 px-5 py-6 sm:px-7">
              <fieldset>
                <legend className="mb-3 font-condensed text-[1.125rem] font-bold uppercase tracking-wider text-bone">
                  Mesaj gidecek hat
                </legend>
                <div className="grid gap-3 sm:grid-cols-2">
                  {DISPATCHERS.map((d) => (
                    <label
                      key={d.id}
                      className="flex min-h-14 cursor-pointer items-center gap-3 border border-rule bg-ink px-4 py-3 transition-all hover:border-steel has-[:checked]:border-signal has-[:checked]:bg-asphalt has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-signal"
                    >
                      <input
                        type="radio"
                        name="dispatcherId"
                        value={d.id}
                        checked={form.dispatcherId === d.id}
                        onChange={update("dispatcherId")}
                        className="h-4 w-4 accent-[#FDB813] focus-visible:outline-none"
                      />
                      <span className="flex flex-col">
                        <span className="text-bone font-medium">{d.name}</span>
                        <span className="tabular font-mono text-xs text-steel">
                          {d.line} · {d.display}
                        </span>
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <button type="submit" className="btn btn-primary">
                  <WhatsAppIcon />
                  WhatsApp ile gönder
                </button>
                <a href={telHref(PRIMARY_DISPATCHER.phone)} className="btn btn-outline">
                  <Phone />
                  Telefonla bildir
                </a>
              </div>

              <div role="status">
                {sentUrl && (
                  <p className="border-l-2 border-signal pl-3 font-sans text-sm text-steel">
                    WhatsApp açıldı; mesajı göndermeyi unutmayın. Açılmadıysa{" "}
                    <a href={sentUrl} target="_blank" rel="noopener noreferrer" className="text-bone underline underline-offset-4">
                      buraya dokunun
                    </a>
                    .
                  </p>
                )}
              </div>
            </div>
          </form>

          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-24">
              <LoadCheckPanel assessment={assessment} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuoteRequest;
