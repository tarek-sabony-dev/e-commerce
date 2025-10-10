import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCents(cents: number, locale: string = 'en-US', currency: string = 'USD') {
  const amount = (cents || 0) / 100
  return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(amount)
}
