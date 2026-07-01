"use client";

import { DataTable } from "@/src/shared/components/DataTable";
import { EmptyState } from "@/src/shared/components/EmptyState";
import { TableActionDelete } from "@/src/shared/components/table/TableActionDelete";
import { TableActionEdit } from "@/src/shared/components/table/TableActionEdit";
import { TableActions } from "@/src/shared/components/table/TableActions";
import { ColumnDef, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { PersonMailType } from "./personMail.type";

interface Props {
  data: PersonMailType[];
  onEdit(mail: PersonMailType, rowIndex: number): void;
  onDelete(index: number): void;
}

export function PersonMailTable({ data, onEdit, onDelete }: Props) {
  const columns: ColumnDef<PersonMailType>[] = [
    {
      accessorKey: "dsMail",
      header: "Email",
    },
    {
      id: "actions",
      header: "Ações",
      cell: ({ row }) => {
        const mail = row.original;

        return (
          <TableActions>
            <TableActionEdit onClick={() => onEdit(mail, row.index)} />

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
    return <EmptyState message="Nenhum email encontrado" />;
  }

  return <DataTable table={table} />;
}
