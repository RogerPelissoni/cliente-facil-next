"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PersonGenderEnum } from "@/src/enum/personGender.enum";
import { CoreModal } from "@/src/shared/components/CoreModal";
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
import { useEffect, useState } from "react";
import { FieldErrors, useForm } from "react-hook-form";
import { PersonAddressFormInput } from "../personAddress/personAddress.schema";
import { PersonAddressType } from "../personAddress/personAddress.type";
import { PersonAddressForm } from "../personAddress/PersonAddressForm";
import { PersonAddressTable } from "../personAddress/PersonAddressTable";
import { useCreatePerson, usePerson, useUpdatePerson } from "./person.hooks";
import { createPersonDefaultValues, mapPersonToForm, PersonFormInput, personSchema } from "./person.schema";

interface Props {
  id?: IdentifierType;
  onCancel(): void;
  onSuccess(): void;
}

export function PersonForm({ id, onCancel, onSuccess }: Props) {
  const [openPersonAddressForm, setOpenPersonAddressForm] = useState(false);

  const [personAddressTemp, setPersonAddressTemp] = useState<PersonAddressType>();
  const [personAddressTempIndex, setPersonAddressTempIndex] = useState<number>();

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

  const handleCreatePersonAddressForm = () => {
    setPersonAddressTemp(undefined);
    setPersonAddressTempIndex(undefined);
    setOpenPersonAddressForm(true);
  };

  const handleEditPersonAddressForm = (address: PersonAddressType, rowIndex: number) => {
    setPersonAddressTemp(address);
    setPersonAddressTempIndex(rowIndex);
    setOpenPersonAddressForm(true);
  };

  const handleDeletePersonAddressForm = () => {
    console.log("remove personAddress from personForm");
  };

  const handleSubmitPersonAddressForm = (formData: PersonAddressFormInput) => {
    const addresses = form.getValues("personAddresses");

    const updatedAddresses =
      personAddressTempIndex === undefined
        ? [...addresses, formData]
        : addresses.map((address, i) => (i === personAddressTempIndex ? formData : address));

    form.setValue("personAddresses", updatedAddresses);
    setOpenPersonAddressForm(false);
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

              <Card>
                <CardHeader className="flex justify-between">
                  <CardTitle>Endereços</CardTitle>
                  <Button type="button" onClick={handleCreatePersonAddressForm}>
                    Adicionar Registro
                  </Button>
                </CardHeader>

                <CardContent>
                  <PersonAddressTable
                    data={form.watch("personAddresses")}
                    onEdit={handleEditPersonAddressForm}
                    onDelete={handleDeletePersonAddressForm}
                  />
                </CardContent>
              </Card>

              <FormActions onCancel={onCancel} loading={createPerson.isPending || updatePerson.isPending} />
            </form>
          </CardContent>
        </Card>
      </QueryState>

      <CoreModal open={openPersonAddressForm} title="Novo Endereço" size="lg" onOpenChange={setOpenPersonAddressForm}>
        <PersonAddressForm
          personAddress={personAddressTemp}
          onCancel={() => setOpenPersonAddressForm(false)}
          onSubmit={handleSubmitPersonAddressForm}
        />
      </CoreModal>
    </>
  );
}
