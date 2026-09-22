"use client";

import { useState } from "react";
import Link from "next/link";
import Logo from "@/components/Logo";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";

const NAV_LINKS = [
  { href: "#soluciones", label: "Soluciones" },
  { href: "#nosotros", label: "Nosotros" },
  { href: "#servicios", label: "Servicios" },
  { href: "#contacto", label: "Contacto" },
];

export default function SiteHeader({ isAuthenticated, dashboardHref }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur border-b border-[var(--color-border)]">
      <Container className="flex items-center justify-between h-16">
        <Link href="/" className="flex items-center">
          <Logo size={34} />
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-3.5 py-2 rounded-lg text-sm font-semibold text-[var(--color-gray-dark)] hover:text-[var(--color-navy)] hover:bg-[var(--color-surface-muted)] transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          {isAuthenticated ? (
            <Button href={dashboardHref} variant="secondary" size="sm">
              Ir a mi panel
            </Button>
          ) : (
            <Button href="/login" variant="secondary" size="sm">
              Ingresar
            </Button>
          )}
          <Button href="#contacto" variant="primary" size="sm">
            Hablemos
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg border border-[var(--color-border)]"
          aria-label="Abrir menú"
          aria-expanded={open}
        >
          <span className="sr-only">Menú</span>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M3 5h14M3 10h14M3 15h14" stroke="var(--color-navy)" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </button>
      </Container>

      {open ? (
        <div className="md:hidden border-t border-[var(--color-border)] bg-white">
          <Container className="py-4 flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="px-3 py-2.5 rounded-lg text-sm font-semibold text-[var(--color-gray-dark)] hover:bg-[var(--color-surface-muted)]"
              >
                {link.label}
              </a>
            ))}
            <div className="flex flex-col gap-2 mt-2 pt-3 border-t border-[var(--color-border)]">
              {isAuthenticated ? (
                <Button href={dashboardHref} variant="secondary">
                  Ir a mi panel
                </Button>
              ) : (
                <Button href="/login" variant="secondary">
                  Ingresar
                </Button>
              )}
              <Button href="#contacto" variant="primary">
                Hablemos
              </Button>
            </div>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
