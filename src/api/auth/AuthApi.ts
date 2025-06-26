import { HTTPTransport, type SuccessResponse } from "../../lib/http";
import type { SigninRequest, SignupRequest, SignupResponse } from "./types";

export class AuthApi {
  private readonly url = `${import.meta.env.VITE_API_URL}/auth`;
  private readonly http: HTTPTransport;

  constructor() {
    this.http = new HTTPTransport();
  }

  public signup(request: SignupRequest) {
    return this.http.post<SignupResponse>(`${this.url}/signup`, {
      data: request,
    });
  }

  public signin(request: SigninRequest) {
    return this.http.post<SuccessResponse>(`${this.url}/signin`, {
      data: request,
    });
  }

  public user() {
    return this.http.get(`${this.url}/user`);
  }

  public logout() {
    return this.http.post(`${this.url}/logout`);
  }
}
