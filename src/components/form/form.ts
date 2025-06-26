import { View } from "../../lib/view";
import { Button } from "../button";
import { Field } from "../field";
import template from "./form.hbs?raw";
import type { Fields } from "./types";

export type FormState<T extends object> = {
  fields: Fields<T>;
  submitTitle: string;
  context: string;
};

export class Form<T extends object> extends View<FormState<T>> {
  constructor(
    state: FormState<T>,
    onBlur: (field: string, value: string) => void,
    onSubmit: (values: FormState<T>["fields"]) => void,
  ) {
    super(state, {
      Fields: Object.keys(state.fields).map(
        (fieldName) =>
          new Field(
            {
              name: fieldName,
              ...state.fields[fieldName as keyof T],
            },
            (value: string) => {
              onBlur(fieldName, value);
            },
          ),
      ),
      Button: new Button(
        {
          title: state.submitTitle,
          type: "submit",
          className: `${state.context}__submit`,
        },
        (event) => {
          event.preventDefault();
          onSubmit(this.state.fields);
        },
      ),
    });
  }

  protected render(): string {
    return template;
  }
}
