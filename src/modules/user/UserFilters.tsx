"use client";

import { Input } from "@/components/ui/input";

import { UserFiltersType } from "./user.types";

interface Props {
  filters: UserFiltersType;
  onChange(filters: UserFiltersType): void;
}

export function UserFilters({ filters, onChange }: Props) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Input
        placeholder="Nome"
        value={filters.name}
        onChange={(event) =>
          onChange({
            ...filters,
            name: event.target.value,
          })
        }
      />

      <Input
        placeholder="E-mail"
        value={filters.email}
        onChange={(event) =>
          onChange({
            ...filters,
            email: event.target.value,
          })
        }
      />
    </div>
  );
}
