import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function extractValuesFromArray(input: { value: string }[]): string[] {
  return input.map((item) => item.value);
}
