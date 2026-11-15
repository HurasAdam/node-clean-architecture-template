import { Model } from "mongoose";
import { FAqItemEntity } from "../../../domain/entity";
import { IFaqItemRepository } from "../../../domain/repository.interface";
import { AddFaqItemDto } from "../../../dto/add";
import { FaqItemDocument } from "../../models/mongo";

export class FaqItemRepository implements IFaqItemRepository {
  private model: Model<any>;

  constructor(model: Model<FaqItemDocument>) {
    this.model = model;
  }

  toDomain(document: FaqItemDocument) {
    return new FAqItemEntity(
      document._id.toString(),
      document.faqId.toString(),
      document.question,
      document.answer,
      document.createdBy.toString(),
      document.createdAt,
    );
  }

  async add(currentUserId: string, payload: AddFaqItemDto): Promise<void> {
    await this.model.create({
      ...payload,
      createdBy: currentUserId,
    });
  }
}
