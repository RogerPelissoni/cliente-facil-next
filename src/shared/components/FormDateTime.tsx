"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/src/shared/utils/util";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import {
  Controller,
  FieldPath,
  FieldValues,
  get,
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

export function FormDateTime<TFieldValues extends FieldValues>({
  form,
  name,
  label,
  placeholder = "Selecione data e hora",
  size = 4,
}: Props<TFieldValues>) {
  const error = get(form.formState.errors, name);

  const hours = Array.from({ length: 24 }, (_, i) =>
    i.toString().padStart(2, "0"),
  );

  const minutes = Array.from({ length: 60 }, (_, i) =>
    i.toString().padStart(2, "0"),
  );

  return (
    <div className={cn("col-span-12 space-y-2", GRID_SIZE[size])}>
      <label className="text-sm font-medium">{label}</label>

      <Controller
        control={form.control}
        name={name}
        render={({ field }) => {
          const current = field.value ? new Date(field.value) : undefined;

          function updateDate(date: Date) {
            if (current) {
              date.setHours(current.getHours());
              date.setMinutes(current.getMinutes());
            }

            field.onChange(date);
          }

          function updateHour(hour: string) {
            const newDate = current ?? new Date();
            newDate.setHours(Number(hour));
            field.onChange(newDate);
          }

          function updateMinute(minute: string) {
            const newDate = current ?? new Date();
            newDate.setMinutes(Number(minute));
            field.onChange(newDate);
          }

          return (
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full justify-start"
                >
                  {current ? (
                    format(current, "dd/MM/yyyy HH:mm", {
                      locale: ptBR,
                    })
                  ) : (
                    <span>{placeholder}</span>
                  )}

                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>

              <PopoverContent className="space-y-4 p-4" align="start">
                <Calendar
                  mode="single"
                  locale={ptBR}
                  selected={current}
                  onSelect={(date) => date && updateDate(date)}
                />

                <div className="grid grid-cols-2 gap-2">
                  <Select
                    value={
                      current?.getHours().toString().padStart(2, "0") ?? ""
                    }
                    onValueChange={updateHour}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Hora" />
                    </SelectTrigger>

                    <SelectContent>
                      {hours.map((hour) => (
                        <SelectItem key={hour} value={hour}>
                          {hour}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select
                    value={
                      current?.getMinutes().toString().padStart(2, "0") ?? ""
                    }
                    onValueChange={updateMinute}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Minuto" />
                    </SelectTrigger>

                    <SelectContent>
                      {minutes.map((minute) => (
                        <SelectItem key={minute} value={minute}>
                          {minute}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </PopoverContent>
            </Popover>
          );
        }}
      />

      <p className="text-sm text-red-500">
        {error?.message}
      </p>
    </div>
  );
}