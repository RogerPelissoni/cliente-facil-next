"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/src/shared/utils/util";
import { Controller, FieldPath, FieldValues, UseFormReturn, useWatch } from "react-hook-form";
import { GRID_SIZE, GridSize } from "../utils/form.util";

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
  size?: GridSize;
}

export function FormSelect<T extends FieldValues>({
  form,
  name,
  label,
  options,
  placeholder = "Selecione",
  size = 4,
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
        <div className={cn("col-span-12 space-y-2", GRID_SIZE[size])}>
          <label className="text-sm font-medium">{label}</label>

          <Select
            key={`${String(name)}-${value}-${options.map((option) => option.value).join("-")}`}
            value={value}
            onValueChange={(value) => field.onChange(String(value))}
          >
            <SelectTrigger className="w-full" aria-invalid={!!fieldState.error}>
              <SelectValue placeholder={placeholder}>{selectedOption?.label}</SelectValue>
            </SelectTrigger>

            <SelectContent position="popper">
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {fieldState.error && <p className="text-sm text-red-500">{fieldState.error.message}</p>}
        </div>
      )}
    />
  );
}
