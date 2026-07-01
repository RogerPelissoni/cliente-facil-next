"use client";

import { Button } from "@/components/ui/button";
import { UserFiltersType, UserType } from "@/src/modules/user/user.types";
import { UserFilters } from "@/src/modules/user/UserFilters";
import { UserForm } from "@/src/modules/user/UserForm";
import { UserTable } from "@/src/modules/user/UserTable";
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
import { useDeleteUser, useUserScreen } from "./user.hooks";

export default function UserPage() {
  const table = useTableState<UserFiltersType>({
    filters: {
      name: "",
      email: "",
    },
    sorting: {
      field: "id",
      direction: "asc",
    },
  });

  const crud = useCrudForm<UserType>();

  const query = useUserScreen({
    filters: table.debouncedFilters,
    page: table.page,
    size: table.size,
    sorting: table.sorting,
  });

  const deleteUser = useDeleteUser();

  return (
    <QueryState query={query}>
      <PageContainer>
        <PageBreadcrumb items={["Cadastros", "Usuários"]} />

        <PageHeader
          title="Usuários"
          actions={!crud.open && <Button onClick={crud.create}>Adicionar Registro</Button>}
        />

        {crud.open ? (
          <UserForm
            id={crud.item?.id}
            onCancel={crud.close}
            onSuccess={crud.close}
            companies={query.data?.kvCompany ?? EMPTY_KEY_VALUE}
            profiles={query.data?.kvProfile ?? EMPTY_KEY_VALUE}
            people={query.data?.kvPerson ?? EMPTY_KEY_VALUE}
          />
        ) : (
          <>
            <DataTableToolbar>
              <UserFilters filters={table.filters} onChange={table.changeFilters} />
            </DataTableToolbar>

            <UserTable
              data={query.data?.obUser.content ?? []}
              sorting={table.sorting}
              onSortingChange={table.changeSorting}
              onEdit={crud.edit}
              onDelete={(user) => deleteUser.mutateAsync(user.id)}
            />

            <div className="flex justify-between">
              <DataTablePageSize value={table.size} onChange={table.changePageSize} />

              <DataTablePagination
                page={table.page}
                size={table.size}
                totalPages={query.data?.obUser.totalPages ?? 0}
                totalElements={query.data?.obUser.totalElements ?? 0}
                onPageChange={table.setPage}
              />
            </div>
          </>
        )}
      </PageContainer>
    </QueryState>
  );
}
