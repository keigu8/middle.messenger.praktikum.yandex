import { Form, type FormState } from "../../components/form";
import { validate } from "../../components/form/validateForm";
import { View } from "../../lib/view";
import template from "./login.hbs?raw";

const form: FormState = {
  fields: {
    login: {
      label: "Логин",
      type: "text",
      regexp: new RegExp(/^(?=.*[a-zA-Z])[w-]{3,20}$/),
      value: "",
    },
    password: {
      label: "Пароль",
      type: "password",
      regexp: new RegExp(/^(?=.*[a-zA-Z])[w-]{3,20}$/),
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
} & FormState;

export class LoginPage extends View<State> {
  constructor(state: State) {
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
              [field]: { ...state.fields[field], value },
            },
          }));
        },
        (fields: State["fields"]) => {
          if (validate(fields)) {
            console.log(fields);
          }
        },
      ),
    });
  }

  protected render(): string {
    return template;
  }
}
