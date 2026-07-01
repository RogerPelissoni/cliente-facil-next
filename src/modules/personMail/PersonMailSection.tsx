import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CoreModal } from "@/src/shared/components/CoreModal";
import { useState } from "react";
import { useFieldArray, UseFormReturn } from "react-hook-form";
import { PersonFormInput } from "../person/person.schema";
import { PersonMailFormInput } from "./personMail.schema";
import { PersonMailType } from "./personMail.type";
import { PersonMailForm } from "./PersonMailForm";
import { PersonMailTable } from "./PersonMailTable";

interface Props {
  form: UseFormReturn<PersonFormInput>;
}

export function PersonMailSection({ form }: Props) {
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [editing, setEditing] = useState<{
    index: number;
    mail: PersonMailType;
  }>();

  const {
    fields: mails,
    append: addMail,
    update: updateMail,
    remove: removeMail,
  } = useFieldArray({
    control: form.control,
    name: "personMails",
  });

  const handleCreate = () => {
    setEditing(undefined);
    setIsOpenForm(true);
  };

  const handleEdit = (mail: PersonMailType, index: number) => {
    setEditing({ index, mail });
    setIsOpenForm(true);
  };

  const handleDelete = (index: number) => {
    removeMail(index);
  };

  const handleSubmit = (data: PersonMailFormInput) => {
    if (!editing) {
      addMail(data);
    } else {
      updateMail(editing.index, data);
    }

    setIsOpenForm(false);
  };

  return (
    <>
      <Card>
        <CardHeader className="flex justify-between">
          <CardTitle>Emails</CardTitle>
          <Button type="button" onClick={handleCreate}>
            Adicionar Registro
          </Button>
        </CardHeader>

        <CardContent>
          <PersonMailTable data={mails} onEdit={handleEdit} onDelete={handleDelete} />
        </CardContent>
      </Card>

      <CoreModal open={isOpenForm} title="Novo Email" size="lg" onOpenChange={setIsOpenForm}>
        <PersonMailForm personMail={editing?.mail} onCancel={() => setIsOpenForm(false)} onSubmit={handleSubmit} />
      </CoreModal>
    </>
  );
}
