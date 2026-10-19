# SYNEXA Showroom

Catálogo interactivo de Servicios y Precios: 19 paquetes con ficha comercial y demostración, comparador, «Arma tu solución», infraestructura y soporte, y proyectos realizados.

## Ejecutar en local

```bash
npm install
npm run dev        # http://localhost:5173/servicios-y-precios
npm test           # pruebas de datos y rutas
npm run typecheck
npm run build      # genera dist/ (no despliega nada)
```

## Cambiar un precio, límite o módulo

Editar `src/datos/catalogo.ts`. Es la única fuente. Los límites en `null` se muestran como «Por definir».

## Documentación

- [Ejecutar en local](docs/guias/ejecutar-localmente.md)
- [Actualizar precios, límites y módulos](docs/guias/actualizar-precios.md)
- [Agregar un paquete](docs/guias/agregar-paquete.md)
- [Generar imágenes con FAL](docs/guias/generar-imagenes.md)

- [Arquitectura](docs/arquitectura/README.md)
- [Conciliación de precios](docs/catalogo/conciliacion-precios.md)

## Seguridad

`FAL_KEY` (generación de imágenes) va en `.env`, que está ignorado por git. Copiar desde `.env.example`.
