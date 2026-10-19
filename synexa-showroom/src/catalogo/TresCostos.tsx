const COSTOS = [
  { n: "1", titulo: "Desarrollo", cobro: "Pago por proyecto", texto: "El diseño y desarrollo de tu solución. Es el precio base que ves en cada paquete." },
  { n: "2", titulo: "Infraestructura y servicios externos", cobro: "Costo recurrente de terceros", texto: "Dominio, alojamiento, base de datos, correo o pagos. Los prestan empresas externas y te los informamos antes de empezar." },
  { n: "3", titulo: "Continuidad y soporte", cobro: "Servicio mensual SYNEXA", texto: "Administración, mantenimiento y evolución una vez que tu solución está funcionando." },
];

export function TresCostos() {
  return (
    <section className="bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <h2 className="max-w-2xl font-display text-3xl font-semibold">Tres conceptos, nunca mezclados en un precio ambiguo</h2>
        <div className="mt-8 grid gap-px overflow-hidden rounded-2xl bg-line ring-1 ring-line md:grid-cols-3">
          {COSTOS.map((c) => (
            <div key={c.n} className="bg-white p-6">
              <span className="font-display text-4xl font-semibold text-teal">{c.n}</span>
              <h3 className="mt-3 text-lg font-bold">{c.titulo}</h3>
              <p className="text-xs font-semibold uppercase tracking-wider text-blue">{c.cobro}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted">{c.texto}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
