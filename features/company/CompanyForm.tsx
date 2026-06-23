"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { zodResolver } from "@hookform/resolvers/zod";

import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { useCreateCompany, useUpdateCompany } from "./company.api";

import { CompanyFormData, companySchema } from "./company.schema";

import { Company } from "./company.types";

import { FormActions } from "@/shared/form/FormActions";
import { FormInput } from "@/shared/form/FormInput";
import { FormSelect } from "@/shared/form/FormSelect";

interface Props {
  company?: Company | null;

  onCancel(): void;

  onSuccess(): void;
}

export function CompanyForm({ company, onCancel, onSuccess }: Props) {
  const createCompany = useCreateCompany();

  const updateCompany = useUpdateCompany();

  const form = useForm<CompanyFormData>({
    resolver: zodResolver(companySchema),

    defaultValues: {
      tradeName: "",
      legalName: "",
      document: "",
      status: "ACTIVE",
    },
  });

  useEffect(() => {
    if (!company) {
      form.reset({
        tradeName: "",
        legalName: "",
        document: "",
        status: "ACTIVE",
      });

      return;
    }

    form.reset({
      tradeName: company.tradeName,

      legalName: company.legalName,

      document: company.document,

      status: company.status,
    });
  }, [company, form]);

  async function onSubmit(data: CompanyFormData) {
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

  return (
    <Card>
      <CardHeader>
        <CardTitle>{company ? "Editar Empresa" : "Nova Empresa"}</CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormInput form={form} name="tradeName" label="Nome Fantasia" />

          <FormInput form={form} name="legalName" label="Razão Social" />

          <FormInput form={form} name="document" label="Documento" />

          <FormSelect
            form={form}
            name="status"
            label="Status"
            options={[
              {
                value: "ACTIVE",
                label: "Ativo",
              },
              {
                value: "INACTIVE",
                label: "Inativo",
              },
            ]}
          />

          <FormActions
            onCancel={onCancel}
            loading={createCompany.isPending || updateCompany.isPending}
          />
        </form>
      </CardContent>
    </Card>
  );
}
