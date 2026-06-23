"use client";

import { FieldPath, FieldValues, UseFormReturn } from "react-hook-form";

import { Input } from "@/components/ui/input";

interface Props<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: FieldPath<T>;
  label: string;
  placeholder?: string;
}

export function FormInput<T extends FieldValues>({
  form,
  name,
  label,
  placeholder,
}: Props<T>) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">{label}</label>

      <Input placeholder={placeholder} {...form.register(name)} />

      <p className="text-sm text-red-500">
        {form.formState.errors[name]?.message as string}
      </p>
    </div>
  );
}
