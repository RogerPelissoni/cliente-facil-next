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
} from "@/features/user/user.types";
import { UserFilters } from "@/features/user/UserFilters";
import { DataTableToolbar } from "@/shared/table/DataTableToolbar";

export default function UsersPage() {
  const [filters, setFilters] = useState<UserFiltersType>({
    name: "",
    email: "",
  });

  const { data = [], isLoading } = useUsers(filters);

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
            <UserFilters filters={filters} onChange={setFilters} />
          </DataTableToolbar>

          <UserTable data={data} onEdit={handleEdit} onDelete={handleDelete} />
        </>
      )}
    </PageContainer>
  );
}
