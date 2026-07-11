import { ArrowDown, ArrowUp } from "lucide-react";
import { Sorting } from "../types/table.type";
import CoreButton from "./CoreButton";

interface SortableHeaderProps {
  label: string;
  field: string;
  sorting: Sorting;
  onSort(field: string): void;
}

export default function SortableHeader({ label, field, sorting, onSort }: SortableHeaderProps) {
  return (
    <CoreButton variant="ghost" onClick={() => onSort(field)}>
      {label}

      {sorting.field === field &&
        (sorting.direction === "asc" ? <ArrowUp className="ml-2 h-4 w-4" /> : <ArrowDown className="ml-2 h-4 w-4" />)}
    </CoreButton>
  );
}
