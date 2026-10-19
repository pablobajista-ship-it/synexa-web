import { useState } from "react";
import { Link } from "react-router-dom";
import { BASE, type Noticia } from "../datos";
import { fechaLarga, useNoticias } from "../almacen";
import { Contenedor } from "./Comun";

const hoy = () => new Date().toISOString().slice(0, 10);
const nueva = (): Noticia => ({ id: `n${Date.now()}`, titulo: "", fecha: hoy(), resumen: "", cuerpo: "", publicada: false });
const entrada = "w-full rounded-md border border-[#b9c8ce] bg-white px-3 py-2 outline-none focus:border-[#246b7a] focus:ring-2 focus:ring-[#246b7a]/30";

/** Administración de contenidos simulada: los cambios viven solo en este navegador. */
export function Admin() {
  const { noticias, guardar, eliminar, alternar } = useNoticias();
  const [edit, setEdit] = useState<Noticia | null>(null);
  const [error, setError] = useState("");

  const lista = [...noticias].sort((a, b) => b.fecha.localeCompare(a.fecha));

  const enviar = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!edit) return;
    if (edit.titulo.trim().length < 5) return setError("El título debe tener al menos 5 caracteres.");
    if (edit.resumen.trim().length < 5) return setError("Escribe un resumen.");
    guardar({ ...edit, titulo: edit.titulo.trim(), resumen: edit.resumen.trim(), cuerpo: edit.cuerpo.trim() || edit.resumen.trim() });
    setError("");
    setEdit(null);
  };

  return (
    <Contenedor>
      <div className="rounded-md bg-[#fff6dd] p-3 text-sm text-[#6b5200]" role="note">
        <strong>Panel de demostración.</strong> Aquí se muestra cómo el equipo de NovaSur administraría sus noticias. Los cambios se guardan solo en este navegador; «Reiniciar demo» los borra.
      </div>
      <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-display text-3xl font-semibold">Administrar noticias</h1>
        <button type="button" onClick={() => { setEdit(nueva()); setError(""); }} className="rounded-md bg-[#246b7a] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#236a7a]">Nueva noticia</button>
      </div>

      {edit && (
        <form onSubmit={enviar} noValidate className="mt-6 space-y-4 rounded-xl bg-[#e8eef0] p-6" aria-label="Editar noticia">
          <div>
            <label htmlFor="ad-titulo" className="mb-1 block text-sm font-medium">Título</label>
            <input id="ad-titulo" value={edit.titulo} onChange={(e) => setEdit({ ...edit, titulo: e.target.value })} className={entrada} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="ad-fecha" className="mb-1 block text-sm font-medium">Fecha</label>
              <input id="ad-fecha" type="date" value={edit.fecha} onChange={(e) => setEdit({ ...edit, fecha: e.target.value })} className={entrada} />
            </div>
            <label className="flex items-center gap-3 self-end pb-2 text-sm font-medium">
              <input type="checkbox" checked={edit.publicada} onChange={(e) => setEdit({ ...edit, publicada: e.target.checked })} className="h-4 w-4 accent-[#246b7a]" />
              Publicada en el sitio
            </label>
          </div>
          <div>
            <label htmlFor="ad-resumen" className="mb-1 block text-sm font-medium">Resumen</label>
            <input id="ad-resumen" value={edit.resumen} onChange={(e) => setEdit({ ...edit, resumen: e.target.value })} className={entrada} />
          </div>
          <div>
            <label htmlFor="ad-cuerpo" className="mb-1 block text-sm font-medium">Texto (separa párrafos con una línea en blanco)</label>
            <textarea id="ad-cuerpo" rows={5} value={edit.cuerpo} onChange={(e) => setEdit({ ...edit, cuerpo: e.target.value })} className={entrada} />
          </div>
          {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
          <div className="flex gap-3">
            <button type="submit" className="rounded-md bg-[#0e3b4a] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#0a2833]">Guardar</button>
            <button type="button" onClick={() => { setEdit(null); setError(""); }} className="rounded-md px-5 py-2.5 text-sm font-semibold ring-1 ring-inset ring-[#b9c8ce] hover:bg-white">Cancelar</button>
          </div>
        </form>
      )}

      {lista.length ? (
        <div className="mt-8 overflow-x-auto rounded-xl ring-1 ring-[#d3dde1]">
          <table className="w-full min-w-[640px] text-left text-sm">
            <caption className="sr-only">Noticias del sitio</caption>
            <thead className="bg-[#e8eef0] text-xs uppercase tracking-wider text-[#3c5560]">
              <tr><th scope="col" className="px-4 py-3">Título</th><th scope="col" className="px-4 py-3">Fecha</th><th scope="col" className="px-4 py-3">Estado</th><th scope="col" className="px-4 py-3 text-right">Acciones</th></tr>
            </thead>
            <tbody className="divide-y divide-[#d3dde1]">
              {lista.map((n) => (
                <tr key={n.id}>
                  <td className="px-4 py-3 font-medium">{n.publicada ? <Link to={`${BASE}/noticias/${n.id}`} className="hover:text-[#246b7a] hover:underline">{n.titulo || "(sin título)"}</Link> : n.titulo || "(sin título)"}</td>
                  <td className="px-4 py-3 text-[#5b727b]">{fechaLarga(n.fecha)}</td>
                  <td className="px-4 py-3"><span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${n.publicada ? "bg-[#d9f0e4] text-[#14663f]" : "bg-[#eceff1] text-[#4a5a61]"}`}>{n.publicada ? "Publicada" : "Borrador"}</span></td>
                  <td className="space-x-3 px-4 py-3 text-right">
                    <button type="button" onClick={() => alternar(n.id)} className="font-semibold text-[#246b7a] hover:underline">{n.publicada ? "Despublicar" : "Publicar"}</button>
                    <button type="button" onClick={() => { setEdit(n); setError(""); }} className="font-semibold text-[#246b7a] hover:underline">Editar</button>
                    <button type="button" onClick={() => eliminar(n.id)} className="font-semibold text-red-700 hover:underline" aria-label={`Eliminar ${n.titulo}`}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="mt-8 rounded-xl border border-dashed border-[#c3d0d5] p-10 text-center text-[#5b727b]">No hay noticias. Crea la primera con «Nueva noticia».</p>
      )}
    </Contenedor>
  );
}
