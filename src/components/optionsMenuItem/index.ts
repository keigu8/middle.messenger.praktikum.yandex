import { View } from "../../lib/view";
import template from "./optionsMenuItem.hbs?raw";

type State = {
  title: string;
};

export class OptionsMenuItem extends View<State> {
  constructor(state: State, onClick: VoidFunction) {
    super(state, {}, { click: onClick });
  }

  protected render(): string {
    return template;
  }
}
