"use client";

import { FormGrid } from "@/src/shared/components/FormGrid";
import { FormInput } from "@/src/shared/components/FormInput";
import { ProfessionalFiltersType } from "./professional.types";

interface Props {
  filters: ProfessionalFiltersType;
  onChange(filters: ProfessionalFiltersType): void;
}

export function ProfessionalFilters({ filters, onChange }: Props) {
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
