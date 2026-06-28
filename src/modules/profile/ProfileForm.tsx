"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormActions } from "@/src/shared/components/FormActions";
import { FormGrid } from "@/src/shared/components/FormGrid";
import { FormInput } from "@/src/shared/components/FormInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useCreateProfile, useUpdateProfile } from "./profile.hooks";
import { createProfileDefaultValues, mapProfileToForm, ProfileFormInput, profileSchema } from "./profile.schema";
import { Profile } from "./profile.types";

interface Props {
  profile?: Profile | null;
  onCancel: () => void;
  onSuccess: () => void;
}

export function ProfileForm({ profile, onCancel, onSuccess }: Props) {
  const createProfile = useCreateProfile();
  const updateProfile = useUpdateProfile();

  const form = useForm<ProfileFormInput>({
    resolver: zodResolver(profileSchema),
    defaultValues: createProfileDefaultValues(),
  });

  useEffect(() => {
    if (profile) {
      form.reset(mapProfileToForm(profile));
    } else {
      form.reset(createProfileDefaultValues());
    }
  }, [profile]);

  async function onSubmit(data: ProfileFormInput) {
    if (profile) {
      await updateProfile.mutateAsync({
        id: profile.id,
        data,
      });
    } else {
      await createProfile.mutateAsync(data);
    }

    onSuccess();
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{profile ? "Editar Perfil" : "Novo Perfil"}</CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormGrid>
            <FormInput form={form} name="name" label="Nome" placeholder="Digite o nome" />
          </FormGrid>

          <FormActions onCancel={onCancel} loading={createProfile.isPending || updateProfile.isPending} />
        </form>
      </CardContent>
    </Card>
  );
}
