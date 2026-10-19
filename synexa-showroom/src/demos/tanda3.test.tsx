import { beforeEach, describe, expect, it } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { App } from "@/app/App";
import { MARCAS } from "@/datos/marcas";
import { DEMOS } from "./registro";

const abrir = async (ruta: string, esperar: RegExp | string) => {
  render(
    <MemoryRouter initialEntries={[ruta]}>
      <App />
    </MemoryRouter>,
  );
  await screen.findByRole("heading", { level: 1, name: esperar }, { timeout: 15000 });
};
const menu = () => within(screen.getByRole("navigation", { name: "Principal" }));

beforeEach(() => localStorage.clear());

describe("las 19 demostraciones", () => {
  it("cada marca tiene su demostración registrada y publicada", () => {
    expect(Object.keys(DEMOS).sort()).toEqual(MARCAS.map((m) => m.id).sort());
    expect(MARCAS.every((m) => m.estado !== "pendiente")).toBe(true);
  });
});

describe("demo Arista Propiedades", () => {
  it("el listado filtra por operación y muestra el conteo", async () => {
    await abrir("/demos/arista/propiedades", "Propiedades");
    expect(screen.getAllByRole("article")).toHaveLength(8);
    await userEvent.selectOptions(screen.getByLabelText("Operación"), "Arriendo");
    expect(screen.getAllByRole("article")).toHaveLength(4);
    expect(screen.getByRole("status")).toHaveTextContent("4 propiedades encontradas");
    await userEvent.selectOptions(screen.getByLabelText("Dormitorios (mín.)"), "4");
    expect(screen.getAllByRole("article")).toHaveLength(1);
    await userEvent.selectOptions(screen.getByLabelText("Sector"), "Costa Dorada");
    expect(screen.getByText(/Ninguna propiedad coincide/)).toBeInTheDocument();
  });

  it("la ficha valida la consulta y la confirma como demostración", async () => {
    await abrir("/demos/arista/propiedades/p5", "Penthouse con terraza panorámica");
    await userEvent.click(screen.getByRole("button", { name: "Enviar consulta" }));
    expect(screen.getByText("Escribe tu nombre.")).toBeInTheDocument();
    await userEvent.type(screen.getByLabelText("Nombre"), "Ana");
    await userEvent.type(screen.getByLabelText("Correo"), "ana@mail.example");
    await userEvent.click(screen.getByRole("button", { name: "Enviar consulta" }));
    expect(screen.getByRole("status")).toHaveTextContent(/no se envió ni se guardó ningún dato/);
  });

  it("una propiedad oculta desde la administración desaparece del listado", async () => {
    await abrir("/demos/arista/admin", "Administración de propiedades");
    await userEvent.click(screen.getByRole("button", { name: "Agregar propiedad" }));
    expect(screen.getByText("Escribe un título de al menos 5 caracteres.")).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "Ocultar Casa con terraza y piscina frente al mar" }));
    expect(screen.getByRole("button", { name: "Publicar Casa con terraza y piscina frente al mar" })).toBeInTheDocument();
    await userEvent.click(menu().getByRole("link", { name: "Propiedades" }));
    await screen.findByRole("heading", { level: 1, name: "Propiedades" });
    expect(screen.getAllByRole("article")).toHaveLength(7);
  });

  it("una propiedad nueva se publica y aparece en el listado", async () => {
    await abrir("/demos/arista/admin", "Administración de propiedades");
    await userEvent.type(screen.getByLabelText("Título"), "Departamento céntrico");
    await userEvent.type(screen.getByLabelText("Superficie (m²)"), "60");
    await userEvent.type(screen.getByLabelText("Precio (CLP)"), "150000000");
    await userEvent.click(screen.getByRole("button", { name: "Agregar propiedad" }));
    await userEvent.click(menu().getByRole("link", { name: "Propiedades" }));
    await screen.findByRole("heading", { level: 1, name: "Propiedades" });
    expect(screen.getAllByRole("article")).toHaveLength(9);
  });
});

