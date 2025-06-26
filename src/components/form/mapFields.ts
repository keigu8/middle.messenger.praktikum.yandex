import { keys } from "../../lib/keys";
import type { Fields } from "./types";

export function mapFields<T extends object>(fields: Fields<T>) {
  return keys(fields).reduce(
    (acc, key) => ({ ...acc, [key]: fields[key].value }),
    {} as Record<keyof T, string>,
  );
}
