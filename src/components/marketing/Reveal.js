"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Envuelve una sección o bloque para que aparezca con un fade/slide muy
 * sutil al entrar en el viewport. Respeta prefers-reduced-motion vía CSS
 * (.reveal en globals.css), no vía JS, para que degrade con seguridad.
 */
export default function Reveal({ children, className = "", delay = 0, as = "div", ...rest }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const Tag = as;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? "reveal-visible" : ""} ${className}`}
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
