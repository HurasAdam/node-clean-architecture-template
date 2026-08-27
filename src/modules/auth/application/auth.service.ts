/**
 * @copyright 2026 Adam Huras
 * @license Apache-2.0
 */

import AppErrorCode from "../../../constants/appErrorCode";
import { FORBIDDEN, NOT_FOUND, UNAUTHORIZED } from "../../../constants/http";
import appAssert from "../../../utils/appAssert";
import {
  RefreshTokenPayload,
  refreshTokenSignOptions,
  signToken,
  verifyToken,
} from "../../../utils/jwt";
import { IRoleRepository } from "../../roles/domain/role.repository.interface";
import { ISessionRepository } from "../../sessions/domain/session.repository.interface";
import { IUserRepository } from "../../users/domain/user.repository.interface";
import { LoginUserDto } from "../dto/login-user.dto";

export class AuthService {
  private userRepository: IUserRepository;
  private sessionRepository: ISessionRepository;
  private roleRepository: IRoleRepository;
  constructor(
    userRepository: IUserRepository,
    sessionRepository: ISessionRepository,
    roleRepository: IRoleRepository,
  ) {
    this.userRepository = userRepository;
    this.sessionRepository = sessionRepository;
    this.roleRepository = roleRepository;
  }

  async login(payload: LoginUserDto) {
    const user = await this.userRepository.findByEmailWithRole(payload.email);
    appAssert(
      user,
      UNAUTHORIZED,
      "Invalid email or password",
      AppErrorCode.InvalidCredentials,
    );

    const isValid = user.comparePassword(payload.password);
    appAssert(
      isValid,
      UNAUTHORIZED,
      "Invalid email or password",
      AppErrorCode.InvalidCredentials,
    );
    appAssert(
      user.isActive,
      FORBIDDEN,
      "Account is disabled",
      AppErrorCode.AccountDisabled,
    );

    // if valid crednetials
    user.lastLogin = new Date();
    await user.save();
    const userId = user._id;

    const session = await this.sessionRepository.create(userId);
    const sessionInfo = {
      sessionId: session._id,
    };

    const refreshToken = signToken(sessionInfo, refreshTokenSignOptions);
    const accessToken = signToken({
      ...sessionInfo,
      userId,
    });

    return {
      user: user.omitPassword(),
      accessToken,
      refreshToken,
    };
  }

  async logout(token: string) {
    const { payload } = verifyToken(token || "");

    if (payload) {
      return await this.sessionRepository.deleteOne(
        payload.sessionId.toString(),
      );
    }
  }

  async me(id: string) {
    const user = await this.userRepository.findOneById(id);

    appAssert(user, NOT_FOUND, "User not found");

    const role = await this.roleRepository.findOneById(user.role);

    appAssert(role, NOT_FOUND, "Role not found");

    return {
      ...user,
      role,
    };
  }

  async refresh(refreshToken: string) {
    appAssert(refreshToken, UNAUTHORIZED, "Missing refresh token");

    const { payload } = verifyToken<RefreshTokenPayload>(refreshToken, {
      secret: refreshTokenSignOptions.secret,
    });

    appAssert(payload, UNAUTHORIZED, "Invalid refresh token");

    const session = await this.sessionRepository.findOneById(
      payload.sessionId.toString(),
    );

    appAssert(session && session.isActive(), UNAUTHORIZED, "Session expired");

    const shouldRotate = session.willExpireSoon();

    if (shouldRotate) {
      session.extendExpirationTime();
    }

    await this.sessionRepository.updateExpiration(session);

    const newRefreshToken = shouldRotate
      ? signToken(
          {
            sessionId: session.id,
          },
          refreshTokenSignOptions,
        )
      : undefined;

    const accessToken = signToken({
      userId: session.userId,
      sessionId: session.id,
    });

    return {
      accessToken,
      newRefreshToken,
    };
  }

  async validateSession(userId: string, sessionId: string) {
    const user = await this.userRepository.findOneById(userId);
    appAssert(user, UNAUTHORIZED, "User not found");

    const session = await this.sessionRepository.findOneById(sessionId);
    appAssert(session, FORBIDDEN, "Session invalidated");
    return { user: user, session };
  }
}
