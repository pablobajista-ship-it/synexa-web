import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { IVA_LABEL, NECESIDADES, PAQUETES, lineaPorId, moduloPorId } from "@/datos/catalogo";
import { aParametros, cotizar, leerSeleccion, type Seleccion } from "@/datos/cotizacion";
import { PLANES_INFRA, PLANES_SOPORTE } from "@/datos/infraSoporte";
import type { NecesidadId } from "@/datos/tipos";
import { formatoCLP } from "@/utilidades/formato";

const Paso = ({ n, titulo, children }: { n: number; titulo: string; children: React.ReactNode }) => (
  <section className="border-t border-line py-8 first:border-t-0 first:pt-0">
    <h2 className="flex items-baseline gap-3 text-xl font-bold"><span className="font-display text-sm font-semibold text-teal-dark" aria-hidden="true">{String(n).padStart(2, "0")}</span>{titulo}</h2>
    <div className="mt-4">{children}</div>
  </section>
);

const tarjeta = (activa: boolean) => `block cursor-pointer rounded-xl p-4 ring-1 transition-colors ${activa ? "bg-blue/5 ring-2 ring-blue" : "ring-line hover:bg-surface"}`;
const precioPlan = (precio: number | null, desde: boolean) => (precio === null ? "Por cotizar" : `${desde ? "Desde " : ""}${formatoCLP(precio)} / mes`);

