import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "SYNEXA — Soluciones Web para Empresas",
    template: "%s · SYNEXA",
  },
  description: "Tecnología que conecta tu negocio: sitios web, bases de datos, e-commerce, portales y soluciones digitales a medida para empresas.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
