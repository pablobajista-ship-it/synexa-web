import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { cotizar, leerSeleccion, textoResumen } from "@/datos/cotizacion";
import { formatoCLP, formatoPlazo } from "@/utilidades/formato";
import { POR_DEFINIR } from "@/datos/catalogo";

const precioPlan = (precio: number | null, desde: boolean) => (precio === null ? "Por cotizar" : `${desde ? "Desde " : ""}${formatoCLP(precio)} + IVA / mes`);

export function ResumenCotizacion() {
  const [params] = useSearchParams();
  const sel = leerSeleccion(params);
  const c = cotizar(sel);
  const [copiado, setCopiado] = useState<"si" | "error" | null>(null);

  if (!c) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center sm:px-6">
        <h1 className="font-display text-3xl font-semibold">Aún no hay una solución para resumir</h1>
        <p className="mt-3 text-muted">Arma tu solución eligiendo un paquete y vuelve aquí para imprimir o copiar el resumen.</p>
        <Link to="/servicios-y-precios/arma-tu-solucion" className="mt-6 inline-block rounded-lg bg-blue px-5 py-3 text-sm font-semibold text-white hover:bg-blue-dark">Armar mi solución</Link>
      </div>
    );
  }

  const copiar = async () => {
    try {
      await navigator.clipboard.writeText(textoResumen(c, formatoCLP));
      setCopiado("si");
    } catch {
      setCopiado("error");
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-dark">Resumen referencial</p>
      <h1 className="mt-2 font-display text-4xl font-semibold">{c.paquete.nombre}</h1>
      <p className="mt-2 text-muted">{c.paquete.resumen}</p>

      <section aria-labelledby="r-proy" className="mt-8">
        <h2 id="r-proy" className="text-lg font-bold">Pago por proyecto</h2>
        <table className="mt-3 w-full text-sm">
          <tbody className="divide-y divide-line border-y border-line">
            <tr><th scope="row" className="py-2.5 text-left font-normal">{c.paquete.nombre}</th><td className="py-2.5 text-right tabular-nums">{formatoCLP(c.paquete.precio)}</td></tr>
            {c.modulosConPrecio.map((m) => <tr key={m.id}><th scope="row" className="py-2.5 text-left font-normal">{m.nombre}</th><td className="py-2.5 text-right tabular-nums">{formatoCLP(m.precio ?? 0)}</td></tr>)}
            {c.modulosPorCotizar.map((m) => <tr key={m.id}><th scope="row" className="py-2.5 text-left font-normal">{m.nombre}</th><td className="py-2.5 text-right text-muted">Por cotizar</td></tr>)}
            <tr><th scope="row" className="py-2.5 text-left font-normal text-muted">Subtotal neto</th><td className="py-2.5 text-right tabular-nums">{formatoCLP(c.neto)}</td></tr>
            <tr><th scope="row" className="py-2.5 text-left font-normal text-muted">IVA 19%</th><td className="py-2.5 text-right tabular-nums">{formatoCLP(c.iva)}</td></tr>
            <tr className="font-bold"><th scope="row" className="py-3 text-left">Total referencial</th><td className="py-3 text-right tabular-nums">{formatoCLP(c.total)}</td></tr>
          </tbody>
        </table>
        {c.modulosPorCotizar.length > 0 && <p className="mt-2 text-xs text-muted">El total no incluye los módulos «Por cotizar»: aún no existe una tarifa aprobada para ellos.</p>}
        <p className="mt-2 text-sm text-muted">Plazo estimado: {formatoPlazo(c.paquete.plazoSemanas) ?? POR_DEFINIR}. Puesta en marcha: {c.paquete.puestaEnMarcha ? `${c.paquete.puestaEnMarcha} días` : POR_DEFINIR}.</p>
      </section>

      <section aria-labelledby="r-mes" className="mt-8">
        <h2 id="r-mes" className="text-lg font-bold">Servicios mensuales</h2>
        <ul className="mt-3 divide-y divide-line border-y border-line text-sm">
          <li className="flex justify-between gap-3 py-2.5"><span>{c.infra?.nombre ?? "Infraestructura administrada"}</span><span className="text-right text-muted">{c.infra ? precioPlan(c.infra.precio, c.infra.desde) : "No seleccionada"}</span></li>
          <li className="flex justify-between gap-3 py-2.5"><span>{c.soporte?.nombre ?? "Continuidad y soporte"}</span><span className="text-right text-muted">{c.soporte ? precioPlan(c.soporte.precio, c.soporte.desde) : "No seleccionado"}</span></li>
        </ul>
      </section>

      <section aria-labelledby="r-ter" className="mt-8">
        <h2 id="r-ter" className="text-lg font-bold">Costos de terceros (no incluidos)</h2>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-muted">{c.costosExternos.map((x) => <li key={x}>{x}</li>)}</ul>
      </section>

      <p className="mt-8 rounded-xl bg-surface p-4 text-sm ring-1 ring-line">Estimación referencial sujeta a validación del alcance. No es una oferta vinculante ni una cotización formal.</p>

      <div className="mt-6 flex flex-wrap gap-3 print:hidden">
        <button type="button" onClick={() => window.print()} className="rounded-lg bg-blue px-5 py-3 text-sm font-semibold text-white hover:bg-blue-dark">Imprimir o guardar como PDF</button>
        <button type="button" onClick={copiar} className="rounded-lg px-5 py-3 text-sm font-semibold ring-1 ring-inset ring-line hover:bg-surface">Copiar resumen</button>
        <Link to={`/servicios-y-precios/arma-tu-solucion?${params.toString()}`} className="rounded-lg px-5 py-3 text-sm font-semibold text-blue hover:underline">Volver a editar</Link>
      </div>
      <p className="mt-3 text-sm print:hidden" role="status" aria-live="polite">
        {copiado === "si" && "Resumen copiado al portapapeles."}
        {copiado === "error" && "No pudimos copiarlo automáticamente: usa «Imprimir» o selecciona el texto."}
      </p>
    </div>
  );
}
