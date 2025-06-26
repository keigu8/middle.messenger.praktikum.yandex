import {
  AuthApi,
  type SigninRequest,
  type SignupRequest,
} from "../../api/auth";
import type { Router } from "../../lib/router";

export class AuthService {
  private readonly authApi: AuthApi;

  constructor(private readonly router: Router) {
    this.authApi = new AuthApi();
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
}
