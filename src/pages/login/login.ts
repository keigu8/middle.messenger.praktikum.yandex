import { Form } from "../../components/form";
import { View } from "../../lib/view";
import template from "./login.hbs?raw";

export const login = {
  title: "Вход",
  fields: [
    {
      name: "login",
      label: "Логин",
      type: "text",
    },
    {
      name: "password",
      label: "Пароль",
      type: "password",
    },
  ],
  submitTitle: "Войти",
  linkTitle: "Ещё не зарегистрированы?",
};

type State = typeof login;

export class LoginPage extends View<State> {
  constructor(state: State) {
    super(state, {
      Form: new Form({
        fields: state.fields,
        submitTitle: state.submitTitle,
        context: "login",
      }),
    });
  }

  protected render(): string {
    return template;
  }
}
