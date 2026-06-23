"use client";

import { FieldPath, FieldValues, UseFormReturn } from "react-hook-form";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface Option {
  label: string;
  value: string;
}

interface Props<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: FieldPath<T>;
  label: string;
  options: Option[];
}

export function FormSelect<T extends FieldValues>({
  form,
  name,
  label,
  options,
}: Props<T>) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">{label}</label>

      <Select
        value={form.watch(name) as string}
        onValueChange={(value) =>
          form.setValue(name, value as never, {
            shouldValidate: true,
          })
        }
      >
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>

        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <p className="text-sm text-red-500">
        {form.formState.errors[name]?.message as string}
      </p>
    </div>
  );
}
