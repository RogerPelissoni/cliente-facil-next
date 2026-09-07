"use client";

import { FormGrid } from "@/src/shared/components/FormGrid";
import { FormInput } from "@/src/shared/components/FormInput";
import { PersonFiltersType } from "./person.types";

interface Props {
  filters: PersonFiltersType;
  onChange(filters: PersonFiltersType): void;
}

export function PersonFilters({ filters, onChange }: Props) {
  return (
    <FormGrid>
      <FormInput
        label="Pessoa"
        placeholder="Pessoa"
        size={6}
        value={filters.name}
        onChange={(name) => onChange({ ...filters, name })}
      />
    </FormGrid>
  );
}
