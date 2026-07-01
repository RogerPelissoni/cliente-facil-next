import { toFormIdentifier, zIdentifier, zString } from "@/src/shared/utils/schema.util";
import { DefaultValues } from "react-hook-form";
import { z } from "zod";
import { ProfilePermissionType } from "./profilePermission.types";

export const profilePermissionSchema = z.object({
  resourceId: zIdentifier(),
  resourceName: zString(),
  resourceSignature: zString(),
  moduleId: zIdentifier(),
  moduleName: zString(),
  hasPermission: z.boolean(),
});

export type ProfilePermissionFormInput = z.input<typeof profilePermissionSchema>;
export type ProfilePermissionFormOutput = z.output<typeof profilePermissionSchema>;

export function createProfilePermissionDefaultValues(): DefaultValues<ProfilePermissionFormInput> {
  return {
    resourceId: "",
    resourceName: "",
    resourceSignature: "",
    moduleId: "",
    moduleName: "",
    hasPermission: false,
  };
}

export function mapProfilePermissionToForm(profilePermission: ProfilePermissionType): ProfilePermissionFormInput {
  return {
    resourceId: toFormIdentifier(profilePermission.resourceId),
    resourceName: profilePermission.resourceName,
    resourceSignature: profilePermission.resourceSignature,
    moduleId: toFormIdentifier(profilePermission.moduleId),
    moduleName: profilePermission.moduleName,
    hasPermission: profilePermission.hasPermission,
  };
}
