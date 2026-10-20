import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { auth } from "@/auth";
import { findInquiryById, listInquiryEvents } from "@/lib/db";
import { INQUIRY_STATUS, INQUIRY_STYLES, serviceLabel } from "@/lib/contactOptions";
import { formatDate } from "@/lib/ticketDisplay";
import Navbar from "@/components/Navbar";
import Badge from "@/components/Badge";
import InquiryControls from "@/components/InquiryControls";

export const metadata = { title: "Consulta comercial" };
export const dynamic = "force-dynamic";

export default async function AdminInquiryPage({ params }) {
  const session = await auth();
  if (!session?.user) redirect("/");
  if (session.user.role !== "ADMIN") redirect("/dashboard");

  const id = Number((await params).id);
  if (!Number.isInteger(id)) notFound();
  const inquiry = await findInquiryById(id);
  if (!inquiry) notFound();
  const events = await listInquiryEvents(id);

  const rows = [
    ["Nombre", inquiry.name],
    ["Correo", <a key="e" className="text-[var(--color-blue)] hover:underline" href={`mailto:${inquiry.email}`}>{inquiry.email}</a>],
    ["Empresa", inquiry.company || "—"],
    ["Teléfono", inquiry.phone || "—"],
    ["Solución", serviceLabel(inquiry.service)],
    ["Origen", inquiry.source || "Formulario directo"],
    ["Recibida", formatDate(inquiry.created_at)],
    ["Consentimiento", formatDate(inquiry.consent_at)],
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar role="ADMIN" userName={session.user.email} />
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        <Link href="/admin/consultas" className="text-sm font-semibold text-[var(--color-blue)] hover:underline">← Consultas comerciales</Link>
        <div className="mt-3 mb-6 flex flex-wrap items-center gap-3">
          <h1 className="text-2xl font-bold text-slate-900">{inquiry.name}</h1>
          <Badge label={INQUIRY_STATUS[inquiry.status] ?? inquiry.status} className={INQUIRY_STYLES[inquiry.status] ?? ""} />
        </div>

        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-6">
          <div className="space-y-6">
            <section className="rounded-xl border border-slate-200 bg-white p-5">
              <dl className="grid sm:grid-cols-2 gap-x-6 gap-y-3 text-sm">
                {rows.map(([k, v]) => (
                  <div key={k}><dt className="text-[12px] uppercase tracking-wide text-slate-400">{k}</dt><dd className="text-slate-800 break-words">{v}</dd></div>
                ))}
              </dl>
            </section>
            <section className="rounded-xl border border-slate-200 bg-white p-5">
              <h2 className="text-sm font-bold text-slate-900 mb-2">Descripción del proyecto</h2>
              <p className="whitespace-pre-wrap text-[15px] leading-relaxed text-slate-700">{inquiry.message}</p>
            </section>
            <section className="rounded-xl border border-slate-200 bg-white p-5">
              <h2 className="text-sm font-bold text-slate-900 mb-3">Historial</h2>
              <ol className="space-y-3 text-sm">
                {events.map((e) => (
                  <li key={e.id} className="border-l-2 border-slate-200 pl-3">
                    <div className="text-slate-800"><strong>{INQUIRY_STATUS[e.status] ?? e.status}</strong>{e.user_name ? ` · ${e.user_name}` : ""}</div>
                    {e.note ? <div className="text-slate-600">{e.note}</div> : null}
                    <div className="text-[12px] text-slate-400">{formatDate(e.created_at)}</div>
                  </li>
                ))}
              </ol>
            </section>
          </div>

          <aside className="h-fit rounded-xl border border-slate-200 bg-white p-5">
            <h2 className="text-sm font-bold text-slate-900 mb-3">Seguimiento</h2>
            <InquiryControls id={inquiry.id} status={inquiry.status} />
          </aside>
        </div>
      </main>
    </div>
  );
}
