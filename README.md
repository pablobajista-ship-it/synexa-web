# SYNEXA — Soluciones Web para Empresas

Sitio principal + ticketera (Centro de Atención y Soporte) de SYNEXA: aplicación web
independiente para presentar la marca, gestionar tickets de soporte, solicitudes
comerciales y comunicación con clientes. Construida con Next.js (App Router,
JavaScript), Auth.js y Postgres en Supabase (base de datos + Storage para adjuntos).

Este proyecto es **completamente independiente** del sitio de iluminación (WordPress) y
vive en su propio repositorio, en `C:\ticketera-servicios-web`.

## Identidad de marca

Todo el proyecto (sitio principal, portal de clientes, ticketera) comparte un único
sistema de diseño, definido como tokens CSS en
[`src/app/globals.css`](src/app/globals.css) y consumido por clases Tailwind del tipo
`bg-[var(--color-blue)]`:

| Token | Color | Uso |
| --- | --- | --- |
| `--color-navy` | `#0B1F44` | Fondos oscuros (header, hero, footer), texto principal |
| `--color-blue` | `#2563EB` | Acción primaria (botones, links, foco) |
| `--color-teal` | `#14B8A6` | Acento secundario (CTA destacado, isotipo) |
| `--color-gray-light` | `#E5E7EB` | Bordes, fondos sutiles |
| `--color-gray-dark` | `#374151` | Texto secundario |

Tipografía: **Inter** (`next/font/google`, ver `src/app/layout.js`).

Isotipo: [`src/components/Logo.js`](src/components/Logo.js) — una "S" abstracta hecha en
SVG (gradiente navy→azul arriba, teal abajo), sin depender de ningún archivo de imagen.
Es una interpretación propia de la guía de marca; el día que exista el archivo
SVG/PNG definitivo, basta con reemplazar el contenido de `<LogoMark>` en ese archivo —
se usa desde un solo lugar en todo el proyecto (header, footer, navbar del panel,
favicon en `src/app/icon.js`).

Componentes reutilizables del sistema de diseño: `src/components/ui/` (`Button`, `Card`,
`Container`, `Eyebrow`) y `src/components/marketing/` (header, hero, grillas de
servicios, íconos). Se usan tanto en la web principal como en el portal de clientes.

## Requisitos

- Node.js 18+ (probado con Node 24)
- npm

## Iniciar el proyecto

```bash
npm install
npm run dev
```

