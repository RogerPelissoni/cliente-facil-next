"use client";

import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DeadLetterStatusFilter, NotificationDeadLetterFiltersType } from "./notificationDeadLetter.types";

interface Props {
  filters: NotificationDeadLetterFiltersType;
  onChange(filters: NotificationDeadLetterFiltersType): void;
}

export function NotificationDeadLetterFilters({ filters, onChange }: Props) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Input
        placeholder="Motivo (ex: rejected, expired)"
        value={filters.dsErrorReason}
        onChange={(event) => onChange({ ...filters, dsErrorReason: event.target.value })}
      />

      <Select
        value={filters.status}
        onValueChange={(value) => onChange({ ...filters, status: value as DeadLetterStatusFilter })}
      >
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="ALL">Todos os status</SelectItem>
          <SelectItem value="PENDING">Pendentes</SelectItem>
          <SelectItem value="RESOLVED">Resolvidos</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
