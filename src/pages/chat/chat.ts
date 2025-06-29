import { Button } from "../../components/button";
import { ChatPreview } from "../../components/chatPreview";
import { ChatView } from "../../components/chatView";
import { Form, mapFields, type FormState } from "../../components/form";
import { validate } from "../../components/form/validateForm";
import { OptionsMenu } from "../../components/optionsMenu";
import { Separator } from "../../components/separator";
import { chatService } from "../../globals";
import { View } from "../../lib/view";
import template from "./chat.hbs?raw";

type SearchForm = {
  search: string;
};

export type ChatPageState = {
  title: string;
  profile: {
    title: string;
  };
  chatPreviews: Array<{
    title: string;
    subtitle: string;
    last: string;
    count?: number;
  }>;
  placeholder: string;
  chatInfo: {
    title: string;
    messagesByDate: Array<{
      date: string;
      messages: Array<{
        content: string;
        side: string;
        time: string;
      }>;
    }>;
    sendTitle: string;
    inputPlaceholder: string;
  };
  optionsMenu: string[];
  showCreateChatButton: boolean;
} & FormState<SearchForm>;

export class ChatPage extends View<ChatPageState> {
  constructor(state: ChatPageState) {
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
              [field]: { ...state.fields[field as keyof SearchForm], value },
            },
          }));

          if (validate(this.state.fields)) {
            chatService
              .setSearch(mapFields(this.state.fields).search)
              .then(() => {
                if (chatService.chats.length === 0) {
                  this.updateState((state) => ({
                    ...state,
                    showCreateChatButton: true,
                  }));
                }
              });
          } else {
            chatService.setSearch("").then(() => {
              this.updateState((state) => ({
                ...state,
                showCreateChatButton: false,
              }));
            });
          }
        },
        () => {},
      ),
      Separator: new Separator(),
      ChatPreviews: state.chatPreviews.map(
        (chatPreview) => new ChatPreview(chatPreview),
      ),
      CreateChatButton: new Button(
        { type: "button", title: "Создать чат", className: "chat__button" },
        () => {
          chatService.createChat({ title: chatService.search });
        },
      ),
      ChatView: new ChatView({
        ...state.chatInfo,
        regexp: state.fields.search.regexp!,
        value: "",
      }),
      OptionsMenu: new OptionsMenu({ optionsMenu: state.optionsMenu }),
    });
  }

  protected render(): string {
    return template;
  }
}
