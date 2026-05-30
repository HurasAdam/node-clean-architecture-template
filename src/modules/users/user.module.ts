/**
 * @copyright 2026 Adam Huras
 * @license Apache-2.0
 */

import { IRoleRepository } from "../roles/domain/role.repository.interface";
import { UserService } from "./application/user.service";
import { IUserRepository } from "./domain/user.repository.interface";
import { UserController } from "./presentation/user.controller";

interface deps {
  userRepository: IUserRepository;
  roleRepository: IRoleRepository;
}

export function createUserModule(deps: deps) {
  const service = new UserService(deps.userRepository, deps.roleRepository);
  const controller = new UserController(service);

  return {
    controller,
  };
}
