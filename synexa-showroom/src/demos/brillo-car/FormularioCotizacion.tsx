import { useState } from "react";
import { PAQUETES, TIPOS_VEHICULO } from "./datos";

interface Campos {
  nombre: string;
  telefono: string;
  vehiculo: string;
  paquete: string;
  mensaje: string;
}
const VACIO: Campos = { nombre: "", telefono: "", vehiculo: TIPOS_VEHICULO[0], paquete: "premium", mensaje: "" };

function validar(c: Campos): Partial<Record<keyof Campos, string>> {
  const e: Partial<Record<keyof Campos, string>> = {};
  if (c.nombre.trim().length < 2) e.nombre = "Escribe tu nombre.";
  if (c.telefono.replace(/\D/g, "").length < 8) e.telefono = "Ingresa un teléfono de al menos 8 dígitos.";
  return e;
}

/** Formulario demostrativo: no envía ni guarda ningún dato. */
export function FormularioCotizacion({ paqueteInicial }: { paqueteInicial?: string }) {
  const [c, setC] = useState<Campos>({ ...VACIO, paquete: paqueteInicial ?? VACIO.paquete });
  const [errores, setErrores] = useState<Partial<Record<keyof Campos, string>>>({});
  const [enviado, setEnviado] = useState<Campos | null>(null);

  const set = (k: keyof Campos) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setC((p) => ({ ...p, [k]: e.target.value }));

  if (enviado) {
    const paq = PAQUETES.find((p) => p.id === enviado.paquete);
    return (
      <div role="status" className="rounded-2xl bg-[#1d2027] p-8 ring-1 ring-[#2f6bff]/40">
        <p className="text-sm font-semibold uppercase tracking-widest text-[#6b95ff]">Solicitud de demostración</p>
        <h3 className="mt-2 text-2xl font-bold text-white">Gracias, {enviado.nombre.split(" ")[0]}.</h3>
        <p className="mt-3 text-white/75">
          En un sitio real, BrilloCar te respondería al {enviado.telefono} con un valor para el paquete <strong>{paq?.nombre}</strong> de tu {enviado.vehiculo.toLowerCase()}.
        </p>
        <p className="mt-4 rounded-lg bg-black/30 p-3 text-sm text-white/80">Esto es una demostración: no se envió ni se guardó ningún dato.</p>
        <button type="button" onClick={() => { setEnviado(null); setC({ ...VACIO }); }} className="mt-6 text-sm font-semibold text-[#6b95ff] hover:underline">
          Hacer otra solicitud
        </button>
      </div>
    );
  }

  return (
    <form
      noValidate
      onSubmit={(ev) => {
        ev.preventDefault();
        const e = validar(c);
        setErrores(e);
        if (!Object.keys(e).length) setEnviado(c);
      }}
      className="space-y-5 rounded-2xl bg-[#1d2027] p-6 ring-1 ring-white/10 sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Campo id="bc-nombre" etiqueta="Nombre" error={errores.nombre}>
          <input id="bc-nombre" value={c.nombre} onChange={set("nombre")} autoComplete="off" aria-invalid={!!errores.nombre} aria-describedby={errores.nombre ? "bc-nombre-e" : undefined} className={entrada} />
        </Campo>
        <Campo id="bc-telefono" etiqueta="Teléfono" error={errores.telefono}>
          <input id="bc-telefono" value={c.telefono} onChange={set("telefono")} inputMode="tel" autoComplete="off" aria-invalid={!!errores.telefono} aria-describedby={errores.telefono ? "bc-telefono-e" : undefined} className={entrada} />
        </Campo>
        <Campo id="bc-vehiculo" etiqueta="Tipo de vehículo">
          <select id="bc-vehiculo" value={c.vehiculo} onChange={set("vehiculo")} className={entrada}>
            {TIPOS_VEHICULO.map((t) => <option key={t}>{t}</option>)}
          </select>
        </Campo>
        <Campo id="bc-paquete" etiqueta="Paquete de interés">
          <select id="bc-paquete" value={c.paquete} onChange={set("paquete")} className={entrada}>
            {PAQUETES.map((p) => <option key={p.id} value={p.id}>{p.nombre}</option>)}
          </select>
        </Campo>
      </div>
      <Campo id="bc-mensaje" etiqueta="Mensaje (opcional)">
        <textarea id="bc-mensaje" rows={3} value={c.mensaje} onChange={set("mensaje")} className={entrada} />
      </Campo>
      <button type="submit" className="w-full rounded-lg bg-[#2a62f5] px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-white transition hover:bg-[#4a80ff] sm:w-auto">
        Solicitar cotización
      </button>
      <p className="text-xs text-white/80">Formulario demostrativo: no se envía ni se guarda ningún dato.</p>
    </form>
  );
}

const entrada = "w-full rounded-lg border border-white/15 bg-[#14161b] px-3.5 py-2.5 text-white placeholder-white/30 outline-none focus:border-[#2f6bff] focus:ring-2 focus:ring-[#2f6bff]/40";

function Campo({ id, etiqueta, error, children }: { id: string; etiqueta: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-white/80">{etiqueta}</label>
      {children}
      {error && <p id={`${id}-e`} className="mt-1.5 text-sm text-red-400">{error}</p>}
    </div>
  );
}
