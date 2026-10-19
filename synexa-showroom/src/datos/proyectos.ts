/**
 * Proyectos reales de SYNEXA mostrados como referencia.
 * Regla de esta sección: solo se afirma lo que se pudo ver en el sitio público (capturas del
 * 2026-10-19) o lo que dice la documentación del propio repositorio, y cada afirmación queda
 * rotulada según su origen. No se muestran valores cobrados: el «paquete de referencia» es el más
 * cercano del catálogo y su precio es el precio base propuesto, no lo que costó el proyecto.
 */
export interface Captura { archivo: string; alt: string; pie: string }
export interface ProyectoReal {
  id: string;
  nombre: string;
  rubro: string;
  url: string;
  resumen: string;
  tecnologia: string[];
  /** Observado directamente en el sitio público. */
  verificado: string[];
  /** Descrito en la documentación del repositorio; puede no estar activo en producción. */
  documentado: { texto: string; estado: string }[];
  paqueteReferencia: string;
  capturas: Captura[];
}

export const FECHA_CAPTURAS = "19 de octubre de 2026";

export const PROYECTOS: ProyectoReal[] = [
  {
    id: "radio-decadas",
    nombre: "Radio Décadas 106.1",
    rubro: "Radio online de música de los 70, 80 y 90",
    url: "https://radiodecadas.cl",
    resumen: "Sitio de una radio online con reproductor en vivo, noticias y clima, páginas musicales por década y un espacio de dedicatorias.",
    tecnologia: ["Next.js (App Router)", "React", "Tailwind CSS", "Supabase", "Netlify", "Streaming del proveedor actual"],
    verificado: [
      "Reproductor en vivo con carátula y tema en curso, visible en toda la navegación",
      "Barra informativa con un titular a la vez y clima por ciudad",
      "Tres puertas de entrada por década (70s, 80s y 90s)",
      "Página de cada década con Top 10 histórico, metodología y fuente",
      "Formulario de dedicatorias",
    ],
    documentado: [
      { texto: "Chat en vivo con moderación", estado: "Código escrito; la documentación indica que falta aplicar la migración de base de datos" },
      { texto: "Panel de estadísticas de acceso para el equipo", estado: "Documentado; requiere aplicar una migración y claves de servidor" },
      { texto: "Panel de contenidos musicales editable", estado: "Hecho en código; requiere aplicar migraciones" },
    ],
    paqueteReferencia: "portal-multimedia",
    capturas: [
      { archivo: "assets/proyectos/radio-decadas/portada.webp", alt: "Portada de Radio Décadas con el reproductor en vivo y las tarjetas de los 70, 80 y 90", pie: "Portada: reproductor en vivo, barra de noticias y clima, y acceso por década." },
      { archivo: "assets/proyectos/radio-decadas/musica-90s.webp", alt: "Página de los 90 con el Top 10 histórico", pie: "Página de una década con su Top 10 histórico." },
    ],
  },
  {
    id: "nexorium",
    nombre: "Nexorium",
    rubro: "Portal de coleccionables: anime, Marvel, DC y videojuegos",
    url: "https://nexorium.cl",
    resumen: "Portal para descubrir y comparar figuras, estatuas y coleccionables. No vende: lleva al visitante a tiendas externas.",
    tecnologia: ["Next.js (App Router)", "React", "Supabase (preparado)", "Netlify"],
    verificado: [
      "Navegación por universos: Anime, Marvel, DC, Videojuegos y Cine y TV",
      "Buscador en la cabecera",
      "Sección de guías editoriales",
      "Comparador de productos de hasta tres columnas",
      "Foro en el menú principal",
    ],
    documentado: [
      { texto: "Modelo de enlaces de afiliado hacia tiendas externas, sin carrito ni pagos", estado: "Descrito en el README del proyecto" },
      { texto: "Capa de datos preparada para Supabase, con datos de ejemplo", estado: "El README la describe como etapa inicial; puede estar desactualizado frente al sitio publicado" },
    ],
    paqueteReferencia: "portal-comercial-especializado",
    capturas: [
      { archivo: "assets/proyectos/nexorium/portada.webp", alt: "Portada de Nexorium con una escena de figuras coleccionables", pie: "Portada: propuesta de valor y acceso por universo." },
      { archivo: "assets/proyectos/nexorium/guias.webp", alt: "Sección de guías de Nexorium", pie: "Guías editoriales para quien empieza a coleccionar." },
    ],
  },
  {
    id: "iluminacion-dj",
    nombre: "Iluminación DJ",
    rubro: "Portal de iluminación para eventos, Chile",
    url: "https://iluminaciondj.cl",
    resumen: "Portal que orienta a elegir iluminación para fiestas y eventos, con catálogo por categorías, guías, kits y comparador.",
    tecnologia: ["Next.js (App Router)", "React", "TypeScript", "Tailwind CSS", "Supabase", "Netlify"],
    verificado: [
      "Menú con Shopping, Crea tu Evento, Kits, Comparador y Aprende",
      "Catálogo por categorías (PAR LED, Moving Heads, láser, humo, DMX y más)",
      "Guías por ocasión, por ejemplo iluminación de Navidad",
      "Aviso de que los precios son referenciales y deben confirmarse en la tienda",
    ],
    documentado: [
      { texto: "Importación y verificación de productos por scripts", estado: "Presentes en el repositorio (import:productos y check:productos)" },
    ],
    paqueteReferencia: "catalogo-avanzado",
    capturas: [
      { archivo: "assets/proyectos/iluminacion-dj/portada.webp", alt: "Portada de Iluminación DJ con un escenario de luces", pie: "Portada: «Crea eventos que nadie olvide»." },
      { archivo: "assets/proyectos/iluminacion-dj/shopping.webp", alt: "Catálogo Shopping con categorías de iluminación", pie: "Shopping: categorías de productos." },
      { archivo: "assets/proyectos/iluminacion-dj/crea-tu-evento.webp", alt: "Guía de iluminación de Navidad", pie: "Crea tu Evento: guía por ocasión." },
    ],
  },
];
