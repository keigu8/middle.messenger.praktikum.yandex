import { authService, router } from "./globals";
import page404 from "./pages/404";
import page500 from "./pages/500";
import chatPage from "./pages/chat";
import loginPage from "./pages/login";
import passwordPage from "./pages/password";
import profilePage from "./pages/profile";
import settingsPage from "./pages/settings";
import signupPage from "./pages/signup";

router
  .use("/", loginPage)
  .use("/sign-up", signupPage)
  .use("/settings", settingsPage, () => authService.isAuthorized)
  .use("/messenger", chatPage, () => authService.isAuthorized)
  .use("/password", passwordPage, () => authService.isAuthorized)
  .use("/profile", profilePage, () => authService.isAuthorized)
  .use("/404", page404)
  .use("/500", page500)
  .start();
