import Rethink from "./databases/Rethink";
import Server from "./server/Server";
import "dotenv/config";

(async () => {
  try {
    const rethinkdb = await Rethink.constructorAsync({
      host: process.env.HOST_RETHINK,
      database: process.env.DATABASE_RETHINK,
      user: process.env.USER_RETHINK,
      password: process.env.PASSWORD_RETHINK,
      port: parseInt(process.env.PORT_RETHINK),
    });
    const server = await Server.constructorAsync(rethinkdb);
    server.run();
  } catch (err: any) {
    console.log("Error boostrap - error detail:", err.message);
  }
})();
