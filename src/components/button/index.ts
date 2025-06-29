import { View } from "../../lib/view";
import template from "./button.hbs?raw";

type State = {
  type: string;
  title?: string;
  src?: string;
  className: string;
};

export class Button extends View<State> {
  constructor(state: State, onClick: (event: Event) => void) {
    super(state, undefined, {
      click: onClick,
    });
  }

  protected render(): string {
    return template;
  }
}
