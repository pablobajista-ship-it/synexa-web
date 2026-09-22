"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Badge from "@/components/Badge";
import { STATUS_STYLES, PRIORITY_STYLES, formatDate } from "@/lib/ticketDisplay";
import { TICKET_STATUS_LABELS, TICKET_PRIORITY_LABELS } from "@/lib/db-constants";

const OPEN_STATUSES = ["NUEVO", "RECIBIDO", "EN_REVISION", "EN_PROCESO"];

const FILTERS = [
  { key: "todos", label: "Todos" },
  { key: "abiertos", label: "Abiertos" },
  { key: "esperando", label: "Esperando respuesta" },
  { key: "resueltos", label: "Resueltos" },
  { key: "cerrados", label: "Cerrados" },
];

function matchesFilter(ticket, filter) {
  if (filter === "todos") return true;
  if (filter === "abiertos") return OPEN_STATUSES.includes(ticket.status);
  if (filter === "esperando") return ticket.status === "ESPERANDO_CLIENTE";
  if (filter === "resueltos") return ticket.status === "RESUELTO";
  if (filter === "cerrados") return ticket.status === "CERRADO" || ticket.status === "CANCELADO";
  return true;
}

export default function TicketList({ tickets, isAdmin = false }) {
  const [filter, setFilter] = useState("todos");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    return tickets.filter((t) => {
      if (!matchesFilter(t, filter)) return false;
      if (!term) return true;
      return (
        t.ticket_number.toLowerCase().includes(term) || t.subject.toLowerCase().includes(term)
      );
    });
  }, [tickets, filter, search]);

  if (tickets.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-dashed border-slate-300 p-10 text-center">
        <p className="text-slate-600 font-semibold mb-1">Todavía no tienes solicitudes abiertas.</p>
        <p className="text-slate-400 text-sm mb-5">
          Cuando necesites ayuda, puedes crear un nuevo ticket y estaremos encantados de ayudarte.
        </p>
        <Link
          href="/tickets/nuevo"
          className="inline-block px-5 py-2.5 rounded-lg bg-[var(--color-blue)] text-white font-bold text-sm hover:bg-[var(--color-blue-dark)]"
        >
          Crear mi primera solicitud
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2 mb-4">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`px-3 py-1.5 rounded-full text-[13px] font-semibold border transition-colors ${
              filter === f.key
                ? "bg-slate-900 text-white border-slate-900"
                : "bg-white text-slate-600 border-slate-200 hover:border-slate-400"
            }`}
          >
            {f.label}
          </button>
        ))}
        <input
          type="text"
          placeholder="Buscar por número o asunto…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="ml-auto px-3 py-1.5 border border-[var(--color-border)] rounded-lg text-sm focus:outline-none focus:border-[var(--color-blue)]"
        />
      </div>

      {filtered.length === 0 ? (
        <p className="text-sm text-slate-400 py-8 text-center">No hay tickets que coincidan.</p>
      ) : (
        <div className="grid gap-3">
          {filtered.map((t) => (
            <Link
              key={t.ticket_number}
              href={`/tickets/${t.ticket_number}`}
              className="block bg-white border border-slate-200 rounded-xl p-4 hover:border-[var(--color-blue)] hover:shadow-sm transition-all"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <span className="text-xs font-mono font-semibold text-slate-400">{t.ticket_number}</span>
                <div className="flex items-center gap-2">
                  <Badge label={TICKET_PRIORITY_LABELS[t.priority]} className={PRIORITY_STYLES[t.priority]} />
                  <Badge label={TICKET_STATUS_LABELS[t.status]} className={STATUS_STYLES[t.status]} />
                </div>
              </div>
              <h3 className="font-semibold text-slate-900 mb-1">{t.subject}</h3>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[12px] text-slate-400">
                <span>{t.category}</span>
                {isAdmin ? (
                  <span>
                    {t.client_name} {t.client_last_name} · {t.client_email}
                  </span>
                ) : null}
                <span>Creado: {formatDate(t.created_at)}</span>
                <span>Actualizado: {formatDate(t.updated_at)}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
