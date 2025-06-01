import type { FormState } from ".";

export function validate(fields: FormState["fields"]): boolean {
  for (const field in fields) {
    if (!fields[field].regexp.test(fields[field].value)) {
      return false;
    }
  }
  return true;
}
