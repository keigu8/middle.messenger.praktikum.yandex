import { signup, SignupPage } from "./signup";
import "./index.css";
import { authService } from "../../globals";

const signupPage = new SignupPage(signup, authService);

export default signupPage;
