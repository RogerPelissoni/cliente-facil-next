"use client";

import { EventStatusEnum } from "@/src/enum/eventStatus.enum";
import { EventTypeEnum } from "@/src/enum/eventType.enum";
import { DataTable } from "@/src/shared/components/DataTable";
import { EmptyState } from "@/src/shared/components/EmptyState";
import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { EventReportItemType } from "./eventReport.types";

const CURRENCY_FORMATTER = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

function formatDateTime(value: Date) {
  return new Date(value).toLocaleString("pt-BR");
}

interface Props {
  data: EventReportItemType[];
  showOwner: boolean;
}

export function EventReportTable({ data, showOwner }: Props) {
  const columns: ColumnDef<EventReportItemType>[] = [
    {
      accessorKey: "dsTitle",
      header: "Título",
    },
    {
      accessorKey: "dtStart",
      header: "Início",
      cell: ({ row }) => formatDateTime(row.original.dtStart),
    },
    {
      accessorKey: "dtEnd",
      header: "Término",
      cell: ({ row }) => formatDateTime(row.original.dtEnd),
    },
    {
      accessorKey: "tpStatus",
      header: "Status",
      cell: ({ row }) => EventStatusEnum[row.original.tpStatus],
    },
    {
      accessorKey: "tpEvent",
      header: "Tipo",
      cell: ({ row }) => EventTypeEnum[row.original.tpEvent],
    },
    {
      accessorKey: "clientName",
      header: "Cliente",
      cell: ({ row }) => row.original.clientName ?? "-",
    },
    {
      accessorKey: "professionalName",
      header: "Profissional",
      cell: ({ row }) => row.original.professionalName ?? "-",
    },
    {
      accessorKey: "vlTotal",
      header: "Valor",
      cell: ({ row }) =>
        row.original.vlTotal != null
          ? CURRENCY_FORMATTER.format(row.original.vlTotal)
          : "-",
    },
    ...(showOwner
      ? [
          {
            accessorKey: "ownerName",
            header: "Usuário",
            cell: ({ row }) => row.original.ownerName ?? "-",
          } satisfies ColumnDef<EventReportItemType>,
        ]
      : []),
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (!data.length) {
    return <EmptyState message="Nenhum evento encontrado" />;
  }

  return <DataTable table={table} />;
}
