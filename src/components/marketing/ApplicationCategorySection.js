import Reveal from "@/components/marketing/Reveal";
import AppIcon from "@/components/marketing/appIcons";
import BusinessApplicationCard from "@/components/marketing/BusinessApplicationCard";

/**
 * Una de las tres familias de aplicaciones (§9): encabezado de categoría +
 * sus ejemplos. Cada familia tiene su propio ancla para poder enlazarla.
 */
export default function ApplicationCategorySection({ category, applications, index = 0 }) {
  if (!applications?.length) return null;

  return (
    <div id={`familia-${category.id}`} className="scroll-mt-28">
      <Reveal delay={index * 60} className="flex items-start gap-5 mb-8">
        <span className="flex-shrink-0 w-14 h-14 rounded-2xl bg-[var(--color-navy)] text-[var(--color-teal)] flex items-center justify-center">
          <AppIcon name={category.icon} className="w-6 h-6" />
        </span>
        <div>
          <h3 className="text-[24px] sm:text-[28px] font-bold text-[var(--color-navy)] leading-tight tracking-[-0.01em]">
            {category.name}
          </h3>
          <p className="text-[15.5px] text-[var(--color-gray-dark)] leading-[1.6] mt-1.5 max-w-[620px]">
            {category.tagline}
          </p>
        </div>
      </Reveal>

      <div className="grid lg:grid-cols-2 gap-5 lg:gap-6">
        {applications.map((application, i) => (
          <Reveal key={application.id} delay={i * 60} className="h-full">
            <BusinessApplicationCard application={application} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
