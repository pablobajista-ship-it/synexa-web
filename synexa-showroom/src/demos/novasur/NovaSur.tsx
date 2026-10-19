import { useEffect, useState } from "react";
import { Link, NavLink, Route, Routes, useLocation } from "react-router-dom";
import { IsotipoMarca } from "@/componentes/IsotipoMarca";
import { marcaPorId } from "@/datos/marcas";
import { BASE, COLOR, CONTACTO } from "./datos";
import { ProveedorNoticias } from "./almacen";
import { Inicio } from "./paginas/Inicio";
import { Nosotros, Servicios, Equipo } from "./paginas/Institucional";
import { ListaProyectos, FichaProyecto } from "./paginas/Proyectos";
import { ListaNoticias, VerNoticia } from "./paginas/Noticias";
import { Contacto } from "./paginas/Contacto";
import { Admin } from "./paginas/Admin";

const marca = marcaPorId("novasur")!;

const MENU = [
  ["", "Inicio"],
  ["quienes-somos", "Quiénes somos"],
  ["servicios", "Servicios"],
  ["proyectos", "Proyectos"],
  ["equipo", "Equipo"],
  ["noticias", "Noticias"],
  ["contacto", "Contacto"],
] as const;

function Cabecera() {
  const [abierto, setAbierto] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => {
    setAbierto(false);
  }, [pathname]);

  const estilo = ({ isActive }: { isActive: boolean }) =>
    `rounded px-3 py-2 text-sm font-medium transition-colors ${isActive ? "text-white underline decoration-[#5fb3c4] decoration-2 underline-offset-8" : "text-white/75 hover:text-white"}`;

  return (
    <header className="sticky top-11 z-40" style={{ background: COLOR.petroleo }}>
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link to={BASE} className="flex items-center gap-3 text-white" aria-label="NovaSur Ingeniería, inicio">
          <IsotipoMarca marca={marca} size={36} />
          <span className="leading-tight">
            <span className="block text-sm font-bold tracking-wide">NOVASUR</span>
            <span className="block text-[10px] uppercase tracking-[0.25em] text-white/80">Ingeniería</span>
          </span>
        </Link>
        <nav aria-label="Principal" className="hidden items-center lg:flex">
          {MENU.map(([ruta, texto]) => (
            <NavLink key={ruta} to={ruta ? `${BASE}/${ruta}` : BASE} end={ruta === ""} className={estilo}>{texto}</NavLink>
          ))}
        </nav>
        <button type="button" className="rounded p-2 text-white lg:hidden" aria-expanded={abierto} aria-controls="menu-movil" onClick={() => setAbierto((v) => !v)}>
          <span className="sr-only">{abierto ? "Cerrar menú" : "Abrir menú"}</span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            {abierto ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>
      {abierto && (
        <nav id="menu-movil" aria-label="Principal móvil" className="border-t border-white/10 px-4 pb-4 lg:hidden">
          <ul className="flex flex-col">
            {MENU.map(([ruta, texto]) => (
              <li key={ruta}><NavLink to={ruta ? `${BASE}/${ruta}` : BASE} end={ruta === ""} className={({ isActive }) => `block rounded px-3 py-3 text-base ${isActive ? "bg-white/10 font-semibold text-white" : "text-white/80"}`}>{texto}</NavLink></li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}

function Pie() {
  return (
    <footer style={{ background: COLOR.oscuro }} className="text-white/70">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-3">
        <div>
          <p className="text-sm font-bold tracking-wide text-white">NOVASUR INGENIERÍA</p>
          <p className="mt-3 text-sm leading-relaxed">Ingeniería, construcción y mantenimiento industrial.</p>
        </div>
        <address className="text-sm not-italic leading-relaxed">
          {CONTACTO.direccion}<br />{CONTACTO.telefono}<br />{CONTACTO.correo}<br />{CONTACTO.horario}
        </address>
        <ul className="space-y-2 text-sm">
          {MENU.slice(1).map(([ruta, texto]) => (
            <li key={ruta}><Link to={`${BASE}/${ruta}`} className="hover:text-white">{texto}</Link></li>
          ))}
          <li><Link to={`${BASE}/admin`} className="text-[#5fb3c4] hover:text-white">Administración de contenidos (demo)</Link></li>
        </ul>
      </div>
      <p className="border-t border-white/10 px-4 py-5 text-center text-xs text-white/80">
        NovaSur Ingeniería es una empresa ficticia creada para una demostración de SYNEXA. Cifras, personas y proyectos son inventados. Fotografías generadas con IA.
      </p>
    </footer>
  );
}

function ScrollArriba() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo?.({ top: 0 });
  }, [pathname]);
  return null;
}

export default function NovaSur() {
  return (
    <ProveedorNoticias>
      <div className="bg-white text-[#10252d]">
        <ScrollArriba />
        <Cabecera />
        <main id="contenido-demo">
          <Routes>
            <Route index element={<Inicio />} />
            <Route path="quienes-somos" element={<Nosotros />} />
            <Route path="servicios" element={<Servicios />} />
            <Route path="proyectos" element={<ListaProyectos />} />
            <Route path="proyectos/:slug" element={<FichaProyecto />} />
            <Route path="equipo" element={<Equipo />} />
            <Route path="noticias" element={<ListaNoticias />} />
            <Route path="noticias/:id" element={<VerNoticia />} />
            <Route path="contacto" element={<Contacto />} />
            <Route path="admin" element={<Admin />} />
            <Route
              path="*"
              element={
                <section className="mx-auto max-w-xl px-4 py-24 text-center">
                  <h1 className="font-display text-4xl font-semibold">Página no encontrada</h1>
                  <Link to={BASE} className="mt-6 inline-block font-semibold text-[#246b7a] underline">Volver al inicio</Link>
                </section>
              }
            />
          </Routes>
        </main>
        <Pie />
      </div>
    </ProveedorNoticias>
  );
}
