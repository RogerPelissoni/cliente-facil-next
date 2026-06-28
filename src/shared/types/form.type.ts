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

export type FilterOperator = "EQUALS" | "NOT_EQUALS" | "LIKE" | "IN" | "GREATER_THAN" | "LESS_THAN";

export type IdentifierType = string;
