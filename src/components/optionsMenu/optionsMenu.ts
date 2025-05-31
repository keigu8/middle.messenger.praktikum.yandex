import { View } from "../../lib/view";
import template from "./optionsMenu.hbs?raw";

type State = {
  optionsMenu: string[];
};

export class OptionsMenu extends View<State> {
  protected render(): string {
    return template;
  }
}
