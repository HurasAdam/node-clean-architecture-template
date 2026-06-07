/**
 * @copyright 2026 Adam Huras
 * @license Apache-2.0
 */

import { Model } from "mongoose";
import { UpdateUserDto } from "../../../admin/dto/update-user.dto";
import { User } from "../../domain/user.entity";
import { IUserRepository } from "../../domain/user.repository.interface";
import { CreateUserDto } from "../../dto/create-user.dto";
import { UserDocument } from "./user.model";

export class UserRepository implements IUserRepository {
  private model;
  constructor(model: Model<UserDocument>) {
    this.model = model;
  }

  private toDomain(doc: UserDocument): User {
    return new User(
      doc._id.toString(),
      doc.name,
      doc.surname,
      doc.email,
      doc.role,
      doc.isActive,
      doc.lastLogin,
      doc.mustChangePassword,
      doc.createdAt,
    );
  }
  async create(data: CreateUserDto) {
    const doc = await this.model.create(data);
    return this.toDomain(doc);
  }

  async find() {
    const docs = await this.model.find({});
    return docs.map((doc) => this.toDomain(doc));
  }

  async findByIds(ids: string[]): Promise<User[]> {
    const docs = await this.model.find({
      _id: { $in: ids },
    });

    return docs.map((doc) => this.toDomain(doc));
  }

  async findOneById(id: string) {
    const doc = await this.model.findById(id);
    if (!doc) return null;
    return this.toDomain(doc);
  }
  async findOneByEmail(email: string) {
    const doc = await this.model.findOne({ email });
    if (!doc) return null;
    return this.toDomain(doc);
  }

  async deleteOne(id: string) {
    const doc = await this.model.findByIdAndDelete(id);
    if (!doc) return null;
    return this.toDomain(doc);
  }

  findByEmailWithRole(email: string) {
    return this.model.findOne({ email }).populate("role");
  }

  async updateById(id: string, data: UpdateUserDto) {
    const user = await this.model.findById(id);
    if (!user) return null;

    user.name = data.name;
    user.surname = data.surname;

    await user.save();

    return this.toDomain(user);
  }

  async updatePassword(userId: string, password: string) {
    const user = await this.model.findById(userId);
    if (!user) return null;

    user.password = password;
    user.mustChangePassword = true;

    await user.save();

    return this.toDomain(user);
  }

  async updateRole(userId: string, roleId: string) {
    const user = await this.model.findById(userId);
    if (!user) return null;

    user.role = roleId;

    await user.save();

    return this.toDomain(user);
  }
}
