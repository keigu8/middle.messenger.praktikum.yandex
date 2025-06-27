import { Form, mapFields, type FormState } from "../../components/form";
import { validate } from "../../components/form/validateForm";
import { View } from "../../lib/view";
import type { UserService } from "../../services/user";
import template from "./password.hbs?raw";

type PasswordForm = {
  oldPassword: string;
  newPassword: string;
};

export type PasswordPageState = {
  title: string;
} & FormState<PasswordForm>;

export class PasswordPage extends View<PasswordPageState> {
  constructor(state: PasswordPageState, userService: UserService) {
    super(state, {
      Form: new Form(
        {
          fields: state.fields,
          submitTitle: state.submitTitle,
          context: "password",
        },

        (field: string, value: string) => {
          this.updateState((state) => ({
            ...state,
            fields: {
              ...state.fields,
              [field]: { ...state.fields[field as keyof PasswordForm], value },
            },
          }));
        },
        () => {
          if (validate(this.state.fields)) {
            userService.editPassword(mapFields(this.state.fields));
          }
        },
      ),
    });
  }

  protected render(): string {
    return template;
  }
}
