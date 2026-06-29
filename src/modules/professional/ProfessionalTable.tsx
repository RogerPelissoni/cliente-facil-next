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
import { ProfessionalType } from "./professional.types";

interface Props {
  data: ProfessionalType[];
  sorting: Sorting;
  onSortingChange(sorting: Sorting): void;
  onEdit(professional: ProfessionalType): void;
  onDelete(professional: ProfessionalType): void;
}

export function ProfessionalTable({ data, sorting, onSortingChange, onEdit, onDelete }: Props) {
  function handleSort(field: string) {
    onSortingChange(nextSorting(sorting, field));
  }

  const columns: ColumnDef<ProfessionalType>[] = [
    {
      accessorKey: "id",
      header: () => <SortableHeader label="#" field="id" sorting={sorting} onSort={handleSort} />,
    },
    {
      accessorKey: "personName",
      header: () => <SortableHeader label="Pessoa" field="personName" sorting={sorting} onSort={handleSort} />,
    },
    {
      id: "actions",
      header: "Ações",
      cell: ({ row }) => {
        const professional = row.original;

        return (
          <TableActions>
            <TableActionEdit onClick={() => onEdit(professional)} />

            <TableActionDelete
              title="Excluir Professionale"
              description={`Deseja excluir o profissional ${professional.personName}?`}
              onConfirm={() => onDelete(professional)}
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
    return <EmptyState message="Nenhum profissional encontrado" />;
  }

  return <DataTable table={table} />;
}
