import { mountRoot } from "../../lib/mountRoot";
import { settings, SettingsPage } from "./settings";
import "./index.css";

const settingsPage = new SettingsPage(settings);

mountRoot(settingsPage);
