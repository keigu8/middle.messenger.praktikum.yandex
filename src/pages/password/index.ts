import { mountRoot } from "../../lib/mountRoot";
import { password, PasswordPage } from "./password";
import "./index.css";

const passwordPage = new PasswordPage(password);

mountRoot(passwordPage.node);
