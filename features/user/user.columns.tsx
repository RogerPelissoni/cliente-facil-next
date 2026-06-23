import { ColumnDef } from "@tanstack/react-table";
import { User } from "./user.types";

export const userColumns: ColumnDef<User>[] = [
  {
    accessorKey: "id",
    header: "Código",
  },
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "email",
    header: "E-mail",
  },
];
