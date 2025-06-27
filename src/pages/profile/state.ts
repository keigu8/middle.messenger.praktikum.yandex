import type { ProfileResponse } from "../../api/user";
import type { ProfilePageState } from "./profile";

export const getProfileState = (
  profile: ProfileResponse | null,
): ProfilePageState => ({
  title: "Профиль",
  avatar: {
    src: profile?.avatar || "",
    alt: "Аватар профиля",
    text: "Загрузить аватар",
  },
  data: [
    {
      label: "Почта",
      value: profile?.email || "",
    },
    {
      label: "Логин",
      value: profile?.login || "",
    },
    {
      label: "Имя",
      value: profile?.first_name || "",
    },
    {
      label: "Фамилия",
      value: profile?.second_name || "",
    },
    {
      label: "Имя в чате",
      value: profile?.display_name || "",
    },
    {
      label: "Телефон",
      value: profile?.phone || "",
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
});
