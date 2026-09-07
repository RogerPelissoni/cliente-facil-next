"use client";

import { FormGrid } from "@/src/shared/components/FormGrid";
import { FormInput } from "@/src/shared/components/FormInput";
import { ProfileFiltersType } from "./profile.types";

interface Props {
  filters: ProfileFiltersType;
  onChange(filters: ProfileFiltersType): void;
}

export function ProfileFilters({ filters, onChange }: Props) {
  return (
    <FormGrid>
      <FormInput
        label="Nome"
        placeholder="Nome"
        size={6}
        value={filters.name}
        onChange={(name) => onChange({ ...filters, name })}
      />
    </FormGrid>
  );
}
