# Piloto de calibración FAL (2026-10-18)

12 imágenes, costo estimado US$ 0,77 (calculado con los precios publicados; el cobro real debe verificarse en el panel de FAL). Resultados en `scripts/fal/_salida/` (no versionado).

## Hallazgos

| Prueba | FLUX.2 [pro] | Nano Banana 2 (1K) |
|---|---|---|
| Heros 16:9 (4 marcas) | Limpios y realistas; 1792×1008. Algo planos en composición (BrilloCar sin atmósfera de taller). | Más cinematográficos y fieles al estilo pedido (garaje con luz azul, escenario con cercha y haces, estudio con personas). Salen a 1376×768. |
| Antes / después | — | **Funciona la imagen de referencia**: mismo auto, mismo taller, solo cambia el estado de la pintura. |
| Retrato ficticio | — | Muy bueno y natural. |
| Producto (cabeza móvil) | Buen fondo de estudio; aparece una insignia diminuta en el equipo. | — |

## Problemas detectados

1. **Logotipos de marcas reales en autos.** BrilloCar salió con la estrella de una marca conocida (FLUX) y un emblema VW (Nano). Hay que reforzar el prompt («generic fictional car, no brand emblems or badges») y revisar cada imagen de autos.
2. **Resolución de Nano Banana 2 a 1K = 1376×768** para 16:9, insuficiente para heros a pantalla completa en pantallas de alta resolución. A 2K cuesta US$ 0,12.
3. **Insignias o texto diminuto en productos** (por ejemplo, el equipo de iluminación). Hay que revisar a mano y regenerar las que lo muestren.

## Recomendación

- **Nano Banana 2** para heros, banners, escenas con personas y todo lo que requiera coherencia (retratos, antes/después). Heros y banners a 2K.
- **FLUX.2 [pro]** para productos sobre fondo limpio y fotografía de objetos, donde es más barato y suficiente.
- Agregar a todos los prompts la cláusula de «sin emblemas ni insignias».
