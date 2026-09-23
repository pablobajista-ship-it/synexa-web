/**
 * Contenedor centrado de la web. En desktop el contenido ocupa hasta
 * 1200px (antes 1152px) para que las secciones no queden "perdidas" en
 * pantallas anchas. Los tamaños md/sm siguen sirviendo para bloques de
 * texto centrado.
 */
export default function Container({ className = "", children, size = "lg" }) {
  const maxWidth =
    size === "lg" ? "max-w-[1200px]" : size === "md" ? "max-w-4xl" : "max-w-2xl";
  return <div className={`${maxWidth} mx-auto px-5 sm:px-8 ${className}`}>{children}</div>;
}
