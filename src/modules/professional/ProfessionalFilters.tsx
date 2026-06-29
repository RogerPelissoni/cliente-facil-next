"use client";

import { Input } from "@/components/ui/input";
import { ProfessionalFiltersType } from "./professional.types";

interface Props {
  filters: ProfessionalFiltersType;
  onChange(filters: ProfessionalFiltersType): void;
}

export function ProfessionalFilters({ filters, onChange }: Props) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Input
        placeholder="Pessoa"
        value={filters.personName}
        onChange={(event) =>
          onChange({
            ...filters,
            personName: event.target.value,
          })
        }
      />
    </div>
  );
}
