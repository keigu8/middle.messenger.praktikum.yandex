import { View } from "../../lib/view";
import type { ChatService } from "../../services/chat";
import { UserItem } from "../userItem";
import template from "./deleteUsersFromChatModalContent.hbs?raw";

type State = {
  users: Array<{
    id: number;
    login: string;
  }>;
};

export class DeleteUsersFromChatModalContent extends View<State> {
  constructor(state: State, chatService: ChatService) {
    super(state, {
      UserItems: state.users.map(
        (user) =>
          new UserItem(user, (userId) => {
            chatService.deleteUsersFromChat(userId);
          }),
      ),
    });
  }

  protected render(): string {
    return template;
  }
}
