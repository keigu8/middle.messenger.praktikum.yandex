import { mountRoot } from "../../lib/mountRoot";
import { login, LoginPage } from "./login";

const loginPage = new LoginPage(login);

mountRoot(loginPage.node);
