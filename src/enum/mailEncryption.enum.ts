export const MailEncryptionEnum = {
  NONE: "Nenhuma",
  SSL: "SSL",
  TLS: "TLS (STARTTLS)",
} as const;

export type MailEncryptionEnumType = (typeof MailEncryptionEnum)[keyof typeof MailEncryptionEnum];
