import { View } from "../../lib/view";
import template from "./counter.hbs?raw";
import "./index.css";

type State = {
  count?: number;
};

export class Counter extends View<State> {
  protected render(): string {
    return this.state.count ? template : "";
  }
}
