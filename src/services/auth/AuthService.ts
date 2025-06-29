import {
  AuthApi,
  type SigninRequest,
  type SignupRequest,
  type UserResponse,
} from "../../api/auth";
import type { Router } from "../../lib/router";

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

  public async init() {
    await this.refreshUser();
  }

  private async refreshUser() {
    await this.authApi
      .user()
      .then((user) => {
        this._user = user;
        this.router.go("/messenger");
      })
      .catch(() => {
        this._user = null;
        this.router.go("/");
      });
  }

  public signup(data: SignupRequest) {
    this.authApi.signup(data).then(() => {
      this.router.go("/messenger");
    });
  }

  public login(data: SigninRequest) {
    this.authApi.signin(data).then(() => this.refreshUser());
  }

  public logout() {
    this.authApi.logout().then(() => {
      this.router.go("/");
    });
  }
}
