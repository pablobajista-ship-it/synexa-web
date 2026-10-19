import { Link } from "react-router-dom";
import { rutaAsset } from "@/utilidades/assets";
import { BASE, CATEGORIAS, EVENTOS, KITS, PRODUCTOS } from "../datos";
import { BotonPrimario, Contenedor, TarjetaProducto } from "./Comun";

const IMAGEN_EVENTO: Record<string, string> = {
  matrimonio: "assets/lumina-pro/evento-1.webp",
  corporativo: "assets/lumina-pro/banner.webp",
  concierto: "assets/lumina-pro/evento-3.webp",
  discoteca: "assets/lumina-pro/evento-2.webp",
};

export function Inicio() {
  return (
    <>
      <section className="relative isolate overflow-hidden">
        <img src={rutaAsset("assets/lumina-pro/hero.webp")} alt="" className="absolute inset-0 -z-10 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#0d0d2b] via-[#0d0d2b]/70 to-transparent" />
        <div className="mx-auto max-w-6xl px-4 py-24 sm:py-32 lg:py-40">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#a98bf0]">Iluminación y audio profesional</p>
          <h1 className="mt-4 max-w-2xl text-4xl font-bold leading-[1.05] sm:text-6xl">Elige el equipo correcto para tu evento.</h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/80">Filtra por especificaciones, compara equipos lado a lado y recibe una recomendación según el tipo de evento.</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <BotonPrimario to={`${BASE}/catalogo`}>Ver catálogo</BotonPrimario>
            <Link to={`${BASE}/recomendador`} className="inline-flex items-center rounded-md px-6 py-3 text-sm font-semibold ring-1 ring-inset ring-white/35 hover:bg-white/10">Recomiéndame un equipo</Link>
          </div>
        </div>
      </section>

      <Contenedor>
        <h2 className="text-2xl font-bold">Compra según tu evento</h2>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {EVENTOS.map((e) => (
            <li key={e.id}>
              <Link to={`${BASE}/recomendador?evento=${e.id}`} className="group block overflow-hidden rounded-xl ring-1 ring-white/10">
                <div className="relative aspect-[4/3]">
                  <img src={rutaAsset(IMAGEN_EVENTO[e.id])} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d2b] to-transparent" />
                  <p className="absolute bottom-3 left-4 font-bold">{e.nombre}</p>
                </div>
                <p className="bg-[#17173f] p-4 text-sm text-white/70">{e.descripcion}</p>
              </Link>
            </li>
          ))}
        </ul>
      </Contenedor>

      <section className="bg-black/25">
        <Contenedor>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="text-2xl font-bold">Equipos destacados</h2>
            <Link to={`${BASE}/catalogo`} className="text-sm font-semibold text-[#a98bf0] hover:underline">Ver los {PRODUCTOS.length} equipos →</Link>
          </div>
          <ul className="mt-6 flex flex-wrap gap-2" aria-label="Categorías">
            {CATEGORIAS.map((c) => <li key={c}><Link to={`${BASE}/catalogo?cat=${encodeURIComponent(c)}`} className="inline-block rounded-full bg-white/10 px-4 py-1.5 text-sm hover:bg-white/20">{c}</Link></li>)}
          </ul>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {["moving-spot-250", "par-wash-18", "line-array-12", "proyector-laser-rgb"].map((id) => {
              const p = PRODUCTOS.find((x) => x.id === id)!;
              return <TarjetaProducto key={id} p={p} />;
            })}
          </div>
        </Contenedor>
      </section>

      <Contenedor>
        <div className="grid items-center gap-8 rounded-2xl bg-[#17173f] p-8 ring-1 ring-white/10 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <h2 className="text-2xl font-bold">Kits listos para usar</h2>
            <p className="mt-3 text-white/70">{KITS.length} combinaciones armadas por nuestro equipo comercial para los eventos más comunes.</p>
            <div className="mt-6"><BotonPrimario to={`${BASE}/kits`}>Ver kits</BotonPrimario></div>
          </div>
          <img src={rutaAsset("assets/lumina-pro/tecnica-2.webp")} alt="Rack de procesadores de audio en un escenario" loading="lazy" className="aspect-[16/9] w-full rounded-xl object-cover" />
        </div>
      </Contenedor>
    </>
  );
}
