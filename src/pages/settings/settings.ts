import { Form } from "../../components/form";
import { View } from "../../lib/view";
import template from "./settings.hbs?raw";

export const settings = {
  title: "Настройки",
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
      name: "display_name",
      label: "Имя в чате",

      type: "text",
    },
    {
      name: "email",
      label: "Почта",

      type: "text",
    },
    {
      name: "login",
      label: "Логин",
      type: "text",
    },
    {
      name: "phone",
      label: "Телефон",

      type: "text",
    },
  ],
  submitTitle: "Сохранить",
};

type State = typeof settings;

export class SettingsPage extends View<State> {
  constructor(state: State) {
    super(state, {
      Form: new Form({
        fields: state.fields,
        submitTitle: state.submitTitle,
        context: "settings",
      }),
    });
  }

  protected render(): string {
    return template;
  }
}
