"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  TICKET_CATEGORIES,
  TICKET_PRIORITY,
  TICKET_PRIORITY_LABELS,
  PREFERRED_CONTACT,
} from "@/lib/db-constants";

const inputClass =
  "w-full px-3 py-2.5 border border-[var(--color-border)] rounded-lg text-sm text-[var(--color-navy)] focus:outline-none focus:border-[var(--color-blue)] focus:ring-[3px] focus:ring-blue-500/15";
const labelClass = "block text-[13px] font-semibold text-[var(--color-navy)] mb-1.5";

const PRIORITY_DOT = {
  BAJA: "bg-slate-400",
  NORMAL: "bg-blue-500",
  ALTA: "bg-orange-500",
  URGENTE: "bg-red-500",
};

export default function NewTicketForm() {
  const router = useRouter();
  const [form, setForm] = useState({
    category: "",
    service: "",
    subject: "",
    description: "",
    url: "",
    priority: TICKET_PRIORITY.NORMAL,
    preferredContact: PREFERRED_CONTACT.TICKET,
    device: "",
    operatingSystem: "",
    browser: "",
    errorMessage: "",
    stepsBeforeError: "",
  });
  const [files, setFiles] = useState([]);
  const [showTechInfo, setShowTechInfo] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  function set(field) {
    return (e) => setForm((f) => ({ ...f, [field]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setErrors({});
    setLoading(true);

    const body = new FormData();
    Object.entries(form).forEach(([key, value]) => body.append(key, value));
    files.forEach((file) => body.append("attachments", file));

    const res = await fetch("/api/tickets", { method: "POST", body });
    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setErrors(data.errors || {});
      return;
    }

    setResult(data.ticketNumber);
  }

  if (result) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 text-center max-w-lg mx-auto">
        <div className="w-14 h-14 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-2xl mx-auto mb-4">
          ✓
        </div>
        <h1 className="text-xl font-bold text-slate-900 mb-2">Solicitud recibida</h1>
        <p className="text-slate-500 mb-1">Gracias. Tu solicitud ha sido registrada correctamente.</p>
        <p className="text-slate-900 font-bold text-lg my-3">Número de ticket: {result}</p>
        <p className="text-slate-500 mb-6">
          Podrás consultar su estado y responder desde tu panel de cliente.
        </p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={() => router.push(`/tickets/${result}`)}
            className="px-5 py-2.5 rounded-lg bg-[var(--color-blue)] text-white font-bold text-sm hover:bg-[var(--color-blue-dark)]"
          >
            Ver ticket
          </button>
          <button
            onClick={() => router.push("/dashboard")}
            className="px-5 py-2.5 rounded-lg border border-slate-200 text-slate-700 font-bold text-sm hover:bg-slate-50"
          >
            Volver a mis tickets
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 sm:p-8 max-w-2xl mx-auto">
      <h1 className="text-xl font-bold text-slate-900 mb-1">Crear nuevo ticket</h1>
      <p className="text-sm text-slate-500 mb-6">
        Completá el formulario y nuestro equipo revisará tu solicitud a la brevedad.
      </p>

      <div className="mb-5">
        <label htmlFor="category" className={labelClass}>¿En qué podemos ayudarte?</label>
        <select id="category" className={inputClass} value={form.category} onChange={set("category")} required>
          <option value="">Seleccioná una opción</option>
          {TICKET_CATEGORIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        {errors.category ? <p className="text-[12px] text-red-600 mt-1">{errors.category}</p> : null}
      </div>

      <div className="mb-5">
        <label htmlFor="service" className={labelClass}>Servicio o proyecto relacionado (opcional)</label>
        <input
          id="service"
          className={inputClass}
          placeholder="Ej: Página web empresa ABC, Tienda online…"
          value={form.service}
          onChange={set("service")}
        />
      </div>

      <div className="mb-5">
        <label htmlFor="subject" className={labelClass}>Asunto</label>
        <input
          id="subject"
          className={inputClass}
          placeholder="Ej: No puedo ingresar al panel de administración"
          value={form.subject}
          onChange={set("subject")}
          required
        />
        {errors.subject ? <p className="text-[12px] text-red-600 mt-1">{errors.subject}</p> : null}
      </div>

      <div className="mb-5">
        <label htmlFor="description" className={labelClass}>Cuéntanos qué necesitas</label>
        <textarea
          id="description"
          rows={5}
          className={inputClass}
          value={form.description}
          onChange={set("description")}
          required
        />
        <p className="text-[12px] text-slate-400 mt-1">
          Describe tu consulta o problema con el mayor detalle posible. Mientras más información nos
          entregues, más rápido podremos ayudarte.
        </p>
        {errors.description ? <p className="text-[12px] text-red-600 mt-1">{errors.description}</p> : null}
      </div>

      <div className="mb-5">
        <label htmlFor="url" className={labelClass}>Página o URL relacionada (opcional)</label>
        <input
          id="url"
          className={inputClass}
          placeholder="https://www.miempresa.cl"
          value={form.url}
          onChange={set("url")}
        />
        {errors.url ? <p className="text-[12px] text-red-600 mt-1">{errors.url}</p> : null}
      </div>

      <div className="mb-5">
        <span className={labelClass}>¿Qué tan urgente es esta solicitud?</span>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {Object.values(TICKET_PRIORITY).map((p) => (
            <label
              key={p}
              className={`flex items-center gap-2 px-3 py-2.5 rounded-lg border text-sm cursor-pointer ${
                form.priority === p ? "border-[var(--color-blue)] bg-blue-50" : "border-[var(--color-border)]"
              }`}
            >
              <input
                type="radio"
                name="priority"
                value={p}
                checked={form.priority === p}
                onChange={set("priority")}
                className="sr-only"
              />
              <span className={`w-2 h-2 rounded-full ${PRIORITY_DOT[p]}`} />
              {TICKET_PRIORITY_LABELS[p]}
            </label>
          ))}
        </div>
      </div>

      <div className="mb-5">
        <label htmlFor="preferredContact" className={labelClass}>
          ¿Cómo prefieres que nos comuniquemos contigo?
        </label>
        <select
          id="preferredContact"
          className={inputClass}
          value={form.preferredContact}
          onChange={set("preferredContact")}
        >
          {Object.values(PREFERRED_CONTACT).map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      <div className="mb-5">
        <button
          type="button"
          onClick={() => setShowTechInfo((v) => !v)}
          className="text-sm font-semibold text-[var(--color-blue)] hover:underline"
        >
          {showTechInfo ? "− Ocultar información adicional" : "+ Información adicional (opcional)"}
        </button>

        {showTechInfo ? (
          <div className="mt-4 grid sm:grid-cols-2 gap-4 p-4 bg-slate-50 rounded-lg border border-slate-200">
            <div>
              <label htmlFor="device" className={labelClass}>Dispositivo</label>
              <input id="device" className={inputClass} value={form.device} onChange={set("device")} />
            </div>
            <div>
              <label htmlFor="operatingSystem" className={labelClass}>Sistema operativo</label>
              <input id="operatingSystem" className={inputClass} value={form.operatingSystem} onChange={set("operatingSystem")} />
            </div>
            <div>
              <label htmlFor="browser" className={labelClass}>Navegador</label>
              <input id="browser" className={inputClass} value={form.browser} onChange={set("browser")} />
            </div>
            <div>
              <label htmlFor="errorMessage" className={labelClass}>Mensaje de error</label>
              <input id="errorMessage" className={inputClass} value={form.errorMessage} onChange={set("errorMessage")} />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="stepsBeforeError" className={labelClass}>Pasos que realizó antes del problema</label>
              <textarea
                id="stepsBeforeError"
                rows={3}
                className={inputClass}
                value={form.stepsBeforeError}
                onChange={set("stepsBeforeError")}
              />
            </div>
          </div>
        ) : null}
      </div>

      <div className="mb-6">
        <label htmlFor="attachments" className={labelClass}>Adjuntar archivo (opcional)</label>
        <input
          id="attachments"
          type="file"
          multiple
          accept=".png,.jpg,.jpeg,.pdf,.txt"
          onChange={(e) => setFiles(Array.from(e.target.files || []))}
          className="block w-full text-sm text-slate-600 file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:bg-slate-100 file:text-slate-700 file:font-semibold hover:file:bg-slate-200"
        />
        <p className="text-[12px] text-slate-400 mt-1">PNG, JPG, PDF o TXT. Máximo 8MB por archivo.</p>
        {errors.attachments ? <p className="text-[12px] text-red-600 mt-1">{errors.attachments}</p> : null}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 rounded-lg bg-[var(--color-blue)] text-white font-bold text-sm hover:bg-[var(--color-blue-dark)] disabled:opacity-60"
      >
        {loading ? "Enviando…" : "Crear ticket"}
      </button>
    </form>
  );
}
