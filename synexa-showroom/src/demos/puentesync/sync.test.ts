import { describe, expect, it } from "vitest";
import { ESTADO_INICIAL, PEDIDOS_INICIALES, aDocumento, agregarPedido, corregirRut, resumen, sincronizar, validarPedido, validarRut } from "./sync";

describe("validación de RUT", () => {
  it.each(["11.111.111-1", "12.345.678-5", "22222222-2", "7.654.321-6"])("acepta %s", (r) => expect(validarRut(r)).toBe(true));
  it.each(["12.345.678-9", "", "abc", "1-9", "11.111.111-K"])("rechaza «%s»", (r) => expect(validarRut(r)).toBe(false));
});

describe("sincronización de PuenteSync", () => {
  it("convierte bruto en neto + IVA que suman el total", () => {
    const d = aDocumento(PEDIDOS_INICIALES[0], 5001);
    expect(d.neto + d.iva).toBe(d.total);
    expect(d.neto).toBe(50_412);
    expect(d.rut).toBe("11111111-1");
  });
  it("sincroniza los válidos y deja con error los inválidos, sin detener el resto", () => {
    const e = sincronizar(ESTADO_INICIAL);
    expect(resumen(e)).toEqual({ pendientes: 0, sincronizados: 4, errores: 2 });
    expect(e.documentos.map((d) => d.folio)).toEqual([5001, 5002, 5003, 5004]);
    expect(e.pedidos.find((x) => x.id === "p3")?.motivo).toMatch(/Falta el RUT/);
    expect(e.pedidos.find((x) => x.id === "p5")?.motivo).toMatch(/dígito verificador/);
    expect(e.registro.at(-1)?.texto).toBe("Fin: 4 sincronizado(s), 2 con error.");
  });
  it("es idempotente: sincronizar de nuevo no duplica documentos", () => {
    const e1 = sincronizar(ESTADO_INICIAL);
    const e2 = sincronizar(e1);
    expect(e2.documentos).toHaveLength(4);
    expect(e2.registro.at(-1)?.texto).toBe("No hay pedidos por sincronizar.");
  });
  it("si el destino está caído los pedidos válidos quedan reintentables y se recuperan después", () => {
    const caido = sincronizar({ ...ESTADO_INICIAL, destinoCaido: true });
    expect(caido.documentos).toHaveLength(0);
    expect(caido.pedidos.filter((x) => x.reintentable)).toHaveLength(4);
    const recuperado = sincronizar({ ...caido, destinoCaido: false });
    expect(recuperado.documentos).toHaveLength(4);
    expect(resumen(recuperado).errores).toBe(2);
  });
  it("corregir un RUT habilita el reintento", () => {
    const e1 = sincronizar(ESTADO_INICIAL);
    expect(corregirRut(e1, "p5", "12.345.678-1")).toHaveProperty("error");
    const r = corregirRut(e1, "p5", "11.111.111-1");
    if ("error" in r) throw new Error(r.error);
    const e2 = sincronizar(r.estado);
    expect(e2.pedidos.find((x) => x.id === "p5")?.estado).toBe("sincronizado");
    expect(e2.documentos.at(-1)?.folio).toBe(5005);
  });
  it("valida un pedido nuevo", () => {
    expect(validarPedido({ cliente: "Ab", rut: "11.111.111-1", monto: 100 })).toMatch(/cliente/);
    expect(validarPedido({ cliente: "Abc", rut: "11.111.111-1", monto: 0 })).toMatch(/monto/);
    expect(agregarPedido(ESTADO_INICIAL, { cliente: "x", rut: "", monto: 1 })).toHaveProperty("error");
    const r = agregarPedido(ESTADO_INICIAL, { cliente: "Cliente Nuevo", rut: "", monto: 1000 });
    expect("estado" in r && r.estado.pedidos).toHaveLength(7);
  });
});
