import type {
  ChatApi,
  CreateChatRequest,
  GetChatsResponse,
  GetChatUsersResponse,
} from "../../api/chat";
import type { AuthService } from "../auth";
import {
  MessageService,
  type GetOldResponse,
  type MessageResponse,
} from "../message";

export class ChatService {
  private _search: string = "";
  private _chats: GetChatsResponse = [];
  private _selectedChatId: number | null = null;
  private _selectedChatUsers: GetChatUsersResponse = [];
  private _messageService: MessageService | null = null;

  constructor(
    private readonly chatApi: ChatApi,
    private readonly authService: AuthService,
  ) {}

  public get chats() {
    return this._chats;
  }

  public async init() {
    await this.refreshChats();
  }

  private get messageService() {
    if (!this._messageService) {
      throw new Error("Message Service is not initialized");
    }
    return this._messageService;
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
    onMessage: (message: MessageResponse) => void,
    onGetOld: (messages: GetOldResponse) => void,
  ) {
    this._selectedChatId = chatId;
    this._selectedChatUsers = await this.chatApi.getChatUsers({ chatId });
    this._messageService = new MessageService(
      chatId,
      this.chatApi,
      this.authService,
    );
    this._messageService.init(onMessage, onGetOld);
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
    this.messageService.sendMessage(message);
  }
}
