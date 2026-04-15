import { Router } from "express";
import { SessionController } from "./session.controller";
import SessionModel from "./session.model";
import { SessionRepository } from "./session.repository";
import { SessionService } from "./session.service";

/**
 * prefix
 * /sessions
 */

export const sessionRoutes = Router();
const repository = new SessionRepository(SessionModel);
const service = new SessionService(repository);
const controller = new SessionController(service);

sessionRoutes.get("/", controller.find);
sessionRoutes.delete("/:sessionId", controller.deleteOne);
