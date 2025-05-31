import hbs from "handlebars";
import { compile } from "./compile";
import { random } from "./random";
import { keys } from "./keys";

export abstract class View<T extends object> {
  private _id: number;
  protected _state: T;
  private _stubs: Record<string, string> = {};
  private _views: Record<string, View<object>> = {};
  private _template: HandlebarsTemplateDelegate;
  private _node: HTMLElement;

  constructor(
    state: T,
    views?: Record<string, View<object> | Array<View<object>>>,
  ) {
    this._id = random();

    this._state = state;

    if (views) {
      keys(views).forEach((key) => {
        if (Array.isArray(views[key])) {
          views[key].forEach((view) => {
            this._views[view.id] = view;
          });
          this._stubs[key] = views[key]
            .map((view) => `<div data-viewid="${view.id}"></div>`)
            .join("");
        } else {
          this._views[views[key].id] = views[key];
          this._stubs[key] = `<div data-viewid="${views[key].id}"></div>`;
        }
      });
    }

    const rendered =
      this.render() || `<div style="width: 0; height: 0; opacity: 0"></div>`;
    this._template = hbs.compile(rendered);

    this._node = compile(this._template({ ...this._state, ...this._stubs }));
    keys(this._views).forEach((id) => {
      const stub = this._node.querySelector(`div[data-viewid="${id}"]`);
      if (stub && stub.parentNode) {
        stub.parentNode.replaceChild(this._views[id].node, stub);
      }
    });
  }

  private _mount(parent: HTMLElement) {
    this._node = compile(this._template({ ...this._state, ...this._stubs }));
    keys(this._views).forEach((id) => {
      const stub = this._node.querySelector(`div[data-viewid="${id}"]`);
      if (stub && stub.parentNode) {
        stub.parentNode.replaceChild(this._views[id].node, stub);
      }
    });

    parent.appendChild(this._node);
  }

  private _unmount(parent: HTMLElement) {
    parent.removeChild(this._node);
  }

  protected abstract render(): string;

  public get id() {
    return this._id;
  }

  public get node() {
    return this._node;
  }

  protected get state() {
    return this._state;
  }

  public updateState(updator: (state: T) => T) {
    this._state = updator(this._state);

    const parent = this._node.parentElement;
    if (parent) {
      this._unmount(parent);
      this._mount(parent);
    }
  }
}
