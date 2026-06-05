import AppErrorCode from "../../../constants/appErrorCode";
import { CONFLICT, NOT_FOUND } from "../../../constants/http";
import appAssert from "../../../utils/appAssert";
import { IRoleRepository } from "../../roles/domain/role.repository.interface";
import { IUserRepository } from "../../users/domain/user.repository.interface";
import { CreateUserDto } from "../../users/dto/create-user.dto";

export class AdminService {
  private userRepository: IUserRepository;
  private roleRepository: IRoleRepository;
  constructor(
    userRepository: IUserRepository,
    roleRepository: IRoleRepository,
  ) {
    this.userRepository = userRepository;
    this.roleRepository = roleRepository;
  }

  async create(data: CreateUserDto) {
    const role = await this.roleRepository.findOneById(data.role);
    appAssert(role, NOT_FOUND, "Role not found", AppErrorCode.NotFound);

    const existingUser = await this.userRepository.findOneByEmail(data.email);

    appAssert(!existingUser, CONFLICT, "Email already taken");

    return this.userRepository.create({
      name: data.name,
      surname: data.surname,
      email: data.email,
      password: data.password,
      role: role.id,
    });
  }

  async findUserWithDetails(id: string) {
    const user = await this.userRepository.findOneById(id);
    appAssert(user, NOT_FOUND, "User not found");

    const role = await this.roleRepository.findOneById(user.role);

    return {
      ...user,
      role: role
        ? {
            id: role.id,
            name: role.name,
            iconKey: role.iconKey,
            labelColor: role.labelColor,
          }
        : null,
    };
  }

  async resetPassword(id: string) {
    const user = await this.userRepository.findOneById(id);
    appAssert(user, NOT_FOUND, "User not found");

    const tempPassword = this.generateTemporaryPassword();

    await this.userRepository.updatePassword(id, tempPassword);

    return { temporaryPassword: tempPassword };
  }

  private generateTemporaryPassword(length = 10): string {
    const chars =
      "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz0123456789!@#$%&*";

    let result = "";

    for (let i = 0; i < length; i++) {
      result += chars[Math.floor(Math.random() * chars.length)];
    }

    return result;
  }

  async updateUserRole(userId: string, roleId: string) {
    const user = await this.userRepository.findOneById(userId);
    appAssert(user, NOT_FOUND, "User not found");

    const role = await this.roleRepository.findOneById(roleId);
    appAssert(role, NOT_FOUND, "Role not found");

    return this.userRepository.updateRole(userId, role.id);
  }
}
