/**
 * @copyright 2026 Adam Huras
 * @license Apache-2.0
 */

import { IRoleRepository } from "../../roles/domain/role.repository.interface";
import { IUserRepository } from "../domain/user.repository.interface";
import { CreateUserDto } from "../dto/create-user.dto";

export class UserService {
  constructor(
    private userRepository: IUserRepository,
    private roleRepository: IRoleRepository,
  ) {}

  create(data: CreateUserDto) {
    return this.userRepository.create({
      name: data.name,
      surname: data.surname,
      email: data.email,
      password: data.password,
      role: data.role,
    });
  }

  async find() {
    const users = await this.userRepository.find();

    return users.map((user) => ({
      id: user.id,
      name: user.name,
      surname: user.surname,
      email: user.email,
    }));
  }

  async findWithDetails() {
    const users = await this.userRepository.find();

    return Promise.all(
      users.map(async (user) => {
        const role = await this.roleRepository.findOneById(user.role);

        return {
          ...user,
          role: role
            ? {
                id: role.id,
                name: role.name,
                iconKey: role.iconKey,
              }
            : null,
        };
      }),
    );
  }

  async findWorkspaceCandidates() {
    const [users, roles] = await Promise.all([
      this.userRepository.find(),
      this.roleRepository.find({}),
    ]);

    const roleMap = new Map(roles.map((role) => [role.id, role]));

    return users
      .filter((user) => {
        const role = roleMap.get(user.role);

        return role?.name !== "ADMIN";
      })
      .map((user) => ({
        id: user.id,
        name: user.name,
        surname: user.surname,
        email: user.email,
      }));
  }

  findOne(userId: string) {
    return this.userRepository.findOneById(userId);
  }
}
