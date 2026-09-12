"use client";

import { useHasAuthority } from "@/src/modules/auth/auth.hooks";
import { useUsersKeyValue } from "@/src/modules/user/user.hooks";
import { DataTablePageSize } from "@/src/shared/components/DataTablePageSize";
import { DataTablePagination } from "@/src/shared/components/DataTablePagination";
import { DataTableToolbar } from "@/src/shared/components/DataTableToolbar";
import { QueryState } from "@/src/shared/components/QueryState";
import { useDebounce } from "@/src/shared/hooks/useDebounce";
import { PageBreadcrumb } from "@/src/shared/layout/PageBreadcrumb";
import { PageContainer } from "@/src/shared/layout/PageContainer";
import { PageHeader } from "@/src/shared/layout/PageHeader";
import { useState } from "react";
import { EventReportFilters } from "./EventReportFilters";
import { EventReportSummary } from "./EventReportSummary";
import { EventReportTable } from "./EventReportTable";
import { useEventReport } from "./eventReport.hooks";
import { EventReportFiltersType } from "./eventReport.types";

const DEFAULT_FILTERS: EventReportFiltersType = {
  dtStart: "",
  dtEnd: "",
  tpStatus: "",
  tpEvent: "",
  clientId: "",
  professionalId: "",
  ownerId: "",
};

export default function EventReportPage() {
  const [filters, setFilters] =
    useState<EventReportFiltersType>(DEFAULT_FILTERS);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);

  const debouncedFilters = useDebounce(filters);

  const canViewAll = useHasAuthority("EVENT_REPORT_VIEW_ALL");
  const usersQuery = useUsersKeyValue(canViewAll);

  function changeFilters(next: EventReportFiltersType) {
    setFilters(next);
    setPage(0);
  }

  function changePageSize(next: number) {
    setSize(next);
    setPage(0);
  }

  const query = useEventReport(debouncedFilters, page, size);

  return (
    <QueryState query={query}>
      <PageContainer>
        <PageBreadcrumb items={["Relatórios", "Eventos"]} />

        <PageHeader title="Relatório de Eventos" />

        <EventReportSummary summary={query.data?.summary} />

        <DataTableToolbar>
          <EventReportFilters
            filters={filters}
            kvClient={query.data?.kvClient ?? {}}
            kvProfessional={query.data?.kvProfessional ?? {}}
            kvUser={canViewAll ? (usersQuery.data ?? {}) : undefined}
            onChange={changeFilters}
          />
        </DataTableToolbar>

        <EventReportTable
          data={query.data?.obEvent.content ?? []}
          showOwner={canViewAll}
        />

        <div className="flex justify-between">
          <DataTablePageSize value={size} onChange={changePageSize} />

          <DataTablePagination
            page={page}
            size={size}
            totalPages={query.data?.obEvent.totalPages ?? 0}
            totalElements={query.data?.obEvent.totalElements ?? 0}
            onPageChange={setPage}
          />
        </div>
      </PageContainer>
    </QueryState>
  );
}
