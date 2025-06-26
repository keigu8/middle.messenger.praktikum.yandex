import { AuthApi, type SignupRequest } from "../../api/auth";

export class AuthService {
  private readonly authApi: AuthApi;

  constructor() {
    this.authApi = new AuthApi();
  }

  public async signup(data: SignupRequest) {
    await this.authApi.signup(data);
  }
}
