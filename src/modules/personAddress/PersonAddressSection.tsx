import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CoreModal } from "@/src/shared/components/CoreModal";
import { useState } from "react";
import { useFieldArray, UseFormReturn } from "react-hook-form";
import { PersonFormInput } from "../person/person.schema";
import { PersonAddressFormSchemaFields, personAddressSchema } from "./personAddress.schema";
import { PersonAddressType } from "./personAddress.type";
import { PersonAddressForm } from "./PersonAddressForm";
import { PersonAddressTable } from "./PersonAddressTable";

interface Props {
  form: UseFormReturn<PersonFormInput>;
}

export function PersonAddressSection({ form }: Props) {
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [editing, setEditing] = useState<{
    index: number;
    address: PersonAddressType;
  }>();

  const {
    fields: addresses,
    append: addAddress,
    update: updateAddress,
    remove: removeAddress,
  } = useFieldArray({
    control: form.control,
    name: "personAddresses",
    keyName: "fieldId",
  });

  const addressRows = addresses.map((address) => personAddressSchema.parse(address));

  const handleCreate = () => {
    setEditing(undefined);
    setIsOpenForm(true);
  };

  const handleEdit = (address: PersonAddressType, index: number) => {
    setEditing({ index, address });
    setIsOpenForm(true);
  };

  const handleDelete = (index: number) => {
    removeAddress(index);
  };

  const handleSubmit = (data: PersonAddressFormSchemaFields) => {
    if (!editing) {
      addAddress(data);
    } else {
      updateAddress(editing.index, data);
    }

    setIsOpenForm(false);
  };

  return (
    <>
      <Card>
        <CardHeader className="flex justify-between">
          <CardTitle>Endereços</CardTitle>
          <Button type="button" onClick={handleCreate}>
            Adicionar Registro
          </Button>
        </CardHeader>

        <CardContent>
          <PersonAddressTable data={addressRows} onEdit={handleEdit} onDelete={handleDelete} />
        </CardContent>
      </Card>

      <CoreModal open={isOpenForm} title="Novo Endereço" size="lg" onOpenChange={setIsOpenForm}>
        <PersonAddressForm
          personAddress={editing?.address}
          onCancel={() => setIsOpenForm(false)}
          onSubmit={handleSubmit}
        />
      </CoreModal>
    </>
  );
}
