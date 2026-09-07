"use client";

import { FormGrid } from "@/src/shared/components/FormGrid";
import { FormInput } from "@/src/shared/components/FormInput";
import { ClientFiltersType } from "./client.types";

interface Props {
  filters: ClientFiltersType;
  onChange(filters: ClientFiltersType): void;
}

export function ClientFilters({ filters, onChange }: Props) {
  return (
    <FormGrid>
      <FormInput
        label="Pessoa"
        placeholder="Pessoa"
        size={6}
        value={filters.personName}
        onChange={(personName) => onChange({ ...filters, personName })}
      />
    </FormGrid>
  );
}
