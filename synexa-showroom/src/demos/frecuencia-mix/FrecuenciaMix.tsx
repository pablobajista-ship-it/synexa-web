import { useEffect, useState } from "react";
import { Link, NavLink, Route, Routes, useLocation } from "react-router-dom";
import { IsotipoMarca } from "@/componentes/IsotipoMarca";
import { marcaPorId } from "@/datos/marcas";
import { BASE, COLOR } from "./datos";
import { ProveedorEstado } from "./estado";
import { Reproductor } from "./Reproductor";
import { Inicio } from "./paginas/Inicio";
import { Programacion } from "./paginas/Programacion";
import { Musica } from "./paginas/Musica";
import { Comunidad } from "./paginas/Comunidad";
import { Moderacion } from "./paginas/Moderacion";

const marca = marcaPorId("frecuencia-mix")!;

const MENU = [
  ["programacion", "Programación"],
  ["musica", "Música"],
  ["comunidad", "Comunidad"],
] as const;

function Cabecera() {
  const [abierto, setAbierto] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => {
    setAbierto(false);
  }, [pathname]);
  const estilo = ({ isActive }: { isActive: boolean }) => `rounded px-3 py-2 text-sm font-medium ${isActive ? "text-white" : "text-white/65 hover:text-white"}`;

  return (
    <header className="sticky top-11 z-30 border-b border-white/10 bg-[#070f2b]/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link to={BASE} className="flex items-center gap-3 text-white" aria-label="Frecuencia Mix, inicio">
          <IsotipoMarca marca={marca} size={34} />
          <span className="text-sm font-extrabold uppercase tracking-[0.2em]">Frecuencia <span style={{ color: COLOR.teal }}>Mix</span></span>
        </Link>
        <nav aria-label="Principal" className="hidden items-center md:flex">
          {MENU.map(([r, t]) => <NavLink key={r} to={`${BASE}/${r}`} className={estilo}>{t}</NavLink>)}
        </nav>
        <button type="button" className="rounded p-2 text-white md:hidden" aria-expanded={abierto} aria-controls="fm-menu-movil" onClick={() => setAbierto((v) => !v)}>
          <span className="sr-only">{abierto ? "Cerrar menú" : "Abrir menú"}</span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">{abierto ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}</svg>
        </button>
      </div>
      {abierto && (
        <nav id="fm-menu-movil" aria-label="Principal móvil" className="border-t border-white/10 px-4 pb-4 md:hidden">
          <ul>{MENU.map(([r, t]) => <li key={r}><NavLink to={`${BASE}/${r}`} className="block rounded px-3 py-3 text-white/85 hover:bg-white/5">{t}</NavLink></li>)}</ul>
        </nav>
      )}
    </header>
  );
}

function ScrollArriba() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo?.({ top: 0 });
  }, [pathname]);
  return null;
}

export default function FrecuenciaMix() {
  return (
    <ProveedorEstado>
      <div className="min-h-screen pb-24 text-white" style={{ background: COLOR.fondo }}>
        <ScrollArriba />
        <Cabecera />
        <main>
          <Routes>
            <Route index element={<Inicio />} />
            <Route path="programacion" element={<Programacion />} />
            <Route path="musica" element={<Musica />} />
            <Route path="comunidad" element={<Comunidad />} />
            <Route path="moderacion" element={<Moderacion />} />
            <Route path="*" element={<section className="mx-auto max-w-xl px-4 py-24 text-center"><h1 className="text-3xl font-bold">Página no encontrada</h1><Link to={BASE} className="mt-6 inline-block font-semibold underline" style={{ color: COLOR.tealClaro }}>Volver al inicio</Link></section>} />
          </Routes>
        </main>
        <footer className="border-t border-white/10 bg-black/30">
          <div className="mx-auto flex max-w-6xl flex-wrap items-start justify-between gap-6 px-4 py-10 text-sm text-white/80">
            <p className="max-w-md text-xs text-white/80">Frecuencia Mix es una emisora ficticia creada para una demostración de SYNEXA. Locutores, programas, canciones, artistas y usuarios son inventados. Fotografías generadas con IA.</p>
            <Link to={`${BASE}/moderacion`} className="font-semibold hover:underline" style={{ color: COLOR.tealClaro }}>Panel de moderación (demo)</Link>
          </div>
        </footer>
        <Reproductor />
      </div>
    </ProveedorEstado>
  );
}
