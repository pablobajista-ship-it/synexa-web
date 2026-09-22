"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (password !== confirm) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    setLoading(true);
    const res = await fetch("/api/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password }),
    });
    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error || "No se pudo restablecer la contraseña.");
      return;
    }

    setSuccess(true);
  }

  if (!token) {
    return (
      <>
        <div className="rounded-lg bg-red-50 border border-red-200 text-red-600 text-[13px] px-3.5 py-3 mb-4">
          El enlace de recuperación es inválido o expiró. Pedí uno nuevo.
        </div>
        <Link
          href="/forgot-password"
          className="block text-center w-full py-3 rounded-lg bg-[var(--color-blue)] text-white font-bold text-sm hover:bg-[var(--color-blue-dark)]"
        >
          Pedir un nuevo enlace
        </Link>
      </>
    );
  }

  if (success) {
    return (
      <>
        <div className="rounded-lg bg-green-50 border border-green-200 text-green-600 text-[13px] px-3.5 py-3 mb-4">
          Tu contraseña se actualizó correctamente.
        </div>
        <Link
          href="/login"
          className="block text-center w-full py-3 rounded-lg bg-[var(--color-blue)] text-white font-bold text-sm hover:bg-[var(--color-blue-dark)]"
        >
          Ir a iniciar sesión
        </Link>
      </>
    );
  }

  return (
    <>
      {error ? (
        <div className="rounded-lg bg-red-50 border border-red-200 text-red-600 text-[13px] px-3.5 py-3 mb-4">
          {error}
        </div>
      ) : null}

      <form onSubmit={handleSubmit} noValidate>
        <div className="mb-4">
          <label htmlFor="password" className="block text-[13px] font-semibold text-[var(--color-navy)] mb-1.5">
            Nueva contraseña
          </label>
          <input
            id="password"
            type="password"
            required
            autoFocus
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full px-3 py-2.5 border border-[var(--color-border)] rounded-lg text-sm text-[var(--color-navy)] focus:outline-none focus:border-[var(--color-blue)] focus:ring-[3px] focus:ring-blue-500/15"
          />
        </div>

        <div className="mb-5">
          <label htmlFor="confirm" className="block text-[13px] font-semibold text-[var(--color-navy)] mb-1.5">
            Confirmar contraseña
          </label>
          <input
            id="confirm"
            type="password"
            required
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            placeholder="••••••••"
            className="w-full px-3 py-2.5 border border-[var(--color-border)] rounded-lg text-sm text-[var(--color-navy)] focus:outline-none focus:border-[var(--color-blue)] focus:ring-[3px] focus:ring-blue-500/15"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-lg bg-[var(--color-blue)] text-white font-bold text-sm hover:bg-[var(--color-blue-dark)] active:translate-y-px transition-colors disabled:opacity-60"
        >
          {loading ? "Guardando…" : "Guardar nueva contraseña"}
        </button>
      </form>
    </>
  );
}