describe("demo Trama Arquitectura", () => {
  it("el panel privado no se abre sin entrar como cliente de demostración", async () => {
    await abrir("/demos/trama/portal/panel", "Portal de clientes");
    expect(screen.getByRole("button", { name: "Entrar como cliente de demostración" })).toBeInTheDocument();
  });

  it("entra, aprueba documentos y sale", async () => {
    await abrir("/demos/trama/portal", "Portal de clientes");
    await userEvent.click(screen.getByRole("button", { name: "Entrar como cliente de demostración" }));
    await screen.findByRole("heading", { level: 1, name: "Casa Duna" });
    expect(screen.getByRole("heading", { level: 2, name: "Avance del proyecto: 40%" })).toBeInTheDocument();
    expect(screen.getByText("Tienes 2 documentos pendientes de aprobación.")).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "Aprobar Planos de arquitectura — plantas y cortes" }));
    expect(screen.getByText("Tienes 1 documento pendiente de aprobación.")).toBeInTheDocument();
    expect(screen.getByText("Aprobado")).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "Descargar Informe de mecánica de suelos" }));
    expect(screen.getByText(/Descarga simulada/)).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "Salir" }));
    await screen.findByRole("heading", { level: 1, name: "Portal de clientes" });
  });

  it("valida y registra mensajes al estudio", async () => {
    await abrir("/demos/trama/portal", "Portal de clientes");
    await userEvent.click(screen.getByRole("button", { name: "Entrar como cliente de demostración" }));
    await screen.findByRole("heading", { level: 1, name: "Casa Duna" });
    await userEvent.click(screen.getByRole("button", { name: "Enviar mensaje" }));
    expect(screen.getByText("Escribe un mensaje.")).toBeInTheDocument();
    await userEvent.type(screen.getByLabelText("Nuevo mensaje"), "¿Cuándo es la próxima reunión?");
    await userEvent.click(screen.getByRole("button", { name: "Enviar mensaje" }));
    expect(screen.getByText("¿Cuándo es la próxima reunión?")).toBeInTheDocument();
  });
});

describe("demo RutaStock", () => {
  it("el panel resume el inventario y sus alertas", async () => {
    await abrir("/demos/rutastock/panel", "Panel de control");
    expect(screen.getByRole("heading", { level: 2, name: "Alertas de reposición (4)" })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: /Entradas y salidas/ })).toBeInTheDocument();
  });

  it("el inventario busca, rechaza salidas sin stock y acepta entradas", async () => {
    await abrir("/demos/rutastock/inventario", "Inventario");
    expect(screen.getAllByRole("row")).toHaveLength(15);
    await userEvent.type(screen.getByLabelText("Buscar por nombre o SKU"), "arroz");
    expect(screen.getAllByRole("row")).toHaveLength(2);
    await userEvent.clear(screen.getByLabelText("Buscar por nombre o SKU"));
    await userEvent.selectOptions(screen.getByLabelText("Producto"), "RS-1004");
    await userEvent.selectOptions(screen.getByLabelText("Tipo"), "salida");
    await userEvent.type(screen.getByLabelText("Cantidad"), "1");
    await userEvent.click(screen.getByRole("button", { name: "Registrar" }));
    expect(screen.getByRole("alert")).toHaveTextContent("Solo hay 0 unidades de «Azúcar 1 kg»; no se puede sacar 1.");
    await userEvent.selectOptions(screen.getByLabelText("Tipo"), "entrada");
    await userEvent.clear(screen.getByLabelText("Cantidad"));
    await userEvent.type(screen.getByLabelText("Cantidad"), "50");
    await userEvent.click(screen.getByRole("button", { name: "Registrar" }));
    expect(screen.getByText("Movimiento registrado: entrada de 50 unidades.")).toBeInTheDocument();
    const fila = screen.getByText("Azúcar 1 kg").closest("tr")!;
    expect(within(fila).getByText("50", { selector: "td" })).toBeInTheDocument();
  });

  it("agrega y elimina productos con validación", async () => {
    await abrir("/demos/rutastock/inventario", "Inventario");
    await userEvent.click(screen.getByRole("button", { name: "Agregar producto" }));
    expect(screen.getByText("Escribe un nombre de al menos 3 caracteres.")).toBeInTheDocument();
    await userEvent.type(screen.getByLabelText("Nombre"), "Esponja de cocina");
    await userEvent.type(screen.getByLabelText("Costo"), "450");
    await userEvent.click(screen.getByRole("button", { name: "Agregar producto" }));
    expect(screen.getAllByRole("row")).toHaveLength(16);
    await userEvent.click(screen.getByRole("button", { name: "Eliminar Esponja de cocina" }));
    expect(screen.getAllByRole("row")).toHaveLength(15);
  });

  it("los reportes muestran el total y la vista previa del CSV", async () => {
    await abrir("/demos/rutastock/reportes", "Reportes");
    expect(screen.getByRole("button", { name: "Descargar CSV" })).toBeInTheDocument();
    expect(screen.getByLabelText("Vista previa del CSV")).toHaveTextContent("SKU,Producto,Categoría");
    expect(screen.getByText("100%")).toBeInTheDocument();
  });
});

