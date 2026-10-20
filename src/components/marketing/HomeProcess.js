import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/marketing/Reveal";
import { HOME_STEPS } from "@/data/home";

/** Línea de tiempo de tres pasos. */
export default function HomeProcess() {
  return (
    <section className="section-pad bg-white">
      <Container>
        <Reveal className="max-w-[680px] mb-12 lg:mb-14">
          <Eyebrow>Cómo trabajamos</Eyebrow>
          <h2 className="text-[2rem] sm:text-[2.5rem] leading-[1.14] font-bold tracking-[-0.02em] text-[var(--color-navy)] mt-4 text-balance">
            De la idea a tu solución en tres pasos.
          </h2>
        </Reveal>
        <Reveal>
          <ol className="relative grid md:grid-cols-3 gap-10 md:gap-8">
            <span
              className="process-line hidden md:block absolute top-[27px] left-[28px] right-[28px] h-px bg-gradient-to-r from-[var(--color-blue)] to-[var(--color-teal)]"
              aria-hidden="true"
            />
            {HOME_STEPS.map((step) => (
              <li key={step.n} className="relative flex md:block gap-5">
                <span className="relative z-10 flex-shrink-0 w-14 h-14 rounded-full bg-[var(--color-navy)] text-white font-bold text-[15px] flex items-center justify-center ring-4 ring-white shadow-lg shadow-blue-900/20">
                  {step.n}
                </span>
                <div className="md:mt-6">
                  <h3 className="text-xl font-bold text-[var(--color-navy)] mb-2">{step.title}</h3>
                  <p className="text-[15.5px] leading-[1.65] text-[var(--color-gray-dark)] max-w-[320px]">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>
      </Container>
    </section>
  );
}
