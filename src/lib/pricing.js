import { CUSTOM_QUOTE_LABEL } from "@/data/servicesPricing";

/**
 * Formatea un valor NETO como moneda chilena sin decimales.
 * Devuelve null si no hay valor: quien llama decide el texto de reemplazo.
 */
export function formatAmount(amount, currency = "CLP") {
  if (typeof amount !== "number" || Number.isNaN(amount)) return null;
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Traduce un servicio o plan a las piezas que muestra una tarjeta de precio.
 *
 * Soporta: precio único de proyecto, "Desde $X", precio mensual, precio por
 * hora y cotización personalizada (cuando no hay importe).
 *
 * Siempre devuelve `tax` para que la interfaz muestre "+ IVA": los importes
 * del catálogo SYNEXA son netos.
 */
export function resolvePricing(item) {
  const {
    price,
    pricePrefix,
    taxLabel = "+ IVA",
    billingPeriod,
    unit,
    currency = "CLP",
  } = item ?? {};

  const amount = formatAmount(price, currency);

  if (!amount) {
    return {
      isCustomQuote: true,
      prefix: null,
      amount: CUSTOM_QUOTE_LABEL,
      tax: null,
      period: null,
    };
  }

  const period = billingPeriod ? `/ ${billingPeriod}` : unit ? `/ ${unit}` : null;

  return {
    isCustomQuote: false,
    prefix: pricePrefix || null,
    amount,
    tax: taxLabel,
    period,
  };
}
