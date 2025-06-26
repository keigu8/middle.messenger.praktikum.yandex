import { login, LoginPage } from "./login";
import "./index.css";
import { authService } from "../../globals";

const loginPage = new LoginPage(login, authService);

export default loginPage;
