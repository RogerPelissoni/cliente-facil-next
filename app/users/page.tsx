"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";

import { Loading } from "@/shared/feedback/Loading";

import { PageBreadcrumb } from "@/shared/layout/PageBreadcrumb";
import { PageContainer } from "@/shared/layout/PageContainer";
import { PageHeader } from "@/shared/layout/PageHeader";

import { useDeleteUser, useUsers } from "@/features/user/user.api";

import { UserForm } from "@/features/user/UserForm";
import { UserTable } from "@/features/user/UserTable";

import {
  User,
  UserFilters as UserFiltersType,
  UserSorting,
} from "@/features/user/user.types";
import { UserFilters } from "@/features/user/UserFilters";
import { DataTablePagination } from "@/shared/table/DataTablePagination";
import { DataTableToolbar } from "@/shared/table/DataTableToolbar";

export default function UsersPage() {
  const [filters, setFilters] = useState<UserFiltersType>({
    name: "",
    email: "",
  });

  const [page, setPage] = useState(0);
  const size = 1;

  const [sorting, setSorting] = useState<UserSorting>({
    field: "id",
    direction: "asc",
  });

  const { data, isLoading } = useUsers(filters, page, size, sorting);
  const deleteUser = useDeleteUser();
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

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
