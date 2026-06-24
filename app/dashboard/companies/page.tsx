"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";

import { useCompanies, useDeleteCompany } from "@/features/company/company.api";

import {
    Company,
    CompanyFilters as CompanyFiltersType,
} from "@/features/company/company.types";

import { CompanyFilters } from "@/features/company/CompanyFilters";
import { CompanyForm } from "@/features/company/CompanyForm";
import { CompanyTable } from "@/features/company/CompanyTable";

import { ErrorState } from "@/shared/feedback/ErrorState";
import { Loading } from "@/shared/feedback/Loading";

import { PageBreadcrumb } from "@/shared/layout/PageBreadcrumb";
import { PageContainer } from "@/shared/layout/PageContainer";
import { PageHeader } from "@/shared/layout/PageHeader";

import { DataTablePagination } from "@/shared/table/DataTablePagination";
import { DataTableToolbar } from "@/shared/table/DataTableToolbar";

import { useDebounce } from "@/shared/hooks/useDebounce";
import { Sorting } from "@/shared/types/table.types";

export default function CompaniesPage() {
  const [showForm, setShowForm] = useState(false);

  const [editingCompany, setEditingCompany] = useState<Company | null>(null);

  const [filters, setFilters] = useState<CompanyFiltersType>({
    tradeName: "",
  });

  const debouncedFilters = useDebounce(filters, 500);

  const [page, setPage] = useState(0);

  const [size, setSize] = useState(10);

  const [sorting, setSorting] = useState<Sorting>({
    field: "id",
    direction: "asc",
  });

  const { data, isLoading, error, refetch } = useCompanies(
    debouncedFilters,
    page,
    size,
    sorting,
  );

  const deleteCompany = useDeleteCompany();

  function handleCreate() {
    setEditingCompany(null);

    setShowForm(true);
  }

  function handleEdit(company: Company) {
    setEditingCompany(company);

    setShowForm(true);
  }

  async function handleDelete(company: Company) {
    await deleteCompany.mutateAsync(company.id);
  }

  function handleCloseForm() {
    setEditingCompany(null);

    setShowForm(false);
  }

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorState onRetry={refetch} />;
  }

  return (
    <PageContainer>
      <PageBreadcrumb items={["Cadastros", "Empresas"]} />

      <PageHeader
        title="Empresas"
        actions={
          !showForm && (
            <Button onClick={handleCreate}>Adicionar Registro</Button>
          )
        }
      />

      {showForm ? (
        <CompanyForm
          company={editingCompany}
          onCancel={handleCloseForm}
          onSuccess={handleCloseForm}
        />
      ) : (
        <>
          <DataTableToolbar>
            <CompanyFilters
              filters={filters}
              onChange={(value) => {
                setFilters(value);

                setPage(0);
              }}
            />
          </DataTableToolbar>

          <CompanyTable
            data={data?.content ?? []}
            sorting={sorting}
            onSortingChange={(value) => {
              setSorting(value);

              setPage(0);
            }}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />

          <DataTablePagination
            page={page}
            size={size}
            totalPages={data?.totalPages ?? 0}
            totalElements={data?.totalElements ?? 0}
            onPageChange={setPage}
          />
        </>
      )}
    </PageContainer>
  );
}
