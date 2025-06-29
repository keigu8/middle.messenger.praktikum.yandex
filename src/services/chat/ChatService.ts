import type {
  AddUsersToChatRequest,
  ChatApi,
  CreateChatRequest,
  DeleteUsersFromChatRequest,
  GetChatsResponse,
} from "../../api/chat";
import type { AuthService } from "../auth";

export class ChatService {
  private _search: string = "";
  private _chats: GetChatsResponse = [];

  constructor(
    private readonly chatApi: ChatApi,
    private readonly authService: AuthService,
  ) {}

  public get chats() {
    return this._chats;
  }

  public init() {
    return this.refreshChats();
  }

  private async refreshChats() {
    this._chats = await this.chatApi.getChats(
      this._search
        ? {
            title: this._search,
          }
        : {},
    );
  }

  public get search() {
    return this._search;
  }

  public setSearch(value: string) {
    this._search = value;
    return this.refreshChats();
  }

  public createChat(data: CreateChatRequest) {
    this.chatApi.createChat(data).then((response) => {
      this._chats = [
        ...this._chats,
        {
          ...data,
          id: response.id,
          last_message: null,
          avatar: "",
          unread_count: 0,
          created_by: this.authService.user!.id,
        },
      ];
    });
  }

  public addUsersToChat(data: AddUsersToChatRequest) {
    return this.chatApi.addUsersToChat(data);
  }

  public deleteUsersFromChat(data: DeleteUsersFromChatRequest) {
    return this.chatApi.deleteUsersFromChat(data);
  }
}
