import { mountRoot } from "../../lib/mountRoot";
import { profile, ProfilePage } from "./profile";
import "./index.css";

const profilePage = new ProfilePage(profile);

mountRoot(profilePage.node);
