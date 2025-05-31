import { View } from "../../lib/view";
import template from './chatView.hbs?raw';

type State = {
    title: string;
    messagesByDate: Array<
        {
          date: string;
          messages: Array<
            {
              content: string;
              side: string;
              time: string;
            }
            >
        }
      >,
      sendTitle: string;
      inputPlaceholder: string;
};

export class ChatView extends View<State> {
    constructor(state: State) {
        super(state);
    }

    protected render(): string {
        return template;
    }
}
