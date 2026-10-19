# Informe de validación (Fase 7)

Fecha: 2026-10-19. Alcance: el módulo `synexa-showroom/` en local. **No se desplegó nada ni se tocó el sitio en producción.**

## Resultado en una línea
Todo lo medido pasa. Los límites de lo medido están al final: no se probó en Safari ni Firefox, no hubo prueba con lector de pantalla y no se midió rendimiento.

## 1. Automatizado
| Verificación | Resultado |
|---|---|
| `npm run typecheck` | Sin errores |
| `npm test` | **272 pruebas en 22 archivos, todas pasan** |
| `npm run build` | Correcto (≈ 2,5 s) |
| `npm audit` | 0 vulnerabilidades |

Las pruebas cubren datos del catálogo, rutas, lógica de negocio de cada demo (agenda, inventario, órdenes, permisos, sincronización, cotización) y el comportamiento de las 19 demostraciones.

## 2. Recorrido de rutas en el navegador (Chromium)
Se cargó cada demostración y se siguieron sus enlaces internos (hasta 12 páginas por demo): **144 páginas** de las 19 demos, cada una a **375 px y a 1280 px**. Se comprobó, por página:
- exactamente un `h1`;
- sin desborde horizontal;
- sin imágenes rotas;
- sin errores de consola;
- sin recursos de otros orígenes (las demos funcionan sin conexión).

Resultado: **sin hallazgos**. Antes de este recorrido, las revisiones de las tandas 2 y 3 ya habían corregido un desborde en Rango, otro en MesaFlow, el comparador y una foto de Trama con ruta mal escrita. Las rutas de servicios (catálogo, 19 fichas, comparar, arma tu solución, resumen, infraestructura y soporte, proyectos realizados) se revisaron a 375 px en las fases 5 y 6.

## 3. Accesibilidad
- **axe-core en pruebas** (`src/accesibilidad.test.tsx`): 8 pantallas de servicios, las 19 fichas y las 19 portadas de demo. **0 violaciones** (con las reglas de contraste y regiones desactivadas, porque jsdom no calcula colores). La prueba incluye un control negativo que confirma que el verificador detecta errores reales.
- **Contraste de color en el navegador** (axe-core, regla `color-contrast`): sobre 72 páginas (7 de servicios y la portada más 3 páginas interiores de cada demo) se encontraron **≈ 290 incumplimientos de WCAG AA (4,5:1)**, todos corregidos:
  - el verde de acento de las etiquetas del catálogo (3,6:1) pasó a `#0f766e`;
  - los textos pequeños de pie de página y avisos de las demos (blanco al 40–60 % de opacidad) subieron a 80–90 %;
  - se oscurecieron o aclararon los acentos de marca que fallaban (naranja de Punto Barrio, Tiempo Retro, Puerto FM y Servimant; cobre de Barba Norte; terracota de Molino Sur, Huella Viva y Brasa Costa; azul de BrilloCar y NovaSur).
  Tras los cambios, el rastreo repetido quedó sin incumplimientos en esas páginas.
- Ya estaban resueltos desde el diseño: etiquetas en todos los campos, mensajes de error asociados (`aria-invalid`), `role="status"` y `role="alert"` donde corresponde, saltar al contenido, tablas con título y encabezados, imágenes con `alt` (las decorativas con `alt=""`).

## 4. Seguridad y datos
| Revisión | Resultado |
|---|---|
| Claves o tokens en `dist/`, `src/` y `public/` (FAL_KEY, patrones de API) | Ninguno |
| `.env` | No existe en el módulo y está en `.gitignore`; `.env.example` solo trae `FAL_KEY=` vacío |
| Resultados crudos de FAL (`scripts/fal/_salida/`) | Ignorados por git |
| Llamadas de red (`fetch`, `XMLHttpRequest`), `eval`, `innerHTML`, cookies | Ninguna en el código de la aplicación |
| Direcciones externas en el build | Solo documentación de librerías y los tres enlaces a sitios reales de «Proyectos realizados» |
| Datos personales | No se piden ni se guardan; los formularios son simulados y lo declaran |
| Metadatos de las imágenes | WebP generadas con sharp, sin EXIF |

## 5. Peso
`dist/` ≈ 27 MB, de los cuales 26 MB son las 231 imágenes WebP (ninguna supera 400 KB). Cada demo se carga bajo demanda en su propio paquete de JavaScript (entre 19 y 45 KB; el paquete principal pesa ≈ 360 KB, ≈ 105 KB comprimido).

## 6. Lo que NO se verificó
- **Navegadores:** solo Chromium. Safari, Firefox y dispositivos reales sin probar.
- **Lector de pantalla y navegación solo con teclado:** no se probaron de forma manual; solo hay verificación automática (axe) y diseño semántico.
- **Contraste:** se midió en 72 páginas (portadas y 3 interiores por demo), no en todos los estados posibles de cada demo (menús abiertos, errores, paneles).
- **Rendimiento:** no se midió con Lighthouse ni en redes lentas.
- **Móvil:** se emuló un ancho de 375 px; no se probó en teléfonos.
- **Imágenes de la tanda 3:** revisadas en hojas de comparación, no una por una a tamaño completo; 7 quedaron «con reserva».
- **Textos de «Proyectos realizados»:** redactados a partir de las capturas y la documentación de cada repositorio; sin revisión de los clientes.

## 7. Pendientes que bloquean la publicación (ver `integracion-next.md`)
1. Cerrar los precios de los 5 paquetes que siguen con el precio propuesto (14 ya usan el vigente); los módulos siguen «Por cotizar».
2. Confirmación escrita de FAL sobre el uso comercial de las imágenes generadas.
3. Autorización expresa de despliegue.
