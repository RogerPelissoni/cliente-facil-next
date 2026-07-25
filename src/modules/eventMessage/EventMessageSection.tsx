import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CoreModal } from "@/src/shared/components/CoreModal";
import { IdentifierType } from "@/src/shared/types/form.type";
import { useState } from "react";
import { useDeleteEventMessage, useEventMessagesByEvent } from "./eventMessage.hooks";
import { EventMessageType } from "./eventMessage.type";
import { EventMessageForm } from "./EventMessageForm";
import { EventMessageTable } from "./EventMessageTable";

interface Props {
  eventId?: IdentifierType;
}

export function EventMessageSection({ eventId }: Props) {
  const deleteEventMessage = useDeleteEventMessage();

  const [isOpenForm, setIsOpenForm] = useState(false);
  const [editing, setEditing] = useState<{
    id: IdentifierType;
  }>();

  const eventMessages = useEventMessagesByEvent(eventId);

  const handleCreate = () => {
    setEditing(undefined);
    setIsOpenForm(true);
  };

  const handleEdit = (eventMessage: EventMessageType) => {
    setEditing({ id: eventMessage.id });
    setIsOpenForm(true);
  };

  const handleDelete = (eventMessage: EventMessageType) => deleteEventMessage.mutateAsync(eventMessage.id);

  if (!eventMessages.data) {
    return (<>Carregando...</>)
  }

  return (
    <>
      <Card>
        <CardHeader className="flex justify-between">
          <CardTitle>Mensagens</CardTitle>
          <Button type="button" onClick={handleCreate}>
            Adicionar Registro
          </Button>
        </CardHeader>

        <CardContent>
          <EventMessageTable data={eventMessages.data} onEdit={handleEdit} onDelete={handleDelete} />
        </CardContent>
      </Card>

      <CoreModal open={isOpenForm} title="Nova Mensagem" size="lg" onOpenChange={setIsOpenForm}>
        <EventMessageForm
          id={editing?.id}
          eventId={eventId}
          onCancel={() => setIsOpenForm(false)}
          onSuccess={() => setIsOpenForm(false)}
        />
      </CoreModal>
    </>
  );
}
