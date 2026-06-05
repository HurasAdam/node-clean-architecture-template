/**
 * @copyright 2026 Adam Huras
 * @license Apache-2.0
 */

import { CreateUserDto } from "../dto/create-user.dto";
import { User } from "./user.entity";

export interface IUserRepository {
  create(data: CreateUserDto): Promise<User>;

  find(): Promise<User[]>;

  findByIds(ids: string[]): Promise<User[]>;

  findOneById(id: string): Promise<User | null>;

  findOneByEmail(email: string): Promise<User | null>;

  deleteOne(id: string): Promise<User | null>;

  findByEmailWithRole(email: string): Promise<any>;
  updatePassword(id: string, password: string): Promise<any>;

  updateRole(id: string, roleId: String): Promise<User | null>;
}
