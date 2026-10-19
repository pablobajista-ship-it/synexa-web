import { describe, expect, it } from "vitest";
import { aISO, barberoPorId, bloqueOcupado, estaAbierto, horasDisponibles, ocupadoSimulado, proximosDias, type Reserva } from "./agenda";

// Lunes 2026-10-19 09:00
const LUNES = new Date(2026, 9, 19, 9, 0);

describe("agenda de Barba Norte", () => {
  it("marca cerrados domingo y lunes", () => {
    expect(estaAbierto("2026-10-18")).toBe(false); // domingo
    expect(estaAbierto("2026-10-19")).toBe(false); // lunes
    expect(estaAbierto("2026-10-20")).toBe(true); // martes
  });

  it("genera 14 días desde hoy", () => {
    const d = proximosDias(LUNES);
    expect(d).toHaveLength(14);
    expect(d[0].iso).toBe("2026-10-19");
    expect(d[0].abierto).toBe(false);
  });

  it("la ocupación simulada es determinista", () => {
    expect(ocupadoSimulado("diego", "2026-10-21", 600)).toBe(ocupadoSimulado("diego", "2026-10-21", 600));
  });

  it("no ofrece horas en días cerrados ni pasados", () => {
    expect(horasDisponibles([], "diego", "2026-10-19", 30, LUNES)).toEqual([]);
    expect(horasDisponibles([], "diego", "2026-10-10", 30, LUNES)).toEqual([]);
  });

  it("ofrece horas dentro del horario y deja espacio para la duración", () => {
    const h = horasDisponibles([], "diego", "2026-10-21", 60, LUNES);
    expect(h.length).toBeGreaterThan(0);
    expect(h.every((x) => x >= "10:00" && x <= "19:00")).toBe(true);
    expect(h).not.toContain("19:30");
  });

  it("una reserva bloquea su hora y las horas que la tocan", () => {
    const base = horasDisponibles([], "tomas", "2026-10-22", 30, LUNES);
    const hora = base[0];
    const r: Reserva = { id: "1", codigo: "BN-0001", servicio: "combo", barbero: "tomas", fecha: "2026-10-22", hora, nombre: "Ana", telefono: "12345678" };
    const despues = horasDisponibles([r], "tomas", "2026-10-22", 30, LUNES);
    expect(despues).not.toContain(hora);
    expect(bloqueOcupado([r], "tomas", "2026-10-22", Number(hora.slice(0, 2)) * 60 + Number(hora.slice(3)) + 30)).toBe(true);
    // otro barbero no se ve afectado por la reserva
    const mismoDiaOtro = horasDisponibles([r], "diego", "2026-10-22", 30, LUNES);
    expect(mismoDiaOtro).toEqual(horasDisponibles([], "diego", "2026-10-22", 30, LUNES));
  });

  it("hoy no ofrece horas que ya pasaron", () => {
    const martes = new Date(2026, 9, 20, 15, 10);
    const h = horasDisponibles([], "andrea", aISO(martes), 30, martes);
    expect(h.every((x) => x > "15:10")).toBe(true);
  });

  it("conoce a los tres barberos", () => {
    expect(barberoPorId("andrea")?.nombre).toBe("Andrea Molina");
  });
});
