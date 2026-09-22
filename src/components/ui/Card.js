export default function Card({ className = "", children, ...props }) {
  return (
    <div
      className={`bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl shadow-[0_1px_2px_rgba(11,31,68,0.04)] ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
