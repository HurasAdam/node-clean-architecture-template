/**
 * @copyright 2026 Adam Huras
 * @license Apache-2.0
 */

import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Express } from "express";
import { APP_ORIGIN } from "../config/env";
import { initContainer } from "./initContainer";
import { initDatabase } from "./initDatabase";
import { initHttpServer } from "./initHttpServer";
import { initMiddleware } from "./initMiddleware";
import { initRoutes } from "./initRoutes";
export async function bootstrap(app: Express, port: string) {
  try {
    await initDatabase();
    console.log("🟢 Database has been connected");

    app.use(express.json({ limit: "2mb" }));
    app.use(cookieParser());
    app.use(
      cors({
        origin: [`${APP_ORIGIN}`],
        credentials: true,
      }),
    );
    const container = initContainer();
    initRoutes(app, container);

    initMiddleware(app);

    initHttpServer(app, port);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}
