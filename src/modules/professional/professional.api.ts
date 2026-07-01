import { createCrudApi, createScreenApi } from "@/src/shared/utils/api.util";
import { ProfessionalFormSchemaFields } from "./professional.schema";
import { ProfessionalFiltersType, ProfessionalScreenDataType, ProfessionalType } from "./professional.types";

const professionalApi = {
  ...createCrudApi<ProfessionalType, ProfessionalFormSchemaFields, ProfessionalFiltersType>("/professional"),
  ...createScreenApi<ProfessionalFiltersType, ProfessionalScreenDataType>("/professional"),
};

export const searchProfessionals = professionalApi.search;
export const findProfessionalById = professionalApi.findById;
export const createProfessional = professionalApi.create;
export const updateProfessional = professionalApi.update;
export const deleteProfessional = professionalApi.delete;
export const screenProfessionals = professionalApi.screen;
