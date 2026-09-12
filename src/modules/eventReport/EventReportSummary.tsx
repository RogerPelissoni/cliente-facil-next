"use client";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { EventStatusEnum } from "@/src/enum/eventStatus.enum";
import { EventTypeEnum } from "@/src/enum/eventType.enum";
import { CalendarClock, ListChecks, Wallet } from "lucide-react";
import { EventReportSummaryType } from "./eventReport.types";

const CURRENCY_FORMATTER = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

interface Props {
  summary?: EventReportSummaryType;
}

export function EventReportSummary({ summary }: Props) {
  const items = [
    {
      label: "Total de eventos",
      value: summary?.totalEvents ?? 0,
      icon: ListChecks,
      className: "text-blue-600 dark:text-blue-400",
    },
    {
      label: "Valor total (serviços)",
      value: CURRENCY_FORMATTER.format(summary?.totalValue ?? 0),
      icon: Wallet,
      className: "text-emerald-600 dark:text-emerald-400",
    },
  ];

  return (
    <div className="mb-6 space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        {items.map((item) => (
          <Card key={item.label}>
            <CardHeader className="flex-row items-center justify-between space-y-0">
              <CardTitle className="text-muted-foreground text-sm font-medium">
                {item.label}
              </CardTitle>
              <item.icon className={`h-4 w-4 ${item.className}`} />
            </CardHeader>

            <div
              className={`px-(--card-spacing) text-2xl font-bold ${item.className}`}
            >
              {item.value}
            </div>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader className="flex-row items-center gap-2 space-y-0">
            <ListChecks className="text-muted-foreground h-4 w-4" />
            <CardTitle className="text-sm font-medium">Por status</CardTitle>
          </CardHeader>

          <div className="space-y-1 px-(--card-spacing) text-sm">
            {Object.entries(EventStatusEnum).map(([code, label]) => (
              <div key={code} className="flex justify-between">
                <span className="text-muted-foreground">{label}</span>
                <span className="font-medium">
                  {summary?.countByStatus[
                    code as keyof typeof EventStatusEnum
                  ] ?? 0}
                </span>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <CardHeader className="flex-row items-center gap-2 space-y-0">
            <CalendarClock className="text-muted-foreground h-4 w-4" />
            <CardTitle className="text-sm font-medium">Por tipo</CardTitle>
          </CardHeader>

          <div className="space-y-1 px-(--card-spacing) text-sm">
            {Object.entries(EventTypeEnum).map(([code, label]) => (
              <div key={code} className="flex justify-between">
                <span className="text-muted-foreground">{label}</span>
                <span className="font-medium">
                  {summary?.countByType[code as keyof typeof EventTypeEnum] ??
                    0}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