describe("demo Servimant", () => {
  it("lista las órdenes y filtra por estado", async () => {
    await abrir("/demos/servimant/ordenes", "Órdenes de trabajo");
    expect(screen.getAllByRole("link", { name: /OT-1\d\d/ })).toHaveLength(6);
    await userEvent.selectOptions(screen.getByLabelText("Estado"), "Cerrada");
    expect(screen.getAllByRole("link", { name: /OT-1\d\d/ })).toHaveLength(1);
  });

  it("solo ofrece técnicos con la especialidad y asigna", async () => {
    await abrir("/demos/servimant/ordenes/o1", "OT-101");
    const sel = screen.getByLabelText("Asignar técnico");
    expect(within(sel).queryByRole("option", { name: /Camila/ })).not.toBeInTheDocument();
    await userEvent.selectOptions(sel, "t4");
    await userEvent.click(screen.getByRole("button", { name: "Asignar" }));
    expect(screen.getByText(/Asignada a Daniela Pinto/)).toBeInTheDocument();
  });

  it("cerrar una orden exige informe y lo deja en la ficha", async () => {
    await abrir("/demos/servimant/ordenes/o4", "OT-104");
    await userEvent.click(screen.getByRole("button", { name: "Pasar a Cerrada" }));
    expect(screen.getByRole("alert")).toHaveTextContent(/escribe un informe/);
    await userEvent.type(screen.getByLabelText("Informe de cierre"), "Sello reemplazado y prueba de presión correcta.");
    await userEvent.click(screen.getByRole("button", { name: "Pasar a Cerrada" }));
    expect(screen.getByText(/Cerrada con informe/)).toBeInTheDocument();
    expect(screen.getByText(/no admite más cambios/)).toBeInTheDocument();
  });

  it("no permite ejecutar una orden sin técnico", async () => {
    await abrir("/demos/servimant/ordenes/o1", "OT-101");
    expect(screen.queryByRole("button", { name: "Pasar a En ejecución" })).not.toBeInTheDocument();
  });

  it("los técnicos muestran su carga", async () => {
    await abrir("/demos/servimant/tecnicos", "Técnicos");
    expect(screen.getAllByText(/Carga: 1\/2/)).toHaveLength(2);
    expect(screen.getAllByText(/Carga: 0\/2/)).toHaveLength(2);
  });

  it("crea una orden con validación", async () => {
    await abrir("/demos/servimant/ordenes", "Órdenes de trabajo");
    await userEvent.click(screen.getByRole("button", { name: "Crear orden" }));
    expect(screen.getByRole("alert")).toHaveTextContent("Escribe el nombre del cliente.");
    await userEvent.type(screen.getByLabelText("Cliente"), "Cervecera del Sur");
    await userEvent.type(screen.getByLabelText("Equipo"), "Llenadora LL-2");
    await userEvent.type(screen.getByLabelText("Descripción"), "Ruido anormal en el cabezal.");
    await userEvent.click(screen.getByRole("button", { name: "Crear orden" }));
    expect(screen.getAllByRole("link", { name: /OT-1\d\d/ })).toHaveLength(7);
  });
});

