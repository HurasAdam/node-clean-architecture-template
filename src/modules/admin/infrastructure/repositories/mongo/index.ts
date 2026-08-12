import { Model } from "mongoose";
import { IAdminRepository } from "../../../domain/repository.interface";
import { AdminDocument } from "../../models/mongo";

export class AdminRepository implements IAdminRepository {
  private model;

  constructor(model: Model<AdminDocument>) {
    this.model = model;
  }

  findByLogin(login: string) {
    return this.model.findOne({ login });
  }
}
