const clp = new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP", maximumFractionDigits: 0 });

/** $1.190.000 */
export const formatoCLP = (n: number) => clp.format(n);

export const formatoPlazo = (p: [number, number] | null) => (p ? `${p[0]} a ${p[1]} semanas` : null);
