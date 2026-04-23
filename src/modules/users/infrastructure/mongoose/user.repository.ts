import { Model } from "mongoose";

import { User } from "../../domain/user.entity";
import { IUserRepository } from "../../domain/user.repository.interface";
import { CreateUserDto } from "../../dto/create-user.dto";
import { UserDocument } from "./user.model";

export class UserRepository implements IUserRepository {
  private model;
  constructor(model: Model<UserDocument>) {
    this.model = model;
  }

  private toDomain(doc: any): User {
    return new User(
      doc._id.toString(),
      doc.name,
      doc.surname,
      doc.email,
      doc.role?.name,
    );
  }
  create(data: CreateUserDto) {
    return this.model.create(data);
  }

  async find() {
    const docs = await this.model.find({});
    return docs.map((doc) => this.toDomain(doc));
  }

  async findOneById(id: string) {
    const doc = await this.model.findById(id);
    return this.toDomain(doc);
  }
  async findOneByEmail(email: string) {
    const doc = await this.model.findOne({ email });
    return this.toDomain(doc);
  }

  deleteOne() {
    console.log("TODO");
  }

  findByEmailWithRole(email: string) {
    return this.model.findOne({ email }).populate("role");
  }
}
