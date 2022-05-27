import IDatabaseContext from "../interfaces/IDatabaseContext";
import { Server as HttpServer } from "http";
import { Server } from "socket.io";

class WebSocketServer {
  private readonly _webSocketServer: Server;
  private readonly _context: IDatabaseContext;

  constructor(app: HttpServer, context: IDatabaseContext) {
    this._context = context;
    this._webSocketServer = new Server(app);
  }
}

export default WebSocketServer;
