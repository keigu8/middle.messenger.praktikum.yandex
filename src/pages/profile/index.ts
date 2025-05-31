import { mountRoot } from "../../lib/mountRoot";
import { profile, ProfilePage } from "./profile";

const profilePage = new ProfilePage(profile);

mountRoot(profilePage.node);
