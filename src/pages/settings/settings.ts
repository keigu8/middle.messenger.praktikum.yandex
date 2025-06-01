import { Form, type FormState } from "../../components/form";
import { validate } from "../../components/form/validateForm";
import { View } from "../../lib/view";
import template from "./settings.hbs?raw";

const form: FormState = {
  context: "settings",
  fields: {
    first_name: {
      label: "Имя",
      type: "text",
      value: "",
      regexp: new RegExp(/^(?:[A-ZА-Я][a-zа-яёЁ-]*)$/),
    },
    last_name: {
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
    display_name: {
      label: "Имя в чате",
      type: "text",
      value: "",
    },
  },
  submitTitle: "Сохранить",
};

export const settings = {
  title: "Настройки",
  ...form,
};

type State = typeof settings;

export class SettingsPage extends View<State> {
  constructor(state: State) {
    super(state, {
      Form: new Form(
        {
          fields: state.fields,
          submitTitle: state.submitTitle,
          context: "settings",
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
