import Image from "next/image";
import { IconCheck, IconDatabase, IconSliders } from "@/components/marketing/icons";

/**
 * Pieza visual de la sección "Un mundo más conectado para tu negocio":
 * fotografía corporativa de una solución SYNEXA en uso (dashboard en
 * laptop), con glow de marca y mini tarjetas flotantes.
 *
 * Complementa —sin competir con— la foto de sala de reuniones del hero:
 * aquélla comunica entorno corporativo y confianza, ésta comunica
 * software, datos y tecnología aplicada.
 */
export default function DashboardShowcase() {
  return (
    <div className="relative">
      {/* Glow de marca detrás de la foto, muy sutil */}
      <div className="absolute -inset-10 rounded-[3rem] bg-[var(--color-blue)]/12 blur-3xl" />
      <div className="absolute -bottom-12 -right-8 w-56 h-56 rounded-full bg-[var(--color-teal)]/14 blur-3xl" />

      <div className="relative rounded-[1.75rem] overflow-hidden border border-[var(--color-navy)]/10 shadow-[0_32px_70px_-28px_rgba(11,31,68,0.45)]">
        <div className="relative aspect-[16/10]">
          <Image
            src="/images/synexa-laptop-dashboard.webp"
            alt="Panel de control de una solución SYNEXA en una laptop, en una oficina corporativa"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            loading="lazy"
            className="object-cover"
          />
          {/* Tratamiento sutil: unifica la foto con la paleta y baja el
              contraste de los bordes para que no choque con el fondo claro. */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, rgba(37,99,235,0.14), transparent 55%, rgba(20,184,166,0.12))",
            }}
          />
          <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-[1.75rem]" />
        </div>
      </div>

      {/* Mini tarjetas flotantes sobre la imagen */}
      <div className="hidden sm:flex float-soft absolute -bottom-6 -left-6 items-center gap-3 glass-card-light rounded-2xl px-5 py-3.5">
        <span className="flex-shrink-0 w-9 h-9 rounded-xl bg-[var(--color-teal)]/15 text-[var(--color-teal-dark)] flex items-center justify-center">
          <IconCheck className="w-[18px] h-[18px]" />
        </span>
        <div>
          <p className="text-[13px] font-bold text-[var(--color-navy)] leading-tight">
            Datos conectados
          </p>
          <p className="text-[11.5px] text-[var(--color-gray-dark)] leading-tight mt-0.5">
            todo en un solo panel
          </p>
        </div>
      </div>

      <div
        className="hidden lg:flex float-soft absolute -top-6 -right-5 items-center gap-3 glass-card-light rounded-2xl px-5 py-3.5"
        style={{ "--d": "2200ms" }}
      >
        <span className="flex-shrink-0 w-9 h-9 rounded-xl bg-[var(--color-blue)]/12 text-[var(--color-blue)] flex items-center justify-center">
          <IconSliders className="w-[18px] h-[18px]" />
        </span>
        <div>
          <p className="text-[13px] font-bold text-[var(--color-navy)] leading-tight">
            Solución personalizada
          </p>
          <p className="text-[11.5px] text-[var(--color-gray-dark)] leading-tight mt-0.5">
            a la medida de tu operación
          </p>
        </div>
      </div>

      <div
        className="hidden lg:flex float-soft absolute top-1/2 -right-7 -translate-y-1/2 items-center gap-2.5 glass-card-light rounded-xl px-4 py-2.5"
        style={{ "--d": "4000ms" }}
      >
        <span className="flex-shrink-0 w-7 h-7 rounded-lg bg-[var(--color-teal)]/15 text-[var(--color-teal-dark)] flex items-center justify-center">
          <IconDatabase className="w-4 h-4" />
        </span>
        <p className="text-[12.5px] font-bold text-[var(--color-navy)] leading-tight">Escalable</p>
      </div>
    </div>
  );
}
