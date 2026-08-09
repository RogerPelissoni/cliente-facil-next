import { ColorModeComponent } from "@/src/shared/components/ColorModeComponent";
import { ThemeProvider } from "@/src/shared/providers/ThemeProvider";
import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "Cliente Fácil — Sistema de Gestão Empresarial",
  description: "Cliente Fácil — Sistema de Gestão Empresarial",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const actualYear = new Date().getFullYear();

  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <header className="flex justify-end p-2 border-b">
            <ColorModeComponent />
          </header>

          <main className="flex-1">{children}</main>

          <footer className="flex items-center p-2 border-t">
            <small>
              Desenvolvido por <b>Roger Pelissoni</b> ©{actualYear}
            </small>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
