/**
 * @copyright 2026 Adam Huras
 * @license Apache-2.0
 */

import { Model } from "mongoose";
import { IArticleRepository } from "../../domain/article.repository.interface";
import { ArticleEntity } from "../../domain/entity";
import { CreateArticleDto } from "../../dto/create-article.dto";
import { UpdateArticleDto } from "../../dto/update-article.dto";
import { ArticleDocument } from "../article.model";

export class ArticleRepository implements IArticleRepository {
  private model;
  constructor(model: Model<ArticleDocument>) {
    this.model = model;
  }

  toDomain(doc: ArticleDocument) {
    return new ArticleEntity(
      doc._id.toString(),
      doc.title,
      doc.status,
      doc.internalNote,
      doc.importantMarker,
      doc.product.toString(),
      doc.category.toString(),
      doc.tags.map((tag) => tag.toString()),
    );
  }

  create(currentUser: string, data: CreateArticleDto) {
    return this.model.create({
      ...data,
      createdBy: currentUser,
    });
  }
  async find(): Promise<ArticleEntity[]> {
    const docs = await this.model.find();
    return docs.map((doc) => this.toDomain(doc));
  }

  async findOne(id: string) {
    const doc = await this.model.findById(id);
    if (!doc) return null;
    return this.toDomain(doc);
  }

  async updateOne(id: string, data: UpdateArticleDto) {
    const doc = await this.model.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true, runValidators: true },
    );

    if (!doc) return null;

    return this.toDomain(doc);
  }

  deleteOne(id: string) {
    return this.model.findByIdAndDelete(id);
  }
}
