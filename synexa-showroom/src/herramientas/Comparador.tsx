import { Link, useSearchParams } from "react-router-dom";
import { IVA_LABEL, PAQUETES, POR_DEFINIR, lineaPorId } from "@/datos/catalogo";
import { MAX_COMPARAR, conceptosDeLimite, incluyeUnico, leerIdsComparar } from "@/datos/cotizacion";
import { formatoCLP, formatoPlazo } from "@/utilidades/formato";

const celda = "border-t border-line p-4 align-top text-sm";

export function Comparador() {
  const [params, setParams] = useSearchParams();
  const ids = leerIdsComparar(params);
  const elegidos = ids.map((id) => PAQUETES.find((p) => p.id === id)!);
  const unicos = incluyeUnico(elegidos);
  const disponibles = PAQUETES.filter((p) => !ids.includes(p.id));

  const fijar = (nuevos: string[]) => setParams(nuevos.length ? { ids: nuevos.join(",") } : {}, { replace: true });

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-dark">Comparador</p>
      <h1 className="mt-2 font-display text-4xl font-semibold">Compara hasta {MAX_COMPARAR} paquetes</h1>
      <p className="mt-3 max-w-2xl text-muted">Pon lado a lado precio, alcance, límites y plazos. Lo que el documento comercial vigente aún no define aparece como «{POR_DEFINIR}».</p>

      <div className="mt-8 flex flex-wrap items-end gap-3">
        {ids.length < MAX_COMPARAR && (
          <label className="w-full text-sm font-medium sm:w-auto">
            Agregar un paquete
            <select
              className="mt-1 block w-full max-w-full rounded-lg sm:min-w-72 border border-line bg-white px-3 py-2.5"
              value=""
              onChange={(e) => e.target.value && fijar([...ids, e.target.value])}
            >
              <option value="">Elige un paquete…</option>
              {disponibles.map((p) => <option key={p.id} value={p.id}>{p.nombre} — {lineaPorId(p.linea).nombre}</option>)}
            </select>
          </label>
        )}
        {ids.length > 0 && <button type="button" onClick={() => fijar([])} className="rounded-lg px-4 py-2.5 text-sm font-semibold text-blue ring-1 ring-inset ring-line hover:bg-surface">Quitar todos</button>}
      </div>

      {elegidos.length < 2 ? (
        <p role="status" className="mt-10 rounded-2xl border border-dashed border-line p-10 text-center text-muted">
          {elegidos.length === 0 ? "Elige al menos dos paquetes para compararlos." : "Elige un segundo paquete para empezar la comparación."}
        </p>
      ) : (
        <div className="relative mt-10 overflow-x-auto rounded-2xl ring-1 ring-line">
          <table className="w-full min-w-[640px] border-collapse text-left">
            <caption className="sr-only">Comparación de paquetes</caption>
            <thead>
              <tr className="bg-surface">
                <td className="w-44 p-4" />
                {elegidos.map((p) => (
                  <th key={p.id} scope="col" className="p-4 align-top">
                    <p className="text-xs font-semibold uppercase tracking-wider text-teal-dark">{lineaPorId(p.linea).nombre}</p>
                    <Link to={`/servicios-y-precios/${p.id}`} className="mt-1 block text-lg font-bold hover:text-blue">{p.nombre}</Link>
                    <button type="button" onClick={() => fijar(ids.filter((x) => x !== p.id))} className="mt-2 text-xs font-semibold text-blue hover:underline" aria-label={`Quitar ${p.nombre} de la comparación`}>Quitar</button>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr><th scope="row" className={`${celda} font-semibold`}>Precio base</th>{elegidos.map((p) => <td key={p.id} className={celda}><span className="font-display text-xl font-semibold tabular-nums">{formatoCLP(p.precio)}</span> <span className="text-xs text-muted">{IVA_LABEL}</span></td>)}</tr>
              <tr><th scope="row" className={`${celda} font-semibold`}>Para quién</th>{elegidos.map((p) => <td key={p.id} className={celda}>{p.publico}</td>)}</tr>
              <tr><th scope="row" className={`${celda} font-semibold`}>Plazo de entrega</th>{elegidos.map((p) => <td key={p.id} className={celda}>{formatoPlazo(p.plazoSemanas) ?? POR_DEFINIR}</td>)}</tr>
              <tr><th scope="row" className={`${celda} font-semibold`}>Puesta en marcha</th>{elegidos.map((p) => <td key={p.id} className={celda}>{p.puestaEnMarcha ? `${p.puestaEnMarcha} días` : POR_DEFINIR}</td>)}</tr>
              {conceptosDeLimite(elegidos).map((c) => (
                <tr key={c}><th scope="row" className={`${celda} font-semibold`}>{c}</th>{elegidos.map((p) => <td key={p.id} className={celda}>{p.limites.find((l) => l.concepto === c)?.valor ?? POR_DEFINIR}</td>)}</tr>
              ))}
              <tr><th scope="row" className={`${celda} font-semibold`}>Lo que solo incluye este paquete</th>{elegidos.map((p) => (
                <td key={p.id} className={celda}>{unicos.get(p.id)!.size ? <ul className="space-y-1.5">{[...unicos.get(p.id)!].map((i) => <li key={i} className="flex gap-2"><span aria-hidden="true" className="font-bold text-teal-dark">✓</span>{i}</li>)}</ul> : <span className="text-muted">Nada exclusivo frente a los otros elegidos.</span>}</td>
              ))}</tr>
              <tr><th scope="row" className={`${celda} font-semibold`}>Incluye</th>{elegidos.map((p) => <td key={p.id} className={celda}><ul className="space-y-1.5">{p.incluye.map((i) => <li key={i} className="flex gap-2"><span aria-hidden="true" className="font-bold text-teal-dark">✓</span>{i}</li>)}</ul></td>)}</tr>
              <tr><th scope="row" className={`${celda} font-semibold`}>No incluye</th>{elegidos.map((p) => <td key={p.id} className={celda}><ul className="space-y-1.5 text-muted">{p.noIncluye.map((i) => <li key={i} className="flex gap-2"><span aria-hidden="true">–</span>{i}</li>)}</ul></td>)}</tr>
              <tr><th scope="row" className={`${celda} font-semibold`}>Costos externos posibles</th>{elegidos.map((p) => <td key={p.id} className={celda}><ul className="space-y-1.5 text-muted">{p.costosExternos.map((i) => <li key={i}>{i}</li>)}</ul></td>)}</tr>
              <tr><th scope="row" className={`${celda} font-semibold`}>Probar</th>{elegidos.map((p) => <td key={p.id} className={celda}><Link to={`/demos/${p.demo}`} className="font-semibold text-blue hover:underline">Ver demostración</Link><br /><Link to={`/servicios-y-precios/arma-tu-solucion?paquete=${p.id}`} className="font-semibold text-blue hover:underline">Armar con este paquete</Link></td>)}</tr>
            </tbody>
          </table>
        </div>
      )}
      <p className="mt-6 text-xs text-muted">Precios netos en pesos chilenos, referenciales y sujetos a validación del alcance.</p>
    </div>
  );
}
