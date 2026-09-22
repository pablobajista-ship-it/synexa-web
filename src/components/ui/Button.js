import Link from "next/link";

const VARIANTS = {
  primary:
    "bg-[var(--color-blue)] text-white hover:bg-[var(--color-blue-dark)] shadow-sm shadow-blue-600/20",
  accent:
    "bg-[var(--color-teal)] text-white hover:bg-[var(--color-teal-dark)] shadow-sm shadow-teal-600/20",
  secondary:
    "bg-white text-[var(--color-navy)] border border-[var(--color-border)] hover:border-[var(--color-blue)] hover:text-[var(--color-blue)]",
  ghost: "text-[var(--color-navy)] hover:bg-[var(--color-surface-muted)]",
  "on-dark":
    "bg-white text-[var(--color-navy)] hover:bg-white/90",
  "on-dark-outline":
    "border border-white/30 text-white hover:bg-white/10",
};

const SIZES = {
  sm: "px-4 py-2 text-[13px]",
  md: "px-5 py-2.5 text-sm",
  lg: "px-6 py-3.5 text-[15px]",
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed";

export default function Button({
  as,
  href,
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}) {
  const classes = `${base} ${SIZES[size]} ${VARIANTS[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  const Component = as || "button";
  return (
    <Component className={classes} {...props}>
      {children}
    </Component>
  );
}
