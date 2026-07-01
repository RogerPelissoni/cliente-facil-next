"use client";

import { DataTable } from "@/src/shared/components/DataTable";
import { EmptyState } from "@/src/shared/components/EmptyState";
import { TableActionDelete } from "@/src/shared/components/table/TableActionDelete";
import { TableActionEdit } from "@/src/shared/components/table/TableActionEdit";
import { TableActions } from "@/src/shared/components/table/TableActions";
import { ColumnDef, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { PersonPhoneType } from "./personPhone.type";

interface Props {
  data: PersonPhoneType[];
  onEdit(phone: PersonPhoneType, rowIndex: number): void;
  onDelete(index: number): void;
}

export function PersonPhoneTable({ data, onEdit, onDelete }: Props) {
  const columns: ColumnDef<PersonPhoneType>[] = [
    {
      accessorKey: "dsPhone",
      header: "Telefone",
    },
    {
      id: "actions",
      header: "Ações",
      cell: ({ row }) => {
        const phone = row.original;

        return (
          <TableActions>
            <TableActionEdit onClick={() => onEdit(phone, row.index)} />

            <TableActionDelete
              title="Excluir Endereço"
              description={"Deseja excluir o registro?"}
              onConfirm={() => onDelete(row.index)}
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
    return <EmptyState message="Nenhum telefone encontrado" />;
  }

  return <DataTable table={table} />;
}
