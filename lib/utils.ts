import { ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

import {
  engraver as engraverDb,
} from "@prisma/client";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function engraversSort(a: engraverDb, b: engraverDb) {
  const aParts = a.name.split(" ");
  const bParts = b.name.split(" ");
  return `${aParts.at(-1)} ${aParts.at(0)}`.localeCompare(
    `${bParts.at(-1)} ${bParts.at(0)}`
  );
}
