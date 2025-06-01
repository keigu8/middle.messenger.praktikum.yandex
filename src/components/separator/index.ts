import { View } from "../../lib/view";
import template from "./separator.hbs?raw";
import "./index.css";

export class Separator extends View<{}> {
  constructor() {
    super({});
  }

  protected render(): string {
    return template;
  }
}
