import { z } from "zod";

export function defineQuerySchema<
  TZod extends z.ZodObject<any>,
  TAppends extends Record<string, any> = {},
  THydrators extends Record<string, any> = {},
>(params: { schema: TZod; fields: readonly (keyof z.infer<TZod>)[]; appends?: TAppends; hydrators?: THydrators }) {
  return params;
}

export const zIdRequired = () => z.coerce.number().int().positive();

export const zIdOptional = () =>
  z.preprocess(
    (value) => (value === "" || value == null ? undefined : value),
    z.coerce.number().int().positive().optional(),
  );

export const zSelect = (message: string) =>
  z.preprocess(
    (value) => {
      if (value == null || value === "") return "";
      return String(value);
    },
    z.string().min(1, message),
  );

export const zBooleanFromSelect = z.preprocess((value) => {
  if (typeof value === "boolean") return value;
  if (value === "1" || value === "true") return true;
  if (value === "0" || value === "false") return false;
  return value;
}, z.boolean());

export const zStringRequired = (message: string) => z.string().trim().min(1, message);

export const zStringOptional = () =>
  z.preprocess((value) => (value === "" ? undefined : value), z.string().trim().optional());

export const zEnum = <T extends Record<string, string>>(enumObject: T) =>
  z.enum(Object.keys(enumObject) as [keyof T & string, ...(keyof T & string)[]]);
