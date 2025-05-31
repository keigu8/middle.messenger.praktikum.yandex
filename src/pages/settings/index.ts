import { mountRoot } from "../../lib/mountRoot";
import { settings, SettingsPage } from "./settings";

const settingsPage = new SettingsPage(settings);

mountRoot(settingsPage.node);
