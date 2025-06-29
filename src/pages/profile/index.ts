import { ProfilePage } from "./profile";
import "./index.css";
import { authService } from "../../globals";
import { getProfileState } from "./state";

const profilePage = new ProfilePage(
  getProfileState(authService.user),
  authService,
);

export default profilePage;
