/**
 * @copyright 2026 Adam Huras
 * @license Apache-2.0
 */

import { Model } from "mongoose";
import { IArticleRepository } from "../../domain/article.repository.interface";
import { ArticleEntity } from "../../domain/entity";
import { CreateArticleDto } from "../../dto/create-article.dto";
import { FindArticleDto } from "../../dto/find-article.dto";
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

  async find(
    filters: FindArticleDto,
    matchingArticleIds: string[] = [],
  ): Promise<{
    articles: ArticleEntity[];
    total: number;
  }> {
    const query: Record<string, unknown> = {};

    if (filters.search) {
      const escapedSearch = filters.search.replace(
        /[.*+?^${}()|[\]\\]/g,
        "\\$&",
      );

      const regex = {
        $regex: escapedSearch,
        $options: "i",
      };

      query.$or = [{ title: regex }, { _id: { $in: matchingArticleIds } }];
    }

    if (filters.product) {
      query.product = filters.product;
    }

    if (filters.category) {
      query.category = filters.category;
    }

    const skip = (filters.page - 1) * filters.limit;

    const [docs, total] = await Promise.all([
      this.model
        .find(query)
        .sort({ updatedAt: -1 })
        .skip(skip)
        .limit(filters.limit),

      this.model.countDocuments(query),
    ]);

    return {
      articles: docs.map((doc) => this.toDomain(doc)),
      total,
    };
  }

  async findOne(id: string) {
    const doc = await this.model.findById(id);
    if (!doc) return null;
    return this.toDomain(doc);
  }

  async findByTitle(title: string): Promise<ArticleEntity | null> {
    const escapedTitle = title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    const doc = await this.model.findOne({
      title: { $regex: `^${escapedTitle}$`, $options: "i" },
    });

    return doc ? this.toDomain(doc) : null;
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

  async updateTitle(
    articleId: string,
    currentUserId: string,
    title: string,
  ): Promise<ArticleEntity | null> {
    const doc = await this.model.findByIdAndUpdate(
      articleId,
      {
        $set: {
          title,
          lastUpdatedBy: currentUserId,
          updatedAt: new Date(),
        },
      },
      { new: true, runValidators: true },
    );

    return doc ? this.toDomain(doc) : null;
  }

  async updateInternalNote(
    articleId: string,
    currentUserId: string,
    internalNote: string,
  ): Promise<ArticleEntity | null> {
    const doc = await this.model.findByIdAndUpdate(
      articleId,
      {
        $set: {
          internalNote,
          lastUpdatedBy: currentUserId,
          updatedAt: new Date(),
        },
      },
      { new: true, runValidators: true },
    );

    return doc ? this.toDomain(doc) : null;
  }

  async updateProductCategory(
    articleId: string,
    currentUserId: string,
    product: string,
    category: string,
  ): Promise<ArticleEntity | null> {
    const doc = await this.model.findByIdAndUpdate(
      articleId,
      {
        $set: {
          product,
          category,
          lastUpdatedBy: currentUserId,
          updatedAt: new Date(),
        },
      },
      {
        new: true,
        runValidators: true,
      },
    );

    return doc ? this.toDomain(doc) : null;
  }

  async updateTags(
    articleId: string,
    currentUserId: string,
    tags: string[],
  ): Promise<ArticleEntity | null> {
    const doc = await this.model.findByIdAndUpdate(
      articleId,
      {
        $set: {
          tags,
          lastUpdatedBy: currentUserId,
          updatedAt: new Date(),
        },
      },
      {
        new: true,
        runValidators: true,
      },
    );

    return doc ? this.toDomain(doc) : null;
  }

  deleteOne(id: string) {
    return this.model.findByIdAndDelete(id);
  }
}
