/**
 * Preselección de la tanda 3 de la Fase 4 (Arista, Trama, RutaStock, Servimant, MesaFlow, PuenteSync).
 * Revisión a tamaño completo, 2026-10-19. Escribe en scripts/fal/_salida/preseleccion/ y actualiza el
 * manifiesto. NO toca public/assets: eso ocurre tras la aprobación del usuario.
 * Entrada: "id": variante   |   "id": [variante, "reserva"|"regenerar", nota]
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import sharp from "sharp";

const D = "scripts/fal/_salida/";
const n2 = (n) => String(n).padStart(2, "0");

const SEL = {
  arista: {
    agente: 1, banner: 1, cocina: 1, dormitorio: 1, hero: [1, "ok", "La variante 2 muestra un SUV con silueta de marca real."], living: 1,
    "propiedad-1": 1, "propiedad-2": 1, "propiedad-3": [2, "ok", "La variante 1 muestra un vehículo reconocible."],
    "propiedad-4": [2, "reserva", "La variante 1 era un collage; el SUV de la variante 2 es pequeño y de silueta genérica."],
    "propiedad-5": 2, "propiedad-6": 1, "propiedad-7": 1, "propiedad-8": 1,
  },
  trama: {
    equipo: 1, hero: 1, "interior-1": 2, "interior-2": 2, "interior-3": 2,
    maqueta: [1, "ok", "La variante 2 muestra un texto borroso al fondo."], planos: 2,
    "proyecto-1": 2, "proyecto-2": 1, "proyecto-3": 1, "proyecto-4": 2,
  },
  rutastock: {
    bodega: [1, "ok", "La variante 2 muestra «LOGISTICS SERVICES» en el equipo."],
    centro: [1, "ok", "La variante 2 muestra «LOGISTICS» y «SPEED 10»."],
    distribucion: [1, "reserva", "Furgones de silueta similar a un modelo comercial real."],
    escaneo: [1, "reserva", "Etiquetas de cajas con microtexto ilegible."],
    hero: 1, "operaciones-1": 1,
    "operaciones-2": [2, "ok", "La variante 1 muestra un cartel «AISLE 14 / ZONE B»."],
    productos: [2, "reserva", "Envases con microtexto ilegible."],
  },
  servimant: {
    equipos: 1, hero: 1, instalaciones: [1, "reserva", "Manómetros con numeración ilegible."],
    taller: 1, "tecnico-1": 1, "tecnico-2": [1, "ok", "La variante 2 muestra una pantalla de tableta con interfaz inventada."],
    tecnicos: 1, vehiculo: [1, "reserva", "Furgón antiguo de silueta genérica; la variante 2 es un modelo comercial reconocible."],
  },
  mesaflow: {
    centro: 1, equipos: [1, "reserva", "Pantalla con la palabra «Dashboard» en pequeño."], "especialista-1": 1,
    "especialista-2": 1, "especialista-3": 1, hero: 2, "mesa-soporte": 1, oficina: 2,
  },
  puentesync: { ambiente: 1, editorial: 1, equipo: 1, hero: 1, infraestructura: 1 },
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
writeFileSync("docs/imagenes/preseleccion-tanda3.json", JSON.stringify(registro, null, 2) + "\n");
const c = (e) => registro.filter((r) => r.estado === e).length;
console.log(`total ${registro.length} ok:${c("ok")} reserva:${c("reserva")} regenerar:${c("regenerar")}`, `${(registro.reduce((a, r) => a + (r.bytes ?? 0), 0) / 1e6).toFixed(1)} MB`);
