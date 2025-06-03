import { View } from "../../lib/view";
import { Button } from "../button";
import { Field } from "../field";
import template from "./form.hbs?raw";

export type FormState = {
  fields: Record<
    string,
    {
      label: string;
      type: string;
      value: string;
      regexp?: RegExp;
      isError?: boolean;
    }
  >;
  submitTitle: string;
  context: string;
};

export class Form extends View<FormState> {
  constructor(
    state: FormState,
    onBlur: (field: string, value: string) => void,
    onSubmit: (values: FormState["fields"]) => void,
  ) {
    super(state, {
      Fields: Object.keys(state.fields).map(
        (fieldName) =>
          new Field(
            {
              name: fieldName,
              ...state.fields[fieldName],
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
