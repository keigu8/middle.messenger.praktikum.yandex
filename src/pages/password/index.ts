import { PasswordPage } from "./password";
import "./index.css";
import { getPasswordPageState } from "./state";
import { userService } from "../../globals";

const passwordPage = new PasswordPage(getPasswordPageState(), userService);

export default passwordPage;
