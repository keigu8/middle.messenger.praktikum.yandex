import { Button } from "../../components/button";
import { Modal } from "../../components/modal";
import { Table, type TableState } from "../../components/table";
import {
  UploadAvatarModalContent,
  type UploadAvatarModalState,
} from "../../components/uploadAvatarModalContent";
import { View } from "../../lib/view";
import type { AuthService } from "../../services/auth";
import template from "./profile.hbs?raw";

export type ProfilePageState = {
  title: string;
  avatar: {
    src: string;
    alt: string;
    text: string;
  };
  editProfileButtonTitle: string;
  editPasswordButtonTitle: string;
  logoutButtonTitle: string;
  modal: {
    uploadAvatar: {
      visible: boolean;
      content: UploadAvatarModalState;
    };
  };
} & TableState;

export class ProfilePage extends View<ProfilePageState> {
  constructor(state: ProfilePageState, authService: AuthService) {
    super(state, {
      Table: new Table({
        data: state.data,
      }),
      LogoutButton: new Button(
        {
          type: "button",
          title: "Выйти",
          className: "profile__button profile__button--destructive",
        },
        () => {
          authService.logout();
        },
      ),
      Modal: new Modal(
        { visible: state.modal.uploadAvatar.visible },
        new UploadAvatarModalContent(state.modal.uploadAvatar.content),
      ),
    });
  }

  protected render(): string {
    return template;
  }
}
