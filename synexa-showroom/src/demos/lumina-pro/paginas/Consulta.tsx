import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { EVENTOS, PRODUCTOS } from "../datos";
import { Contenedor, Titulo } from "./Comun";

interface Campos { nombre: string; correo: string; equipo: string; evento: string; mensaje: string }
const entrada = "w-full rounded-md border border-white/20 bg-[#0d0d2b] px-3.5 py-2.5 text-white placeholder-white/35 outline-none focus:border-[#7c4ddb] focus:ring-2 focus:ring-[#7c4ddb]/40";

/** Formulario de consulta demostrativo: no envía ni guarda ningún dato. */
export function FormularioConsulta({ equipoInicial = "", titulo = true }: { equipoInicial?: string; titulo?: boolean }) {
  const [c, setC] = useState<Campos>({ nombre: "", correo: "", equipo: equipoInicial, evento: "", mensaje: "" });
  const [err, setErr] = useState<Partial<Record<keyof Campos, string>>>({});
  const [ok, setOk] = useState(false);
  const set = (k: keyof Campos) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setC((p) => ({ ...p, [k]: e.target.value }));
  const equipo = PRODUCTOS.find((p) => p.id === c.equipo);

  if (ok) {
    return (
      <div role="status" className="rounded-xl bg-[#17173f] p-7 ring-1 ring-[#7c4ddb]/50">
        <h2 className="text-xl font-bold">Consulta recibida, {c.nombre.split(" ")[0]}.</h2>
        <p className="mt-3 text-white/75">En un sitio real, un asesor de Lúmina Pro te escribiría a {c.correo}{equipo ? ` sobre «${equipo.nombre}»` : ""}.</p>
        <p className="mt-4 rounded-md bg-black/30 p-3 text-sm text-white/80">Esto es una demostración: no se envió ni se guardó ningún dato.</p>
        <button type="button" onClick={() => { setOk(false); setC({ nombre: "", correo: "", equipo: "", evento: "", mensaje: "" }); }} className="mt-5 text-sm font-semibold text-[#a98bf0] hover:underline">Hacer otra consulta</button>
      </div>
    );
  }

  return (
    <form
      noValidate
      aria-label="Consulta comercial"
      onSubmit={(ev) => {
        ev.preventDefault();
        const e: typeof err = {};
        if (c.nombre.trim().length < 2) e.nombre = "Escribe tu nombre.";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(c.correo)) e.correo = "Ingresa un correo válido.";
        setErr(e);
        if (!Object.keys(e).length) setOk(true);
      }}
      className="space-y-5 rounded-xl bg-[#17173f] p-6 ring-1 ring-white/10"
    >
      {titulo && <h2 className="text-xl font-bold">Consulta comercial</h2>}
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="lp-c-nombre" className="mb-1.5 block text-sm font-medium">Nombre</label>
          <input id="lp-c-nombre" value={c.nombre} onChange={set("nombre")} aria-invalid={!!err.nombre} aria-describedby={err.nombre ? "lp-c-nombre-e" : undefined} className={entrada} />
          {err.nombre && <p id="lp-c-nombre-e" className="mt-1.5 text-sm text-red-300">{err.nombre}</p>}
        </div>
        <div>
          <label htmlFor="lp-c-correo" className="mb-1.5 block text-sm font-medium">Correo</label>
          <input id="lp-c-correo" type="email" value={c.correo} onChange={set("correo")} aria-invalid={!!err.correo} aria-describedby={err.correo ? "lp-c-correo-e" : undefined} className={entrada} />
          {err.correo && <p id="lp-c-correo-e" className="mt-1.5 text-sm text-red-300">{err.correo}</p>}
        </div>
        <div>
          <label htmlFor="lp-c-equipo" className="mb-1.5 block text-sm font-medium">Equipo de interés</label>
          <select id="lp-c-equipo" value={c.equipo} onChange={set("equipo")} className={entrada}>
            <option value="">Aún no lo sé</option>
            {PRODUCTOS.map((p) => <option key={p.id} value={p.id}>{p.nombre}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="lp-c-evento" className="mb-1.5 block text-sm font-medium">Tipo de evento</label>
          <select id="lp-c-evento" value={c.evento} onChange={set("evento")} className={entrada}>
            <option value="">Selecciona…</option>
            {EVENTOS.map((e) => <option key={e.id} value={e.id}>{e.nombre}</option>)}
          </select>
        </div>
      </div>
      <div>
        <label htmlFor="lp-c-mensaje" className="mb-1.5 block text-sm font-medium">Mensaje (opcional)</label>
        <textarea id="lp-c-mensaje" rows={3} value={c.mensaje} onChange={set("mensaje")} className={entrada} />
      </div>
      <button type="submit" className="rounded-md bg-[#7c4ddb] px-6 py-3 text-sm font-semibold hover:bg-[#8b5fe6]">Enviar consulta</button>
      <p className="text-xs text-white/80">Formulario demostrativo: no se envía ni se guarda ningún dato.</p>
    </form>
  );
}

export function Consulta() {
  const [params] = useSearchParams();
  return (
    <Contenedor className="max-w-3xl">
      <Titulo etiqueta="Consultas" texto="Cuéntanos qué necesitas y un asesor te ayudará a elegir.">Habla con un asesor</Titulo>
      <div className="mt-8"><FormularioConsulta equipoInicial={params.get("equipo") ?? ""} titulo={false} /></div>
    </Contenedor>
  );
}
