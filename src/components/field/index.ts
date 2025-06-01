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
  constructor(state: State, onBlur: (value: string) => void) {
    super(
      state,
      undefined,
      {
        blur: (event: FocusEvent) => {
          //@ts-expect-error
          const value = event.target.value;
          onBlur(value);
          if (this.state.regexp && !this.state.regexp.test(value)) {
            this.updateState((state) => ({ ...state, value, isError: true }));
          } else {
            this.updateState((state) => ({ ...state, value, isError: false }));
          }
        },
      },
      ".field__input",
    );
  }

  protected render(): string {
    return template;
  }
}
