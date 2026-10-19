# SYNEXA Showroom: arquitectura (Fase 1)

## Resultado de la revisión técnica

| Hallazgo | Detalle | Decisión |
|---|---|---|
| El sitio actual es **Next.js 16** (App Router, JavaScript, Tailwind 4, Supabase). | `package.json`, `src/app/servicios-y-precios/page.js`. | El Showroom es un **módulo independiente** (React + Vite + TypeScript), sin tocar el sitio. |
| El catálogo vigente tiene **15 servicios** con precios «Desde» distintos de los 19 del brief. | `src/data/servicesPricing.js`, `Servicios-y-Precios-SYNEXA.docx`. | Se usan los precios del brief y se documenta la diferencia en `../catalogo/conciliacion-precios.md`. |
| Los datos comerciales del sitio ya viven en un único archivo de datos. | Patrón «fuente única». | Se replica el patrón en `src/datos/catalogo.ts`. |
| El sitio ya tiene Infraestructura Administrada y planes de soporte. | `infrastructurePlans.js`, `supportPlans.js`. | Se enlazarán en la sección «Infraestructura y Soporte» (Fase 5). No se duplican. |
| Identidad: navy `#0B1F44`, azul `#2563EB`, turquesa `#14B8A6`, Inter. | `src/app/globals.css`. | Mismos tokens en `src/estilos/index.css` + Fraunces para titulares. |

## Estructura

```
synexa-showroom/
  src/
    app/          rutas, layout, 404
    catalogo/     página de Servicios y Precios, tarjetas, filtros
    servicios/    ficha comercial de cada paquete
    demos/        contenedor de pantalla completa + barra «Demostración SYNEXA»
                  (cada demo se agregará en su propia carpeta: demos/brillo-car/, ...)
    componentes/  Logo, Boton, Precio, IsotipoMarca
    datos/        FUENTE ÚNICA: catalogo.ts, marcas.ts, tipos.ts
    estilos/      tokens y base (Tailwind 4)
    utilidades/   formato CLP, setup de pruebas
  public/assets/  una carpeta por marca; imágenes locales (nada remoto)
  scripts/fal/    generación de imágenes (Fase 2; se ejecuta solo en local)
  docs/           arquitectura, catálogo, fichas, imágenes, pruebas
```

## Reglas

- **Una sola fuente de datos.** Nombres, precios, límites y módulos solo existen en `src/datos/`. Los componentes no repiten valores.
- **Límites `null` = «Por definir».** Nunca se infieren de los datos de demostración.
- **Módulos sin tarifa aprobada** tienen `precio: null` y se muestran como «Por cotizar».
- **Sin costos internos ni márgenes** en el código del frontend.
- **Offline en ejecución.** Fuentes empaquetadas (`@fontsource`), imágenes en `public/assets`, sin URL remotas.
- **`FAL_KEY`** solo se lee en `scripts/fal/` (Node local). Nunca desde `src/`. `.env*` está ignorado; `.env.example` no contiene credenciales.
- **Estado de la UI en la URL** (`?familia=…&necesidad=…`) para volver al catálogo sin perder la selección.

## Integración futura con el sitio SYNEXA (Next.js)

Rutas propuestas, ya usadas por el Showroom:

| Ruta | Contenido |
|---|---|
| `/servicios-y-precios` | Catálogo (reemplaza la presentación actual, no la duplica) |
| `/servicios-y-precios/:paquete` | Ficha comercial |
| `/demos/:empresa` | Demostración de pantalla completa |

Opciones (decisión pendiente):

1. **Montar el build estático** (`vite build`) bajo `/servicios-y-precios` y `/demos` mediante rewrites de Next/Netlify. Es la de menor riesgo: no modifica código del sitio.
2. **Migrar a componentes Next** dentro del repositorio principal. Más integrada, pero toca archivos existentes y requiere autorización.

El Showroom usa `BrowserRouter` con `basename` tomado de `import.meta.env.BASE_URL`, lo que permite publicarlo bajo un subdirectorio.

## Ubicación en el disco

La carpeta está dentro del repositorio `ticketera-servicios-web` por ser la carpeta de trabajo de esta sesión. Tiene su propio `package.json`, `node_modules` y `.gitignore`. Se puede mover fuera sin cambios.

## Pendiente en cada fase

| Fase | Estado |
|---|---|
| 1. Arquitectura y catálogo | **Hecha** (19 paquetes, 5 familias, 10 líneas, filtros, fichas, barra de demo) |
| 2. Imágenes FAL | **Hecha para las 19 marcas** (ver docs/imagenes/) |
| 3. Cuatro pilotos | **Hecha y aprobada**: BrilloCar, NovaSur, Lúmina Pro y Frecuencia Mix |
| 4. Quince restantes | **Hecha**: las 15 demostraciones construidas en tres tandas (tanda 3: Arista, Trama, RutaStock, Servimant, MesaFlow y PuenteSync). Tanda 3 pendiente de tu aprobación visual |
| 5. Comparador, configurador, infraestructura y soporte | **Hecha**: `/comparar` (hasta 4 paquetes), `/arma-tu-solucion`, `/resumen` (imprimible, estado en la URL, sin datos personales) e `/infraestructura-y-soporte` (planes del documento vigente) |
| 6. Proyectos realizados y documentación | **Hecha**: `/proyectos-realizados` (capturas de producción del 2026-10-19, datos rotulados por origen) y guías en `docs/guias/` |
| 7. Validación y publicación | **Validación hecha** (ver `docs/pruebas/validacion.md`) y propuesta de integración en `integracion-next.md`. **Publicación pendiente de tu autorización expresa** y de tres decisiones: precios, licencia de imágenes y opción de integración |
