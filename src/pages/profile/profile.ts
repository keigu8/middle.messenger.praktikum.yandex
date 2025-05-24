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
      title: "Изменить аватар",
      buttonTitle: "Загрузить",
      form: [
        {
          name: "avatar",
          label: "Файл",
          type: "file",
        },
      ],
      submitTitle: "Загрузить",
      error: "Нужно выбрать файл",
    },
  },
};
