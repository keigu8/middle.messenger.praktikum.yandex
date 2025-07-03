import type { ChatApi } from "../../api/chat";
import { WebSocketClient } from "../../lib/ws";
import type { AuthService } from "../auth";
import {
  DataType,
  type DataRequest,
  type DataResponse,
  type GetOldResponse,
  type MessageResponse,
} from "./types";

export class MessageService {
  private _chatId;
  private _ws: WebSocketClient<DataRequest, DataResponse> | null;

  constructor(
    chatId: number,
    private readonly chatApi: ChatApi,
    private readonly authService: AuthService,
  ) {
    this._chatId = chatId;
    this._ws = null;
  }

  private get ws() {
    if (!this._ws) {
      throw Error("Web socket is not initialized");
    }
    return this._ws;
  }

  public async init(
    onMessage: (message: MessageResponse) => void,
    onGetOld: (messages: GetOldResponse) => void,
  ) {
    const { token } = await this.chatApi.getToken({ chatId: this._chatId });
    this._ws = new WebSocketClient(
      `${this.authService.user!.id}/${this._chatId}/${token}`,
    );
    this._ws.subscribe((response: DataResponse) => {
      if (Array.isArray(response)) {
        onGetOld(response);
        return;
      }
      if (response.type === DataType.Message) {
        onMessage(response);
      }
    });
    this._ws.send({
      type: DataType.GetOld,
      content: "0",
    });
    return this;
  }

  public sendMessage(content: string) {
    this.ws.send({
      type: DataType.Message,
      content,
    });
  }
}
