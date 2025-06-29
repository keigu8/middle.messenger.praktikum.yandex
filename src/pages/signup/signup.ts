import { Button } from "../../components/button";
import {
  type FormState,
  Form,
  validate,
  mapFields,
} from "../../components/form";
import { router } from "../../globals";
import { View } from "../../lib/view";
import type { AuthService } from "../../services/auth";
import template from "./signup.hbs?raw";

type SignupForm = {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  phone: string;
  password: string;
};

const form: FormState<SignupForm> = {
  fields: {
    first_name: {
      label: "Имя",
      type: "text",
      value: "",
      regexp: new RegExp(/^(?:[A-ZА-Я][a-zа-яёЁ-]*)$/),
    },
    second_name: {
      label: "Фамилия",
      type: "text",
      value: "",
      regexp: new RegExp(/^(?:[A-ZА-Я][a-zа-яёЁ-]*)$/),
    },
    login: {
      label: "Логин",
      type: "text",
      value: "",
      regexp: new RegExp(/^[a-zA-Z0-9-]{3,20}$/),
    },
    email: {
      label: "Почта",
      type: "text",
      value: "",
      regexp: new RegExp(/^[A-Za-z0-9_-]+@[A-Za-z]+\.[A-Za-z]{2,}$/),
    },
    phone: {
      label: "Телефон",
      type: "text",
      value: "",
      regexp: new RegExp(/^\+?[0-9]{9,14}$/),
    },
    password: {
      label: "Пароль",
      type: "password",
      value: "",
      regexp: new RegExp(/^(?=.*[0-9])(?=.*[A-Z])([a-zA-Z0-9]+)$/),
    },
  },
  submitTitle: "Зарегистрироваться",
  context: "signup",
};

export const signup = {
  title: "Регистрация",
  linkTitle: "Войти",
  ...form,
};

type State = {
  title: string;
  linkTitle: string;
  submitTitle: string;
} & FormState<SignupForm>;

export class SignupPage extends View<State> {
  constructor(state: State, authService: AuthService) {
    super(state, {
      Form: new Form(
        {
          fields: state.fields,
          submitTitle: state.submitTitle,
          context: "signup",
        },
        (field: string, value: string) => {
          this.updateState((state: State) => ({
            ...state,
            fields: {
              ...state.fields,
              [field]: { ...state.fields[field as keyof SignupForm], value },
            },
          }));
        },
        async () => {
          if (validate(this.state.fields)) {
            await authService.signup(mapFields(this.state.fields));
          }
        },
      ),
      Button: new Button(
        {
          type: "button",
          title: state.linkTitle,
          className: "signup__link",
        },
        () => router.go("/"),
      ),
    });
  }

  protected render(): string {
    return template;
  }
}
