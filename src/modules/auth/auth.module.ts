import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

export function createAuthModule(deps: {
  userRepository: any;
  sessionRepository: any;
}) {
  const service = new AuthService(
    deps.sessionRepository,
    deps.sessionRepository,
  );
  const controller = new AuthController(service);

  return {
    controller,
    service,
  };
}
