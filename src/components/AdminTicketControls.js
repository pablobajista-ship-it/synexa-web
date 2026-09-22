"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  TICKET_STATUS,
  TICKET_STATUS_LABELS,
  TICKET_PRIORITY,
  TICKET_PRIORITY_LABELS,
  TICKET_CATEGORIES,
} from "@/lib/db-constants";

const selectClass =
  "w-full px-3 py-2 border border-[var(--color-border)] rounded-lg text-sm focus:outline-none focus:border-[var(--color-blue)]";

export default function AdminTicketControls({ ticketNumber, status, priority, category }) {
  const router = useRouter();
  const [values, setValues] = useState({ status, priority, category });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  async function update(field, value) {
    setValues((v) => ({ ...v, [field]: value }));
    setSaving(true);
    setSaved(false);

    const res = await fetch(`/api/tickets/${ticketNumber}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ [field]: value }),
    });

    setSaving(false);
    if (res.ok) {
      setSaved(true);
      router.refresh();
    }
  }

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5">
      <h2 className="text-sm font-bold text-slate-900 mb-4">Gestión del ticket</h2>

      <div className="mb-3">
        <label className="block text-[12px] font-semibold text-slate-500 mb-1">Estado</label>
        <select
          className={selectClass}
          value={values.status}
          onChange={(e) => update("status", e.target.value)}
        >
          {Object.values(TICKET_STATUS).map((s) => (
            <option key={s} value={s}>{TICKET_STATUS_LABELS[s]}</option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label className="block text-[12px] font-semibold text-slate-500 mb-1">Prioridad</label>
        <select
          className={selectClass}
          value={values.priority}
          onChange={(e) => update("priority", e.target.value)}
        >
          {Object.values(TICKET_PRIORITY).map((p) => (
            <option key={p} value={p}>{TICKET_PRIORITY_LABELS[p]}</option>
          ))}
        </select>
      </div>

      <div className="mb-1">
        <label className="block text-[12px] font-semibold text-slate-500 mb-1">Categoría</label>
        <select
          className={selectClass}
          value={values.category}
          onChange={(e) => update("category", e.target.value)}
        >
          {TICKET_CATEGORIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      <p className="text-[11px] text-slate-400 mt-2">
        {saving ? "Guardando…" : saved ? "Guardado ✓" : "Los cambios se guardan automáticamente."}
      </p>
    </div>
  );
}
