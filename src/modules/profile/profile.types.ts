import { PageResponse } from "@/src/shared/types/api.type";

export interface Profile {
  id: number;
  name: string;
}

export interface ProfileFiltersType {
  name: string;
}

export type KeyValue = Record<string, string>;

export interface ProfileScreenData {
  obProfile: PageResponse<Profile>;
}
