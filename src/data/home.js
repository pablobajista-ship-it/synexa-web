/**
 * Contenido de la Homepage. Las rutas /servicios-y-precios y /demos/* las sirve
 * el SYNEXA Showroom (ver next.config.mjs); aquí solo se enlazan.
 */
import { SHOWROOM_HREF } from "@/data/showroomTeaser";

export const HOME_SOLUTIONS = [
  {
    id: "presencia",
    title: "Presencia Digital",
    text: "Páginas web, landing pages y catálogos digitales que muestran tu negocio con profesionalismo.",
    image: "/images/home/cat-presencia.webp",
    alt: "Notebook y tablet mostrando el diseño de una página web empresarial",
    href: `${SHOWROOM_HREF}?familia=presencia`,
  },
  {
    id: "comercio",
    title: "Comercio y Procesos",
    text: "Tiendas online, sistemas de reservas y portales que facilitan la operación de tu negocio.",
    image: "/images/home/cat-comercio.webp",
    alt: "Teléfono con una tienda online junto a una caja de envío y un terminal de pago",
    href: `${SHOWROOM_HREF}?familia=catalogos-comercio`,
  },
  {
    id: "sistemas",
    title: "Sistemas y Plataformas",
    text: "Aplicaciones, herramientas empresariales y desarrollos personalizados.",
    image: "/images/home/cat-sistemas.webp",
    alt: "Monitor con un panel de gestión de datos frente a una sala de servidores",
    href: `${SHOWROOM_HREF}?familia=sistemas-integracion`,
  },
];

/* Capturas reales de demos que ya funcionan en el Showroom. */
export const HOME_DEMOS = [
  { id: "punto-barrio", name: "Punto Barrio Market", category: "Catálogo para minimarket", image: "/images/home/demo-punto-barrio.webp" },
  { id: "vertice-bikes", name: "Vértice Bikes", category: "Catálogo de bicicletas", image: "/images/home/demo-vertice-bikes.webp" },
  { id: "novasur", name: "NovaSur Ingeniería", category: "Sitio para empresa de servicios", image: "/images/home/demo-novasur.webp" },
  { id: "barba-norte", name: "Barba Norte", category: "Reserva de horas online", image: "/images/home/demo-barba-norte.webp" },
];

export const HOME_STEPS = [
  { n: "01", title: "Explora", text: "Conoce las soluciones, revisa los precios y descubre los ejemplos." },
  { n: "02", title: "Conversemos", text: "Cuéntanos qué necesita tu negocio y recibe orientación sobre la alternativa más adecuada." },
  { n: "03", title: "Creamos", text: "Diseñamos, desarrollamos y publicamos la solución acordada." },
  { n: "04", title: "Te acompañamos", optional: true, text: "Una vez entregado tu proyecto, puedes contratar mantenimiento y soporte técnico para facilitar su continuidad y evolución." },
];
