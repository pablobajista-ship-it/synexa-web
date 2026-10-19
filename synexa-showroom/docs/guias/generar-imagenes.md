# Generar imágenes con FAL

La generación corre **solo en local** y **cuesta dinero**. La clave `FAL_KEY` va en `.env` (ignorado por git; `.env.example` no lleva credenciales) y nunca se importa desde `src/`.

## Reglas
- Todo comando es una **simulación** salvo que lleve `--confirmar`. Simula primero y revisa el costo.
- No se consumen créditos sin aprobación presupuestaria expresa.
- Los costos del registro son estimados con precios publicados; verifícalos contra el panel de facturación de FAL.

## Flujo
1. Define las imágenes de la marca en `scripts/fal/inventario.mjs` (id, formato, prompt, modelo).
2. Simula: `node scripts/fal/generar.mjs --empresa <marca> --intentos 2`
3. Genera: `node scripts/fal/generar.mjs --empresa <marca> --intentos 2 --confirmar`. Los originales quedan en `scripts/fal/_salida/` (ignorada por git) y cada llamada se anota en `registro.jsonl`.
4. **Revisa cada imagen a tamaño completo.** Descarta las que muestren texto, logotipos o marcas reales, siluetas de vehículos reconocibles, collages o rostros y manos deformes.
5. Registra la elección copiando `scripts/fal/preseleccion-tanda3.mjs` a un script nuevo con tus decisiones (`id: variante` o `[variante, "ok" | "reserva" | "regenerar", nota]`). Actualiza `docs/imagenes/manifiesto.json`.
6. Copia las WebP elegidas desde `scripts/fal/_salida/preseleccion/<marca>/` a `public/assets/<marca>/`.
7. Para rehacer una sola imagen: `--id <imagen> --extra "<instrucción más estricta>" --confirmar`.

## Lecciones de calidad
Los modelos reproducen siluetas y logotipos reales, inventan texto en etiquetas y pantallas, y a veces entregan collages. Los prompts piden «sin texto, logotipos, emblemas ni marcas de agua» y, para vehículos y productos, añaden cláusulas estrictas (ver `generar.mjs`).

## Licencia
Las condiciones de FAL sobre uso comercial de las imágenes generadas no están confirmadas por escrito. Confírmalo antes de usar estas imágenes en una publicación comercial.
