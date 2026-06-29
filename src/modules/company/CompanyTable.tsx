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
import { CompanyType } from "./company.types";

interface Props {
  data: CompanyType[];
  sorting: Sorting;
  onSortingChange(sorting: Sorting): void;
  onEdit(company: CompanyType): void;
  onDelete(company: CompanyType): void;
}

export function CompanyTable({ data, sorting, onSortingChange, onEdit, onDelete }: Props) {
  function handleSort(field: string) {
    onSortingChange(nextSorting(sorting, field));
  }

  const columns: ColumnDef<CompanyType>[] = [
    {
      accessorKey: "id",
      header: () => <SortableHeader label="#" field="id" sorting={sorting} onSort={handleSort} />,
    },
    {
      accessorKey: "name",
      header: () => <SortableHeader label="Empresa" field="name" sorting={sorting} onSort={handleSort} />,
    },
    {
      accessorKey: "personName",
      header: () => <SortableHeader label="Pessoa" field="personName" sorting={sorting} onSort={handleSort} />,
    },
    {
      id: "actions",
      header: "Ações",
      cell: ({ row }) => {
        const company = row.original;

        return (
          <TableActions>
            <TableActionEdit onClick={() => onEdit(company)} />

            <TableActionDelete
              title="Excluir Companye"
              description={`Deseja excluir a empresa ${company.name}?`}
              onConfirm={() => onDelete(company)}
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
    return <EmptyState message="Nenhum empresa encontrada" />;
  }

  return <DataTable table={table} />;
}
