/**
 * Modalidades de contratación y qué ocurre tras la entrega. Contenido
 * informativo: no modifica paquetes, precios ni demos. Los enlaces a
 * /mantenimiento-web y /contacto son del sitio principal, fuera de esta SPA
 * (por eso van como <a> y no como <Link>).
 */
const MODOS = [
  { titulo: "Desarrollo web", texto: "Pagas por el diseño y desarrollo del proyecto acordado. El valor depende del tipo de sitio y las funcionalidades contratadas." },
  { titulo: "Mantenimiento web", texto: "Puedes contratar posteriormente un servicio de mantenimiento y soporte. Es opcional y se cotiza o contrata por separado, según las necesidades de tu proyecto." },
];

const DESPUES = [
  "Recibes tu proyecto de acuerdo con el alcance contratado.",
  "Puedes gestionar tu sitio sin contratar mantenimiento de SYNEXA.",
  "Puedes solicitar asistencia o modificaciones adicionales, sujetas a evaluación y cotización.",
  "Puedes contratar un plan de mantenimiento periódico, si lo necesitas.",
];

export function Modalidades() {
  return (
    <section aria-labelledby="mod-titulo" className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <h2 id="mod-titulo" className="max-w-2xl font-display text-3xl font-semibold">¿Qué ocurre después de entregar tu sitio web?</h2>
      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {MODOS.map((m) => (
          <div key={m.titulo} className="rounded-2xl bg-surface p-6 ring-1 ring-line">
            <h3 className="text-lg font-bold">{m.titulo}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{m.texto}</p>
          </div>
        ))}
      </div>
      <ol className="mt-6 grid gap-x-8 gap-y-4 rounded-2xl p-6 ring-1 ring-line sm:grid-cols-2">
        {DESPUES.map((t, i) => (
          <li key={t} className="flex gap-3.5">
            <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-navy text-xs font-bold text-white">{i + 1}</span>
            <span className="pt-1 text-sm leading-relaxed text-muted">{t}</span>
          </li>
        ))}
      </ol>
      <p className="mt-5 text-xs leading-relaxed text-muted">
        Mantenimiento, hosting, dominio, garantía del trabajo entregado y nuevas funcionalidades son conceptos distintos:
        no se asumen incluidos salvo que la propuesta lo indique.
      </p>
      <a href="/mantenimiento-web" className="mt-5 inline-flex rounded-lg px-5 py-3 text-sm font-semibold text-navy ring-1 ring-inset ring-line hover:bg-surface">
        Consultar planes de mantenimiento
      </a>
    </section>
  );
}
