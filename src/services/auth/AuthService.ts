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

  public async init() {
    await this.authApi
      .user()
      .then((user) => {
        this._user = user;
      })
      .catch(() => {
        this._user = null;
      });
  }

  public signup(data: SignupRequest) {
    this.authApi.signup(data).then(() => {
      this.router.go("/messenger");
    });
  }

  public login(data: SigninRequest) {
    this.authApi.signin(data).then(() => {
      this.router.go("/messenger");
    });
  }

  public logout() {
    this.authApi.logout().then(() => {
      this.router.go("/");
    });
  }
}
