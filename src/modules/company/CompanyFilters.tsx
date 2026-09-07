"use client";

import { FormGrid } from "@/src/shared/components/FormGrid";
import { FormInput } from "@/src/shared/components/FormInput";
import { CompanyFiltersType } from "./company.types";

interface Props {
  filters: CompanyFiltersType;
  onChange(filters: CompanyFiltersType): void;
}

export function CompanyFilters({ filters, onChange }: Props) {
  return (
    <FormGrid>
      <FormInput
        label="Empresa"
        placeholder="Empresa"
        size={6}
        value={filters.name}
        onChange={(name) => onChange({ ...filters, name })}
      />

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
