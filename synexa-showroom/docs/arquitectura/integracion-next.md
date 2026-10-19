# Propuesta de integración con el sitio SYNEXA (Next.js)

**Estado: propuesta. No se ha desplegado ni modificado nada del sitio en producción.** Cualquier paso de este documento requiere autorización expresa.

## Punto de partida
- El sitio actual es Next.js 16 (App Router, JavaScript, Tailwind 4, Supabase) en Netlify, con su propia página `/servicios-y-precios` (`src/app/servicios-y-precios/page.js`) alimentada por `src/data/*.js`.
- El Showroom es una aplicación independiente (React 19 + Vite + TypeScript + React Router) en `synexa-showroom/`. Genera un sitio estático (`dist/`, ≈ 27 MB, casi todo imágenes) y no necesita servidor, base de datos ni claves.
- Sus rutas ya coinciden con las del dominio final: `/servicios-y-precios`, `/servicios-y-precios/<paquete>`, `/servicios-y-precios/comparar | arma-tu-solucion | resumen | infraestructura-y-soporte | proyectos-realizados` y `/demos/<marca>`.

## Opciones

### A. Sitio estático aparte + reglas de proxy en Netlify
El Showroom se publica como un segundo sitio de Netlify y el sitio principal reenvía a él las rutas `/servicios-y-precios/*`, `/demos/*` y `/assets/*` con `status = 200` (proxy, la URL no cambia). El SPA necesita su regla de respaldo (`/* → /index.html`) dentro de su propio sitio.

| Ventajas | Desventajas |
|---|---|
| No toca el código del sitio actual. | Dos despliegues que mantener. |
| Reversible quitando las reglas de proxy. | Cabecera y pie distintos a los del sitio principal. |
| Las demos quedan aisladas del resto. | Es una SPA: el HTML inicial es una cáscara vacía, sin metadatos por ruta para buscadores. |
| Esfuerzo bajo (días). | La página actual `/servicios-y-precios` de Next queda tapada por el proxy. |

### B. Portar el Showroom a Next.js
Mover los datos y las pantallas del catálogo, fichas y herramientas a rutas de App Router y montar las demos como componentes de cliente.

| Ventajas | Desventajas |
|---|---|
| Un solo despliegue, cabecera y pie compartidos. | El proyecto es JavaScript y el Showroom TypeScript: hay que habilitar TS o convertir. |
| HTML renderizado en servidor: SEO real en catálogo y fichas. | Las 19 demos usan React Router internamente; habría que reescribir su navegación. |
| Un único origen de datos de planes (hoy duplicado). | Esfuerzo alto (semanas) y riesgo de regresiones en las demos. |

### C. Híbrida (recomendada)
1. **Fase 1, con la opción A en un entorno de prueba** (subdominio o URL de vista previa de Netlify) para que el equipo valide contenido y precios sin exponerlo.
2. Con la validación hecha, publicar con las reglas de proxy.
3. **Fase 2, solo si el SEO lo justifica:** llevar a Next el catálogo y las fichas (datos ya independientes del framework, ver `src/datos/`), y dejar las demos como SPA montada bajo `/demos`.

## Prerrequisitos antes de publicar (cualquier opción)
1. **Precios.** Se aplicó una decisión mixta: 4 paquetes con precio vigente y 15 con precio propuesto, estos últimos pendientes de decisión caso por caso (ver `docs/catalogo/conciliacion-precios.md`). Los módulos adicionales siguen «Por cotizar».
2. **Licencia de las imágenes.** Obtener confirmación escrita de FAL sobre uso comercial de lo generado (`docs/guias/generar-imagenes.md`).
3. **Textos contractuales.** Los límites en «Por definir» deben completarse o quedar así de forma explícita.
4. **Proyectos realizados.** Pedir el visto bueno de cada cliente para mostrar sus capturas y enlaces.
5. **Datos de planes duplicados.** `src/datos/infraSoporte.ts` copia `src/data/infrastructurePlans.js` y `supportPlans.js`. En la integración debe haber una única fuente.

## Configuración técnica sugerida (opción A)
- Build del Showroom: `npm ci && npm run build`, carpeta `dist`, Node 22 (como el sitio actual).
- Respaldo de SPA en el sitio del Showroom: `/*  /index.html  200`.
- Cabeceras recomendadas: caché larga e inmutable para `/assets/*.js` y `.css` con hash; caché moderada para imágenes; `X-Content-Type-Options: nosniff`; `Referrer-Policy: strict-origin-when-cross-origin`; Content-Security-Policy restrictiva (`default-src 'self'; img-src 'self' data:; style-src 'self' 'unsafe-inline'; font-src 'self'; connect-src 'self'; frame-ancestors 'self'`). El Showroom no carga nada de terceros salvo enlaces salientes de «Proyectos realizados».
- Buscadores: decidir si las demos se indexan (`noindex` recomendado: son sitios ficticios que podrían competir con las páginas reales) y añadir catálogo y fichas al `sitemap`.
- Sin analítica ni cookies: el Showroom no las usa. Si se añade analítica, revisar el aviso de privacidad.
- Estado en el navegador: las demos guardan datos en `localStorage` bajo `synexa:<marca>:…`; no hay colisión con el sitio principal.

## Plan de trabajo y reversa
1. Autorización expresa y rama de integración.
2. Crear el sitio de Netlify del Showroom (sin dominio) y verificar la vista previa.
3. Añadir las reglas de proxy en una rama del sitio principal y probar con la vista previa de esa rama.
4. Revisión final del equipo (contenido, precios, accesibilidad).
5. Publicar. **Reversa:** quitar las reglas de proxy; el sitio principal vuelve a servir su propia página sin otros cambios.

## Esfuerzo y riesgos
| Tarea | Esfuerzo |
|---|---|
| Opción A completa | 1–3 días |
| Unificar cabecera y pie | 1 día |
| Opción B (portado completo) | 3–6 semanas |

Riesgos principales: SEO limitado en la opción A, mantenimiento duplicado de planes, y exposición de precios no validados si se publica antes de resolver los prerrequisitos.
