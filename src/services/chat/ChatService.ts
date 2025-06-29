import type {
  ChatApi,
  CreateChatRequest,
  GetChatsResponse,
  GetChatUsersResponse,
} from "../../api/chat";
import { WebSocketClient } from "../../lib/ws";
import type { AuthService } from "../auth";
import type { Message } from "./types";

export class ChatService {
  private _ws: WebSocketClient | null = null;
  private _search: string = "";
  private _chats: GetChatsResponse = [];
  private _selectedChatId: number | null = null;
  private _selectedChatUsers: GetChatUsersResponse = [];

  constructor(
    private readonly chatApi: ChatApi,
    private readonly authService: AuthService,
  ) {}

  private get ws() {
    if (!this._ws) {
      throw Error("Web socket is not initialized");
    }
    return this._ws;
  }

  public get chats() {
    return this._chats;
  }

  public async init() {
    await this.refreshChats();
  }

  private async refreshChats() {
    try {
      this._chats = await this.chatApi.getChats(
        this._search
          ? {
              title: this._search,
            }
          : {},
      );
    } catch (error) {
      console.log(error);
    }
  }

  public get search() {
    return this._search;
  }

  public setSearch(value: string) {
    this._search = value;
    return this.refreshChats();
  }

  public get selectedChatUsers() {
    return this._selectedChatUsers;
  }

  public async selectChat(
    chatId: number,
    callback: (message: Message) => void,
  ) {
    this._selectedChatId = chatId;
    this._selectedChatUsers = await this.chatApi.getChatUsers({ chatId });
    const { token } = await this.chatApi.getToken({ chatId });
    this._ws = new WebSocketClient(
      `${this.authService.user!.id}/${chatId}/${token}`,
    );
    this._ws.subscribe(callback);
    return this._chats.find((chat) => chat.id === chatId);
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

  public send(message: string) {
    this.ws.send(message);
  }
}
