"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const inputClass =
  "w-full px-3 py-2.5 border border-[var(--color-border)] rounded-lg text-sm text-[var(--color-navy)] focus:outline-none focus:border-[var(--color-blue)] focus:ring-[3px] focus:ring-blue-500/15";
const labelClass = "block text-[13px] font-semibold text-[var(--color-navy)] mb-1.5";
const primaryBtnClass =
  "w-full py-3 rounded-lg bg-[var(--color-blue)] text-white font-bold text-sm hover:bg-[var(--color-blue-dark)] active:translate-y-px transition-colors disabled:opacity-60";

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
      <path fill="#4285F4" d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.9c1.7-1.57 2.7-3.88 2.7-6.62z" />
      <path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.9-2.26c-.8.54-1.83.86-3.06.86-2.35 0-4.34-1.59-5.05-3.72H.9v2.33A9 9 0 0 0 9 18z" />
      <path fill="#FBBC05" d="M3.95 10.7A5.4 5.4 0 0 1 3.67 9c0-.59.1-1.16.28-1.7V4.97H.9A9 9 0 0 0 0 9c0 1.45.35 2.83.9 4.03l3.05-2.33z" />
      <path fill="#EA4335" d="M9 3.58c1.32 0 2.5.45 3.44 1.35l2.58-2.58C13.46.89 11.43 0 9 0A9 9 0 0 0 .9 4.97l3.05 2.33C4.66 5.17 6.65 3.58 9 3.58z" />
    </svg>
  );
}

function GoogleButton({ googleEnabled }) {
  return (
    <>
      <button
        type="button"
        onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
        disabled={!googleEnabled}
        className="w-full flex items-center justify-center gap-2.5 py-3 rounded-lg border border-[var(--color-border)] bg-white text-sm font-bold text-[var(--color-navy)] hover:bg-[var(--color-surface-muted)] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <GoogleIcon />
        Continuar con Google
      </button>
      {!googleEnabled ? (
        <p className="mt-3 text-[12px] text-[var(--color-gray-dark)] bg-[var(--color-surface-muted)] border border-dashed border-[var(--color-border)] rounded-lg px-3 py-2.5">
          El login con Google todavía no está configurado. Completá{" "}
          <code className="bg-white px-1 rounded">AUTH_GOOGLE_ID</code> y{" "}
          <code className="bg-white px-1 rounded">AUTH_GOOGLE_SECRET</code> en{" "}
          <code className="bg-white px-1 rounded">.env.local</code>.
        </p>
      ) : null}
    </>
  );
}

function LoginPanel({ googleEnabled }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const isGmail = /@gmail\.com$/i.test(email.trim());

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await signIn("credentials", { email, password, redirect: false });
    setLoading(false);

    if (result?.error) {
      setError("Email o contraseña incorrectos.");
      return;
    }
    router.push("/dashboard");
    router.refresh();
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
          <label htmlFor="login-email" className={labelClass}>Correo electrónico</label>
          <input
            id="login-email"
            type="email"
            required
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tu@email.com"
            className={inputClass}
          />
          {isGmail ? (
            <p className="mt-1.5 text-[12px] text-[var(--color-blue)]">
              También podés iniciar sesión directamente con Google.
            </p>
          ) : null}
        </div>

        <div className="mb-4">
          <label htmlFor="login-password" className={labelClass}>Contraseña</label>
          <div className="relative">
            <input
              id="login-password"
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className={inputClass + " pr-16"}
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-[12px] font-semibold text-[var(--color-gray-dark)] hover:text-[var(--color-navy)] px-1.5 py-1"
            >
              {showPassword ? "Ocultar" : "Mostrar"}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between mb-5 text-[13px]">
          <label className="flex items-center gap-1.5 text-[var(--color-gray-dark)]">
            <input type="checkbox" className="rounded" />
            Recordarme
          </label>
          <Link href="/forgot-password" className="font-semibold text-[var(--color-blue)] hover:underline">
            ¿Olvidaste tu contraseña?
          </Link>
        </div>

        <button type="submit" disabled={loading} className={primaryBtnClass}>
          {loading ? "Ingresando…" : "Iniciar sesión"}
        </button>
      </form>

      <div className="flex items-center gap-3 my-5 text-[12px] uppercase tracking-wide text-[var(--color-gray-dark)]/60">
        <div className="flex-1 h-px bg-[var(--color-border)]" />o<div className="flex-1 h-px bg-[var(--color-border)]" />
      </div>

      <GoogleButton googleEnabled={googleEnabled} />
    </>
  );
}

