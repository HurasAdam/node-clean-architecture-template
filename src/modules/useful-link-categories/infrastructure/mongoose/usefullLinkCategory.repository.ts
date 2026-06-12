/**
 * @copyright 2026 Adam Huras
 * @license Apache-2.0
 */

import { Model } from "mongoose";
import { UsefullLinkCategory } from "../../domain/usefullLinkCategory.entity";
import { IUsefullLinkCategoryRepository } from "../../domain/usefullLinkCategory.repository.interface";
import { UsefulLinkCategoryDocument } from "./usefullLinkCategory.model";

export class UsefullLinkCategoryRepository implements IUsefullLinkCategoryRepository {
  private model;
  constructor(model: Model<UsefulLinkCategoryDocument>) {
    this.model = model;
  }

  toDomain(doc: UsefulLinkCategoryDocument): UsefullLinkCategory {
    return new UsefullLinkCategory(
      doc._id.toString(),
      doc.name,
      doc.isActive,
      doc.createdAt,
    );
  }

  create(userId: string, data: any) {
    return this.model.create({
      ...data,
      createdBy: userId,
    });
  }

  async find(filters?: any): Promise<UsefullLinkCategory[]> {
    const query: Record<string, unknown> = {};

    if (filters?.name) {
      query.name = { $regex: filters.name, $options: "i" };
    }
    const docs = await this.model.find(query);

    return docs.map((doc) => this.toDomain(doc));
  }

  async findOne(id: string): Promise<UsefullLinkCategory | null> {
    const doc = await this.model.findById(id);
    if (!doc) return null;
    return this.toDomain(doc);
  }

  async findByName(name: string): Promise<UsefullLinkCategory | null> {
    const doc = await this.model.findOne({ name });

    return doc ? this.toDomain(doc) : null;
  }

  async updateOne(id: string, payload: any): Promise<unknown | null> {
    const doc = await this.model.findByIdAndUpdate(id, payload, {
      new: true,
    });
    if (!doc) return null;

    return this.toDomain(doc);
  }

  async findByProductId() {}

  deleteOne() {}
}
