import { IDatabaseCredentials } from "../server/models/DatabaseCredentials";
import IDatabaseContext from "../server/interfaces/IDatabaseContext";
import { FilterDatabaseDto } from "../server/api/models/DTOs/FilterDatabaseDto";
// This is used for pool connections and improve performance
const r = require("rethinkdbdash");

class Rethink implements IDatabaseContext {
  private readonly _pool: any;

  private constructor(options: IDatabaseCredentials) {
    this._pool = r({
      host: options.host,
      db: options.database,
      user: options.user,
      password: options.password,
      port: options.port,
    });
  }

  public static async constructorAsync(
    options: IDatabaseCredentials
  ): Promise<Rethink> {
    return new Rethink(options);
  }

  public async getAllDocumentsByFilter(
    options: FilterDatabaseDto
  ): Promise<any[]> {
    let table = this._pool.table(options.table);
    if (typeof options.filters !== "undefined" && options.filters.length > 0) {
      table = table.filter((doc: any) => {
        let expr: any;
        options.filters?.forEach((option) => {
          if (typeof expr === "undefined")
            expr = this._pool.expr(option.values).contains(doc(option.key));
          else
            expr = expr.and(
              this._pool.expr(option.values).contains(doc(option.key))
            );
        });
        return expr;
      });
    }
    if (typeof options.orderBy != "undefined") {
      if (options.orderBy.order === "asc")
        table = table.orderBy(options.orderBy.key);
      else table = table.orderBy(this._pool.desc(options.orderBy.key));
    }
    if (typeof options.offset !== "undefined")
      table = table.skip(options.offset).limit(options.limit);
    return table.run();
  }
}

export default Rethink;
