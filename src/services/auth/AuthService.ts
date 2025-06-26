import {
  AuthApi,
  type SigninRequest,
  type SignupRequest,
  type UserResponse,
} from "../../api/auth";
import type { Router } from "../../lib/router";

export class AuthService {
  private user: UserResponse | null = null;

  constructor(
    private readonly authApi: AuthApi,
    private readonly router: Router,
  ) {}

  public get isAuthorized() {
    return this.user !== null;
  }

  public async init() {
    await this.authApi
      .user()
      .then((user) => {
        this.user = user;
      })
      .catch(() => {
        this.user = null;
      });
  }

  public async signup(data: SignupRequest) {
    await this.authApi.signup(data).then(() => {
      this.router.go("/messenger");
    });
  }

  public async login(data: SigninRequest) {
    await this.authApi.signin(data).then(() => {
      this.router.go("/messenger");
    });
  }

  public async logout() {
    await this.authApi.logout().then(() => {
      this.router.go("/");
    });
  }
}
