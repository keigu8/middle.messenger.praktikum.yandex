import type { Fields } from "./types";

export function validate<T extends object>(fields: Fields<T>): boolean {
  for (const field in fields) {
    if (
      fields[field].regexp &&
      !fields[field].regexp.test(fields[field].value)
    ) {
      return false;
    }
  }
  return true;
}
