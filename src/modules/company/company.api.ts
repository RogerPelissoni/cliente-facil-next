import { createCrudApi, createScreenApi } from "@/src/shared/utils/api.util";
import { CompanyFormInput } from "./company.schema";
import { CompanyFiltersType, CompanyScreenDataType, CompanyType } from "./company.types";

const companyApi = {
  ...createCrudApi<CompanyType, CompanyFormInput, CompanyFiltersType>("/company"),
  ...createScreenApi<CompanyFiltersType, CompanyScreenDataType>("/company"),
};

export const searchCompanys = companyApi.search;
export const findCompanyById = companyApi.findById;
export const createCompany = companyApi.create;
export const updateCompany = companyApi.update;
export const deleteCompany = companyApi.delete;
export const screenCompanys = companyApi.screen;
