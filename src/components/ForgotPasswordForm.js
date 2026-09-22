"use client";

import { useState } from "react";
import Link from "next/link";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [devResetLink, setDevResetLink] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await fetch("/api/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();

    setLoading(false);

    if (!res.ok) {
      setError(data.error || "No se pudo procesar la solicitud.");
      return;
    }

    setSent(true);
    setDevResetLink(data.devResetLink ?? null);
  }

  return (
    <>
      <Link href="/login" className="inline-flex items-center gap-1.5 text-[13px] text-[var(--color-gray-dark)] hover:text-[var(--color-navy)] mb-4">
        &larr; Volver a iniciar sesión
      </Link>

      {error ? (
        <div className="rounded-lg bg-red-50 border border-red-200 text-red-600 text-[13px] px-3.5 py-3 mb-4">
          {error}
        </div>
      ) : null}

      {sent ? (
        <>
          <div className="rounded-lg bg-green-50 border border-green-200 text-green-600 text-[13px] px-3.5 py-3 mb-4">
            Si el email existe en nuestro sistema, vas a recibir un enlace para restablecer tu contraseña.
          </div>
          {devResetLink ? (
            <div className="text-[12px] text-[var(--color-gray-dark)] bg-[var(--color-surface-muted)] border border-dashed border-[var(--color-border)] rounded-lg px-3 py-2.5 break-all">
              Modo local (sin SMTP configurado): usá este enlace para probar el flujo:
              <br />
              <a className="font-semibold text-[var(--color-blue)] hover:underline" href={devResetLink}>
                {devResetLink}
              </a>
            </div>
          ) : null}
        </>
      ) : (
        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-5">
            <label htmlFor="email" className="block text-[13px] font-semibold text-[var(--color-navy)] mb-1.5">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              className="w-full px-3 py-2.5 border border-[var(--color-border)] rounded-lg text-sm text-[var(--color-navy)] focus:outline-none focus:border-[var(--color-blue)] focus:ring-[3px] focus:ring-blue-500/15"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg bg-[var(--color-blue)] text-white font-bold text-sm hover:bg-[var(--color-blue-dark)] active:translate-y-px transition-colors disabled:opacity-60"
          >
            {loading ? "Enviando…" : "Enviar enlace de recuperación"}
          </button>
        </form>
      )}
    </>
  );
}
