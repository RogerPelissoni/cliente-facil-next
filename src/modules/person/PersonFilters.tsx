"use client";

import { Input } from "@/components/ui/input";
import { PersonFiltersType } from "./person.types";

interface Props {
  filters: PersonFiltersType;
  onChange(filters: PersonFiltersType): void;
}

export function PersonFilters({ filters, onChange }: Props) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Input
        placeholder="Pessoa"
        value={filters.name}
        onChange={(event) =>
          onChange({
            ...filters,
            name: event.target.value,
          })
        }
      />
    </div>
  );
}
