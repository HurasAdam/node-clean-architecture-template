import { Model } from "mongoose";
import { IFaqRepository } from "../../../domain/repository.interface";
import { AddFaqDto } from "../../../dto/add";
import { FaqDocument } from "../../models/mongo";

export class FaqRepository implements IFaqRepository {
  private model;
  constructor(model: Model<FaqDocument>) {
    this.model = model;
  }

  async add(currentUserId: string, payload: AddFaqDto) {
    await this.model.create({
      ...payload,
      createdBy: currentUserId,
    });
  }
}
