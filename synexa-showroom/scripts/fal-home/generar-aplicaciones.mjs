/**
 * Imágenes FAL para /aplicaciones-para-negocios (veterinaria, consulta, estética, taller). Solo local.
 * Simulación por defecto; --confirmar para gastar créditos. Lee FAL_KEY del entorno.
 *   cd synexa-showroom && node scripts/fal-home/generar-aplicaciones.mjs [--confirmar]
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
const { fal } = await import("@fal-ai/client");
const BASE =
  "Premium commercial photography for a professional digital agency website, realistic modern business environment, elegant composition, sophisticated natural lighting, professional advertising quality, refined details, contemporary Chilean business context, subtle navy blue and teal visual harmony, authentic business setting, no text, no logos, no signage lettering, no watermark, no readable writing on any screen or sign.";
const IMAGENES = [
  { id: "veterinaria", skip: true, prompt: `${BASE} Bright modern veterinary clinic consultation room, a friendly veterinarian in teal scrubs gently examining a golden retriever on an exam table, clean white and soft teal tones.` },
  { id: "clinica", skip: true, prompt: `${BASE} Modern professional medical consultation office, a doctor in a white coat talking with a patient across a clean desk, large window with soft daylight, navy and teal accents, calm reassuring atmosphere.` },
  { id: "estetica", skip: true, prompt: `${BASE} Elegant beauty and aesthetics center interior, a treatment chair and a stylist preparing a service, warm soft lighting, neutral tones with navy and teal accents, upscale and welcoming.` },
  { id: "taller", prompt: `${BASE} Modern clean automotive repair workshop, a mechanic in navy overalls holding a tablet while checking an open engine bay of a plain generic car seen from the side and slightly behind, the front grille and any badge are not visible, tidy tools wall, bright professional lighting, no emblems or logos anywhere, blank license plate.` },
];
const W = 1280, H = 960;
console.log(`${IMAGENES.length} generaciones ≈ US$ ${(IMAGENES.length * 0.0345).toFixed(2)}`);
if (!process.argv.includes("--confirmar")) { console.log("Simulación. Agrega --confirmar."); process.exit(0); }
if (!process.env.FAL_KEY) { console.error("Falta FAL_KEY"); process.exit(1); }
fal.config({ credentials: process.env.FAL_KEY });
const OUT = "scripts/fal-home/_salida"; mkdirSync(OUT, { recursive: true });
for (const x of IMAGENES.filter((i) => !i.skip && (!process.argv.includes("--solo") || i.id === process.argv[process.argv.indexOf("--solo") + 1]))) {
  try {
    const r = await fal.subscribe("fal-ai/flux-2-pro", { input: { prompt: x.prompt, image_size: { width: W, height: H }, output_format: "png" } });
    writeFileSync(join(OUT, `app-${x.id}.png`), Buffer.from(await (await fetch(r.data.images[0].url)).arrayBuffer()));
    console.log(`✓ ${x.id}`);
  } catch (e) { console.error(`✗ ${x.id}: ${e.message}`); }
}
