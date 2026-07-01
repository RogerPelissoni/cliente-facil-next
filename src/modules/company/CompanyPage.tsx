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
import { useCompanysScreen, useDeleteCompany } from "./company.hooks";
import { CompanyFiltersType, CompanyType } from "./company.types";
import { CompanyFilters } from "./CompanyFilters";
import { CompanyForm } from "./CompanyForm";
import { CompanyTable } from "./CompanyTable";

export default function CompanyPage() {
  const table = useTableState<CompanyFiltersType>({
    filters: {
      name: "",
      personName: "",
    },
    sorting: {
      field: "id",
      direction: "asc",
    },
  });

  const crud = useCrudForm<CompanyType>();

  const query = useCompanysScreen({
    filters: table.debouncedFilters,
    page: table.page,
    size: table.size,
    sorting: table.sorting,
  });

  const deleteCompany = useDeleteCompany();

  return (
    <QueryState query={query}>
      <PageContainer>
        <PageBreadcrumb items={["Cadastros", "Empresas"]} />

        <PageHeader
          title="Empresas"
          actions={!crud.open && <Button onClick={crud.create}>Adicionar Registro</Button>}
        />

        {crud.open ? (
          <CompanyForm
            id={crud.item?.id}
            people={query.data?.kvPerson ?? EMPTY_KEY_VALUE}
            onCancel={crud.close}
            onSuccess={crud.close}
          />
        ) : (
          <>
            <DataTableToolbar>
              <CompanyFilters filters={table.filters} onChange={table.changeFilters} />
            </DataTableToolbar>

            <CompanyTable
              data={query.data?.obCompanies.content ?? []}
              sorting={table.sorting}
              onSortingChange={table.changeSorting}
              onEdit={crud.edit}
              onDelete={(company) => deleteCompany.mutateAsync(company.id)}
            />

            <div className="flex justify-between">
              <DataTablePageSize value={table.size} onChange={table.changePageSize} />

              <DataTablePagination
                page={table.page}
                size={table.size}
                totalPages={query.data?.obCompanies.totalPages ?? 0}
                totalElements={query.data?.obCompanies.totalElements ?? 0}
                onPageChange={table.setPage}
              />
            </div>
          </>
        )}
      </PageContainer>
    </QueryState>
  );
}
