export interface Company {
  id: number;
  tradeName: string;
  legalName: string;
  document: string;
  status: "ACTIVE" | "INACTIVE";
}

export interface CompanyFilters {
  tradeName: string;
}