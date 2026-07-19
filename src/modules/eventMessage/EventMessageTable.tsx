"use client";

import { DataTable } from "@/src/shared/components/DataTable";
import { EmptyState } from "@/src/shared/components/EmptyState";
import { TableActionDelete } from "@/src/shared/components/table/TableActionDelete";
import { TableActionEdit } from "@/src/shared/components/table/TableActionEdit";
import { TableActions } from "@/src/shared/components/table/TableActions";
import { ColumnDef, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { EventMessageType } from "./eventMessage.type";

interface Props {
  data: EventMessageType[];
  onEdit(eventMessage: EventMessageType): void;
  onDelete(eventMessage: EventMessageType): void;
}

export function EventMessageTable({ data, onEdit, onDelete }: Props) {

  const columns: ColumnDef<EventMessageType>[] = [
    {
      accessorKey: "dsMessage",
      header: 'Mensagem',
    },
    {
      id: "actions",
      header: "Ações",
      cell: ({ row }) => {
        const eventMessage = row.original;

        return (
          <TableActions>
            <TableActionEdit onClick={() => onEdit(eventMessage)} />

            <TableActionDelete
              title="Atenção!"
              description={`Deseja excluir a Mensagem: ${eventMessage.dsMessage}?`}
              onConfirm={() => onDelete(eventMessage)}
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
    return <EmptyState message="Nenhuma mensagem encontrada" />;
  }

  return <DataTable table={table} />;
}
