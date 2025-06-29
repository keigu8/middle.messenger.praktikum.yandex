import { View } from "../../lib/view";
import template from "./optionsMenu.hbs?raw";
import "./index.css";
import { OptionsMenuItem } from "../optionsMenuItem";

type State = {
  optionsMenu: string[];
  visible: boolean;
};

export class OptionsMenu extends View<State> {
  constructor(state: State, onClick: (index: number) => void) {
    super(state, {
      OptionsMenuItems: state.optionsMenu.map(
        (title, index) => new OptionsMenuItem({ title }, () => onClick(index)),
      ),
    });
  }

  protected render(): string {
    return template;
  }
}
