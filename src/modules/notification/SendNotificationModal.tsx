"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { CoreModal } from "@/src/shared/components/CoreModal";
import { IdentifierType } from "@/src/shared/types/form.type";
import { useUsersKeyValue } from "@/src/modules/user/user.hooks";
import { useState } from "react";
import { useSendNotification } from "./notification.hooks";
import { NotificationTypeEnum } from "./notification.type";

interface Props {
  open: boolean;
  onOpenChange(open: boolean): void;
}

const typeOptions: { value: NotificationTypeEnum; label: string }[] = [
  { value: "INFO", label: "Informativo" },
  { value: "SUCCESS", label: "Sucesso" },
  { value: "WARNING", label: "Alerta" },
  { value: "ERROR", label: "Erro" },
];

const emptyForm = { title: "", message: "", type: "INFO" as NotificationTypeEnum };

export function SendNotificationModal({ open, onOpenChange }: Props) {
  const { data: users = {} } = useUsersKeyValue();
  const { mutate: send, isPending } = useSendNotification();

  const [selectedUserIds, setSelectedUserIds] = useState<IdentifierType[]>([]);
  const [form, setForm] = useState(emptyForm);

  function toggleUser(userId: IdentifierType, checked: boolean) {
    setSelectedUserIds((current) => (checked ? [...current, userId] : current.filter((id) => id !== userId)));
  }

  function handleOpenChange(value: boolean) {
    if (!value) {
      setSelectedUserIds([]);
      setForm(emptyForm);
    }

    onOpenChange(value);
  }

  function handleSubmit() {
    send(
      { userIds: selectedUserIds, title: form.title, message: form.message, type: form.type },
      { onSuccess: () => handleOpenChange(false) },
    );
  }

  const canSubmit = selectedUserIds.length > 0 && form.title.trim() !== "" && form.message.trim() !== "";

  return (
    <CoreModal
      open={open}
      title="Enviar notificação"
      description="Escolha os destinatários e o conteúdo da notificação"
      size="sm"
      loading={isPending}
      onOpenChange={handleOpenChange}
    >
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium">Destinatários</span>

          <ul className="flex max-h-40 flex-col gap-1 overflow-y-auto rounded-md border p-2">
            {Object.entries(users).map(([userId, name]) => (
              <li key={userId} className="flex items-center justify-between gap-2 py-1 text-sm">
                <span>{name}</span>
                <Switch
                  checked={selectedUserIds.includes(userId)}
                  onCheckedChange={(checked) => toggleUser(userId, checked)}
                />
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium">Tipo</span>

          <Select value={form.type} onValueChange={(value) => setForm((current) => ({ ...current, type: value as NotificationTypeEnum }))}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              {typeOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium">Título</span>
          <Input value={form.title} onChange={(e) => setForm((current) => ({ ...current, title: e.target.value }))} />
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium">Mensagem</span>
          <textarea
            className="min-h-20 w-full rounded-lg border border-input bg-transparent px-2.5 py-1.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 dark:bg-input/30"
            value={form.message}
            onChange={(e) => setForm((current) => ({ ...current, message: e.target.value }))}
          />
        </div>

        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={() => handleOpenChange(false)}>
            Cancelar
          </Button>
          <Button type="button" disabled={!canSubmit || isPending} onClick={handleSubmit}>
            Enviar
          </Button>
        </div>
      </div>
    </CoreModal>
  );
}
