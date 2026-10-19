import { beforeEach, describe, expect, it } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { App } from "@/app/App";

const abrir = async (ruta: string, esperar: RegExp | string) => {
  render(
    <MemoryRouter initialEntries={[ruta]}>
      <App />
    </MemoryRouter>,
  );
  await screen.findByRole("heading", { level: 1, name: esperar }, { timeout: 15000 });
};

beforeEach(() => localStorage.clear());

describe("demo Puerto FM", () => {
  it("muestra inicio con reproductor y alterna reproducir/pausar", async () => {
    await abrir("/demos/puerto-fm", /La voz del puerto/);
    expect(screen.getByText("Demostración SYNEXA")).toBeInTheDocument();
    const b = screen.getByRole("button", { name: "Reproducir la señal" });
    await userEvent.click(b);
    expect(screen.getByRole("button", { name: "Pausar la señal" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByText(/Señal de prueba generada en tu navegador/)).toBeInTheDocument();
  });

  it("la programación cambia por día y avisa si no hay programas", async () => {
    await abrir("/demos/puerto-fm/programacion", /Qué escuchar/);
    await userEvent.click(screen.getByRole("button", { name: "Sábado" }));
    expect(screen.getByText("Sábado Familiar")).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "Domingo" }));
    expect(screen.getByText(/No hay programas en vivo este día/)).toBeInTheDocument();
  });

  it("navega a una noticia y maneja una inexistente", async () => {
    await abrir("/demos/puerto-fm/noticias/feria", /Feria costanera/);
    await abrir("/demos/puerto-fm/noticias/xx", /Noticia no encontrada/);
  });

  it("valida el contacto y confirma como demostración", async () => {
    await abrir("/demos/puerto-fm/contacto", /Escríbele a la radio/);
    await userEvent.click(screen.getByRole("button", { name: "Enviar mensaje" }));
    expect(screen.getByText("Escribe tu nombre.")).toBeInTheDocument();
    await userEvent.type(screen.getByLabelText("Nombre"), "Rosa");
    await userEvent.type(screen.getByLabelText("Correo"), "rosa@mail.example");
    await userEvent.type(screen.getByLabelText("Mensaje"), "Saludos a la audiencia");
    await userEvent.click(screen.getByRole("button", { name: "Enviar mensaje" }));
    expect(screen.getByRole("status")).toHaveTextContent(/no se envió ni se guardó ningún dato/);
  });
});

describe("demo Tiempo Retro", () => {
  it("el archivo filtra por década, tipo y texto", async () => {
    await abrir("/demos/tiempo-retro/archivo", /Todo lo que hemos contado/);
    expect(screen.getAllByRole("article")).toHaveLength(4);
    await userEvent.selectOptions(screen.getByLabelText("Década"), "1990");
    expect(screen.getAllByRole("article")).toHaveLength(1);
    await userEvent.selectOptions(screen.getByLabelText("Década"), "");
    await userEvent.selectOptions(screen.getByLabelText("Tipo"), "Entrevista");
    expect(screen.getAllByRole("article")).toHaveLength(1);
    await userEvent.selectOptions(screen.getByLabelText("Tipo"), "");
    await userEvent.type(screen.getByLabelText("Buscar en el archivo"), "zzzz");
    expect(screen.getByText(/No hay contenidos con esos filtros/)).toBeInTheDocument();
  });

  it("muestra la ficha de un programa y un error si no existe", async () => {
    await abrir("/demos/tiempo-retro/programa/neones-80", "Neones del 80");
    await abrir("/demos/tiempo-retro/programa/xx", /Programa no encontrado/);
  });

  it("el panel editorial publica un borrador y aparece en el archivo", async () => {
    await abrir("/demos/tiempo-retro/editorial", "Panel editorial");
    const fila = screen.getByText("Borrador: especial de fin de año").closest("tr")!;
    await userEvent.click(within(fila).getByRole("button", { name: "Publicar" }));
    expect(within(fila).getByText("Publicado")).toBeInTheDocument();
    await userEvent.click(screen.getByRole("link", { name: "Archivo" }));
    expect(await screen.findByRole("heading", { level: 2, name: /especial de fin de año/ })).toBeInTheDocument();
  });

  it("crea un contenido con validación", async () => {
    await abrir("/demos/tiempo-retro/editorial", "Panel editorial");
    await userEvent.click(screen.getByRole("button", { name: "Nuevo contenido" }));
    await userEvent.click(screen.getByRole("button", { name: "Guardar" }));
    expect(screen.getByRole("alert")).toHaveTextContent(/título/);
    await userEvent.type(screen.getByLabelText("Título"), "Historia del walkman");
    await userEvent.type(screen.getByLabelText("Resumen"), "Un aparato que cambió todo.");
    await userEvent.click(screen.getByRole("button", { name: "Guardar" }));
    expect(screen.getByText("Historia del walkman")).toBeInTheDocument();
  });

  it("una dedicatoria queda pendiente hasta que el editor la aprueba", async () => {
    await abrir("/demos/tiempo-retro/dedicatorias", /Dile algo con una canción/);
    await userEvent.click(screen.getByRole("button", { name: "Enviar dedicatoria" }));
    expect(screen.getByText("¿Para quién es?")).toBeInTheDocument();
    await userEvent.type(screen.getByLabelText("Para"), "Abuelo");
    await userEvent.type(screen.getByLabelText("De parte de"), "Tomás");
    await userEvent.type(screen.getByLabelText("Mensaje"), "Gracias por la música");
    await userEvent.click(screen.getByRole("button", { name: "Enviar dedicatoria" }));
    expect(screen.getByText(/pendiente de revisión/)).toBeInTheDocument();
    expect(screen.queryByText("“Gracias por la música”")).not.toBeInTheDocument();
    await userEvent.click(screen.getByRole("link", { name: "panel editorial" }));
    await screen.findByRole("heading", { level: 1, name: "Panel editorial" });
    await userEvent.click(screen.getByRole("button", { name: "Aprobar dedicatoria de Tomás" }));
    expect(screen.queryByText(/Dedicatorias pendientes \(1\)/)).not.toBeInTheDocument();
  });

  it("«Reiniciar demo» restablece el contenido", async () => {
    await abrir("/demos/tiempo-retro/editorial", "Panel editorial");
    await userEvent.click(screen.getByRole("button", { name: "Eliminar Borrador: especial de fin de año" }));
    expect(screen.queryByText("Borrador: especial de fin de año")).not.toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "Reiniciar demo" }));
    await screen.findByRole("heading", { level: 1, name: /Las canciones que no pasan de moda/ });
    expect(localStorage.getItem("synexa:tiempo-retro:estado") ?? "").not.toContain("[]");
  });
});

