export const BooleanEnum = {
  false: "Não",
  true: "Sim",
} as const;

export type BooleanEnumKey = keyof typeof BooleanEnum;
export type BooleanEnumType = (typeof BooleanEnum)[BooleanEnumKey];

export const toBooleanEnum = (value: boolean | string | undefined): BooleanEnumKey =>
  value === true || value === "true" ? "true" : "false";

export const fromBooleanEnum = (value: BooleanEnumKey): boolean => value === "true";
