import { AuthMiddleware } from "../../middleware/authGuard";
import { SessionRepository } from "../sessions/infrastructure/mongoose/session.repository";
import SessionModel from "../sessions/infrastructure/session.model";

import UserModel from "../users/infrastructure/mongoose/user.model";
import { UserRepository } from "../users/infrastructure/mongoose/user.repository";

import { AuthService } from "./auth.service";

const userRepository = new UserRepository(UserModel);
const sessionRepository = new SessionRepository(SessionModel);
export const authService = new AuthService(userRepository, sessionRepository);
export const authGuard = new AuthMiddleware(authService);
