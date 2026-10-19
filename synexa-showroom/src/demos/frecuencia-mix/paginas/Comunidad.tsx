import { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { BASE, CANCIONES, COLOR, ENCUESTA, TRIVIA, USUARIOS } from "../datos";
import { useEstado } from "../estado";
import { Contenedor, Titulo, entrada } from "./Comun";

const TABS = [
  ["chat", "Chat"],
  ["votaciones", "Votaciones"],
  ["trivia", "Trivia"],
  ["dedicatorias", "Dedicatorias"],
] as const;
type TabId = (typeof TABS)[number][0];

export function Comunidad() {
  const [params, setParams] = useSearchParams();
  const t = params.get("tab");
  const tab: TabId = TABS.some(([id]) => id === t) ? (t as TabId) : "chat";

  return (
    <Contenedor>
      <Titulo etiqueta="Comunidad" texto="Todo es una simulación: los otros oyentes son personajes ficticios y nada se envía a un servidor.">Participa en la radio</Titulo>
      <div role="tablist" aria-label="Secciones de la comunidad" className="mt-8 flex flex-wrap gap-2 border-b border-white/10">
        {TABS.map(([id, nombre]) => (
          <button key={id} type="button" role="tab" id={`tab-${id}`} aria-selected={tab === id} aria-controls={`panel-${id}`} onClick={() => setParams({ tab: id }, { replace: true })} className={`-mb-px border-b-2 px-4 py-3 text-sm font-semibold ${tab === id ? "text-white" : "border-transparent text-white/80 hover:text-white"}`} style={tab === id ? { borderColor: COLOR.teal } : undefined}>
            {nombre}
          </button>
        ))}
      </div>
      <div role="tabpanel" id={`panel-${tab}`} aria-labelledby={`tab-${tab}`} className="mt-8">
        {tab === "chat" && <Chat />}
        {tab === "votaciones" && <Votaciones />}
        {tab === "trivia" && <Trivia />}
        {tab === "dedicatorias" && <Dedicatorias />}
      </div>
    </Contenedor>
  );
}

function Chat() {
  const { mensajes, enviarMensaje, silenciados } = useEstado();
  const [apodo, setApodo] = useState("Oyente demo");
  const [texto, setTexto] = useState("");
  const [aviso, setAviso] = useState("");
  const fin = useRef<HTMLDivElement>(null);
  const visibles = mensajes.filter((m) => !m.moderado || m.propio);

  useEffect(() => {
    fin.current?.scrollIntoView?.({ block: "end" });
  }, [mensajes.length]);

  const enviar = (ev: React.FormEvent) => {
    ev.preventDefault();
    const r = enviarMensaje(apodo.trim() || "Oyente demo", texto);
    if (!r.ok) return setAviso(r.motivo ?? "");
    setAviso("");
    setTexto("");
  };
  const ultimo = mensajes[mensajes.length - 1];

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_240px]">
      <section aria-label="Chat de la emisora" className="flex h-[26rem] flex-col rounded-xl ring-1 ring-white/10" style={{ background: COLOR.panel }}>
        <div role="log" aria-live="polite" aria-relevant="additions" className="flex-1 space-y-3 overflow-y-auto p-4">
          {visibles.map((m) => (
            <div key={m.id} className={`max-w-[85%] rounded-lg px-3 py-2 text-sm ${m.propio ? "ml-auto bg-[#14b8a6]/20" : "bg-white/10"}`}>
              <p className="text-xs font-semibold text-white/80">{m.autor} · {m.hora}</p>
              <p className="mt-0.5">{m.moderado ? <em className="text-white/80">Tu mensaje fue retenido por el filtro de moderación y no es visible para los demás.</em> : m.texto}</p>
            </div>
          ))}
          <div ref={fin} />
        </div>
        <form onSubmit={enviar} className="border-t border-white/10 p-3" aria-label="Enviar mensaje">
          <div className="flex flex-wrap gap-2">
            <label className="sr-only" htmlFor="fm-apodo">Tu apodo</label>
            <input id="fm-apodo" value={apodo} onChange={(e) => setApodo(e.target.value)} className={`${entrada} w-32 py-2`} maxLength={20} />
            <label className="sr-only" htmlFor="fm-msg">Mensaje</label>
            <input id="fm-msg" value={texto} onChange={(e) => setTexto(e.target.value)} placeholder="Escribe un mensaje…" className={`${entrada} min-w-0 flex-1 py-2`} maxLength={200} autoComplete="off" />
            <button type="submit" className="rounded-md px-5 py-2 text-sm font-bold text-[#070f2b]" style={{ background: COLOR.teal }}>Enviar</button>
          </div>
          <p className="mt-2 min-h-5 text-xs text-red-300" role="alert">{aviso}</p>
          {silenciados.includes(apodo.trim()) && <p className="text-xs text-white/80">Este apodo está silenciado por un moderador.</p>}
        </form>
      </section>
      <aside aria-label="Oyentes conectados" className="rounded-xl p-4 ring-1 ring-white/10" style={{ background: COLOR.panel }}>
        <h2 className="text-sm font-bold">En línea ({USUARIOS.length + 1})</h2>
        <ul className="mt-3 space-y-2 text-sm text-white/75">
          {USUARIOS.map((u) => <li key={u.id} className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-green-400" aria-hidden="true" />{u.nombre}</li>)}
          <li className="flex items-center gap-2 text-white"><span className="h-2 w-2 rounded-full bg-green-400" aria-hidden="true" />Tú</li>
        </ul>
        <p className="mt-4 text-xs text-white/80">Usuarios ficticios. Último mensaje: {ultimo?.hora}.</p>
      </aside>
    </div>
  );
}

function Votaciones() {
  const { voto, votar, resultados } = useEstado();
  return (
    <section aria-labelledby="fm-encuesta" className="max-w-2xl rounded-xl p-6 ring-1 ring-white/10" style={{ background: COLOR.panel }}>
      <h2 id="fm-encuesta" className="text-xl font-bold">{ENCUESTA.pregunta}</h2>
      {!voto ? (
        <fieldset className="mt-5 space-y-3">
          <legend className="sr-only">Elige una opción</legend>
          {ENCUESTA.opciones.map((o) => (
            <button key={o.id} type="button" onClick={() => votar(o.id)} className="block w-full rounded-lg px-4 py-3 text-left font-medium ring-1 ring-white/20 hover:bg-white/10">{o.texto}</button>
          ))}
        </fieldset>
      ) : (
        <div className="mt-5" role="status">
          <p className="mb-4 text-sm text-white/70">¡Gracias por votar! Resultados parciales (los demás votos son simulados):</p>
          <ul className="space-y-4">
            {resultados.map((r) => (
              <li key={r.id}>
                <div className="mb-1 flex justify-between text-sm"><span className={voto === r.id ? "font-bold" : ""}>{r.texto}{voto === r.id && " · tu voto"}</span><span className="tabular-nums">{r.pct} %</span></div>
                <div className="h-2.5 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full" style={{ width: `${r.pct}%`, background: voto === r.id ? COLOR.teal : COLOR.violeta }} /></div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}

function Trivia() {
  const [i, setI] = useState(0);
  const [puntos, setPuntos] = useState(0);
  const [elegida, setElegida] = useState<number | null>(null);
  const fin = i >= TRIVIA.length;

  if (fin) {
    return (
      <section role="status" className="max-w-xl rounded-xl p-8 text-center ring-1 ring-white/10" style={{ background: COLOR.panel }}>
        <p className="text-sm font-semibold uppercase tracking-wider" style={{ color: COLOR.tealClaro }}>Trivia terminada</p>
        <p className="mt-3 text-5xl font-extrabold tabular-nums">{puntos} / {TRIVIA.length}</p>
        <p className="mt-3 text-white/70">{puntos === TRIVIA.length ? "¡Perfecto! Eres un experto." : puntos >= 3 ? "¡Muy bien! Sabes de música." : "Buen intento. ¡Vuelve a jugar!"}</p>
        <button type="button" onClick={() => { setI(0); setPuntos(0); setElegida(null); }} className="mt-6 rounded-md px-6 py-3 text-sm font-bold text-[#070f2b]" style={{ background: COLOR.teal }}>Jugar de nuevo</button>
      </section>
    );
  }
  const p = TRIVIA[i];
  const respondida = elegida !== null;
  return (
    <section aria-labelledby="fm-trivia" className="max-w-2xl rounded-xl p-6 ring-1 ring-white/10" style={{ background: COLOR.panel }}>
      <p className="text-xs font-semibold uppercase tracking-wider text-white/80">Pregunta {i + 1} de {TRIVIA.length}</p>
      <h2 id="fm-trivia" className="mt-2 text-xl font-bold">{p.q}</h2>
      <ul className="mt-5 space-y-3">
        {p.opciones.map((o, k) => {
          const esCorrecta = k === p.correcta;
          const estilo = !respondida ? "ring-white/20 hover:bg-white/10" : esCorrecta ? "bg-green-500/20 ring-green-400" : k === elegida ? "bg-red-500/20 ring-red-400" : "ring-white/10 opacity-75";
          return (
            <li key={o}>
              <button type="button" disabled={respondida} onClick={() => { setElegida(k); if (esCorrecta) setPuntos((x) => x + 1); }} className={`block w-full rounded-lg px-4 py-3 text-left font-medium ring-1 ${estilo}`}>
                {o}{respondida && esCorrecta && <span className="sr-only"> (respuesta correcta)</span>}{respondida && k === elegida && !esCorrecta && <span className="sr-only"> (tu respuesta, incorrecta)</span>}
              </button>
            </li>
          );
        })}
      </ul>
      <div className="mt-5 flex items-center justify-between" aria-live="polite">
        <p className="text-sm">{respondida ? (elegida === p.correcta ? "¡Correcto!" : "Esa no era.") : ""}</p>
        {respondida && <button type="button" onClick={() => { setI((x) => x + 1); setElegida(null); }} className="rounded-md px-5 py-2.5 text-sm font-bold text-[#070f2b]" style={{ background: COLOR.teal }}>{i + 1 === TRIVIA.length ? "Ver resultado" : "Siguiente"}</button>}
      </div>
    </section>
  );
}

function Dedicatorias() {
  const { dedicatorias, enviarDedicatoria } = useEstado();
  const [c, setC] = useState({ para: "", de: "", mensaje: "", cancion: CANCIONES[0].titulo });
  const [err, setErr] = useState<{ para?: string; de?: string; mensaje?: string }>({});
  const [enviada, setEnviada] = useState(false);
  const aprobadas = dedicatorias.filter((d) => d.estado === "aprobada");
  const set = (k: keyof typeof c) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setC((p) => ({ ...p, [k]: e.target.value }));

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <form
        noValidate
        aria-label="Enviar dedicatoria"
        onSubmit={(ev) => {
          ev.preventDefault();
          const e: typeof err = {};
          if (!c.para.trim()) e.para = "¿Para quién es?";
          if (!c.de.trim()) e.de = "Dinos de parte de quién.";
          if (c.mensaje.trim().length < 5) e.mensaje = "Escribe un mensaje de al menos 5 caracteres.";
          setErr(e);
          if (Object.keys(e).length) return;
          enviarDedicatoria({ para: c.para.trim(), de: c.de.trim(), mensaje: c.mensaje.trim(), cancion: c.cancion });
          setC({ para: "", de: "", mensaje: "", cancion: CANCIONES[0].titulo });
          setEnviada(true);
        }}
        className="space-y-4 rounded-xl p-6 ring-1 ring-white/10"
        style={{ background: COLOR.panel }}
      >
        <h2 className="text-xl font-bold">Manda tu dedicatoria</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div><label htmlFor="fm-d-para" className="mb-1.5 block text-sm font-medium">Para</label><input id="fm-d-para" value={c.para} onChange={set("para")} aria-invalid={!!err.para} className={entrada} />{err.para && <p className="mt-1 text-sm text-red-300">{err.para}</p>}</div>
          <div><label htmlFor="fm-d-de" className="mb-1.5 block text-sm font-medium">De parte de</label><input id="fm-d-de" value={c.de} onChange={set("de")} aria-invalid={!!err.de} className={entrada} />{err.de && <p className="mt-1 text-sm text-red-300">{err.de}</p>}</div>
        </div>
        <div><label htmlFor="fm-d-cancion" className="mb-1.5 block text-sm font-medium">Canción</label><select id="fm-d-cancion" value={c.cancion} onChange={set("cancion")} className={entrada}>{CANCIONES.map((s) => <option key={s.titulo}>{s.titulo}</option>)}</select></div>
        <div><label htmlFor="fm-d-msg" className="mb-1.5 block text-sm font-medium">Mensaje</label><textarea id="fm-d-msg" rows={3} value={c.mensaje} onChange={set("mensaje")} aria-invalid={!!err.mensaje} className={entrada} />{err.mensaje && <p className="mt-1 text-sm text-red-300">{err.mensaje}</p>}</div>
        <button type="submit" className="rounded-md px-6 py-3 text-sm font-bold text-[#070f2b]" style={{ background: COLOR.teal }}>Enviar dedicatoria</button>
        {enviada && <p role="status" className="rounded-md bg-black/30 p-3 text-sm text-white/75">Dedicatoria enviada. Queda <strong>pendiente de moderación</strong>: un moderador debe aprobarla antes de que aparezca. Puedes hacerlo tú en el <Link to={`${BASE}/moderacion`} className="underline" style={{ color: COLOR.tealClaro }}>panel de moderación</Link>.</p>}
        <p className="text-xs text-white/80">Demostración: no se envía ni se guarda nada fuera de este navegador.</p>
      </form>
      <section aria-labelledby="fm-recientes">
        <h2 id="fm-recientes" className="text-xl font-bold">Dedicatorias recientes</h2>
        {aprobadas.length ? (
          <ul className="mt-4 space-y-3">
            {aprobadas.map((d) => (
              <li key={d.id} className="rounded-xl p-4 ring-1 ring-white/10" style={{ background: COLOR.panel }}>
                <p className="text-sm text-white/80">Para <strong className="text-white">{d.para}</strong>, de parte de {d.de}</p>
                <p className="mt-1">“{d.mensaje}”</p>
                <p className="mt-2 text-xs" style={{ color: COLOR.tealClaro }}>♪ {d.cancion}</p>
              </li>
            ))}
          </ul>
        ) : <p className="mt-4 rounded-xl border border-dashed border-white/25 p-6 text-white/65">Aún no hay dedicatorias aprobadas.</p>}
      </section>
    </div>
  );
}
