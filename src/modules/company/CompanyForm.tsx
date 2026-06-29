"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormActions } from "@/src/shared/components/FormActions";
import { FormGrid } from "@/src/shared/components/FormGrid";
import { FormInput } from "@/src/shared/components/FormInput";
import { FormSelect } from "@/src/shared/components/FormSelect";
import { KeyValueType } from "@/src/shared/types/core.type";
import { toOptions } from "@/src/shared/utils/util";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { FieldErrors, useForm } from "react-hook-form";
import { useCreateCompany, useUpdateCompany } from "./company.hooks";
import { CompanyFormInput, companySchema, createCompanyDefaultValues, mapCompanyToForm } from "./company.schema";
import { CompanyType } from "./company.types";

interface Props {
  company?: CompanyType | null;
  people: KeyValueType;
  onCancel: () => void;
  onSuccess: () => void;
}

export function CompanyForm({ company, people, onCancel, onSuccess }: Props) {
  const createCompany = useCreateCompany();
  const updateCompany = useUpdateCompany();

  const form = useForm<CompanyFormInput>({
    resolver: zodResolver(companySchema),
    defaultValues: createCompanyDefaultValues(),
  });

  useEffect(() => {
    if (company) {
      form.reset(mapCompanyToForm(company));
    } else {
      form.reset(createCompanyDefaultValues());
    }
  }, [company]);

  async function onSubmit(data: CompanyFormInput) {
    if (company) {
      await updateCompany.mutateAsync({
        id: company.id,
        data,
      });
    } else {
      await createCompany.mutateAsync(data);
    }

    onSuccess();
  }

  const onError = (errors: FieldErrors<CompanyFormInput>) => {
    console.log("Erros:", errors);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{company ? "Editar Empresa" : "Novo Empresa"}</CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit, onError)} className="space-y-6">
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
