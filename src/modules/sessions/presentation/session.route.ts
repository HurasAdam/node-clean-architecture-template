import { Router } from "express";

import { container } from "../../../app/initContainer";

/**
 * prefix
 * /sessions
 */

export const sessionRoutes = Router();

sessionRoutes.get(
  "/",
  container.authGuard.authenticate,
  container.session.controller.find,
);
sessionRoutes.delete(
  "/:sessionId",
  container.authGuard.authenticate,
  container.session.controller.deleteOne,
);
