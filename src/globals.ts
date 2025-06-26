import { AuthApi } from "./api/auth";
import { Router } from "./lib/router";
import { AuthService } from "./services/auth";

export const router = new Router();

export const authApi = new AuthApi();

export const authService = new AuthService(router);
