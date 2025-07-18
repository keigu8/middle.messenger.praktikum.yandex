import type { ProfileResponse } from "../../api/user";
import { valueOrEmptyString } from "../../lib/utils";
import type { SettingsPageState } from "./settings";

export const getSettingsPageState = (
  profile: ProfileResponse | null,
): SettingsPageState => ({
  title: "Настройки",
  context: "settings",
  fields: {
    first_name: {
      label: "Имя",
      type: "text",
      value: valueOrEmptyString(profile?.first_name),
      regexp: new RegExp(/^(?:[A-ZА-Я][a-zа-яёЁ-]*)$/),
    },
    second_name: {
      label: "Фамилия",
      type: "text",
      value: valueOrEmptyString(profile?.second_name),
      regexp: new RegExp(/^(?:[A-ZА-Я][a-zа-яёЁ-]*)$/),
    },
    login: {
      label: "Логин",
      type: "text",
      value: valueOrEmptyString(profile?.login),
      regexp: new RegExp(/^[a-zA-Z0-9-]{3,20}$/),
    },
    email: {
      label: "Почта",
      type: "text",
      value: valueOrEmptyString(profile?.email),
      regexp: new RegExp(/^[A-Za-z0-9_-]+@[A-Za-z]+\.[A-Za-z]{2,}$/),
    },
    phone: {
      label: "Телефон",
      type: "text",
      value: valueOrEmptyString(profile?.phone),
      regexp: new RegExp(/^\+?[0-9]{9,14}$/),
    },
    display_name: {
      label: "Имя в чате",
      type: "text",
      value: valueOrEmptyString(profile?.display_name),
    },
  },
  submitTitle: "Сохранить",
});
