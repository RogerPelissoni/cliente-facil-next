import { KeyValue } from "@/src/modules/user/user.types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function toOptions(values: KeyValue) {
  return Object.entries(values).map(([value, label]) => ({
    value,
    label,
  }));
}
