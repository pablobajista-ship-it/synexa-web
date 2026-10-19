/**
 * Planes de Infraestructura Administrada y de Continuidad y Soporte.
 * Fuente: documento comercial vigente del sitio SYNEXA (src/data/infrastructurePlans.js y
 * src/data/supportPlans.js). Importes en CLP netos mensuales (+ IVA). No se inventa ninguna
 * prestación: lo que el documento no define se muestra tal cual («Tiempos de respuesta acordados»).
 */
export interface PlanMensual {
  id: string;
  nombre: string;
  /** null = a cotizar. */
  precio: number | null;
  /** «Desde» cuando el valor depende de características o criticidad. */
  desde: boolean;
  descripcion: string;
  incluye: string[];
  nota: string | null;
}

export interface PlanInfra extends PlanMensual { paraProyectos: string[]; recomendado: boolean }
export interface PlanSoporte extends PlanMensual { respuesta: string; horas: string; recomendado: boolean }
export interface SoporteHora { id: string; nombre: string; precio: number; desde: boolean; incluye: string[]; nota: string | null }

export const PLANES_INFRA: PlanInfra[] = [
  { id: "infra-web", nombre: "Infraestructura Web", precio: 24900, desde: true, descripcion: "Para proyectos que solo necesitan estar publicados y seguros.", paraProyectos: ["Landing Pages", "Sitios corporativos", "Sitios informativos"], incluye: ["Alojamiento", "Configuración", "SSL", "DNS", "Despliegues", "Monitoreo básico"], nota: "Según características y consumo.", recomendado: false },
  { id: "infra-business", nombre: "Infraestructura Business", precio: 49900, desde: true, descripcion: "Para proyectos que ya guardan información y crecen.", paraProyectos: ["Sitios avanzados", "Catálogos", "Aplicaciones pequeñas", "Portales"], incluye: ["Infraestructura web", "Base de datos cuando corresponda", "Almacenamiento", "Backups", "Monitoreo", "Administración técnica"], nota: "Según características y consumo.", recomendado: true },
  { id: "infra-empresarial", nombre: "Infraestructura Empresarial", precio: null, desde: false, descripcion: "Para plataformas con más usuarios, más datos y mayor criticidad.", paraProyectos: ["Aplicaciones", "Sistemas empresariales", "E-commerce", "Bases de datos", "Plataformas críticas", "Gran cantidad de usuarios"], incluye: [], nota: "El valor dependerá de recursos, tráfico, almacenamiento, base de datos y servicios utilizados.", recomendado: false },
];

export const PLANES_SOPORTE: PlanSoporte[] = [
  { id: "care", nombre: "SYNEXA Care", precio: 59900, desde: false, descripcion: "Landing Pages y sitios corporativos simples.", incluye: ["Monitoreo básico", "Revisión mensual", "Respaldo", "Comprobación de formularios", "Revisión de errores", "Actualizaciones técnicas cuando correspondan", "Soporte por ticket o email"], respuesta: "Respuesta inicial hasta 2 días hábiles", horas: "Hasta 30 minutos de cambios menores por mes", nota: null, recomendado: false },
  { id: "care-plus", nombre: "SYNEXA Care Plus", precio: 119900, desde: false, descripcion: "Todo lo del plan Care, con mayor frecuencia y prioridad.", incluye: ["Todo lo incluido en SYNEXA Care", "Monitoreo frecuente", "Revisión de rendimiento", "Respaldo más frecuente", "Revisión básica de Analytics / errores", "Soporte prioritario", "Informe mensual breve"], respuesta: "Respuesta inicial aproximadamente 1 día hábil", horas: "Hasta 2 horas de cambios menores mensuales", nota: null, recomendado: true },
  { id: "business", nombre: "SYNEXA Business", precio: 219900, desde: false, descripcion: "E-commerce, portales y sistemas importantes.", incluye: ["Monitoreo", "Respaldos", "Revisión de seguridad", "Rendimiento", "Revisión de formularios o transacciones", "Revisión de integraciones", "Soporte prioritario", "Reporte mensual"], respuesta: "Respuesta inicial aproximadamente 8 horas hábiles", horas: "Hasta 5 horas mensuales de desarrollo o ajustes", nota: null, recomendado: false },
  { id: "business-critical", nombre: "SYNEXA Business Critical", precio: 399900, desde: true, descripcion: "Sistemas empresariales o plataformas de mayor criticidad.", incluye: ["Monitoreo reforzado", "Respaldos", "Revisión de integraciones", "Soporte sobre funcionalidades", "Prioridad alta", "Seguimiento técnico", "Reuniones periódicas cuando corresponda"], respuesta: "Tiempos de respuesta acordados", horas: "Hasta 10 horas mensuales", nota: "El valor final depende de la complejidad y criticidad del sistema.", recomendado: false },
];

export const SOPORTE_POR_HORA: SoporteHora[] = [
  { id: "puntual", nombre: "Soporte puntual", precio: 39900, desde: false, incluye: ["Cambios de contenido", "Ajustes", "Configuración", "Pequeños desarrollos", "Diagnóstico", "Soporte técnico"], nota: null },
  { id: "urgente", nombre: "Soporte urgente", precio: 69900, desde: true, incluye: [], nota: "Servicio sujeto a disponibilidad." },
];

export const infraPorId = (id: string) => PLANES_INFRA.find((p) => p.id === id);
export const soportePorId = (id: string) => PLANES_SOPORTE.find((p) => p.id === id);
