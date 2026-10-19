import { Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "./Layout";
import { PaginaCatalogo } from "@/catalogo/PaginaCatalogo";
import { FichaPaquete } from "@/servicios/FichaPaquete";
import { PaginaDemo } from "@/demos/PaginaDemo";
import { NoEncontrada } from "./NoEncontrada";
import { Comparador } from "@/herramientas/Comparador";
import { ArmaSolucion } from "@/herramientas/ArmaSolucion";
import { ResumenCotizacion } from "@/herramientas/ResumenCotizacion";
import { InfraSoporte } from "@/herramientas/InfraSoporte";
import { ProyectosRealizados } from "@/proyectos/ProyectosRealizados";

/**
 * Rutas alineadas con la integración futura bajo el dominio de SYNEXA:
 *   /servicios-y-precios            catálogo
 *   /servicios-y-precios/:paquete   ficha comercial
 *   /servicios-y-precios/comparar | arma-tu-solucion | resumen | infraestructura-y-soporte | proyectos-realizados
 *   /demos/:empresa                 demostración de pantalla completa
 */
export function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/servicios-y-precios" replace />} />
      <Route element={<Layout />}>
        <Route path="/servicios-y-precios" element={<PaginaCatalogo />} />
        <Route path="/servicios-y-precios/comparar" element={<Comparador />} />
        <Route path="/servicios-y-precios/arma-tu-solucion" element={<ArmaSolucion />} />
        <Route path="/servicios-y-precios/resumen" element={<ResumenCotizacion />} />
        <Route path="/servicios-y-precios/infraestructura-y-soporte" element={<InfraSoporte />} />
        <Route path="/servicios-y-precios/proyectos-realizados" element={<ProyectosRealizados />} />
        <Route path="/servicios-y-precios/:paqueteId" element={<FichaPaquete />} />
      </Route>
      <Route path="/demos/:marcaId/*" element={<PaginaDemo />} />
      <Route element={<Layout />}>
        <Route path="*" element={<NoEncontrada />} />
      </Route>
    </Routes>
  );
}