describe("demo Vértice Bikes", () => {
  it("el catálogo muestra los 11 productos y filtra por categoría, material y suspensión", async () => {
    await abrir("/demos/vertice-bikes/catalogo", "Catálogo");
    expect(screen.getAllByRole("article")).toHaveLength(11);
    await userEvent.click(screen.getByRole("checkbox", { name: "Montaña" }));
    expect(screen.getAllByRole("article")).toHaveLength(2);
    await userEvent.click(screen.getByRole("checkbox", { name: "Completa" }));
    expect(screen.getAllByRole("article")).toHaveLength(1);
    await userEvent.click(screen.getByRole("button", { name: "Quitar filtros" }));
    await userEvent.click(screen.getByRole("checkbox", { name: "Carbono" }));
    expect(screen.getAllByRole("article")).toHaveLength(1);
  });

  it("la búsqueda avanzada ignora tildes", async () => {
    await abrir("/demos/vertice-bikes/catalogo", "Catálogo");
    await userEvent.type(screen.getByLabelText("Buscar"), "montana");
    expect(screen.getAllByRole("article").length).toBeGreaterThan(0);
  });

  it("la ficha muestra la ficha técnica, productos relacionados y valida la consulta", async () => {
    await abrir("/demos/vertice-bikes/producto/aero-carbon", /Aero Carbon Ruta/);
    expect(screen.getByRole("heading", { name: "Ficha técnica" })).toBeInTheDocument();
    expect(screen.getByText("8,1 kg")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Productos relacionados" })).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "Enviar consulta" }));
    expect(screen.getByText("Escribe tu nombre.")).toBeInTheDocument();
  });

  it("un producto inexistente muestra error", async () => {
    await abrir("/demos/vertice-bikes/producto/xx", /Producto no encontrado/);
  });

  it("la gestión oculta un producto y desaparece del catálogo", async () => {
    await abrir("/demos/vertice-bikes/gestion", "Gestión de productos");
    await userEvent.click(screen.getByRole("button", { name: "Ocultar Casco Ruta Aero" }));
    await userEvent.click(within(screen.getByRole("banner")).getByRole("link", { name: "Catálogo" }));
    await screen.findByRole("heading", { level: 1, name: "Catálogo" });
    expect(screen.getAllByRole("article")).toHaveLength(10);
  });

  it("la gestión crea un producto con validación y lo muestra", async () => {
    await abrir("/demos/vertice-bikes/gestion", "Gestión de productos");
    await userEvent.click(screen.getByRole("button", { name: "Nuevo producto" }));
    await userEvent.click(screen.getByRole("button", { name: "Guardar" }));
    expect(screen.getByText(/al menos 3 caracteres/)).toBeInTheDocument();
    expect(screen.getByText(/precio mayor que 0/)).toBeInTheDocument();
    await userEvent.type(screen.getByLabelText("Nombre"), "Bici Nueva Test");
    await userEvent.type(screen.getByLabelText("Precio (CLP)"), "450000");
    await userEvent.click(screen.getByRole("button", { name: "Guardar" }));
    expect(screen.getByText("Bici Nueva Test")).toBeInTheDocument();
  });
});

describe("demo Huella Viva", () => {
  it("agrega al carrito, cambia cantidades y calcula el total con envío", async () => {
    await abrir("/demos/huella-viva/producto/plato", "Plato de acero inoxidable");
    await userEvent.click(screen.getByRole("button", { name: "Agregar al carrito" }));
    await userEvent.click(screen.getByRole("link", { name: "Ver carrito" }));
    await screen.findByRole("heading", { level: 1, name: "Tu carrito" });
    const resumen = screen.getByRole("complementary", { name: "Resumen del pedido" });
    expect(within(resumen).getByText("$9.890")).toBeInTheDocument(); // 5.900 + 3.990
    await userEvent.click(screen.getByRole("button", { name: "Agregar una unidad de Plato de acero inoxidable" }));
    expect(within(resumen).getByText("$15.790")).toBeInTheDocument(); // 11.800 + 3.990
    await userEvent.click(screen.getByRole("button", { name: "Eliminar Plato de acero inoxidable del carrito" }));
    expect(screen.getByText("Tu carrito está vacío.")).toBeInTheDocument();
  });

  it("el carrito persiste y el envío es gratis desde $30.000", async () => {
    await abrir("/demos/huella-viva/producto/bolso", "Bolso de transporte");
    await userEvent.click(screen.getByRole("button", { name: "Aumentar cantidad" }));
    await userEvent.click(screen.getByRole("button", { name: "Agregar al carrito" }));
    await userEvent.click(screen.getByRole("link", { name: "Ver carrito" }));
    await screen.findByRole("heading", { level: 1, name: "Tu carrito" });
    const resumen = screen.getByRole("complementary", { name: "Resumen del pedido" });
    expect(within(resumen).getByText("Gratis")).toBeInTheDocument();
    expect(within(resumen).getAllByText("$59.800").length).toBeGreaterThan(0);
  });

  it("completa una compra simulada y el pedido aparece en la gestión", async () => {
    await abrir("/demos/huella-viva/producto/varita", "Varita de plumas para gatos");
    await userEvent.click(screen.getByRole("button", { name: "Agregar al carrito" }));
    await userEvent.click(screen.getByRole("link", { name: "Ver carrito" }));
    await userEvent.click(await screen.findByRole("link", { name: "Ir al pago simulado" }));
    await screen.findByRole("heading", { level: 1, name: "Pago" });
    await userEvent.click(screen.getByRole("button", { name: "Confirmar compra simulada" }));
    expect(screen.getByText("Escribe tu nombre.")).toBeInTheDocument();
    expect(screen.queryByLabelText(/tarjeta/i)).not.toBeInTheDocument();
    await userEvent.type(screen.getByLabelText("Nombre completo"), "Carla Díaz");
    await userEvent.type(screen.getByLabelText("Correo"), "carla@mail.example");
    await userEvent.type(screen.getByLabelText(/Dirección de despacho/), "Calle Falsa 123");
    await userEvent.click(screen.getByRole("button", { name: "Confirmar compra simulada" }));
    expect(await screen.findByRole("heading", { level: 1, name: /Gracias, Carla/ })).toBeInTheDocument();
    expect(screen.getByRole("status")).toHaveTextContent(/HV-0001/);
    await userEvent.click(screen.getByRole("link", { name: "Pedidos" }));
    await screen.findByRole("heading", { level: 1, name: "Gestión de pedidos" });
    await userEvent.selectOptions(screen.getByLabelText("Cambiar estado del pedido HV-0001"), "pagado");
    expect(within(screen.getByText("HV-0001").closest("tr")!).getByText("Pagado (simulado)")).toBeInTheDocument();
  });

  it("no ofrece cupones ni estados imposibles en el paquete esencial", async () => {
    await abrir("/demos/huella-viva/producto/plato", "Plato de acero inoxidable");
    await userEvent.click(screen.getByRole("button", { name: "Agregar al carrito" }));
    await userEvent.click(screen.getByRole("link", { name: "Ver carrito" }));
    await screen.findByRole("heading", { level: 1, name: "Tu carrito" });
    expect(screen.queryByLabelText("Código de cupón")).not.toBeInTheDocument();
  });

  it("«Reiniciar demo» vacía el carrito", async () => {
    await abrir("/demos/huella-viva/producto/plato", "Plato de acero inoxidable");
    await userEvent.click(screen.getByRole("button", { name: "Agregar al carrito" }));
    expect(screen.getByRole("link", { name: "Carrito, 1 producto" })).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "Reiniciar demo" }));
    await screen.findByRole("heading", { level: 1, name: /Todo lo que tu mascota necesita/ });
    expect(screen.getByRole("link", { name: "Carrito, 0 productos" })).toBeInTheDocument();
  });
});

