import { signup, SignupPage } from "./signup";
import "./index.css";
import { AuthService } from "../../services/auth";

const authService = new AuthService();
const signupPage = new SignupPage(signup, authService);

export default signupPage;
