import Link from "next/link";

const VARIANTS = {
  primary:
    "bg-[var(--color-blue)] text-white hover:bg-[var(--color-blue-dark)] shadow-md shadow-blue-600/25 hover:shadow-lg hover:shadow-blue-600/30 hover:-translate-y-0.5",
  accent:
    "bg-[var(--color-teal)] text-white hover:bg-[var(--color-teal-dark)] shadow-md shadow-teal-600/25 hover:shadow-lg hover:shadow-teal-500/35 hover:-translate-y-0.5",
  secondary:
    "bg-white text-[var(--color-navy)] border border-[var(--color-border)] hover:border-[var(--color-blue)] hover:text-[var(--color-blue)]",
  ghost: "text-[var(--color-navy)] hover:bg-[var(--color-surface-muted)]",
  "on-dark": "bg-white text-[var(--color-navy)] hover:bg-white/90 hover:-translate-y-0.5",
  "on-dark-outline":
    "border border-white/30 text-white hover:bg-white/10 hover:border-white/50 hover:-translate-y-0.5",
};

const SIZES = {
  sm: "px-4 py-2 text-sm",
  md: "px-5 py-3 text-[15px]",
  lg: "px-7 py-3.5 text-base",
  xl: "px-8 py-4 text-[17px]",
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-[background-color,border-color,color,box-shadow,transform] duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-teal)] focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed motion-reduce:transition-none motion-reduce:hover:translate-y-0";

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
