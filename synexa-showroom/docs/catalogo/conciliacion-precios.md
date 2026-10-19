# Conciliación de precios: propuesta del Showroom vs. catálogo vigente

**Estado (2026-10-19): decisión mixta aplicada.** Los cuatro paquetes de alcance equivalente y diferencia de hasta +20 % usan el **precio vigente** del sitio (Landing, Web PYME, Catálogo Básico y Rediseño). Los otros 15 siguen con el precio propuesto en el brief, **pendientes de decisión caso por caso** (ver «Pendientes»).

Fuentes:
- Propuesta: tabla del brief (`src/datos/catalogo.ts`).
- Vigente: `src/data/servicesPricing.js` del sitio principal y `Servicios-y-Precios-SYNEXA.docx` (octubre 2026). Ambos coinciden entre sí.

Todos los valores son netos en CLP, + IVA. La columna «Propuesta» muestra el precio que tiene hoy el Showroom; la diferencia es la original del brief contra el vigente, antes de aplicar la decisión.

| Paquete propuesto | Propuesta | Servicio vigente equivalente | Vigente («Desde») | Diferencia |
|---|---:|---|---:|---:|
| Landing de Captación | **349.000 (aplicado)** | Landing Page Profesional | 349.000 | +41.000 (+11,7 %) |
| Web PYME | **649.000 (aplicado)** | Sitio Web PYME | 649.000 | +41.000 (+6,3 %) |
| Corporativa Estándar | 1.190.000 | Sitio Web Corporativo | 949.000 | +241.000 (+25,4 %) |
| Corporativa Plus | 1.790.000 | Sitio Corporativo Avanzado | 1.290.000 | +500.000 (+38,8 %) |
| Catálogo Básico | **749.000 (aplicado)** | Catálogo Digital / Portal de Promociones | 749.000 | +141.000 (+18,8 %) |
| Catálogo Avanzado | 1.990.000 | Catálogo Digital / Portal de Promociones | 749.000 | +1.241.000 (+165,7 %) |
| Portal Comercial Especializado | 3.490.000 | — (sin equivalente) | — | — |
| E-commerce Esencial | 1.290.000 | E-commerce Inicial | 990.000 | +300.000 (+30,3 %) |
| E-commerce Crecimiento | 2.290.000 | E-commerce Profesional | 1.490.000 | +800.000 (+53,7 %) |
| Radio Digital Esencial | 790.000 | — (sin equivalente) | — | — |
| Radio Digital Profesional | 1.990.000 | — (sin equivalente) | — | — |
| Portal Multimedia Interactivo | 3.490.000 | — (sin equivalente) | — | — |
| Agenda Online | 1.190.000 | Sistema de Reservas / Agendamiento | 890.000 | +300.000 (+33,7 %) |
| Portal de Clientes | 1.990.000 | Portal de Clientes | 1.490.000 | +500.000 (+33,6 %) |
| Panel de Datos | 1.690.000 | Base de Datos + Panel Web | 1.290.000 | +400.000 (+31,0 %) |
| Plataforma de Procesos | 3.290.000 | Portal / Plataforma Empresarial | 1.990.000 | +1.300.000 (+65,3 %) |
| MVP a Medida | 4.990.000 | Sistema Web a Medida / MVP | 2.490.000 | +2.500.000 (+100,4 %) |
| Rediseño Web Acotado | **490.000 (aplicado)** | Rediseño / Modernización Web | 490.000 | +100.000 (+20,4 %) |
| Integración API Simple | 690.000 | Integración API / Sistemas Externos | 390.000 | +300.000 (+76,9 %) |

## Por qué importa

- Un visitante que vea 349.000 en la página actual y 390.000 en el Showroom percibirá una inconsistencia. Los saltos grandes (MVP, Plataforma de Procesos, Catálogo Avanzado) son difíciles de explicar sin cambiar también el alcance.
- Los 15 servicios vigentes publican «Desde» y varios dicen «cotización a medida». Los precios propuestos se presentan hoy con el mismo prefijo «Desde» para no prometer un precio fijo.

## Diferencias de alcance que también requieren decisión

1. **Catálogo:** el sitio vigente tiene un solo catálogo; el Showroom propone tres niveles (Básico, Avanzado, Portal Especializado).
2. **Radio:** no existe en el catálogo vigente. Es una línea nueva (tres paquetes).
3. **«Puesta en marcha»:** en el documento vigente es el período de ajustes posterior a la entrega (30/45/60 días), no el plazo de desarrollo. La ficha lo muestra con ese significado. El **plazo de entrega** no está definido en ningún documento, por eso aparece «se confirma en la propuesta».
4. **Radio** no tiene período de puesta en marcha definido (se muestra vacío en la ficha).
5. **Límites contractuales:** el documento vigente solo define «aprox. 4 a 6 páginas» (Sitio PYME) y «aprox. 6 a 10» (Corporativo). Todo lo demás figura como «Por definir» y no debe publicarse como compromiso.

## Decisión aplicada (opción mixta)
Regla: donde el alcance es el mismo que el del servicio vigente y la diferencia del brief no pasa de +20 %, el Showroom usa el precio vigente.

| Paquete | Antes | Ahora |
|---|---:|---:|
| Landing de Captación | 390.000 | 349.000 |
| Web PYME | 690.000 | 649.000 |
| Catálogo Básico | 890.000 | 749.000 |
| Rediseño Web Acotado | 590.000 | 490.000 |

## Pendientes (decisión caso por caso)
Estos paquetes conservan el precio del brief hasta que SYNEXA los apruebe o los cambie:
- **Diferencia de +25 % a +40 %:** Corporativa Estándar, E-commerce Esencial, Panel de Datos, Portal de Clientes, Agenda Online y Corporativa Plus.
- **Saltos de más de +50 %:** E-commerce Crecimiento, Plataforma de Procesos, Integración API Simple y MVP a Medida. Solo se sostienen si el alcance creció respecto del servicio vigente.
- **Catálogo Avanzado:** su equivalente vigente es el mismo que el del Catálogo Básico; la diferencia es de alcance, no de precio.
- **Sin precedente vigente:** Portal Comercial Especializado, Radio Digital Esencial, Radio Digital Profesional y Portal Multimedia Interactivo.

Para cambiar cualquiera: editar `precio` en `src/datos/catalogo.ts` y actualizar `src/datos/catalogo.test.ts`.

## Cómo resolver

Opción A: adoptar los 19 precios propuestos y actualizar el sitio principal. Opción B: mantener los precios vigentes en el Showroom (editar `precio` en `catalogo.ts`). Opción C: publicar los dos catálogos con roles distintos. Recomiendo A o B, para que haya un solo catálogo.
