"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

/** Retención: elimina las consultas cerradas con más de 24 meses (plazo de la Política de Privacidad). */
export default function PurgeInquiries({ months = 24 }) {
  const router = useRouter();
  const [msg, setMsg] = useState("");

  async function purge() {
    if (!window.confirm(`¿Eliminar definitivamente las consultas CERRADAS con más de ${months} meses?`)) return;
    const res = await fetch(`/api/admin/consultas?meses=${months}`, { method: "DELETE" });
    const data = await res.json().catch(() => ({}));
    setMsg(res.ok ? `Se eliminaron ${data.deleted} consultas.` : data.error || "No se pudo completar la acción.");
    if (res.ok) router.refresh();
  }

  return (
    <div className="mt-10 border-t border-slate-200 pt-6 text-sm text-slate-500">
      <p className="mb-2">
        Política de retención: las consultas cerradas se conservan hasta {months} meses.
      </p>
      <button type="button" onClick={purge} className="rounded-lg border border-slate-300 bg-white px-4 py-2 font-semibold text-slate-700 hover:bg-slate-50">
        Eliminar consultas cerradas antiguas
      </button>
      {msg ? <p role="status" className="mt-2">{msg}</p> : null}
    </div>
  );
}
