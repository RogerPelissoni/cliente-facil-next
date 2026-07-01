import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CoreModal } from "@/src/shared/components/CoreModal";
import { useState } from "react";
import { useFieldArray, UseFormReturn } from "react-hook-form";
import { PersonFormInput } from "../person/person.schema";
import { PersonPhoneFormInput } from "./personPhone.schema";
import { PersonPhoneType } from "./personPhone.type";
import { PersonPhoneForm } from "./PersonPhoneForm";
import { PersonPhoneTable } from "./PersonPhoneTable";

interface Props {
  form: UseFormReturn<PersonFormInput>;
}

export function PersonPhoneSection({ form }: Props) {
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [editing, setEditing] = useState<{
    index: number;
    phone: PersonPhoneType;
  }>();

  const {
    fields: phones,
    append: addPhone,
    update: updatePhone,
    remove: removePhone,
  } = useFieldArray({
    control: form.control,
    name: "personPhones",
  });

  const handleCreate = () => {
    setEditing(undefined);
    setIsOpenForm(true);
  };

  const handleEdit = (phone: PersonPhoneType, index: number) => {
    setEditing({ index, phone });
    setIsOpenForm(true);
  };

  const handleDelete = (index: number) => {
    removePhone(index);
  };

  const handleSubmit = (data: PersonPhoneFormInput) => {
    if (!editing) {
      addPhone(data);
    } else {
      updatePhone(editing.index, data);
    }

    setIsOpenForm(false);
  };

  return (
    <>
      <Card>
        <CardHeader className="flex justify-between">
          <CardTitle>Telefones</CardTitle>
          <Button type="button" onClick={handleCreate}>
            Adicionar Registro
          </Button>
        </CardHeader>

        <CardContent>
          <PersonPhoneTable data={phones} onEdit={handleEdit} onDelete={handleDelete} />
        </CardContent>
      </Card>

      <CoreModal open={isOpenForm} title="Novo Telefone" size="lg" onOpenChange={setIsOpenForm}>
        <PersonPhoneForm personPhone={editing?.phone} onCancel={() => setIsOpenForm(false)} onSubmit={handleSubmit} />
      </CoreModal>
    </>
  );
}
