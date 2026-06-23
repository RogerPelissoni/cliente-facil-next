"use client";

import { UserForm } from "@/features/user/UserForm";
import { UserTable } from "@/features/user/UserTable";
import { useUsers } from "@/features/user/user.api";

export default function UsersPage() {
  const { data = [] } = useUsers();

  return (
    <div>
      <h1>Usuários</h1>

      <UserForm />

      <UserTable data={data} />
    </div>
  );
}
