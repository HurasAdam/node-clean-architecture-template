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
      doc.internalNote,
      doc.publicationStatus,
      doc.reviewStatus,
      doc.product.toString(),
      doc.category.toString(),
      doc.tags.map((tag) => tag.toString()),
      doc.importantMarker,
      doc.createdAt,
      doc.createdBy.toString(),
      doc.verifiedBy?.toString() ?? null,
      doc.lastVerifiedAt ?? null,
      doc.changesRequestedBy?.toString() ?? null,
      doc.changeRequestRecipient?.toString() ?? null,
      doc.changeRequestNote ?? null,
      doc?.lastUpdatedBy?.toString() ?? null,
      doc.followers.map((follower) => follower.toString()),
      doc.updatedAt,
    );
  }

  create(currentUser: string, data: CreateArticleDto) {
    return this.model.create({
      ...data,
      createdBy: currentUser,
    });
  }

  async approveOne(id: string, currentUserId: string, now: Date) {
    const doc = await this.model.findByIdAndUpdate(
      id,
      {
        $set: {
          reviewStatus: "APPROVED",
          publicationStatus: "PUBLISHED",
          verifiedBy: currentUserId,
          lastVerifiedAt: now,
          changesRequestedBy: null,
          changeRequestNote: null,
        },
      },
      { new: true, runValidators: true },
    );

    if (!doc) return null;

    return this.toDomain(doc);
  }

  async verifyOne(id: string, currentUserId: string, now: Date) {
    const doc = await this.model.findByIdAndUpdate(
      id,
      {
        $set: {
          reviewStatus: "APPROVED",
          verifiedBy: currentUserId,
          lastVerifiedAt: now,
          changesRequestedBy: null,
          changeRequestRecipient: null,
          changeRequestNote: null,
        },
      },
      { new: true, runValidators: true },
    );

    if (!doc) return null;

    return this.toDomain(doc);
  }

  async requestChanges(
    id: string,
    currentUserId: string,
    recipientId: string,
    note: string,
  ) {
    const doc = await this.model.findByIdAndUpdate(
      id,
      {
        $set: {
          reviewStatus: "CHANGES_REQUESTED",
          changesRequestedBy: currentUserId,
          changeRequestRecipient: recipientId,
          changeRequestNote: note,
        },
      },
      { new: true, runValidators: true },
    );

    if (!doc) return null;

    return this.toDomain(doc);
  }

  async submitForReview(id: string) {
    const doc = await this.model.findByIdAndUpdate(
      id,
      {
        $set: {
          reviewStatus: "DRAFT",
          changesRequestedBy: null,
          changeRequestRecipient: null,
          changeRequestNote: null,
        },
      },
      { new: true, runValidators: true },
    );

    if (!doc) return null;

    return this.toDomain(doc);
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
