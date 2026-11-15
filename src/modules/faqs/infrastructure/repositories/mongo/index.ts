import { Model } from "mongoose";
import { FAqEntity } from "../../../domain/entity";
import { IFaqRepository } from "../../../domain/repository.interface";
import { AddFaqDto } from "../../../dto/add";
import { FaqDocument } from "../../models/mongo";

export class FaqRepository implements IFaqRepository {
  private model: Model<FaqDocument>;
  constructor(model: Model<FaqDocument>) {
    this.model = model;
  }

  toDomain(document: FaqDocument) {
    return new FAqEntity(
      document._id.toString(),
      document.title,
      document.description,
      document.status,
      document.iconKey,
      document.createdBy.toString(),
      document.createdAt,
    );
  }

  async add(currentUserId: string, payload: AddFaqDto) {
    await this.model.create({
      ...payload,
      createdBy: currentUserId,
    });
  }

  async findByTitle(title: string): Promise<FAqEntity | null> {
    const doc = await this.model.findOne({ title });
    if (!doc) return null;
    return this.toDomain(doc);
  }

  async find() {
    const docs = await this.model.find();
    return docs.map((doc) => this.toDomain(doc));
  }
}
