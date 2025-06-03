import { Form, type FormState } from "../../components/form";
import { validate } from "../../components/form/validateForm";
import { View } from "../../lib/view";
import template from "./signup.hbs?raw";

const form: FormState = {
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
} & FormState;

export class SignupPage extends View<State> {
  constructor(state: State) {
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
