import type { Marca } from "./tipos";

/**
 * Las 19 empresas ficticias. Los colores salen de la identidad definida en el
 * brief de cada demostración; el logotipo final se dibuja en SVG (nunca con IA).
 */
export const MARCAS: Marca[] = [
  { id: "brillo-car", nombre: "BrilloCar Detailing", rubro: "Detailing y estética automotriz", concepto: "Captación de clientes por WhatsApp y formulario.", colores: ["#14161b", "#2f6bff", "#ffffff"], sigla: "BC", estado: "piloto" },
  { id: "molino-sur", nombre: "Molino Sur", rubro: "Panadería y cafetería artesanal", concepto: "Presencia completa para un negocio de barrio.", colores: ["#3b2a20", "#c2693f", "#f4ead8"], sigla: "MS", estado: "publicada" },
  { id: "novasur", nombre: "NovaSur Ingeniería", rubro: "Ingeniería y mantenimiento industrial", concepto: "Sitio corporativo con proyectos, equipo y noticias.", colores: ["#0e3b4a", "#2b7a8c", "#e8eef0"], sigla: "NS", estado: "piloto" },
  { id: "arista", nombre: "Arista Propiedades", rubro: "Corretaje e inversión inmobiliaria", concepto: "Listado de propiedades con filtros y administración simulada.", colores: ["#0b1f3f", "#1c3d73", "#c9a24b"], sigla: "AP", estado: "publicada" },
  { id: "punto-barrio", nombre: "Punto Barrio Market", rubro: "Minimarket y almacén", concepto: "Catálogo sencillo sin venta en línea.", colores: ["#1f5a34", "#f08a24", "#ffffff"], sigla: "PB", estado: "publicada" },
  { id: "vertice-bikes", nombre: "Vértice Bikes", rubro: "Bicicletas, repuestos y accesorios", concepto: "Catálogo con filtros avanzados y fichas técnicas.", colores: ["#0d0d0d", "#2ecc71", "#ffffff"], sigla: "VB", estado: "publicada" },
  { id: "lumina-pro", nombre: "Lúmina Pro", rubro: "Iluminación y audio profesional", concepto: "Portal técnico que ayuda a elegir equipos.", colores: ["#12123a", "#7c4ddb", "#ffffff"], sigla: "LP", estado: "piloto" },
  { id: "huella-viva", nombre: "Huella Viva", rubro: "Tienda de mascotas", concepto: "Tienda online completa en su nivel inicial.", colores: ["#4d6b57", "#c2693f", "#f5efe2"], sigla: "HV", estado: "publicada" },
  { id: "rango", nombre: "Rango Activewear", rubro: "Ropa y accesorios deportivos", concepto: "Tienda con variantes, cupones y panel de ventas.", colores: ["#0d0d0d", "#ff6a1a", "#ffffff"], sigla: "RA", estado: "publicada" },
  { id: "puerto-fm", nombre: "Puerto FM", rubro: "Radio local", concepto: "Radio informativa con reproductor y programación.", colores: ["#0f2a52", "#ff7a1a", "#ffffff"], sigla: "PF", estado: "publicada" },
  { id: "tiempo-retro", nombre: "Tiempo Retro", rubro: "Radio musical de clásicos", concepto: "Radio con archivo, programas y panel editorial.", colores: ["#0f4a56", "#e8742a", "#f5ead3"], sigla: "TR", estado: "publicada" },
  { id: "frecuencia-mix", nombre: "Frecuencia Mix", rubro: "Radio y comunidad musical", concepto: "Plataforma comunitaria con chat, votaciones y trivia.", colores: ["#0a1a4a", "#14b8a6", "#8b5cf6"], sigla: "FM", estado: "piloto" },
  { id: "barba-norte", nombre: "Barba Norte", rubro: "Barbería masculina", concepto: "Reserva de horas con agenda y panel.", colores: ["#121212", "#b87333", "#e9dfcb"], sigla: "BN", estado: "publicada" },
  { id: "trama", nombre: "Trama Arquitectura", rubro: "Estudio de arquitectura", concepto: "Portal privado para clientes de proyecto.", colores: ["#161616", "#c9b28a", "#ffffff"], sigla: "TA", estado: "publicada" },
  { id: "rutastock", nombre: "RutaStock", rubro: "Distribuidora de productos", concepto: "Panel de inventario con indicadores y reportes.", colores: ["#0f3d75", "#1fa463", "#ffffff"], sigla: "RS", estado: "publicada" },
  { id: "servimant", nombre: "Servimant", rubro: "Mantenimiento industrial", concepto: "Órdenes de trabajo, técnicos y estados de proceso.", colores: ["#0b1f44", "#f26a1b", "#d6dbe3"], sigla: "SM", estado: "publicada" },
  { id: "mesaflow", nombre: "MesaFlow", rubro: "Soporte informático empresarial", concepto: "Plataforma de tickets con reglas de negocio propias.", colores: ["#0b1f44", "#14b8a6", "#ffffff"], sigla: "MF", estado: "publicada" },
  { id: "brasa-costa", nombre: "Brasa Costa", rubro: "Restaurante", concepto: "Rediseño antes/después de un sitio existente.", colores: ["#1a1210", "#c2552f", "#f3e6d2"], sigla: "BC", estado: "publicada" },
  { id: "puentesync", nombre: "PuenteSync", rubro: "Integración de sistemas", concepto: "Dos sistemas conectados por un flujo acotado.", colores: ["#0b1f44", "#14b8a6", "#ffffff"], sigla: "PS", estado: "publicada" },
];

export const marcaPorId = (id: string) => MARCAS.find((m) => m.id === id);
