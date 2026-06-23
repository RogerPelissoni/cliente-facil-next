import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import { QueryProvider } from "@/providers/QueryProvider";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html lang="pt-BR" className={cn("font-sans", geist.variable)}>
      <body>
        <QueryProvider>{children}</QueryProvider>

        <Toaster position="top-right" richColors closeButton />
      </body>
    </html>
  );
}
