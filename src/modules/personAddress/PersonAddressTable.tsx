"use client";

import { DataTable } from "@/src/shared/components/DataTable";
import { EmptyState } from "@/src/shared/components/EmptyState";
import { TableActionDelete } from "@/src/shared/components/table/TableActionDelete";
import { TableActionEdit } from "@/src/shared/components/table/TableActionEdit";
import { TableActions } from "@/src/shared/components/table/TableActions";
import { ColumnDef, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { PersonAddressType } from "./personAddress.type";

interface Props {
  data: PersonAddressType[];
  onEdit(address: PersonAddressType, rowIndex: number): void;
  onDelete(address: PersonAddressType): void;
}

export function PersonAddressTable({ data, onEdit, onDelete }: Props) {
  const columns: ColumnDef<PersonAddressType>[] = [
    {
      accessorKey: "dsStreet",
      header: "Rua",
    },
    {
      accessorKey: "dsNumber",
      header: "Número",
    },
    {
      accessorKey: "dsDistrict",
      header: "Bairro",
    },
    {
      accessorKey: "dsCity",
      header: "Cidade",
    },
    {
      accessorKey: "dsState",
      header: "Estado",
    },
    {
      accessorKey: "flMain",
      header: "Principal",
      cell: ({ row }) => (row.original.flMain ? "Sim" : "Não"),
    },
    {
      id: "actions",
      header: "Ações",
      cell: ({ row }) => {
        const address = row.original;

        return (
          <TableActions>
            <TableActionEdit onClick={() => onEdit(address, row.index)} />

            <TableActionDelete
              title="Excluir Endereço"
              description={`Deseja excluir o endereço ${address.dsStreet}, ${address.dsNumber}?`}
              onConfirm={() => onDelete(address)}
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
    return <EmptyState message="Nenhum endereço encontrado" />;
  }

  return <DataTable table={table} />;
}
