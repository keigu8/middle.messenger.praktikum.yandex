import { View } from "../../lib/view";
import template from "./field.hbs?raw";
import "./index.css";

type State = {
  name: string;
  label: string;
  type: string;
  value: string;
  regexp?: RegExp;
  isError?: boolean;
};

export class Field extends View<State> {
  constructor(state: State, onBlur: ((value: string) => void) | undefined) {
    super(
      state,
      undefined,
      onBlur
        ? {
            blur: (event: FocusEvent) => {
              //@ts-expect-error target.value exists on FocusEvent
              const value = event.target.value;
              onBlur(value);
              this.updateState((state) => ({
                ...state,
                value,
                isError: this.state.regexp && !this.state.regexp.test(value),
              }));
            },
          }
        : undefined,
      ".field__input",
    );
  }

  protected render(): string {
    return template;
  }
}
