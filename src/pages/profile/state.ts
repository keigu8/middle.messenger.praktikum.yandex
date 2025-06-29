import type { ProfileResponse } from "../../api/user";
import { valueOrEmptyString } from "../../lib/utils";
import type { ProfilePageState } from "./profile";

export const getProfileState = (
  profile: ProfileResponse | null,
): ProfilePageState => ({
  title: "Профиль",
  avatar: {
    src:
      `https://ya-praktikum.tech/api/v2/resources${profile?.avatar}` ||
      "/assets/avatar.png",
    alt: "Аватар профиля",
    text: "Загрузить аватар",
    context: "profile",
  },
  data: [
    {
      label: "Почта",
      value: valueOrEmptyString(profile?.email),
    },
    {
      label: "Логин",
      value: valueOrEmptyString(profile?.login),
    },
    {
      label: "Имя",
      value: valueOrEmptyString(profile?.first_name),
    },
    {
      label: "Фамилия",
      value: valueOrEmptyString(profile?.second_name),
    },
    {
      label: "Имя в чате",
      value: valueOrEmptyString(profile?.display_name),
    },
    {
      label: "Телефон",
      value: valueOrEmptyString(profile?.phone),
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
