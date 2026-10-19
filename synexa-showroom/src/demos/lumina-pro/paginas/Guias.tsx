import { Link, useParams } from "react-router-dom";
import { BASE, GUIAS } from "../datos";
import { BotonPrimario, Contenedor, Titulo } from "./Comun";

export function Guias() {
  return (
    <Contenedor>
      <Titulo etiqueta="Guías comerciales" texto="Lo básico para decidir con confianza antes de cotizar.">Guías de compra</Titulo>
      <ul className="mt-10 grid gap-6 md:grid-cols-3">
        {GUIAS.map((g, i) => (
          <li key={g.id}>
            <Link to={`${BASE}/guias/${g.id}`} className="flex h-full flex-col rounded-xl bg-[#17173f] p-6 ring-1 ring-white/10 transition-colors hover:ring-[#7c4ddb]/60">
              <span className="text-sm font-semibold text-[#a98bf0]">{String(i + 1).padStart(2, "0")}</span>
              <h2 className="mt-2 text-lg font-bold">{g.titulo}</h2>
              <p className="mt-2 flex-1 text-sm text-white/65">{g.resumen}</p>
              <span className="mt-4 text-sm font-semibold text-[#a98bf0]">Leer guía →</span>
            </Link>
          </li>
        ))}
      </ul>
    </Contenedor>
  );
}

export function VerGuia() {
  const { id } = useParams();
  const g = GUIAS.find((x) => x.id === id);
  if (!g) {
    return (
      <Contenedor className="text-center">
        <h1 className="text-3xl font-bold">Guía no encontrada</h1>
        <div className="mt-6"><BotonPrimario to={`${BASE}/guias`}>Ver todas las guías</BotonPrimario></div>
      </Contenedor>
    );
  }
  return (
    <Contenedor className="max-w-3xl">
      <nav aria-label="Ruta de navegación" className="mb-6 text-sm"><Link to={`${BASE}/guias`} className="text-[#a98bf0] hover:underline">← Guías</Link></nav>
      <h1 className="text-3xl font-bold leading-tight sm:text-4xl">{g.titulo}</h1>
      <div className="mt-8 space-y-5 text-lg leading-relaxed text-white/75">{g.cuerpo.map((p, i) => <p key={i}>{p}</p>)}</div>
      <div className="mt-10 flex flex-wrap gap-3"><BotonPrimario to={`${BASE}/catalogo`}>Ver el catálogo</BotonPrimario><Link to={`${BASE}/consulta`} className="inline-flex items-center rounded-md px-6 py-3 text-sm font-semibold ring-1 ring-inset ring-white/30 hover:bg-white/10">Preguntar a un asesor</Link></div>
    </Contenedor>
  );
}
