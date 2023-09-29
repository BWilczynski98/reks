import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatPostalCode = (postalCode: string): string => {
  const numericInput = postalCode.replace(/\D/g, "")
  const regex = /^(\d{2})(\d{3})$/

  if (regex.test(numericInput)) {
    return numericInput.replace(regex, "$1-$2")
  }

  return numericInput
}
