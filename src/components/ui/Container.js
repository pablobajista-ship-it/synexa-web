export default function Container({ className = "", children, size = "lg" }) {
  const maxWidth = size === "lg" ? "max-w-6xl" : size === "md" ? "max-w-4xl" : "max-w-2xl";
  return <div className={`${maxWidth} mx-auto px-4 sm:px-6 ${className}`}>{children}</div>;
}
