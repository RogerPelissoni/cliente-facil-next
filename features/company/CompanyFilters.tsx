"use client";

interface Props {
  filters: {
    tradeName: string;
  };

  onChange(filters: { tradeName: string }): void;
}

export function CompanyFilters({ filters, onChange }: Props) {
  return (
    <input
      className="border rounded px-3 py-2"
      placeholder="Nome Fantasia"
      value={filters.tradeName}
      onChange={(event) =>
        onChange({
          tradeName: event.target.value,
        })
      }
    />
  );
}
