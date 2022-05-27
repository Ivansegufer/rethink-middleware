import IDatabaseContext from "./interfaces/IDatabaseContext";
import WebSocketServer from "./websocket/WebsocketServer";
import GetterRouter from "./api/routes/GetterRouter";
import http, { Server as HttpServer } from "http";
import express, { Application } from "express";
import "dotenv/config";
import helmet from "helmet";
import morgan from "morgan";

class Server {
  // private readonly _wsServer: WebSocketServer;
  private readonly _httpServer: HttpServer;
  private readonly _app: Application;
  private readonly _getterRouter: GetterRouter;

  private constructor(context: IDatabaseContext) {
    this._app = express();
    this._httpServer = http.createServer(this._app);
    // this._wsServer = new WebSocketServer(this._httpServer, context);
    this._getterRouter = new GetterRouter(context, process.env.BASE_URI);
  }

  public static async constructorAsync(
    context: IDatabaseContext
  ): Promise<Server> {
    const server = new Server(context);
    server._startServices();
    return server;
  }

  public run(): void {
    const port = parseInt(process.env.PORT);
    this._httpServer.listen(port, () =>
      console.log(`Server running in port: ${port}`)
    );
  }

  private _startServices(): void {
    this._startMiddlewares();
    this._loadRoutes();
  }

  private _startMiddlewares() {
    this._app.use(helmet());
    this._app.use(morgan("dev"));
    this._app.use(express.json());
  }

  private _loadRoutes() {
    this._app.use("/", this._getterRouter.router);
  }
}

export default Server;
