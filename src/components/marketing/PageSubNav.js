"use client";

import { useEffect, useState } from "react";

/**
 * Navegación interna para páginas largas (§37). Se fija bajo el header y
 * resalta la sección visible, de modo que el visitante pueda saltar entre
 * desarrollo, infraestructura y soporte sin recorrer toda la página.
 *
 * En móvil se desplaza horizontalmente: no se apila ni se convierte en menú.
 */
export default function PageSubNav({ items }) {
  const [activeId, setActiveId] = useState(items[0]?.id);

  /* Con dos barras fijas (header + esta nav), los anclas tienen que frenar
     más arriba. Se aplica aquí y se revierte al desmontar, para no afectar
     a las páginas que no usan esta navegación. */
  useEffect(() => {
    const root = document.documentElement;
    const previous = root.style.scrollPaddingTop;
    root.style.scrollPaddingTop = "132px";
    return () => {
      root.style.scrollPaddingTop = previous;
    };
  }, []);

  useEffect(() => {
    const sections = items
      .map((item) => document.getElementById(item.id))
      .filter(Boolean);

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-25% 0px -65% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav
      aria-label="Secciones de esta página"
      className="sticky top-[72px] lg:top-20 z-20 bg-white/90 backdrop-blur-md border-b border-[var(--color-border)]"
    >
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
        <ul className="flex items-center gap-1 overflow-x-auto py-2.5 -mx-1 px-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {items.map((item) => {
            const active = activeId === item.id;
            return (
              <li key={item.id} className="flex-shrink-0">
                <a
                  href={`#${item.id}`}
                  aria-current={active ? "true" : undefined}
                  className={`block px-3.5 py-1.5 rounded-lg text-[13.5px] font-semibold whitespace-nowrap transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-teal)] ${
                    active
                      ? "bg-[var(--color-navy)] text-white"
                      : "text-[var(--color-gray-dark)] hover:text-[var(--color-navy)] hover:bg-[var(--color-surface-muted)]"
                  }`}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
