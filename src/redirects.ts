import type { Filter, Path } from "./lib/router";
import { type AuthService } from "./services/auth";

export const getRedirects = (authService: AuthService): Filter => {
  return (pathname: string) => {
    return authService.checkPath(pathname as Path);
  };
};
