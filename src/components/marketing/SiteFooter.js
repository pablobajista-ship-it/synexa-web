import Link from "next/link";
import Logo from "@/components/Logo";
import Container from "@/components/ui/Container";
import { isPortalEnabled } from "@/lib/portal";

const COLUMNS = [
  {
    title: "Soluciones",
    links: [
      { href: "/servicios-y-precios#grupo-presencia-digital", label: "Sitios Web" },
      { href: "/servicios-y-precios#grupo-comercio-procesos", label: "E-commerce" },
      { href: "/aplicaciones-para-negocios", label: "Aplicaciones para Negocios" },
      { href: "/servicios-y-precios#grupo-comercio-procesos", label: "Portales y Plataformas" },
      { href: "/servicios-y-precios#grupo-sistemas-plataformas", label: "Desarrollo a Medida" },
    ],
  },
  {
    title: "Empresa",
    links: [
      { href: "/servicios-y-precios", label: "Servicios y Precios" },
      { href: "/servicios-y-precios#infraestructura", label: "Infraestructura" },
      { href: "/servicios-y-precios#soporte", label: "Planes de Soporte" },
      { href: "/#nosotros", label: "Nosotros" },
      { href: "#contacto", label: "Contacto" },
      { href: "/login", label: "Portal de Clientes", portal: true },
    ],
  },
];

export default function SiteFooter() {
  /* Cuando el portal está oculto (sitio público sin base de datos) se filtran
     los enlaces que llevan a él, para no ofrecer un acceso que no funciona. */
  const portalEnabled = isPortalEnabled();
  const columns = portalEnabled
    ? COLUMNS
    : COLUMNS.map((column) => ({
        ...column,
        links: column.links.filter((link) => !link.portal),
      }));

  return (
    <footer className="bg-[var(--color-navy)] border-t border-white/10">
      <Container className="py-16 lg:py-20 grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1.1fr] lg:gap-10">
        <div>
          <Logo theme="dark" size={44} />
          <p className="text-white/60 text-[15px] leading-[1.7] mt-5 max-w-sm">
            Desarrollamos soluciones digitales que conectan personas, procesos y
            oportunidades. Tecnología que conecta tu negocio.
          </p>
        </div>

        {columns.map((column) => (
          <div key={column.title}>
            <p className="text-white/45 text-[12px] font-bold uppercase tracking-[0.14em] mb-5">
              {column.title}
            </p>
            <ul className="space-y-3">
              {column.links.map((link) => (
                <li key={`${column.title}-${link.label}`}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-white text-[15px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-teal)] rounded"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <p className="text-white/45 text-[12px] font-bold uppercase tracking-[0.14em] mb-5">
            Contacto
          </p>
          <ul className="space-y-3 text-[15px] text-white/70">
            <li>
              <a
                href="mailto:hola@synexa.com"
                className="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-teal)] rounded"
              >
                hola@synexa.com
              </a>
            </li>
            <li>+56 9 0000 0000</li>
          </ul>
          <p className="mt-6 text-[13px] font-bold uppercase tracking-[0.12em] text-[var(--color-teal)]">
            Ideas + Tecnología + Resultados
          </p>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="py-7 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/45 text-[13px]">
            © {new Date().getFullYear()} SYNEXA — Soluciones Web para Empresas.
          </p>
          <p className="text-white/45 text-[13px] uppercase tracking-[0.12em]">
            Un mundo más conectado para tu negocio
          </p>
        </Container>
      </div>
    </footer>
  );
}
