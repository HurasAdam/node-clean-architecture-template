/**
 * @copyright 2026 Adam Huras
 * @license Apache-2.0
 */

import { Model, Types } from "mongoose";
import { FAqItemEntity } from "../../../domain/entity";
import { IFaqItemRepository } from "../../../domain/repository.interface";
import { AddFaqItemDto } from "../../../dto/add";
import { FaqItemDocument } from "../../models/mongo";

export class FaqItemRepository implements IFaqItemRepository {
  private model: Model<FaqItemDocument>;

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

  async countByFaqIds(
    faqIds: string[],
  ): Promise<{ faqId: string; count: number }[]> {
    if (!faqIds.length) return [];

    const results = await this.model.aggregate([
      {
        $match: {
          faqId: {
            $in: faqIds.map((id) => new Types.ObjectId(id)),
          },
        },
      },
      {
        $group: {
          _id: "$faqId",
          count: { $sum: 1 },
        },
      },
    ]);

    return results.map((result) => ({
      faqId: result._id.toString(),
      count: result.count,
    }));
  }

  async findByFaqId(faqId: string): Promise<FAqItemEntity[]> {
    const docs = await this.model.find({ faqId }).sort({ order: 1 });

    return docs.map((doc) => this.toDomain(doc));
  }
}
