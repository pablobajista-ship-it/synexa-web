/**
 * Señal de prueba del reproductor: un arpegio ambiental generado con Web Audio.
 * No usa archivos ni música de terceros, así que no hay derechos que licenciar.
 * Solo funciona cuando el visitante pulsa «reproducir» (política de autoplay).
 */
export interface Senal {
  iniciar: () => void;
  detener: () => void;
  volumen: (v: number) => void;
}

const ESCALA = [220, 261.63, 293.66, 329.63, 392, 440, 523.25]; // La menor pentatónica aproximada

export function crearSenal(): Senal | null {
  const Ctx = typeof window !== "undefined" ? (window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext) : undefined;
  if (!Ctx) return null;

  let ctx: AudioContext | null = null;
  let maestro: GainNode | null = null;
  let timer: number | null = null;
  let paso = 0;
  let vol = 0.5;

  const nota = (frecuencia: number, duracion: number, ganancia: number, tipo: OscillatorType) => {
    if (!ctx || !maestro) return;
    const t = ctx.currentTime;
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = tipo;
    osc.frequency.value = frecuencia;
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(ganancia, t + 0.03);
    g.gain.exponentialRampToValueAtTime(0.0001, t + duracion);
    osc.connect(g).connect(maestro);
    osc.start(t);
    osc.stop(t + duracion + 0.05);
  };

  return {
    iniciar() {
      if (ctx) return;
      ctx = new Ctx();
      maestro = ctx.createGain();
      maestro.gain.value = vol * 0.4;
      maestro.connect(ctx.destination);
      timer = window.setInterval(() => {
        const i = paso++;
        nota(ESCALA[(i * 3 + (i >> 2)) % ESCALA.length], 0.9, 0.5, "triangle");
        if (i % 8 === 0) nota(ESCALA[0] / 2, 3.2, 0.45, "sine");
      }, 420);
    },
    detener() {
      if (timer !== null) window.clearInterval(timer);
      timer = null;
      void ctx?.close();
      ctx = null;
      maestro = null;
    },
    volumen(v) {
      vol = v;
      if (maestro && ctx) maestro.gain.setTargetAtTime(v * 0.4, ctx.currentTime, 0.05);
    },
  };
}
