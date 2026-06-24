"use client";

import { Button } from "@/components/ui/button";
import { useDeleteUser, useUsers } from "@/features/user/user.api";
import {
  User,
  UserFilters as UserFiltersType,
} from "@/features/user/user.types";
import { UserFilters } from "@/features/user/UserFilters";
import { UserForm } from "@/features/user/UserForm";
import { UserTable } from "@/features/user/UserTable";
import { ErrorState } from "@/shared/feedback/ErrorState";
import { Loading } from "@/shared/feedback/Loading";
import { useDebounce } from "@/shared/hooks/useDebounce";
import { PageBreadcrumb } from "@/shared/layout/PageBreadcrumb";
import { PageContainer } from "@/shared/layout/PageContainer";
import { PageHeader } from "@/shared/layout/PageHeader";
import { DataTablePageSize } from "@/shared/table/DataTablePageSize";
import { DataTablePagination } from "@/shared/table/DataTablePagination";
import { DataTableToolbar } from "@/shared/table/DataTableToolbar";
import { Sorting } from "@/shared/types/table.types";
import { useState } from "react";

export default function UsersPage() {
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

  const { data, isLoading, error, refetch } = useUsers(
    debouncedFilters,
    page,
    size,
    sorting,
  );

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

  if (isLoading) {
    return <Loading />;
  }

  return (
    <PageContainer>
      <PageBreadcrumb items={["Cadastros", "Usuários"]} />

      <PageHeader
        title="Usuários"
        actions={
          !showForm && (
            <Button onClick={handleCreate}>Adicionar Registro</Button>
          )
        }
      />

      {showForm ? (
        <UserForm
          user={editingUser}
          onCancel={handleCloseForm}
          onSuccess={handleCloseForm}
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
            data={data?.content ?? []}
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
              totalPages={data?.totalPages ?? 0}
              totalElements={data?.totalElements ?? 0}
              onPageChange={setPage}
            />
          </div>
        </>
      )}
    </PageContainer>
  );
}
