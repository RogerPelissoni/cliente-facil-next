"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/src/shared/utils/util";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import {
  Controller,
  FieldPath,
  FieldValues,
  UseFormReturn,
} from "react-hook-form";
import { GRID_SIZE, GridSize } from "../utils/form.util";

interface Props<TFieldValues extends FieldValues> {
  form: UseFormReturn<TFieldValues>;
  name: FieldPath<TFieldValues>;
  label: string;
  placeholder?: string;
  size?: GridSize;
}

export function FormDate<TFieldValues extends FieldValues>({
  form,
  name,
  label,
  placeholder = "Selecione uma data",
  size = 4,
}: Props<TFieldValues>) {
  return (
    <div className={cn("col-span-12 space-y-2", GRID_SIZE[size])}>
      <label className="text-sm font-medium">{label}</label>

      <Controller
        control={form.control}
        name={name}
        render={({ field }) => (
          <Popover>
            <PopoverTrigger asChild>
              <Button
                type="button"
                variant="outline"
                className="w-full justify-start"
              >
                {field.value ? (
                  format(new Date(field.value), "dd/MM/yyyy", {
                    locale: ptBR,
                  })
                ) : (
                  <span>{placeholder}</span>
                )}

                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>

            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                locale={ptBR}
                selected={field.value ? new Date(field.value) : undefined}
                onSelect={(date) => field.onChange(date)}
              />
            </PopoverContent>
          </Popover>
        )}
      />

      <p className="text-sm text-red-500">
        {form.formState.errors[name]?.message as string}
      </p>
    </div>
  );
}