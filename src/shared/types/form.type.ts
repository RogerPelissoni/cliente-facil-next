export interface SearchRequest {
  page: number;
  size: number;
  sorts: SortRequest[];
  filters: FilterRequest[];
}

export interface SortRequest {
  field: string;
  direction: "ASC" | "DESC";
}

export interface FilterRequest {
  field: string;
  operator: FilterOperator;
  value?: string;
  values?: string[];
}

// Precisa espelhar br.com.clientefacil.core.dto.search.FilterOperator (backend) exatamente —
// os valores viram literais de string no JSON, então nomes diferentes quebram silenciosamente.
export type FilterOperator =
  | "EQ"
  | "NE"
  | "GT"
  | "GTE"
  | "LT"
  | "LTE"
  | "LIKE"
  | "CONTAINS"
  | "STARTS_WITH"
  | "ENDS_WITH"
  | "IN"
  | "BETWEEN"
  | "IS_NULL"
  | "IS_NOT_NULL";

export type IdentifierType = string;
