"use client";

export default function GlobalError({ reset }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-navy)] px-6">
      <div className="text-center">
        <h1 className="text-xl font-bold text-slate-50 mb-2">Ocurrió un problema</h1>
        <p className="text-slate-400 mb-6">
          Algo no funcionó como esperábamos. Podés intentar de nuevo.
        </p>
        <button
          onClick={() => reset()}
          className="px-5 py-2.5 rounded-lg bg-[var(--color-blue)] text-white font-bold text-sm hover:bg-[var(--color-blue-dark)]"
        >
          Reintentar
        </button>
      </div>
    </div>
  );
}