describe("demo MesaFlow", () => {
  it("el solicitante ve solo sus tickets y los demás roles ven todos", async () => {
    await abrir("/demos/mesaflow/tickets", "Tickets");
    expect(screen.getByRole("status")).toHaveTextContent("Estás viendo solo tus tickets. 4 tickets.");
    await userEvent.selectOptions(screen.getByLabelText("Ver como"), "agente");
    expect(screen.getByRole("status")).toHaveTextContent("Estás viendo todos los tickets. 6 tickets.");
    expect(screen.getByText(/Solo los solicitantes abren tickets/)).toBeInTheDocument();
  });

  it("un solicitante abre un ticket con validación", async () => {
    await abrir("/demos/mesaflow/tickets", "Tickets");
    await userEvent.click(screen.getByRole("button", { name: "Crear ticket" }));
    expect(screen.getByRole("alert")).toHaveTextContent("El título debe tener al menos 5 caracteres.");
    await userEvent.type(screen.getByLabelText("Título"), "Mouse sin respuesta");
    await userEvent.type(screen.getByLabelText("Descripción"), "El mouse dejó de moverse.");
    await userEvent.click(screen.getByRole("button", { name: "Crear ticket" }));
    expect(screen.getByRole("status")).toHaveTextContent("5 tickets.");
  });

  it("solo el agente toma un ticket y queda asignado", async () => {
    await abrir("/demos/mesaflow/tickets/t1", /TK-201/);
    expect(screen.queryByRole("button", { name: "Tomar ticket" })).not.toBeInTheDocument();
    await userEvent.selectOptions(screen.getByLabelText("Ver como"), "agente");
    await userEvent.click(screen.getByRole("button", { name: "Tomar ticket" }));
    expect(screen.getByText("Tomás Lagos", { selector: "dd" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Pasar a en espera" })).toBeInTheDocument();
  });

  it("resolver exige explicar cómo se resolvió", async () => {
    await abrir("/demos/mesaflow/tickets/t2", /TK-202/);
    await userEvent.selectOptions(screen.getByLabelText("Ver como"), "agente");
    await userEvent.click(screen.getByRole("button", { name: "Pasar a resuelto" }));
    expect(screen.getByRole("alert")).toHaveTextContent(/cómo se resolvió/);
    await userEvent.type(screen.getByLabelText("Cómo se resolvió"), "Se reinstaló el controlador y se imprimió una prueba.");
    await userEvent.click(screen.getByRole("button", { name: "Pasar a resuelto" }));
    expect(screen.getByText(/Se reinstaló el controlador/)).toBeInTheDocument();
  });

  it("los reportes son del administrador y el reloj vence plazos", async () => {
    await abrir("/demos/mesaflow/reportes", "Reportes");
    expect(screen.getByText(/solo para administradores/)).toBeInTheDocument();
    await userEvent.selectOptions(screen.getByLabelText("Ver como"), "admin");
    expect(screen.getByText("100%")).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "Avanzar el reloj 4 horas" }));
    expect(screen.queryByText("100%")).not.toBeInTheDocument();
  });
});

describe("demo PuenteSync", () => {
  it("sincroniza los válidos, aparta los inválidos con su motivo y no duplica", async () => {
    await abrir("/demos/puentesync/flujo", "Flujo de sincronización");
    expect(screen.getByRole("status")).toHaveTextContent("Pendientes: 6");
    await userEvent.click(screen.getByRole("button", { name: "Sincronizar ahora" }));
    expect(screen.getByRole("status")).toHaveTextContent("Sincronizados: 4 · Con error: 2");
    expect(screen.getByText("Falta el RUT del cliente.")).toBeInTheDocument();
    expect(screen.getAllByText(/dígito verificador incorrecto/).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("row")).toHaveLength(5);
    await userEvent.click(screen.getByRole("button", { name: "Sincronizar ahora" }));
    expect(screen.getAllByRole("row")).toHaveLength(5);
    expect(screen.getByText("No hay pedidos por sincronizar.", { exact: false })).toBeInTheDocument();
  });

  it("corregir un RUT permite reintentar; un RUT inválido se rechaza", async () => {
    await abrir("/demos/puentesync/flujo", "Flujo de sincronización");
    await userEvent.click(screen.getByRole("button", { name: "Sincronizar ahora" }));
    const campo = screen.getByLabelText("Corregir RUT de PED-3005");
    const form = campo.closest("form")!;
    await userEvent.type(campo, "12.345.678-1");
    await userEvent.click(within(form).getByRole("button", { name: "Corregir y reintentar" }));
    expect(within(form).getByRole("alert")).toHaveTextContent(/no es válido/);
    await userEvent.clear(campo);
    await userEvent.type(campo, "11.111.111-1");
    await userEvent.click(within(form).getByRole("button", { name: "Corregir y reintentar" }));
    await userEvent.click(screen.getByRole("button", { name: "Sincronizar ahora" }));
    expect(screen.getByRole("status")).toHaveTextContent("Sincronizados: 5 · Con error: 1");
  });

  it("si contabilidad está caída los pedidos válidos esperan y se recuperan", async () => {
    await abrir("/demos/puentesync/flujo", "Flujo de sincronización");
    await userEvent.click(screen.getByLabelText("Simular caída de contabilidad"));
    await userEvent.click(screen.getByRole("button", { name: "Sincronizar ahora" }));
    expect(screen.getAllByText("Contabilidad no disponible.")).toHaveLength(4);
    expect(screen.getByText(/aún no recibe documentos/)).toBeInTheDocument();
    await userEvent.click(screen.getByLabelText("Simular caída de contabilidad"));
    await userEvent.click(screen.getByRole("button", { name: "Sincronizar ahora" }));
    expect(screen.getByRole("status")).toHaveTextContent("Sincronizados: 4 · Con error: 2");
  });

  it("documenta el mapeo de campos", async () => {
    await abrir("/demos/puentesync/mapeo", "Reglas y campos");
    expect(screen.getByText("monto ÷ 1,19, redondeado al peso.")).toBeInTheDocument();
  });
});
