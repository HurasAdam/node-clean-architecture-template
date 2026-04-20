import { NextFunction, Request, Response } from "express";
import AppErrorCode from "../constants/appErrorCode";
import { UNAUTHORIZED } from "../constants/http";
import { ISessionRepository } from "../modules/sessions/domain/session.repository.interface";
import { IUserRepository } from "../modules/users/domain/user.repository.interface";
import appAssert from "../utils/appAssert";
import catchErrors from "../utils/catchErrors";
import { verifyToken } from "../utils/jwt";

export class AuthMiddleware {
  private userRepository: IUserRepository;
  private sessionRepository: ISessionRepository;
  constructor(
    userRepository: IUserRepository,
    sessionRepository: ISessionRepository,
  ) {
    this.userRepository = userRepository;
    this.sessionRepository = sessionRepository;
  }

  authenticate = catchErrors(
    async (req: Request, res: Response, next: NextFunction) => {
      const token = req.cookies.accessToken;
      appAssert(token, UNAUTHORIZED, "Invalid access token");
      const { payload, error } = verifyToken(token);

      appAssert(
        payload,
        UNAUTHORIZED,
        error === "jwt expired" ? "Token expired" : "Invalid token",
        AppErrorCode.InvalidAccessToken,
      );

      const user = await this.userRepository.findOneById(
        payload.userId.toString(),
      );

      const session = await this.sessionRepository.findOneById(
        payload.sessionId.toString(),
      );

      appAssert(user, UNAUTHORIZED, "User not found");
      appAssert(session, UNAUTHORIZED, "Session invalidated");

      req.user = user;
      req.userId = payload.userId.toString();
      req.sessionId = payload.sessionId.toString();

      next();
    },
  );

  requirePermissions = (permissions: string[]) =>
    catchErrors(async (req, res, next) => {});
}
