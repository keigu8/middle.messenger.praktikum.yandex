import { mountRoot } from "../../lib/mountRoot";
import { login, LoginPage } from "./login";
import "./index.css";

const loginPage = new LoginPage(login);

mountRoot(loginPage);

setTimeout(() => {
    loginPage.updateState(state => ({...state, title: 'kek'}))
}, 1000)
