import { View } from "../../lib/view";
import template from "./modal.hbs?raw";

type State = {
  visible: boolean;
};

export class Modal extends View<State> {
  constructor(state: State, content: View<object>) {
    super(state, {
      Content: content,
    });
  }

  protected render(): string {
    return this._state.visible ? template : "";
  }
}
