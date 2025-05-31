import hbs from "handlebars";
import { compile } from "./compile";
import { random } from "./random";
import { keys } from "./keys";

export abstract class View<T extends object> {
  private _id: number;
  private _state: T;
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

    this._template = hbs.compile(this.render());
    this._node = compile(this._template({ ...this._state, ...this._stubs }));

    keys(this._views).forEach((id) => {
      const stub = this._node.querySelector(`div[data-viewid="${id}"]`)!;
      this._node.replaceChild(this._views[id].node, stub);
    });
  }

  private _mount() {
    this._node = compile(this._template({ ...this._state, ...this._stubs }));
  }

  private _unmount() {
    if (this._node.parentNode) {
      this._node.parentNode.removeChild(this._node);
    }
  }

  protected abstract render(): string;

  public get id() {
    return this._id;
  }

  public get node() {
    return this._node;
  }

  public updateState(state: Partial<T>) {
    this._state = { ...this._state, ...state };
    this._unmount();
    this._mount();

    // if (this._views) {
    //   for (const key in this._views) {
    //     this._views[key].updateState(state);
    //     const stub = this._node.querySelector(`[data-viewid=${key}]`)!;
    //     this._node.replaceChild(this._views[key].node, stub);
    //   }
    // }
  }
}
