import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Clapperboard } from "lucide-react";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mon Rétroprojecteur",
  description: "Vos séances de cinéma classique à Paris.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="dark scroll-smooth" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-slate-950 text-slate-50 selection:bg-orange-500/30 selection:text-orange-200 relative`}>
        <div className="fixed inset-0 z-[-1] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))]"></div>
        
        <header className="sticky top-0 z-50 glass border-b border-white/5 px-6 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-tr from-orange-600 to-amber-500 rounded-xl shadow-lg shadow-orange-500/20">
                <Clapperboard className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                Mon Rétroprojecteur
              </h1>
            </div>
            <div className="text-sm text-slate-400 font-medium hidden sm:block">
              Calendrier par Cinéma
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-6 py-12">
          {children}
        </main>
      </body>
    </html>
  );
}
