import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { formatoCLP } from "@/utilidades/formato";
import { CATEGORIAS, PRODUCTOS, type Categoria } from "../datos";
import { Contenedor, TarjetaProducto, Titulo } from "./Comun";

const PRECIO_MAX = Math.max(...PRODUCTOS.map((p) => p.precio));
const ORDENES = { relevancia: "Destacados", "precio-asc": "Precio: menor a mayor", "precio-desc": "Precio: mayor a menor", potencia: "Potencia: mayor a menor" } as const;
type Orden = keyof typeof ORDENES;

export function Catalogo() {
  const [params, setParams] = useSearchParams();
  const cats = params.getAll("cat") as Categoria[];
  const q = params.get("q") ?? "";
  const exterior = params.get("exterior") === "1";
  const dmx = params.get("dmx") === "1";
  const precio = Number(params.get("precio") ?? PRECIO_MAX);
  const orden = (params.get("orden") as Orden) in ORDENES ? (params.get("orden") as Orden) : "relevancia";

  const poner = (mut: (p: URLSearchParams) => void) => {
    const n = new URLSearchParams(params);
    mut(n);
    setParams(n, { replace: true });
  };

  const lista = useMemo(() => {
    const t = q.trim().toLowerCase();
    const r = PRODUCTOS.filter(
      (p) =>
        (!cats.length || cats.includes(p.categoria)) &&
        (!exterior || p.ip >= 65) &&
        (!dmx || p.dmx) &&
        p.precio <= precio &&
        (!t || `${p.nombre} ${p.resumen} ${p.categoria}`.toLowerCase().includes(t)),
    );
    if (orden === "precio-asc") r.sort((a, b) => a.precio - b.precio);
    if (orden === "precio-desc") r.sort((a, b) => b.precio - a.precio);
    if (orden === "potencia") r.sort((a, b) => b.potenciaW - a.potenciaW);
    return r;
  }, [cats.join("|"), q, exterior, dmx, precio, orden]); // eslint-disable-line react-hooks/exhaustive-deps

  const hayFiltros = cats.length || q || exterior || dmx || precio < PRECIO_MAX;

  return (
    <Contenedor>
      <Titulo etiqueta="Catálogo técnico" texto="Filtra por especificaciones y compara hasta tres equipos.">Todos los equipos</Titulo>
      <div className="mt-10 grid gap-8 lg:grid-cols-[260px_1fr]">
        <form className="h-fit space-y-6 rounded-xl bg-[#17173f] p-5 ring-1 ring-white/10" aria-label="Filtros" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label htmlFor="lp-q" className="mb-1.5 block text-sm font-semibold">Buscar</label>
            <input id="lp-q" type="search" value={q} onChange={(e) => poner((n) => (e.target.value ? n.set("q", e.target.value) : n.delete("q")))} placeholder="Ej.: spot, subwoofer" className="w-full rounded-md border border-white/20 bg-[#0d0d2b] px-3 py-2 text-sm placeholder-white/35 outline-none focus:border-[#7c4ddb]" />
          </div>
          <fieldset>
            <legend className="mb-2 text-sm font-semibold">Categoría</legend>
            {CATEGORIAS.map((c) => (
              <label key={c} className="flex items-center gap-2.5 py-1 text-sm">
                <input type="checkbox" checked={cats.includes(c)} onChange={() => poner((n) => { n.delete("cat"); (cats.includes(c) ? cats.filter((x) => x !== c) : [...cats, c]).forEach((x) => n.append("cat", x)); })} className="h-4 w-4 accent-[#7c4ddb]" />
                {c}
              </label>
            ))}
          </fieldset>
          <div>
            <label htmlFor="lp-precio" className="mb-1 block text-sm font-semibold">Precio máximo</label>
            <input id="lp-precio" type="range" min={100000} max={PRECIO_MAX} step={10000} value={precio} onChange={(e) => poner((n) => (Number(e.target.value) >= PRECIO_MAX ? n.delete("precio") : n.set("precio", e.target.value)))} className="w-full accent-[#7c4ddb]" />
            <p className="text-sm text-white/70" aria-live="polite">Hasta {formatoCLP(precio)}</p>
          </div>
          <fieldset className="space-y-1">
            <legend className="mb-2 text-sm font-semibold">Características</legend>
            <label className="flex items-center gap-2.5 text-sm"><input type="checkbox" checked={exterior} onChange={(e) => poner((n) => (e.target.checked ? n.set("exterior", "1") : n.delete("exterior")))} className="h-4 w-4 accent-[#7c4ddb]" />Apto exterior (IP65 o más)</label>
            <label className="flex items-center gap-2.5 text-sm"><input type="checkbox" checked={dmx} onChange={(e) => poner((n) => (e.target.checked ? n.set("dmx", "1") : n.delete("dmx")))} className="h-4 w-4 accent-[#7c4ddb]" />Control DMX</label>
          </fieldset>
          {hayFiltros && <button type="button" onClick={() => setParams({}, { replace: true })} className="text-sm font-semibold text-[#a98bf0] hover:underline">Quitar filtros</button>}
        </form>

        <div>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-white/70" role="status" aria-live="polite">{lista.length} {lista.length === 1 ? "equipo" : "equipos"}</p>
            <label className="flex items-center gap-2 text-sm">
              <span className="text-white/70">Ordenar</span>
              <select value={orden} onChange={(e) => poner((n) => (e.target.value === "relevancia" ? n.delete("orden") : n.set("orden", e.target.value)))} className="rounded-md border border-white/20 bg-[#17173f] px-3 py-2 text-sm">
                {Object.entries(ORDENES).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
              </select>
            </label>
          </div>
          {lista.length ? (
            <div className="mt-5 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">{lista.map((p) => <TarjetaProducto key={p.id} p={p} />)}</div>
          ) : (
            <div className="mt-5 rounded-xl border border-dashed border-white/25 p-12 text-center">
              <p className="font-semibold">Ningún equipo cumple esos filtros.</p>
              <button type="button" onClick={() => setParams({}, { replace: true })} className="mt-3 text-sm font-semibold text-[#a98bf0] hover:underline">Quitar filtros</button>
            </div>
          )}
        </div>
      </div>
    </Contenedor>
  );
}
