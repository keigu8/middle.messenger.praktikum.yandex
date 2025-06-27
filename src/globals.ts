import { AuthApi } from "./api/auth";
import { UserApi } from "./api/user";
import { Router } from "./lib/router";
import { AuthService } from "./services/auth";
import { UserService } from "./services/user/UserService";

export const router = new Router();

export const authApi = new AuthApi();
export const userApi = new UserApi();

export const authService = new AuthService(authApi, router);
await authService.init();

export const userService = new UserService(userApi, authService);
await userService.init();
