# Ejecutar el Showroom en local

Requisitos: Node.js reciente y npm. No necesita base de datos, claves ni conexión (las demostraciones usan fuentes e imágenes locales).

```bash
cd synexa-showroom
npm install
npm run dev        # http://localhost:5173/servicios-y-precios
```

| Comando | Qué hace |
|---|---|
| `npm test` | Pruebas de datos, rutas, lógica y demostraciones |
| `npm run typecheck` | Chequeo de tipos |
| `npm run build` | Genera `dist/`. No despliega nada |
| `npm run preview` | Sirve el build local |

## Rutas
- `/servicios-y-precios`: catálogo; `/servicios-y-precios/<paquete>`: ficha.
- `/servicios-y-precios/comparar`, `/arma-tu-solucion`, `/resumen`, `/infraestructura-y-soporte` y `/proyectos-realizados`.
- `/demos/<marca>`: cada una de las 19 demostraciones.

## Datos de las demostraciones
Se guardan en el `localStorage` de tu navegador con claves `synexa:<marca>:…`. «Reiniciar demo» (barra superior de cada demo) las borra. Ninguna demo envía datos.

## Publicación
No se despliega automáticamente. La publicación requiere autorización expresa.
