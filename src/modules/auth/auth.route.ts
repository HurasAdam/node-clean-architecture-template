import { Router } from "express";
import { container } from "../../app/initContainer";

export const authRoutes = Router();

/**
 * prefix
 * /auth
 */

authRoutes.get(
  "/me",
  container.authGuard.authenticate,
  container.auth.controller.findMe,
);
authRoutes.post("/login", container.auth.controller.login);
authRoutes.get(
  "/logout",
  container.authGuard.authenticate,
  container.auth.controller.logout,
);
