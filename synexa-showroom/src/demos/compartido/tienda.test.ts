import { describe, expect, it } from "vitest";
import {
  ventasPorDia, topProductos, agregarLinea, calcularTotales, cambiarCantidad, cantidadTotal, claveLinea, descuentoCupon, puedePasar, resumenVentas, validarCheckout, validarCupon,
  type Cupon, type Pedido,
} from "./tienda";

const precios: Record<string, number> = { a: 10000, b: 25000 };
const precioDe = (id: string) => precios[id];
const ENVIO = { gratisDesde: 40000, costo: 3990 };
const BIENVENIDA: Cupon = { codigo: "BIENVENIDA", tipo: "pct", valor: 10, descripcion: "10 %" };
const FIJO: Cupon = { codigo: "MENOS5", tipo: "monto", valor: 5000, minimo: 20000, descripcion: "$5.000" };

describe("carrito", () => {
  it("agrega y suma cantidades de la misma variante", () => {
    let l = agregarLinea([], "a", 1, "M", "negro");
    l = agregarLinea(l, "a", 2, "M", "negro");
    expect(l).toHaveLength(1);
    expect(l[0].cantidad).toBe(3);
    l = agregarLinea(l, "a", 1, "L", "negro");
    expect(l).toHaveLength(2);
    expect(l[1].clave).toBe(claveLinea("a", "L", "negro"));
  });

  it("limita la cantidad máxima por línea", () => {
    expect(agregarLinea([], "a", 99)[0].cantidad).toBe(10);
    const l = agregarLinea([], "a", 5);
    expect(cambiarCantidad(l, l[0].clave, 50)[0].cantidad).toBe(10);
  });

  it("quita la línea al llegar a 0 y cuenta unidades", () => {
    let l = agregarLinea([], "a", 2);
    l = agregarLinea(l, "b", 1);
    expect(cantidadTotal(l)).toBe(3);
    expect(cambiarCantidad(l, l[0].clave, 0)).toHaveLength(1);
  });
});

describe("totales y cupones", () => {
  it("calcula subtotal, envío y total", () => {
    const l = agregarLinea([], "a", 2); // 20.000
    expect(calcularTotales(l, precioDe, ENVIO)).toEqual({ subtotal: 20000, descuento: 0, envio: 3990, total: 23990 });
  });

  it("el envío es gratis desde el umbral y con carrito vacío no hay cobro", () => {
    const l = agregarLinea([], "b", 2); // 50.000
    expect(calcularTotales(l, precioDe, ENVIO).envio).toBe(0);
    expect(calcularTotales([], precioDe, ENVIO).total).toBe(0);
  });

  it("aplica descuento porcentual y fijo con mínimo", () => {
    expect(descuentoCupon(20000, BIENVENIDA)).toBe(2000);
    expect(descuentoCupon(25000, FIJO)).toBe(5000);
    expect(descuentoCupon(15000, FIJO)).toBe(0);
    expect(descuentoCupon(3000, { ...FIJO, minimo: undefined })).toBe(3000); // nunca supera el subtotal
  });

  it("el descuento se aplica antes de evaluar el envío gratis", () => {
    const l = agregarLinea([], "b", 2); // 50.000 - 10 % = 45.000 >= 40.000
    const t = calcularTotales(l, precioDe, ENVIO, BIENVENIDA);
    expect(t).toEqual({ subtotal: 50000, descuento: 5000, envio: 0, total: 45000 });
    const l2 = agregarLinea([], "b", 1);
    l2.push(...agregarLinea([], "a", 2)); // 45.000 - 10 % = 40.500 -> gratis
    expect(calcularTotales(l2, precioDe, ENVIO, BIENVENIDA).envio).toBe(0);
    expect(calcularTotales(agregarLinea([], "b", 1).concat(agregarLinea([], "a", 1)), precioDe, ENVIO, BIENVENIDA).envio).toBe(3990);
  });

  it("valida cupones por código y mínimo", () => {
    expect(validarCupon("bienvenida", [BIENVENIDA], 1000)).toEqual({ ok: true, cupon: BIENVENIDA });
    expect(validarCupon("xx", [BIENVENIDA], 1000)).toMatchObject({ ok: false });
    expect(validarCupon("MENOS5", [FIJO], 10000)).toMatchObject({ ok: false, motivo: expect.stringContaining("mínima") });
  });
});

