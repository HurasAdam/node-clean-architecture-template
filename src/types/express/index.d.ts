import { UserWithoutPassword } from "../../modules/users/user.model";

declare global {
  namespace Express {
    interface Request {
      userId: string;
      sessionId: string;
      user: UserWithoutPassword;
    }
  }
}

export {};
