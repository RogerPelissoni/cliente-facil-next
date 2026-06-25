"use client";

import { Button } from "@/components/ui/button";
import { useDeleteUser } from "@/src/modules/user/user.mutation";
import { useUserScreen } from "@/src/modules/user/user.query";
import { User, UserFilters as UserFiltersType } from "@/src/modules/user/user.types";
import { UserFilters } from "@/src/modules/user/UserFilters";
import { UserForm } from "@/src/modules/user/UserForm";
import { UserTable } from "@/src/modules/user/UserTable";
import { DataTablePageSize } from "@/src/shared/components/DataTablePageSize";
import { DataTablePagination } from "@/src/shared/components/DataTablePagination";
import { DataTableToolbar } from "@/src/shared/components/DataTableToolbar";
import { ErrorState } from "@/src/shared/components/ErrorState";
import { Loading } from "@/src/shared/components/Loading";
import { useDebounce } from "@/src/shared/hooks/useDebounce";
import { PageBreadcrumb } from "@/src/shared/layout/PageBreadcrumb";
import { PageContainer } from "@/src/shared/layout/PageContainer";
import { PageHeader } from "@/src/shared/layout/PageHeader";
import { Sorting } from "@/src/shared/types/table.type";
import { useState } from "react";

export default function UserPage() {
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);

  const [filters, setFilters] = useState<UserFiltersType>({
    name: "",
    email: "",
  });

  const [sorting, setSorting] = useState<Sorting>({
    field: "id",
    direction: "asc",
  });

  const debouncedFilters = useDebounce(filters, 500);

  const { data, isPending, error, refetch } = useUserScreen({
    filters,
    page,
    size,
    sorting,
  });

  const deleteUser = useDeleteUser();
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  if (error) {
    return <ErrorState onRetry={refetch} />;
  }

  function handleCreate() {
    setEditingUser(null);
    setShowForm(true);
  }

  function handleEdit(user: User) {
    setEditingUser(user);
    setShowForm(true);
  }

  async function handleDelete(user: User) {
    await deleteUser.mutateAsync(user.id);
  }

  function handleCloseForm() {
    setEditingUser(null);
    setShowForm(false);
  }

  if (isPending) {
    return <Loading />;
  }

  return (
    <PageContainer>
      <PageBreadcrumb items={["Cadastros", "Usuários"]} />

      <PageHeader title="Usuários" actions={!showForm && <Button onClick={handleCreate}>Adicionar Registro</Button>} />

      {showForm ? (
        <UserForm
          user={editingUser}
          onCancel={handleCloseForm}
          onSuccess={handleCloseForm}
          companies={data?.kvCompany ?? []}
          profiles={data?.kvProfile ?? []}
          people={data?.kvPerson ?? []}
        />
      ) : (
        <>
          <DataTableToolbar>
            <UserFilters
              filters={filters}
              onChange={(value) => {
                setFilters(value);
                setPage(0);
              }}
            />
          </DataTableToolbar>

          <UserTable
            data={data?.obUser.content ?? []}
            sorting={sorting}
            onSortingChange={(value) => {
              setSorting(value);
              setPage(0);
            }}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />

          <div className="flex justify-between">
            <DataTablePageSize
              value={size}
              onChange={(value) => {
                setSize(value);
                setPage(0);
              }}
            />

            <DataTablePagination
              page={page}
              size={size}
              totalPages={data?.obUser.totalPages ?? 0}
              totalElements={data?.obUser.totalElements ?? 0}
              onPageChange={setPage}
            />
          </div>
        </>
      )}
    </PageContainer>
  );
}
