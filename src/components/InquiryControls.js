"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { INQUIRY_STATUS } from "@/lib/contactOptions";

/** Cambio de estado (con nota opcional) y eliminación de una consulta. */
export default function InquiryControls({ id, status }) {
  const router = useRouter();
  const [value, setValue] = useState(status);
  const [note, setNote] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function call(method, body) {
    setBusy(true);
    setError("");
    try {
      const res = await fetch(`/api/admin/consultas/${id}`, {
        method,
        headers: { "Content-Type": "application/json" },
        body: body ? JSON.stringify(body) : undefined,
      });
      if (!res.ok) throw new Error((await res.json().catch(() => ({}))).error || "No se pudo completar la acción.");
      return true;
    } catch (e) {
      setError(e.message);
      return false;
    } finally {
      setBusy(false);
    }
  }

  async function save() {
    if (await call("PATCH", { status: value, note })) {
      setNote("");
      router.refresh();
    }
  }

  async function remove() {
    if (!window.confirm("¿Eliminar esta consulta definitivamente? No se puede deshacer.")) return;
    if (await call("DELETE")) router.push("/admin/consultas");
  }

  const input = "w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:border-[var(--color-blue)]";
  return (
    <div className="space-y-3">
      <label className="block text-[13px] font-semibold text-slate-700" htmlFor="iq-status">Estado</label>
      <select id="iq-status" className={input} value={value} onChange={(e) => setValue(e.target.value)}>
        {Object.entries(INQUIRY_STATUS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
      </select>
      <label className="block text-[13px] font-semibold text-slate-700" htmlFor="iq-note">Nota (opcional)</label>
      <textarea id="iq-note" rows={3} maxLength={500} className={input} value={note} onChange={(e) => setNote(e.target.value)} placeholder="Ej.: Llamé y quedamos de reunirnos el jueves." />
      {error ? <p role="alert" className="text-sm text-red-600">{error}</p> : null}
      <div className="flex flex-wrap gap-3">
        <button type="button" onClick={save} disabled={busy} className="rounded-lg bg-[var(--color-blue)] px-4 py-2 text-sm font-bold text-white hover:bg-[var(--color-blue-dark)] disabled:opacity-60">
          Guardar cambio
        </button>
        <button type="button" onClick={remove} disabled={busy} className="rounded-lg border border-red-200 px-4 py-2 text-sm font-bold text-red-600 hover:bg-red-50 disabled:opacity-60">
          Eliminar consulta
        </button>
      </div>
    </div>
  );
}
