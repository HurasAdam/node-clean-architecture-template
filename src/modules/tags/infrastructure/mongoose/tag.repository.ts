/**
 * @copyright 2026 Adam Huras
 * @license Apache-2.0
 */

import { Model } from "mongoose";
import { Tag } from "../../domain/tag.entity";
import { ITagRepository } from "../../domain/tag.repository.interface";
import { CreateTagDto } from "../../dto/create-tag.dto";
import { FindTagsQueryDto } from "../../dto/find-tags-query.dto";
import { UpdateTagDto } from "../../dto/update-tag.dto";
import { TagDocument } from "../tag.model";

export class TagRepository implements ITagRepository {
  private model;
  constructor(model: Model<TagDocument>) {
    this.model = model;
  }

  private toDomain(doc: any) {
    return new Tag(
      doc._id.toString(),
      doc.name,
      doc.createdBy,
      doc.createdAt,
      doc.updatedAt,
    );
  }

  async create(userId: string, data: CreateTagDto) {
    const tag = await this.model.create({
      ...data,
      createdBy: userId,
    });

    return this.toDomain(tag);
  }

  async find(filters: FindTagsQueryDto) {
    const query: Record<string, unknown> = {};

    if (filters?.name) {
      query.name = { $regex: filters.name, $options: "i" };
    }
    const docs = await this.model.find(query);
    return docs.map((doc) => this.toDomain(doc));
  }

  async findOne(id: string) {
    const doc = await this.model.findById(id);

    if (!doc) return null;

    return this.toDomain(doc);
  }

  async findByName(name: string) {
    const doc = await this.model.findOne({ name });

    if (!doc) return null;

    return this.toDomain(doc);
  }

  async findByIds(ids: string[]): Promise<Tag[]> {
    const docs = await this.model.find({
      _id: { $in: ids },
    });

    return docs.map((doc) => this.toDomain(doc));
  }

  async updateOne(id: string, data: UpdateTagDto) {
    const doc = await this.model.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true, runValidators: true },
    );

    if (!doc) return null;

    return this.toDomain(doc);
  }

  async deleteOne(id: string) {
    const doc = await this.model.findByIdAndDelete(id);

    if (!doc) return null;

    return this.toDomain(doc);
  }
}
