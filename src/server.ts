import "dotenv/config";
import express from "express";
import { connectDb } from "./config/db";
import { SERVER_PORT } from "./config/env";
import { routes } from "./routes";

const app = express();

app.use("/api", routes);

connectDb(app, serverInit);

function serverInit() {
  app.listen(SERVER_PORT, () => {
    console.log(`Server is running on PORT : ${SERVER_PORT}`);
  });
}
