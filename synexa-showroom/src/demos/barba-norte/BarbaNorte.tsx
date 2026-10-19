import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { Link, NavLink, Route, Routes } from "react-router-dom";
import { IsotipoMarca } from "@/componentes/IsotipoMarca";
import { marcaPorId } from "@/datos/marcas";
import { rutaAsset } from "@/utilidades/assets";
import { MenuMovil, ScrollArriba, soloDigitos, usePersistente } from "../compartido/utiles";
import {
  APERTURA, BARBEROS, BASE, C, CIERRE, PASO_MIN, SERVICIOS, aISO, barberoPorId, clp, codigoReserva, desdeISO, fechaLarga, hhmm,
  horasDisponibles, minutos, ocupadoSimulado, proximosDias, servicioPorId, type Reserva,
} from "./agenda";

const marca = marcaPorId("barba-norte")!;
export const CLAVE_RESERVAS = "synexa:barba-norte:reservas";

interface Ctx { reservas: Reserva[]; agregar: (r: Omit<Reserva, "id" | "codigo">) => Reserva; cancelar: (id: string) => void }
const Contexto = createContext<Ctx | null>(null);
const useReservas = () => { const c = useContext(Contexto); if (!c) throw new Error("falta ProveedorReservas"); return c; };

function ProveedorReservas({ children }: { children: ReactNode }) {
  const [reservas, setReservas] = usePersistente<Reserva[]>(CLAVE_RESERVAS, []);
  const valor = useMemo<Ctx>(() => ({
    reservas,
    agregar: (r) => {
      const n = reservas.length + 1;
      const nueva: Reserva = { ...r, id: `r${Date.now()}${n}`, codigo: codigoReserva(n) };
      setReservas((p) => [...p, nueva]);
      return nueva;
    },
    cancelar: (id) => setReservas((p) => p.filter((x) => x.id !== id)),
  }), [reservas, setReservas]);
  return <Contexto.Provider value={valor}>{children}</Contexto.Provider>;
}

const Cont = ({ children, className = "" }: { children: ReactNode; className?: string }) => <div className={`mx-auto max-w-6xl px-4 py-14 ${className}`}>{children}</div>;
const Boton = ({ to, children, claro = false }: { to: string; children: ReactNode; claro?: boolean }) => (
  <Link to={to} className="inline-flex rounded-sm px-7 py-3.5 text-sm font-bold uppercase tracking-wider transition-opacity hover:opacity-90" style={claro ? { background: C.beige, color: C.negro } : { background: C.cobre, color: "#fff" }}>{children}</Link>
);
const Titulo = ({ pre, children, sobreClaro = false }: { pre?: string; children: ReactNode; sobreClaro?: boolean }) => (
  <div>{pre && <p className="text-xs font-bold uppercase tracking-[0.3em]" style={{ color: sobreClaro ? "#8a4f1d" : C.cobreClaro }}>{pre}</p>}<h2 className="mt-2 font-display text-3xl font-semibold sm:text-4xl">{children}</h2></div>
);

function Cabecera() {
  const MENU = [["", "Inicio"], ["reservar", "Reservar"], ["panel", "Panel de agenda"]] as const;
  const estilo = ({ isActive }: { isActive: boolean }) => `rounded px-3 py-2 text-sm font-semibold uppercase tracking-wider ${isActive ? "text-white" : "text-white/80 hover:text-white"}`;
  return (
    <header className="sticky top-11 z-40 border-b border-white/10 text-white" style={{ background: C.negro }}>
      <div className="relative"><div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link to={BASE} className="flex items-center gap-3" aria-label="Barba Norte, inicio"><IsotipoMarca marca={marca} size={34} /><span className="font-display text-xl font-semibold tracking-wide">Barba Norte</span></Link>
        <nav aria-label="Principal" className="hidden md:flex">{MENU.map(([r, t]) => <NavLink key={r} to={r ? `${BASE}/${r}` : BASE} end={r === ""} className={estilo}>{t}</NavLink>)}</nav>
        <MenuMovil id="bn-menu"><ul style={{ background: C.negro }}>{MENU.map(([r, t]) => <li key={r}><NavLink to={r ? `${BASE}/${r}` : BASE} end={r === ""} className="block rounded px-3 py-3 text-white">{t}</NavLink></li>)}</ul></MenuMovil>
      </div></div>
    </header>
  );
}

