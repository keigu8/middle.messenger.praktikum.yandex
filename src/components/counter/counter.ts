import { View } from "../../core/view";
import template from "./counter.hbs?raw";

type State = {
  count: number;
};

export class Counter extends View<State> {
  protected render(): string {
    return template;
  }
}
