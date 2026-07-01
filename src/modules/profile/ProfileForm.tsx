"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormActions } from "@/src/shared/components/FormActions";
import { FormGrid } from "@/src/shared/components/FormGrid";
import { FormInput } from "@/src/shared/components/FormInput";
import { QueryState } from "@/src/shared/components/QueryState";
import { PageHeader } from "@/src/shared/layout/PageHeader";
import { IdentifierType } from "@/src/shared/types/form.type";
import { createSubmitHandler, parseSubmit, resetForm } from "@/src/shared/utils/form.util";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { FieldErrors, useForm } from "react-hook-form";
import { ProfilePermissionTable } from "../profilePermission/ProfilePermissionTable";
import { mapProfilePermissionToForm } from "../profilePermission/profilePermission.schema";
import { useCreateProfile, useProfile, useProfilePermission, useUpdateProfile } from "./profile.hooks";
import {
  createProfileDefaultValues,
  mapProfileToForm,
  ProfileFormInput,
  ProfileFormSchemaFields,
  profileSchema,
} from "./profile.schema";

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
    resetForm({
      id,
      form,
      data: query.data,
      defaultValues: createProfileDefaultValues(),
      mapToForm: mapProfileToForm,
    });
  }, [id, query.data, form]);

  async function onSubmit(payload: ProfileFormSchemaFields) {
    if (id) {
      await updateProfile.mutateAsync({ id, data: payload });
    } else {
      await createProfile.mutateAsync(payload);
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
        profilePermissionQuery.data.map(mapProfilePermissionToForm),
      );
    }
  }, [profilePermissionQuery.data, form]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{id ? "Editar Perfil" : "Novo Perfil"}</CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={createSubmitHandler(form, parseSubmit(profileSchema, onSubmit), onError)} className="space-y-6">
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
