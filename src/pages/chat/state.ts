import type { GetChatsResponse } from "../../api/chat";
import type { ChatPageState } from "./chat";

export const getChatPageState = (chats: GetChatsResponse): ChatPageState => ({
  title: "Чат",
  profile: {
    title: "Профиль",
  },
  chatPreviews: chats.map((chat) => ({
    title: chat.title,
    subtitle: chat.last_message?.content || "Нет сообщений в чате",
    last: chat.last_message?.time || "",
    count: chat.unread_count || undefined,
  })),
  placeholder: "Выберите чат чтобы отправить сообщение",
  chatInfo: {
    title: "Вадим",
    messagesByDate: [
      {
        date: "19 июня",
        messages: [
          {
            content:
              "Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой. Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.",
            side: "left",
            time: "11:56",
          },
          {
            content: "Круто!",
            side: "right",
            time: "12:00",
          },
        ],
      },
    ],
    sendTitle: "Отправить",
    inputPlaceholder: "Сообщение",
  },
  optionsMenu: ["Добавить пользователя", "Удалить пользователя"],
  fields: {
    search: {
      label: "Поиск",
      type: "text",
      value: "",
      regexp: new RegExp(/^.+$/),
    },
  },
  submitTitle: "",
  context: "chat",
  showCreateChatButton: false,
  modals: {
    addUsersToChat: {
      visible: false,
    },
    deleteUsersFromChat: {
      visible: false,
    },
  },
});
