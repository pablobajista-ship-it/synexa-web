import { BotonEnlace } from "@/componentes/Boton";

export function NoEncontrada() {
  return (
    <section className="mx-auto max-w-xl px-4 py-24 text-center">
      <p className="text-sm font-semibold uppercase tracking-wider text-blue">Error 404</p>
      <h1 className="mt-2 font-display text-4xl font-semibold">No encontramos esa página</h1>
      <p className="mt-3 text-muted">El enlace puede haber cambiado. Vuelve al catálogo para seguir explorando.</p>
      <BotonEnlace to="/servicios-y-precios" className="mt-8">Ir a Servicios y Precios</BotonEnlace>
    </section>
  );
}
