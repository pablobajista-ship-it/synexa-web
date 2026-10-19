import { Link } from "react-router-dom";
import { rutaAsset } from "@/utilidades/assets";
import { formatoCLP } from "@/utilidades/formato";
import { BASE, productoPorId, type Producto } from "../datos";
import { useComparador } from "../almacen";
import { BotonPrimario, Contenedor, Titulo } from "./Comun";

interface Fila { etiqueta: string; valor: (p: Producto) => string; /** Valor numérico y sentido en el que «mejor» es mayor o menor. */ num?: (p: Producto) => number; mejor?: "menor" | "mayor" }

const FILAS_BASE: Fila[] = [
  { etiqueta: "Precio", valor: (p) => formatoCLP(p.precio), num: (p) => p.precio, mejor: "menor" },
  { etiqueta: "Categoría", valor: (p) => p.categoria },
  { etiqueta: "Potencia", valor: (p) => `${p.potenciaW} W`, num: (p) => p.potenciaW, mejor: "mayor" },
  { etiqueta: "Peso", valor: (p) => `${String(p.pesoKg).replace(".", ",")} kg`, num: (p) => p.pesoKg, mejor: "menor" },
  { etiqueta: "Protección IP", valor: (p) => `IP${p.ip}`, num: (p) => p.ip, mejor: "mayor" },
  { etiqueta: "Control DMX", valor: (p) => (p.dmx ? "Sí" : "No") },
];

export function Comparar() {
  const { ids, quitar, vaciar } = useComparador();
  const items = ids.map(productoPorId).filter((p): p is Producto => !!p);

  if (items.length < 2) {
    return (
      <Contenedor className="max-w-2xl text-center">
        <Titulo etiqueta="Comparador">Compara equipos lado a lado</Titulo>
        <p className="mt-6 rounded-xl border border-dashed border-white/25 p-8 text-white/70">
          {items.length === 0 ? "Aún no has elegido equipos." : "Elige al menos un equipo más para compararlos."} Usa el botón «Comparar» en las tarjetas del catálogo (máximo 3).
        </p>
        {items.length === 1 && <p className="mt-4 text-sm text-white/70">Seleccionado: <strong>{items[0].nombre}</strong></p>}
        <div className="mt-6"><BotonPrimario to={`${BASE}/catalogo`}>Ir al catálogo</BotonPrimario></div>
      </Contenedor>
    );
  }

  const etiquetasExtra = [...new Set(items.flatMap((p) => Object.keys(p.specs)))];
  const filas: Fila[] = [...FILAS_BASE, ...etiquetasExtra.map<Fila>((e) => ({ etiqueta: e, valor: (p) => p.specs[e] ?? "—" }))];

  const esMejor = (f: Fila, p: Producto) => {
    if (!f.num || !f.mejor) return false;
    const valores = items.map(f.num);
    if (new Set(valores).size === 1) return false;
    const objetivo = f.mejor === "menor" ? Math.min(...valores) : Math.max(...valores);
    return f.num(p) === objetivo;
  };

  return (
    <Contenedor>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <Titulo etiqueta="Comparador" texto="El valor resaltado indica el mejor en esa fila (menor precio y peso, mayor potencia y protección).">Comparando {items.length} equipos</Titulo>
        <button type="button" onClick={vaciar} className="text-sm font-semibold text-[#a98bf0] hover:underline">Vaciar comparador</button>
      </div>
      <div className="mt-8 overflow-x-auto rounded-xl ring-1 ring-white/10">
        <table className="w-full min-w-[640px] border-collapse text-left text-sm">
          <caption className="sr-only">Comparación de especificaciones</caption>
          <thead>
            <tr className="bg-[#17173f]">
              <td className="w-40 p-4" />
              {items.map((p) => (
                <th key={p.id} scope="col" className="p-4 align-top font-normal">
                  <img src={rutaAsset(p.imagen)} alt="" className="mb-3 aspect-square w-28 rounded-lg object-cover" />
                  <Link to={`${BASE}/equipo/${p.id}`} className="block font-bold hover:text-[#a98bf0]">{p.nombre}</Link>
                  <button type="button" onClick={() => quitar(p.id)} className="mt-2 text-xs font-semibold text-white/80 hover:text-white" aria-label={`Quitar ${p.nombre} del comparador`}>Quitar</button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {filas.map((f) => (
              <tr key={f.etiqueta}>
                <th scope="row" className="bg-[#12123a] p-4 font-medium text-white/65">{f.etiqueta}</th>
                {items.map((p) => (
                  <td key={p.id} className={`p-4 ${esMejor(f, p) ? "font-bold text-[#c4b0ff]" : ""}`}>
                    {f.valor(p)}{esMejor(f, p) && <span className="sr-only"> (mejor valor)</span>}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Contenedor>
  );
}
