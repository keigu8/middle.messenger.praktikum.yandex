import { Api } from "../../lib/api";
import type { SuccessResponse } from "../../lib/http";
import type {
  AddUsersToChatRequest,
  CreateChatRequest,
  CreateChatResponse,
  DeleteUsersFromChatRequest,
  GetChatsRequest,
  GetChatsResponse,
  GetChatUsersRequest,
  GetChatUsersResponse,
} from "./types";

export class ChatApi extends Api {
  protected get prefix(): string {
    return "chats";
  }

  public getChats(request: GetChatsRequest) {
    return this.http.get<GetChatsResponse>(this.path(), { data: request });
  }

  public createChat(request: CreateChatRequest) {
    return this.http.post<CreateChatResponse>(this.path(), { data: request });
  }

  public addUsersToChat(request: AddUsersToChatRequest) {
    return this.http.put<SuccessResponse>(this.path("users"), {
      data: request,
    });
  }

  public deleteUsersFromChat(request: DeleteUsersFromChatRequest) {
    return this.http.delete<SuccessResponse>("users", { data: request });
  }

  public getChatUsers(request: GetChatUsersRequest) {
    return this.http.get<GetChatUsersResponse>(
      this.path(`${request.chatId}/users`),
      {
        data: request,
      },
    );
  }
}
