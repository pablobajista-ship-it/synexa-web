/**
 * Preselección del lote piloto (revisión a tamaño completo, 2026-10-18).
 * Copia las imágenes elegidas a scripts/fal/_salida/preseleccion/<empresa>/<id>.webp
 * (optimizadas). NO escribe en public/assets: eso ocurre solo tras la aprobación del usuario.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import sharp from "sharp";

const D = "scripts/fal/_salida/";
// [empresa, id, variante, estado, nota]
const SEL = [
  ["brillo-car", "banner-capot", 2, "ok", "Abstracto, sin emblemas."],
  ["brillo-car", "galeria-2", 2, "ok", "Llanta y pinza; sin texto legible."],
  ["brillo-car", "profesional", 2, "ok", "Sin insignias visibles."],
  ["brillo-car", "hero", 1, "regenerar", "Auto reconocible (BMW M4 / Dodge Charger)."],
  ["brillo-car", "galeria-1", 2, "regenerar", "BMW X5 con emblema en la tapa trasera."],
  ["brillo-car", "galeria-3", 2, "regenerar", "Camioneta Ram reconocible."],
  ["brillo-car", "interior", 1, "regenerar", "Interior BMW serie 8 / Jaguar XJ reconocibles."],
  ["brillo-car", "antes", 1, "regenerar", "Hyundai i20 reconocible con emblema en la parrilla; regenerar el par."],
  ["brillo-car", "despues", 1, "regenerar", "Idem; debe regenerarse con 'antes' como referencia."],
  ["novasur", "hero", 1, "ok", ""],
  ["novasur", "banner", 1, "ok", "La variante 2 muestra el texto «TANK 12»."],
  ["novasur", "ingenieros", 1, "ok", ""],
  ["novasur", "proyecto-1", 1, "ok", ""],
  ["novasur", "proyecto-2", 1, "ok", ""],
  ["novasur", "proyecto-3", 1, "ok", ""],
  ["novasur", "equipamiento", 2, "ok", "La variante 1 tiene rótulos ilegibles."],
  ["novasur", "equipo-1", 1, "ok", ""],
  ["novasur", "equipo-2", 1, "ok", ""],
  ["lumina-pro", "hero", 1, "ok", ""],
  ["lumina-pro", "banner", 1, "ok", ""],
  ["lumina-pro", "evento-1", 1, "ok", ""],
  ["lumina-pro", "evento-2", 1, "ok", "Pantalla de laptop con interfaz pequeña; la variante 2 muestra marcas legibles."],
  ["lumina-pro", "evento-3", 1, "ok", ""],
  ["lumina-pro", "tecnica-1", 1, "ok", ""],
  ["lumina-pro", "tecnica-2", 1, "ok", "Rótulos diminutos ilegibles."],
  ["lumina-pro", "equipo-03", 1, "ok", ""],
  ["lumina-pro", "equipo-04", 1, "ok", ""],
  ["lumina-pro", "equipo-06", 1, "ok", "Etiqueta mínima en la parte posterior; aceptable."],
  ...["01", "02", "05", "07", "08", "09", "10", "11", "12"].map((n) => ["lumina-pro", `equipo-${n}`, 1, "regenerar", "Texto/logotipo inventado en el producto."]),
  ["frecuencia-mix", "hero", 1, "ok", ""],
  ["frecuencia-mix", "banner", 2, "ok", ""],
  ["frecuencia-mix", "cabina", 2, "ok", ""],
  ["frecuencia-mix", "equipamiento", 1, "ok", ""],
  ["frecuencia-mix", "editorial", 1, "ok", ""],
  ["frecuencia-mix", "ambiente-1", 1, "ok", ""],
  ["frecuencia-mix", "ambiente-2", 1, "ok", ""],
  ["frecuencia-mix", "locutor-1", 1, "ok", ""],
  ["frecuencia-mix", "locutor-2", 1, "ok", ""],
  ["frecuencia-mix", "locutor-3", 1, "ok", ""],
];

const manifiesto = JSON.parse((await import("node:fs")).readFileSync("docs/imagenes/manifiesto.json", "utf8"));
const salida = [];
for (const [empresa, id, v, estado, nota] of SEL) {
  const item = { empresa, id, variante: v, estado, nota };
  if (estado === "ok") {
    const dir = `${D}preseleccion/${empresa}`;
    mkdirSync(dir, { recursive: true });
    const info = await sharp(`${D}${empresa}/${id}-${v}.png`).resize({ width: 2000, withoutEnlargement: true }).webp({ quality: 82 }).toFile(`${dir}/${id}.webp`);
    item.archivo = `${dir}/${id}.webp`;
    item.bytes = info.size;
  }
  salida.push(item);
}
// El manifiesto versionado refleja el estado de aprobación.
for (const m of manifiesto) {
  const s = salida.find((x) => x.empresa === m.empresa && x.id === m.id);
  if (s) { m.aprobacion = s.estado === "ok" ? "preseleccionada" : "regenerar"; m.variante = s.variante; m.nota = s.nota || undefined; }
}
writeFileSync("docs/imagenes/manifiesto.json", JSON.stringify(manifiesto, null, 2) + "\n");
writeFileSync("docs/imagenes/preseleccion-piloto.json", JSON.stringify(salida, null, 2) + "\n");
const ok = salida.filter((x) => x.estado === "ok");
console.log(`ok: ${ok.length}, regenerar: ${salida.length - ok.length}, peso total ok: ${(ok.reduce((a, x) => a + x.bytes, 0) / 1e6).toFixed(1)} MB`);
