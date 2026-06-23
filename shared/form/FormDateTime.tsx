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
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { Control, Controller, FieldPath, FieldValues } from "react-hook-form";

interface Props<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
}

export function FormDateTime<T extends FieldValues>({
  control,
  name,
  label,
}: Props<T>) {
  const hours = Array.from({ length: 24 }, (_, i) =>
    i.toString().padStart(2, "0"),
  );

  const minutes = Array.from({ length: 60 }, (_, i) =>
    i.toString().padStart(2, "0"),
  );

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        const current = field.value ? new Date(field.value) : undefined;

        function updateDate(date: Date) {
          field.onChange(date);
        }

        function updateHour(hour: string) {
          if (!current) return;

          const newDate = new Date(current);

          newDate.setHours(Number(hour));

          field.onChange(newDate);
        }

        function updateMinute(minute: string) {
          if (!current) return;

          const newDate = new Date(current);

          newDate.setMinutes(Number(minute));

          field.onChange(newDate);
        }

        return (
          <div className="space-y-2">
            <label className="text-sm font-medium">{label}</label>

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
                    <span>Selecione data e hora</span>
                  )}

                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>

              <PopoverContent className="space-y-4 p-4" align="start">
                <Calendar
                  mode="single"
                  selected={current}
                  onSelect={(date) => date && updateDate(date)}
                  locale={ptBR}
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

            {fieldState.error && (
              <p className="text-sm text-red-500">{fieldState.error.message}</p>
            )}
          </div>
        );
      }}
    />
  );
}
