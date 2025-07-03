export class WebSocketClient<T extends object, R extends object> {
  private _socket: WebSocket;

  constructor(path: string) {
    this._socket = new WebSocket(`${import.meta.env.VITE_WS_URL}/${path}`);
  }

  public send(data: T) {
    try {
      this._socket.send(JSON.stringify(data));
    } catch (_error) {
      this._socket.addEventListener("open", () => {
        this._socket.send(JSON.stringify(data));
      });
    }
  }

  public subscribe(callback: (message: R) => void) {
    this._socket.addEventListener("message", (event) => {
      callback(JSON.parse(event.data));
    });
  }
}
