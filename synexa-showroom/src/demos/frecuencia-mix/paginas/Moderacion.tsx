import { useState } from "react";
import { COLOR } from "../datos";
import { useEstado } from "../estado";
import { Contenedor, Titulo, entrada } from "./Comun";

const boton = "rounded-md px-3 py-1.5 text-xs font-semibold ring-1 ring-inset ring-white/25 hover:bg-white/10";

/** Panel de moderación simulado: los cambios viven solo en este navegador. */
export function Moderacion() {
  const { dedicatorias, resolverDedicatoria, mensajes, restaurar, eliminarMensaje, silenciar, quitarSilencio, silenciados, palabras, agregarPalabra, quitarPalabra } = useEstado();
  const [nueva, setNueva] = useState("");
  const pendientes = dedicatorias.filter((d) => d.estado === "pendiente");
  const retenidos = mensajes.filter((m) => m.moderado);
  const autores = [...new Set(mensajes.map((m) => m.autor))];

  return (
    <Contenedor>
      <div className="rounded-md bg-[#2b2400] p-3 text-sm text-[#f3d77a]" role="note"><strong>Panel de demostración.</strong> Muestra cómo moderaría el equipo de la emisora. Todo ocurre en este navegador; «Reiniciar demo» lo borra.</div>
      <div className="mt-8"><Titulo etiqueta="Moderación">Cola de moderación</Titulo></div>

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <section aria-labelledby="mod-ded" className="rounded-xl p-6 ring-1 ring-white/10" style={{ background: COLOR.panel }}>
          <h2 id="mod-ded" className="text-lg font-bold">Dedicatorias pendientes ({pendientes.length})</h2>
          {pendientes.length ? (
            <ul className="mt-4 space-y-3">
              {pendientes.map((d) => (
                <li key={d.id} className="rounded-lg bg-black/25 p-3 text-sm">
                  <p>Para <strong>{d.para}</strong> · de {d.de}</p>
                  <p className="mt-1 text-white/75">“{d.mensaje}”</p>
                  <div className="mt-3 flex gap-2">
                    <button type="button" className={boton} onClick={() => resolverDedicatoria(d.id, "aprobada")} aria-label={`Aprobar dedicatoria de ${d.de}`}>Aprobar</button>
                    <button type="button" className={boton} onClick={() => resolverDedicatoria(d.id, "rechazada")} aria-label={`Rechazar dedicatoria de ${d.de}`}>Rechazar</button>
                  </div>
                </li>
              ))}
            </ul>
          ) : <p className="mt-4 text-sm text-white/80">No hay dedicatorias pendientes. Envía una desde la sección Comunidad para verla aquí.</p>}
        </section>

        <section aria-labelledby="mod-chat" className="rounded-xl p-6 ring-1 ring-white/10" style={{ background: COLOR.panel }}>
          <h2 id="mod-chat" className="text-lg font-bold">Mensajes retenidos por el filtro ({retenidos.length})</h2>
          {retenidos.length ? (
            <ul className="mt-4 space-y-3">
              {retenidos.map((m) => (
                <li key={m.id} className="rounded-lg bg-black/25 p-3 text-sm">
                  <p><strong>{m.autor}</strong> · {m.hora}</p>
                  <p className="mt-1 text-white/75">“{m.texto}”</p>
                  <div className="mt-3 flex gap-2">
                    <button type="button" className={boton} onClick={() => restaurar(m.id)}>Publicar</button>
                    <button type="button" className={boton} onClick={() => eliminarMensaje(m.id)}>Eliminar</button>
                  </div>
                </li>
              ))}
            </ul>
          ) : <p className="mt-4 text-sm text-white/80">Ningún mensaje retenido. Escribe una palabra bloqueada en el chat para probarlo.</p>}
        </section>

        <section aria-labelledby="mod-usu" className="rounded-xl p-6 ring-1 ring-white/10" style={{ background: COLOR.panel }}>
          <h2 id="mod-usu" className="text-lg font-bold">Usuarios</h2>
          <ul className="mt-4 divide-y divide-white/10 text-sm">
            {autores.map((a) => (
              <li key={a} className="flex items-center justify-between py-2">
                <span>{a}{silenciados.includes(a) && <span className="ml-2 rounded bg-red-500/20 px-2 py-0.5 text-xs text-red-200">Silenciado</span>}</span>
                {silenciados.includes(a)
                  ? <button type="button" className={boton} onClick={() => quitarSilencio(a)} aria-label={`Quitar silencio a ${a}`}>Quitar silencio</button>
                  : <button type="button" className={boton} onClick={() => silenciar(a)} aria-label={`Silenciar a ${a}`}>Silenciar</button>}
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="mod-pal" className="rounded-xl p-6 ring-1 ring-white/10" style={{ background: COLOR.panel }}>
          <h2 id="mod-pal" className="text-lg font-bold">Palabras bloqueadas</h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {palabras.map((p) => (
              <li key={p} className="flex items-center gap-1 rounded-full bg-white/10 py-1 pl-3 pr-1 text-sm">{p}<button type="button" onClick={() => quitarPalabra(p)} aria-label={`Quitar la palabra ${p}`} className="grid h-6 w-6 place-items-center rounded-full hover:bg-white/20">×</button></li>
            ))}
          </ul>
          <form className="mt-4 flex gap-2" onSubmit={(e) => { e.preventDefault(); agregarPalabra(nueva); setNueva(""); }} aria-label="Agregar palabra bloqueada">
            <label htmlFor="mod-nueva" className="sr-only">Nueva palabra</label>
            <input id="mod-nueva" value={nueva} onChange={(e) => setNueva(e.target.value)} placeholder="Nueva palabra" className={`${entrada} py-2`} />
            <button type="submit" className="rounded-md px-4 py-2 text-sm font-bold text-[#070f2b]" style={{ background: COLOR.teal }}>Agregar</button>
          </form>
        </section>
      </div>
    </Contenedor>
  );
}
