export const RoleEnum = {
  admin: "Administrador",
  company: "Empresa",
  professional: "Profissional",
  client: "Cliente",
} as const;

export type RoleEnumType = (typeof RoleEnum)[keyof typeof RoleEnum];
