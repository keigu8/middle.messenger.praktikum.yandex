import type { GetOldResponse, MessageResponse } from "../../services/message";
import type { ChatPageState } from "./chat";

function getMessageDate(messageTime: string) {
  return new Date(messageTime).toLocaleDateString("ru-RU", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function getMessagesByDate(
  messages: GetOldResponse,
  userId: number,
): ChatPageState["chatInfo"]["messagesByDate"] {
  const messagesWithDay = messages.map((message) => ({
    ...message,
    date: getMessageDate(message.time),
  }));

  return messagesWithDay
    .sort((a, b) => (a.time < b.time ? -1 : 1))
    .reduce(
      (acc, message) => {
        const messagesWithDate = acc.find((m) => m.date === message.date);

        return [
          ...acc.filter((messages) => messages.date !== message.date),
          {
            date: message.date,
            messages: [
              ...(messagesWithDate?.messages || []),
              {
                content: message.content,
                side: message.user_id === userId ? "right" : "left",
                time: message.time,
              },
            ],
          },
        ];
      },
      [] as ChatPageState["chatInfo"]["messagesByDate"],
    );
}

export function appendMessageToMessagesByDate(
  messagesByDate: ChatPageState["chatInfo"]["messagesByDate"],
  message: MessageResponse,
  userId: number,
): ChatPageState["chatInfo"]["messagesByDate"] {
  const messageDate = getMessageDate(message.time);
  const messagesWithDate = messagesByDate.find((m) => m.date === messageDate);

  return [
    ...messagesByDate.filter((messages) => messages.date !== messageDate),
    {
      date: messageDate,
      messages: [
        ...(messagesWithDate?.messages || []),
        {
          content: message.content,
          side: message.user_id === userId ? "right" : "left",
          time: message.time,
        },
      ],
    },
  ];
}
