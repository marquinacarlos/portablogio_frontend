import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// twMerge: entiende la lógica de Tailwind. 
// Su función es "pisar" o borrar las clases viejas que entran en conflicto con las nuevas. 
// class='p-4 p-2' cambia a class='p-2' evitando el conflicto
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}