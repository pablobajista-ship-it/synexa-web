import { useEffect, useState } from "react";
import { Link, NavLink, Route, Routes, useLocation } from "react-router-dom";
import { IsotipoMarca } from "@/componentes/IsotipoMarca";
import { marcaPorId } from "@/datos/marcas";
import { BASE, COLOR, CONTACTO } from "./datos";
import { ProveedorComparador, useComparador } from "./almacen";
import { Inicio } from "./paginas/Inicio";
import { Catalogo } from "./paginas/Catalogo";
import { FichaEquipo } from "./paginas/FichaEquipo";
import { Comparar } from "./paginas/Comparar";
import { Recomendador } from "./paginas/Recomendador";
import { Kits } from "./paginas/Kits";
import { Guias, VerGuia } from "./paginas/Guias";
import { Consulta } from "./paginas/Consulta";

const marca = marcaPorId("lumina-pro")!;

const MENU = [
  ["catalogo", "Catálogo"],
  ["recomendador", "Recomendador"],
  ["kits", "Kits"],
  ["guias", "Guías"],
  ["consulta", "Consultar"],
] as const;

function Cabecera() {
  const [abierto, setAbierto] = useState(false);
  const { pathname } = useLocation();
  const { ids } = useComparador();
  useEffect(() => {
    setAbierto(false);
  }, [pathname]);

  const estilo = ({ isActive }: { isActive: boolean }) =>
    `rounded px-3 py-2 text-sm font-medium transition-colors ${isActive ? "text-white" : "text-white/65 hover:text-white"}`;
  const comparar = (
    <NavLink to={`${BASE}/comparar`} className={({ isActive }) => `inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold ring-1 ring-inset ${isActive ? "bg-[#7c4ddb] text-white ring-[#7c4ddb]" : "text-white ring-white/25 hover:bg-white/10"}`}>
      Comparar
      <span className="grid h-5 min-w-5 place-items-center rounded-full bg-white px-1 text-xs font-bold text-[#0d0d2b]" aria-label={`${ids.length} equipos seleccionados`}>{ids.length}</span>
    </NavLink>
  );

  return (
    <header className="sticky top-11 z-40 border-b border-white/10 bg-[#0d0d2b]/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
        <Link to={BASE} className="flex items-center gap-3 text-white" aria-label="Lúmina Pro, inicio">
          <IsotipoMarca marca={marca} size={34} />
          <span className="text-sm font-bold tracking-[0.18em]">LÚMINA PRO</span>
        </Link>
        <nav aria-label="Principal" className="hidden items-center lg:flex">
          {MENU.map(([r, t]) => <NavLink key={r} to={`${BASE}/${r}`} className={estilo}>{t}</NavLink>)}
        </nav>
        <div className="flex items-center gap-2">
          {comparar}
          <button type="button" className="rounded p-2 text-white lg:hidden" aria-expanded={abierto} aria-controls="lp-menu-movil" onClick={() => setAbierto((v) => !v)}>
            <span className="sr-only">{abierto ? "Cerrar menú" : "Abrir menú"}</span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              {abierto ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>
      {abierto && (
        <nav id="lp-menu-movil" aria-label="Principal móvil" className="border-t border-white/10 px-4 pb-4 lg:hidden">
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

export default function LuminaPro() {
  return (
    <ProveedorComparador>
      <div className="min-h-screen text-white" style={{ background: COLOR.fondo }}>
        <ScrollArriba />
        <Cabecera />
        <main>
          <Routes>
            <Route index element={<Inicio />} />
            <Route path="catalogo" element={<Catalogo />} />
            <Route path="equipo/:id" element={<FichaEquipo />} />
            <Route path="comparar" element={<Comparar />} />
            <Route path="recomendador" element={<Recomendador />} />
            <Route path="kits" element={<Kits />} />
            <Route path="guias" element={<Guias />} />
            <Route path="guias/:id" element={<VerGuia />} />
            <Route path="consulta" element={<Consulta />} />
            <Route path="*" element={<section className="mx-auto max-w-xl px-4 py-24 text-center"><h1 className="text-3xl font-bold">Página no encontrada</h1><Link to={BASE} className="mt-6 inline-block font-semibold text-[#a98bf0] underline">Volver al inicio</Link></section>} />
          </Routes>
        </main>
        <footer className="border-t border-white/10 bg-black/30">
          <div className="mx-auto grid max-w-6xl gap-6 px-4 py-10 text-sm text-white/65 md:grid-cols-3">
            <div><p className="font-bold tracking-[0.18em] text-white">LÚMINA PRO</p><p className="mt-3">Iluminación y audio profesional para eventos.</p></div>
            <div><p>{CONTACTO.correo}</p><p>{CONTACTO.telefono}</p><p>{CONTACTO.horario}</p></div>
            <div><p className="text-xs text-white/80">Lúmina Pro es una empresa ficticia creada para una demostración de SYNEXA. Marcas, modelos, especificaciones y precios son inventados. Fotografías generadas con IA.</p></div>
          </div>
        </footer>
      </div>
    </ProveedorComparador>
  );
}