describe("pedidos", () => {
  const p = (estado: Pedido["estado"], total: number, unidades = 1): Pedido => ({
    id: estado + total, numero: "X-0001", fecha: "2026-10-19", cliente: { nombre: "A", correo: "a@a.cl", direccion: "calle 123" },
    lineas: [{ productoId: "a", nombre: "A", cantidad: unidades, precio: total }], totales: { subtotal: total, descuento: 0, envio: 0, total }, estado,
  });

  it("respeta las transiciones de estado", () => {
    expect(puedePasar("pendiente", "pagado")).toBe(true);
    expect(puedePasar("pagado", "enviado")).toBe(false);
    expect(puedePasar("entregado", "cancelado")).toBe(false);
    expect(puedePasar("cancelado", "pagado")).toBe(false);
  });

  it("el resumen de ventas excluye pendientes y cancelados", () => {
    const r = resumenVentas([p("pagado", 10000, 2), p("entregado", 20000, 1), p("cancelado", 99999), p("pendiente", 5000)]);
    expect(r).toEqual({ pedidos: 2, ingresos: 30000, unidades: 3, ticketMedio: 15000 });
    expect(resumenVentas([])).toEqual({ pedidos: 0, ingresos: 0, unidades: 0, ticketMedio: 0 });
  });

  it("valida los datos del checkout", () => {
    expect(validarCheckout({ nombre: "", correo: "x", direccion: "" })).toEqual({ nombre: expect.any(String), correo: expect.any(String), direccion: expect.any(String) });
    expect(validarCheckout({ nombre: "Ana", correo: "ana@x.cl", direccion: "Calle Falsa 123" })).toEqual({});
  });
});

describe("reportes de ventas", () => {
  const ped = (fecha: string, estado: Pedido["estado"], total: number, nombre: string, unidades: number): Pedido => ({
    id: fecha + nombre, numero: "X", fecha, cliente: { nombre: "A", correo: "a@a.cl", direccion: "calle 123" },
    lineas: [{ productoId: nombre, nombre, cantidad: unidades, precio: total / unidades }], totales: { subtotal: total, descuento: 0, envio: 0, total }, estado,
  });
  const hoy = new Date(2026, 9, 19, 15, 0);

  it("agrupa ingresos por día y excluye cancelados y pendientes", () => {
    const r = ventasPorDia([ped("2026-10-19T10:00:00", "pagado", 10000, "A", 1), ped("2026-10-19T11:00:00", "entregado", 5000, "B", 1), ped("2026-10-18T10:00:00", "pagado", 7000, "A", 1), ped("2026-10-19T12:00:00", "cancelado", 99999, "C", 1), ped("2026-10-19T13:00:00", "pendiente", 888, "C", 1), ped("2026-09-01T10:00:00", "pagado", 5, "A", 1)], hoy, 3);
    expect(r.map((x) => x.dia)).toEqual(["2026-10-17", "2026-10-18", "2026-10-19"]);
    expect(r.map((x) => x.ingresos)).toEqual([0, 7000, 15000]);
  });

  it("ordena los productos más vendidos por unidades", () => {
    const r = topProductos([ped("2026-10-19T10:00:00", "pagado", 10000, "Zapatillas", 2), ped("2026-10-19T10:00:00", "enviado", 9000, "Gorra", 3), ped("2026-10-19T10:00:00", "cancelado", 1, "Bolso", 50)], 5);
    expect(r).toEqual([{ nombre: "Gorra", unidades: 3 }, { nombre: "Zapatillas", unidades: 2 }]);
  });
});
