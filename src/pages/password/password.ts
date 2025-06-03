import { Form, type FormState } from "../../components/form";
import { validate } from "../../components/form/validateForm";
import { View } from "../../lib/view";
import template from "./password.hbs?raw";

const form: FormState = {
  fields: {
    old_password: {
      label: "Старый пароль",
      type: "password",
      value: "",
      regexp: new RegExp(/^(?=.*[A-Z])(?=.*d).{8,40}$/),
    },
    new_password: {
      label: "Новый пароль",
      type: "password",
      value: "",
      regexp: new RegExp(/^(?=.*[A-Z])(?=.*d).{8,40}$/),
    },
  },
  submitTitle: "Сохранить",
  context: "password",
};

export const password = {
  title: "Смена пароля",
  ...form,
};

type State = typeof password;

export class PasswordPage extends View<State> {
  constructor(state: State) {
    super(state, {
      Form: new Form(
        {
          fields: state.fields,
          submitTitle: state.submitTitle,
          context: "password",
        },

        (field: string, value: string) => {
          this.updateState((state) => ({
            ...state,
            fields: {
              ...state.fields,
              [field]: { ...state.fields[field], value },
            },
          }));
        },
        () => {
          if (validate(this.state.fields)) {
            console.log(this.state.fields);
          }
        },
      ),
    });
  }

  protected render(): string {
    return template;
  }
}
