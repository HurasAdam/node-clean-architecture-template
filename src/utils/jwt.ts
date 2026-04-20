import jwt, { SignOptions, VerifyOptions } from "jsonwebtoken";
import { JWT_REFRESH_SECRET, JWT_SECRET } from "../config/env";
import Audience from "../constants/audience";

import { SessionDocument } from "../modules/sessions/infrastructure/session.model";
import { UserDocument } from "../modules/users/infrastructure/mongoose/user.model";

/**
 * ===== PAYLOAD TYPES =====
 */

export type RefreshTokenPayload = {
  sessionId: SessionDocument["_id"];
};

export type AccessTokenPayload = {
  userId: UserDocument["_id"];
  sessionId: SessionDocument["_id"];
};

/**
 * ===== SIGN OPTIONS =====
 */

type SignOptionsAndSecret = SignOptions & {
  secret: string;
};

const signDefaults: SignOptions = {
  audience: Audience.User,
};

/**
 * ===== VERIFY OPTIONS =====
 */

const verifyDefaults: VerifyOptions = {
  audience: Audience.User,
};

/**
 * ===== SIGN CONFIG =====
 */

const accessTokenSignOptions: SignOptionsAndSecret = {
  expiresIn: "15m",
  secret: JWT_SECRET,
};

export const refreshTokenSignOptions: SignOptionsAndSecret = {
  expiresIn: "30d",
  secret: JWT_REFRESH_SECRET,
};

/**
 * ===== SIGN TOKEN =====
 */

export const signToken = (
  payload: AccessTokenPayload | RefreshTokenPayload,
  options?: SignOptionsAndSecret,
) => {
  const { secret, ...signOpts } = options || accessTokenSignOptions;

  return jwt.sign(payload, secret, {
    ...signDefaults,
    ...signOpts,
  });
};

/**
 * ===== VERIFY TOKEN =====
 */

export const verifyToken = <TPayload extends object = AccessTokenPayload>(
  token: string,
  options?: VerifyOptions & {
    secret?: string;
  },
) => {
  const { secret = JWT_SECRET, ...verifyOpts } = options || {};

  try {
    const payload = jwt.verify(token, secret, {
      ...verifyDefaults,
      ...verifyOpts,
    }) as unknown as TPayload;

    return {
      payload,
    };
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};
