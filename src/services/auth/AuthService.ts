import {
  AuthApi,
  type SigninRequest,
  type SignupRequest,
} from "../../api/auth";
import type { Router } from "../../lib/router";

export class AuthService {
  constructor(
    private readonly authApi: AuthApi,
    private readonly router: Router,
  ) {}

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