export function ArmaSolucion() {
  const [params, setParams] = useSearchParams();
  const sel = leerSeleccion(params);
  const [necesidad, setNecesidad] = useState<NecesidadId | "">("");
  const c = cotizar(sel);
  const visibles = useMemo(() => PAQUETES.filter((p) => !necesidad || p.necesidades.includes(necesidad) || p.id === sel.paquete), [necesidad, sel.paquete]);

  const fijar = (s: Seleccion) => setParams(aParametros(s), { replace: true });
  const elegirPaquete = (id: string) => fijar({ ...sel, paquete: id, modulos: [] });
  const alternarModulo = (id: string) => fijar({ ...sel, modulos: sel.modulos.includes(id) ? sel.modulos.filter((m) => m !== id) : [...sel.modulos, id] });
  const resumenUrl = `/servicios-y-precios/resumen?${aParametros(sel).toString()}`;

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-dark">Arma tu solución</p>
      <h1 className="mt-2 font-display text-4xl font-semibold">Estima tu proyecto en cuatro pasos</h1>
      <p className="mt-3 max-w-2xl text-muted">Elige un paquete, suma módulos y planes mensuales, y obtén un resumen referencial. No se pide ningún dato personal ni se envía nada.</p>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_22rem]">
        <div>
          <Paso n={1} titulo="¿Qué necesitas resolver?">
            <div className="flex flex-wrap gap-2" role="group" aria-label="Necesidad">
              <button type="button" aria-pressed={!necesidad} onClick={() => setNecesidad("")} className={`rounded-full px-4 py-2 text-sm font-medium ${!necesidad ? "bg-navy text-white" : "bg-surface ring-1 ring-inset ring-line"}`}>Todas</button>
              {NECESIDADES.map((n) => <button key={n.id} type="button" aria-pressed={necesidad === n.id} onClick={() => setNecesidad(n.id)} className={`rounded-full px-4 py-2 text-sm font-medium ${necesidad === n.id ? "bg-navy text-white" : "bg-surface ring-1 ring-inset ring-line"}`}>{n.etiqueta}</button>)}
            </div>
          </Paso>

          <Paso n={2} titulo="Elige un paquete">
            <fieldset>
              <legend className="sr-only">Paquete</legend>
              <p className="mb-3 text-sm text-muted" role="status">{visibles.length} {visibles.length === 1 ? "paquete" : "paquetes"}</p>
              <div className="grid gap-3 sm:grid-cols-2">
                {visibles.map((p) => (
                  <label key={p.id} className={tarjeta(sel.paquete === p.id)}>
                    <input type="radio" name="paquete" className="sr-only" checked={sel.paquete === p.id} onChange={() => elegirPaquete(p.id)} />
                    <span className="block text-xs font-semibold uppercase tracking-wider text-teal-dark">{lineaPorId(p.linea).nombre}</span>
                    <span className="mt-1 block font-bold">{p.nombre}</span>
                    <span className="mt-1 block text-sm text-muted">{p.resumen}</span>
                    <span className="mt-2 block font-display text-lg font-semibold tabular-nums">{formatoCLP(p.precio)} <span className="text-xs font-medium text-muted">{IVA_LABEL}</span></span>
                  </label>
                ))}
              </div>
            </fieldset>
          </Paso>

          <Paso n={3} titulo="Módulos adicionales">
            {!c ? <p className="text-sm text-muted">Elige primero un paquete para ver los módulos que admite.</p> : (
              <fieldset>
                <legend className="sr-only">Módulos adicionales</legend>
                <ul className="grid gap-3 sm:grid-cols-2">
                  {c.paquete.modulos.map((id) => { const m = moduloPorId(id)!; const on = sel.modulos.includes(id); return (
                    <li key={id}><label className={tarjeta(on)}>
                      <span className="flex items-start gap-3"><input type="checkbox" className="mt-1" checked={on} onChange={() => alternarModulo(id)} />
                        <span><span className="block font-semibold">{m.nombre}</span><span className="mt-0.5 block text-sm text-muted">{m.descripcion}</span>
                          <span className="mt-1 block text-xs font-semibold uppercase tracking-wider text-blue">{m.precio ? formatoCLP(m.precio) : "Por cotizar"}</span></span></span>
                    </label></li>); })}
                </ul>
              </fieldset>
            )}
          </Paso>

          <Paso n={4} titulo="Infraestructura y soporte mensual (opcional)">
            <fieldset>
              <legend className="font-semibold">Infraestructura administrada</legend>
              <div className="mt-2 grid gap-3 sm:grid-cols-3">
                <label className={tarjeta(!sel.infra)}><input type="radio" name="infra" className="sr-only" checked={!sel.infra} onChange={() => fijar({ ...sel, infra: "" })} /><span className="font-semibold">Sin plan</span><span className="mt-1 block text-sm text-muted">Se informa el costo del proveedor antes de iniciar.</span></label>
                {PLANES_INFRA.map((p) => <label key={p.id} className={tarjeta(sel.infra === p.id)}><input type="radio" name="infra" className="sr-only" checked={sel.infra === p.id} onChange={() => fijar({ ...sel, infra: p.id })} /><span className="block font-semibold">{p.nombre}</span><span className="mt-1 block text-sm text-muted">{p.descripcion}</span><span className="mt-2 block text-sm font-semibold">{precioPlan(p.precio, p.desde)}</span></label>)}
              </div>
            </fieldset>
            <fieldset className="mt-6">
              <legend className="font-semibold">Continuidad y soporte</legend>
              <div className="mt-2 grid gap-3 sm:grid-cols-2">
                <label className={tarjeta(!sel.soporte)}><input type="radio" name="soporte" className="sr-only" checked={!sel.soporte} onChange={() => fijar({ ...sel, soporte: "" })} /><span className="font-semibold">Sin plan</span><span className="mt-1 block text-sm text-muted">Soporte por hora cuando lo necesites.</span></label>
                {PLANES_SOPORTE.map((p) => <label key={p.id} className={tarjeta(sel.soporte === p.id)}><input type="radio" name="soporte" className="sr-only" checked={sel.soporte === p.id} onChange={() => fijar({ ...sel, soporte: p.id })} /><span className="block font-semibold">{p.nombre}</span><span className="mt-1 block text-sm text-muted">{p.descripcion}</span><span className="mt-2 block text-sm font-semibold">{precioPlan(p.precio, p.desde)}</span></label>)}
              </div>
            </fieldset>
            <p className="mt-4 text-sm"><Link to="/servicios-y-precios/infraestructura-y-soporte" className="font-semibold text-blue hover:underline">Ver el detalle de cada plan</Link></p>
          </Paso>
        </div>

        <aside aria-label="Resumen de tu solución" className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-2xl bg-surface p-6 ring-1 ring-line">
            <h2 className="text-lg font-bold">Tu resumen</h2>
            {!c ? <p className="mt-3 text-sm text-muted">Aún no eliges un paquete.</p> : (
              <>
                <dl className="mt-4 space-y-2 border-y border-line py-4 text-sm">
                  <div className="flex justify-between gap-3"><dt>{c.paquete.nombre}</dt><dd className="font-semibold tabular-nums">{formatoCLP(c.paquete.precio)}</dd></div>
                  {c.modulosConPrecio.map((m) => <div key={m.id} className="flex justify-between gap-3"><dt>{m.nombre}</dt><dd className="font-semibold tabular-nums">{formatoCLP(m.precio ?? 0)}</dd></div>)}
                  {c.modulosPorCotizar.map((m) => <div key={m.id} className="flex justify-between gap-3"><dt>{m.nombre}</dt><dd className="text-muted">Por cotizar</dd></div>)}
                </dl>
                <dl className="mt-4 space-y-1.5 text-sm">
                  <div className="flex justify-between"><dt className="text-muted">Subtotal neto</dt><dd className="tabular-nums">{formatoCLP(c.neto)}</dd></div>
                  <div className="flex justify-between"><dt className="text-muted">IVA 19%</dt><dd className="tabular-nums">{formatoCLP(c.iva)}</dd></div>
                  <div className="flex justify-between border-t border-line pt-2 text-base font-bold"><dt>Total referencial</dt><dd className="tabular-nums">{formatoCLP(c.total)}</dd></div>
                </dl>
                {c.modulosPorCotizar.length > 0 && <p className="mt-3 text-xs text-muted">El total no incluye los módulos «Por cotizar».</p>}
                <dl className="mt-4 space-y-1.5 border-t border-line pt-4 text-sm">
                  <div className="flex justify-between gap-3"><dt className="text-muted">Infraestructura</dt><dd className="text-right">{c.infra ? precioPlan(c.infra.precio, c.infra.desde) : "No seleccionada"}</dd></div>
                  <div className="flex justify-between gap-3"><dt className="text-muted">Soporte</dt><dd className="text-right">{c.soporte ? precioPlan(c.soporte.precio, c.soporte.desde) : "No seleccionado"}</dd></div>
                </dl>
                <Link to={resumenUrl} className="mt-5 block rounded-lg bg-blue px-4 py-3 text-center text-sm font-semibold text-white hover:bg-blue-dark">Ver resumen para imprimir o copiar</Link>
              </>
            )}
            <p className="mt-4 text-xs text-muted">Estimación referencial sujeta a validación del alcance. No es una oferta vinculante.</p>
          </div>
        </aside>
      </div>
    </div>
  );
}
