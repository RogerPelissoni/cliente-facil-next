"use client";

import { Input } from "@/components/ui/input";
import { cn } from "@/src/shared/utils/util";
import { FieldPath, FieldValues, get, UseFormReturn } from "react-hook-form";
import { GRID_SIZE, GridSize } from "../utils/form.util";

interface Props<TFieldValues extends FieldValues> {
  form: UseFormReturn<TFieldValues>;
  name: FieldPath<TFieldValues>;
  label: string;
  placeholder?: string;
  type?: React.HTMLInputTypeAttribute;
  size?: GridSize;
}

export function FormInput<TFieldValues extends FieldValues>({
  form,
  name,
  label,
  placeholder,
  type = "text",
  size = 4,
}: Props<TFieldValues>) {
  const error = get(form.formState.errors, name);

  return (
    <div className={cn("col-span-12 space-y-2", GRID_SIZE[size])}>
      <label className="text-sm font-medium">{label}</label>

      <Input type={type} placeholder={placeholder} {...form.register(name)} />

      <p className="text-sm text-red-500">
        {error?.message}
      </p>
    </div>
  );
}
