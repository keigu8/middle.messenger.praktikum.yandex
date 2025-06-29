import { View } from "../../lib/view";
import { Counter } from "../counter";
import template from "./chatPreview.hbs?raw";
import "./index.css";

type State = {
  id: number;
  title: string;
  subtitle: string;
  last: string;
  count?: number;
};

export class ChatPreview extends View<State> {
  constructor(state: State, onClick: (id: number) => Promise<void>) {
    super(
      state,
      {
        Counter: new Counter({
          count: state.count,
        }),
      },
      {
        click: async () => {
          await onClick(state.id);
        },
      },
    );
  }

  protected render(): string {
    return template;
  }
}
