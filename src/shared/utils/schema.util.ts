import { z } from "zod";

export const zIdentifier = () => z.string().optional();

export const zString = (message = "Campo obrigatório", min = 1) => z.string().trim().min(min, message);

export const zEnum = <T extends Record<string, string>>(enumObject: T, message = "Campo obrigatório") =>
  z
    .enum(Object.keys(enumObject) as [keyof T & string, ...(keyof T & string)[]])
    .optional()
    .refine((value) => value !== undefined, {
      message,
    });
