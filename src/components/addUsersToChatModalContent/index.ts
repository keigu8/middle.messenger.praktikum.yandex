import { View } from "../../lib/view";
import type { ChatService } from "../../services/chat";
import type { UserService } from "../../services/user";
import { Form, type FormState } from "../form";
import { UserItem } from "../userItem";
import template from "./addUsersToChatModalContent.hbs?raw";

type SearchUsersForm = {
  searchUser: string;
};

type State = {
  users: Array<{
    id: number;
    login: string;
  }>;
} & FormState<SearchUsersForm>;

export class AddUsersToChatModalContent extends View<State> {
  constructor(
    state: State,
    chatService: ChatService,
    userService: UserService,
    onSuccess: VoidFunction,
  ) {
    super(state, {
      Form: new Form(
        {
          fields: state.fields,
          context: state.context,
          submitTitle: state.submitTitle,
        },
        (field: string, value: string) => {
          this.updateState((state) => ({
            ...state,
            fields: {
              ...state.fields,
              [field]: {
                ...state.fields[field as keyof SearchUsersForm],
                value,
              },
            },
          }));

          userService.search({ login: value }).then((users) => {
            this.updateViews({
              UserItems: users.map(
                (user) =>
                  new UserItem(user, (userId) => {
                    chatService.addUserToChat(userId)?.then(() => onSuccess());
                  }),
              ),
            });
          });
        },
        () => {},
      ),
      UserItems: state.users.map(
        (user) =>
          new UserItem(user, (userId) => {
            chatService.addUserToChat(userId)?.then(() => onSuccess());
          }),
      ),
    });
  }

  protected render(): string {
    return template;
  }
}
