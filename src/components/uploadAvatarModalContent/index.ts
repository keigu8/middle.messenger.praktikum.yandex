import { View } from "../../lib/view";
import { Form } from "../form";
import template from "./uploadAvatarModalContent.hbs?raw";

type State = {
  title: string;
  buttonTitle: string;
  fields: Array<{
    name: string;
    label: string;
    type: string;
  }>;
  submitTitle: string;
  error: string;
};

export class UploadAvatarModalContent extends View<State> {
  constructor(state: State) {
    super(state, {
      Form: new Form(
        {
          fields: state.fields,
          submitTitle: state.submitTitle,
          context: "",
        },
        console.log,
      ),
    });
  }

  protected render(): string {
    return template;
  }
}
