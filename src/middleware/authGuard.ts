import { NextFunction, Request, Response } from "express";
import AppErrorCode from "../constants/appErrorCode";
import { UNAUTHORIZED } from "../constants/http";
import { AuthService } from "../modules/auth/auth.service";
import appAssert from "../utils/appAssert";
import catchErrors from "../utils/catchErrors";
import { verifyToken } from "../utils/jwt";

export class AuthMiddleware {
  private authService;
  constructor(authService: AuthService) {
    this.authService = authService;
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

      const { user } = await this.authService.validateSession(
        payload.userId.toString(),
        payload.sessionId.toString(),
      );

      req.user = user;
      req.userId = payload.userId.toString();
      req.sessionId = payload.sessionId.toString();

      next();
    },
  );

  requirePermissions = (permissions: string[]) =>
    catchErrors(async (req, res, next) => {});
}
