import type { View } from "../view";
import { Route } from "./route";

export class Router {
    private readonly _routes: Route[];
    private _currentRoute: Route | null;

    constructor() {
        this._routes = [];
        this._currentRoute = null;
    }

    private get history() {
        return window.history;
    }

    private _getRoute(pathname: string) {
        return this._routes.find(route => route.match(pathname));
    }

    private _onRoute(pathname: string) {
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
            //@ts-expect-error
            this._onRoute(event.currentTarget?.location.pathname);
        }).bind(this);

        this._onRoute(window.location.pathname);
    }

    public go(pathname: string) {
        this.history.pushState({}, '', pathname);
        this._onRoute(pathname);
    }

    public back() {
        this.history.back();
    }

    public forward() {
        this.history.forward();
    }
}