describe("demo Rango Activewear", () => {
  it("exige elegir talla antes de agregar", async () => {
    await abrir("/demos/rango/producto/polera", /Polera técnica Pace/);
    await userEvent.click(screen.getByRole("button", { name: "Agregar al carrito" }));
    expect(screen.getByRole("alert")).toHaveTextContent(/Elige una talla/);
    await userEvent.click(screen.getByRole("radio", { name: "M" }));
    await userEvent.click(screen.getByRole("button", { name: "Agregar al carrito" }));
    expect(screen.getByRole("status")).toHaveTextContent(/Agregado al carrito/);
  });

  it("variantes distintas del mismo producto son líneas separadas", async () => {
    await abrir("/demos/rango/producto/polera", /Polera técnica Pace/);
    for (const talla of ["M", "L"]) {
      await userEvent.click(screen.getByRole("radio", { name: talla }));
      await userEvent.click(screen.getByRole("button", { name: "Agregar al carrito" }));
    }
    await userEvent.click(screen.getByRole("link", { name: "Ver carrito" }));
    await screen.findByRole("heading", { level: 1, name: "Tu carrito" });
    expect(screen.getByText(/Talla M/)).toBeInTheDocument();
    expect(screen.getByText(/Talla L/)).toBeInTheDocument();
  });

  it("aplica un cupón válido, rechaza uno inválido y calcula el descuento", async () => {
    await abrir("/demos/rango/producto/gorra", /Gorra Rango Cap/);
    await userEvent.click(screen.getByRole("button", { name: "Agregar al carrito" }));
    await userEvent.click(screen.getByRole("link", { name: "Ver carrito" }));
    await screen.findByRole("heading", { level: 1, name: "Tu carrito" });
    await userEvent.type(screen.getByLabelText("Código de cupón"), "NOEXISTE");
    await userEvent.click(screen.getByRole("button", { name: "Aplicar" }));
    expect(screen.getByText("Ese cupón no existe.")).toBeInTheDocument();
    await userEvent.clear(screen.getByLabelText("Código de cupón"));
    await userEvent.type(screen.getByLabelText("Código de cupón"), "VUELVE5000");
    await userEvent.click(screen.getByRole("button", { name: "Aplicar" }));
    expect(screen.getByText(/requiere una compra mínima/)).toBeInTheDocument();
    await userEvent.clear(screen.getByLabelText("Código de cupón"));
    await userEvent.type(screen.getByLabelText("Código de cupón"), "rango10");
    await userEvent.click(screen.getByRole("button", { name: "Aplicar" }));
    const resumen = screen.getByRole("complementary", { name: "Resumen del pedido" });
    expect(within(resumen).getByText("− $1.490")).toBeInTheDocument();
  });

  it("el panel muestra ventas de ejemplo con KPIs y estados", async () => {
    await abrir("/demos/rango/panel", "Panel de ventas");
    expect(screen.getByText("Ingresos")).toBeInTheDocument();
    expect(screen.getByText("Pedidos pagados")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Más vendidos" })).toBeInTheDocument();
    expect(screen.getByText("RG-0008")).toBeInTheDocument();
  });

  it("el flujo de estados no permite saltos inválidos", async () => {
    await abrir("/demos/rango/panel", "Panel de ventas");
    const selector = screen.getByLabelText("Cambiar estado del pedido RG-0008"); // pagado
    const opciones = within(selector).getAllByRole("option").map((o) => o.textContent);
    expect(opciones).toEqual(["Mover a…", "Preparando", "Cancelado"]);
    expect(screen.getByText("RG-0004").closest("tr")).toHaveTextContent("Sin cambios posibles"); // entregado
  });

  it("el catálogo filtra por talla y color", async () => {
    await abrir("/demos/rango/catalogo", "Tienda");
    expect(screen.getAllByRole("article")).toHaveLength(12);
    await userEvent.selectOptions(screen.getByLabelText("Talla"), "42");
    expect(screen.getAllByRole("article")).toHaveLength(2);
    await userEvent.selectOptions(screen.getByLabelText("Talla"), "");
    await userEvent.selectOptions(screen.getByLabelText("Color"), "Naranja");
    expect(screen.getAllByRole("article").length).toBeGreaterThan(0);
  });
});
