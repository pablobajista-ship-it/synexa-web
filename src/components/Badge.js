export default function Badge({ label, className }) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-[12px] font-semibold border ${className}`}
    >
      {label}
    </span>
  );
}
