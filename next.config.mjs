/**
 * Si SHOWROOM_URL está definida, el SYNEXA Showroom (synexa-showroom/) reemplaza
 * la página /servicios-y-precios: Next reenvía esas rutas (proxy, la URL no
 * cambia) al sitio del Showroom. Sin la variable no cambia nada.
 * Local: SHOWROOM_URL=http://localhost:4173 en .env.local.
 */
const showroomUrl = process.env.SHOWROOM_URL?.replace(/\/$/, "");

/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    if (!showroomUrl) return [];
    return {
      beforeFiles: ["/servicios-y-precios", "/demos", "/assets"].flatMap((base) => [
        { source: base, destination: `${showroomUrl}${base}` },
        { source: `${base}/:path*`, destination: `${showroomUrl}${base}/:path*` },
      ]),
    };
  },
};

export default nextConfig;
