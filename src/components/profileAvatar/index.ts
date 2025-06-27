import { View } from "../../lib/view";
import template from "./profileAvatar.hbs?raw";

export type ProfileAvatarState = {
  alt: string;
  src: string;
  context: string;
  text: string;
};

export class ProfileAvatar extends View<ProfileAvatarState> {
  constructor(state: ProfileAvatarState, onClick: VoidFunction) {
    super(state, {}, { click: () => onClick() });
  }
  protected render(): string {
    return template;
  }
}
