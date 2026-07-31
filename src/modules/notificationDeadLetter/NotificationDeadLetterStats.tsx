"use client";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, CheckCircle2, Clock } from "lucide-react";
import { NotificationDeadLetterStatsType } from "./notificationDeadLetter.types";

interface Props {
  stats?: NotificationDeadLetterStatsType;
}

// Cards de resumo do painel. Cada novo "insight" (ver NotificationDeadLetterStatsResponse no
// backend) só precisa de mais um item nesse array — o grid abaixo já acomoda o crescimento.
export function NotificationDeadLetterStats({ stats }: Props) {
  const items = [
    {
      label: "Pendentes",
      value: stats?.totalPending ?? 0,
      icon: AlertTriangle,
      className: "text-red-600 dark:text-red-400",
    },
    {
      label: "Resolvidos",
      value: stats?.totalResolved ?? 0,
      icon: CheckCircle2,
      className: "text-emerald-600 dark:text-emerald-400",
    },
    {
      label: "Últimas 24h",
      value: stats?.totalLast24h ?? 0,
      icon: Clock,
      className: "text-blue-600 dark:text-blue-400",
    },
  ];

  return (
    <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <Card key={item.label}>
          <CardHeader className="flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium text-muted-foreground">{item.label}</CardTitle>
            <item.icon className={`h-4 w-4 ${item.className}`} />
          </CardHeader>

          <div className={`px-(--card-spacing) text-2xl font-bold ${item.className}`}>{item.value}</div>
        </Card>
      ))}
    </div>
  );
}
