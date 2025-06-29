import { AuthApi } from "./api/auth";
import { ChatApi } from "./api/chat";
import { UserApi } from "./api/user";
import { Router } from "./lib/router";
import { AuthService } from "./services/auth";
import { ChatService } from "./services/chat";
import { UserService } from "./services/user/UserService";

export const router = new Router();

export const authApi = new AuthApi();
export const userApi = new UserApi();
export const chatApi = new ChatApi();

export const authService = new AuthService(authApi, router);
await authService.init();

export const userService = new UserService(userApi, authService);

export const chatService = new ChatService(chatApi, authService);
await chatService.init();
