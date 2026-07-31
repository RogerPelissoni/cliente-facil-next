"use client";

import { DataTablePageSize } from "@/src/shared/components/DataTablePageSize";
import { DataTablePagination } from "@/src/shared/components/DataTablePagination";
import { DataTableToolbar } from "@/src/shared/components/DataTableToolbar";
import { QueryState } from "@/src/shared/components/QueryState";
import { useTableState } from "@/src/shared/hooks/useTableState";
import { PageBreadcrumb } from "@/src/shared/layout/PageBreadcrumb";
import { PageContainer } from "@/src/shared/layout/PageContainer";
import { PageHeader } from "@/src/shared/layout/PageHeader";
import { useHasAuthority } from "@/src/modules/auth/auth.hooks";
import { NotificationDeadLetterFilters } from "./NotificationDeadLetterFilters";
import { NotificationDeadLetterStats } from "./NotificationDeadLetterStats";
import { NotificationDeadLetterTable } from "./NotificationDeadLetterTable";
import { useDeadLetterStats, useDeadLetters, useResolveDeadLetter } from "./notificationDeadLetter.hooks";
import { NotificationDeadLetterFiltersType } from "./notificationDeadLetter.types";

export default function NotificationDeadLetterPage() {
  const table = useTableState<NotificationDeadLetterFiltersType>({
    filters: {
      dsErrorReason: "",
      status: "ALL",
    },
    sorting: {
      field: "id",
      direction: "desc",
    },
  });

  const canResolve = useHasAuthority("DEAD_LETTER_RESOLVE");

  const query = useDeadLetters({
    filters: table.debouncedFilters,
    page: table.page,
    size: table.size,
    sorting: table.sorting,
  });

  const statsQuery = useDeadLetterStats();
  const resolveDeadLetter = useResolveDeadLetter();

  return (
    <QueryState query={query}>
      <PageContainer>
        <PageBreadcrumb items={["Administração", "Mensageria (DLQ)"]} />

        <PageHeader title="Falhas de mensageria" />

        <NotificationDeadLetterStats stats={statsQuery.data} />

        <DataTableToolbar>
          <NotificationDeadLetterFilters filters={table.filters} onChange={table.changeFilters} />
        </DataTableToolbar>

        <NotificationDeadLetterTable
          data={query.data?.content ?? []}
          sorting={table.sorting}
          onSortingChange={table.changeSorting}
          canResolve={canResolve}
          onResolve={(deadLetter) => resolveDeadLetter.mutateAsync(deadLetter.id)}
        />

        <div className="flex justify-between">
          <DataTablePageSize value={table.size} onChange={table.changePageSize} />

          <DataTablePagination
            page={table.page}
            size={table.size}
            totalPages={query.data?.totalPages ?? 0}
            totalElements={query.data?.totalElements ?? 0}
            onPageChange={table.setPage}
          />
        </div>
      </PageContainer>
    </QueryState>
  );
}
