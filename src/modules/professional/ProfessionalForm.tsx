"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormActions } from "@/src/shared/components/FormActions";
import { FormGrid } from "@/src/shared/components/FormGrid";
import { FormSelect } from "@/src/shared/components/FormSelect";
import { KeyValueType } from "@/src/shared/types/core.type";
import { toOptions } from "@/src/shared/utils/util";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { FieldErrors, useForm } from "react-hook-form";
import { useCreateProfessional, useUpdateProfessional } from "./professional.hooks";
import { createProfessionalDefaultValues, mapProfessionalToForm, ProfessionalFormInput, professionalSchema } from "./professional.schema";
import { ProfessionalType } from "./professional.types";

interface Props {
  professional?: ProfessionalType | null;
  people: KeyValueType;
  onCancel: () => void;
  onSuccess: () => void;
}

export function ProfessionalForm({ professional, people, onCancel, onSuccess }: Props) {
  const createProfessional = useCreateProfessional();
  const updateProfessional = useUpdateProfessional();

  const form = useForm<ProfessionalFormInput>({
    resolver: zodResolver(professionalSchema),
    defaultValues: createProfessionalDefaultValues(),
  });

  useEffect(() => {
    if (professional) {
      form.reset(mapProfessionalToForm(professional));
    } else {
      form.reset(createProfessionalDefaultValues());
    }
  }, [professional]);

  async function onSubmit(data: ProfessionalFormInput) {
    if (professional) {
      await updateProfessional.mutateAsync({
        id: professional.id,
        data,
      });
    } else {
      await createProfessional.mutateAsync(data);
    }

    onSuccess();
  }

  const onError = (errors: FieldErrors<ProfessionalFormInput>) => {
    console.log("Erros:", errors);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{professional ? "Editar Perfil" : "Novo Perfil"}</CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit, onError)} className="space-y-6">
          <FormGrid>
            <FormSelect form={form} name="personId" label="Pessoa" options={toOptions(people)} />
          </FormGrid>

          <FormActions onCancel={onCancel} loading={createProfessional.isPending || updateProfessional.isPending} />
        </form>
      </CardContent>
    </Card>
  );
}
