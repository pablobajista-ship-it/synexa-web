import Image from "next/image";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";

const STATS = [
  { value: "+250", label: "Empresas confían en nosotros" },
  { value: "+500", label: "Proyectos realizados" },
  { value: "99%", label: "Satisfacción de clientes" },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[var(--color-navy)]">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(60% 60% at 85% 10%, rgba(37,99,235,0.35), transparent), radial-gradient(50% 50% at 100% 90%, rgba(20,184,166,0.3), transparent)",
        }}
      />

      <Container className="relative py-20 sm:py-28 grid lg:grid-cols-[1.1fr_0.9fr] gap-14 items-center">
        <div>
          <span className="inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.14em] text-[var(--color-teal)] mb-5">
            Tecnología que conecta tu negocio
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold leading-[1.08] text-white mb-6 text-balance">
            Soluciones digitales que hacen crecer tu empresa
          </h1>
          <p className="text-lg text-white/70 leading-relaxed mb-9 max-w-xl">
            Sitios web, bases de datos, e-commerce, portales y soluciones digitales a
            medida para empresas que quieren avanzar.
          </p>
          <div className="flex flex-wrap items-center gap-3 mb-14">
            <Button href="#contacto" variant="accent" size="lg">
              Hablemos
            </Button>
            <Button href="#soluciones" variant="on-dark-outline" size="lg">
              Ver soluciones
            </Button>
          </div>

          <dl className="grid grid-cols-3 gap-6 max-w-lg">
            {STATS.map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd className="text-2xl sm:text-3xl font-bold text-white">{stat.value}</dd>
                <dd className="text-[12px] text-white/55 leading-snug mt-1">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative hidden lg:block">
          <div className="absolute -inset-6 rounded-[2rem] bg-[var(--color-blue)]/20 blur-3xl" />
          <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-black/40">
            <Image
              src="/images/hero-synexa.webp"
              alt="Oficina moderna de SYNEXA, sala de reuniones con vista a la ciudad"
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
              priority
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, rgba(11,31,68,0) 40%, rgba(11,31,68,0.55) 100%), linear-gradient(90deg, rgba(11,31,68,0.25), transparent 30%)",
              }}
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
