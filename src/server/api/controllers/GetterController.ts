import { Request, Response } from "express";
import IDatabaseContext from "../../interfaces/IDatabaseContext";
import { FilterPayload } from "../models/FilterPayload";

class GetterController {
  private readonly _context: IDatabaseContext;

  public constructor(context: IDatabaseContext) {
    this._context = context;
  }

  public async getRows(req: Request<{}, {}, FilterPayload>, res: Response) {
    if (typeof req.body.offset !== typeof req.body.limit) {
      return res.status(404).json({
        success: false,
        data: null,
        message:
          "offset y limit deben ambos ser enviados u omitidos, no se puede enviar solo uno de ellos",
      });
    }
    try {
      const data = await this._context.getAllDocumentsByFilter(req.body);
      res.json({
        success: true,
        data,
        message: "OK",
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        data: null,
        message:
          "Error interno, trate de nuevo luego o comuniquese con el administrador",
      });
    }
  }
}

export default GetterController;
