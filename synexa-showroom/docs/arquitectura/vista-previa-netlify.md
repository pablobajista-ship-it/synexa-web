# Vista previa del Showroom en Netlify (opción C, fase 1)

**Estado: preparada, no publicada.** Los archivos de configuración están listos y se probaron en local. No se creó ningún sitio de Netlify, no se hizo ningún despliegue y no se modificó el sitio principal.

## Qué se preparó
| Archivo | Para qué |
|---|---|
| `netlify.toml` | Comando de build (`npm ci && npm run build`), carpeta `dist`, Node 22, regla de respaldo de la SPA, cabeceras de seguridad y caché |
| `public/robots.txt` | `Disallow: /` mientras sea vista previa |

Cabeceras que aplica `netlify.toml`:
- `X-Robots-Tag: noindex, nofollow` (vista previa no indexable).
- `Content-Security-Policy` estricta: `default-src 'self'`, imágenes `self` y `data:`, estilos `self` y en línea (los usa React), fuentes y scripts solo propios, `connect-src 'self'`, `object-src 'none'`, `frame-ancestors 'self'`.
- `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy` y `Permissions-Policy` (sin cámara, micrófono, geolocalización ni pagos).
- Caché larga e inmutable para JS, CSS y fuentes con hash; 1 día para las imágenes.

## Cómo se probó
Se sirvió `dist/` con un servidor local que aplica la misma política de seguridad y el mismo respaldo de rutas que declara `netlify.toml`:
- catálogo, fichas y herramientas, y 5 demos cargan sin errores de consola ni violaciones de la política;
- la señal de audio de Frecuencia Mix se reproduce;
- la descarga de CSV de RutaStock funciona;
- una ruta profunda (`/demos/servimant/ordenes/o4`) responde con la aplicación.

**Límite:** no se ejecutó el motor real de Netlify. Las reglas de `netlify.toml` se verificaron con un servidor equivalente, no con Netlify. La primera vista previa real confirmará las cabeceras (se comprueban con `curl -I`).

## Pasos para publicar la vista previa (requieren tu autorización)
1. **Subir el código.** `synexa-showroom/` hoy no está confirmado en git. Para que Netlify lo construya hay que hacer un commit y subirlo. Recomendación: una **rama aparte** (por ejemplo `showroom-preview`), de modo que el sitio principal de producción no se vea afectado.
2. **Crear un sitio nuevo en Netlify** conectado al repositorio, con:
   - *Base directory*: `synexa-showroom`
   - *Branch to deploy*: `showroom-preview`
   - Build y publicación: se toman de `netlify.toml`.
   - **Sin variables de entorno** (el Showroom no necesita ninguna) y **sin dominio propio**: queda en una dirección `*.netlify.app`.
3. **Comprobar** la dirección de vista previa: portada del catálogo, una demo, una ruta profunda recargada, `curl -I` de las cabeceras y `/robots.txt`.
4. **Compartir** la dirección solo con quienes deban revisar.

Para que el equipo vea el resultado sin crear un sitio nuevo, otra alternativa es proteger el sitio con contraseña desde Netlify (función de pago del plan).

## Antes de pasar a producción (fase 2 de la opción C)
- Quitar `X-Robots-Tag` del bloque de cabeceras y borrar `public/robots.txt`.
- Añadir al `netlify.toml` del **sitio principal** las reglas de proxy para `/servicios-y-precios/*`, `/demos/*` y `/assets/*`, y retirar la página `/servicios-y-precios` de Next que quedaría tapada.
- Resolver los prerrequisitos de `integracion-next.md` (precios, licencia de imágenes, visto bueno de los clientes).

## Advertencias
- Si el sitio de Netlify del sitio principal se construye desde el mismo repositorio, comprueba que `synexa-showroom/` no afecte a su build antes de unir la rama a la principal.
- No uses `netlify dev` para probar en local: carga las variables del `.env.local` del sitio principal. Para probar, usa `npm run build` y `npm run preview`.
