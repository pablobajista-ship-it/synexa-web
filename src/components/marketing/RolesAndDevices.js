import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/marketing/Reveal";
import AppIcon from "@/components/marketing/appIcons";
import { IconLock } from "@/components/marketing/icons";

/**
 * §21 + §22 — Usuarios y roles / acceso desde cualquier dispositivo.
 * Van juntos en un bloque 50/50 para romper el ritmo de tarjetas y para que
 * ninguno de los dos temas ocupe una sección completa.
 */
export default function RolesAndDevices({ roles, devices }) {
  return (
    <section className="section-pad bg-[var(--color-surface-muted)]">
      <Container>
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-stretch">
          {/* ---------- Roles ---------- */}
          <Reveal className="h-full">
            <div className="h-full p-8 lg:p-10 rounded-[1.75rem] bg-white border border-[var(--color-border)]/80 shadow-[0_1px_2px_rgba(11,31,68,0.04)]">
              <Eyebrow>Accesos</Eyebrow>
              <h2 className="text-[1.75rem] sm:text-[2rem] leading-[1.18] font-bold tracking-[-0.02em] text-[var(--color-navy)] mt-4 mb-4 text-balance">
                {roles.title}
              </h2>
              <p className="text-[var(--color-gray-dark)] text-[16px] leading-[1.7] mb-8">
                {roles.text}
              </p>

              <ul className="space-y-3">
                {roles.roles.map((role) => (
                  <li
                    key={role.name}
                    className="flex items-center gap-4 p-4 rounded-2xl bg-[var(--color-surface-muted)]/70 border border-[var(--color-border)]/60"
                  >
                    <span className="flex-shrink-0 w-9 h-9 rounded-xl bg-[var(--color-blue)]/[0.08] text-[var(--color-blue)] flex items-center justify-center">
                      <IconLock className="w-4 h-4" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-[15px] font-bold text-[var(--color-navy)] leading-tight">
                        {role.name}
                      </p>
                      <p className="text-[13.5px] text-[var(--color-gray-dark)]/85 leading-tight mt-0.5">
                        {role.hint}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* ---------- Dispositivos ---------- */}
          <Reveal delay={80} className="h-full">
            <div className="h-full p-8 lg:p-10 rounded-[1.75rem] bg-[var(--color-navy)] relative overflow-hidden">
              <div className="pointer-events-none absolute inset-0 text-white/[0.06] dot-grid" />
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "radial-gradient(60% 60% at 85% 15%, rgba(20,184,166,0.25), transparent 70%), radial-gradient(60% 60% at 10% 90%, rgba(37,99,235,0.28), transparent 70%)",
                }}
              />

              <div className="relative">
                <span className="inline-flex items-center gap-2.5 text-[13px] font-bold uppercase tracking-[0.14em] text-[var(--color-teal)] mb-4">
                  <span className="w-7 h-px bg-[var(--color-teal)]" />
                  Dispositivos
                </span>
                <h2 className="text-[1.75rem] sm:text-[2rem] leading-[1.18] font-bold tracking-[-0.02em] text-white mb-4 text-balance">
                  {devices.title}
                </h2>
                <p className="text-white/70 text-[16px] leading-[1.7] mb-9">
                  {devices.text}
                </p>

                <ul className="grid grid-cols-3 gap-3.5">
                  {devices.devices.map((device) => (
                    <li
                      key={device.name}
                      className="glass-card rounded-2xl p-4 text-center flex flex-col items-center"
                    >
                      <AppIcon name={device.icon} className="w-7 h-7 text-[var(--color-teal)] mb-3" />
                      <p className="text-[13.5px] font-bold text-white leading-tight">
                        {device.name}
                      </p>
                      <p className="text-[11.5px] text-white/55 leading-tight mt-1">
                        {device.hint}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
