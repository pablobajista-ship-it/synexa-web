/**
 * Proyectos reales para /nosotros. Distintos de las demostraciones ficticias del
 * Showroom (Punto Barrio Market, Vértice Bikes, etc.).
 *
 * ⚠️ Solo se publican los proyectos con `verified: true`. Ese valor debe ponerlo una
 * persona de SYNEXA después de confirmar que el proyecto es suyo y qué trabajo se hizo.
 * Mientras ninguno esté verificado, la sección no aparece en la página.
 *
 * `scope` es lo que SYNEXA realizó (a confirmar). Las capturas son del sitio real
 * (public/images/nosotros/), tomadas en octubre de 2026.
 */
export const PROJECTS = [
  {
    id: "nexorium",
    name: "NEXORIUM",
    type: "Sitio web y catálogo",
    description: "Portal del mundo coleccionista con figuras, maquetas y novedades.",
    url: "https://nexorium.cl/",
    image: "/images/nosotros/proyecto-nexorium.webp",
    verified: true,
  },
  {
    id: "radiodecadas",
    name: "Décadas 106.1",
    type: "Radio online",
    description: "Radio de los 70, 80 y 90 con reproductor en vivo, programación y comunidad.",
    url: "https://radiodecadas.cl/",
    image: "/images/nosotros/proyecto-radiodecadas.webp",
    verified: true,
  },
  {
    id: "iluminaciondj",
    name: "Portal de Iluminación",
    type: "Portal comercial",
    description: "Portal para elegir iluminación para fiestas, DJs y eventos.",
    url: "https://iluminaciondj.cl/",
    image: "/images/nosotros/proyecto-iluminaciondj.webp",
    verified: true,
  },
];

export const VERIFIED_PROJECTS = PROJECTS.filter((p) => p.verified);
