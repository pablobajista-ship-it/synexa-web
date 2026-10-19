/**
 * Preselección de la tanda 1 de la Fase 4 (Molino Sur, Punto Barrio, Barba Norte, Brasa Costa).
 * Revisión a tamaño completo, 2026-10-19. Escribe en scripts/fal/_salida/preseleccion/
 * y actualiza el manifiesto. NO toca public/assets: eso ocurre tras la aprobación del usuario.
 *
 * Formato: [empresa, id, variante, estado, nota, sufijo?]  estado: ok | reserva
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import sharp from "sharp";

const D = "scripts/fal/_salida/";
const P = (n) => `producto-${String(n).padStart(2, "0")}`;
const SEL = [
  // Molino Sur
  ["molino-sur", "hero", 1, "ok", ""],
  ["molino-sur", "banner", 1, "ok", ""],
  ["molino-sur", "fachada", 2, "reserva", "Rótulo «OPEN» pequeño y dibujos en la vitrina; la variante 1 mostraba «THE ARTISAN BAKERY»."],
  ["molino-sur", "cafeteria", 1, "ok", ""],
  ["molino-sur", "pasteleria", 1, "ok", ""],
  ["molino-sur", "barista", 1, "ok", ""],
  ["molino-sur", "pan-rustico", 1, "ok", ""],
  ["molino-sur", "galeria", 1, "ok", "La variante 2 mostraba etiquetas de texto."],
  // Punto Barrio
  ["punto-barrio", "hero", 2, "ok", "Regenerada con rótulo en blanco.", "r2"],
  ["punto-barrio", "banner", 2, "reserva", "Cartel «AISLE 8» y envases con palabras genéricas (RICE, PASTA)."],
  ["punto-barrio", "abarrotes", 1, "reserva", "Frascos con etiquetas genéricas en inglés (RICE, PASTA)."],
  ["punto-barrio", "frutas", 1, "ok", "La variante 2 mostraba rótulos «FRESH PRODUCE»."],
  [ "punto-barrio", P(1), 2, "ok", ""], [ "punto-barrio", P(2), 2, "ok", ""], [ "punto-barrio", P(3), 1, "ok", ""],
  [ "punto-barrio", P(4), 1, "ok", "Regenerada: la versión original mostraba una hoja en una bandeja.", "r2"],
  [ "punto-barrio", P(5), 1, "ok", ""], [ "punto-barrio", P(6), 1, "ok", ""], [ "punto-barrio", P(7), 1, "ok", ""],
  [ "punto-barrio", P(8), 1, "ok", ""], [ "punto-barrio", P(9), 2, "ok", ""], [ "punto-barrio", P(10), 2, "ok", ""],
  [ "punto-barrio", P(11), 1, "ok", ""], [ "punto-barrio", P(12), 2, "ok", ""],
  [ "punto-barrio", P(13), 2, "ok", "La variante 1 reproducía la forma de una botella de marca conocida."],
  [ "punto-barrio", P(14), 1, "ok", ""], [ "punto-barrio", P(15), 1, "ok", ""], [ "punto-barrio", P(16), 1, "ok", ""],
  [ "punto-barrio", P(17), 1, "ok", ""], [ "punto-barrio", P(18), 2, "ok", ""], [ "punto-barrio", P(19), 1, "ok", ""],
  [ "punto-barrio", P(20), 2, "ok", ""], [ "punto-barrio", P(21), 1, "ok", "La variante 2 mostraba la palabra «Cleaner»."],
  [ "punto-barrio", P(22), 1, "ok", ""], [ "punto-barrio", P(23), 1, "ok", ""], [ "punto-barrio", P(24), 2, "ok", ""],
  // Barba Norte
  ["barba-norte", "hero", 1, "ok", ""],
  ["barba-norte", "banner", 1, "ok", ""],
  ["barba-norte", "local", 2, "ok", ""],
  ["barba-norte", "sillon", 1, "ok", ""],
  ["barba-norte", "herramientas", 1, "ok", ""],
  ["barba-norte", "barbero-1", 1, "ok", "La variante 2 mostraba «BARBER Co»."],
  ["barba-norte", "barbero-2", 1, "ok", ""],
  ["barba-norte", "barbero-3", 1, "ok", ""],
  ["barba-norte", "corte-1", 1, "ok", ""],
  ["barba-norte", "corte-2", 1, "ok", ""],
  ["barba-norte", "corte-3", 1, "ok", "La variante 2 mostraba botellas de una marca de whisky real."],
  // Brasa Costa
  ["brasa-costa", "hero", 2, "ok", ""],
  ["brasa-costa", "banner", 1, "ok", ""],
  ["brasa-costa", "cocina", 2, "ok", ""],
  ["brasa-costa", "interior", 2, "ok", ""],
  ["brasa-costa", "terraza", 1, "ok", ""],
  ["brasa-costa", "plato-1", 1, "ok", ""], ["brasa-costa", "plato-2", 2, "ok", ""],
  ["brasa-costa", "plato-3", 1, "ok", ""], ["brasa-costa", "plato-4", 1, "ok", ""],
];

const manifiesto = JSON.parse(readFileSync("docs/imagenes/manifiesto.json", "utf8"));
const registro = [];
for (const [empresa, id, v, estado, nota, suf] of SEL) {
  const origen = `${D}${empresa}/${id}${suf ? `-${suf}` : ""}-${v}.png`;
  const dir = `${D}preseleccion/${empresa}`;
  mkdirSync(dir, { recursive: true });
  const info = await sharp(origen).resize({ width: 2000, withoutEnlargement: true }).webp({ quality: 82 }).toFile(`${dir}/${id}.webp`);
  registro.push({ empresa, id, variante: v, ronda: suf ?? "r1", estado, nota, archivo: `${dir}/${id}.webp`, bytes: info.size });
  const m = manifiesto.find((x) => x.empresa === empresa && x.id === id);
  if (!m) throw new Error(`Sin manifiesto: ${empresa}/${id}`);
  m.aprobacion = estado === "ok" ? "preseleccionada" : "preseleccionada-con-reserva";
  m.variante = v;
  if (nota) m.nota = nota;
}
writeFileSync("docs/imagenes/manifiesto.json", JSON.stringify(manifiesto, null, 2) + "\n");
writeFileSync("docs/imagenes/preseleccion-tanda1.json", JSON.stringify(registro, null, 2) + "\n");
const por = (e) => registro.filter((r) => r.empresa === e).length;
console.log(`total ${registro.length}`, ["molino-sur", "punto-barrio", "barba-norte", "brasa-costa"].map((e) => `${e}:${por(e)}`).join(" "), `reserva:${registro.filter((r) => r.estado === "reserva").length}`, `${(registro.reduce((a, r) => a + r.bytes, 0) / 1e6).toFixed(1)} MB`);
