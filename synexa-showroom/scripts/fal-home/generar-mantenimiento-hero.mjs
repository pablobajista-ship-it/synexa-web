/**
 * Variantes del hero de /mantenimiento-web (mismo estilo que los heros de Home y Nosotros). Solo local.
 *   cd synexa-showroom && node scripts/fal-home/generar-mantenimiento-hero.mjs [--confirmar]
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
const { fal } = await import("@fal-ai/client");
const BASE = "Premium digital agency website visual, sophisticated corporate technology aesthetic, deep navy blue and electric blue color palette, subtle teal accents, elegant lighting, refined composition, realistic materials, premium commercial advertising quality, high detail, visually clean, no people, no text, no letters, no logos, no watermark, all screens show only abstract blurred interface shapes without readable text.";
const V = [
  `${BASE} Technical operations desk at dusk: an ultrawide monitor showing an abstract website health dashboard with glowing teal status indicators, smooth line charts and soft blue panels, a laptop beside it with code-like abstract shapes, a small server rack glowing softly in the background, teal rim light, shallow depth of field.`,
  `${BASE} Monitor and notebook on a dark desk showing a modern website next to abstract maintenance panels with glowing checkmark icons, circular progress rings and update indicators in electric blue and teal, a subtle glowing shield shape floating above the screen, cinematic lighting, deep navy gradient background.`,
];
console.log(`${V.length} generaciones ≈ US$ ${(V.length * 0.05).toFixed(2)}`);
if (!process.argv.includes("--confirmar")) { console.log("Simulación. Agrega --confirmar."); process.exit(0); }
if (!process.env.FAL_KEY) { console.error("Falta FAL_KEY"); process.exit(1); }
fal.config({ credentials: process.env.FAL_KEY });
const OUT = "scripts/fal-home/_salida"; mkdirSync(OUT, { recursive: true });
for (const [i, prompt] of V.entries()) {
  try {
    const r = await fal.subscribe("fal-ai/flux-2-pro", { input: { prompt, image_size: { width: 1536, height: 1024 }, output_format: "png" } });
    writeFileSync(join(OUT, `mantenimiento-hero-v${i + 1}.png`), Buffer.from(await (await fetch(r.data.images[0].url)).arrayBuffer()));
    console.log(`✓ v${i + 1}`);
  } catch (e) { console.error(`✗ v${i + 1}: ${e.message}`); }
}
