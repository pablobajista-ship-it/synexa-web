import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/marketing/Reveal";
import ProviderCard from "@/components/marketing/ProviderCard";
import AppIcon from "@/components/marketing/appIcons";
import { IconArrowDown, IconCheck } from "@/components/marketing/icons";

/**
 * §9–§17 — Alojamiento, bases de datos, diagrama de infraestructura y los dos
 * ejemplos de proyecto (sitio simple vs. aplicación).
 *
 * El diagrama se apila en vertical siempre: en desktop es una columna
 * centrada con flechas, no una fila, porque las capas se leen de arriba
 * hacia abajo. En móvil solo se reduce el tamaño.
 */
export default function HostingBlock({
  providers,
  databaseIntro,
  disclaimer,
  diagram,
  examples,
}) {
  const hosting = providers.filter((p) => p.category === "hosting" || p.category === "network");
  const databases = providers.filter((p) => p.category === "database");

  return (
    <section
      id="infra-alojamiento"
      className="section-pad bg-[var(--color-surface-muted)] scroll-mt-20"
    >
      <Container>
        <Reveal className="max-w-[780px] mb-12 lg:mb-14">
          <Eyebrow>Alojamiento</Eyebrow>
          <h3 className="text-[1.9rem] sm:text-[2.25rem] leading-[1.16] font-bold tracking-[-0.02em] text-[var(--color-navy)] mt-4 mb-5 text-balance">
            Infraestructura y alojamiento
          </h3>
          <p className="text-[var(--color-gray-dark)] text-[17px] leading-[1.7] mb-4">
            Es el servicio que permite mantener disponible tu sitio web, aplicación o
            sistema a través de Internet.
          </p>
          <p className="text-[var(--color-gray-dark)] text-[17px] leading-[1.7]">
            Para muchos proyectos desarrollados con Next.js utilizamos infraestructura
            especializada como Vercel.
          </p>
        </Reveal>

        <div className="grid sm:grid-cols-2 gap-5 lg:gap-6 mb-14">
          {hosting.map((provider) => (
            <Reveal key={provider.id} className="h-full">
              <ProviderCard provider={provider} icon="server" />
            </Reveal>
          ))}
        </div>

        {/* ---------- Bases de datos ---------- */}
        <Reveal className="max-w-[780px] mb-8">
          <h3 className="text-[1.6rem] sm:text-[1.85rem] leading-[1.2] font-bold tracking-[-0.02em] text-[var(--color-navy)] mb-4 text-balance">
            Bases de datos
          </h3>
          <p className="text-[var(--color-gray-dark)] text-[16.5px] leading-[1.7]">
            {databaseIntro}
          </p>
        </Reveal>

        <div className="grid sm:grid-cols-2 gap-5 lg:gap-6 mb-8">
          {databases.map((provider) => (
            <Reveal key={provider.id} className="h-full">
              <ProviderCard provider={provider} icon="database" />
            </Reveal>
          ))}
        </div>

        {/* §14 — Ningún proveedor es obligatorio */}
        <Reveal>
          <p className="p-6 rounded-2xl bg-[var(--color-blue)]/[0.05] border border-[var(--color-blue)]/15 text-[15px] text-[var(--color-gray-dark)] leading-[1.7] mb-16 lg:mb-20">
            {disclaimer}
          </p>
        </Reveal>

        {/* ---------- §15 Diagrama ---------- */}
        <Reveal className="mb-16 lg:mb-20">
          <div className="max-w-[560px] mx-auto">
            <div className="flex items-center justify-center gap-3 mb-8">
              <span className="text-[11.5px] font-bold uppercase tracking-[0.12em] px-3.5 py-1.5 rounded-full bg-white border border-[var(--color-border)] text-[var(--color-gray-dark)]/70">
                {diagram.label}
              </span>
            </div>

            <ol className="flex flex-col items-center">
              {diagram.layers.map((layer, i) => (
                <li key={layer.id} className="w-full flex flex-col items-center">
                  <div
                    className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl border ${
                      layer.highlight
                        ? "bg-[var(--color-navy)] border-[var(--color-navy)] text-white"
                        : "bg-white border-[var(--color-border)]/80"
                    }`}
                  >
                    <span
                      className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${
                        layer.highlight
                          ? "bg-[var(--color-teal)]/20 text-[var(--color-teal)]"
                          : "bg-[var(--color-blue)]/[0.08] text-[var(--color-blue)]"
                      }`}
                    >
                      <AppIcon name={layer.icon} className="w-[18px] h-[18px]" />
                    </span>
                    <div className="min-w-0">
                      <p
                        className={`text-[15.5px] font-bold leading-tight ${
                          layer.highlight ? "text-white" : "text-[var(--color-navy)]"
                        }`}
                      >
                        {layer.label}
                      </p>
                      <p
                        className={`text-[13px] leading-tight mt-0.5 ${
                          layer.highlight ? "text-white/60" : "text-[var(--color-gray-dark)]/80"
                        }`}
                      >
                        {layer.hint}
                      </p>
                    </div>
                  </div>

                  {i < diagram.layers.length - 1 ? (
                    <IconArrowDown
                      className="w-5 h-5 my-2.5 text-[var(--color-teal)]/60"
                      aria-hidden="true"
                    />
                  ) : null}
                </li>
              ))}
            </ol>

            <p className="text-[13.5px] text-[var(--color-gray-dark)]/80 leading-[1.65] text-center mt-7">
              {diagram.note}
            </p>
          </div>
        </Reveal>

        {/* ---------- §16 y §17 Ejemplos ---------- */}
        <Reveal className="max-w-[780px] mb-8">
          <h3 className="text-[1.6rem] sm:text-[1.85rem] leading-[1.2] font-bold tracking-[-0.02em] text-[var(--color-navy)] mb-4 text-balance">
            No todos los proyectos necesitan lo mismo
          </h3>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-5 lg:gap-6">
          {examples.map((example, i) => {
            const dark = example.tone === "dark";
            return (
              <Reveal key={example.id} delay={i * 70} className="h-full">
                <div
                  className={`h-full p-8 rounded-[1.75rem] relative overflow-hidden ${
                    dark
                      ? "bg-[var(--color-navy)]"
                      : "bg-white border border-[var(--color-border)]/80"
                  }`}
                >
                  {dark ? (
                    <>
                      <div className="pointer-events-none absolute inset-0 text-white/[0.06] dot-grid" />
                      <div
                        className="pointer-events-none absolute inset-0"
                        style={{
                          background:
                            "radial-gradient(70% 70% at 85% 10%, rgba(37,99,235,0.3), transparent 70%)",
                        }}
                      />
                    </>
                  ) : null}

                  <div className="relative">
                    <h4
                      className={`text-[20px] font-bold leading-snug mb-3 ${
                        dark ? "text-white" : "text-[var(--color-navy)]"
                      }`}
                    >
                      {example.title}
                    </h4>
                    <p
                      className={`text-[15px] leading-[1.65] mb-6 ${
                        dark ? "text-white/70" : "text-[var(--color-gray-dark)]"
                      }`}
                    >
                      {example.text}
                    </p>

                    <p
                      className={`text-[11.5px] font-bold uppercase tracking-[0.1em] mb-3 ${
                        dark ? "text-[var(--color-teal)]" : "text-[var(--color-gray-dark)]/60"
                      }`}
                    >
                      Puede necesitar
                    </p>
                    <ul className="space-y-2.5 mb-6">
                      {example.needs.map((need) => (
                        <li key={need} className="flex items-center gap-2.5">
                          <span
                            className={`flex-shrink-0 w-[18px] h-[18px] rounded-full flex items-center justify-center ${
                              dark
                                ? "bg-[var(--color-teal)]/20 text-[var(--color-teal)]"
                                : "bg-[var(--color-teal)]/15 text-[var(--color-teal-dark)]"
                            }`}
                          >
                            <IconCheck className="w-2.5 h-2.5" />
                          </span>
                          <span
                            className={`text-[15px] ${
                              dark ? "text-white/85" : "text-[var(--color-gray-dark)]"
                            }`}
                          >
                            {need}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <p
                      className={`text-[13.5px] leading-[1.65] pt-5 border-t ${
                        dark
                          ? "text-white/60 border-white/12"
                          : "text-[var(--color-gray-dark)]/85 border-[var(--color-border)]/80"
                      }`}
                    >
                      {example.note}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
