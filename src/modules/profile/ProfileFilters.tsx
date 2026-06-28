"use client";

import { Input } from "@/components/ui/input";
import { ProfileFiltersType } from "./profile.types";

interface Props {
  filters: ProfileFiltersType;
  onChange(filters: ProfileFiltersType): void;
}

export function ProfileFilters({ filters, onChange }: Props) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Input
        placeholder="Nome"
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
