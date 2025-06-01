import { Form, type FormState } from "../../components/form";
import { View } from "../../lib/view";
import template from "./login.hbs?raw";

export const login = {
  title: "Вход",
  fields: {
    login: {
      label: "Логин",
      type: "text",
      value: "",
    },
    password: {
      label: "Пароль",
      type: "password",
      value: "",
    },
  },
  submitTitle: "Войти",
  linkTitle: "Ещё не зарегистрированы?",
};

type State = {
  title: string;
  linkTitle: string;
} & FormState;

export class LoginPage extends View<State> {
  constructor(state: State) {
    super(state, {
      Form: new Form(
        {
          fields: state.fields,
          submitTitle: state.submitTitle,
          context: "login",
        },
        (fields: State['fields']) => {
          console.log(fields);
        },
      ),
    });
  }

  protected render(): string {
    return template;
  }
}
