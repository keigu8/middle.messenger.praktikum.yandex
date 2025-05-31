import { mountRoot } from "../../lib/mountRoot";
import { password, PasswordPage } from "./password";

const passwordPage = new PasswordPage(password);

mountRoot(passwordPage.node);
