export type Fields<T extends object> = Record<
  keyof T,
  {
    label: string;
    type: string;
    value: string;
    regexp?: RegExp;
    isError?: boolean;
  }
>;
