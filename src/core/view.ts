import hbs from "handlebars";
import { compile } from "./compile";

export abstract class View<T extends object> {
  private _state: T;
  private _template: HandlebarsTemplateDelegate;
  private _node: ChildNode;

  constructor(state: T) {
    this._state = state;
    this._template = hbs.compile(this.render());
    this._node = compile(this._template(this._state));
    this._mount();
  }

  private _mount() {
    const root = document.body;

    if (!root) {
      throw new Error("No root element found");
    }

    this._node = compile(this._template(this._state));
    root.appendChild(this._node);
  }

  private _unmount() {
    if (this._node.parentNode) {
      this._node.parentNode.removeChild(this._node);
    }
  }

  protected abstract render(): string;

  public updateState(state: Partial<T>) {
    this._state = { ...this._state, ...state };
    this._unmount();
    this._mount();
  }
}
