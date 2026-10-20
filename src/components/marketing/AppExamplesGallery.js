"use client";

import { useState } from "react";
import Image from "next/image";
import AppIcon from "@/components/marketing/appIcons";
import { IconArrowRight } from "@/components/marketing/icons";
import { contactHref } from "@/data/contact";
import { APP_EXAMPLES, APP_GROUPS, FIRST_VISIBLE } from "@/data/appExamples";

function MiniFlow({ steps }) {
  return (
    <ol className="flex items-center gap-1.5 text-[11.5px] font-semibold leading-tight text-[var(--color-navy)]" aria-label="Flujo de ejemplo">
      {steps.map((step, i) => (
        <li key={step} className="flex items-center gap-1.5 min-w-0 flex-1">
          <span className="flex-1 rounded-lg bg-[var(--color-blue)]/[0.07] px-2 py-1.5 text-center">{step}</span>
          {i < steps.length - 1 ? <IconArrowRight className="w-3 h-3 flex-shrink-0 text-[var(--color-teal)]" aria-hidden="true" /> : null}
        </li>
      ))}
    </ol>
  );
}

function ExampleCard({ app }) {
  return (
    <article className="card-hover h-full flex flex-col overflow-hidden rounded-2xl border border-[var(--color-border)]/80 bg-white shadow-[0_1px_2px_rgba(11,31,68,0.04)] hover:border-[var(--color-teal)]/35">
      <div className="relative aspect-[16/10] bg-[var(--color-navy)]">
        {app.image ? (
          <Image
            src={app.image}
            alt={app.alt}
            fill
            sizes="(min-width: 1024px) 380px, (min-width: 640px) 46vw, 92vw"
            className={`object-cover ${app.demo ? "object-top" : ""}`}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[var(--color-navy)] via-[#14346f] to-[var(--color-blue)]">
            <AppIcon name={app.icon} className="w-14 h-14 text-white/90" />
          </div>
        )}
        <span className="absolute left-3 top-3 rounded-full bg-[var(--color-navy)]/85 backdrop-blur px-3 py-1 text-[12px] font-semibold text-white">
          {app.sector}
        </span>
        {app.demo ? (
          <span className="absolute right-3 bottom-3 rounded-full bg-white/90 px-2.5 py-0.5 text-[11px] font-semibold text-[var(--color-navy)]">
            Captura de demo
          </span>
        ) : null}
      </div>
      <div className="flex flex-col flex-1 p-5">
        <h3 className="text-[1.1rem] leading-snug font-bold text-[var(--color-navy)] mb-2">{app.title}</h3>
        <p className="text-[14.5px] leading-[1.6] text-[var(--color-gray-dark)] mb-2.5">{app.text}</p>
        <p className="text-[13.5px] leading-[1.55] text-[var(--color-gray-dark)]/85 mb-4">
          <span className="font-semibold text-[var(--color-teal-dark)]">Ejemplo: </span>
          {app.example}
        </p>
        <MiniFlow steps={app.flow} />
        <ul className="flex flex-wrap gap-1.5 mt-4 mb-4">
          {app.functions.map((f) => (
            <li
              key={f.label}
              className={`rounded-full px-2.5 py-1 text-[12px] font-semibold ${
                f.optional
                  ? "border border-dashed border-[var(--color-blue)]/40 text-[var(--color-blue)]"
                  : "bg-[var(--color-teal)]/12 text-[var(--color-teal-dark)]"
              }`}
            >
              {f.label}
              {f.optional ? " · opcional" : ""}
            </li>
          ))}
        </ul>
        <a
          href={contactHref({ service: app.service, source: `aplicaciones-${app.id}` })}
          className="mt-auto inline-flex items-center gap-2 text-[14.5px] font-semibold text-[var(--color-blue)] hover:text-[var(--color-blue-dark)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-teal)] rounded"
        >
          Consultar una solución parecida
          <IconArrowRight className="w-4 h-4" />
        </a>
      </div>
    </article>
  );
}

export default function AppExamplesGallery() {
  const [group, setGroup] = useState("todos");
  const [expanded, setExpanded] = useState(false);

  const filtered = APP_EXAMPLES.filter((a) => group === "todos" || a.group === group);
  const limited = group === "todos" && !expanded;
  const visible = limited ? filtered.slice(0, FIRST_VISIBLE) : filtered;

  return (
    <div>
      <div role="group" aria-label="Filtrar ejemplos por tipo" className="flex flex-wrap gap-2 mb-7">
        {APP_GROUPS.map((g) => (
          <button
            key={g.id}
            type="button"
            aria-pressed={group === g.id}
            onClick={() => setGroup(g.id)}
            className={`rounded-full px-4 py-2 text-[14px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-teal)] focus-visible:ring-offset-2 ${
              group === g.id
                ? "bg-[var(--color-navy)] text-white"
                : "bg-white border border-[var(--color-border)] text-[var(--color-gray-dark)] hover:border-[var(--color-blue)] hover:text-[var(--color-blue)]"
            }`}
          >
            {g.label}
          </button>
        ))}
      </div>

      <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6" aria-live="polite">
        {visible.map((app) => (
          <li key={app.id}>
            <ExampleCard app={app} />
          </li>
        ))}
      </ul>

      {group === "todos" && filtered.length > FIRST_VISIBLE ? (
        <div className="mt-8 text-center">
          <button
            type="button"
            aria-expanded={expanded}
            onClick={() => setExpanded((v) => !v)}
            className="inline-flex items-center gap-2 rounded-xl border border-[var(--color-border)] bg-white px-6 py-3 text-[15px] font-semibold text-[var(--color-navy)] hover:border-[var(--color-blue)] hover:text-[var(--color-blue)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-teal)] focus-visible:ring-offset-2"
          >
            {expanded ? "Ver menos" : "Ver más aplicaciones"}
          </button>
        </div>
      ) : null}
    </div>
  );
}
