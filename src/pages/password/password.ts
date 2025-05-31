import { Form } from "../../components/form";
import { View } from "../../lib/view";
import template from "./password.hbs?raw";

export const password = {
  title: "Смена пароля",
  fields: [
    {
      name: "old_password",
      label: "Старый пароль",
      type: "password",
    },
    {
      name: "new_password",
      label: "Новый пароль",
      type: "password",
    },
  ],
  submitTitle: "Сохранить",
};

type State = typeof password;

export class PasswordPage extends View<State> {
  constructor(state: State) {
    super(state, {
      Form: new Form({
        fields: state.fields,
        submitTitle: state.submitTitle,
        context: "password",
      }),
    });
  }

  protected render(): string {
    return template;
  }
}
