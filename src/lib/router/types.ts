export enum Path {
  Login = "/",
  Signup = "sign-up",
  Messenger = "/messenger",
  Settings = "/settings",
  Password = "/password",
  Profile = "/profile",
}

export type Filter = (pathname: string) => string | null;
