import { View } from "../../lib/view";
import template from "./field.hbs?raw";
import "./index.css";

type State = {
  name: string;
  label: string;
  type: string;
};

export class Field extends View<State> {
  constructor(state: State) {
    super(state);
  }

  protected render(): string {
    return template;
  }
}
