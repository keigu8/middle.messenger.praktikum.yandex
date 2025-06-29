import type { PasswordPageState } from "./password";

export const getPasswordPageState = (): PasswordPageState => ({
  title: "Смена пароля",
  fields: {
    oldPassword: {
      label: "Старый пароль",
      type: "password",
      value: "",
      regexp: new RegExp(/^(?=.*[0-9])(?=.*[A-Z])([a-zA-Z0-9]+)$/),
    },
    newPassword: {
      label: "Новый пароль",
      type: "password",
      value: "",
      regexp: new RegExp(/^(?=.*[0-9])(?=.*[A-Z])([a-zA-Z0-9]+)$/),
    },
  },
  submitTitle: "Сохранить",
  context: "password",
});
