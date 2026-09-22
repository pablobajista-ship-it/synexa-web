"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { formatDate } from "@/lib/ticketDisplay";

function AttachmentChip({ attachment }) {
  return (
    <a
      href={`/api/attachments/${attachment.id}`}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 text-[12px] font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200"
    >
      📎 {attachment.original_name}
    </a>
  );
}

function MessageBubble({ message, attachments, isAdmin }) {
  const isSupport = message.user_role === "ADMIN";
  const isInternal = !!message.is_internal;

  return (
    <div className={`flex ${isSupport ? "justify-start" : "justify-end"}`}>
      <div
        className={`max-w-[85%] rounded-xl p-4 border ${
          isInternal
            ? "bg-yellow-50 border-yellow-300"
            : isSupport
            ? "bg-white border-slate-200"
            : "bg-[var(--color-blue)]/10 border-blue-200"
        }`}
      >
        <div className="flex items-center gap-2 mb-1.5 flex-wrap">
          <span className="text-[13px] font-bold text-slate-900">
            {message.user_name} {message.user_last_name}
          </span>
          <span className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
            {isSupport ? "Soporte" : "Cliente"}
          </span>
          {isInternal ? (
            <span className="text-[11px] font-bold uppercase tracking-wide text-yellow-700 bg-yellow-200 px-1.5 py-0.5 rounded">
              Nota interna
            </span>
          ) : null}
          <span className="text-[11px] text-slate-400 ml-auto">{formatDate(message.created_at)}</span>
        </div>
        <p className="text-sm text-slate-700 whitespace-pre-wrap">{message.message}</p>
        {attachments?.length ? (
          <div className="flex flex-wrap gap-2 mt-3">
            {attachments.map((a) => (
              <AttachmentChip key={a.id} attachment={a} />
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default function Conversation({ ticketNumber, messages, attachmentsByMessage, isAdmin }) {
  const router = useRouter();
  const [text, setText] = useState("");
  const [isInternal, setIsInternal] = useState(false);
  const [files, setFiles] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!text.trim()) return;
    setError("");
    setLoading(true);

    const body = new FormData();
    body.append("message", text);
    body.append("isInternal", String(isInternal));
    files.forEach((f) => body.append("attachments", f));

    const res = await fetch(`/api/tickets/${ticketNumber}/messages`, { method: "POST", body });
    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error || "No se pudo enviar la respuesta.");
      return;
    }

    setText("");
    setFiles([]);
    setIsInternal(false);
    router.refresh();
  }

  return (
    <div>
      <div className="space-y-3 mb-6">
        {messages.length === 0 ? (
          <p className="text-sm text-slate-400 text-center py-6">Todavía no hay mensajes.</p>
        ) : (
          messages.map((m) => (
            <MessageBubble
              key={m.id}
              message={m}
              attachments={attachmentsByMessage[m.id]}
              isAdmin={isAdmin}
            />
          ))
        )}
      </div>

      <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-xl p-4">
        {error ? (
          <div className="rounded-lg bg-red-50 border border-red-200 text-red-600 text-[13px] px-3.5 py-3 mb-3">
            {error}
          </div>
        ) : null}

        <label htmlFor="reply" className="block text-[13px] font-semibold text-slate-900 mb-1.5">
          Escribir respuesta
        </label>
        <textarea
          id="reply"
          rows={3}
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full px-3 py-2.5 border border-[var(--color-border)] rounded-lg text-sm focus:outline-none focus:border-[var(--color-blue)] focus:ring-[3px] focus:ring-blue-500/15 mb-3"
        />

        <div className="flex flex-wrap items-center gap-3 mb-3">
          <input
            type="file"
            multiple
            accept=".png,.jpg,.jpeg,.pdf,.txt"
            onChange={(e) => setFiles(Array.from(e.target.files || []))}
            className="text-[12px] text-slate-600 file:mr-2 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:bg-slate-100 file:text-slate-700 file:font-semibold hover:file:bg-slate-200"
          />
          {isAdmin ? (
            <label className="flex items-center gap-1.5 text-[13px] text-slate-600 ml-auto">
              <input
                type="checkbox"
                checked={isInternal}
                onChange={(e) => setIsInternal(e.target.checked)}
                className="rounded"
              />
              Nota interna (solo visible para administradores)
            </label>
          ) : null}
        </div>

        <button
          type="submit"
          disabled={loading || !text.trim()}
          className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-[var(--color-blue)] text-white font-bold text-sm hover:bg-[var(--color-blue-dark)] disabled:opacity-60"
        >
          {loading ? "Enviando…" : "Enviar respuesta"}
        </button>
      </form>
    </div>
  );
}
