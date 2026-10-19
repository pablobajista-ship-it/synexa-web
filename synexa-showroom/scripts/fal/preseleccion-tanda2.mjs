/**
 * Preselección de la tanda 2 de la Fase 4 (Puerto FM, Tiempo Retro, Vértice Bikes, Huella Viva, Rango).
 * Revisión a tamaño completo, 2026-10-19. Escribe en scripts/fal/_salida/preseleccion/ y actualiza el
 * manifiesto. NO toca public/assets: eso ocurre tras la aprobación del usuario.
 * Entrada: "id": variante   |   "id": [variante, "reserva"|"regenerar", nota]
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import sharp from "sharp";

const D = "scripts/fal/_salida/";
const n2 = (n) => String(n).padStart(2, "0");

const SEL = {
  "puerto-fm": {
    banner: 2, cabina: [2, "ok", "La variante 1 muestra una marca en el brazo del micrófono."],
    consola: [2, "reserva", "Marca «K&M» pequeña en los brazos de micrófono."],
    hero: 1, "locutor-1": 1, "locutor-2": 1, "locutor-3": 1, microfonos: 1,
  },
  "tiempo-retro": {
    banner: 1, "decada-70": 2, "decada-80": 1, "decada-90": [1, "ok", "La variante 2 muestra «CONCERT»."],
    equipos: 1, hero: 1, "locutor-1": 1, "locutor-2": [1, "reserva", "Cartel «RADIO» genérico al fondo."],
    "locutor-3": 2, programa: [1, "reserva", "Cuaderno con garabatos ilegibles."], vinilos: 1,
  },
  "vertice-bikes": {
    hero: 1, ruta: 1, urbana: 1, banner: 1,
    "accesorio-01": 1, "accesorio-02": 1, "accesorio-03": 1, "accesorio-04": [1, "reserva", "Microtexto ilegible en las luces."],
    "bici-01": 2, "bici-02": 1, "bici-03": 1, "bici-04": 1, "bici-05": 1, "bici-06": 1, "bici-07": 1,
  },
  "huella-viva": {
    hero: 1, banner: 1, perro: [1, "ok", "La variante 2 muestra «COTTON ROPE TOY»."], gato: [1, "ok", "La variante 2 muestra «COZY KNIT»."],
    "alimento-lifestyle": 1,
    ...Object.fromEntries([[1, 1], [2, 2], [3, 1], [4, 2], [5, 1], [6, 1], [7, 1], [8, 1], [9, 2], [10, 2], [11, 1], [12, 2]].map(([n, v]) => [`producto-${n2(n)}`, v])),
  },
  rango: {
    hero: [1, "ok", "La variante 2 muestra el logotipo de una marca real en las zapatillas."], banner: 1,
    "editorial-1": [1, "ok", "La variante 2 muestra un logotipo en las zapatillas."], "editorial-2": 1, "editorial-3": 1,
    "producto-01": [1, "reserva", "Microtexto ilegible en el pecho."],
    "producto-02": 1, "producto-03": [2, "ok", "La variante 1 era un collage."],
    "producto-04": [2, "regenerar", "Logotipo similar a una marca real; la variante 1 es un collage."],
    "producto-05": [2, "ok", "La variante 1 era un collage."], "producto-06": [2, "ok", "La variante 1 mostraba texto."],
    "producto-07": [2, "ok", ""], "producto-08": [1, "reserva", "Rayas laterales parecidas a una marca conocida."],
    "producto-09": [2, "ok", "La variante 1 era un collage."], "producto-10": 1, "producto-11": 1, "producto-12": 2,
  },
};

const manifiesto = JSON.parse(readFileSync("docs/imagenes/manifiesto.json", "utf8"));
const registro = [];
for (const [empresa, imagenes] of Object.entries(SEL)) {
  for (const [id, def] of Object.entries(imagenes)) {
    const [v, estado = "ok", nota = ""] = Array.isArray(def) ? def : [def];
    const item = { empresa, id, variante: v, estado, nota };
    const m = manifiesto.find((x) => x.empresa === empresa && x.id === id);
    if (!m) throw new Error(`Sin manifiesto: ${empresa}/${id}`);
    if (estado !== "regenerar") {
      const dir = `${D}preseleccion/${empresa}`;
      mkdirSync(dir, { recursive: true });
      const info = await sharp(`${D}${empresa}/${id}-${v}.png`).resize({ width: 2000, withoutEnlargement: true }).webp({ quality: 82 }).toFile(`${dir}/${id}.webp`);
      item.archivo = `${dir}/${id}.webp`;
      item.bytes = info.size;
    }
    m.aprobacion = estado === "ok" ? "preseleccionada" : estado === "reserva" ? "preseleccionada-con-reserva" : "regenerar";
    m.variante = v;
    if (nota) m.nota = nota;
    registro.push(item);
  }
}
// Cada imagen del inventario de estas marcas debe haber sido revisada.
for (const m of manifiesto.filter((x) => x.empresa in SEL)) {
  if (!registro.some((r) => r.empresa === m.empresa && r.id === m.id)) throw new Error(`Imagen sin revisar: ${m.empresa}/${m.id}`);
}
writeFileSync("docs/imagenes/manifiesto.json", JSON.stringify(manifiesto, null, 2) + "\n");
writeFileSync("docs/imagenes/preseleccion-tanda2.json", JSON.stringify(registro, null, 2) + "\n");
const c = (e) => registro.filter((r) => r.estado === e).length;
console.log(`total ${registro.length} ok:${c("ok")} reserva:${c("reserva")} regenerar:${c("regenerar")}`, `${(registro.reduce((a, r) => a + (r.bytes ?? 0), 0) / 1e6).toFixed(1)} MB`);
