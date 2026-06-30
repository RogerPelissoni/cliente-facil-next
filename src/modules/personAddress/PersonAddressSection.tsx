import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CoreModal } from "@/src/shared/components/CoreModal";
import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { PersonFormInput } from "../person/person.schema";
import { PersonAddressFormInput } from "./personAddress.schema";
import { PersonAddressType } from "./personAddress.type";
import { PersonAddressForm } from "./PersonAddressForm";
import { PersonAddressTable } from "./PersonAddressTable";

interface Props {
  form: UseFormReturn<PersonFormInput>;
}

export function PersonAddressSection({ form }: Props) {
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState<PersonAddressType>();
  const [editingIndex, setEditingIndex] = useState<number>();

  const handleCreate = () => {
    setEditingAddress(undefined);
    setEditingIndex(undefined);
    setIsOpenForm(true);
  };

  const handleEdit = (address: PersonAddressType, rowIndex: number) => {
    setEditingAddress(address);
    setEditingIndex(rowIndex);
    setIsOpenForm(true);
  };

  const handleDelete = () => {
    console.log("remove personAddress from personForm");
  };

  const handleSubmit = (formData: PersonAddressFormInput) => {
    const addresses = form.getValues("personAddresses");

    const updatedAddresses =
      editingIndex === undefined
        ? [...addresses, formData]
        : addresses.map((address, i) => (i === editingIndex ? formData : address));

    form.setValue("personAddresses", updatedAddresses);
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
          <PersonAddressTable data={form.watch("personAddresses")} onEdit={handleEdit} onDelete={handleDelete} />
        </CardContent>
      </Card>

      <CoreModal open={isOpenForm} title="Novo Endereço" size="lg" onOpenChange={setIsOpenForm}>
        <PersonAddressForm
          personAddress={editingAddress}
          onCancel={() => setIsOpenForm(false)}
          onSubmit={handleSubmit}
        />
      </CoreModal>
    </>
  );
}
