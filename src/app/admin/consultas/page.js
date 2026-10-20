import { redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "@/auth";
import { listInquiries, inquiryStatusCounts } from "@/lib/db";
import { INQUIRY_STATUS, INQUIRY_STYLES, serviceLabel } from "@/lib/contactOptions";
import { formatDate } from "@/lib/ticketDisplay";
import Navbar from "@/components/Navbar";
import Badge from "@/components/Badge";
import PurgeInquiries from "@/components/PurgeInquiries";

export const metadata = { title: "Consultas comerciales" };
export const dynamic = "force-dynamic";

export default async function AdminInquiriesPage({ searchParams }) {
  const session = await auth();
  if (!session?.user) redirect("/");
  if (session.user.role !== "ADMIN") redirect("/dashboard");

  const params = await searchParams;
  const raw = Array.isArray(params?.estado) ? params.estado[0] : params?.estado;
  const status = Object.hasOwn(INQUIRY_STATUS, raw) ? raw : undefined;

  const [inquiries, counts] = await Promise.all([listInquiries({ status }), inquiryStatusCounts()]);
  const total = Object.values(counts).reduce((a, b) => a + b, 0);

  const tabs = [{ id: undefined, label: "Todas", n: total }, ...Object.entries(INQUIRY_STATUS).map(([id, label]) => ({ id, label, n: counts[id] ?? 0 }))];

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar role="ADMIN" userName={session.user.email} />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <h1 className="text-2xl font-bold text-slate-900 mb-1">Consultas comerciales</h1>
        <p className="text-slate-500 text-sm mb-6">
          Interesados que escribieron desde el formulario de Contacto. No son tickets de soporte.
        </p>

        <div className="flex flex-wrap gap-2 mb-6">
          {tabs.map((t) => (
            <Link
              key={t.label}
              href={t.id ? `/admin/consultas?estado=${t.id}` : "/admin/consultas"}
              className={`px-3.5 py-1.5 rounded-full text-sm font-semibold border ${
                status === t.id ? "bg-[var(--color-navy)] text-white border-[var(--color-navy)]" : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
              }`}
            >
              {t.label} <span className="opacity-70">({t.n})</span>
            </Link>
          ))}
        </div>

        {inquiries.length === 0 ? (
          <p className="rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-500">
            No hay consultas {status ? `en estado «${INQUIRY_STATUS[status]}»` : "todavía"}.
          </p>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-left text-[12px] uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-4 py-3">Recibida</th>
                  <th className="px-4 py-3">Contacto</th>
                  <th className="px-4 py-3">Solución</th>
                  <th className="px-4 py-3">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {inquiries.map((q) => (
                  <tr key={q.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3 whitespace-nowrap text-slate-500">{formatDate(q.created_at)}</td>
                    <td className="px-4 py-3">
                      <Link href={`/admin/consultas/${q.id}`} className="font-semibold text-[var(--color-blue)] hover:underline">{q.name}</Link>
                      <div className="text-slate-500">{q.company ? `${q.company} · ` : ""}{q.email}</div>
                    </td>
                    <td className="px-4 py-3 text-slate-700">{serviceLabel(q.service)}</td>
                    <td className="px-4 py-3"><Badge label={INQUIRY_STATUS[q.status] ?? q.status} className={INQUIRY_STYLES[q.status] ?? ""} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <PurgeInquiries />
      </main>
    </div>
  );
}
