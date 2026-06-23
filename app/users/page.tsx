"use client";

import { useState } from "react";

import { useDeleteUser, useUsers } from "@/features/user/user.api";

import { UserForm } from "@/features/user/UserForm";
import { UserTable } from "@/features/user/UserTable";

import { User } from "@/features/user/user.types";

export default function UsersPage() {
  const { data = [] } = useUsers();

  const deleteUser = useDeleteUser();

  const [editingUser, setEditingUser] = useState<User | null>(null);

  const [showForm, setShowForm] = useState(false);

  function handleCreate() {
    setEditingUser(null);
    setShowForm(true);
  }

  function handleEdit(user: User) {
    setEditingUser(user);
    setShowForm(true);
  }

  async function handleDelete(user: User) {
    const confirmed = window.confirm(`Deseja excluir ${user.name}?`);

    if (!confirmed) {
      return;
    }

    await deleteUser.mutateAsync(user.id);
  }

  function handleCloseForm() {
    setEditingUser(null);
    setShowForm(false);
  }

  return (
    <div className="container mx-auto space-y-6 p-6">
      <h1 className="text-3xl font-bold">Usuários</h1>

      {!showForm && (
        <>
          <button onClick={handleCreate}>Adicionar Registro</button>

          <UserTable data={data} onEdit={handleEdit} onDelete={handleDelete} />
        </>
      )}

      {showForm && (
        <UserForm
          user={editingUser}
          onCancel={handleCloseForm}
          onSuccess={handleCloseForm}
        />
      )}
    </div>
  );
}
