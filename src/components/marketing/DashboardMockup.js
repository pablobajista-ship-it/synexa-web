import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/marketing/Reveal";
import { LogoMark } from "@/components/Logo";
import AppIcon from "@/components/marketing/appIcons";

const SIDEBAR_ICONS = {
  Dashboard: "grid",
  Clientes: "users",
  Agenda: "calendar",
  Documentos: "file",
  Reportes: "chart",
  Configuración: "layers",
};

/**
 * §20 — Ejemplo visual de una aplicación.
 *
 * Es un mockup deliberadamente abstracto: los indicadores no muestran cifras
 * y las filas de actividad no tienen datos, para que no pueda confundirse con
 * la captura de un producto ya disponible. La etiqueta "Ejemplo conceptual"
 * lo declara de forma explícita.
 */
export default function DashboardMockup({ mockup }) {
  return (
    <section className="section-pad bg-[var(--color-navy)] relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 tech-grid" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(45% 55% at 12% 10%, rgba(37,99,235,0.28), transparent 70%), radial-gradient(45% 55% at 90% 90%, rgba(20,184,166,0.2), transparent 70%)",
        }}
      />

      <Container className="relative">
        <Reveal className="max-w-[720px] mb-12 lg:mb-14">
          <span className="inline-flex items-center gap-2.5 text-[13px] font-bold uppercase tracking-[0.16em] text-[var(--color-teal)] mb-5">
            <span className="w-7 h-px bg-[var(--color-teal)]" />
            Así podría verse
          </span>
          <h2 className="text-[2rem] sm:text-[2.5rem] lg:text-[2.75rem] leading-[1.14] font-bold tracking-[-0.02em] text-white mb-5 text-balance">
            Un panel donde todo está a la vista
          </h2>
          <p className="text-white/70 text-[17px] leading-[1.7]">
            Una idea de cómo se organiza una aplicación SYNEXA: el menú a la izquierda,
            los indicadores del negocio arriba y la actividad del día abajo.
          </p>
        </Reveal>

        <Reveal delay={80}>
          <div className="relative">
            <div className="absolute -inset-6 rounded-[3rem] bg-[var(--color-blue)]/15 blur-3xl" />

            <div className="relative rounded-[1.75rem] overflow-hidden border border-white/12 bg-[#0d2450] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.6)]">
              {/* Barra superior */}
              <div className="flex items-center justify-between gap-4 px-5 py-3.5 border-b border-white/10 bg-white/[0.03]">
                <div className="flex items-center gap-2.5">
                  <LogoMark size={26} />
                  <span className="text-[13px] font-bold text-white/85">Panel</span>
                </div>
                <span className="text-[10.5px] font-bold uppercase tracking-[0.12em] px-3 py-1 rounded-full bg-[var(--color-teal)]/15 text-[var(--color-teal)] border border-[var(--color-teal)]/25">
                  {mockup.label}
                </span>
              </div>

              <div className="grid sm:grid-cols-[180px_1fr] lg:grid-cols-[220px_1fr]">
                {/* Sidebar */}
                <div className="hidden sm:block p-4 border-r border-white/10 bg-white/[0.02]">
                  <ul className="space-y-1">
                    {mockup.sidebar.map((item, i) => (
                      <li key={item}>
                        <span
                          className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-[13.5px] font-semibold ${
                            i === 0
                              ? "bg-[var(--color-blue)]/25 text-white"
                              : "text-white/55"
                          }`}
                        >
                          <AppIcon
                            name={SIDEBAR_ICONS[item] ?? "layers"}
                            className="w-4 h-4 flex-shrink-0"
                          />
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Contenido */}
                <div className="p-5 lg:p-7">
                  {/* Menú horizontal en móvil */}
                  <ul className="sm:hidden flex gap-2 overflow-x-auto pb-4 -mx-1 px-1">
                    {mockup.sidebar.map((item, i) => (
                      <li key={item} className="flex-shrink-0">
                        <span
                          className={`block px-3 py-1.5 rounded-full text-[12.5px] font-semibold whitespace-nowrap ${
                            i === 0
                              ? "bg-[var(--color-blue)]/25 text-white"
                              : "bg-white/[0.06] text-white/55"
                          }`}
                        >
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* Indicadores */}
                  <div className="grid sm:grid-cols-3 gap-3.5 mb-5">
                    {mockup.metrics.map((metric) => (
                      <div
                        key={metric.label}
                        className="p-4 rounded-2xl bg-white/[0.05] border border-white/10"
                      >
                        <p className="text-[12.5px] font-semibold text-white/85 mb-1">
                          {metric.label}
                        </p>
                        <p className="text-[11px] text-white/45 mb-3">{metric.hint}</p>
                        {/* Barra abstracta: nunca una cifra inventada */}
                        <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                          <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-[var(--color-blue)] to-[var(--color-teal)]" />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Actividad reciente */}
                  <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                    <p className="text-[13px] font-bold text-white/85 mb-4">
                      {mockup.activityTitle}
                    </p>
                    <ul className="space-y-3">
                      {mockup.activityRows.map((row) => (
                        <li key={row} className="flex items-center gap-3">
                          <span className="flex-shrink-0 w-7 h-7 rounded-lg bg-[var(--color-teal)]/15 text-[var(--color-teal)] flex items-center justify-center">
                            <AppIcon name="clock" className="w-3.5 h-3.5" />
                          </span>
                          <span className="text-[13px] text-white/70">{row}</span>
                          {/* Placeholder neutro en vez de datos falsos */}
                          <span className="ml-auto h-1.5 w-16 sm:w-24 rounded-full bg-white/10" />
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <p className="text-center text-[14px] text-white/50 mt-7 max-w-[620px] mx-auto leading-[1.7]">
            Este panel es una representación conceptual. Cada aplicación se diseña con
            los módulos, indicadores y vistas que necesite el negocio.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
