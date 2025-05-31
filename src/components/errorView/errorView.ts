import { View } from "../../lib/view";
import template from "./errorView.hbs?raw";

export type State = {
  title: string;
  subtitle: string;
  link: string;
};

export class ErrorView extends View<State> {
  constructor(state: State) {
    super(state);
  }

  protected render(): string {
    return template;
  }
}
