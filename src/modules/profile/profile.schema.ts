import { DefaultValues } from "react-hook-form";
import { z } from "zod";
import { profilePermissionSchema } from "../profilePermission/profilePermission.schema";
import { Profile } from "./profile.types";

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

export function mapProfileToForm(profile: Profile): ProfileFormInput {
  return {
    name: profile.name,
    profilePermissions: profile.profilePermission ?? [],
  };
}
