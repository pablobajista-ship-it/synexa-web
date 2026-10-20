/**
 * Imágenes FAL para /nosotros y /contacto. Solo local. Simulación por defecto; --confirmar gasta créditos.
 *   cd synexa-showroom && node scripts/fal-home/generar-institucional.mjs [--confirmar]
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
const { fal } = await import("@fal-ai/client");
const IMAGENES = [
  { id: "nosotros", w: 1536, h: 1024, prompt: "Premium digital technology studio visual, modern website interfaces displayed across elegant screens, sophisticated corporate environment, high-end commercial photography, deep navy blue and teal color accents, clean modern composition, realistic lighting, professional editorial aesthetic, elegant technology workspace, no people, no text, no readable writing on screens, no logos, no watermark." },
  { id: "contacto", w: 1280, h: 1024, prompt: "Premium digital agency communication concept, elegant modern workspace with laptop and smartphone, refined business communication atmosphere, subtle digital interface elements, warm professional lighting, dark navy and teal accents, clean premium composition, commercial editorial photography, no people, no text, no readable writing on screens, no logos, no watermark." },
];
console.log(`${IMAGENES.length} generaciones ≈ US$ 0.08`);
if (!process.argv.includes("--confirmar")) { console.log("Simulación. Agrega --confirmar."); process.exit(0); }
if (!process.env.FAL_KEY) { console.error("Falta FAL_KEY"); process.exit(1); }
fal.config({ credentials: process.env.FAL_KEY });
const OUT = "scripts/fal-home/_salida"; mkdirSync(OUT, { recursive: true });
for (const x of IMAGENES) {
  try {
    const r = await fal.subscribe("fal-ai/flux-2-pro", { input: { prompt: x.prompt, image_size: { width: x.w, height: x.h }, output_format: "png" } });
    writeFileSync(join(OUT, `inst-${x.id}.png`), Buffer.from(await (await fetch(r.data.images[0].url)).arrayBuffer()));
    console.log(`✓ ${x.id}`);
  } catch (e) { console.error(`✗ ${x.id}: ${e.message}`); }
}
