import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

// Everyone can use this domain without verification
export const DEFAULT_DOMAIN = "app.linkpro.com";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
