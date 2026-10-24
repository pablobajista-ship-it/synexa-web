# Checklist para pasar el Showroom a producción

Estado al 2026-10-19. Vista previa funcionando en `synexa-showroom.netlify.app` y en el branch deploy `showroom-preview` de `synexas`. **Producción (`master`) sigue sirviendo la página antigua.**

| # | Pendiente | Estado | Responsable |
|---|---|---|---|
| 1 | Precios de los 5 paquetes sin equivalente vigente | **Decidido:** se publican con el precio propuesto («Desde … + IVA») | Pablo |
| 2 | Proyectos realizados (capturas y enlaces de clientes) | **Decidido:** Pablo cuenta con el permiso de los clientes | Pablo |
| 3 | Licencia de las imágenes generadas con FAL | **Pendiente:** esperar confirmación escrita de uso comercial | Pablo (correo abajo) |
| 4 | Quitar `noindex` del Showroom | Pendiente: se hace al activar producción | Claude |
| 5 | Activar `SHOWROOM_URL` en Production y mergear a `master` | Pendiente: solo tras 3 y 4 | Pablo / Claude |

## 3. Correo a FAL (soporte / ventas)

Asunto: Uso comercial de imágenes generadas con FLUX.2 [pro] y Nano Banana 2

> Hola, somos SYNEXA (Chile) y generamos imágenes con la API de fal.ai: unas 225 imágenes con `fal-ai/flux-2-pro` y `fal-ai/nano-banana-2`. Las usaremos como fotografía de demostración en un sitio web comercial público (catálogo de servicios de desarrollo web, con demos de empresas ficticias).
>
> ¿Pueden confirmarnos por escrito que:
> 1. el uso comercial de las imágenes generadas con esos dos modelos está permitido bajo nuestros términos de servicio, sin atribución;
> 2. no hay restricciones adicionales de licencia del modelo (FLUX.2 [pro] y Nano Banana 2) que apliquen a una publicación web comercial?
>
> Quedamos atentos. Gracias.

Guardar la respuesta (correo o captura) junto a `docs/imagenes/`. Si la respuesta limita el uso, regenerar o reemplazar las imágenes afectadas antes de activar producción.

## 4–5. Pasos al activar producción

1. Quitar el bloque `X-Robots-Tag = "noindex, nofollow"` de `synexa-showroom/netlify.toml` y borrar `synexa-showroom/public/robots.txt` (decidir antes si las demos se indexan: son sitios ficticios).
2. Pull request `showroom-preview` → `master` y merge.
3. En `synexas` → Environment variables, editar `SHOWROOM_URL` y marcar **Production**.
4. Verificar `https://synexas.netlify.app/servicios-y-precios` (Showroom), la home (teaser) y una demo.
5. **Reversa:** quitar `SHOWROOM_URL` de Production y redesplegar; el sitio vuelve a su página antigua.

## 6. Pendientes comerciales: mantenimiento web

Decisiones que el equipo comercial debe tomar antes de publicar (los textos actuales evitan prometer lo no definido):

- Confirmar que los planes SYNEXA Care / Care Plus / Business / Business Critical y el soporte por hora (ya publicados) siguen vigentes; la página `/mantenimiento-web` los reutiliza tal cual (`src/data/supportPlans.js`).
- Los tres grupos de mantenimiento (básico, asistencia, avanzado) son orientativos, no planes contractuales; decidir si se formalizan.
- Definir por escrito si hay garantía del trabajo entregado y su duración; hoy se dice solo que "no se asume incluida".
- Definir políticas de hosting y dominio por propuesta (hoy: "se especifican por separado").
- Condiciones para mantener sitios de otros proveedores (hoy: "podemos evaluar").
- Revisar tiempos de respuesta y "monitoreo" de los planes existentes frente a lo que SYNEXA puede comprometer.
- Los datos de mantenimiento del formulario (sitio, tipo de ayuda) se anexan al mensaje de la consulta; no hay columnas propias en la base.
