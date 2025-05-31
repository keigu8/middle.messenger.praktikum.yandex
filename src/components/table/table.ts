import { View } from "../../lib/view";
import template from "./table.hbs?raw";

type State = {
  data: Array<{
    label: string;
    value: string;
  }>;
};

export class Table extends View<State> {
  constructor(state: State) {
    super(state);
  }

  protected render(): string {
    return template;
  }
}
