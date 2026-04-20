import AppErrorCode from "../../constants/appErrorCode";
import { FORBIDDEN, UNAUTHORIZED } from "../../constants/http";
import appAssert from "../../utils/appAssert";
import {
  refreshTokenSignOptions,
  signToken,
  verifyToken,
} from "../../utils/jwt";
import { ISessionRepository } from "../sessions/domain/session.repository.interface";
import { IUserRepository } from "../users/domain/user.repository.interface";
import { LoginUserDto } from "./dto/login-user.dto";

export class AuthService {
  private userRepository: IUserRepository;
  private sessionRepository: ISessionRepository;
  constructor(
    userRepository: IUserRepository,
    sessionRepository: ISessionRepository,
  ) {
    this.userRepository = userRepository;
    this.sessionRepository = sessionRepository;
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
    console.log(payload);
    if (payload) {
      return await this.sessionRepository.deleteOne(
        payload.sessionId.toString(),
      );
    }
  }

  async me(id: string) {
    const user = await this.userRepository.findOneById(id);
    return {
      id: user.id,
      name: user.name,
      surname: user.surname,
      email: user.email,
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
