import { Button } from "../../components/button";
import { Modal } from "../../components/modal";
import { Table } from "../../components/table";
import { UploadAvatarModalContent } from "../../components/uploadAvatarModalContent";
import { View } from "../../lib/view";
import type { AuthService } from "../../services/auth";
import template from "./profile.hbs?raw";

export const profile = {
  title: "Профиль",
  avatar: {
    src: "/assets/avatar.png",
    alt: "Аватар профиля",
    text: "Загрузить аватар",
  },
  data: [
    {
      label: "Почта",
      value: "pochta@yandex.ru",
    },
    {
      label: "Логин",
      value: "ivanivanov",
    },
    {
      label: "Имя",
      value: "Иван",
    },
    {
      label: "Фамилия",
      value: "Иванов",
    },
    {
      label: "Имя в чате",
      value: "Иван",
    },
    {
      label: "Телефон",
      value: "+7 (909) 967 30 30",
    },
  ],
  editProfileButtonTitle: "Редактировать",
  editPasswordButtonTitle: "Изменить пароль",
  logoutButtonTitle: "Выйти",
  modal: {
    uploadAvatar: {
      visible: false,
      content: {
        title: "Изменить аватар",
        buttonTitle: "Загрузить",
        fields: {
          avatar: {
            label: "Файл",
            type: "file",
            value: "",
          },
        },
        submitTitle: "Загрузить",
        error: "Нужно выбрать файл",
      },
    },
  },
};

type State = typeof profile;

export class ProfilePage extends View<State> {
  constructor(state: State, authService: AuthService) {
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
