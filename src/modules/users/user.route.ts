import { Router } from "express";
import { UserController } from "./user.controller";
import UserModel from "./user.model";
import { UserRepository } from "./user.repository";
import { UserService } from "./user.service";

/**
 * prefix
 * /users
 */

export const userRoutes = Router();
const repository = new UserRepository(UserModel);
const service = new UserService(repository);
const controller = new UserController(service);

/**
 * ROUTES
 */

userRoutes.get("/", controller.find);
userRoutes.get("/:userId", controller.findOne);
userRoutes.post("/create", controller.create);
