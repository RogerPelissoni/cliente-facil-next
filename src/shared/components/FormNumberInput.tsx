"use client";

import { Input } from "@/components/ui/input";
import { cn } from "@/src/shared/utils/util";
import { Controller, FieldPath, FieldValues, get, UseFormReturn } from "react-hook-form";
import { GRID_SIZE, GridSize } from "../utils/form.util";

interface Props<TFieldValues extends FieldValues> {
    form: UseFormReturn<TFieldValues>;
    name: FieldPath<TFieldValues>;
    label: string;
    placeholder?: string;
    size?: GridSize;
    min?: number;
    max?: number;
    step?: number;
}

export function FormNumberInput<TFieldValues extends FieldValues>({
    form,
    name,
    label,
    placeholder,
    size = 4,
    min,
    max,
    step = 1,
}: Props<TFieldValues>) {
    const error = get(form.formState.errors, name);

    return (
        <div className={cn("col-span-12 space-y-2", GRID_SIZE[size])}>
            <label className="text-sm font-medium">{label}</label>

            <Controller
                control={form.control}
                name={name}
                render={({ field }) => (
                    <Input
                        type="number"
                        inputMode="numeric"
                        placeholder={placeholder}
                        min={min}
                        max={max}
                        step={step}
                        value={field.value ?? ""}
                        onChange={(e) => {
                            const value = e.target.value;

                            field.onChange(value === "" ? undefined : Number(value));
                        }}
                    />
                )}
            />

            <p className="text-sm text-red-500">
                {error?.message}
            </p>
        </div>
    );
}