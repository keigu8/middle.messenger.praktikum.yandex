import { Form } from "../../components/form/form";
import { View } from "../../lib/view";
import template from "./signup.hbs?raw";

export const signup = {
  title: "Регистрация",
  fields: [
    {
      name: "first_name",
      label: "Имя",
      type: "text",
    },
    {
      name: "second_name",
      label: "Фамилия",
      type: "text",
    },
    {
      name: "login",
      label: "Логин",
      type: "text",
    },
    {
      name: "email",
      label: "Почта",
      type: "text",
    },
    {
      name: "phone",
      label: "Телефон",
      type: "text",
    },
    {
      name: "password",
      label: "Пароль",
      type: "password",
    },
  ],
  submitTitle: "Зарегистрироваться",
  linkTitle: "Войти",
};

type State = typeof signup;

export class SignupPage extends View<State> {
  constructor(state: State) {
    super(state, {
      Form: new Form({
        fields: state.fields,
        submitTitle: state.submitTitle,
      }),
    });
  }

  protected render(): string {
    return template;
  }
}
