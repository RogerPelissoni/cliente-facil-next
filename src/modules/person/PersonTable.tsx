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
import { PersonType } from "./person.types";

interface Props {
  data: PersonType[];
  sorting: Sorting;
  onSortingChange(sorting: Sorting): void;
  onEdit(person: PersonType): void;
  onDelete(person: PersonType): void;
}

export function PersonTable({ data, sorting, onSortingChange, onEdit, onDelete }: Props) {
  function handleSort(field: string) {
    onSortingChange(nextSorting(sorting, field));
  }

  const columns: ColumnDef<PersonType>[] = [
    {
      accessorKey: "id",
      header: () => <SortableHeader label="#" field="id" sorting={sorting} onSort={handleSort} />,
    },
    {
      accessorKey: "name",
      header: () => <SortableHeader label="Nome" field="name" sorting={sorting} onSort={handleSort} />,
    },
    {
      accessorKey: "dsDocument",
      header: () => <SortableHeader label="Documento" field="dsDocument" sorting={sorting} onSort={handleSort} />,
    },
    {
      accessorKey: "tpGender",
      header: () => <SortableHeader label="Gênero" field="tpGender" sorting={sorting} onSort={handleSort} />,
    },
    {
      accessorKey: "flActive",
      header: () => <SortableHeader label="Ativo" field="flActive" sorting={sorting} onSort={handleSort} />,
      cell: ({ row }) => (row.original.flActive ? "Sim" : "Não"),
    },
    {
      id: "actions",
      header: "Ações",
      cell: ({ row }) => {
        const person = row.original;

        return (
          <TableActions>
            <TableActionEdit onClick={() => onEdit(person)} />

            <TableActionDelete
              title="Excluir Pessoa"
              description={`Deseja excluir a pessoa ${person.name}?`}
              onConfirm={() => onDelete(person)}
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
    return <EmptyState message="Nenhum pessoa encontrada" />;
  }

  return <DataTable table={table} />;
}
