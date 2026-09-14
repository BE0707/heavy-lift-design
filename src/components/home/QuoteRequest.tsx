import { useMemo, useState, type ChangeEvent, type FormEvent, type ReactNode } from "react";
import SectionHeader from "@/components/SectionHeader";
import LoadCheckPanel from "@/components/home/LoadCheckPanel";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import { DISPATCHERS, PRIMARY_DISPATCHER, telHref, whatsappHref } from "@/data/company";
import { assessLoad } from "@/lib/load-check";
import { LOADING_OPTIONS, LOAD_TYPES, buildQuoteMessage, parseDecimal, validateQuote, type QuoteErrors, type QuoteForm } from "@/lib/quote";
import { useReveal } from "@/hooks/use-reveal";

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
  loading: "",
  contact: "",
  note: "",
  dispatcherId: PRIMARY_DISPATCHER.id,
};

const Field = ({ id, label, required = false, error, className, children }: {
  id: string; label: string; required?: boolean; error?: string; className?: string; children: ReactNode;
}) => (
  <div className={className}>
    <label htmlFor={id} className="mb-2 flex items-baseline justify-between gap-3">
      <span className="text-[0.9375rem] font-medium text-bone">{label}</span>
      <span className="font-mono text-2xs text-dim">{required ? "Zorunlu" : "İsteğe bağlı"}</span>
    </label>
    {children}
    {error && (
      <p id={`${id}-error`} className="mt-1.5 text-sm text-hazard-text">
        {error}
      </p>
    )}
  </div>
);

/** Form bölümü: kutu yerine ince çizgi ve sade başlıkla ayrılan belge alanı */
const Group = ({ title, children }: { title: string; children: ReactNode }) => (
  <fieldset className="grid gap-x-5 gap-y-6 border-t border-rule py-8 sm:grid-cols-2">
    <legend className="float-left mb-1 w-full text-sm text-steel sm:col-span-2">{title}</legend>
    {children}
  </fieldset>
);

const QuoteRequest = () => {
  const [form, setForm] = useState<QuoteForm>(EMPTY);
  const [errors, setErrors] = useState<QuoteErrors>({});
  const [sentUrl, setSentUrl] = useState<string | null>(null);
  const revealRef = useReveal<HTMLDivElement>();

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
    <section id="fiyat-talebi" aria-labelledby="fiyat-title" className="border-t border-rule py-24 lg:py-32">
      <div ref={revealRef} className="container">
        <SectionHeader
          index="03"
          kicker="Yük bildirimi"
          titleId="fiyat-title"
          title="Hızlı Yük Bildirimi & Fiyat Talebi"
          lead="Yük tipini, tahmini ağırlığı ve çıkış–varış noktasını girin. Bilgiler WhatsApp üzerinden doğrudan operasyon masasına iletilir; form verisi sunucuya kaydedilmez."
          layout="split"
        />

        <div className="mt-16 grid gap-14 lg:grid-cols-12 lg:gap-12">
          <form noValidate onSubmit={onSubmit} className="lg:col-span-7" aria-labelledby="fiyat-title">
            <div aria-live="assertive">
              {errorCount > 0 && (
                <p className="mb-6 border-l-2 border-hazard pl-4 text-sm text-bone">
                  Formda {errorCount} alan eksik veya hatalı. İşaretli alanları kontrol edin.
                </p>
              )}
            </div>

            <Group title="Yük bilgileri">
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
                  <span className="text-[0.9375rem] font-medium text-bone">Ölçüler (metre)</span>
                  <span className="font-mono text-2xs text-dim">Ön kontrol için önerilir</span>
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
                      <label htmlFor={`q-${key}`} className="mb-1.5 block text-sm text-steel">
                        {label}
                      </label>
                      <input
                        className="field tabular font-mono"
                        type="text"
                        inputMode="decimal"
                        autoComplete="off"
                        placeholder="0,00"
                        value={form[key]}
                        onChange={update(key)}
                        {...a11y(key)}
                      />
                      {errors[key] && (
                        <p id={`q-${key}-error`} className="mt-1.5 text-sm text-hazard-text">
                          {errors[key]}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </Group>

            <Group title="Güzergah ve zamanlama">
              <Field id="q-origin" label="Çıkış noktası" required error={errors.origin}>
                <input className="field" type="text" autoComplete="off" placeholder="İl / ilçe veya şantiye" value={form.origin} onChange={update("origin")} {...a11y("origin", true)} />
              </Field>
              <Field id="q-destination" label="Varış noktası" required error={errors.destination}>
                <input className="field" type="text" autoComplete="off" placeholder="İl / ilçe veya şantiye" value={form.destination} onChange={update("destination")} {...a11y("destination", true)} />
              </Field>
              <Field id="q-date" label="Planlanan yükleme">
                <input className="field tabular font-mono" type="date" value={form.date} onChange={update("date")} {...a11y("date")} />
              </Field>
              <Field id="q-loading" label="Yükleme şekli">
                <select className="field" value={form.loading} onChange={update("loading")} {...a11y("loading")}>
                  <option value="">Seçin…</option>
                  {LOADING_OPTIONS.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              </Field>
            </Group>

            <details className="group border-t border-rule">
              <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between text-sm text-steel transition-colors hover:text-bone [&::-webkit-details-marker]:hidden">
                Ek bilgiler: marka/model, iletişim, not
                <span aria-hidden="true" className="font-mono text-base text-dim transition-transform duration-300 group-open:rotate-45">
                  +
                </span>
              </summary>
              <div className="grid gap-x-5 gap-y-6 pb-8 pt-2 sm:grid-cols-2">
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

            <fieldset className="border-t border-rule pt-8">
              <legend className="float-left mb-4 w-full text-sm text-steel">Mesaj gidecek hat</legend>
              <div className="clear-both grid border-t border-rule sm:grid-cols-2">
                {DISPATCHERS.map((d, i) => (
                  <label
                    key={d.id}
                    className={`flex min-h-16 cursor-pointer items-center gap-3.5 border-b border-rule py-3 pr-4 transition-colors has-[:checked]:text-bone has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-signal ${i === 1 ? "sm:border-l sm:pl-5" : ""}`}
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
                      <span className="text-bone">{d.name}</span>
                      <span className="tabular font-mono text-xs text-dim">
                        {d.line} · {d.display}
                      </span>
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
              <button type="submit" className="btn btn-primary">
                <WhatsAppIcon />
                WhatsApp ile gönder
              </button>
              <a href={telHref(PRIMARY_DISPATCHER.phone)} className="inline-flex items-baseline gap-3">
                <span className="text-sm text-dim">veya telefonla bildirin</span>
                <span className="tabular font-mono text-bone link-u">{PRIMARY_DISPATCHER.display}</span>
              </a>
            </div>

            <div role="status" className="mt-5">
              {sentUrl && (
                <p className="border-l-2 border-signal pl-4 text-sm text-steel">
                  WhatsApp açıldı; mesajı göndermeyi unutmayın. Açılmadıysa{" "}
                  <a href={sentUrl} target="_blank" rel="noopener noreferrer" className="text-bone underline underline-offset-4">
                    buraya dokunun
                  </a>
                  .
                </p>
              )}
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
