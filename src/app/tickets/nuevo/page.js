import { redirect } from "next/navigation";
import { auth } from "@/auth";
import Navbar from "@/components/Navbar";
import NewTicketForm from "@/components/NewTicketForm";

export const metadata = { title: "Crear ticket" };

export default async function NewTicketPage() {
  const session = await auth();
  if (!session?.user) redirect("/");

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar role={session.user.role} userName={session.user.email} />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        <NewTicketForm />
      </main>
    </div>
  );
}
