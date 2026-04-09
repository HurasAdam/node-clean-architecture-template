import { Router } from "express";
import { userController } from "./user.controller";
import { userRepository } from "./user.repository";
import { userService } from "./user.service";

/**
 * prefix
 * /users
 */

export const userRoutes = Router();
const repository = new userRepository();
const service = new userService(repository);
const controller = new userController(service);
userRoutes.get("/", controller.create);
