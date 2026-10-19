import { Suspense, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { PAQUETES } from "@/datos/catalogo";
import { marcaPorId } from "@/datos/marcas";
import { IsotipoMarca } from "@/componentes/IsotipoMarca";
import { NoEncontrada } from "@/app/NoEncontrada";
import { BarraDemo } from "./BarraDemo";
import { CLAVES_REINICIO, DEMOS } from "./registro";

/**
 * Contenedor de pantalla completa de cada demostración.
 * Las demostraciones reales se registran aquí a medida que se construyen
 * (Fase 3 piloto, Fase 4 resto). Mientras una demo no exista, se muestra su
 * estado honestamente en vez de aparentar una web que no está terminada.
 */
export function PaginaDemo() {
  const { marcaId = "" } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [version, setVersion] = useState(0);
  const marca = marcaPorId(marcaId);
  const paquete = PAQUETES.find((p) => p.demo === marcaId);
  if (!marca || !paquete) return <NoEncontrada />;

  const busqueda = (location.state as { busqueda?: string } | null)?.busqueda ?? "";
  const [fondo, principal, acento] = marca.colores;
  const Demo = DEMOS[marca.id];

  if (Demo) {
    return (
      <div className="min-h-screen">
        <BarraDemo paquete={paquete} busqueda={busqueda} onReiniciar={() => {
          for (const k of CLAVES_REINICIO[marca.id] ?? []) {
            try { localStorage.removeItem(k); } catch { /* sin almacenamiento */ }
          }
          // Vuelve a la portada de la demo (los filtros y las rutas internas también son estado).
          navigate(`/demos/${marca.id}`, { replace: true, state: location.state });
          setVersion((v) => v + 1);
        }} />
        <Suspense fallback={<p className="grid min-h-[60vh] place-items-center text-sm text-muted" role="status">Cargando demostración…</p>}>
          <Demo key={version} />
        </Suspense>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <BarraDemo paquete={paquete} busqueda={busqueda} />
      <main className="grid min-h-[calc(100vh-2.75rem)] place-items-center px-6 py-16 text-center" style={{ background: fondo, color: acento }}>
        <div className="max-w-lg">
          <div className="mx-auto w-fit"><IsotipoMarca marca={marca} size={88} /></div>
          <h1 className="mt-6 font-display text-4xl font-semibold">{marca.nombre}</h1>
          <p className="mt-2 opacity-80">{marca.rubro}</p>
          <p className="mt-8 rounded-xl p-5 text-sm leading-relaxed ring-1 ring-white/20" style={{ background: `${principal}33` }}>
            Esta demostración está en preparación. Estará disponible cuando se apruebe la fotografía de la marca y se
            construya su flujo completo.
          </p>
          <Link to={`/servicios-y-precios/${paquete.id}`} className="mt-6 inline-block text-sm font-semibold underline underline-offset-4">
            Ver las características del paquete
          </Link>
        </div>
      </main>
    </div>
  );
}
