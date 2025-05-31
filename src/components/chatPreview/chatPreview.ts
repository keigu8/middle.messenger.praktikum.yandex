import { View } from "../../lib/view";
import { Counter } from "../counter/counter";
import template from "./chatPreview.hbs?raw";

type State = {
  title: string;
  subtitle: string;
  last: string;
  count?: number;
};

export class ChatPreview extends View<State> {
  constructor(state: State) {
    super(state, {
      Counter: new Counter({
        count: state.count,
      }),
    });
  }

  protected render(): string{
    return template;
  }
}
