import { View } from "../../lib/view";
import type { ChatService } from "../../services/chat";
import { Button } from "../button";
import template from "./chatView.hbs?raw";
import "./index.css";

type State = {
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
  regexp: RegExp;
  isError?: boolean;
  value: string;
  selected: boolean;
};

export class ChatView extends View<State> {
  constructor(
    state: State,
    chatService: ChatService,
    onOptionsMenuButtonClick: VoidFunction,
  ) {
    super(
      state,
      {
        Button: new Button(
          {
            type: "submit",
            title: state.sendTitle,
            className: "chatView__send",
          },
          (event) => {
            event.preventDefault();
            chatService.send(this.state.value);
          },
        ),
        OptionsMenuButton: new Button(
          {
            type: "button",
            src: "/assets/menu.svg",
            className: "chatView__button",
          },
          () => {
            onOptionsMenuButtonClick();
          },
        ),
      },
      {
        blur: (event: FocusEvent) => {
          //@ts-expect-error target.value exists on FocusEvent
          const value = event.target.value;
          if (this.state.regexp && !this.state.regexp.test(value)) {
            this.updateState((state) => ({ ...state, value, isError: true }));
          } else {
            this.updateState((state) => ({ ...state, value, isError: false }));
          }
        },
      },
      ".chatView__input",
    );
  }

  protected render(): string {
    return template;
  }
}
