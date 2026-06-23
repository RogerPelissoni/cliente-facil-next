"use client";

import {
  Controller,
  FieldPath,
  FieldValues,
  UseFormReturn,
  useWatch,
} from "react-hook-form";

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
  placeholder?: string;
}

export function FormSelect<T extends FieldValues>({
  form,
  name,
  label,
  options,
  placeholder = "Selecione",
}: Props<T>) {
  const watchedValue = useWatch({
    control: form.control,
    name,
  });

  const value = watchedValue != null ? String(watchedValue) : "";
  const selectedOption = options.find((option) => option.value === value);

  return (
    <Controller
      control={form.control}
      name={name}
      render={({ field, fieldState }) => (
        <div className="space-y-2">
          <label className="text-sm font-medium">{label}</label>

          <Select
            key={`${String(name)}-${value}-${options.map((option) => option.value).join("-")}`}
            value={value}
            onValueChange={field.onChange}
          >
            <SelectTrigger className="w-full" aria-invalid={!!fieldState.error}>
              <SelectValue placeholder={placeholder}>
                {selectedOption?.label}
              </SelectValue>
            </SelectTrigger>

            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {fieldState.error && (
            <p className="text-sm text-red-500">{fieldState.error.message}</p>
          )}
        </div>
      )}
    />
  );
}
