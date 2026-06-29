"use client";

import { DataTable } from "@/src/shared/components/DataTable";
import { EmptyState } from "@/src/shared/components/EmptyState";
import SortableHeader from "@/src/shared/components/SortableHeader";
import { TableActionDelete } from "@/src/shared/components/table/TableActionDelete";
import { TableActionEdit } from "@/src/shared/components/table/TableActionEdit";
import { TableActions } from "@/src/shared/components/table/TableActions";
import { Sorting } from "@/src/shared/types/table.type";
import { nextSorting } from "@/src/shared/utils/table.util";
import { ColumnDef, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { ProfileType } from "./profile.types";

interface Props {
  data: ProfileType[];
  sorting: Sorting;
  onSortingChange(sorting: Sorting): void;
  onEdit(profile: ProfileType): void;
  onDelete(profile: ProfileType): void;
}

export function ProfileTable({ data, sorting, onSortingChange, onEdit, onDelete }: Props) {
  function handleSort(field: string) {
    onSortingChange(nextSorting(sorting, field));
  }

  const columns: ColumnDef<ProfileType>[] = [
    {
      accessorKey: "id",
      header: () => <SortableHeader label="#" field="id" sorting={sorting} onSort={handleSort} />,
    },
    {
      accessorKey: "name",
      header: () => <SortableHeader label="Nome" field="name" sorting={sorting} onSort={handleSort} />,
    },
    {
      id: "actions",
      header: "Ações",
      cell: ({ row }) => {
        const profile = row.original;

        return (
          <TableActions>
            <TableActionEdit onClick={() => onEdit(profile)} />

            <TableActionDelete
              title="Excluir Perfil"
              description={`Deseja excluir ${profile.name}?`}
              onConfirm={() => onDelete(profile)}
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
    return <EmptyState message="Nenhum perfil encontrado" />;
  }

  return <DataTable table={table} />;
}
