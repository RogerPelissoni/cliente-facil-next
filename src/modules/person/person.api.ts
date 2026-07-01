import { createCrudApi } from "@/src/shared/utils/api.util";
import { PersonFormSchemaFields } from "./person.schema";
import { PersonFiltersType, PersonType } from "./person.types";

const personApi = createCrudApi<PersonType, PersonFormSchemaFields, PersonFiltersType>("/person");

export const searchPersons = personApi.search;
export const findPersonById = personApi.findById;
export const createPerson = personApi.create;
export const updatePerson = personApi.update;
export const deletePerson = personApi.delete;
