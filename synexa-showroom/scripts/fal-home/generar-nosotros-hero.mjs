/**
 * Variantes del hero de /nosotros (más luminoso, mismo estilo que el hero del Home). Solo local.
 *   cd synexa-showroom && node scripts/fal-home/generar-nosotros-hero.mjs [--confirmar]
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
const { fal } = await import("@fal-ai/client");
const BASE = "Premium digital agency website visual, sophisticated corporate technology aesthetic, deep navy blue and electric blue color palette, subtle teal accents, elegant lighting, refined composition, realistic materials, premium commercial advertising quality, high detail, visually clean, no people, no text, no letters, no logos, no watermark, all screens show only abstract blurred interface shapes without readable text.";
const V = [
  `${BASE} Creative design studio desk at dusk: a large ultrawide monitor and a laptop showing vivid modern website layouts with glowing blue and teal gradient cards, a graphic tablet with stylus, small color swatches and a succulent plant, glowing teal rim light, soft bokeh city lights through a window in the background, cinematic shallow depth of field.`,
  `${BASE} Low angle hero shot of three devices (a monitor, a notebook and a smartphone) floating slightly at different depths, glowing with colorful abstract web interface cards in electric blue, teal and soft magenta, volumetric light beams, deep navy gradient background, premium product advertising render.`,
];
console.log(`${V.length} generaciones ≈ US$ ${(V.length * 0.05).toFixed(2)}`);
if (!process.argv.includes("--confirmar")) { console.log("Simulación. Agrega --confirmar."); process.exit(0); }
fal.config({ credentials: process.env.FAL_KEY });
const OUT = "scripts/fal-home/_salida"; mkdirSync(OUT, { recursive: true });
for (const [i, prompt] of V.entries()) {
  try {
    const r = await fal.subscribe("fal-ai/flux-2-pro", { input: { prompt, image_size: { width: 1536, height: 1024 }, output_format: "png" } });
    writeFileSync(join(OUT, `nosotros-hero-v${i + 1}.png`), Buffer.from(await (await fetch(r.data.images[0].url)).arrayBuffer()));
    console.log(`✓ v${i + 1}`);
  } catch (e) { console.error(`✗ v${i + 1}: ${e.message}`); }
}
