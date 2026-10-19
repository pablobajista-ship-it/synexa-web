# Inventario de imágenes FAL y presupuesto (Paso 4)

**Estado (2026-10-19): las 225 imágenes del inventario están generadas y revisadas. Gasto total estimado ≈ US$ 34,5 (calibración, pilotos, regeneraciones y tandas 1 a 3; estimado con precios publicados, no verificado contra el panel de facturación de FAL). Este documento conserva el inventario y la propuesta original de presupuesto.**

Fecha de verificación de precios: 2026-10-18 (páginas de modelo en fal.ai). Los precios pueden cambiar; el piloto sirve para confirmarlos con el cobro real.

## Resumen

| | Cantidad | Costo |
|---|---:|---:|
| Imágenes planificadas (19 empresas) | **225** | |
| Con 1 intento por imagen | | US$ 9,93 |
| **Recomendado: 3 intentos por imagen** (elegir la mejor) | 675 generaciones | **US$ 29,79** |
| Peor caso (redondeo de megapíxeles hacia arriba, 3 intentos) | | US$ 32,89 |
| Piloto previo (ver abajo) | ~12 generaciones | ≈ US$ 0,80 |

Reparto con 3 intentos: cuatro pilotos (47 imágenes) US$ 6,54; las otras quince empresas (178 imágenes) US$ 23,25.

El costo es bajo porque las imágenes se generan a ~1–2 megapíxeles y se optimizan a WebP para la web. Si se quisiera calidad 4K, el costo se multiplicaría y no se necesita para pantallas de este tamaño.

## Modelos propuestos

| Uso | Modelo (endpoint) | Precio FAL | Imágenes |
|---|---|---|---:|
| Fotografía comercial general: heros, ambientes, interiores, productos, arquitectura, gastronomía | **FLUX.2 [pro]** (`fal-ai/flux-2-pro`) | US$ 0,03 el primer megapíxel + 0,015 por cada adicional (1920×1080 = US$ 0,045) | 201 |
| Personajes recurrentes, retratos y pares antes/después que deben ser coherentes | **Nano Banana 2** (`fal-ai/nano-banana-2`) a 1K | US$ 0,08 (2K US$ 0,12; 4K US$ 0,16) | 24 |

Por qué estos dos:
- FLUX.2 [pro] está marcado «Commercial use» en FAL y da buena fotografía realista a bajo costo.
- Nano Banana 2 admite hasta 14 imágenes de referencia, lo que permite mantener la misma persona o el mismo auto entre imágenes («antes/después», locutores que aparecen en varias secciones).

Descartados por ahora: variantes FLUX [dev] (licencia con restricciones para uso comercial), Seedream e Imagen 4 (no pude confirmar precio en FAL ni condiciones comerciales).

## Puntos de licencia y riesgo que debes conocer

1. **Los términos de FAL no declaran con claridad la propiedad de las imágenes generadas ni su uso comercial.** Hablan de «uso personal o interno del negocio» y dejan el riesgo de uso en el cliente (§4, §16). Las páginas de FAL de ambos modelos sí marcan uso comercial, pero **conviene que SYNEXA lo confirme por escrito con FAL** antes de publicar las imágenes en un sitio comercial.
2. **Nano Banana 2 agrega una marca invisible SynthID** a las imágenes. No se ve, pero existe.
3. Los enlaces de resultado de FAL son temporales: el flujo descargará y guardará cada imagen aprobada en `public/assets/<empresa>/`.
4. Las imágenes que muestran personas son retratos de personas ficticias. No se pedirá parecido con personas reales.

## Plan de generación (solo tras tu aprobación)

1. **Piloto de calibración (≈ US$ 0,80, ~12 generaciones).** Un hero de cada marca piloto con *ambos* modelos (8), un par antes/después de BrilloCar (2), un retrato (1) y un producto de Lúmina Pro (1). Sirve para elegir modelo y ajustar el estilo antes de gastar el resto.
2. **Lote de las 4 marcas piloto** (47 imágenes, ≈ US$ 6,54 con 3 intentos), con tu revisión de calidad.
3. **Lote de las 15 restantes** (178 imágenes, ≈ US$ 23,25) solo si los pilotos se aprueban.
4. **Regeneración individual:** el script aceptará `--empresa` y `--id` para rehacer una sola imagen sin tocar el resto.

## Reglas de dirección artística aplicadas a todos los prompts

- Fotografía comercial editorial, sin textos, logotipos ni marcas de agua dentro de la imagen.
- Cada empresa tiene un bloque de estilo propio (iluminación, paleta, materiales) que se repite en todos sus prompts para dar coherencia.
- Productos sin marcas reales: empaques genéricos.
- Logotipos: siempre vectoriales en SVG, nunca generados por IA.
- Formatos: hero 16:9, banner 21:9, tarjeta 4:3, vertical 3:4, producto 1:1.

## Archivos

- `scripts/fal/inventario.mjs`: las 225 imágenes con prompt, modelo, tamaño y archivo destino.
- `scripts/fal/presupuesto.mjs`: calcula el presupuesto (`node scripts/fal/presupuesto.mjs`).
- `docs/imagenes/manifiesto.json`: manifiesto generado (empresa, id, tipo, uso, prompt, modelo, dimensiones, archivo, aprobación, costo real).

## Lo que necesito de ti

1. Aprobar (o ajustar) el presupuesto: **piloto ≈ US$ 0,80** y, si te convence, el total de hasta **≈ US$ 33**.
2. Poner tu `FAL_KEY` en `synexa-showroom/.env` (copiando `.env.example`). Yo no la veo ni la escribo en ningún archivo versionado.
3. Decidir si pides confirmación escrita a FAL sobre uso comercial antes de publicar.
