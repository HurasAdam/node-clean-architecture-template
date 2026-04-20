import { SessionService } from "./application/session.service";
import { SessionRepository } from "./infrastructure/mongoose/session.repository";
import SessionModel from "./infrastructure/session.model";
import { SessionController } from "./presentation/session.controller";

export function createSessionModule() {
  const repository = new SessionRepository(SessionModel);
  const service = new SessionService(repository);
  const controller = new SessionController(service);

  return {
    controller,
    repository,
  };
}
