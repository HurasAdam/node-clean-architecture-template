/**
 * @copyright 2026 Adam Huras
 * @license Apache-2.0
 */

import { CreateArticleDto } from "../dto/create-article.dto";
import { UpdateArticleDto } from "../dto/update-article.dto";
import {
  ArticleEntity,
  ArticlePublicationStatus,
  ArticleReviewStatus,
} from "./entity";

export interface IArticleRepository {
  create(
    currentUser: string,
    data: CreateArticleDto,
    reviewStatus: ArticleReviewStatus,
    publicationStatus: ArticlePublicationStatus,
  ): Promise<any>;

  approveOne(
    id: string,
    currentUserId: string,
    now: Date,
  ): Promise<ArticleEntity | null>;
  verifyOne(
    id: string,
    currentUserId: string,
    now: Date,
  ): Promise<ArticleEntity | null>;
  requestChanges(
    id: string,
    currentUserId: string,
    recipientId: string,
    note: string,
  ): Promise<ArticleEntity | null>;

  submitForReview(id: string): Promise<ArticleEntity | null>;
  find(): Promise<ArticleEntity[]>;
  findOne(id: string): Promise<ArticleEntity | null>;
  updateOne(id: string, data: UpdateArticleDto): Promise<ArticleEntity | null>;
  deleteOne(id: string): any;
}
