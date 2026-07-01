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
  createPersonMailDefaultValues,
  mapPersonMailToForm,
  PersonMailFormInput,
  personMailSchema,
} from "./personMail.schema";
import { PersonMailType } from "./personMail.type";

interface Props {
  personMail?: PersonMailType | null;
  onCancel(): void;
  onSubmit(data: PersonMailFormInput): void;
}

export function PersonMailForm({ personMail, onCancel, onSubmit }: Props) {
  const form = useForm<PersonMailFormInput>({
    resolver: zodResolver(personMailSchema),
    defaultValues: createPersonMailDefaultValues(),
  });

  useEffect(() => {
    if (personMail) {
      form.reset(mapPersonMailToForm(personMail));
    } else {
      form.reset(createPersonMailDefaultValues());
    }
  }, [personMail]);

  const onError = (errors: FieldErrors<PersonMailFormInput>) => {
    console.log("Erros:", errors);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{personMail ? "Editar Email" : "Novo Email"}</CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={createSubmitHandler(form, onSubmit, onError)} className="space-y-6">
          <FormGrid>
            <FormInput form={form} name="dsMail" label="Email" placeholder="Digite o email" />
          </FormGrid>

          <FormActions onCancel={onCancel} />
        </form>
      </CardContent>
    </Card>
  );
}
