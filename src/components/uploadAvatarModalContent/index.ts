import { View } from "../../lib/view";
import type { UserService } from "../../services/user";
import { Form, type FormState } from "../form";
import template from "./uploadAvatarModalContent.hbs?raw";

type UploadAvatarForm = {
  avatar: File | null;
};

export type UploadAvatarModalState = {
  title: string;
  buttonTitle: string;
  fields: FormState<UploadAvatarForm>["fields"];
  submitTitle: string;
  error: string;
};

export class UploadAvatarModalContent extends View<UploadAvatarModalState> {
  constructor(
    state: UploadAvatarModalState,
    userService: UserService,
    onSuccess: VoidFunction,
  ) {
    super(state, {
      Form: new Form(
        {
          fields: state.fields,
          submitTitle: state.submitTitle,
          context: "",
        },
        undefined,
        () => {
          const avatar = this.node.querySelector("input")?.files?.[0];
          if (avatar) {
            userService.editAvatar({ avatar }, onSuccess);
          }
        },
      ),
    });
  }

  protected render(): string {
    return template;
  }
}
