import type { Metadata } from "next";
import { Orbitron } from "next/font/google";
import "../styles/globals.css";

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-principal",
});

export const metadata: Metadata = {
  title: "CassinoTrack",
  description: "Dados de jogos em tempo real",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${orbitron.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}