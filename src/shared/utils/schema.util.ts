import { z } from "zod";

type EnumKey<T extends Record<string, string>> = keyof T & string;

export const zOptionalIdentifier = () => z.string().trim().optional();

export const zIdentifier = (message = "Campo obrigatório") => z.string().trim().min(1, message);

export const zString = (message = "Campo obrigatório", min = 1) => z.string().trim().min(min, message);

export const zEnum = <T extends Record<string, string>>(enumObject: T, message = "Campo obrigatório") =>
  z
    .union([z.enum(Object.keys(enumObject) as [EnumKey<T>, ...EnumKey<T>[]]), z.literal("")])
    .refine((value) => value !== "", {
      message,
    })
    .transform((value): EnumKey<T> => value as EnumKey<T>);

export const toFormIdentifier = (value: unknown): string => (value == null ? "" : String(value));

export const toOptionalFormIdentifier = (value: unknown): string | undefined =>
  value == null || value === "" ? undefined : String(value);

export const zDate = (message = "Campo obrigatório") =>
  z
    .union([z.date(), z.undefined()])
    .refine((value): value is Date => value !== undefined, {
      message,
    });