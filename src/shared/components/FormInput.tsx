"use client";

import { Input } from "@/components/ui/input";
import { cn } from "@/src/shared/utils/util";
import { FieldPath, FieldValues, get, UseFormReturn } from "react-hook-form";
import { GRID_SIZE, GridSize } from "../utils/form.util";

interface BaseProps {
  label: string;
  placeholder?: string;
  type?: React.HTMLInputTypeAttribute;
  size?: GridSize;
}

interface FieldBoundProps<TFieldValues extends FieldValues> extends BaseProps {
  form: UseFormReturn<TFieldValues>;
  name: FieldPath<TFieldValues>;
  value?: never;
  onChange?: never;
}

interface ControlledProps extends BaseProps {
  value: string;
  onChange(value: string): void;
  form?: never;
  name?: never;
}

type Props<TFieldValues extends FieldValues> =
  | FieldBoundProps<TFieldValues>
  | ControlledProps;

/**
 * Input com label + grid, no padrão do projeto. Preso a um react-hook-form
 * (form + name, com validação/erro) ou controlado (value + onChange, como
 * nos filtros de tabela).
 */
export function FormInput<TFieldValues extends FieldValues = FieldValues>({
  label,
  placeholder,
  type = "text",
  size = 4,
  ...props
}: Props<TFieldValues>) {
  const error =
    "form" in props && props.form
      ? get(props.form.formState.errors, props.name)
      : undefined;

  return (
    <div className={cn("col-span-12 space-y-2", GRID_SIZE[size])}>
      <label className="text-sm font-medium">{label}</label>

      {"form" in props && props.form ? (
        <Input
          type={type}
          placeholder={placeholder}
          {...props.form.register(props.name)}
        />
      ) : (
        <Input
          type={type}
          placeholder={placeholder}
          value={props.value}
          onChange={(event) => props.onChange(event.target.value)}
        />
      )}

      <p className="text-sm text-red-500">{error?.message as string}</p>
    </div>
  );
}
