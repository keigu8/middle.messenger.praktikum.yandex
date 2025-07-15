import type { View } from "../view/view.ts";
import { Route } from "./route.ts";
import type { Filter } from "./types";

export class Router {
  private readonly _routes: Route[];
  private _currentRoute: Route | null;
  private _redirects: Filter | null;

  constructor() {
    this._routes = [];
    this._currentRoute = null;
    this._redirects = null;
  }

  public setupRedirects(redirects: Filter) {
    this._redirects = redirects;
  }

  private get history() {
    return window.history;
  }

  private _getRoute(pathname: string) {
    return this._routes.find((route) => route.match(pathname));
  }

  private _onRoute(pathname: string) {
    if (this._redirects) {
      const redirect = this._redirects(pathname);
      if (redirect) {
        window.location.pathname = redirect;
      }
    }

    const route = this._getRoute(pathname);

    if (!route) {
      return;
    }

    if (this._currentRoute && this._currentRoute !== route) {
      this._currentRoute.leave();
    }

    this._currentRoute = route;
    route.navigate();
  }

  public use(pathname: string, view: View<object>) {
    const route = new Route(pathname, view);

    this._routes.push(route);

    return this;
  }

  public start() {
    window.onpopstate = ((event: PopStateEvent) => {
      this._onRoute((event.currentTarget as Window).location.pathname);
    }).bind(this);

    this._onRoute(window.location.pathname);
  }

  public go(pathname: string) {
    this.history.pushState({}, "", pathname);
    this._onRoute(pathname);
  }

  public back() {
    this.history.back();
  }

  public forward() {
    this.history.forward();
  }
}
