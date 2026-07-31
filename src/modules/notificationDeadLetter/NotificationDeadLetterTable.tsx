"use client";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/src/shared/components/DataTable";
import { EmptyState } from "@/src/shared/components/EmptyState";
import SortableHeader from "@/src/shared/components/SortableHeader";
import { TableActions } from "@/src/shared/components/table/TableActions";
import { Sorting } from "@/src/shared/types/table.type";
import { nextSorting } from "@/src/shared/utils/table.util";
import { ColumnDef, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { Check } from "lucide-react";
import { NotificationDeadLetterType } from "./notificationDeadLetter.types";

interface Props {
  data: NotificationDeadLetterType[];
  sorting: Sorting;
  onSortingChange(sorting: Sorting): void;
  canResolve: boolean;
  onResolve(deadLetter: NotificationDeadLetterType): void;
}

function formatDate(value: string | null) {
  return value ? new Date(value).toLocaleString("pt-BR") : "-";
}

export function NotificationDeadLetterTable({ data, sorting, onSortingChange, canResolve, onResolve }: Props) {
  function handleSort(field: string) {
    onSortingChange(nextSorting(sorting, field));
  }

  const columns: ColumnDef<NotificationDeadLetterType>[] = [
    {
      accessorKey: "id",
      header: () => <SortableHeader label="#" field="id" sorting={sorting} onSort={handleSort} />,
    },
    {
      accessorKey: "dsErrorReason",
      header: "Motivo",
      cell: ({ row }) => row.original.dsErrorReason ?? "-",
    },
    {
      accessorKey: "nrDeathCount",
      header: () => <SortableHeader label="Tentativas" field="nrDeathCount" sorting={sorting} onSort={handleSort} />,
      cell: ({ row }) => row.original.nrDeathCount ?? "-",
    },
    {
      accessorKey: "dsPayload",
      header: "Payload",
      cell: ({ row }) => (
        <span className="block max-w-xs truncate font-mono text-xs" title={row.original.dsPayload}>
          {row.original.dsPayload}
        </span>
      ),
    },
    {
      accessorKey: "dtFailedAt",
      header: () => <SortableHeader label="Falhou em" field="dtFailedAt" sorting={sorting} onSort={handleSort} />,
      cell: ({ row }) => formatDate(row.original.dtFailedAt),
    },
    {
      id: "status",
      header: "Status",
      cell: ({ row }) => {
        const resolved = row.original.dtResolved != null;

        return (
          <span
            className={`rounded-full px-2 py-0.5 text-xs font-medium ${
              resolved
                ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
                : "bg-red-500/10 text-red-700 dark:text-red-300"
            }`}
          >
            {resolved ? "Resolvido" : "Pendente"}
          </span>
        );
      },
    },
    {
      id: "actions",
      header: "Ações",
      cell: ({ row }) => {
        const deadLetter = row.original;

        if (deadLetter.dtResolved || !canResolve) {
          return null;
        }

        return (
          <TableActions>
            <Button size="sm" variant="outline" onClick={() => onResolve(deadLetter)}>
              <Check className="h-3.5 w-3.5" />
              Resolver
            </Button>
          </TableActions>
        );
      },
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (!data.length) {
    return <EmptyState message="Nenhum registro de falha encontrado" />;
  }

  return <DataTable table={table} />;
}
