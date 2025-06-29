import { View } from "../../lib/view";
import template from "./table.hbs?raw";
import "./index.css";

export type TableState = {
  data: Array<{
    label: string;
    value: string;
  }>;
};

export class Table extends View<TableState> {
  constructor(state: TableState) {
    super(state);
  }

  protected render(): string {
    return template;
  }
}
