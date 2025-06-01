export default class EventBus {
  private _listeners: Record<string, Function[]>;

  constructor() {
    this._listeners = {};
  }

  public on(event: string, callback: Function) {
    if (!this._listeners[event]) {
      this._listeners[event] = [];
    }

    this._listeners[event].push(callback);
  }

  public off(event: string, callback: Function) {
    if (!this._listeners[event]) {
      throw new Error(`No listeners for event ${event}`);
    }

    this._listeners[event] = this._listeners[event].filter(
      (listener) => listener !== callback,
    );

    if (!this._listeners[event]) {
      delete this._listeners[event];
    }
  }

  public emit<T extends any[] = []>(event: string, ...args: T) {
    console.log(event);
    if (!this._listeners[event]) {
      throw new Error(`No listeners for event ${event}`);
    }

    this._listeners[event].forEach(function (listener) {
      listener(...args);
    });
  }
}
