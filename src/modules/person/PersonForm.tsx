"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PersonGenderEnum } from "@/src/enum/personGender.enum";
import { FormActions } from "@/src/shared/components/FormActions";
import { FormGrid } from "@/src/shared/components/FormGrid";
import { FormInput } from "@/src/shared/components/FormInput";
import { FormSelect } from "@/src/shared/components/FormSelect";
import { BooleanEnum } from "@/src/shared/enum/boolean.enum";
import { toOptions } from "@/src/shared/utils/util";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { FieldErrors, useForm } from "react-hook-form";
import { useCreatePerson, useUpdatePerson } from "./person.hooks";
import { createPersonDefaultValues, mapPersonToForm, PersonFormInput, personSchema } from "./person.schema";
import { PersonType } from "./person.types";

interface Props {
  person?: PersonType | null;
  onCancel: () => void;
  onSuccess: () => void;
}

export function PersonForm({ person, onCancel, onSuccess }: Props) {
  const createPerson = useCreatePerson();
  const updatePerson = useUpdatePerson();

  const form = useForm<PersonFormInput>({
    resolver: zodResolver(personSchema),
    defaultValues: createPersonDefaultValues(),
  });

  useEffect(() => {
    if (person) {
      form.reset(mapPersonToForm(person));
    } else {
      form.reset(createPersonDefaultValues());
    }
  }, [person]);

  async function onSubmit(data: PersonFormInput) {
    if (person) {
      await updatePerson.mutateAsync({
        id: person.id,
        data,
      });
    } else {
      await createPerson.mutateAsync(data);
    }

    onSuccess();
  }

  const onError = (errors: FieldErrors<PersonFormInput>) => {
    console.log("Erros:", errors);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{person ? "Editar Perfil" : "Novo Perfil"}</CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit, onError)} className="space-y-6">
          <FormGrid>
            <FormInput form={form} name="name" label="Nome" placeholder="Digite o nome" />
            <FormInput form={form} name="dsDocument" label="Documento" placeholder="Digite o CPF ou CNPJ" />

            <FormSelect
              form={form}
              name="tpGender"
              label="Gênero"
              placeholder="Selecione o gênero"
              options={toOptions(PersonGenderEnum)}
            />

            <FormSelect form={form} name="flActive" label="Ativo" options={toOptions(BooleanEnum)} />
          </FormGrid>

          <FormActions onCancel={onCancel} loading={createPerson.isPending || updatePerson.isPending} />
        </form>
      </CardContent>
    </Card>
  );
}
