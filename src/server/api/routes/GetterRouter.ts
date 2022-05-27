import { Router } from "express";
import IDatabaseContext from "../../interfaces/IDatabaseContext";
import GetterController from "../controllers/GetterController";
import validateRequest from "../middlewares/ValidationRequest";
import FiltersQuery from "../schema/FiltersQuery";

class GetterRouter {
  private readonly _controller: GetterController;
  private readonly _uri: string;
  private readonly _router: Router;

  public constructor(context: IDatabaseContext, uri: string) {
    this._controller = new GetterController(context);
    this._uri = uri;
    this._router = Router();
    this._loadRoutes();
  }

  private _loadRoutes(): void {
    this._router
      .route(this._uri)
      .post(
        validateRequest(FiltersQuery),
        this._controller.getRows.bind(this._controller)
      );
  }

  public get router() {
    return this._router;
  }
}

export default GetterRouter;
