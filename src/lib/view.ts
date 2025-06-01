import hbs from "handlebars";
import { render } from "./render";
import { random } from "./random";
import { keys } from "./keys";
import EventBus from "./eventBus";

type Handlers = Partial<{
  [P in keyof HTMLElementEventMap]?: (event: HTMLElementEventMap[P]) => void;
}>;

export abstract class View<T extends object> {
  static Lifecycle = {
    Init: "init",
    Cdm: "component-did-mount",
    Cdu: "component-did-update",
    Render: "render",
  };

  private _id: number;
  protected _state: T;
  private _stubs: Record<string, string> = {};
  private _views: Record<string, View<object>> = {};
  private _template!: HandlebarsTemplateDelegate;
  private _node!: HTMLElement;
  private _handlerNodeSelector?: string;
  private _handlers: Handlers;
  private _eventBus = new EventBus();

  constructor(
    state: T,
    views?: Record<string, View<object> | Array<View<object>>>,
    handlers?: Handlers,
    handlerNodeSelector?: string,
  ) {
    this._id = random();
    this._initLifecycle();
    this._state = this._makeStateProxy(state);

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

    this._handlers = handlers || {};
    this._handlerNodeSelector = handlerNodeSelector;

    this._eventBus.emit(View.Lifecycle.Init);
  }

  private _initLifecycle() {
    this._eventBus.on(View.Lifecycle.Init, this._init.bind(this));
    this._eventBus.on(View.Lifecycle.Cdm, this._componentDidMount.bind(this));
    this._eventBus.on(View.Lifecycle.Cdu, this._componentDidUpdate.bind(this));
    this._eventBus.on(View.Lifecycle.Render, this._render.bind(this));
  }

  private _makeStateProxy(state: T) {
    const emit = this._eventBus.emit.bind(this._eventBus);

    return new Proxy<T>(state, {
      get(target: T, property: string) {
        const value = target[property as keyof T];
        return typeof value === "function" ? value.bind(target) : value;
      },
      // eslint-disable-next-line
      set(target: T, property: string, value: any) {
        const oldTarget = { ...target };
        target[property as keyof T] = value;
        emit(View.Lifecycle.Cdu, oldTarget, target);
        return true;
      },
      deleteProperty() {
        throw new Error("No access to deleting property from state");
      },
    });
  }

  private _init() {
    this._template = hbs.compile(
      this.render() || `<div style="width: 0; height: 0; opacity: 0"></div>`,
    );

    this._eventBus.emit(View.Lifecycle.Render);
  }

  private _mount(parent: HTMLElement | null, position: number | null) {
    let handlerNode = this._node;
    if (this._handlerNodeSelector) {
      handlerNode = this._node.querySelector(this._handlerNodeSelector)!;
    }
    keys(this._handlers).forEach((handler) => {
      //@ts-expect-error 
      handlerNode?.addEventListener(handler, this._handlers[handler]);
    });

    if (parent && position !== null) {
      parent.insertBefore(this._node, parent.childNodes[position]);
    }
    this._eventBus.emit(View.Lifecycle.Cdm);
  }

  private _componentDidMount() {
    this.componentDidMount();
  }

  private _componentDidUpdate(oldState: T, newState: T) {
    const response = this.componentDidUpdate(oldState, newState);

    if (!response) {
      return;
    }

    this._eventBus.emit(View.Lifecycle.Render);
  }

  private _render() {
    const parent = this._node && this._node.parentElement;
    const position =
      parent && Array.from(parent.childNodes).indexOf(this._node);

    if (this._node) {
      this._unmount(parent);
    }

    this._node = render(this._template({ ...this._state, ...this._stubs }));
    keys(this._views).forEach((id) => {
      const stub = this._node.querySelector(`div[data-viewid="${id}"]`);
      if (stub && stub.parentNode) {
        stub.parentNode.replaceChild(this._views[id].node, stub);
        this._views[id].dispatchComponentDidMount();
      }
    });

    this._mount(parent, position);
  }

  private _unmount(parent: HTMLElement | null) {
    let handlerNode = this._node;
    if (this._handlerNodeSelector) {
      handlerNode = this._node.querySelector(this._handlerNodeSelector)!;
    }
    keys(this._handlers).forEach((handler) => {
      //@ts-expect-error
      handlerNode?.removeEventListener(handler, this._handlers[handler]);
    });

    if (parent) {
      parent.removeChild(this._node);
    }
  }

  protected get state() {
    return this._state;
  }

  protected componentDidMount() {
    return true;
  }

  protected componentDidUpdate(_oldState: T, _newState: T) {
    return true;
  }

  protected abstract render(): string;

  public get id() {
    return this._id;
  }

  public get node() {
    return this._node;
  }

  public dispatchComponentDidMount() {
    this._eventBus.emit(View.Lifecycle.Cdm);
  }

  public updateState(updator: (state: T) => T) {
    Object.assign(this._state, updator(this._state));
  }
}
