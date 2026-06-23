"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";

import { ConfirmDialog } from "@/shared/feedback/ConfirmDialog";
import { EmptyState } from "@/shared/feedback/EmptyState";

import { User } from "./user.types";

interface Props {
  data: User[];

  onEdit(user: User): void;

  onDelete(user: User): void;
}

export function UserTable({ data, onEdit, onDelete }: Props) {
  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "id",
      header: "Código",
    },
    {
      accessorKey: "name",
      header: "Nome",
    },
    {
      accessorKey: "email",
      header: "E-mail",
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

  return (
    <table className="w-full border">
      <thead>
        {table.getHeaderGroups().map((group) => (
          <tr key={group.id}>
            {group.headers.map((header) => (
              <th key={header.id} className="border p-2 text-left">
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext(),
                )}
              </th>
            ))}
          </tr>
        ))}
      </thead>

      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id} className="border p-2">
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
