export type FamiliaId =
  | "presencia"
  | "catalogos-comercio"
  | "radio-multimedia"
  | "gestion-clientes"
  | "sistemas-integracion";

export type LineaId =
  | "landing"
  | "sitios-web"
  | "rediseno"
  | "catalogos"
  | "comercio-electronico"
  | "radio-digital"
  | "agenda"
  | "portal-clientes"
  | "datos-procesos"
  | "integraciones";

export type NecesidadId =
  | "ser-encontrado"
  | "mostrar-productos"
  | "vender-online"
  | "radio-comunidad"
  | "agendar-clientes"
  | "ordenar-operacion"
  | "conectar-sistemas"
  | "renovar-web";

export interface Familia {
  id: FamiliaId;
  nombre: string;
  descripcion: string;
}

export interface Linea {
  id: LineaId;
  familia: FamiliaId;
  nombre: string;
  descripcion: string;
}

export interface Necesidad {
  id: NecesidadId;
  etiqueta: string;
  pregunta: string;
}

/**
 * Un límite contractual del paquete. `valor: null` significa "no definido en el
 * documento comercial vigente": se muestra como «Por definir» y NO como compromiso.
 */
export interface Limite {
  concepto: string;
  valor: string | null;
}

export interface Paquete {
  id: string; // slug estable, usado en rutas
  nombre: string;
  linea: LineaId;
  /** Precio base neto en CLP (sin IVA). */
  precio: number;
  resumen: string;
  publico: string;
  problema: string;
  resultado: string;
  incluye: string[];
  limites: Limite[];
  noIncluye: string[];
  /** Plazo de entrega estimado en semanas. null = aún no definido por SYNEXA. */
  plazoSemanas: [number, number] | null;
  costosExternos: string[];
  /** Qué agrega respecto al nivel anterior de su línea. null = primer nivel. */
  diferenciaNivelAnterior: string | null;
  /** Ids de ModuloAdicional. */
  modulos: string[];
  necesidades: NecesidadId[];
  /** Id de la marca ficticia / demostración asociada. */
  demo: string;
  /** Días de puesta en marcha (garantía posterior a la entrega) según documento vigente. */
  puestaEnMarcha: 30 | 45 | 60 | null;
}

export interface ModuloAdicional {
  id: string;
  nombre: string;
  descripcion: string;
  /** null = «Por cotizar»: no existe tarifa aprobada. */
  precio: number | null;
}

export type EstadoDemo = "pendiente" | "piloto" | "publicada";

export interface Marca {
  id: string; // slug de /demos/:id
  nombre: string;
  rubro: string;
  concepto: string;
  /** [fondo oscuro, color principal, acento] */
  colores: [string, string, string];
  /** Sigla para el isotipo SVG. */
  sigla: string;
  estado: EstadoDemo;
}
