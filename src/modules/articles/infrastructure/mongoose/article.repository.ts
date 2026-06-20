/**
 * @copyright 2026 Adam Huras
 * @license Apache-2.0
 */

import { Model } from "mongoose";
import { IArticleRepository } from "../../domain/article.repository.interface";
import { CreateArticleDto } from "../../dto/create-article.dto";
import { UpdateArticleDto } from "../../dto/update-article.dto";
import { ArticleDocument } from "../article.model";

export class ArticleRepository implements IArticleRepository {
  private model;
  constructor(model: Model<ArticleDocument>) {
    this.model = model;
  }

  create(userId: string, data: CreateArticleDto) {
    return this.model.create(data);
  }

  find() {
    return this.model.find();
  }

  findOne(id: string) {
    return this.model.findById(id);
  }

  async updateOne(id: string, data: UpdateArticleDto) {
    const doc = await this.model.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true, runValidators: true },
    );

    if (!doc) return null;

    return doc;
  }

  deleteOne(id: string) {
    return this.model.findByIdAndDelete(id);
  }
}
