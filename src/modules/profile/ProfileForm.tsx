"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormActions } from "@/src/shared/components/FormActions";
import { FormGrid } from "@/src/shared/components/FormGrid";
import { FormInput } from "@/src/shared/components/FormInput";
import { QueryState } from "@/src/shared/components/QueryState";
import { PageHeader } from "@/src/shared/layout/PageHeader";
import { IdentifierType } from "@/src/shared/types/form.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { FieldErrors, useForm } from "react-hook-form";
import { ProfilePermissionTable } from "../profilePermission/ProfilePermissionTable";
import { useCreateProfile, useProfile, useProfilePermission, useUpdateProfile } from "./profile.hooks";
import { createProfileDefaultValues, mapProfileToForm, ProfileFormInput, profileSchema } from "./profile.schema";

interface Props {
  id?: IdentifierType;
  onCancel: () => void;
  onSuccess: () => void;
}

export function ProfileForm({ id, onCancel, onSuccess }: Props) {
  const createProfile = useCreateProfile();
  const updateProfile = useUpdateProfile();

  const query = useProfile(id);

  const form = useForm<ProfileFormInput>({
    resolver: zodResolver(profileSchema),
    defaultValues: createProfileDefaultValues(),
  });

  useEffect(() => {
    if (!id) {
      form.reset(createProfileDefaultValues());
      return;
    }

    if (query.data) {
      form.reset(mapProfileToForm(query.data));
    }
  }, [id, query.data, form]);

  async function onSubmit(data: ProfileFormInput) {
    if (id) {
      await updateProfile.mutateAsync({ id, data });
    } else {
      await createProfile.mutateAsync(data);
    }

    onSuccess();
  }

  const onError = (errors: FieldErrors<ProfileFormInput>) => {
    console.log("Erros:", errors);
  };

  const profilePermissionQuery = useProfilePermission(id);

  useEffect(() => {
    if (profilePermissionQuery.data) {
      form.setValue(
        "profilePermissions",
        profilePermissionQuery.data.map((v) => ({
          ...v,
          resourceId: String(v.resourceId),
          moduleId: String(v.moduleId),
        })),
      );
    }
  }, [profilePermissionQuery.data, form]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{id ? "Editar Perfil" : "Novo Perfil"}</CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit, onError)} className="space-y-6">
          <FormGrid>
            <FormInput form={form} name="name" label="Nome" placeholder="Digite o nome" />
          </FormGrid>

          <QueryState query={profilePermissionQuery} loadingMessage="Carregando Permissões...">
            <PageHeader title="Permissões" />

            <ProfilePermissionTable
              data={form.watch("profilePermissions")}
              onPermissionChange={(resourceId, checked) => {
                const permissions = form.getValues("profilePermissions");

                form.setValue(
                  "profilePermissions",
                  permissions.map((permission) =>
                    permission.resourceId === resourceId ? { ...permission, hasPermission: checked } : permission,
                  ),
                );
              }}
            />
          </QueryState>

          <FormActions onCancel={onCancel} loading={createProfile.isPending || updateProfile.isPending} />
        </form>
      </CardContent>
    </Card>
  );
}
