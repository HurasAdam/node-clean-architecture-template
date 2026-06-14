/**
 * @copyright 2026 Adam Huras
 * @license Apache-2.0
 */

import { Model } from "mongoose";
import { UsefullLink } from "../../domain/usefullLink.entity";
import { IUsefullLinkRepository } from "../../domain/usefullLink.repository.interface";
import { UsefullLinkDocument } from "./usefullLink.model";

export class UsefullLinkRepository implements IUsefullLinkRepository {
  private model;
  constructor(model: Model<UsefullLinkDocument>) {
    this.model = model;
  }

  toDomain(doc: UsefullLinkDocument): UsefullLink {
    return new UsefullLink(
      doc._id.toString(),
      doc.name,
      doc.url,
      doc.isFeatured,
      doc.createdAt,
      doc.updatedAt,
      doc.linkCategory?.toString(),
      doc.description,
    );
  }

  create(userId: string, data: any) {
    return this.model.create({
      ...data,
      createdBy: userId,
    });
  }

  async find(filters?: any): Promise<UsefullLink[]> {
    const query: Record<string, unknown> = {};

    if (filters?.name) {
      query.name = { $regex: filters.name, $options: "i" };
    }
    const docs = await this.model.find(query);

    return docs.map((doc) => this.toDomain(doc));
  }

  async findOne(id: string): Promise<UsefullLink | null> {
    const doc = await this.model.findById(id);
    if (!doc) return null;
    return this.toDomain(doc);
  }

  async findByName(name: string): Promise<UsefullLink | null> {
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
