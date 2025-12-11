import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...args: ClassValue[]): string => {
  return twMerge(clsx(args));
};
