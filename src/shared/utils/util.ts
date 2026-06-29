import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { KeyValueType } from "../types/core.type";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function toOptions(values: KeyValueType) {
  return Object.entries(values).map(([value, label]) => ({
    value,
    label,
  }));
}
