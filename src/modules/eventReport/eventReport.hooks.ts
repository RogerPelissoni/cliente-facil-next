import { useQuery } from "@tanstack/react-query";
import { fetchEventReport } from "./eventReport.api";
import { EventReportFiltersType } from "./eventReport.types";

export const eventReportKeys = {
  all: ["eventReport"] as const,

  list: (filters: EventReportFiltersType, page: number, size: number) =>
    ["eventReport", "list", filters, page, size] as const,
};

export function useEventReport(
  filters: EventReportFiltersType,
  page: number,
  size: number,
) {
  return useQuery({
    queryKey: eventReportKeys.list(filters, page, size),
    queryFn: () => fetchEventReport(filters, page, size),
  });
}
