"use client";

import { Button } from "@/components/ui/button";
import { DataTablePageSize } from "@/src/shared/components/DataTablePageSize";
import { DataTablePagination } from "@/src/shared/components/DataTablePagination";
import { DataTableToolbar } from "@/src/shared/components/DataTableToolbar";
import { QueryState } from "@/src/shared/components/QueryState";
import { EMPTY_KEY_VALUE } from "@/src/shared/constants/default.constant";
import { useCrudForm } from "@/src/shared/hooks/useCrudForm";
import { useTableState } from "@/src/shared/hooks/useTableState";
import { PageBreadcrumb } from "@/src/shared/layout/PageBreadcrumb";
import { PageContainer } from "@/src/shared/layout/PageContainer";
import { PageHeader } from "@/src/shared/layout/PageHeader";
import { useClientsScreen, useDeleteClient } from "./client.hooks";
import { ClientFiltersType, ClientType } from "./client.types";
import { ClientFilters } from "./ClientFilters";
import { ClientForm } from "./ClientForm";
import { ClientTable } from "./ClientTable";

export default function ClientPage() {
  const table = useTableState<ClientFiltersType>({
    filters: {
      personName: "",
    },
    sorting: {
      field: "id",
      direction: "asc",
    },
  });

  const crud = useCrudForm<ClientType>();

  const query = useClientsScreen({
    filters: table.debouncedFilters,
    page: table.page,
    size: table.size,
    sorting: table.sorting,
  });

  const deleteClient = useDeleteClient();

  return (
    <QueryState query={query}>
      <PageContainer>
        <PageBreadcrumb items={["Cadastros", "Clientes"]} />

        <PageHeader title="Perfis" actions={!crud.open && <Button onClick={crud.create}>Adicionar Registro</Button>} />

        {crud.open ? (
          <ClientForm
            id={crud.item?.id}
            people={query.data?.kvPerson ?? EMPTY_KEY_VALUE}
            onCancel={crud.close}
            onSuccess={crud.close}
          />
        ) : (
          <>
            <DataTableToolbar>
              <ClientFilters filters={table.filters} onChange={table.changeFilters} />
            </DataTableToolbar>

            <ClientTable
              data={query.data?.obClients.content ?? []}
              sorting={table.sorting}
              onSortingChange={table.changeSorting}
              onEdit={crud.edit}
              onDelete={(client) => deleteClient.mutateAsync(client.id)}
            />

            <div className="flex justify-between">
              <DataTablePageSize value={table.size} onChange={table.changePageSize} />

              <DataTablePagination
                page={table.page}
                size={table.size}
                totalPages={query.data?.obClients.totalPages ?? 0}
                totalElements={query.data?.obClients.totalElements ?? 0}
                onPageChange={table.setPage}
              />
            </div>
          </>
        )}
      </PageContainer>
    </QueryState>
  );
}
