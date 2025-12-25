import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Esta función te permitirá combinar clases condicionales sin romper Tailwind
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}