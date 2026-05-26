import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Strips formatting; returns 10-digit US national number or null if invalid. */
export function parseUsPhoneDigits(value: string): string | null {
  const digits = value.replace(/\D/g, "");
  if (digits.length === 10) return digits;
  if (digits.length === 11 && digits.startsWith("1")) return digits.slice(1);
  return null;
}

/** Accepts (503) 555-1234, 503-555-1234, +1 503 555 1234, 5035551234, etc. */
export function isValidUsPhone(value: string): boolean {
  const national = parseUsPhoneDigits(value);
  if (!national) return false;

  const areaCode = national.slice(0, 3);
  const exchange = national.slice(3, 6);

  // NANP: area code and exchange cannot start with 0 or 1
  return /^[2-9]\d{2}$/.test(areaCode) && /^[2-9]\d{2}$/.test(exchange);
}

/** `YYYY-MM-DD` from `<input type="date">`; false if invalid or in the future (local time). */
export function isDateNotInFuture(value: string): boolean {
  if (!value) return false;
  const parsed = new Date(`${value}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return parsed.getTime() <= today.getTime();
}

export function todayDateInputMax(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}
