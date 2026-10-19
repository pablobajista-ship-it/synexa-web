import { lazy, type ComponentType } from "react";

/**
 * Demostraciones construidas. Una marca que no aparece aquí se muestra como
 * «en preparación». Cada demo es un componente de pantalla completa que no
 * conoce el catálogo; la barra «Demostración SYNEXA» la pone PaginaDemo.
 */
export const DEMOS: Record<string, React.LazyExoticComponent<ComponentType>> = {
  "brillo-car": lazy(() => import("./brillo-car/BrilloCar")),
  novasur: lazy(() => import("./novasur/NovaSur")),
  "lumina-pro": lazy(() => import("./lumina-pro/LuminaPro")),
  "frecuencia-mix": lazy(() => import("./frecuencia-mix/FrecuenciaMix")),
  "molino-sur": lazy(() => import("./molino-sur/MolinoSur")),
  "punto-barrio": lazy(() => import("./punto-barrio/PuntoBarrio")),
  "barba-norte": lazy(() => import("./barba-norte/BarbaNorte")),
  "brasa-costa": lazy(() => import("./brasa-costa/BrasaCosta")),
  "puerto-fm": lazy(() => import("./puerto-fm/PuertoFM")),
  "tiempo-retro": lazy(() => import("./tiempo-retro/TiempoRetro")),
  "vertice-bikes": lazy(() => import("./vertice-bikes/VerticeBikes")),
  "huella-viva": lazy(() => import("./huella-viva/HuellaViva")),
  rango: lazy(() => import("./rango/RangoActivewear")),
  arista: lazy(() => import("./arista/Arista")),
  trama: lazy(() => import("./trama/Trama")),
  rutastock: lazy(() => import("./rutastock/RutaStock")),
  servimant: lazy(() => import("./servimant/Servimant")),
  mesaflow: lazy(() => import("./mesaflow/MesaFlow")),
  puentesync: lazy(() => import("./puentesync/PuenteSync")),
};

/** Claves de localStorage que «Reiniciar demo» debe borrar para volver al estado inicial. */
export const CLAVES_REINICIO: Record<string, string[]> = {
  novasur: ["synexa:novasur:noticias"],
  "lumina-pro": ["synexa:lumina-pro:comparar"],
  "frecuencia-mix": ["synexa:frecuencia-mix:estado"],
  "barba-norte": ["synexa:barba-norte:reservas"],
  "tiempo-retro": ["synexa:tiempo-retro:estado"],
  "vertice-bikes": ["synexa:vertice-bikes:productos"],
  "huella-viva": ["synexa:huella-viva:tienda"],
  rango: ["synexa:rango:tienda"],
  arista: ["synexa:arista:propiedades"],
  trama: ["synexa:trama:estado"],
  rutastock: ["synexa:rutastock:inventario"],
  servimant: ["synexa:servimant:ordenes"],
  mesaflow: ["synexa:mesaflow:estado"],
  puentesync: ["synexa:puentesync:estado"],
};

/** Portada de cada marca para el catálogo (null = aún sin fotografía aprobada). */
export const FOTO_PORTADA: Record<string, string> = {
  "brillo-car": "assets/brillo-car/hero.webp",
  novasur: "assets/novasur/hero.webp",
  "lumina-pro": "assets/lumina-pro/hero.webp",
  "frecuencia-mix": "assets/frecuencia-mix/hero.webp",
  "molino-sur": "assets/molino-sur/hero.webp",
  "punto-barrio": "assets/punto-barrio/hero.webp",
  "barba-norte": "assets/barba-norte/hero.webp",
  "brasa-costa": "assets/brasa-costa/hero.webp",
  "puerto-fm": "assets/puerto-fm/hero.webp",
  "tiempo-retro": "assets/tiempo-retro/hero.webp",
  "vertice-bikes": "assets/vertice-bikes/hero.webp",
  "huella-viva": "assets/huella-viva/hero.webp",
  rango: "assets/rango/hero.webp",
  arista: "assets/arista/hero.webp",
  trama: "assets/trama/hero.webp",
  rutastock: "assets/rutastock/hero.webp",
  servimant: "assets/servimant/hero.webp",
  mesaflow: "assets/mesaflow/hero.webp",
  puentesync: "assets/puentesync/hero.webp",
};
