"use client";

import { Switch } from "@/components/ui/switch";
import { DataTable } from "@/src/shared/components/DataTable";
import { EmptyState } from "@/src/shared/components/EmptyState";
import { ColumnDef, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { ProfilePermissionFormInput } from "./profilePermission.schema";

interface Props {
  data: ProfilePermissionFormInput[];
  onPermissionChange(resourceId: string, hasPermission: boolean): void;
}

export function ProfilePermissionTable({ data, onPermissionChange }: Props) {
  const columns: ColumnDef<ProfilePermissionFormInput>[] = [
    {
      accessorKey: "resourceName",
      header: "Recurso",
    },
    {
      accessorKey: "moduleName",
      header: "Módulo",
    },
    {
      accessorKey: "hasPermission",
      header: "Acesso",
      cell: ({ row }) => {
        const profilePermission = row.original;

        return (
          <Switch
            checked={profilePermission.hasPermission}
            onCheckedChange={(checked) => onPermissionChange(profilePermission.resourceId, checked)}
          />
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
    return <EmptyState message="Nenhum recurso encontrado" />;
  }

  return <DataTable table={table} />;
}
