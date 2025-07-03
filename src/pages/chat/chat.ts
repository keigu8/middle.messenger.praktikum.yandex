import { AddUsersToChatModalContent } from "../../components/addUsersToChatModalContent";
import { Button } from "../../components/button";
import { ChatPreview } from "../../components/chatPreview";
import { ChatView } from "../../components/chatView";
import { DeleteUsersFromChatModalContent } from "../../components/deleteUsersFromChatModalContent";
import { Form, mapFields, type FormState } from "../../components/form";
import { validate } from "../../components/form/validateForm";
import { Modal, type ModalState } from "../../components/modal";
import { OptionsMenu } from "../../components/optionsMenu";
import { Separator } from "../../components/separator";
import { UserItem } from "../../components/userItem";
import { authService, chatService, router, userService } from "../../globals";
import { View } from "../../lib/view";
import template from "./chat.hbs?raw";
import { appendMessageToMessagesByDate, getMessagesByDate } from "./utils";

type SearchForm = {
  search: string;
};

export type ChatPageState = {
  title: string;
  profile: {
    title: string;
  };
  chatPreviews: Array<{
    id: number;
    title: string;
    subtitle: string;
    last: string;
    count?: number;
  }>;
  placeholder: string;
  chatInfo: {
    title: string;
    messagesByDate: Array<{
      date: string;
      messages: Array<{
        content: string;
        side: string;
        time: string;
      }>;
    }>;
    sendTitle: string;
    inputPlaceholder: string;
  };
  optionsMenu: string[];
  showCreateChatButton: boolean;
  modals: {
    addUsersToChat: ModalState;
    deleteUsersFromChat: ModalState;
  };
} & FormState<SearchForm>;

export class ChatPage extends View<ChatPageState> {
  constructor(state: ChatPageState) {
    const addUsersToChatModal = new Modal(
      {
        visible: state.modals.addUsersToChat.visible,
      },
      new AddUsersToChatModalContent(
        {
          users: [],
          fields: {
            searchUser: {
              value: "",
              label: "Поиск пользователей",
              type: "text",
            },
          },
          submitTitle: "",
          context: "addUsersModal",
        },
        chatService,
        userService,
        () => {
          addUsersToChatModal.updateState(() => ({ visible: false }));
        },
      ),
    );

    const deleteUsersFromChatModalContent = new DeleteUsersFromChatModalContent(
      { users: [] },
      chatService,
      () => {
        deleteUsersFromChatModal.updateState(() => ({ visible: false }));
      },
    );
    const deleteUsersFromChatModal = new Modal(
      {
        visible: state.modals.deleteUsersFromChat.visible,
      },
      deleteUsersFromChatModalContent,
    );

    const optionsMenu = new OptionsMenu(
      {
        optionsMenu: state.optionsMenu,
        visible: false,
      },
      (index: number) => {
        if (index === 0) {
          addUsersToChatModal.updateState(() => ({ visible: true }));
        } else if (index === 1) {
          deleteUsersFromChatModalContent.updateViews({
            UserItems: chatService.selectedChatUsers.map(
              (user) =>
                new UserItem(user, (userId) => {
                  chatService.deleteUsersFromChat(userId);
                }),
            ),
          });
          deleteUsersFromChatModal.updateState(() => ({ visible: true }));
        }
      },
    );

    const chatView = new ChatView(
      {
        ...state.chatInfo,
        regexp: state.fields.search.regexp!,
        value: "",
        selected: false,
      },
      chatService,
      () => {
        optionsMenu.updateState((state) => ({
          ...state,
          visible: !state.visible,
        }));
      },
    );

    super(state, {
      Form: new Form(
        {
          fields: state.fields,
          submitTitle: state.submitTitle,
          context: state.context,
        },
        (field: string, value: string) => {
          this.updateState((state) => ({
            ...state,
            fields: {
              ...state.fields,
              [field]: { ...state.fields[field as keyof SearchForm], value },
            },
          }));

          if (validate(this.state.fields)) {
            chatService
              .setSearch(mapFields(this.state.fields).search)
              .then(() => {
                if (chatService.chats.length === 0) {
                  this.updateState((state) => ({
                    ...state,
                    showCreateChatButton: true,
                  }));
                }
              });
          } else {
            chatService.setSearch("").then(() => {
              this.updateState((state) => ({
                ...state,
                showCreateChatButton: false,
              }));
            });
          }
        },
        () => {},
      ),
      Separator: new Separator(),
      ChatPreviews: state.chatPreviews.map(
        (chatPreview) =>
          new ChatPreview(chatPreview, async (chatId) => {
            chatService
              .selectChat(
                chatId,
                (message) => {
                  chatView.updateState((state) => ({
                    ...state,
                    messagesByDate: appendMessageToMessagesByDate(
                      state.messagesByDate,
                      message,
                      authService.user!.id,
                    ),
                  }));
                },
                (messages) => {
                  chatView.updateState((state) => ({
                    ...state,
                    messagesByDate: getMessagesByDate(
                      messages,
                      authService.user!.id,
                    ),
                  }));
                },
              )
              .then((chat) => {
                chatView.updateState((state) => ({
                  ...state,
                  title: chat?.title || "",
                  selected: true,
                }));
              });
          }),
      ),
      CreateChatButton: new Button(
        { type: "button", title: "Создать чат", className: "chat__button" },
        () => {
          chatService.createChat({ title: chatService.search });
        },
      ),
      ChatView: chatView,
      AddUsersToChatModal: addUsersToChatModal,
      DeleteUsersFromChatModal: deleteUsersFromChatModal,
      OptionsMenu: optionsMenu,
      ProfileButton: new Button(
        {
          type: "button",
          title: state.profile.title,
          className: "chat__link",
        },
        () => router.go("/profile"),
      ),
    });
  }

  protected render(): string {
    return template;
  }
}
