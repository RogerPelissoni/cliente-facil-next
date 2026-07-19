"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormActions } from "@/src/shared/components/FormActions";
import { FormGrid } from "@/src/shared/components/FormGrid";
import { FormInput } from "@/src/shared/components/FormInput";
import { IdentifierType } from "@/src/shared/types/form.type";
import { createSubmitHandler, parseSubmit } from "@/src/shared/utils/form.util";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { FieldErrors, useForm } from "react-hook-form";
import { useCreateEventMessage, useEventMessage, useUpdateEventMessage } from "./eventMessage.hooks";
import { createEventMessageDefaultValues, EventMessageFormInput, EventMessageFormSchemaFields, eventMessageSchema, mapEventMessageToForm } from "./eventMessage.schema";

interface Props {
  id?: IdentifierType;
  eventId?: IdentifierType;
  onCancel: () => void;
  onSuccess: () => void;
}

export function EventMessageForm({ id, eventId, onCancel, onSuccess }: Props) {
  const createEventMessage = useCreateEventMessage();
  const updateEventMessage = useUpdateEventMessage();

  const query = useEventMessage(id);

  const form = useForm<EventMessageFormInput>({
    resolver: zodResolver(eventMessageSchema),
    defaultValues: createEventMessageDefaultValues(eventId),
  });

  useEffect(() => {
    if (id && query.data) {
      form.reset(mapEventMessageToForm(eventId, query.data));
      return;
    }

    form.reset(createEventMessageDefaultValues(eventId));
  }, [id, eventId, query.data, form]);

  async function onSubmit(payload: EventMessageFormSchemaFields) {
    if (id) {
      await updateEventMessage.mutateAsync({
        id,
        data: payload,
      });
    } else {
      await createEventMessage.mutateAsync(payload);
    }

    onSuccess();
  }

  const onError = (errors: FieldErrors<EventMessageFormInput>) => {
    console.log("Erros:", errors);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{id ? "Editar Mensagem" : "Nova Mensagem"}</CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={createSubmitHandler(form, parseSubmit(eventMessageSchema, onSubmit), onError)} className="space-y-6">
          <FormGrid>
            <FormInput form={form} name="dsMessage" label="Mensagem" />
          </FormGrid>

          <FormActions onCancel={onCancel} loading={createEventMessage.isPending || updateEventMessage.isPending} />
        </form>
      </CardContent>
    </Card>
  );
}
