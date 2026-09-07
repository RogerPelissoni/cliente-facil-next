"use client";

import { FormGrid } from "@/src/shared/components/FormGrid";
import { FormInput } from "@/src/shared/components/FormInput";
import { UserFiltersType } from "./user.types";

interface Props {
  filters: UserFiltersType;
  onChange(filters: UserFiltersType): void;
}

export function UserFilters({ filters, onChange }: Props) {
  return (
    <FormGrid>
      <FormInput
        label="Nome"
        placeholder="Nome"
        size={6}
        value={filters.name}
        onChange={(name) => onChange({ ...filters, name })}
      />

      <FormInput
        label="E-mail"
        placeholder="E-mail"
        size={6}
        value={filters.email}
        onChange={(email) => onChange({ ...filters, email })}
      />
    </FormGrid>
  );
}
