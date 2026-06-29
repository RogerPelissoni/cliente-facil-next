import { DefaultValues } from "react-hook-form";
import { z } from "zod";
import { profilePermissionSchema } from "../profilePermission/profilePermission.schema";
import { ProfileType } from "./profile.types";

export const profileSchema = z.object({
  name: z.string().min(3, "Informe o nome"),
  profilePermissions: z.array(profilePermissionSchema),
});

export type ProfileFormInput = z.input<typeof profileSchema>;
export type ProfileFormSchemaFields = z.output<typeof profileSchema>;

export function createProfileDefaultValues(): DefaultValues<ProfileFormInput> {
  return {
    name: "",
    profilePermissions: [],
  };
}

export function mapProfileToForm(profile: ProfileType): ProfileFormInput {
  return {
    name: profile.name,
    profilePermissions: profile.profilePermission ?? [],
  };
}
