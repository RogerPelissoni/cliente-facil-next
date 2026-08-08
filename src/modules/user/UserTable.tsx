"use client";

import { Button } from "@/components/ui/button";
import { RoleEnum } from "@/src/enum/role.enum";
import { DataTable } from "@/src/shared/components/DataTable";
import { EmptyState } from "@/src/shared/components/EmptyState";
import SortableHeader from "@/src/shared/components/SortableHeader";
import { TableActionDelete } from "@/src/shared/components/table/TableActionDelete";
import { TableActionEdit } from "@/src/shared/components/table/TableActionEdit";
import { TableActions } from "@/src/shared/components/table/TableActions";
import { Sorting } from "@/src/shared/types/table.type";
import { nextSorting } from "@/src/shared/utils/table.util";
import { ColumnDef, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { Mail } from "lucide-react";
import { UserType } from "./user.types";

interface Props {
  data: UserType[];
  sorting: Sorting;
  onSortingChange(sorting: Sorting): void;
  onEdit(user: UserType): void;
  onDelete(user: UserType): void;
  onResendConfirmation(user: UserType): void;
}

export function UserTable({ data, sorting, onSortingChange, onEdit, onDelete, onResendConfirmation }: Props) {
  function handleSort(field: string) {
    onSortingChange(nextSorting(sorting, field));
  }

  const columns: ColumnDef<UserType>[] = [
    {
      accessorKey: "id",
      header: () => <SortableHeader label="#" field="id" sorting={sorting} onSort={handleSort} />,
    },
    {
      accessorKey: "name",
      header: () => <SortableHeader label="Nome" field="name" sorting={sorting} onSort={handleSort} />,
    },
    {
      accessorKey: "email",
      header: () => <SortableHeader label="Email" field="email" sorting={sorting} onSort={handleSort} />,
    },
    {
      accessorKey: "role",
      header: () => <SortableHeader label="Cargo" field="role" sorting={sorting} onSort={handleSort} />,
      cell: ({ row }) => RoleEnum[row.original.role] ?? row.original.role,
    },
    {
      accessorKey: "personName",
      header: () => <SortableHeader label="Pessoa" field="personName" sorting={sorting} onSort={handleSort} />,
    },
    {
      accessorKey: "profileName",
      header: () => <SortableHeader label="Perfil" field="profileName" sorting={sorting} onSort={handleSort} />,
    },
    {
      accessorKey: "companyName",
      header: () => <SortableHeader label="Empresa" field="companyName" sorting={sorting} onSort={handleSort} />,
    },
    {
      id: "emailStatus",
      header: "E-mail",
      cell: ({ row }) => {
        const confirmed = row.original.dtEmailConfirmedAt != null;

        return (
          <span
            className={`rounded-full px-2 py-0.5 text-xs font-medium ${
              confirmed
                ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
                : "bg-amber-500/10 text-amber-700 dark:text-amber-300"
            }`}
          >
            {confirmed ? "Confirmado" : "Pendente"}
          </span>
        );
      },
    },
    {
      id: "actions",
      header: "Ações",
      cell: ({ row }) => {
        const user = row.original;

        return (
          <TableActions>
            <TableActionEdit onClick={() => onEdit(user)} />

            {!user.dtEmailConfirmedAt && (
              <Button size="sm" variant="outline" onClick={() => onResendConfirmation(user)}>
                <Mail className="h-3.5 w-3.5" />
                Reenviar confirmação
              </Button>
            )}

            <TableActionDelete
              title="Excluir Usuário"
              description={`Deseja excluir ${user.name}?`}
              onConfirm={() => onDelete(user)}
            />
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
    return <EmptyState message="Nenhum usuário encontrado" />;
  }

  return <DataTable table={table} />;
}
