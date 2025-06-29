import { Api } from "../../lib/api";
import { type SuccessResponse } from "../../lib/http";
import type {
  SigninRequest,
  SignupRequest,
  SignupResponse,
  UserResponse,
} from "./types";

export class AuthApi extends Api {
  protected get prefix(): string {
    return "auth";
  }

  public signup(request: SignupRequest) {
    return this.http.post<SignupResponse>(this.path("signup"), {
      data: request,
    });
  }

  public signin(request: SigninRequest) {
    return this.http.post<SuccessResponse>(this.path("signin"), {
      data: request,
    });
  }

  public user() {
    return this.http.get<UserResponse>(this.path("user"));
  }

  public logout() {
    return this.http.post<SuccessResponse>(this.path("logout"));
  }
}
