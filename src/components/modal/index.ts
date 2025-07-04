import { View } from "../../lib/view";
import template from "./modal.hbs?raw";
import "./index.css";

export type ModalState = {
  visible: boolean;
};

export class Modal extends View<ModalState> {
  constructor(state: ModalState, content: View<object>) {
    super(state, {
      Content: content,
    });
  }

  protected render(): string {
    return template;
  }
}
