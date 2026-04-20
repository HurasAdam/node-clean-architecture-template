import { Router } from "express";
import { container } from "../../../app/initContainer";

/**
 * prefix
 * /users
 */

export const userRoutes = Router();

/**
 * ROUTES
 */

userRoutes.get("/", container.user.controller.find);
userRoutes.get("/:userId", container.user.controller.findOne);
userRoutes.post("/create", container.user.controller.create);