function RegisterPanel({ googleEnabled }) {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    lastName: "",
    company: "",
    email: "",
    phone: "",
    password: "",
    passwordConfirm: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  function set(field) {
    return (e) => setForm((f) => ({ ...f, [field]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setErrors({});
    setLoading(true);

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setErrors(data.errors || {});
      return;
    }

    const result = await signIn("credentials", {
      email: form.email,
      password: form.password,
      redirect: false,
    });

    if (result?.error) {
      setErrors({ email: "Tu cuenta se creó, pero no pudimos iniciar sesión automáticamente. Probá desde la pestaña 'Iniciar sesión'." });
      return;
    }
    router.push("/dashboard");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div>
          <label htmlFor="reg-name" className={labelClass}>Nombre</label>
          <input id="reg-name" className={inputClass} value={form.name} onChange={set("name")} required />
          {errors.name ? <p className="text-[12px] text-red-600 mt-1">{errors.name}</p> : null}
        </div>
        <div>
          <label htmlFor="reg-lastName" className={labelClass}>Apellido</label>
          <input id="reg-lastName" className={inputClass} value={form.lastName} onChange={set("lastName")} required />
          {errors.lastName ? <p className="text-[12px] text-red-600 mt-1">{errors.lastName}</p> : null}
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="reg-company" className={labelClass}>Empresa o negocio (opcional)</label>
        <input id="reg-company" className={inputClass} value={form.company} onChange={set("company")} />
      </div>

      <div className="mb-4">
        <label htmlFor="reg-email" className={labelClass}>Correo electrónico</label>
        <input id="reg-email" type="email" className={inputClass} value={form.email} onChange={set("email")} required />
        {errors.email ? <p className="text-[12px] text-red-600 mt-1">{errors.email}</p> : null}
        {/@gmail\.com$/i.test(form.email.trim()) ? (
          <p className="mt-1.5 text-[12px] text-[var(--color-blue)]">
            También podés iniciar sesión directamente con Google.
          </p>
        ) : null}
      </div>

      <div className="mb-4">
        <label htmlFor="reg-phone" className={labelClass}>Teléfono (opcional)</label>
        <input id="reg-phone" className={inputClass} value={form.phone} onChange={set("phone")} />
      </div>

      <div className="grid grid-cols-2 gap-3 mb-2">
        <div>
          <label htmlFor="reg-password" className={labelClass}>Contraseña</label>
          <input
            id="reg-password"
            type={showPassword ? "text" : "password"}
            className={inputClass}
            value={form.password}
            onChange={set("password")}
            required
          />
          {errors.password ? <p className="text-[12px] text-red-600 mt-1">{errors.password}</p> : null}
        </div>
        <div>
          <label htmlFor="reg-passwordConfirm" className={labelClass}>Repetir contraseña</label>
          <input
            id="reg-passwordConfirm"
            type={showPassword ? "text" : "password"}
            className={inputClass}
            value={form.passwordConfirm}
            onChange={set("passwordConfirm")}
            required
          />
          {errors.passwordConfirm ? (
            <p className="text-[12px] text-red-600 mt-1">{errors.passwordConfirm}</p>
          ) : null}
        </div>
      </div>

      <label className="flex items-center gap-1.5 text-[12px] text-[var(--color-gray-dark)] mb-5">
        <input type="checkbox" className="rounded" checked={showPassword} onChange={() => setShowPassword((v) => !v)} />
        Mostrar contraseñas
      </label>

      <button type="submit" disabled={loading} className={primaryBtnClass}>
        {loading ? "Creando cuenta…" : "Crear cuenta"}
      </button>

      <div className="flex items-center gap-3 my-5 text-[12px] uppercase tracking-wide text-[var(--color-gray-dark)]/60">
        <div className="flex-1 h-px bg-[var(--color-border)]" />o<div className="flex-1 h-px bg-[var(--color-border)]" />
      </div>

      <GoogleButton googleEnabled={googleEnabled} />
    </form>
  );
}

export default function LandingAuth({ googleEnabled }) {
  const [tab, setTab] = useState("login");

  return (
    <div className="bg-white border border-[var(--color-border)] rounded-2xl shadow-[0_1px_3px_rgba(11,31,68,0.06)] p-8">
      <div className="flex rounded-lg bg-[var(--color-surface-muted)] p-1 mb-6 text-sm font-semibold">
        <button
          type="button"
          onClick={() => setTab("login")}
          className={`flex-1 py-2 rounded-md transition-colors ${
            tab === "login" ? "bg-white text-[var(--color-navy)] shadow-sm" : "text-[var(--color-gray-dark)]"
          }`}
        >
          Iniciar sesión
        </button>
        <button
          type="button"
          onClick={() => setTab("register")}
          className={`flex-1 py-2 rounded-md transition-colors ${
            tab === "register" ? "bg-white text-[var(--color-navy)] shadow-sm" : "text-[var(--color-gray-dark)]"
          }`}
        >
          Crear cuenta
        </button>
      </div>

      {tab === "login" ? (
        <LoginPanel googleEnabled={googleEnabled} />
      ) : (
        <RegisterPanel googleEnabled={googleEnabled} />
      )}
    </div>
  );
}
