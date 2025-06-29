import { ChatPreview } from "../../components/chatPreview";
import { ChatView } from "../../components/chatView";
import { Form, type FormState } from "../../components/form";
import { validate } from "../../components/form/validateForm";
import { OptionsMenu } from "../../components/optionsMenu";
import { Separator } from "../../components/separator";
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
        },
        () => {
          if (validate(this.state.fields)) {
            console.log(this.state.fields);
          }
        },
      ),
      Separator: new Separator(),
      ChatPreviews: state.chatPreviews.map(
        (chatPreview) => new ChatPreview(chatPreview),
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
