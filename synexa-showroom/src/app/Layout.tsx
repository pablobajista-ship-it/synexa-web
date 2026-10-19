import { Link, NavLink, Outlet } from "react-router-dom";
import { Logo } from "@/componentes/Logo";

export function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <a href="#contenido" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-white focus:px-3 focus:py-2">
        Saltar al contenido
      </a>
      <header className="sticky top-0 z-40 border-b border-white/10 bg-navy/95 backdrop-blur print:hidden">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          <Link to="/servicios-y-precios" aria-label="SYNEXA, ir al catálogo"><Logo oscuro /></Link>
          <nav aria-label="Servicios y Precios" className="flex gap-1 overflow-x-auto text-sm font-medium">
            {[["/servicios-y-precios", "Catálogo", true], ["/servicios-y-precios/comparar", "Comparar", false], ["/servicios-y-precios/arma-tu-solucion", "Arma tu solución", false], ["/servicios-y-precios/infraestructura-y-soporte", "Infraestructura y soporte", false], ["/servicios-y-precios/proyectos-realizados", "Proyectos realizados", false]].map(([to, t, end]) => (
              <NavLink key={to as string} to={to as string} end={end as boolean} className={({ isActive }) => `whitespace-nowrap rounded-md px-3 py-2 ${isActive ? "bg-white/15 text-white" : "text-white/70 hover:text-white"}`}>{t as string}</NavLink>
            ))}
          </nav>
        </div>
      </header>
      <main id="contenido" className="flex-1"><Outlet /></main>
      <footer className="border-t border-line bg-surface print:hidden">
        <div className="mx-auto max-w-7xl px-4 py-8 text-xs leading-relaxed text-muted sm:px-6">
          <p>
            Valores netos en pesos chilenos, más IVA. Precios de referencia sujetos a validación; el valor definitivo
            depende del alcance de cada proyecto. Todas las empresas, personas y datos de las demostraciones son ficticios.
          </p>
        </div>
      </footer>
    </div>
  );
}
