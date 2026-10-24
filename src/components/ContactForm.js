"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { SERVICE_OPTIONS, HELP_TYPE_OPTIONS, MAINTENANCE_SERVICES, LIMITS, validateInquiry } from "@/lib/contactOptions";

const field =
  "w-full rounded-xl border border-[var(--color-border)] bg-white px-4 py-3 text-[15.5px] text-[var(--color-navy)] placeholder:text-[var(--color-gray-dark)]/50 transition-shadow focus:outline-none focus:border-[var(--color-blue)] focus:ring-4 focus:ring-[var(--color-blue)]/15 aria-[invalid=true]:border-red-400";
const label = "block text-[14px] font-semibold text-[var(--color-navy)] mb-1.5";

function Field({ id, name, text, error, optional, children }) {
  return (
    <div>
      <label htmlFor={id} className={label}>
        {text}
        {optional ? <span className="font-normal text-[var(--color-gray-dark)]/70"> (opcional)</span> : null}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-[13px] font-medium text-red-600">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export default function ContactForm({ initialService = "", source = "" }) {
  const startedAt = useRef(0);
  useEffect(() => {
    startedAt.current = Date.now();
  }, []);
  const [values, setValues] = useState({
    name: "", email: "", company: "", phone: "", service: initialService, message: "", siteUrl: "", helpType: "", consent: false,
  });
  const [website, setWebsite] = useState(""); // honeypot
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [serverError, setServerError] = useState("");

  const set = (key) => (e) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }));
  };

  async function onSubmit(e) {
    e.preventDefault();
    if (status === "sending") return; // protección contra envíos repetidos

    const { errors: clientErrors } = validateInquiry({ ...values, source });
    setErrors(clientErrors);
    setServerError("");
    if (Object.keys(clientErrors).length) {
      document.getElementById(`cf-${Object.keys(clientErrors)[0]}`)?.focus();
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("/api/contacto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, source, website, elapsedMs: Date.now() - startedAt.current }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.status === 201 || (res.ok && data.ok)) {
        setStatus("sent");
        return;
      }
      if (res.status === 422 && data.errors) setErrors(data.errors);
      setServerError(data.error || "No pudimos enviar tu consulta. Inténtalo de nuevo.");
      setStatus("error");
    } catch {
      setServerError("No pudimos conectar con el servidor. Revisa tu conexión e inténtalo de nuevo.");
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div role="status" className="rounded-3xl bg-white border border-[var(--color-teal)]/30 shadow-xl shadow-blue-900/10 p-8 sm:p-10 text-center">
        <span className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-teal)]/15 text-[var(--color-teal-dark)]">
          <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
        </span>
        <h2 className="text-2xl font-bold text-[var(--color-navy)] mb-3">Recibimos tu consulta</h2>
        <p className="text-[16px] leading-[1.65] text-[var(--color-gray-dark)] mb-6">
          Gracias por escribirnos. Revisaremos lo que nos cuentas y nos pondremos en contacto contigo
          en el correo que indicaste.
        </p>
        <Link href="/" className="text-[15px] font-semibold text-[var(--color-blue)] hover:underline">
          Volver al inicio
        </Link>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="rounded-3xl bg-white border border-[var(--color-border)]/80 shadow-xl shadow-blue-900/10 p-6 sm:p-8 space-y-5"
    >
      <div className="grid sm:grid-cols-2 gap-5">
        <Field id="cf-name" text="Nombre completo" error={errors.name}>
          <input id="cf-name" className={field} value={values.name} onChange={set("name")} autoComplete="name"
            maxLength={LIMITS.name} required aria-invalid={!!errors.name} aria-describedby={errors.name ? "cf-name-error" : undefined} />
        </Field>
        <Field id="cf-email" text="Correo electrónico" error={errors.email}>
          <input id="cf-email" type="email" className={field} value={values.email} onChange={set("email")} autoComplete="email"
            maxLength={LIMITS.email} required aria-invalid={!!errors.email} aria-describedby={errors.email ? "cf-email-error" : undefined} />
        </Field>
        <Field id="cf-company" text="Negocio o empresa" optional error={errors.company}>
          <input id="cf-company" className={field} value={values.company} onChange={set("company")} autoComplete="organization" maxLength={LIMITS.company} />
        </Field>
        <Field id="cf-phone" text="Teléfono / WhatsApp" optional error={errors.phone}>
          <input id="cf-phone" type="tel" inputMode="tel" className={field} value={values.phone} onChange={set("phone")} autoComplete="tel"
            placeholder="+56 9 1234 5678" maxLength={LIMITS.phone} aria-invalid={!!errors.phone} aria-describedby={errors.phone ? "cf-phone-error" : undefined} />
        </Field>
      </div>

      <Field id="cf-service" text="¿Qué solución necesitas?" error={errors.service}>
        <select id="cf-service" className={field} value={values.service} onChange={set("service")} required
          aria-invalid={!!errors.service} aria-describedby={errors.service ? "cf-service-error" : undefined}>
          <option value="">Selecciona una opción</option>
          {SERVICE_OPTIONS.map((o) => (
            <option key={o.id} value={o.id}>{o.label}</option>
          ))}
        </select>
      </Field>

      {MAINTENANCE_SERVICES.includes(values.service) ? (
        <div className="grid sm:grid-cols-2 gap-5 rounded-2xl border border-[var(--color-teal)]/30 bg-[var(--color-teal)]/[0.05] p-5">
          <Field id="cf-siteUrl" text="Dirección del sitio web que necesitas mantener" optional error={errors.siteUrl}>
            <input id="cf-siteUrl" type="text" inputMode="url" className={field} value={values.siteUrl} onChange={set("siteUrl")}
              placeholder="www.minegocio.cl" maxLength={LIMITS.siteUrl} autoComplete="url"
              aria-invalid={!!errors.siteUrl} aria-describedby={errors.siteUrl ? "cf-siteUrl-error" : undefined} />
          </Field>
          <Field id="cf-helpType" text="¿Qué tipo de ayuda necesitas?" optional>
            <select id="cf-helpType" className={field} value={values.helpType} onChange={set("helpType")}>
              <option value="">Selecciona una opción</option>
              {HELP_TYPE_OPTIONS.map((o) => (
                <option key={o.id} value={o.id}>{o.label}</option>
              ))}
            </select>
          </Field>
          <p className="sm:col-span-2 text-[13px] leading-[1.55] text-[var(--color-gray-dark)]">
            El mantenimiento es un servicio opcional y se cotiza según las características de tu sitio.
          </p>
        </div>
      ) : null}

      <Field id="cf-message" text="Cuéntanos tu idea" error={errors.message}>
        <textarea id="cf-message" rows={5} className={`${field} resize-y`} value={values.message} onChange={set("message")}
          maxLength={LIMITS.message} required aria-invalid={!!errors.message} aria-describedby={errors.message ? "cf-message-error" : undefined}
          placeholder="Por ejemplo: tengo una tienda y quisiera mostrar mis productos, recibir pedidos y facilitar que mis clientes me contacten." />
      </Field>

      {/* Campo trampa: invisible para personas, los bots suelen completarlo. */}
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <label>Sitio web<input tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} /></label>
      </div>

      <div>
        <label className="flex items-start gap-3 text-[14px] leading-[1.55] text-[var(--color-gray-dark)] cursor-pointer">
          <input id="cf-consent" type="checkbox" checked={values.consent} onChange={set("consent")}
            className="mt-1 h-4 w-4 flex-shrink-0 rounded border-[var(--color-border)] accent-[var(--color-blue)]"
            aria-invalid={!!errors.consent} aria-describedby={errors.consent ? "cf-consent-error" : undefined} />
          <span>
            Acepto el tratamiento de mis datos para recibir una respuesta a mi consulta, conforme a la{" "}
            <Link href="/privacidad" className="font-semibold text-[var(--color-blue)] underline underline-offset-2" target="_blank">
              Política de Privacidad
            </Link>
            .
          </span>
        </label>
        {errors.consent ? <p id="cf-consent-error" role="alert" className="mt-1.5 text-[13px] font-medium text-red-600">{errors.consent}</p> : null}
      </div>

      {serverError ? (
        <p role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-[14px] font-medium text-red-700">
          {serverError}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full rounded-xl bg-[var(--color-blue)] px-6 py-4 text-[17px] font-semibold text-white shadow-lg shadow-blue-600/25 transition hover:bg-[var(--color-blue-dark)] hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--color-teal)]/40 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
      >
        {status === "sending" ? "Enviando…" : "Enviar mi consulta"}
      </button>
    </form>
  );
}
