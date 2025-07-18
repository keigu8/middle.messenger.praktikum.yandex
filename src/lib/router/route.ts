import type { View } from "../view";

export class Route {
  private _pathname: string;
  private readonly _view: View<object>;

  constructor(pathname: string, view: View<object>) {
    this._pathname = pathname;
    this._view = view;
  }

  private get root() {
    const root = document.getElementById("root");

    if (!root) {
      throw new Error("No root element");
    }

    return root;
  }

  public match(pathname: string) {
    return this._pathname === pathname;
  }

  public navigate() {
    this.root.appendChild(this._view.node);
    this._view.dispatchComponentDidMount();
  }

  public leave() {
    this.root.removeChild(this._view.node);
  }
}
