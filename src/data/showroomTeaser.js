/**
 * Resumen del catálogo del SYNEXA Showroom para la home.
 *
 * La fuente de verdad es synexa-showroom/src/datos/catalogo.ts (19 paquetes).
 * El Showroom es un módulo Vite/TypeScript aparte, así que aquí se copia solo
 * lo mínimo: cada familia con su cantidad de paquetes y su precio de entrada
 * (el menor precio neto en CLP de la familia). Si cambia un precio mínimo o se
 * agrega un paquete en el Showroom, actualizar este archivo.
 */
export const SHOWROOM_HREF = "/servicios-y-precios";

export const SHOWROOM_FAMILIES = [
  {
    id: "presencia",
    name: "Presencia digital",
    description: "Landing, sitios web y rediseños.",
    packages: 5,
    from: 349000,
  },
  {
    id: "catalogos-comercio",
    name: "Catálogos y comercio",
    description: "De un catálogo simple a una tienda completa.",
    packages: 5,
    from: 749000,
  },
  {
    id: "radio-multimedia",
    name: "Radio y multimedia",
    description: "Emisoras online y comunidades interactivas.",
    packages: 3,
    from: 790000,
  },
  {
    id: "gestion-clientes",
    name: "Agenda y clientes",
    description: "Reservas, portales privados y paneles.",
    packages: 2,
    from: 890000,
  },
  {
    id: "sistemas-integracion",
    name: "Sistemas e integración",
    description: "Procesos, datos e integraciones, hasta un MVP a medida.",
    packages: 4,
    from: 390000,
  },
];

export const SHOWROOM_TOTAL_PACKAGES = SHOWROOM_FAMILIES.reduce((n, f) => n + f.packages, 0);
