export const STATUS_STYLES = {
  NUEVO: "bg-blue-50 text-blue-700 border-blue-200",
  RECIBIDO: "bg-blue-50 text-blue-700 border-blue-200",
  EN_REVISION: "bg-indigo-50 text-indigo-700 border-indigo-200",
  EN_PROCESO: "bg-amber-50 text-amber-700 border-amber-200",
  ESPERANDO_CLIENTE: "bg-purple-50 text-purple-700 border-purple-200",
  RESUELTO: "bg-green-50 text-green-700 border-green-200",
  CERRADO: "bg-slate-100 text-slate-600 border-slate-200",
  CANCELADO: "bg-red-50 text-red-600 border-red-200",
};

export const PRIORITY_STYLES = {
  BAJA: "bg-slate-100 text-slate-600 border-slate-200",
  NORMAL: "bg-blue-50 text-blue-700 border-blue-200",
  ALTA: "bg-orange-50 text-orange-700 border-orange-200",
  URGENTE: "bg-red-50 text-red-700 border-red-200",
};

export function formatDate(isoString) {
  if (!isoString) return "";
  const date = new Date(isoString.includes("T") ? isoString : isoString.replace(" ", "T") + "Z");
  return date.toLocaleString("es-CL", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
