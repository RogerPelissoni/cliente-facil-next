"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EventStatusEnum } from "@/src/enum/eventStatus.enum";
import { EventTypeEnum } from "@/src/enum/eventType.enum";
import { FormActions } from "@/src/shared/components/FormActions";
import { FormDate } from "@/src/shared/components/FormDate";
import { FormGrid } from "@/src/shared/components/FormGrid";
import { FormInput } from "@/src/shared/components/FormInput";
import { FormSelect } from "@/src/shared/components/FormSelect";
import { IdentifierType } from "@/src/shared/types/form.type";
import { createSubmitHandler, parseSubmit, resetForm } from "@/src/shared/utils/form.util";
import { toOptions } from "@/src/shared/utils/util";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { FieldErrors, useForm } from "react-hook-form";
import { useCreateEvent, useEvent, useUpdateEvent } from "./event.hooks";
import { createEventDefaultValues, EventFormInput, EventFormSchemaFields, eventSchema, mapEventToForm } from "./event.schema";

interface Props {
  id?: IdentifierType;
  onCancel: () => void;
  onSuccess: () => void;
}

export function EventForm({ id, onCancel, onSuccess }: Props) {
  const createEvent = useCreateEvent();
  const updateEvent = useUpdateEvent();

  const query = useEvent(id);

  const form = useForm<EventFormInput>({
    resolver: zodResolver(eventSchema),
    defaultValues: createEventDefaultValues(),
  });

  useEffect(() => {
    resetForm({
      id,
      form,
      data: query.data,
      defaultValues: createEventDefaultValues(),
      mapToForm: mapEventToForm,
    });
  }, [id, query.data, form]);

  async function onSubmit(payload: EventFormSchemaFields) {
    if (id) {
      await updateEvent.mutateAsync({ id, data: payload });
    } else {
      await createEvent.mutateAsync(payload);
    }

    onSuccess();
  }

  const onError = (errors: FieldErrors<EventFormInput>) => {
    console.log("Erros:", errors);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{id ? `Editar Evento #${id}` : "Novo Evento"}</CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={createSubmitHandler(form, parseSubmit(eventSchema, onSubmit), onError)} className="space-y-6">
          <FormGrid>
            <FormInput form={form} name="dsTitle" label="Título" />
            <FormInput form={form} name="dsDescription" label="Descrição" />
            <FormDate form={form} name="dtStart" label="Data de Início" />
            <FormDate form={form} name="dtEnd" label="Data de Término" />
            <FormSelect form={form} name="tpStatus" label="Status" options={toOptions(EventStatusEnum)} />
            <FormSelect form={form} name="tpEvent" label="Tipo de Evento" options={toOptions(EventTypeEnum)} />
          </FormGrid>

          <FormActions onCancel={onCancel} loading={createEvent.isPending || updateEvent.isPending} />
        </form>
      </CardContent>
    </Card>
  );
}
