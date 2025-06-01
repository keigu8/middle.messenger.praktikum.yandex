import { ChatPreview } from "../../components/chatPreview";
import { ChatView } from "../../components/chatView";
import { Form, type FormState } from "../../components/form";
import { validate } from "../../components/form/validateForm";
import { OptionsMenu } from "../../components/optionsMenu";
import { Separator } from "../../components/separator";
import { View } from "../../lib/view";
import template from "./chat.hbs?raw";

const form: FormState = {
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
};

export const chat = {
  title: "Чат",
  profile: {
    title: "Профиль",
  },
  chatPreviews: [
    {
      title: "Андрей",
      subtitle: "Изображение",
      last: "10:49",
      count: 2,
    },
    {
      title: "Киноклуб",
      subtitle: "Вы: стикер",
      last: "12:00",
    },
    {
      title: "Илья",
      subtitle: "Друзья, у меня для вас особенный выпуск новостей!",
      last: "15:12",
      count: 40,
    },
    {
      title: "Вадим",
      subtitle: "Вы: Круто!",
      last: "Пт",
    },
    {
      title: "тет-а-теты",
      subtitle: "И Human Interface Guidelines и Material Design рекомендуют",
      last: "Ср",
    },
    {
      title: "1, 2, 3",
      subtitle: "Миллионы россиян ежедневно проводят десятки часов свое",
      last: "Пн",
    },
    {
      title: "Design Destroyer",
      subtitle: "В 2008 году художник Jon Rafman  начал собирать",
      last: "Пн",
    },
    {
      title: "Day.",
      subtitle:
        "Так увлёкся работой по курсу, что совсем забыл его анонсировать",
      last: "1 Мая 2020",
    },
    {
      title: "Стас Рогозин",
      subtitle: "Можно или сегодня или завтра вечером.",
      last: "12 Апр 2020",
    },
  ],
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
  ...form,
};

type State = typeof chat;

export class ChatPage extends View<State> {
  constructor(state: State) {
    super(state, {
      Form: new Form(
        {
          fields: state.fields,
          submitTitle: state.submitTitle,
          context: state.context,
        },
        (field: string, value: string) => {
          this.updateState((state) => ({
            ...state,
            fields: {
              ...state.fields,
              [field]: { ...state.fields[field], value },
            },
          }));
        },
        (fields: State["fields"]) => {
          if (validate(fields)) {
            console.log(fields);
          }
        },
      ),
      Separator: new Separator(),
      ChatPreviews: state.chatPreviews.map(
        (chatPreview) => new ChatPreview(chatPreview),
      ),
      ChatView: new ChatView(state.chatInfo),
      OptionsMenu: new OptionsMenu({ optionsMenu: state.optionsMenu }),
    });
  }

  protected render(): string {
    return template;
  }
}
