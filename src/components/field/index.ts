import { View } from "../../lib/view";
import template from "./field.hbs?raw";
import "./index.css";

type State = {
  name: string;
  label: string;
  type: string;
  value: string;
};

export class Field extends View<State> {
  constructor(state: State, onBlur: (value: string) => void) {
    super(
      state,
      undefined,
      {
        blur: (event: FocusEvent) => {
          //@ts-ignore
          onBlur(event.target.value);
        }
      },
      ".field__input",
    );
  }

  protected render(): string {
    return template;
  }
}
