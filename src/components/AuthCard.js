import Link from "next/link";
import Logo from "@/components/Logo";

export default function AuthCard({ title, subtitle, children, footer, wide = false }) {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[var(--color-surface-muted)] px-6 py-12">
      <div className={wide ? "w-full max-w-md" : "w-full max-w-sm"}>
        <div className="flex justify-center mb-8">
          <Link href="/">
            <Logo size={38} />
          </Link>
        </div>

        <div className="bg-white border border-[var(--color-border)] rounded-2xl shadow-[0_1px_3px_rgba(11,31,68,0.06)] p-8">
          {title ? (
            <h1 className="text-[22px] font-bold text-[var(--color-navy)] mb-1.5">{title}</h1>
          ) : null}
          {subtitle ? (
            <p className="text-sm text-[var(--color-gray-dark)] mb-6">{subtitle}</p>
          ) : null}
          {children}
        </div>

        {footer ? (
          <p className="text-center mt-5 text-sm text-[var(--color-gray-dark)]">{footer}</p>
        ) : null}
      </div>
    </div>
  );
}
