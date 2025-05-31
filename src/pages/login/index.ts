import { login, LoginPage } from "./login";

const root = document.getElementById("root")!;

const loginPage = new LoginPage(login);

root.appendChild(loginPage.node);
