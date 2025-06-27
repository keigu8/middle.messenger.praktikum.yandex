import { View } from "../../lib/view";
import { Form, type FormState } from "../form";
import template from "./uploadAvatarModalContent.hbs?raw";

type UploadAvatarForm = {
  avatar: string;
};

export type UploadAvatarModalState = {
  title: string;
  buttonTitle: string;
  fields: FormState<UploadAvatarForm>["fields"];
  submitTitle: string;
  error: string;
};

export class UploadAvatarModalContent extends View<UploadAvatarModalState> {
  constructor(state: UploadAvatarModalState) {
    super(state, {
      Form: new Form(
        {
          fields: state.fields,
          submitTitle: state.submitTitle,
          context: "",
        },
        console.log,
        console.log,
      ),
    });
  }

  protected render(): string {
    return template;
  }
}
