"use client";

import { Input } from "@/components/ui/input";
import { ClientFiltersType } from "./client.types";

interface Props {
  filters: ClientFiltersType;
  onChange(filters: ClientFiltersType): void;
}

export function ClientFilters({ filters, onChange }: Props) {
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
