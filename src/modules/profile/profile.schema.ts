import { DefaultValues } from "react-hook-form";
import { z } from "zod";
import { Profile } from "./profile.types";

export const profileSchema = z.object({
  name: z.string().min(3, "Informe o nome"),
});

export type ProfileFormInput = z.input<typeof profileSchema>;
export type ProfileFormSchemaFields = z.output<typeof profileSchema>;

export function createProfileDefaultValues(): DefaultValues<ProfileFormInput> {
  return {
    name: "",
  };
}

export function mapProfileToForm(profile: Profile): ProfileFormInput {
  return {
    name: profile.name,
  };
}
