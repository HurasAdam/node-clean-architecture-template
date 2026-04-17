import { Model } from "mongoose";
import { CreateUserDto } from "./dto/create-user.dto";

export interface IUSER {
  id: number;
  name: string;
  surname: string;
}

export class UserRepository {
  private model;
  constructor(model: Model<any>) {
    this.model = model;
  }

  create(data: CreateUserDto) {
    return this.model.create(data);
  }

  find() {
    return this.model.find({});
  }

  findOneById(id: string) {
    return this.model.findById(id);
  }
  findOneByEmail(email: string) {
    return this.model.findOne({ email });
  }

  deleteOne() {
    console.log("TODO");
  }

  findByEmailWithRole(email: string) {
    return this.model.findOne({ email }).populate("role");
  }
}
