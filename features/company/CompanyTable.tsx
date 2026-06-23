"use client";

import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { ArrowDown, ArrowUp } from "lucide-react";

import { Button } from "@/components/ui/button";

import { DataTable } from "@/shared/table/DataTable";

import { ConfirmDialog } from "@/shared/feedback/ConfirmDialog";
import { EmptyState } from "@/shared/feedback/EmptyState";

import { Sorting } from "@/shared/types/table.types";
import { Company } from "./company.types";

interface Props {
  data: Company[];

  sorting: Sorting;

  onSortingChange(sorting: Sorting): void;

  onEdit(company: Company): void;

  onDelete(company: Company): void;
}

export function CompanyTable({
  data,
  sorting,
  onSortingChange,
  onEdit,
  onDelete,
}: Props) {
  function handleSort(field: string) {
    if (sorting.field === field) {
      onSortingChange({
        field,

        direction: sorting.direction === "asc" ? "desc" : "asc",
      });

      return;
    }

    onSortingChange({
      field,
      direction: "asc",
    });
  }

  function sortableHeader(label: string, field: string) {
    return (
      <Button variant="ghost" onClick={() => handleSort(field)}>
        {label}

        {sorting.field === field &&
          (sorting.direction === "asc" ? (
            <ArrowUp className="ml-2 h-4 w-4" />
          ) : (
            <ArrowDown className="ml-2 h-4 w-4" />
          ))}
      </Button>
    );
  }

  const columns: ColumnDef<Company>[] = [
    {
      accessorKey: "id",

      header: () => sortableHeader("Código", "id"),
    },

    {
      accessorKey: "tradeName",

      header: () => sortableHeader("Nome Fantasia", "tradeName"),
    },

    {
      accessorKey: "legalName",

      header: () => sortableHeader("Razão Social", "legalName"),
    },

    {
      accessorKey: "document",

      header: () => sortableHeader("Documento", "document"),
    },

    {
      accessorKey: "status",

      header: () => sortableHeader("Status", "status"),
    },

    {
      id: "actions",

      header: "Ações",

      cell: ({ row }) => {
        const company = row.original;

        return (
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={() => onEdit(company)}>
              Editar
            </Button>

            <ConfirmDialog
              title="Excluir Empresa"
              description={`Deseja excluir ${company.tradeName}?`}
              onConfirm={() => onDelete(company)}
              trigger={
                <Button size="sm" variant="destructive">
                  Excluir
                </Button>
              }
            />
          </div>
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
    return <EmptyState message="Nenhuma empresa encontrada" />;
  }

  return <DataTable table={table} />;
}
