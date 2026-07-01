"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormActions } from "@/src/shared/components/FormActions";
import { FormGrid } from "@/src/shared/components/FormGrid";
import { FormInput } from "@/src/shared/components/FormInput";
import { createSubmitHandler } from "@/src/shared/utils/form.util";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { FieldErrors, useForm } from "react-hook-form";
import {
  createPersonPhoneDefaultValues,
  mapPersonPhoneToForm,
  PersonPhoneFormInput,
  personPhoneSchema,
} from "./personPhone.schema";
import { PersonPhoneType } from "./personPhone.type";

interface Props {
  personPhone?: PersonPhoneType | null;
  onCancel(): void;
  onSubmit(data: PersonPhoneFormInput): void;
}

export function PersonPhoneForm({ personPhone, onCancel, onSubmit }: Props) {
  const form = useForm<PersonPhoneFormInput>({
    resolver: zodResolver(personPhoneSchema),
    defaultValues: createPersonPhoneDefaultValues(),
  });

  useEffect(() => {
    if (personPhone) {
      form.reset(mapPersonPhoneToForm(personPhone));
    } else {
      form.reset(createPersonPhoneDefaultValues());
    }
  }, [personPhone]);

  const onError = (errors: FieldErrors<PersonPhoneFormInput>) => {
    console.log("Erros:", errors);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{personPhone ? "Editar Telefone" : "Novo Telefone"}</CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={createSubmitHandler(form, onSubmit, onError)} className="space-y-6">
          <FormGrid>
            <FormInput form={form} name="dsPhone" label="Telefone" placeholder="Digite o telefone" />
          </FormGrid>

          <FormActions onCancel={onCancel} />
        </form>
      </CardContent>
    </Card>
  );
}
