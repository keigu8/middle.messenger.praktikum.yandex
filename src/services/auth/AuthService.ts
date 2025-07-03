import {
  AuthApi,
  type SigninRequest,
  type SignupRequest,
  type UserResponse,
} from "../../api/auth";
import { Path, type Router } from "../../lib/router";
import { authPaths } from "./paths";

export class AuthService {
  private _user: UserResponse | null = null;

  constructor(
    private readonly authApi: AuthApi,
    private readonly router: Router,
  ) {}

  public get isAuthorized() {
    return this._user !== null;
  }

  public get user() {
    return this._user;
  }

  public setUser(value: UserResponse) {
    this._user = value;
  }

  public checkPath(pathname: Path) {
    if (this.isAuthorized && !authPaths.has(pathname)) {
      return Path.Messenger;
    } else if (!this.isAuthorized && authPaths.has(pathname)) {
      return Path.Login;
    }
    return null;
  }

  public async init() {
    await this.refreshUser();
  }

  private async refreshUser() {
    await this.authApi
      .user()
      .then((user) => {
        this._user = user;
      })
      .catch(() => {
        this._user = null;
      })
      .finally(() => {
        const path = this.checkPath(window.location.pathname as Path);
        if (path) {
          this.router.go(path);
        }
      });
  }

  public signup(data: SignupRequest) {
    this.authApi.signup(data).then(() => this.refreshUser());
  }

  public login(data: SigninRequest) {
    this.authApi.signin(data).then(() => this.refreshUser());
  }

  public logout() {
    this.authApi.logout().then(() => this.refreshUser());
  }
}
