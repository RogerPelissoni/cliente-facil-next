import { cn } from "@/src/shared/utils/util";
import { Building2 } from "lucide-react";

interface Props {
  className?: string;
  iconClassName?: string;
  textClassName?: string;
  // Variante usada sobre o painel de marca (fundo já é a cor primária) — ícone em contraste
  // invertido em vez do badge preenchido usado no resto do app (header, etc).
  inverted?: boolean;
}

export function Logo({ className, iconClassName, textClassName, inverted = false }: Props) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <span
        className={cn(
          "flex items-center justify-center rounded-lg",
          inverted ? "bg-primary-foreground/15 text-primary-foreground" : "bg-primary text-primary-foreground",
          iconClassName ?? "h-8 w-8",
        )}
      >
        <Building2 className="h-[1.1rem] w-[1.1rem]" />
      </span>

      <span className={cn("font-semibold tracking-tight", textClassName ?? "text-lg")}>Cliente Fácil</span>
    </div>
  );
}
