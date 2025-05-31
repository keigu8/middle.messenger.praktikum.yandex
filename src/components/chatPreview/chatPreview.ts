import { View } from "../../lib/view";
import type { chat } from "../../pages/chat";
import template from "./chatPreview.hbs?raw";

type State = (typeof chat)["chatPreviews"][0];

export class ChatPreview extends View<State> {
  protected render(): string {
    return template;
  }
}
