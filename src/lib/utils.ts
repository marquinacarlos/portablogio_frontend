import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// twMerge: understands Tailwind's logic. 
// Its job is to override old classes that conflict with new ones. 
// class='p-4 p-2' cambia a class='p-2' evitando el conflicto
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}