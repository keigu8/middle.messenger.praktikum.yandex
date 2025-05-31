import { View } from "../../lib/view";
import template from "./separator.hbs?raw";

export class Separator extends View<{}> {
  constructor() {
    super({});
  }

  protected render(): string {
    return template;
  }
}
