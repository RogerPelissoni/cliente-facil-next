"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/src/shared/utils/util";
import {
  Controller,
  FieldPath,
  FieldValues,
  get,
  UseFormReturn,
  useWatch,
} from "react-hook-form";
import { GRID_SIZE, GridSize } from "../utils/form.util";

interface Option {
  label: string;
  value: string;
}

interface BaseProps {
  label: string;
  options: Option[];
  placeholder?: string;
  size?: GridSize;
}

interface FieldBoundProps<T extends FieldValues> extends BaseProps {
  form: UseFormReturn<T>;
  name: FieldPath<T>;
  value?: never;
  onChange?: never;
}

interface ControlledProps extends BaseProps {
  value: string;
  onChange(value: string): void;
  form?: never;
  name?: never;
}

type Props<T extends FieldValues> = FieldBoundProps<T> | ControlledProps;

/**
 * Select com label + grid, no padrão do projeto. Preso a um react-hook-form
 * (form + name, com validação/erro) ou controlado (value + onChange, como
 * nos filtros de tabela).
 */
export function FormSelect<T extends FieldValues = FieldValues>(
  props: Props<T>,
) {
  if ("form" in props && props.form) {
    return <BoundFormSelect {...props} />;
  }

  return <ControlledFormSelect {...props} />;
}

function BoundFormSelect<T extends FieldValues>({
  form,
  name,
  label,
  options,
  placeholder = "Selecione",
  size = 4,
}: FieldBoundProps<T>) {
  const error = get(form.formState.errors, name);

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
              <SelectValue placeholder={placeholder}>
                {selectedOption?.label}
              </SelectValue>
            </SelectTrigger>

            <SelectContent position="popper">
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <p className="text-sm text-red-500">{error?.message as string}</p>
        </div>
      )}
    />
  );
}

function ControlledFormSelect({
  value,
  onChange,
  label,
  options,
  placeholder = "Selecione",
  size = 4,
}: ControlledProps) {
  const selectedOption = options.find((option) => option.value === value);

  return (
    <div className={cn("col-span-12 space-y-2", GRID_SIZE[size])}>
      <label className="text-sm font-medium">{label}</label>

      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={placeholder}>
            {selectedOption?.label}
          </SelectValue>
        </SelectTrigger>

        <SelectContent position="popper">
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
