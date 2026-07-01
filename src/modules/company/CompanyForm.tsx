"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormActions } from "@/src/shared/components/FormActions";
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
import { useCompany, useCreateCompany, useUpdateCompany } from "./company.hooks";
import {
  CompanyFormInput,
  CompanyFormSchemaFields,
  companySchema,
  createCompanyDefaultValues,
  mapCompanyToForm,
} from "./company.schema";

interface Props {
  id?: IdentifierType;
  people: KeyValueType;
  onCancel: () => void;
  onSuccess: () => void;
}

export function CompanyForm({ id, people, onCancel, onSuccess }: Props) {
  const createCompany = useCreateCompany();
  const updateCompany = useUpdateCompany();

  const query = useCompany(id);

  const form = useForm<CompanyFormInput>({
    resolver: zodResolver(companySchema),
    defaultValues: createCompanyDefaultValues(),
  });

  useEffect(() => {
    resetForm({
      id,
      form,
      data: query.data,
      defaultValues: createCompanyDefaultValues(),
      mapToForm: mapCompanyToForm,
    });
  }, [id, query.data, form]);

  async function onSubmit(payload: CompanyFormSchemaFields) {
    if (id) {
      await updateCompany.mutateAsync({ id, data: payload });
    } else {
      await createCompany.mutateAsync(payload);
    }

    onSuccess();
  }

  const onError = (errors: FieldErrors<CompanyFormInput>) => {
    console.log("Erros:", errors);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{id ? "Editar Empresa" : "Novo Empresa"}</CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={createSubmitHandler(form, parseSubmit(companySchema, onSubmit), onError)} className="space-y-6">
          <FormGrid>
            <FormInput form={form} name="name" label="Nome" placeholder="Digite o nome" />
            <FormSelect form={form} name="personId" label="Pessoa" options={toOptions(people)} />
          </FormGrid>

          <FormActions onCancel={onCancel} loading={createCompany.isPending || updateCompany.isPending} />
        </form>
      </CardContent>
    </Card>
  );
}
