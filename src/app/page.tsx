import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="container mx-auto flex min-h-screen flex-col items-center justify-center gap-4 p-8">
      <h1 className="text-4xl font-bold">Next Template</h1>

      <p className="text-muted-foreground">
        Arquitetura base para CRUDs com Next.js, React Query, RHF e Zod
      </p>

      <Button asChild>
        <Link href="/users">Acessar Usuários</Link>
      </Button>
    </main>
  );
}
