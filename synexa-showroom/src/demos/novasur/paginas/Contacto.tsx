import { useState } from "react";
import { CONTACTO, SERVICIOS } from "../datos";
import { Contenedor, Encabezado } from "./Comun";

interface Campos { nombre: string; empresa: string; correo: string; servicio: string; mensaje: string }
const VACIO: Campos = { nombre: "", empresa: "", correo: "", servicio: SERVICIOS[0].id, mensaje: "" };

const entrada = "w-full rounded-md border border-[#b9c8ce] bg-white px-3.5 py-2.5 outline-none focus:border-[#246b7a] focus:ring-2 focus:ring-[#246b7a]/30";

export function Contacto() {
  const [c, setC] = useState<Campos>(VACIO);
  const [err, setErr] = useState<Partial<Record<keyof Campos, string>>>({});
  const [ok, setOk] = useState(false);
  const set = (k: keyof Campos) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setC((p) => ({ ...p, [k]: e.target.value }));

  const enviar = (ev: React.FormEvent) => {
    ev.preventDefault();
    const e: typeof err = {};
    if (c.nombre.trim().length < 2) e.nombre = "Escribe tu nombre.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(c.correo)) e.correo = "Ingresa un correo válido.";
    if (c.mensaje.trim().length < 10) e.mensaje = "Cuéntanos un poco más (mínimo 10 caracteres).";
    setErr(e);
    if (!Object.keys(e).length) setOk(true);
  };

  return (
    <>
      <Encabezado etiqueta="Contacto" titulo="Conversemos sobre tu proyecto." texto="Cuéntanos qué necesitas y un ingeniero de nuestro equipo te responderá." />
      <Contenedor>
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr]">
          {ok ? (
            <div role="status" className="rounded-xl bg-[#e8eef0] p-8">
              <h2 className="font-display text-2xl font-semibold">Gracias por escribirnos, {c.nombre.split(" ")[0]}.</h2>
              <p className="mt-3 text-[#3c5560]">En un sitio real, tu consulta llegaría al equipo comercial de NovaSur y te responderíamos a {c.correo}.</p>
              <p className="mt-4 rounded-md bg-white p-3 text-sm text-[#5b727b]">Esto es una demostración: no se envió ni se guardó ningún dato.</p>
              <button type="button" onClick={() => { setC(VACIO); setOk(false); }} className="mt-5 text-sm font-semibold text-[#246b7a] hover:underline">Enviar otra consulta</button>
            </div>
          ) : (
            <form noValidate onSubmit={enviar} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="ns-nombre" className="mb-1.5 block text-sm font-medium">Nombre</label>
                  <input id="ns-nombre" value={c.nombre} onChange={set("nombre")} aria-invalid={!!err.nombre} aria-describedby={err.nombre ? "ns-nombre-e" : undefined} className={entrada} />
                  {err.nombre && <p id="ns-nombre-e" className="mt-1.5 text-sm text-red-700">{err.nombre}</p>}
                </div>
                <div>
                  <label htmlFor="ns-empresa" className="mb-1.5 block text-sm font-medium">Empresa (opcional)</label>
                  <input id="ns-empresa" value={c.empresa} onChange={set("empresa")} className={entrada} />
                </div>
                <div>
                  <label htmlFor="ns-correo" className="mb-1.5 block text-sm font-medium">Correo</label>
                  <input id="ns-correo" type="email" value={c.correo} onChange={set("correo")} aria-invalid={!!err.correo} aria-describedby={err.correo ? "ns-correo-e" : undefined} className={entrada} />
                  {err.correo && <p id="ns-correo-e" className="mt-1.5 text-sm text-red-700">{err.correo}</p>}
                </div>
                <div>
                  <label htmlFor="ns-servicio" className="mb-1.5 block text-sm font-medium">Servicio de interés</label>
                  <select id="ns-servicio" value={c.servicio} onChange={set("servicio")} className={entrada}>{SERVICIOS.map((s) => <option key={s.id} value={s.id}>{s.titulo}</option>)}</select>
                </div>
              </div>
              <div>
                <label htmlFor="ns-mensaje" className="mb-1.5 block text-sm font-medium">Mensaje</label>
                <textarea id="ns-mensaje" rows={5} value={c.mensaje} onChange={set("mensaje")} aria-invalid={!!err.mensaje} aria-describedby={err.mensaje ? "ns-mensaje-e" : undefined} className={entrada} />
                {err.mensaje && <p id="ns-mensaje-e" className="mt-1.5 text-sm text-red-700">{err.mensaje}</p>}
              </div>
              <button type="submit" className="rounded-md bg-[#246b7a] px-7 py-3 text-sm font-semibold text-white hover:bg-[#236a7a]">Enviar consulta</button>
              <p className="text-xs text-[#5b727b]">Formulario demostrativo: no se envía ni se guarda ningún dato.</p>
            </form>
          )}
          <aside className="h-fit rounded-xl bg-[#e8eef0] p-6 text-sm leading-relaxed">
            <h2 className="font-bold">Oficina central</h2>
            <address className="mt-3 not-italic text-[#3c5560]">{CONTACTO.direccion}</address>
            <p className="mt-4"><strong>Teléfono:</strong> {CONTACTO.telefono}</p>
            <p><strong>Correo:</strong> {CONTACTO.correo}</p>
            <p className="mt-4"><strong>Horario:</strong> {CONTACTO.horario}</p>
            <p className="mt-4 text-xs text-[#5b727b]">Datos de contacto ficticios.</p>
          </aside>
        </div>
      </Contenedor>
    </>
  );
}
