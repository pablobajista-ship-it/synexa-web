export default function Eyebrow({ children, className = "" }) {
  return (
    <span
      className={`inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.14em] text-[var(--color-blue)] ${className}`}
    >
      <span className="w-6 h-px bg-[var(--color-teal)]" />
      {children}
    </span>
  );
}
