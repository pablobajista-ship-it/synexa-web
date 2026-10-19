/**
 * Calcula el presupuesto FAL a partir del inventario. No llama a FAL.
 *   node scripts/fal/presupuesto.mjs           -> imprime el resumen
 *   node scripts/fal/presupuesto.mjs --escribir -> además genera docs/imagenes/manifiesto.json
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { expandir, costo, EMPRESAS, MODELOS } from "./inventario.mjs";

const lista = expandir();
const usd = (n) => `US$ ${n.toFixed(2)}`;
const suma = (xs, peor = false) => xs.reduce((a, x) => a + costo(x, peor), 0);

const porEmpresa = EMPRESAS.map((e) => {
  const xs = lista.filter((x) => x.empresa === e.id);
  return { id: e.id, n: xs.length, base: suma(xs), peor: suma(xs, true), piloto: !!e.piloto };
});

const pilotos = lista.filter((x) => x.piloto);
const resto = lista.filter((x) => !x.piloto);

// Escenarios: intentos promedio por imagen (generar varias variantes y elegir la mejor).
const INTENTOS = 3;
console.log(`Imágenes planificadas: ${lista.length}`);
for (const [k, m] of Object.entries(MODELOS)) {
  const xs = lista.filter((x) => x.modelo === k);
  console.log(`  ${m.nombre}: ${xs.length} imágenes, ${usd(suma(xs))} (1 intento)`);
}
console.log("\nPor empresa (1 intento | peor caso de redondeo):");
for (const e of porEmpresa) console.log(`  ${e.piloto ? "★" : " "} ${e.id.padEnd(15)} ${String(e.n).padStart(3)} img  ${usd(e.base)} | ${usd(e.peor)}`);

const base = suma(lista);
const peor = suma(lista, true);
console.log(`\nTotal 1 intento: ${usd(base)}  (peor caso ${usd(peor)})`);
console.log(`Total ${INTENTOS} intentos por imagen: ${usd(base * INTENTOS)}  (peor caso ${usd(peor * INTENTOS)})`);
console.log(`Pilotos (4 marcas): ${pilotos.length} img, ${usd(suma(pilotos) * INTENTOS)} con ${INTENTOS} intentos`);
console.log(`Resto (15 marcas):  ${resto.length} img, ${usd(suma(resto) * INTENTOS)} con ${INTENTOS} intentos`);

if (process.argv.includes("--escribir")) {
  mkdirSync("docs/imagenes", { recursive: true });
  writeFileSync("docs/imagenes/manifiesto.json", JSON.stringify(lista, null, 2) + "\n");
  console.log("\nEscrito docs/imagenes/manifiesto.json");
}
