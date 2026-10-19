import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { rutaAsset } from "@/utilidades/assets";
import { BASE, PROYECTOS } from "../datos";
import { Boton, Contenedor, Encabezado } from "./Comun";

const CATEGORIAS = ["Todos", ...new Set(PROYECTOS.map((p) => p.categoria))];

export function ListaProyectos() {
  const [cat, setCat] = useState("Todos");
  const visibles = PROYECTOS.filter((p) => cat === "Todos" || p.categoria === cat);
  return (
    <>
      <Encabezado etiqueta="Proyectos" titulo="Obras y servicios que hablan por nosotros." imagen="assets/novasur/proyecto-1.webp" />
      <Contenedor>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar por categoría">
          {CATEGORIAS.map((c) => (
            <button key={c} type="button" aria-pressed={cat === c} onClick={() => setCat(c)} className={`rounded-full px-4 py-2 text-sm font-medium ${cat === c ? "bg-[#0e3b4a] text-white" : "bg-[#e8eef0] text-[#10252d] hover:bg-[#d3dde1]"}`}>
              {c}
            </button>
          ))}
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {visibles.map((p) => (
            <Link key={p.slug} to={`${BASE}/proyectos/${p.slug}`} className="group overflow-hidden rounded-xl ring-1 ring-[#d3dde1] transition-shadow hover:shadow-lg">
              <img src={rutaAsset(p.imagen)} alt={p.alt} loading="lazy" className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
              <div className="p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#246b7a]">{p.categoria} · {p.anio}</p>
                <h2 className="mt-1 text-lg font-bold">{p.titulo}</h2>
                <p className="mt-2 text-sm text-[#3c5560]">{p.resumen}</p>
              </div>
            </Link>
          ))}
        </div>
      </Contenedor>
    </>
  );
}

export function FichaProyecto() {
  const { slug } = useParams();
  const i = PROYECTOS.findIndex((p) => p.slug === slug);
  if (i < 0) {
    return (
      <Contenedor className="text-center">
        <h1 className="font-display text-3xl font-semibold">Proyecto no encontrado</h1>
        <div className="mt-6"><Boton to={`${BASE}/proyectos`}>Ver todos los proyectos</Boton></div>
      </Contenedor>
    );
  }
  const p = PROYECTOS[i];
  const sig = PROYECTOS[(i + 1) % PROYECTOS.length];
  return (
    <>
      <Encabezado etiqueta={`${p.categoria} · ${p.anio}`} titulo={p.titulo} texto={p.resumen} />
      <Contenedor>
        <nav aria-label="Ruta de navegación" className="mb-6 text-sm text-[#5b727b]">
          <Link to={`${BASE}/proyectos`} className="hover:underline">← Proyectos</Link>
        </nav>
        <img src={rutaAsset(p.imagen)} alt={p.alt} className="aspect-[16/8] w-full rounded-xl object-cover" />
        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_320px]">
          <div className="space-y-8 leading-relaxed text-[#3c5560]">
            <section><h2 className="font-display text-2xl font-semibold text-[#10252d]">El desafío</h2><p className="mt-3">{p.desafio}</p></section>
            <section><h2 className="font-display text-2xl font-semibold text-[#10252d]">Nuestra solución</h2><p className="mt-3">{p.solucion}</p></section>
            <section>
              <h2 className="font-display text-2xl font-semibold text-[#10252d]">Resultados</h2>
              <ul className="mt-3 space-y-2">{p.resultados.map((r) => <li key={r} className="flex gap-2"><span aria-hidden="true" className="font-bold text-[#246b7a]">✓</span>{r}</li>)}</ul>
            </section>
          </div>
          <aside className="h-fit rounded-xl bg-[#e8eef0] p-6">
            <h2 className="font-bold">Datos del proyecto</h2>
            <dl className="mt-4 space-y-3 text-sm">
              {p.datos.map(([k, v]) => <div key={k}><dt className="text-[#5b727b]">{k}</dt><dd className="font-semibold">{v}</dd></div>)}
              <div><dt className="text-[#5b727b]">Ubicación</dt><dd className="font-semibold">{p.ubicacion}</dd></div>
            </dl>
          </aside>
        </div>
        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-[#d3dde1] pt-6">
          <Link to={`${BASE}/proyectos/${sig.slug}`} className="font-semibold text-[#246b7a] hover:underline">Siguiente: {sig.titulo} →</Link>
          <Boton to={`${BASE}/contacto`}>Consultar por un proyecto similar</Boton>
        </div>
      </Contenedor>
    </>
  );
}
