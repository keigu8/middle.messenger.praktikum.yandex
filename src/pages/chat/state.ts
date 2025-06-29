import type { GetChatsResponse } from "../../api/chat";
import type { ChatPageState } from "./chat";

export const getChatPageState = (chats: GetChatsResponse): ChatPageState => ({
  title: "Чат",
  profile: {
    title: "Профиль",
  },
  chatPreviews: chats.map((chat) => ({
    id: chat.id,
    title: chat.title,
    subtitle: chat.last_message?.content || "Нет сообщений в чате",
    last: chat.last_message?.time || "",
    count: chat.unread_count || undefined,
  })),
  placeholder: "Выберите чат чтобы отправить сообщение",
  chatInfo: {
    title: "",
    messagesByDate: [],
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
