import { View } from "../../lib/view";
import { Field } from "../field";
import template from "./form.hbs?raw";

type State = {
  fields: Array<{ name: string; label: string; type: string }>;
  submitTitle: string;
  context: string;
};

export class Form extends View<State> {
  constructor(state: State) {
    super(state, {
      Fields: state.fields.map((field) => new Field(field)),
    });
  }

  protected render(): string {
    return template;
  }
}
