"use client";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface Props {
  value: number;

  onChange(value: number): void;
}

export function DataTablePageSize({ value, onChange }: Props) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm">Mostrar:</span>

      <Select
        value={String(value)}
        onValueChange={(value) => onChange(Number(value))}
      >
        <SelectTrigger className="w-24">
          <SelectValue />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="10">10</SelectItem>

          <SelectItem value="20">20</SelectItem>

          <SelectItem value="50">50</SelectItem>

          <SelectItem value="100">100</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
