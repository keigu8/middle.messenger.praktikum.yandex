export class WebSocketClient {
  private _socket: WebSocket;

  constructor(path: string) {
    this._socket = new WebSocket(`${import.meta.env.VITE_WS_URL}/${path}`);
  }

  public send(message: string) {
    this._socket.send(
      JSON.stringify({
        content: message,
        type: "message",
      }),
    );
  }

  public subscribe<T>(callback: (message: T) => void) {
    this._socket.addEventListener("message", (event) => {
      console.log(event.data);
      callback(JSON.parse(event.data));
    });
  }
}
