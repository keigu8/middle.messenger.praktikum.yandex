import { SettingsPage } from "./settings";
import "./index.css";
import { getSettingsPageState } from "./state";
import { authService, userService } from "../../globals";

const settingsPage = new SettingsPage(
  getSettingsPageState(authService.user),
  userService,
);

export default settingsPage;
