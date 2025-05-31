import { mountRoot } from "../../lib/mountRoot";
import { signup, SignupPage } from "./signup";

const signupPage = new SignupPage(signup);

mountRoot(signupPage.node);
