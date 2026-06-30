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
import { useDeletePerson, usePersons } from "./person.hooks";
import { PersonFiltersType, PersonType } from "./person.types";
import { PersonFilters } from "./PersonFilters";
import { PersonForm } from "./PersonForm";
import { PersonTable } from "./PersonTable";

export default function PersonPage() {
  const table = useTableState<PersonFiltersType>({
    filters: {
      name: "",
      dsDocument: "",
      flActive: true,
    },
    sorting: {
      field: "id",
      direction: "asc",
    },
  });

  const crud = useCrudForm<PersonType>();

  const query = usePersons({
    filters: table.debouncedFilters,
    page: table.page,
    size: table.size,
    sorting: table.sorting,
  });

  const deletePerson = useDeletePerson();

  return (
    <QueryState query={query}>
      <PageContainer>
        <PageBreadcrumb items={["Cadastros", "Persones"]} />

        <PageHeader title="Perfis" actions={!crud.open && <Button onClick={crud.create}>Adicionar Registro</Button>} />

        {crud.open ? (
          <PersonForm id={crud.item?.id} onCancel={crud.close} onSuccess={crud.close} />
        ) : (
          <>
            <DataTableToolbar>
              <PersonFilters filters={table.filters} onChange={table.changeFilters} />
            </DataTableToolbar>

            <PersonTable
              data={query.data?.content ?? []}
              sorting={table.sorting}
              onSortingChange={table.changeSorting}
              onEdit={crud.edit}
              onDelete={(person) => deletePerson.mutateAsync(person.id)}
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
