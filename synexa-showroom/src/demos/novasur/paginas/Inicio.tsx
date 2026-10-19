import { Link } from "react-router-dom";
import { rutaAsset } from "@/utilidades/assets";
import { BASE, CIFRAS, COLOR, PROYECTOS, SERVICIOS } from "../datos";
import { fechaLarga, useNoticias } from "../almacen";
import { Boton, Contenedor } from "./Comun";

export function Inicio() {
  const { noticias } = useNoticias();
  const recientes = noticias.filter((n) => n.publicada).sort((a, b) => b.fecha.localeCompare(a.fecha)).slice(0, 3);

  return (
    <>
      <section className="relative isolate overflow-hidden text-white" style={{ background: COLOR.oscuro }}>
        <img src={rutaAsset("assets/novasur/hero.webp")} alt="" className="absolute inset-0 -z-10 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#0a2833] via-[#0a2833]/70 to-transparent" />
        <div className="mx-auto max-w-6xl px-4 py-24 sm:py-32 lg:py-40">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#5fb3c4]">Ingeniería · Construcción · Mantenimiento</p>
          <h1 className="mt-4 max-w-2xl font-display text-4xl font-semibold leading-[1.08] sm:text-6xl">Ingeniería que mantiene en marcha a la industria.</h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/80">Diseñamos, construimos y mantenemos instalaciones industriales con foco en la seguridad y en el cumplimiento de plazos.</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Boton to={`${BASE}/proyectos`} claro>Ver proyectos</Boton>
            <Link to={`${BASE}/contacto`} className="inline-flex items-center rounded-md px-6 py-3 text-sm font-semibold text-white ring-1 ring-inset ring-white/40 hover:bg-white/10">Solicitar una reunión</Link>
          </div>
        </div>
      </section>

      <section style={{ background: COLOR.claro }}>
        <dl className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 py-10 lg:grid-cols-4">
          {CIFRAS.map((c) => (
            <div key={c.texto}>
              <dd className="font-display text-4xl font-semibold" style={{ color: COLOR.petroleo }}>{c.valor}</dd>
              <dt className="mt-1 text-sm text-[#3c5560]">{c.texto}</dt>
            </div>
          ))}
        </dl>
      </section>

      <Contenedor>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="max-w-lg font-display text-3xl font-semibold">Lo que hacemos</h2>
          <Link to={`${BASE}/servicios`} className="text-sm font-semibold text-[#246b7a] hover:underline">Todos los servicios →</Link>
        </div>
        <ul className="mt-8 grid gap-px overflow-hidden rounded-xl bg-[#d3dde1] ring-1 ring-[#d3dde1] sm:grid-cols-2 lg:grid-cols-3">
          {SERVICIOS.map((s, i) => (
            <li key={s.id} className="bg-white p-6">
              <span className="font-display text-sm font-semibold text-[#246b7a]">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-2 text-lg font-bold">{s.titulo}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#3c5560]">{s.texto}</p>
            </li>
          ))}
        </ul>
      </Contenedor>

      <section style={{ background: COLOR.claro }}>
        <Contenedor>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-display text-3xl font-semibold">Proyectos destacados</h2>
            <Link to={`${BASE}/proyectos`} className="text-sm font-semibold text-[#246b7a] hover:underline">Ver todos →</Link>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {PROYECTOS.map((p) => (
              <Link key={p.slug} to={`${BASE}/proyectos/${p.slug}`} className="group overflow-hidden rounded-xl bg-white ring-1 ring-[#d3dde1] transition-shadow hover:shadow-lg">
                <img src={rutaAsset(p.imagen)} alt={p.alt} loading="lazy" className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
                <div className="p-5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#246b7a]">{p.categoria} · {p.anio}</p>
                  <h3 className="mt-1 font-bold">{p.titulo}</h3>
                  <p className="mt-2 text-sm text-[#3c5560]">{p.resumen}</p>
                </div>
              </Link>
            ))}
          </div>
        </Contenedor>
      </section>

      <Contenedor>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-display text-3xl font-semibold">Noticias</h2>
          <Link to={`${BASE}/noticias`} className="text-sm font-semibold text-[#246b7a] hover:underline">Todas las noticias →</Link>
        </div>
        {recientes.length ? (
          <ul className="mt-8 divide-y divide-[#d3dde1] border-y border-[#d3dde1]">
            {recientes.map((n) => (
              <li key={n.id}>
                <Link to={`${BASE}/noticias/${n.id}`} className="flex flex-col gap-1 py-5 hover:bg-[#f4f8f9] sm:flex-row sm:items-baseline sm:gap-6">
                  <time dateTime={n.fecha} className="w-44 shrink-0 text-sm text-[#5b727b]">{fechaLarga(n.fecha)}</time>
                  <span className="font-semibold">{n.titulo}</span>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-8 rounded-xl border border-dashed border-[#c3d0d5] p-8 text-center text-[#5b727b]">Aún no hay noticias publicadas.</p>
        )}
      </Contenedor>

      <section className="text-white" style={{ background: COLOR.petroleo }}>
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-6 px-4 py-14">
          <h2 className="max-w-xl font-display text-3xl font-semibold">¿Tienes un proyecto industrial en mente?</h2>
          <Boton to={`${BASE}/contacto`} claro>Hablemos</Boton>
        </div>
      </section>
    </>
  );
}