Abrí [http://localhost:3000](http://localhost:3000).

## Variables de entorno

Copiá `.env.example` a `.env.local` y completá:

| Variable | Descripción |
| --- | --- |
| `DATABASE_URL` | Connection string de Supabase, **Transaction pooler** (puerto 6543): *Project Settings → Database → Connection string*. |
| `SUPABASE_URL` | *Project URL* de Supabase (*Project Settings → API*). |
| `SUPABASE_SERVICE_ROLE_KEY` | Clave `service_role` de Supabase. Secreta: solo se usa en el servidor para subir/descargar adjuntos. |
| `SUPABASE_STORAGE_BUCKET` | Opcional, bucket de adjuntos (por defecto `attachments`). |
| `PORTAL_ENABLED` | `false` oculta el portal de clientes (enlaces y login). Por defecto habilitado. |
| `AUTH_SECRET` | Clave para firmar sesiones de Auth.js. Generar con `node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"`. |
| `AUTH_URL` | URL base de la app (`http://localhost:3000` en desarrollo). |
| `AUTH_GOOGLE_ID` / `AUTH_GOOGLE_SECRET` | Credenciales OAuth de Google (opcional). Si están vacías, el botón "Continuar con Google" queda deshabilitado y el resto de la app funciona normalmente. |
| `ADMIN_EMAIL` | Correo del administrador principal. Sin esta variable no se crea ninguna cuenta de administrador. |
| `ADMIN_PASSWORD` | Contraseña de esa cuenta. Se usa **solo** para crearla la primera vez. Nunca se escribe en el código ni en git. |
| `SEED_CLIENT_PASSWORD` | Opcional, solo para `npm run seed` (clientes de prueba). |

`.env.local` está en `.gitignore` y nunca se sube al repositorio.

## Base de datos

Postgres en Supabase, accedido con la librería [`postgres`](https://github.com/porsager/postgres)
desde `src/lib/db.js` (el único archivo que conoce SQL; páginas y API routes solo llaman
a sus funciones, todas asíncronas).

- **Esquema**: vive en `supabase/migrations/*.sql`. Aplicarlo con `npm run db:migrate`
  (idempotente: registra lo aplicado en `schema_migrations`). También se puede pegar el
  SQL en el *SQL Editor* de Supabase.
- **Seguridad**: todas las tablas tienen RLS activado **sin políticas**, así la API REST
  pública de Supabase (anon key) no puede leerlas. La app se conecta directo a Postgres
  como dueña de las tablas, por eso no le afecta. Si agregás tablas, activales RLS.
- **Datos de prueba**: `npm run seed` crea al administrador (si `ADMIN_PASSWORD` está
  definida), dos clientes ficticios y tres tickets de ejemplo. Es idempotente.
- **Numeración de tickets**: la tabla `counters` se incrementa con un upsert atómico
  dentro de la misma transacción que crea el ticket (`SW-000001`, `SW-000002`, ...).
- **Adjuntos**: se guardan en Supabase Storage, bucket privado `attachments`, bajo
  `<número de ticket>/<uuid>.<ext>`. Solo se sirven a través de `/api/attachments/[id]`,
  que valida que quien pide el archivo sea el dueño del ticket o un administrador.

## Cómo entrar como administrador

1. Completá `ADMIN_PASSWORD` en `.env.local` con tu contraseña real.
2. `npm run dev`.
3. Si el usuario admin **no existe todavía** en la base, se crea solo con la primera
   consulta, con el email de `ADMIN_EMAIL` y esa contraseña.
4. Si ya existe pero sin contraseña (por ejemplo, en este entorno recién armado), entrá a
   `http://localhost:3000/forgot-password`, pedí la recuperación con
   el correo de `ADMIN_EMAIL` y seguí el enlace (en desarrollo, sin SMTP configurado, el
   enlace se muestra en la propia pantalla y queda registrado en la consola del
   servidor).

El sistema nunca crea un segundo administrador con ese email.

## Cómo crear un cliente

- Desde la propia web: pestaña "Crear cuenta" en `http://localhost:3000/login`.
- O ejecutando `npm run seed` (con `SEED_CLIENT_PASSWORD` definida), que crea dos
  clientes de ejemplo.

## Estructura del proyecto

```
src/
  app/                    rutas (App Router)
    page.js                 sitio principal SYNEXA (marketing: hero, servicios, CTA)
    login/                  login + registro + Google (portal de clientes)
    dashboard/              panel del cliente
    tickets/nuevo/          crear ticket
    tickets/[ticketNumber]/ detalle + conversación (cliente y admin)
    admin/                  dashboard, tickets, clientes, estadísticas, configuración
    cuenta/                 perfil del cliente
    api/                    route handlers (auth, tickets, mensajes, adjuntos, registro)
    icon.js                 favicon dinámico (isotipo SYNEXA)
  components/
    marketing/               header, hero, grillas y secciones del sitio principal
    ui/                       primitivos reutilizables (Button, Card, Container, Eyebrow)
    Logo.js                   isotipo + wordmark SYNEXA
    (resto)                   formularios, navbar del panel, badges, conversación
  lib/                     acceso a datos (db.js), constantes, uploads, auth helpers
  services/notifications.js  capa de notificaciones (hoy solo consola; mañana email real)
  auth.js / auth.config.js  configuración de Auth.js (Credentials + Google)
  proxy.js                 protección de rutas por rol (antes "middleware")
scripts/seed.js            datos de desarrollo
scripts/migrate.js         aplica supabase/migrations/*.sql
supabase/migrations/       esquema de la base (SQL)
```

La web principal (`/`) es pública. El login, el registro y todo lo relacionado a
tickets vive bajo `/login`, `/dashboard`, `/tickets` y `/admin`.

## Roles y protección de rutas

- `CLIENT`: solo ve y responde sus propios tickets. `/admin/*` le está bloqueado.
- `ADMIN`: ve y gestiona todos los tickets, clientes, estados, prioridades, categorías y
  puede dejar notas internas (invisibles para el cliente).
- La autorización se valida **en el servidor** (route handlers y páginas), no solo
  ocultando botones en la interfaz. Acceder a la URL de un ticket ajeno devuelve 404 en
  vez de revelar que existe.

## Qué está funcionando

- Sitio principal SYNEXA (`/`): header, hero, servicios, valor diferencial, proceso de
  trabajo y CTA final, con la identidad de marca aplicada en todo el proyecto.
- Login clásico (email + contraseña, hash bcrypt).
- Registro de clientes con validaciones.
- Login con Google (queda listo para activar con credenciales reales).
- Recuperación de contraseña (token de un solo uso, expira en 1 hora).
- Administrador único auto-provisionado por variable de entorno.
- Crear ticket con categoría, prioridad, adjuntos, info técnica opcional.
- Numeración `SW-000001`, `SW-000002`, ...
- Panel de cliente con estadísticas, filtros, buscador y estado vacío.
- Detalle de ticket con conversación, adjuntos, respuestas y notas internas (solo admin).
- Reactivación automática del ticket cuando el cliente responde a "Esperando tu
  respuesta".
- Panel de administrador: dashboard, listado completo, clientes, estadísticas básicas,
  configuración.
- Páginas 404 y de error amigables, sin exponer detalles internos.

## Qué queda preparado para más adelante

- Envío real de correos (la capa `src/services/notifications.js` ya está separada del
  resto del código; solo hay que conectar un proveedor).
- Roles `AGENT`/`TECHNICIAN` (el campo `role` ya soporta agregarlos).
- Ficha de cliente ampliada (proyectos, servicios contratados, dominios, hosting).
- Estadísticas más avanzadas (tiempos de respuesta/resolución).
- Dominio propio para el sitio publicado en Netlify.
- Reemplazar el logo hecho en SVG (`src/components/Logo.js`) por el archivo definitivo
  cuando exista, y el favicon (`src/app/icon.js`) en consecuencia.
