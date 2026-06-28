import { IdentifierType } from "@/src/shared/types/form.type";

export type ProfilePermissionType = {
  id: IdentifierType;
  profileId: IdentifierType;
  profileName: string;
  resourceId: IdentifierType;
  resourceName: string;
  resourceSignature: string;
  moduleId: IdentifierType;
  moduleName: string;
  hasPermission: boolean;
};

export interface ProfilePermissionFiltersType {}
