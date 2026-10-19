import { Link, useParams } from "react-router-dom";
import { rutaAsset } from "@/utilidades/assets";
import { formatoCLP } from "@/utilidades/formato";
import { BASE, PRODUCTOS, productoPorId } from "../datos";
import { BotonComparar, BotonPrimario, Contenedor, TarjetaProducto } from "./Comun";
import { FormularioConsulta } from "./Consulta";

export function FichaEquipo() {
  const { id = "" } = useParams();
  const p = productoPorId(id);
  if (!p) {
    return (
      <Contenedor className="text-center">
        <h1 className="text-3xl font-bold">Equipo no encontrado</h1>
        <div className="mt-6"><BotonPrimario to={`${BASE}/catalogo`}>Ver el catálogo</BotonPrimario></div>
      </Contenedor>
    );
  }
  const filas: [string, string][] = [
    ["Categoría", p.categoria],
    ["Potencia", `${p.potenciaW} W`],
    ["Peso", `${p.pesoKg.toString().replace(".", ",")} kg`],
    ["Protección", `IP${p.ip}${p.ip >= 65 ? " (exterior)" : p.ip >= 44 ? " (resiste salpicaduras)" : " (interior)"}`],
    ["Control DMX", p.dmx ? "Sí" : "No"],
    ...Object.entries(p.specs),
  ];
  const relacionados = PRODUCTOS.filter((x) => x.categoria === p.categoria && x.id !== p.id).concat(PRODUCTOS.filter((x) => x.categoria !== p.categoria && x.id !== p.id)).slice(0, 4);

  return (
    <Contenedor>
      <nav aria-label="Ruta de navegación" className="mb-6 text-sm text-white/80">
        <Link to={`${BASE}/catalogo`} className="hover:text-white">← Catálogo</Link> <span aria-hidden="true">/</span> {p.categoria}
      </nav>
      <div className="grid gap-10 lg:grid-cols-2">
        <img src={rutaAsset(p.imagen)} alt={p.alt} className="aspect-square w-full rounded-2xl object-cover ring-1 ring-white/10" />
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-[#a98bf0]">{p.categoria}</p>
          <h1 className="mt-2 text-3xl font-bold leading-tight sm:text-4xl">{p.nombre}</h1>
          <p className="mt-4 text-white/75">{p.descripcion}</p>
          <p className="mt-6 text-3xl font-bold tabular-nums">{formatoCLP(p.precio)}</p>
          <p className="text-sm text-white/80">Precio referencial neto, + IVA. Sujeto a disponibilidad.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="#consultar" className="rounded-md bg-[#7c4ddb] px-6 py-3 text-sm font-semibold hover:bg-[#8b5fe6]">Consultar este equipo</a>
            <BotonComparar id={p.id} nombre={p.nombre} />
          </div>
          <h2 className="mb-3 mt-10 text-lg font-bold">Especificaciones</h2>
          <dl className="divide-y divide-white/10 rounded-xl bg-[#17173f] ring-1 ring-white/10">
            {filas.map(([k, v]) => (
              <div key={k} className="flex justify-between gap-4 px-4 py-3 text-sm"><dt className="text-white/80">{k}</dt><dd className="text-right font-medium">{v}</dd></div>
            ))}
          </dl>
        </div>
      </div>

      <section id="consultar" className="mt-16 scroll-mt-32 max-w-2xl">
        <FormularioConsulta equipoInicial={p.id} />
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-bold">También te puede interesar</h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{relacionados.map((r) => <TarjetaProducto key={r.id} p={r} />)}</div>
      </section>
    </Contenedor>
  );
}
