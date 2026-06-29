"use client";

import { Input } from "@/components/ui/input";
import { CompanyFiltersType } from "./company.types";

interface Props {
  filters: CompanyFiltersType;
  onChange(filters: CompanyFiltersType): void;
}

export function CompanyFilters({ filters, onChange }: Props) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Input
        placeholder="Empresa"
        value={filters.name}
        onChange={(event) =>
          onChange({
            ...filters,
            name: event.target.value,
          })
        }
      />
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
