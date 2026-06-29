export const BooleanEnum = {
  false: "Não",
  true: "Sim",
} as const;

export type BooleanEnumKey = keyof typeof BooleanEnum;
export type BooleanEnumType = (typeof BooleanEnum)[BooleanEnumKey];

export const toBooleanEnum = (value: boolean | string): BooleanEnumKey => (value ? "true" : "false");
export const fromBooleanEnum = (value: BooleanEnumKey): boolean => value === "true";
