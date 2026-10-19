/**
 * Generación de imágenes con FAL. SOLO se ejecuta en local.
 *
 * Por defecto es una SIMULACIÓN: muestra qué generaría y cuánto costaría.
 * Para gastar créditos hay que pasar --confirmar.
 *
 *   node scripts/fal/generar.mjs --calibracion              simula el piloto de calibración
 *   node scripts/fal/generar.mjs --calibracion --confirmar  lo ejecuta
 *   node scripts/fal/generar.mjs --empresa brillo-car --confirmar
 *   node scripts/fal/generar.mjs --empresa brillo-car --id hero --intentos 3 --confirmar
 *
 * La clave se lee de process.env.FAL_KEY (variable de entorno o .env). Nunca se
 * imprime ni se escribe en archivos.
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync, appendFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { expandir, costo, MODELOS } from "./inventario.mjs";

const args = process.argv.slice(2);
const flag = (n) => args.includes(`--${n}`);
const valor = (n) => (args.includes(`--${n}`) ? args[args.indexOf(`--${n}`) + 1] : undefined);

// .env opcional (sin dependencias): solo completa variables no definidas.
if (existsSync(".env")) {
  for (const l of readFileSync(".env", "utf8").split(/\r?\n/)) {
    const m = l.match(/^\s*([A-Z_]+)\s*=\s*(.*)\s*$/);
    if (m && m[2] && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
}

const todas = expandir();
const intentos = Number(valor("intentos") ?? 1);

// Piloto de calibración: 1 hero por marca piloto con AMBOS modelos, par antes/después, 1 retrato, 1 producto.
const CALIBRACION = [
  ...["brillo-car", "novasur", "lumina-pro", "frecuencia-mix"].flatMap((e) => {
    const h = todas.find((x) => x.empresa === e && x.id === "hero");
    return [h, { ...h, id: "hero__nano", modelo: "nano", endpoint: "fal-ai/nano-banana-2", w: 1024, h: 576 }];
  }),
  todas.find((x) => x.empresa === "brillo-car" && x.id === "antes"),
  todas.find((x) => x.empresa === "brillo-car" && x.id === "despues"),
  todas.find((x) => x.empresa === "frecuencia-mix" && x.id === "locutor-1"),
  todas.find((x) => x.empresa === "lumina-pro" && x.id === "equipo-01"),
];

// Regeneración dirigida: imágenes marcadas "regenerar" en la preselección, con prompts más estrictos.
const SUFIJO = valor("sufijo") ? `-${valor("sufijo")}` : "";
const ESTRICTO_AUTO = " The vehicle is an invented generic design: smooth plain grille with no badge or emblem, blank license plate, no manufacturer styling cues, no steering-wheel or wheel-center logos.";
const ESTRICTO_PRODUCTO = " All surfaces are plain matte with no printing, no labels, no lettering, no logos, no markings, no model numbers, and any display or screen is blank or shows only abstract light.";
let trabajo;
if (flag("regenerar")) {
  const marcadas = JSON.parse(readFileSync("docs/imagenes/preseleccion-piloto.json", "utf8")).filter((x) => x.estado === "regenerar");
  trabajo = marcadas
    .map((m) => todas.find((x) => x.empresa === m.empresa && x.id === m.id))
    .map((x) => ({ ...x, prompt: x.prompt + (x.empresa === "brillo-car" ? ESTRICTO_AUTO : ESTRICTO_PRODUCTO) }));
} else if (flag("calibracion")) trabajo = CALIBRACION;
else if (valor("empresa")) {
  // Fase 4: los productos sobre fondo limpio llevan siempre la cláusula estricta (sin etiquetas ni texto).
  trabajo = todas
    .filter((x) => x.empresa === valor("empresa") && (!valor("id") || x.id === valor("id")))
    .map((x) => (x.tipo === "cuadrada" ? { ...x, prompt: x.prompt + ESTRICTO_PRODUCTO } : x))
    .map((x) => (valor("extra") ? { ...x, prompt: `${x.prompt} ${valor("extra")}` } : x));
}
else {
  console.error("Indica --calibracion, --regenerar o --empresa <id> [--id <imagen>].");
  process.exit(1);
}
if (!trabajo.length) {
  console.error("Ninguna imagen coincide con el filtro.");
  process.exit(1);
}

const total = trabajo.reduce((a, x) => a + costo(x), 0) * intentos;
console.log(`${trabajo.length} imágenes × ${intentos} intento(s) ≈ US$ ${total.toFixed(2)}`);
for (const x of trabajo) console.log(`  ${x.empresa}/${x.id}  ${x.modelo}  ${x.w}x${x.h}`);

if (!flag("confirmar")) {
  console.log("\nSimulación: no se generó nada. Agrega --confirmar para ejecutar.");
  process.exit(0);
}
if (!process.env.FAL_KEY) {
  console.error("Falta FAL_KEY. Defínela como variable de entorno o en .env (ver .env.example).");
  process.exit(1);
}

const { fal } = await import("@fal-ai/client");
const sharp = (await import("sharp")).default;
fal.config({ credentials: process.env.FAL_KEY });

const SALIDA = "scripts/fal/_salida";
const REGISTRO = join(SALIDA, "registro.jsonl");
mkdirSync(SALIDA, { recursive: true });

async function generar(x, n) {
  const destino = join(SALIDA, x.empresa, `${x.id}${SUFIJO}-${n}.png`);
  let endpoint = x.endpoint;
  let input;
  if (x.modelo === "flux2pro") {
    input = { prompt: x.prompt, image_size: { width: x.w, height: x.h }, output_format: "png" };
  } else {
    input = { prompt: x.prompt, aspect_ratio: x.formato, resolution: MODELOS[x.modelo].resolucion, num_images: 1, output_format: "png" };
    // Imagen de referencia (coherencia): usa el endpoint de edición con la mejor versión previa.
    const refPath = x.referencia && join(SALIDA, x.empresa, `${x.referencia}${SUFIJO}-1.png`);
    if (refPath && existsSync(refPath)) {
      const url = await fal.storage.upload(new Blob([readFileSync(refPath)], { type: "image/png" }));
      endpoint = `${x.endpoint}/edit`;
      input.image_urls = [url];
    }
  }
  const r = await fal.subscribe(endpoint, { input });
  const url = r.data?.images?.[0]?.url;
  if (!url) throw new Error("FAL no devolvió imagen");
  const buf = Buffer.from(await (await fetch(url)).arrayBuffer());
  mkdirSync(dirname(destino), { recursive: true });
  writeFileSync(destino, buf);
  const meta = await sharp(buf).metadata();
  appendFileSync(
    REGISTRO,
    JSON.stringify({ ts: new Date().toISOString(), empresa: x.empresa, id: x.id, intento: n, modelo: x.modelo, endpoint, estimado: costo(x), px: `${meta.width}x${meta.height}`, archivo: destino }) + "\n",
  );
  return { destino, px: `${meta.width}x${meta.height}` };
}

let gastoEstimado = 0;
for (const x of trabajo) {
  for (let n = 1; n <= intentos; n++) {
    try {
      const r = await generar(x, n);
      gastoEstimado += costo(x);
      console.log(`✓ ${x.empresa}/${x.id}-${n}  ${r.px}  (acum. ≈ US$ ${gastoEstimado.toFixed(2)})`);
    } catch (e) {
      console.error(`✗ ${x.empresa}/${x.id}-${n}: ${e.message}`);
    }
  }
}
console.log(`\nListo. Revisa las imágenes en ${SALIDA}/ y aprueba las buenas antes de optimizarlas a public/assets/.`);
