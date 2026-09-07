"use client";

import { FormGrid } from "@/src/shared/components/FormGrid";
import { FormInput } from "@/src/shared/components/FormInput";
import { FormSelect } from "@/src/shared/components/FormSelect";
import {
  DeadLetterStatusFilter,
  NotificationDeadLetterFiltersType,
} from "./notificationDeadLetter.types";

interface Props {
  filters: NotificationDeadLetterFiltersType;
  onChange(filters: NotificationDeadLetterFiltersType): void;
}

const STATUS_OPTIONS = [
  { value: "ALL", label: "Todos os status" },
  { value: "PENDING", label: "Pendentes" },
  { value: "RESOLVED", label: "Resolvidos" },
];

export function NotificationDeadLetterFilters({ filters, onChange }: Props) {
  return (
    <FormGrid>
      <FormInput
        label="Motivo"
        placeholder="Motivo (ex: rejected, expired)"
        size={6}
        value={filters.dsErrorReason}
        onChange={(dsErrorReason) => onChange({ ...filters, dsErrorReason })}
      />

      <FormSelect
        label="Status"
        size={6}
        value={filters.status}
        options={STATUS_OPTIONS}
        onChange={(status) =>
          onChange({ ...filters, status: status as DeadLetterStatusFilter })
        }
      />
    </FormGrid>
  );
}
