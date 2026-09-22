import Link from "next/link";
import Logo from "@/components/Logo";
import Container from "@/components/ui/Container";

const LINKS = [
  { href: "#soluciones", label: "Soluciones" },
  { href: "#nosotros", label: "Nosotros" },
  { href: "#servicios", label: "Servicios" },
  { href: "/login", label: "Portal de clientes" },
];

export default function SiteFooter() {
  return (
    <footer className="bg-[var(--color-navy)] border-t border-white/10">
      <Container className="py-14 grid sm:grid-cols-[1.3fr_1fr_1fr] gap-10">
        <div>
          <Logo theme="dark" size={32} />
          <p className="text-white/60 text-sm leading-relaxed mt-4 max-w-sm">
            Desarrollamos soluciones digitales que conectan personas, procesos y
            oportunidades. Tecnología que conecta tu negocio.
          </p>
        </div>

        <div>
          <p className="text-white/40 text-[11px] font-bold uppercase tracking-wide mb-3">
            Navegación
          </p>
          <ul className="space-y-2">
            {LINKS.map((link) => (
              <li key={link.label}>
                <Link href={link.href} className="text-white/70 hover:text-white text-sm">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-white/40 text-[11px] font-bold uppercase tracking-wide mb-3">
            Contacto
          </p>
          <ul className="space-y-2 text-sm text-white/70">
            <li>
              <a href="mailto:hola@synexa.com" className="hover:text-white">
                hola@synexa.com
              </a>
            </li>
            <li>+56 9 0000 0000</li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/40 text-[12px]">
            © {new Date().getFullYear()} SYNEXA — Soluciones Web para Empresas.
          </p>
          <p className="text-white/40 text-[12px] uppercase tracking-wide">
            Un mundo más conectado para tu negocio
          </p>
        </Container>
      </div>
    </footer>
  );
}
