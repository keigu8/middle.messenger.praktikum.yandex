import type {
  ChatApi,
  CreateChatRequest,
  GetChatsResponse,
} from "../../api/chat";
import type { AuthService } from "../auth";

export class ChatService {
  private _search: string = "";
  private _chats: GetChatsResponse = [];
  private _selectedChatId: number | null = null;

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

  public addUserToChat(userId: number) {
    if (!this._selectedChatId) {
      return;
    }
    return this.chatApi.addUsersToChat({
      chatId: this._selectedChatId,
      users: [userId],
    });
  }

  public deleteUsersFromChat(userId: number) {
    if (!this._selectedChatId) {
      return;
    }
    return this.chatApi.deleteUsersFromChat({
      chatId: this._selectedChatId,
      users: [userId],
    });
  }
}
