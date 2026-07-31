import { IdentifierType } from "@/src/shared/types/form.type";

export interface AuthenticatedUserType {
  id: IdentifierType;
  email: string;
  authorities: string[];
}
