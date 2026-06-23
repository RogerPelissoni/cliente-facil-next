"use client";

import { Input } from "@/components/ui/input";

import { FieldPath, FieldValues, UseFormReturn } from "react-hook-form";

interface Props<TFieldValues extends FieldValues> {
  form: UseFormReturn<TFieldValues>;
  name: FieldPath<TFieldValues>;
  label: string;
  placeholder?: string;
}

export function FormInput<TFieldValues extends FieldValues>({
  form,
  name,
  label,
  placeholder,
}: Props<TFieldValues>) {
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
