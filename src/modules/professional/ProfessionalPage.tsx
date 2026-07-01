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
import { useDeleteProfessional, useProfessionalsScreen } from "./professional.hooks";
import { ProfessionalFiltersType, ProfessionalType } from "./professional.types";
import { ProfessionalFilters } from "./ProfessionalFilters";
import { ProfessionalForm } from "./ProfessionalForm";
import { ProfessionalTable } from "./ProfessionalTable";

export default function ProfessionalPage() {
  const table = useTableState<ProfessionalFiltersType>({
    filters: {
      personName: "",
    },
    sorting: {
      field: "id",
      direction: "asc",
    },
  });

  const crud = useCrudForm<ProfessionalType>();

  const query = useProfessionalsScreen({
    filters: table.debouncedFilters,
    page: table.page,
    size: table.size,
    sorting: table.sorting,
  });

  const deleteProfessional = useDeleteProfessional();

  return (
    <QueryState query={query}>
      <PageContainer>
        <PageBreadcrumb items={["Cadastros", "Profissionais"]} />

        <PageHeader
          title="Profissionais"
          actions={!crud.open && <Button onClick={crud.create}>Adicionar Registro</Button>}
        />

        {crud.open ? (
          <ProfessionalForm
            id={crud.item?.id}
            people={query.data?.kvPerson ?? EMPTY_KEY_VALUE}
            onCancel={crud.close}
            onSuccess={crud.close}
          />
        ) : (
          <>
            <DataTableToolbar>
              <ProfessionalFilters filters={table.filters} onChange={table.changeFilters} />
            </DataTableToolbar>

            <ProfessionalTable
              data={query.data?.obProfessionals.content ?? []}
              sorting={table.sorting}
              onSortingChange={table.changeSorting}
              onEdit={crud.edit}
              onDelete={(professional) => deleteProfessional.mutateAsync(professional.id)}
            />

            <div className="flex justify-between">
              <DataTablePageSize value={table.size} onChange={table.changePageSize} />

              <DataTablePagination
                page={table.page}
                size={table.size}
                totalPages={query.data?.obProfessionals.totalPages ?? 0}
                totalElements={query.data?.obProfessionals.totalElements ?? 0}
                onPageChange={table.setPage}
              />
            </div>
          </>
        )}
      </PageContainer>
    </QueryState>
  );
}
