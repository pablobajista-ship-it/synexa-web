# Conciliación de precios: propuesta del Showroom vs. catálogo vigente

**Estado (2026-10-19): precios vigentes aplicados.** 14 de los 19 paquetes usan el **precio vigente** del sitio (los 4 de alcance equivalente y diferencia de hasta +20 %, y los 10 restantes que tienen un servicio vigente propio). Quedan **5 con precio propuesto del brief, pendientes de decisión**: Catálogo Avanzado, Portal Comercial Especializado, Radio Digital Esencial, Radio Digital Profesional y Portal Multimedia Interactivo.

Fuentes:
- Propuesta: tabla del brief (`src/datos/catalogo.ts`).
- Vigente: `src/data/servicesPricing.js` del sitio principal y `Servicios-y-Precios-SYNEXA.docx` (octubre 2026). Ambos coinciden entre sí.

Todos los valores son netos en CLP, + IVA. La columna «Propuesta» muestra el precio que tiene hoy el Showroom; la diferencia es la original del brief contra el vigente, antes de aplicar la decisión.

| Paquete propuesto | Propuesta | Servicio vigente equivalente | Vigente («Desde») | Diferencia |
|---|---:|---|---:|---:|
| Landing de Captación | **349.000 (aplicado)** | Landing Page Profesional | 349.000 | +41.000 (+11,7 %) |
| Web PYME | **649.000 (aplicado)** | Sitio Web PYME | 649.000 | +41.000 (+6,3 %) |
| Corporativa Estándar | **949.000 (aplicado)** | Sitio Web Corporativo | 949.000 | +241.000 (+25,4 %) |
| Corporativa Plus | **1.290.000 (aplicado)** | Sitio Corporativo Avanzado | 1.290.000 | +500.000 (+38,8 %) |
| Catálogo Básico | **749.000 (aplicado)** | Catálogo Digital / Portal de Promociones | 749.000 | +141.000 (+18,8 %) |
| Catálogo Avanzado | 1.990.000 | Catálogo Digital / Portal de Promociones | 749.000 | +1.241.000 (+165,7 %) |
| Portal Comercial Especializado | 3.490.000 | — (sin equivalente) | — | — |
| E-commerce Esencial | **990.000 (aplicado)** | E-commerce Inicial | 990.000 | +300.000 (+30,3 %) |
| E-commerce Crecimiento | **1.490.000 (aplicado)** | E-commerce Profesional | 1.490.000 | +800.000 (+53,7 %) |
| Radio Digital Esencial | 790.000 | — (sin equivalente) | — | — |
| Radio Digital Profesional | 1.990.000 | — (sin equivalente) | — | — |
| Portal Multimedia Interactivo | 3.490.000 | — (sin equivalente) | — | — |
| Agenda Online | **890.000 (aplicado)** | Sistema de Reservas / Agendamiento | 890.000 | +300.000 (+33,7 %) |
| Portal de Clientes | **1.490.000 (aplicado)** | Portal de Clientes | 1.490.000 | +500.000 (+33,6 %) |
| Panel de Datos | **1.290.000 (aplicado)** | Base de Datos + Panel Web | 1.290.000 | +400.000 (+31,0 %) |
| Plataforma de Procesos | **1.990.000 (aplicado)** | Portal / Plataforma Empresarial | 1.990.000 | +1.300.000 (+65,3 %) |
| MVP a Medida | **2.490.000 (aplicado)** | Sistema Web a Medida / MVP | 2.490.000 | +2.500.000 (+100,4 %) |
| Rediseño Web Acotado | **490.000 (aplicado)** | Rediseño / Modernización Web | 490.000 | +100.000 (+20,4 %) |
| Integración API Simple | **390.000 (aplicado)** | Integración API / Sistemas Externos | 390.000 | +300.000 (+76,9 %) |

## Por qué importa

- Un visitante que vea 349.000 en la página actual y 390.000 en el Showroom percibirá una inconsistencia. Los saltos grandes (MVP, Plataforma de Procesos, Catálogo Avanzado) son difíciles de explicar sin cambiar también el alcance.
- Los 15 servicios vigentes publican «Desde» y varios dicen «cotización a medida». Los precios propuestos se presentan hoy con el mismo prefijo «Desde» para no prometer un precio fijo.

## Diferencias de alcance que también requieren decisión

1. **Catálogo:** el sitio vigente tiene un solo catálogo; el Showroom propone tres niveles (Básico, Avanzado, Portal Especializado).
2. **Radio:** no existe en el catálogo vigente. Es una línea nueva (tres paquetes).
3. **«Puesta en marcha»:** en el documento vigente es el período de ajustes posterior a la entrega (30/45/60 días), no el plazo de desarrollo. La ficha lo muestra con ese significado. El **plazo de entrega** no está definido en ningún documento, por eso aparece «se confirma en la propuesta».
4. **Radio** no tiene período de puesta en marcha definido (se muestra vacío en la ficha).
5. **Límites contractuales:** el documento vigente solo define «aprox. 4 a 6 páginas» (Sitio PYME) y «aprox. 6 a 10» (Corporativo). Todo lo demás figura como «Por definir» y no debe publicarse como compromiso.

## Decisión aplicada
1. **Opción mixta, primera parte:** donde el alcance es el mismo y la diferencia del brief no pasa de +20 %, se usó el precio vigente (Landing 349.000, Web PYME 649.000, Catálogo Básico 749.000, Rediseño 490.000).
2. **Segunda parte:** el resto de los paquetes con un servicio vigente propio también pasó al precio vigente (los 10 de la tabla marcados «aplicado» que no están en el punto 1). Con esto, el Showroom coincide con el sitio actual en 14 paquetes.

Efecto: los saltos grandes del brief (MVP a Medida +100 %, Plataforma de Procesos +65 %, Integración API +77 %) desaparecen. Si el alcance de esos paquetes es mayor que el del servicio vigente, habrá que subir el precio explícitamente.

## Pendientes (5 paquetes con precio propuesto)
- **Catálogo Avanzado (1.990.000):** su equivalente vigente es el mismo que el del Catálogo Básico; la diferencia es de alcance, no de precio.
- **Sin precedente vigente:** Portal Comercial Especializado (3.490.000), Radio Digital Esencial (790.000), Radio Digital Profesional (1.990.000) y Portal Multimedia Interactivo (3.490.000).

Para cambiar cualquiera: editar `precio` en `src/datos/catalogo.ts` y actualizar `src/datos/catalogo.test.ts`.

## Cómo resolver

Opción A: adoptar los 19 precios propuestos y actualizar el sitio principal. Opción B: mantener los precios vigentes en el Showroom (editar `precio` en `catalogo.ts`). Opción C: publicar los dos catálogos con roles distintos. Recomiendo A o B, para que haya un solo catálogo.

## Decisión sobre los 5 pendientes (2026-10-19)
Se publican con el precio propuesto del brief, con el prefijo «Desde» y «+ IVA»: Catálogo Avanzado 1.990.000, Portal Comercial Especializado 3.490.000, Radio Digital Esencial 790.000, Radio Digital Profesional 1.990.000 y Portal Multimedia Interactivo 3.490.000. Decisión de Pablo; no requiere cambios de código.
