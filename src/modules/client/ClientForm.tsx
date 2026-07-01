"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormActions } from "@/src/shared/components/FormActions";
import { FormGrid } from "@/src/shared/components/FormGrid";
import { FormSelect } from "@/src/shared/components/FormSelect";
import { KeyValueType } from "@/src/shared/types/core.type";
import { IdentifierType } from "@/src/shared/types/form.type";
import { createSubmitHandler, resetForm } from "@/src/shared/utils/form.util";
import { toOptions } from "@/src/shared/utils/util";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { FieldErrors, useForm } from "react-hook-form";
import { useClient, useCreateClient, useUpdateClient } from "./client.hooks";
import { ClientFormInput, clientSchema, createClientDefaultValues, mapClientToForm } from "./client.schema";

interface Props {
  id?: IdentifierType;
  people: KeyValueType;
  onCancel: () => void;
  onSuccess: () => void;
}

export function ClientForm({ id, people, onCancel, onSuccess }: Props) {
  const createClient = useCreateClient();
  const updateClient = useUpdateClient();

  const query = useClient(id);

  const form = useForm<ClientFormInput>({
    resolver: zodResolver(clientSchema),
    defaultValues: createClientDefaultValues(),
  });

  useEffect(() => {
    resetForm({
      id,
      form,
      data: query.data,
      defaultValues: createClientDefaultValues(),
      mapToForm: mapClientToForm,
    });
  }, [id, query.data, form]);

  async function onSubmit(data: ClientFormInput) {
    if (id) {
      await updateClient.mutateAsync({ id, data });
    } else {
      await createClient.mutateAsync(data);
    }

    onSuccess();
  }

  const onError = (errors: FieldErrors<ClientFormInput>) => {
    console.log("Erros:", errors);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{id ? "Editar Cliente" : "Novo Cliente"}</CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={createSubmitHandler(form, onSubmit, onError)} className="space-y-6">
          <FormGrid>
            <FormSelect form={form} name="personId" label="Pessoa" options={toOptions(people)} />
          </FormGrid>

          <FormActions onCancel={onCancel} loading={createClient.isPending || updateClient.isPending} />
        </form>
      </CardContent>
    </Card>
  );
}
