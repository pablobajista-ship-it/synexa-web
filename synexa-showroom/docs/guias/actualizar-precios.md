# Actualizar precios, límites y módulos

Toda la información comercial vive en un solo archivo: `src/datos/catalogo.ts`. Ningún componente repite precios; el catálogo, las fichas, el comparador, «Arma tu solución» y el resumen leen de ahí.

## Precio de un paquete
1. Abre `src/datos/catalogo.ts` y busca el paquete por su `id` (por ejemplo `landing-captacion`).
2. Cambia `precio` (pesos chilenos **netos**, sin IVA). El IVA se calcula y se muestra aparte.
3. Mantén los niveles de una misma línea en orden ascendente de precio: una prueba lo verifica.
4. Ejecuta `npm test` y `npm run typecheck`.

## Límites contractuales
Cada paquete tiene `limites: [{ concepto, valor }]`. Un `valor: null` se muestra como **«Por definir»** y no es un compromiso. Solo escribe un valor cuando exista en el documento comercial vigente.

## Plazos y puesta en marcha
- `plazoSemanas: [mínimo, máximo]` o `null` (se muestra «se confirma en la propuesta» o «Por definir»).
- `puestaEnMarcha`: 30, 45, 60 o `null`.

## Módulos adicionales
La lista está en `MODULOS` (mismo archivo). Mientras `precio` sea `null` se muestra **«Por cotizar»** y no suma al total del configurador. Para aprobar una tarifa, escribe el precio neto: el configurador la sumará solo. Cada paquete indica qué módulos admite con `modulos: [ids]`.

## Planes de infraestructura y soporte
Están en `src/datos/infraSoporte.ts` y reflejan el documento vigente del sitio (`src/data/infrastructurePlans.js` y `src/data/supportPlans.js`). Si el sitio cambia, actualiza ambos lugares.

## Antes de publicar
14 paquetes usan el precio vigente del sitio; los otros 5 son una **propuesta pendiente de validación** (ver `docs/catalogo/conciliacion-precios.md`). No los publiques como definitivos sin esa aprobación.
