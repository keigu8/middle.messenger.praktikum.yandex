import { View } from "../../lib/view";
import template from "./userItem.hbs?raw";

type State = {
  login: string;
  id: number;
};

export class UserItem extends View<State> {
  constructor(state: State, onClick: (id: number) => void) {
    super(state, undefined, { click: () => onClick(state.id) });
  }

  protected render(): string {
    return template;
  }
}
