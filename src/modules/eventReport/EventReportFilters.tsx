"use client";

import { EventStatusEnum } from "@/src/enum/eventStatus.enum";
import { EventTypeEnum } from "@/src/enum/eventType.enum";
import { FormGrid } from "@/src/shared/components/FormGrid";
import { FormInput } from "@/src/shared/components/FormInput";
import { FormSelect } from "@/src/shared/components/FormSelect";
import { KeyValueType } from "@/src/shared/types/core.type";
import { toOptions } from "@/src/shared/utils/util";
import { EventReportFiltersType } from "./eventReport.types";

const ALL_VALUE = "ALL";
const ALL_OPTION = { value: ALL_VALUE, label: "Todos" };

interface Props {
  filters: EventReportFiltersType;
  kvClient: KeyValueType;
  kvProfessional: KeyValueType;
  kvUser?: KeyValueType;
  onChange(filters: EventReportFiltersType): void;
}

export function EventReportFilters({
  filters,
  kvClient,
  kvProfessional,
  kvUser,
  onChange,
}: Props) {
  return (
    <FormGrid>
      <FormInput
        label="Período - de"
        type="date"
        size={3}
        value={filters.dtStart}
        onChange={(dtStart) => onChange({ ...filters, dtStart })}
      />

      <FormInput
        label="Período - até"
        type="date"
        size={3}
        value={filters.dtEnd}
        onChange={(dtEnd) => onChange({ ...filters, dtEnd })}
      />

      <FormSelect
        label="Status"
        size={3}
        value={filters.tpStatus || ALL_VALUE}
        options={[ALL_OPTION, ...toOptions(EventStatusEnum)]}
        onChange={(tpStatus) =>
          onChange({
            ...filters,
            tpStatus:
              tpStatus === ALL_VALUE
                ? ""
                : (tpStatus as keyof typeof EventStatusEnum),
          })
        }
      />

      <FormSelect
        label="Tipo de Evento"
        size={3}
        value={filters.tpEvent || ALL_VALUE}
        options={[ALL_OPTION, ...toOptions(EventTypeEnum)]}
        onChange={(tpEvent) =>
          onChange({
            ...filters,
            tpEvent:
              tpEvent === ALL_VALUE
                ? ""
                : (tpEvent as keyof typeof EventTypeEnum),
          })
        }
      />

      <FormSelect
        label="Cliente"
        size={6}
        value={filters.clientId || ALL_VALUE}
        options={[ALL_OPTION, ...toOptions(kvClient)]}
        onChange={(clientId) =>
          onChange({
            ...filters,
            clientId: clientId === ALL_VALUE ? "" : clientId,
          })
        }
      />

      <FormSelect
        label="Profissional"
        size={6}
        value={filters.professionalId || ALL_VALUE}
        options={[ALL_OPTION, ...toOptions(kvProfessional)]}
        onChange={(professionalId) =>
          onChange({
            ...filters,
            professionalId: professionalId === ALL_VALUE ? "" : professionalId,
          })
        }
      />

      {kvUser && (
        <FormSelect
          label="Usuário"
          size={6}
          value={filters.ownerId || ALL_VALUE}
          options={[ALL_OPTION, ...toOptions(kvUser)]}
          onChange={(ownerId) =>
            onChange({
              ...filters,
              ownerId: ownerId === ALL_VALUE ? "" : ownerId,
            })
          }
        />
      )}
    </FormGrid>
  );
}
