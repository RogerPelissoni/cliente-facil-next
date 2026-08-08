import { IdentifierType } from "@/src/shared/types/form.type";

// Espelha MailConfigResponse (backend): dsPassword nunca é devolvido (WRITE_ONLY), só hasPassword
// indica se já existe uma senha salva.
export interface MailConfigType {
  id: IdentifierType;
  companyId: IdentifierType | null;
  dsHost: string;
  nrPort: number;
  dsUsername: string | null;
  hasPassword: boolean;
  tpEncryption: string;
  dsFromName: string;
  dsFromAddress: string;
  flActive: boolean;
}