function Inicio() {
  return (
    <>
      <section className="relative isolate overflow-hidden text-white">
        <img src={rutaAsset("assets/barba-norte/hero.webp")} alt="" className="absolute inset-0 -z-10 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />
        <div className="mx-auto max-w-6xl px-4 py-28 sm:py-36">
          <p className="text-xs font-bold uppercase tracking-[0.3em]" style={{ color: C.cobreClaro }}>Barbería clásica</p>
          <h1 className="mt-4 max-w-xl font-display text-5xl font-semibold leading-[1.05] sm:text-6xl">Corte, barba y tiempo para ti.</h1>
          <p className="mt-6 max-w-lg text-lg text-white/80">Elige a tu barbero, escoge el horario y reserva en menos de un minuto.</p>
          <div className="mt-9"><Boton to={`${BASE}/reservar`}>Reservar hora</Boton></div>
        </div>
      </section>
      <section style={{ background: C.carbon }} className="text-white"><Cont>
        <Titulo pre="Servicios y precios">Lo que hacemos</Titulo>
        <ul className="mt-10 divide-y divide-white/10 border-y border-white/10">
          {SERVICIOS.map((s) => (
            <li key={s.id} className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-5">
              <div><h3 className="font-display text-xl font-semibold">{s.nombre}</h3><p className="mt-1 text-sm text-white/80">{s.texto}</p></div>
              <p className="text-right"><strong className="text-lg tabular-nums" style={{ color: C.cobreClaro }}>{clp(s.precio)}</strong><span className="block text-xs text-white/80">{s.min} min</span></p>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-xs text-white/80">Precios de demostración.</p>
      </Cont></section>
      <section style={{ background: C.negro }} className="text-white"><Cont>
        <Titulo pre="El equipo">Tu barbero</Titulo>
        <ul className="mt-10 grid gap-6 sm:grid-cols-3">
          {BARBEROS.map((b) => <li key={b.id}><img src={rutaAsset(b.imagen)} alt={b.alt} loading="lazy" className="aspect-[4/5] w-full rounded-sm object-cover object-top" /><h3 className="mt-4 font-display text-xl font-semibold">{b.nombre}</h3><p className="text-sm text-white/80">{b.especialidad}</p></li>)}
        </ul>
        <div className="mt-12 grid gap-3 sm:grid-cols-3">
          {["corte-1", "corte-2", "corte-3"].map((c) => <img key={c} src={rutaAsset(`assets/barba-norte/${c}.webp`)} alt="Barbero trabajando con un cliente" loading="lazy" className="aspect-[4/5] w-full rounded-sm object-cover" />)}
        </div>
      </Cont></section>
      <section style={{ background: C.beige, color: C.negro }}><Cont className="grid items-center gap-8 md:grid-cols-2">
        <img src={rutaAsset("assets/barba-norte/local.webp")} alt="Sala de espera con sofá de cuero" loading="lazy" className="aspect-[4/3] w-full rounded-sm object-cover" />
        <div><Titulo pre="Visítanos" sobreClaro>Martes a sábado, 10:00 a 20:00</Titulo><p className="mt-4 opacity-80">Av. del Norte 1020, Ciudad Ficticia. Dirección y datos ficticios.</p><div className="mt-6"><Boton to={`${BASE}/reservar`}>Reservar ahora</Boton></div></div>
      </Cont></section>
    </>
  );
}

const PASOS = ["Servicio", "Barbero", "Fecha y hora", "Tus datos"] as const;
const chip = "rounded-sm px-4 py-3 text-left text-sm ring-1 transition-colors";

function Reservar() {
  const { reservas, agregar } = useReservas();
  const [paso, setPaso] = useState(0);
  const [servicio, setServicio] = useState("");
  const [barbero, setBarbero] = useState("");
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [err, setErr] = useState<Record<string, string>>({});
  const [lista, setLista] = useState<Reserva | null>(null);

  const ahora = new Date();
  const dias = useMemo(() => proximosDias(ahora), []); // eslint-disable-line react-hooks/exhaustive-deps
  const srv = servicioPorId(servicio);
  const horas = srv && barbero && fecha ? horasDisponibles(reservas, barbero, fecha, srv.min, ahora) : [];
  const campo = "w-full rounded-sm border border-white/20 bg-[#121212] px-3.5 py-3 text-white outline-none focus:border-[#96592a] focus:ring-2 focus:ring-[#96592a]/40";

  if (lista) {
    const s = servicioPorId(lista.servicio)!, b = barberoPorId(lista.barbero)!;
    return (
      <Cont className="max-w-2xl text-white">
        <div role="status" className="rounded-sm p-8 ring-1 ring-[#96592a]/60" style={{ background: C.carbon }}>
          <p className="text-xs font-bold uppercase tracking-[0.3em]" style={{ color: C.cobreClaro }}>Reserva de demostración</p>
          <h1 className="mt-2 font-display text-3xl font-semibold">¡Listo, {lista.nombre.split(" ")[0]}!</h1>
          <dl className="mt-6 divide-y divide-white/10 text-sm">
            {([["Código", lista.codigo], ["Servicio", `${s.nombre} (${s.min} min)`], ["Barbero", b.nombre], ["Fecha", fechaLarga(lista.fecha)], ["Hora", lista.hora], ["Valor", clp(s.precio)]] as const).map(([k, v]) => <div key={k} className="flex justify-between gap-4 py-2.5"><dt className="text-white/80">{k}</dt><dd className="text-right font-medium">{v}</dd></div>)}
          </dl>
          <p className="mt-6 rounded-sm bg-black/30 p-3 text-sm text-white/65">Esta reserva es una simulación: no se creó ninguna cita real. Puedes verla y cancelarla en el panel de agenda.</p>
          <div className="mt-6 flex flex-wrap gap-3"><Boton to={`${BASE}/panel`}>Ver en el panel</Boton><button type="button" onClick={() => { setLista(null); setPaso(0); setServicio(""); setBarbero(""); setFecha(""); setHora(""); }} className="rounded-sm px-6 py-3.5 text-sm font-bold uppercase tracking-wider ring-1 ring-inset ring-white/30 hover:bg-white/10">Otra reserva</button></div>
        </div>
      </Cont>
    );
  }

  const siguiente = () => {
    if (paso === 0 && !servicio) return setErr({ paso: "Elige un servicio para continuar." });
    if (paso === 1 && !barbero) return setErr({ paso: "Elige un barbero para continuar." });
    if (paso === 2 && (!fecha || !hora)) return setErr({ paso: "Elige una fecha y una hora." });
    setErr({});
    setPaso(paso + 1);
  };
  const confirmar = (ev: React.FormEvent) => {
    ev.preventDefault();
    const x: Record<string, string> = {};
    if (nombre.trim().length < 2) x.nombre = "Escribe tu nombre.";
    if (soloDigitos(telefono).length < 8) x.telefono = "Ingresa un teléfono de al menos 8 dígitos.";
    setErr(x);
    if (Object.keys(x).length) return;
    // Revalida por si la hora dejó de estar libre.
    if (!horasDisponibles(reservas, barbero, fecha, srv!.min, new Date()).includes(hora)) return setErr({ paso: "Esa hora ya no está disponible. Elige otra." }), setPaso(2);
    setLista(agregar({ servicio, barbero, fecha, hora, nombre: nombre.trim(), telefono: telefono.trim() }));
  };

  return (
    <Cont className="max-w-3xl text-white">
      <h1 className="font-display text-3xl font-semibold sm:text-4xl">Reservar hora</h1>
      <ol className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm" aria-label="Pasos">
        {PASOS.map((p, i) => <li key={p} aria-current={i === paso ? "step" : undefined} className={i === paso ? "font-bold" : "text-white/80"} style={i === paso ? { color: C.cobreClaro } : undefined}>{i + 1}. {p}</li>)}
      </ol>
      <div className="mt-8 rounded-sm p-6 ring-1 ring-white/10" style={{ background: C.carbon }}>
        {paso === 0 && (
          <fieldset><legend className="mb-4 font-semibold">¿Qué servicio quieres?</legend><div className="grid gap-3 sm:grid-cols-2">
            {SERVICIOS.map((s) => <label key={s.id} className={`${chip} cursor-pointer has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-[#d9955a] ${servicio === s.id ? "bg-[#96592a]/20 ring-[#96592a]" : "ring-white/15 hover:ring-white/40"}`}><input type="radio" name="servicio" className="sr-only" checked={servicio === s.id} onChange={() => { setServicio(s.id); setHora(""); }} /><span className="block font-semibold">{s.nombre}</span><span className="text-white/80">{s.min} min · {clp(s.precio)}</span></label>)}
          </div></fieldset>
        )}
        {paso === 1 && (
          <fieldset><legend className="mb-4 font-semibold">¿Con quién?</legend><div className="grid gap-3 sm:grid-cols-3">
            {BARBEROS.map((b) => <label key={b.id} className={`${chip} cursor-pointer has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-[#d9955a] ${barbero === b.id ? "bg-[#96592a]/20 ring-[#96592a]" : "ring-white/15 hover:ring-white/40"}`}><input type="radio" name="barbero" className="sr-only" checked={barbero === b.id} onChange={() => { setBarbero(b.id); setHora(""); }} /><img src={rutaAsset(b.imagen)} alt="" className="mb-3 aspect-square w-full rounded-sm object-cover object-top" /><span className="block font-semibold">{b.nombre}</span><span className="text-xs text-white/80">{b.especialidad}</span></label>)}
          </div></fieldset>
        )}
        {paso === 2 && (
          <div>
            <p className="mb-3 font-semibold">Elige el día</p>
            <div className="flex flex-wrap gap-2" role="group" aria-label="Días disponibles">
              {dias.map((d) => { const f = desdeISO(d.iso); return (
                <button key={d.iso} type="button" disabled={!d.abierto} aria-pressed={fecha === d.iso} onClick={() => { setFecha(d.iso); setHora(""); }} className={`w-[4.25rem] rounded-sm px-2 py-2 text-center text-xs ring-1 disabled:cursor-not-allowed disabled:opacity-30 ${fecha === d.iso ? "bg-[#96592a] ring-[#96592a]" : "ring-white/20 hover:ring-white/50"}`}>
                  <span className="block uppercase">{f.toLocaleDateString("es-CL", { weekday: "short" })}</span><strong className="text-base">{f.getDate()}</strong><span className="sr-only"> de {f.toLocaleDateString("es-CL", { month: "long" })}{!d.abierto && ", cerrado"}</span>
                </button>); })}
            </div>
            <p className="mb-3 mt-6 font-semibold">Elige la hora</p>
            {!fecha ? <p className="text-sm text-white/80">Primero elige un día.</p> : horas.length ? (
              <div className="flex flex-wrap gap-2" role="group" aria-label="Horas disponibles">{horas.map((h) => <button key={h} type="button" aria-pressed={hora === h} onClick={() => setHora(h)} className={`rounded-sm px-4 py-2 text-sm tabular-nums ring-1 ${hora === h ? "bg-[#96592a] ring-[#96592a]" : "ring-white/20 hover:ring-white/50"}`}>{h}</button>)}</div>
            ) : <p className="rounded-sm bg-black/30 p-4 text-sm text-white/65" role="status">No quedan horas libres ese día para este servicio. Prueba con otro día u otro barbero.</p>}
          </div>
        )}
        {paso === 3 && srv && (
          <form noValidate onSubmit={confirmar} aria-label="Datos de la reserva" className="space-y-4">
            <p className="rounded-sm bg-black/30 p-3 text-sm text-white/75"><strong>{srv.nombre}</strong> con {barberoPorId(barbero)?.nombre} · <span className="capitalize">{fechaLarga(fecha)}</span> a las {hora} · {clp(srv.precio)}</p>
            <div><label htmlFor="bn-nombre" className="mb-1.5 block text-sm font-medium">Nombre</label><input id="bn-nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} aria-invalid={!!err.nombre} aria-describedby={err.nombre ? "bn-nombre-e" : undefined} className={campo} />{err.nombre && <p id="bn-nombre-e" className="mt-1.5 text-sm text-red-300">{err.nombre}</p>}</div>
            <div><label htmlFor="bn-tel" className="mb-1.5 block text-sm font-medium">Teléfono</label><input id="bn-tel" inputMode="tel" value={telefono} onChange={(e) => setTelefono(e.target.value)} aria-invalid={!!err.telefono} aria-describedby={err.telefono ? "bn-tel-e" : undefined} className={campo} />{err.telefono && <p id="bn-tel-e" className="mt-1.5 text-sm text-red-300">{err.telefono}</p>}</div>
            <p className="text-xs text-white/80">Demostración: no uses datos reales. No se envía ni se guarda nada fuera de este navegador.</p>
            <button type="submit" className="rounded-sm px-7 py-3.5 text-sm font-bold uppercase tracking-wider text-white" style={{ background: C.cobre }}>Confirmar reserva</button>
          </form>
        )}
        {err.paso && <p role="alert" className="mt-4 text-sm text-red-300">{err.paso}</p>}
        <div className="mt-6 flex justify-between">
          <button type="button" disabled={paso === 0} onClick={() => { setErr({}); setPaso(paso - 1); }} className="rounded-sm px-5 py-2.5 text-sm font-semibold ring-1 ring-inset ring-white/25 hover:bg-white/10 disabled:invisible">Atrás</button>
          {paso < 3 && <button type="button" onClick={siguiente} className="rounded-sm px-6 py-2.5 text-sm font-bold uppercase tracking-wider text-white" style={{ background: C.cobre }}>Continuar</button>}
        </div>
      </div>
    </Cont>
  );
}

function Panel() {
  const { reservas, cancelar } = useReservas();
  const abiertos = useMemo(() => proximosDias(new Date()).filter((d) => d.abierto), []);
  const [dia, setDia] = useState(abiertos[0]?.iso ?? aISO(new Date()));
  const mias = [...reservas].sort((a, b) => (a.fecha + a.hora).localeCompare(b.fecha + b.hora));
  const filas: number[] = [];
  for (let m = APERTURA * 60; m < CIERRE * 60; m += PASO_MIN) filas.push(m);
  const reservaEn = (b: string, m: number) => reservas.find((r) => r.barbero === b && r.fecha === dia && minutos(r.hora) === m);
  const cubierta = (b: string, m: number) => reservas.some((r) => r.barbero === b && r.fecha === dia && m > minutos(r.hora) && m < minutos(r.hora) + (servicioPorId(r.servicio)?.min ?? PASO_MIN));
  return (
    <Cont className="text-white">
      <div className="rounded-sm bg-[#2b2400] p-3 text-sm text-[#f3d77a]" role="note"><strong>Panel de demostración.</strong> Así vería la agenda el equipo de Barba Norte. Los bloques «Ocupado» son clientes simulados; «Reiniciar demo» borra tus reservas.</div>
      <h1 className="mt-8 font-display text-3xl font-semibold">Panel de agenda</h1>

      <section aria-labelledby="bn-mias" className="mt-8">
        <h2 id="bn-mias" className="text-lg font-semibold">Tus reservas ({mias.length})</h2>
        {mias.length ? (
          <ul className="mt-4 divide-y divide-white/10 rounded-sm ring-1 ring-white/10" style={{ background: C.carbon }}>
            {mias.map((r) => <li key={r.id} className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 text-sm"><span><strong>{r.codigo}</strong> · {servicioPorId(r.servicio)?.nombre} con {barberoPorId(r.barbero)?.nombre} · <span className="capitalize">{fechaLarga(r.fecha)}</span> {r.hora} · {r.nombre}</span><button type="button" onClick={() => cancelar(r.id)} className="font-semibold text-red-300 hover:underline" aria-label={`Cancelar reserva ${r.codigo}`}>Cancelar</button></li>)}
          </ul>
        ) : <p className="mt-4 rounded-sm border border-dashed border-white/25 p-6 text-sm text-white/80">Aún no tienes reservas. Haz una desde <Link to={`${BASE}/reservar`} className="underline" style={{ color: C.cobreClaro }}>Reservar hora</Link>.</p>}
      </section>

      <section aria-labelledby="bn-dia" className="mt-12">
        <h2 id="bn-dia" className="text-lg font-semibold">Agenda del día</h2>
        <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Día">
          {abiertos.map((d) => { const f = desdeISO(d.iso); return <button key={d.iso} type="button" aria-pressed={dia === d.iso} onClick={() => setDia(d.iso)} className={`rounded-sm px-3 py-2 text-xs ring-1 ${dia === d.iso ? "bg-[#96592a] ring-[#96592a]" : "ring-white/20 hover:ring-white/50"}`}><span className="uppercase">{f.toLocaleDateString("es-CL", { weekday: "short" })}</span> <strong>{f.getDate()}</strong></button>; })}
        </div>
        <div className="mt-5 overflow-x-auto rounded-sm ring-1 ring-white/10">
          <table className="w-full min-w-[560px] border-collapse text-left text-xs">
            <caption className="sr-only">Agenda por barbero</caption>
            <thead style={{ background: C.carbon }}><tr><th scope="col" className="p-3 font-semibold text-white/80">Hora</th>{BARBEROS.map((b) => <th key={b.id} scope="col" className="p-3 font-semibold">{b.nombre}</th>)}</tr></thead>
            <tbody>
              {filas.map((m) => (
                <tr key={m} className="border-t border-white/10">
                  <th scope="row" className="p-2.5 font-normal tabular-nums text-white/80">{hhmm(m)}</th>
                  {BARBEROS.map((b) => {
                    const r = reservaEn(b.id, m);
                    if (r) return <td key={b.id} className="p-2.5 font-semibold" style={{ background: "#96592a44" }}>{r.nombre} · {servicioPorId(r.servicio)?.nombre}</td>;
                    if (cubierta(b.id, m)) return <td key={b.id} className="p-2.5 text-white/80" style={{ background: "#96592a22" }}>(continúa)</td>;
                    return ocupadoSimulado(b.id, dia, m) ? <td key={b.id} className="bg-white/5 p-2.5 text-white/80">Ocupado</td> : <td key={b.id} className="p-2.5 text-green-300/80">Libre</td>;
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </Cont>
  );
}

export default function BarbaNorte() {
  return (
    <ProveedorReservas>
      <div style={{ background: C.negro, color: "#fff" }}>
        <ScrollArriba />
        <Cabecera />
        <main className="min-h-[60vh]">
          <Routes>
            <Route index element={<Inicio />} />
            <Route path="reservar" element={<Reservar />} />
            <Route path="panel" element={<Panel />} />
            <Route path="*" element={<Cont className="text-center"><h1 className="font-display text-3xl font-semibold">Página no encontrada</h1><div className="mt-6"><Boton to={BASE}>Volver al inicio</Boton></div></Cont>} />
          </Routes>
        </main>
        <footer className="border-t border-white/10 bg-black"><div className="mx-auto max-w-6xl px-4 py-9 text-sm text-white/80"><p className="font-display text-lg text-white">Barba Norte</p><p className="mt-5 text-xs text-white/80">Barba Norte es un negocio ficticio creado para una demostración de SYNEXA. Las reservas son simuladas. Fotografías generadas con IA.</p></div></footer>
      </div>
    </ProveedorReservas>
  );
}
