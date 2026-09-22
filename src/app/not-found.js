import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-navy)] px-6">
      <div className="text-center">
        <p className="text-6xl font-bold text-[var(--color-blue)] mb-2">404</p>
        <h1 className="text-xl font-bold text-slate-50 mb-2">Página no encontrada</h1>
        <p className="text-slate-400 mb-6">La página que buscás no existe o ya no está disponible.</p>
        <Link
          href="/dashboard"
          className="inline-block px-5 py-2.5 rounded-lg bg-[var(--color-blue)] text-white font-bold text-sm hover:bg-[var(--color-blue-dark)]"
        >
          Volver al panel
        </Link>
      </div>
    </div>
  );
}
