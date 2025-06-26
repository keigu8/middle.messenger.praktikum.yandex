import { Form, mapFields, type FormState } from "../../components/form";
import { validate } from "../../components/form/validateForm";
import { View } from "../../lib/view";
import type { AuthService } from "../../services/auth";
import template from "./login.hbs?raw";

type LoginForm = {
  login: string;
  password: string;
};

const form: FormState<LoginForm> = {
  fields: {
    login: {
      label: "Логин",
      type: "text",
      regexp: new RegExp(/^[a-zA-Z0-9-]{3,20}$/),
      value: "",
    },
    password: {
      label: "Пароль",
      type: "password",
      regexp: new RegExp(/^(?=.*[0-9])(?=.*[A-Z])([a-zA-Z0-9]+)$/),
      value: "",
    },
  },
  submitTitle: "Войти",
  context: "login",
};

export const login = {
  title: "Вход",
  linkTitle: "Ещё не зарегистрированы?",
  ...form,
};

type State = {
  title: string;
  linkTitle: string;
  isError?: boolean;
} & FormState<LoginForm>;

export class LoginPage extends View<State> {
  constructor(state: State, authService: AuthService) {
    super(state, {
      Form: new Form(
        {
          fields: state.fields,
          submitTitle: state.submitTitle,
          context: state.context,
        },
        (field: string, value: string) => {
          this.updateState((state) => ({
            ...state,
            fields: {
              ...state.fields,
              [field]: { ...state.fields[field as keyof LoginForm], value },
            },
          }));
        },
        () => {
          if (validate(this.state.fields)) {
            authService.login(mapFields(this.state.fields));
          }
        },
      ),
    });
  }

  protected render(): string {
    return template;
  }
}
