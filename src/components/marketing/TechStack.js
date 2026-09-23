import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/marketing/Reveal";
import {
  TechJavaScript,
  TechReact,
  TechNext,
  TechPostgres,
  TechSupabase,
  TechVercel,
  TechGitHub,
} from "@/components/marketing/techIcons";

/**
 * Tecnologías que realmente usamos. Se muestran como íconos
 * monocromáticos discretos —no como una "pared de logos"— y solo ganan
 * color de marca al hacer hover.
 */
const TECHS = [
  { icon: TechJavaScript, name: "JavaScript", role: "Lenguaje base" },
  { icon: TechReact, name: "React", role: "Interfaces" },
  { icon: TechNext, name: "Next.js", role: "Framework web" },
  { icon: TechPostgres, name: "PostgreSQL", role: "Base de datos" },
  { icon: TechSupabase, name: "Supabase", role: "Datos y autenticación" },
  { icon: TechVercel, name: "Vercel", role: "Despliegue" },
  { icon: TechGitHub, name: "GitHub", role: "Control de versiones" },
];

export default function TechStack() {
  return (
    <section className="section-pad bg-white border-t border-[var(--color-border)]/60">
      <Container>
        <Reveal className="max-w-[760px] mb-12 lg:mb-14">
          <Eyebrow>Tecnología</Eyebrow>
          <h2 className="text-[2rem] sm:text-[2.5rem] lg:text-[2.75rem] leading-[1.14] font-bold tracking-[-0.02em] text-[var(--color-navy)] mt-4 mb-5 text-balance">
            Tecnología moderna para soluciones que pueden crecer.
          </h2>
          <p className="text-[var(--color-gray-dark)] text-[17px] leading-[1.7]">
            Trabajamos con herramientas actuales que permiten construir soluciones
            rápidas, escalables y fáciles de mantener.
          </p>
        </Reveal>

        <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3 lg:gap-4">
          {TECHS.map(({ icon: Icon, name, role }, i) => (
            <Reveal key={name} delay={i * 40} as="li" className="h-full">
              <div className="group h-full flex flex-col items-center justify-center text-center gap-2.5 px-3 py-7 rounded-2xl border border-[var(--color-border)]/70 bg-[var(--color-surface-muted)]/60 transition-colors duration-300 hover:bg-white hover:border-[var(--color-teal)]/35">
                <Icon className="w-9 h-9 text-[var(--color-gray-dark)]/55 transition-colors duration-300 group-hover:text-[var(--color-blue)]" />
                <div>
                  <p className="text-[14px] font-bold text-[var(--color-navy)] leading-tight">
                    {name}
                  </p>
                  <p className="text-[12px] text-[var(--color-gray-dark)]/80 leading-tight mt-1">
                    {role}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
