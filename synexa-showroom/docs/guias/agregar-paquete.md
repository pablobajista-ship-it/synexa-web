# Agregar un paquete nuevo

Un paquete nuevo necesita cuatro cosas: su ficha comercial, una marca ficticia, una demostración y sus imágenes.

## 1. Ficha comercial
En `src/datos/catalogo.ts`, agrega un objeto a `PAQUETES` con todos los campos de `Paquete` (`src/datos/tipos.ts`): `id` (slug estable, se usa en la URL), `linea`, `precio` neto, `incluye`, `limites`, `noIncluye`, `costosExternos`, `modulos`, `necesidades`, `demo`, etc. No inventes prestaciones: lo no definido va en `null`. Si es un nivel nuevo de una línea, mantén el orden ascendente de precio.

## 2. Marca ficticia
En `src/datos/marcas.ts` agrega la marca (`id` igual al campo `demo` del paquete, colores, sigla, concepto). El estado inicial es `pendiente`.

## 3. Demostración
1. Crea `src/demos/<marca>/<Marca>.tsx` con `export default` de un componente de pantalla completa. Usa rutas relativas bajo `/demos/<marca>` y `ScrollArriba` de `src/demos/compartido/utiles.tsx`.
2. Guarda el estado con `usePersistente("synexa:<marca>:<clave>", inicial)`. No uses servicios reales, pagos, cuentas ni datos personales, y rotula el contenido como demostración.
3. Registra la demo en `src/demos/registro.ts`: `DEMOS` (carga diferida), `CLAVES_REINICIO` (claves de localStorage que «Reiniciar demo» debe borrar) y `FOTO_PORTADA`.
4. Pon la marca en `estado: "publicada"`.
5. Escribe pruebas (modelo: `src/demos/tanda3.test.tsx`) y revisa la demo en el navegador a 375 px: sin desborde horizontal ni imágenes rotas.

## 4. Imágenes
Ver [generar-imagenes.md](generar-imagenes.md).

## Verificación
`npm run typecheck`, `npm test` y `npm run build`. Las pruebas del catálogo cuentan los paquetes: si el total cambia, actualiza los números esperados.
