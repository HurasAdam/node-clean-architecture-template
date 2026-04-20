import { Router } from "express";
import { UserRepository } from "../users/infrastructure/mongoose/user.repository";
import UserModel from "../users/user.model";

const adminRoutes = Router();

/**
 * prefix
 * /admin
 */

const userRepository = new UserRepository(UserModel);

adminRoutes.post("/create-account");
