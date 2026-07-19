"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EventStatusEnum } from "@/src/enum/eventStatus.enum";
import { EventTypeEnum } from "@/src/enum/eventType.enum";
import { ConfirmDialog } from "@/src/shared/components/ConfirmDialog";
import { FormActions } from "@/src/shared/components/FormActions";
import { FormDate } from "@/src/shared/components/FormDate";
import { FormDecimalInput } from "@/src/shared/components/FormDecimalInput";
import { FormGrid } from "@/src/shared/components/FormGrid";
import { FormInput } from "@/src/shared/components/FormInput";
import { FormSelect } from "@/src/shared/components/FormSelect";
import { KeyValueType } from "@/src/shared/types/core.type";
import { IdentifierType } from "@/src/shared/types/form.type";
import { createSubmitHandler, parseSubmit, resetForm } from "@/src/shared/utils/form.util";
import { toOptions } from "@/src/shared/utils/util";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { FieldErrors, useForm } from "react-hook-form";
import { toast } from "sonner";
import { EventMessageSection } from "../eventMessage/EventMessageSection";
import { useCreateEvent, useDeleteEvent, useEvent, useUpdateEvent } from "./event.hooks";
import { createEventDefaultValues, EventFormInput, EventFormSchemaFields, eventSchema, mapEventToForm } from "./event.schema";

export type EventFormInitialDataType = {
  id?: IdentifierType,
  start?: Date,
  end?: Date
}

interface Props {
  initialData: EventFormInitialDataType;
  kvClient: KeyValueType;
  kvProfessional: KeyValueType;
  onCancel: () => void;
  onSuccess: () => void;
}

export function EventForm({ initialData, kvClient, kvProfessional, onCancel, onSuccess }: Props) {
  const createEvent = useCreateEvent();
  const updateEvent = useUpdateEvent();
  const deleteEvent = useDeleteEvent();

  const query = useEvent(initialData.id);

  const form = useForm<EventFormInput>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      dtStart: initialData.start,
      dtEnd: initialData.end,
    },
  });

  useEffect(() => {
    resetForm({
      id: initialData.id,
      form,
      data: query.data,
      defaultValues: createEventDefaultValues(),
      mapToForm: mapEventToForm,
    });
  }, [initialData, query.data, form]);

  async function onSubmit(payload: EventFormSchemaFields) {
    if (initialData.id) {
      await updateEvent.mutateAsync({ id: initialData.id, data: payload });
    } else {
      await createEvent.mutateAsync(payload);
    }

    onSuccess();
  }

  const onError = (errors: FieldErrors<EventFormInput>) => {
    console.log("Erros:", errors);
  };

  const onConfirmDelete = () => {
    if (!initialData.id) return toast.error('Identificador não encontrado');
    deleteEvent.mutateAsync(initialData.id);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{initialData.id ? `Editar Evento #${initialData.id}` : "Novo Evento"}</CardTitle>
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

            {form.watch('tpEvent') === 'SERVICE' && (
              <>
                <FormSelect form={form} name="eventService.clientId" label="Cliente" options={toOptions(kvClient)} />
                <FormSelect form={form} name="eventService.professionalId" label="Profissional" options={toOptions(kvProfessional)} />
                <FormDecimalInput form={form} name="accountReceivable.vlTotal" label="Valor" />
                <FormDate form={form} name="accountReceivable.daDue" label="Vencimento" />
              </>
            )}
          </FormGrid>

          {initialData.id && <EventMessageSection eventId={initialData.id} />}

          <FormActions onCancel={onCancel} loading={createEvent.isPending || updateEvent.isPending} >

            {initialData.id && (
              <ConfirmDialog
                title="Atenção"
                description="Deseja remover o evento?"
                onConfirm={onConfirmDelete}
                trigger={
                  <Button variant="destructive">
                    Excluir
                  </Button>
                }
              />
            )}

          </FormActions>
        </form>
      </CardContent>
    </Card>
  );
}
