"use client";

import { Button } from "@/components/ui/button";
import { RoleEnum } from "@/src/enum/role.enum";
import { ConfirmDialog } from "@/src/shared/components/ConfirmDialog";
import { DataTable } from "@/src/shared/components/DataTable";
import { EmptyState } from "@/src/shared/components/EmptyState";
import { Sorting } from "@/src/shared/types/table.type";
import { ColumnDef, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { ArrowDown, ArrowUp } from "lucide-react";
import { User } from "./user.types";

interface Props {
  data: User[];
  sorting: Sorting;
  onSortingChange(sorting: Sorting): void;
  onEdit(user: User): void;
  onDelete(user: User): void;
}

export function UserTable({ data, sorting, onSortingChange, onEdit, onDelete }: Props) {
  function renderSortableHeader(label: string, field: string) {
    return (
      <Button variant="ghost" onClick={() => handleSort(field)}>
        {label}

        {sorting.field === field &&
          (sorting.direction === "asc" ? <ArrowUp className="ml-2 h-4 w-4" /> : <ArrowDown className="ml-2 h-4 w-4" />)}
      </Button>
    );
  }

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

  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "id",
      header: () => renderSortableHeader("#", "id"),
    },
    {
      accessorKey: "name",
      header: () => renderSortableHeader("Nome", "name"),
    },
    {
      accessorKey: "email",
      header: () => renderSortableHeader("Email", "email"),
    },
    {
      accessorKey: "role",
      header: () => renderSortableHeader("Cargo", "role"),
      cell: ({ row }) => RoleEnum[row.original.role] ?? row.original.role,
    },
    {
      accessorKey: "personName",
      header: () => renderSortableHeader("Pessoa", "personName"),
    },
    {
      accessorKey: "profileName",
      header: () => renderSortableHeader("Perfil", "profileName"),
    },
    {
      accessorKey: "companyName",
      header: () => renderSortableHeader("Empresa", "companyName"),
    },
    {
      id: "actions",
      header: "Ações",
      cell: ({ row }) => {
        const user = row.original;

        return (
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={() => onEdit(user)}>
              Editar
            </Button>

            <ConfirmDialog
              title="Excluir Usuário"
              description={`Deseja excluir ${user.name}?`}
              onConfirm={() => onDelete(user)}
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
    return <EmptyState message="Nenhum usuário encontrado" />;
  }

  return <DataTable table={table} />;
}
