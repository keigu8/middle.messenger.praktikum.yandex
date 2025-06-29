import { Form, mapFields, type FormState } from "../../components/form";
import { validate } from "../../components/form/validateForm";
import { View } from "../../lib/view";
import type { UserService } from "../../services/user";
import template from "./settings.hbs?raw";

type SettingsForm = {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  phone: string;
  display_name: string;
};

export type SettingsPageState = {
  title: string;
} & FormState<SettingsForm>;

export class SettingsPage extends View<SettingsPageState> {
  constructor(state: SettingsPageState, userService: UserService) {
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
              [field]: { ...state.fields[field as keyof SettingsForm], value },
            },
          }));
        },
        () => {
          if (validate(this.state.fields)) {
            userService.editProfile(mapFields(this.state.fields));
          }
        },
      ),
    });
  }

  protected render(): string {
    return template;
  }
}
