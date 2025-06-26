import { profile, ProfilePage } from "./profile";
import "./index.css";
import { authService } from "../../globals";

const profilePage = new ProfilePage(profile, authService);

export default profilePage;
