"use client";

import { Button } from "@/components/ui/button";
import { DataTablePageSize } from "@/src/shared/components/DataTablePageSize";
import { DataTablePagination } from "@/src/shared/components/DataTablePagination";
import { DataTableToolbar } from "@/src/shared/components/DataTableToolbar";
import { QueryState } from "@/src/shared/components/QueryState";
import { useCrudForm } from "@/src/shared/hooks/useCrudForm";
import { useTableState } from "@/src/shared/hooks/useTableState";
import { PageBreadcrumb } from "@/src/shared/layout/PageBreadcrumb";
import { PageContainer } from "@/src/shared/layout/PageContainer";
import { PageHeader } from "@/src/shared/layout/PageHeader";
import { useDeleteProfile, useProfiles } from "./profile.hooks";
import { ProfileFiltersType, ProfileType } from "./profile.types";
import { ProfileFilters } from "./ProfileFilters";
import { ProfileForm } from "./ProfileForm";
import { ProfileTable } from "./ProfileTable";

export default function ProfilePage() {
  const table = useTableState<ProfileFiltersType>({
    filters: {
      name: "",
    },
    sorting: {
      field: "id",
      direction: "asc",
    },
  });

  const crud = useCrudForm<ProfileType>();

  const query = useProfiles({
    filters: table.debouncedFilters,
    page: table.page,
    size: table.size,
    sorting: table.sorting,
  });

  const deleteProfile = useDeleteProfile();

  return (
    <QueryState query={query}>
      <PageContainer>
        <PageBreadcrumb items={["Cadastros", "Perfis"]} />

        <PageHeader title="Perfis" actions={!crud.open && <Button onClick={crud.create}>Adicionar Registro</Button>} />

        {crud.open ? (
          <ProfileForm profile={crud.item} onCancel={crud.close} onSuccess={crud.close} />
        ) : (
          <>
            <DataTableToolbar>
              <ProfileFilters filters={table.filters} onChange={table.changeFilters} />
            </DataTableToolbar>

            <ProfileTable
              data={query.data?.content ?? []}
              sorting={table.sorting}
              onSortingChange={table.changeSorting}
              onEdit={crud.edit}
              onDelete={(profile) => deleteProfile.mutateAsync(profile.id)}
            />

            <div className="flex justify-between">
              <DataTablePageSize value={table.size} onChange={table.changePageSize} />

              <DataTablePagination
                page={table.page}
                size={table.size}
                totalPages={query.data?.totalPages ?? 0}
                totalElements={query.data?.totalElements ?? 0}
                onPageChange={table.setPage}
              />
            </div>
          </>
        )}
      </PageContainer>
    </QueryState>
  );
}
