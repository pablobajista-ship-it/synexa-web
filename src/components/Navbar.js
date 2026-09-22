"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { LogoMark } from "@/components/Logo";

const CLIENT_LINKS = [
  { href: "/dashboard", label: "Inicio" },
  { href: "/dashboard", label: "Mis tickets" },
  { href: "/tickets/nuevo", label: "Crear ticket" },
  { href: "/cuenta", label: "Mi cuenta" },
];

const ADMIN_LINKS = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/tickets", label: "Tickets" },
  { href: "/admin/clientes", label: "Clientes" },
  { href: "/admin/estadisticas", label: "Estadísticas" },
  { href: "/admin/configuracion", label: "Configuración" },
];

export default function Navbar({ role, userName }) {
  const pathname = usePathname();
  const links = role === "ADMIN" ? ADMIN_LINKS : CLIENT_LINKS;

  return (
    <header className="bg-[var(--color-navy)] border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center gap-4 justify-between">
        <Link href={role === "ADMIN" ? "/admin" : "/dashboard"} className="flex items-center gap-2.5">
          <LogoMark size={32} />
          <div className="leading-tight">
            <div className="text-white text-sm font-bold">Soluciones Web</div>
            <div className="text-white/50 text-[10px] uppercase tracking-wide font-semibold">
              Centro de Atención y Soporte
            </div>
          </div>
        </Link>

        <nav className="flex flex-wrap items-center gap-1 text-sm">
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                pathname === link.href
                  ? "bg-[var(--color-blue)] text-white"
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <button
            type="button"
            onClick={() => signOut({ callbackUrl: "/" })}
            className="px-3 py-1.5 rounded-md font-medium text-white/70 hover:bg-white/10 hover:text-white"
          >
            Cerrar sesión
          </button>
        </nav>

        {userName ? (
          <span className="hidden sm:block text-xs text-white/50">{userName}</span>
        ) : null}
      </div>
    </header>
  );
}
