import { mountRoot } from "../../lib/mountRoot";
import { signup, SignupPage } from "./signup";
import "./index.css";

const signupPage = new SignupPage(signup);

mountRoot(signupPage.node);
