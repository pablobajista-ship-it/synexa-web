import { describe, expect, it } from "vitest";
import {
  ESTADO_INICIAL, avanzarReloj, cambiarEstado, cambiarPrioridad, comentar, crearTicket, destinosPermitidos, metricas, reasignar, semaforo, visibles,
  type Estado, type Rol,
} from "./reglas";

const como = (rol: Rol): Estado => ({ ...ESTADO_INICIAL, rol });
const ok = (r: { estado: Estado } | { error: string }) => { if ("error" in r) throw new Error(r.error); return r.estado; };

describe("reglas de MesaFlow", () => {
  it("el solicitante solo ve sus tickets", () => {
    expect(visibles(ESTADO_INICIAL.tickets, "solicitante").every((x) => x.solicitante === "Valentina Ruiz")).toBe(true);
    expect(visibles(ESTADO_INICIAL.tickets, "agente")).toHaveLength(6);
  });
  it("el semáforo de SLA depende de la prioridad y del reloj", () => {
    const [t1, , t3] = ESTADO_INICIAL.tickets;
    expect(semaforo(t1, 48)).toBe("En plazo"); // Alta: 8 h, lleva 4
    expect(semaforo(t1, 50)).toBe("Por vencer"); // lleva 6 = 75 % del plazo
    expect(semaforo(t3, 48)).toBe("En plazo"); // Crítica: 4 h, lleva 2
    expect(semaforo(t3, 49)).toBe("Por vencer");
    expect(semaforo(t3, 52)).toBe("Vencido");
    expect(semaforo(ESTADO_INICIAL.tickets[5], 48)).toBe("No aplica");
  });
  it("avanzar el reloj vence tickets", () => {
    const antes = metricas(ESTADO_INICIAL.tickets, 48);
    const despues = metricas(avanzarReloj(ESTADO_INICIAL, 10).tickets, 58);
    expect(despues.vencidos).toBeGreaterThan(antes.vencidos);
    expect(despues.cumplimiento).toBeLessThan(antes.cumplimiento);
  });
  it("permisos de transición por rol", () => {
    const resuelto = ESTADO_INICIAL.tickets[4];
    expect(destinosPermitidos(resuelto, "solicitante")).toEqual(["Cerrado", "En atención"]);
    expect(destinosPermitidos(resuelto, "agente")).toEqual(["En atención"]);
    expect(destinosPermitidos(ESTADO_INICIAL.tickets[1], "solicitante")).toEqual([]);
    expect(destinosPermitidos(ESTADO_INICIAL.tickets[5], "admin")).toEqual([]);
  });
  it("tomar un ticket nuevo asigna al agente; resolver exige explicación", () => {
    const e1 = ok(cambiarEstado(como("agente"), "t1", "En atención"));
    expect(e1.tickets.find((x) => x.id === "t1")).toMatchObject({ estado: "En atención", agente: "Tomás Lagos" });
    expect(cambiarEstado({ ...e1, rol: "agente" }, "t1", "Resuelto", "listo")).toHaveProperty("error");
    expect(ok(cambiarEstado(e1, "t1", "Resuelto", "Se restableció el acceso y se probó.")).tickets.find((x) => x.id === "t1")?.estado).toBe("Resuelto");
  });
  it("un solicitante no puede tomar un ticket", () => {
    expect(cambiarEstado(como("solicitante"), "t1", "En atención")).toHaveProperty("error");
  });
  it("crear ticket: solo solicitante y con datos válidos", () => {
    const d = { titulo: "Pantalla sin señal", descripcion: "El monitor no enciende desde ayer.", categoria: "Equipos" as const, prioridad: "Media" as const };
    expect(crearTicket(como("agente"), d)).toHaveProperty("error");
    expect(crearTicket(como("solicitante"), { ...d, titulo: "x" })).toHaveProperty("error");
    const e = ok(crearTicket(como("solicitante"), d));
    expect(e.tickets[0]).toMatchObject({ estado: "Nuevo", agente: null, creadoEn: 48 });
  });
  it("reasignar y cambiar prioridad son solo del administrador", () => {
    expect(reasignar(como("agente"), "t2", "Paula Díaz")).toHaveProperty("error");
    expect(ok(reasignar(como("admin"), "t2", "Paula Díaz")).tickets.find((x) => x.id === "t2")?.agente).toBe("Paula Díaz");
    expect(cambiarPrioridad(como("agente"), "t2", "Alta")).toHaveProperty("error");
    expect(ok(cambiarPrioridad(como("admin"), "t2", "Alta")).tickets.find((x) => x.id === "t2")?.prioridad).toBe("Alta");
  });
  it("comentarios: no en cerrados ni vacíos", () => {
    expect(comentar(como("agente"), "t6", "hola")).toHaveProperty("error");
    expect(comentar(como("agente"), "t2", "  ")).toHaveProperty("error");
    expect(ok(comentar(como("agente"), "t2", "En revisión")).tickets.find((x) => x.id === "t2")?.comentarios).toHaveLength(2);
  });
});
