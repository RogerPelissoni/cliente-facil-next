import { api } from "@/src/shared/utils/http.util";
import {
  EventReportDataType,
  EventReportFiltersType,
} from "./eventReport.types";

const RESOURCE = "/event/report";

export function fetchEventReport(
  filters: EventReportFiltersType,
  page: number,
  size: number,
) {
  return api.post<EventReportDataType>(RESOURCE, {
    dtStart: filters.dtStart ? `${filters.dtStart}T00:00:00` : undefined,
    dtEnd: filters.dtEnd ? `${filters.dtEnd}T23:59:59` : undefined,
    tpStatus: filters.tpStatus || undefined,
    tpEvent: filters.tpEvent || undefined,
    clientId: filters.clientId || undefined,
    professionalId: filters.professionalId || undefined,
    ownerId: filters.ownerId || undefined,
    page,
    size,
  });
}
