import { UserService } from "./application/user.service";
import UserModel from "./infrastructure/mongoose/user.model";
import { UserRepository } from "./infrastructure/mongoose/user.repository";
import { UserController } from "./presentation/user.controller";

export function createUserModule() {
  const repository = new UserRepository(UserModel);
  const service = new UserService(repository);
  const controller = new UserController(service);

  return {
    controller,
    repository,
  };
}
