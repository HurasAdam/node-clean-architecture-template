import { Router } from "express";
import { AuthController } from "./auth.controller";
import { authGuard, authService } from "./auth.provider";

export const authRoutes = Router();

/**
 * prefix
 * /auth
 */

const controller = new AuthController(authService);

authRoutes.get("/me", authGuard.authenticate, controller.findMe);
authRoutes.post("/login", controller.login);
authRoutes.get("/logout", authGuard.authenticate, controller.logout);
