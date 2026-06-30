"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormActions } from "@/src/shared/components/FormActions";
import { FormGrid } from "@/src/shared/components/FormGrid";
import { FormInput } from "@/src/shared/components/FormInput";
import { FormSelect } from "@/src/shared/components/FormSelect";
import { BooleanEnum } from "@/src/shared/enum/boolean.enum";
import { toOptions } from "@/src/shared/utils/util";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { FieldErrors, useForm } from "react-hook-form";
import {
  createPersonAddressDefaultValues,
  mapPersonAddressToForm,
  PersonAddressFormInput,
  personAddressSchema,
} from "./personAddress.schema";
import { PersonAddressType } from "./personAddress.type";

interface Props {
  personAddress?: PersonAddressType | null;
  onCancel(): void;
  onSubmit(data: PersonAddressFormInput): void;
}

export function PersonAddressForm({ personAddress, onCancel, onSubmit }: Props) {
  const form = useForm<PersonAddressFormInput>({
    resolver: zodResolver(personAddressSchema),
    defaultValues: createPersonAddressDefaultValues(),
  });

  useEffect(() => {
    if (personAddress) {
      form.reset(mapPersonAddressToForm(personAddress));
    } else {
      form.reset(createPersonAddressDefaultValues());
    }
  }, [personAddress]);

  const onError = (errors: FieldErrors<PersonAddressFormInput>) => {
    console.log("Erros:", errors);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{personAddress ? "Editar Endereço" : "Novo Endereço"}</CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit, onError)} className="space-y-6">
          <FormGrid>
            <FormInput form={form} name="dsStreet" label="Rua" placeholder="Digite a rua" />
            <FormInput form={form} name="dsNumber" label="Número" placeholder="Digite o número" />
            <FormInput form={form} name="dsComplement" label="Complemento" placeholder="Digite o complemento" />
            <FormInput form={form} name="dsDistrict" label="Bairro" placeholder="Digite o bairro" />
            <FormInput form={form} name="dsCity" label="Cidade" placeholder="Digite a cidade" />
            <FormInput form={form} name="dsState" label="UF" placeholder="Ex.: RS" />
            <FormInput form={form} name="dsZipCode" label="CEP" placeholder="00000-000" />
            <FormSelect form={form} name="flMain" label="Principal" options={toOptions(BooleanEnum)} />
          </FormGrid>

          <FormActions onCancel={onCancel} />
        </form>
      </CardContent>
    </Card>
  );
}
