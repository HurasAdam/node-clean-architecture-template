/**
 * @copyright 2026 Adam Huras
 * @license Apache-2.0
 */

import { OK } from "../../../constants/http";
import catchErrors from "../../../utils/catchErrors";
import {
  clearAuthCookies,
  getAccessTokenCookieOptions,
  getRefreshTokenCookieOptions,
} from "../../../utils/cookies";

import { AuthService } from "../application/auth.service";
import { LoginUserDto } from "../dto/login-user.dto";

export class AuthController {
  private service;
  constructor(authService: AuthService) {
    this.service = authService;
  }

  login = catchErrors(async ({ body }, res) => {
    const payload: LoginUserDto = body;
    const serviceResponse = await this.service.login(payload);

    res.cookie(
      "accessToken",
      serviceResponse.accessToken,
      getAccessTokenCookieOptions(),
    );
    res.cookie(
      "refreshToken",
      serviceResponse.refreshToken,
      getRefreshTokenCookieOptions(),
    );

    return res.status(200).json(serviceResponse.user);
  });

  changePassword = catchErrors(async (req, res) => {
    const { userId: currentUserId } = req;
    const payload = req.body;
    await this.service.changePassword(currentUserId, payload);
    return res.sendStatus(OK);
  });

  findMe = catchErrors(async (req, res) => {
    const { userId } = req;
    const user = await this.service.me(userId);
    return res.status(200).json(user);
  });

  logout = catchErrors(async ({ cookies }, res) => {
    await this.service.logout(cookies.accessToken);

    return clearAuthCookies(res)
      .status(OK)
      .json({ message: "Logout successful" });
  });

  refresh = catchErrors(async (req, res) => {
    const { cookies } = req;
    const refreshToken = cookies.refreshToken;

    const { accessToken, newRefreshToken } =
      await this.service.refresh(refreshToken);

    if (newRefreshToken) {
      res.cookie(
        "refreshToken",
        newRefreshToken,
        getRefreshTokenCookieOptions(),
      );
    }

    res.cookie("accessToken", accessToken, getAccessTokenCookieOptions());

    return res.status(200).json({ message: "Access token refreshed" });
  });
}
