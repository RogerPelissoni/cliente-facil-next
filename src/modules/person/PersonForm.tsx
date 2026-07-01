"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PersonGenderEnum } from "@/src/enum/personGender.enum";
import { FormActions } from "@/src/shared/components/FormActions";
import { FormGrid } from "@/src/shared/components/FormGrid";
import { FormInput } from "@/src/shared/components/FormInput";
import { FormSelect } from "@/src/shared/components/FormSelect";
import { QueryState } from "@/src/shared/components/QueryState";
import { BooleanEnum } from "@/src/shared/enum/boolean.enum";
import { IdentifierType } from "@/src/shared/types/form.type";
import { createSubmitHandler } from "@/src/shared/utils/form.util";
import { toOptions } from "@/src/shared/utils/util";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { FieldErrors, useForm } from "react-hook-form";
import { PersonAddressSection } from "../personAddress/PersonAddressSection";
import { PersonMailSection } from "../personMail/PersonMailSection";
import { PersonPhoneSection } from "../personPhone/PersonPhoneSection";
import { useCreatePerson, usePerson, useUpdatePerson } from "./person.hooks";
import { createPersonDefaultValues, mapPersonToForm, PersonFormInput, personSchema } from "./person.schema";

interface Props {
  id?: IdentifierType;
  onCancel(): void;
  onSuccess(): void;
}

export function PersonForm({ id, onCancel, onSuccess }: Props) {
  const createPerson = useCreatePerson();
  const updatePerson = useUpdatePerson();

  const query = usePerson(id);

  const form = useForm<PersonFormInput>({
    resolver: zodResolver(personSchema),
    defaultValues: createPersonDefaultValues(),
  });

  useEffect(() => {
    if (!id) {
      form.reset(createPersonDefaultValues());
      return;
    }

    if (query.data) {
      form.reset(mapPersonToForm(query.data));
    }
  }, [id, query.data, form]);

  async function onSubmit(data: PersonFormInput) {
    if (id) {
      await updatePerson.mutateAsync({ id, data });
    } else {
      await createPerson.mutateAsync(data);
    }

    onSuccess();
  }

  const onError = (errors: FieldErrors<PersonFormInput>) => {
    console.log(errors);
  };

  return (
    <>
      <QueryState query={query}>
        <Card>
          <CardHeader>
            <CardTitle>{id ? "Editar Perfil" : "Novo Perfil"}</CardTitle>
          </CardHeader>

          <CardContent>
            <form onSubmit={createSubmitHandler(form, onSubmit, onError)} className="space-y-6">
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

              <PersonAddressSection form={form} />
              <PersonMailSection form={form} />
              <PersonPhoneSection form={form} />

              <FormActions onCancel={onCancel} loading={createPerson.isPending || updatePerson.isPending} />
            </form>
          </CardContent>
        </Card>
      </QueryState>
    </>
  );
}
