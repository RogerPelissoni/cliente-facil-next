"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormActions } from "@/src/shared/components/FormActions";
import { FormGrid } from "@/src/shared/components/FormGrid";
import { FormSelect } from "@/src/shared/components/FormSelect";
import { KeyValueType } from "@/src/shared/types/core.type";
import { toOptions } from "@/src/shared/utils/util";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { FieldErrors, useForm } from "react-hook-form";
import { useCreateClient, useUpdateClient } from "./client.hooks";
import { ClientFormInput, clientSchema, createClientDefaultValues, mapClientToForm } from "./client.schema";
import { ClientType } from "./client.types";

interface Props {
  client?: ClientType | null;
  people: KeyValueType;
  onCancel: () => void;
  onSuccess: () => void;
}

export function ClientForm({ client, people, onCancel, onSuccess }: Props) {
  const createClient = useCreateClient();
  const updateClient = useUpdateClient();

  const form = useForm<ClientFormInput>({
    resolver: zodResolver(clientSchema),
    defaultValues: createClientDefaultValues(),
  });

  useEffect(() => {
    if (client) {
      form.reset(mapClientToForm(client));
    } else {
      form.reset(createClientDefaultValues());
    }
  }, [client]);

  async function onSubmit(data: ClientFormInput) {
    if (client) {
      await updateClient.mutateAsync({
        id: client.id,
        data,
      });
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
        <CardTitle>{client ? "Editar Perfil" : "Novo Perfil"}</CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit, onError)} className="space-y-6">
          <FormGrid>
            <FormSelect form={form} name="personId" label="Pessoa" options={toOptions(people)} />
          </FormGrid>

          <FormActions onCancel={onCancel} loading={createClient.isPending || updateClient.isPending} />
        </form>
      </CardContent>
    </Card>
  );
}
