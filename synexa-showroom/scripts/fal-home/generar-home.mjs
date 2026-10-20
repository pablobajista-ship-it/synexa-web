/**
 * Imágenes FAL del Home de SYNEXA (hero + 3 categorías). Solo local.
 * Simulación por defecto; --confirmar para gastar créditos. Lee FAL_KEY del entorno.
 *   cd synexa-showroom && node scripts/fal-home/generar-home.mjs [--confirmar]
 * Salida en scripts/fal-home/_salida (ignorada por git); luego se optimizan a WebP en public/images/home/.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
const { fal } = await import("@fal-ai/client");

const BASE =
  "Premium digital agency website visual, sophisticated corporate technology aesthetic, deep navy blue and electric blue color palette, subtle teal accents, elegant lighting, refined composition, realistic materials, premium commercial advertising quality, professional art direction, high detail, visually clean, no text, no letters, no logos, no watermark, all screens show only abstract blurred interface shapes without readable text.";
const IMAGENES = [
  { id: "hero", w: 1536, h: 1024, intentos: 2, prompt: `${BASE} Hero image: a sleek dark desk scene with a large ultrawide monitor, a laptop and a smartphone floating slightly at different depths, showing abstract modern website layouts with image blocks and cards, glowing teal rim light, deep navy background, shallow depth of field, cinematic.` },
  { id: "presencia", w: 1280, h: 960, intentos: 1, prompt: `${BASE} Close-up of a laptop and a tablet on a polished dark surface showing an elegant minimal business landing page layout with large photo and buttons as abstract shapes, soft blue light, calm composition.` },
  { id: "comercio", w: 1280, h: 960, intentos: 1, prompt: `${BASE} A smartphone showing an abstract online store product grid next to a small matte shipping box and a card payment terminal, on a dark navy surface, teal highlights, e-commerce concept, product photography style.` },
  { id: "sistemas", w: 1280, h: 960, intentos: 1, prompt: `${BASE} A wide monitor displaying an abstract business dashboard with charts, tables and data cards as blurred shapes, server-room blue glow in the background, structured light lines, enterprise software concept.` },
];
const total = IMAGENES.reduce((a, x) => a + x.intentos * (0.03 + 0.015 * Math.max(0, (x.w * x.h) / 1e6 - 1)), 0);
console.log(`${IMAGENES.reduce((a, x) => a + x.intentos, 0)} generaciones ≈ US$ ${total.toFixed(2)}`);
if (!process.argv.includes("--confirmar")) { console.log("Simulación. Agrega --confirmar."); process.exit(0); }
if (!process.env.FAL_KEY) { console.error("Falta FAL_KEY"); process.exit(1); }
fal.config({ credentials: process.env.FAL_KEY });
const OUT = "scripts/fal-home/_salida"; mkdirSync(OUT, { recursive: true });
for (const x of IMAGENES) for (let n = 1; n <= x.intentos; n++) {
  try {
    const r = await fal.subscribe("fal-ai/flux-2-pro", { input: { prompt: x.prompt, image_size: { width: x.w, height: x.h }, output_format: "png" } });
    const buf = Buffer.from(await (await fetch(r.data.images[0].url)).arrayBuffer());
    writeFileSync(join(OUT, `${x.id}-${n}.png`), buf);
    console.log(`✓ ${x.id}-${n}`);
  } catch (e) { console.error(`✗ ${x.id}-${n}: ${e.message}`); }
}
