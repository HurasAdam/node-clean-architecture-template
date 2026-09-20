/**
 * @copyright 2026 Adam Huras
 * @license Apache-2.0
 */

import { CreateArticleDto } from "../dto/create-article.dto";
import { UpdateArticleDto } from "../dto/update-article.dto";
import { ArticleEntity } from "./entity";

export interface IArticleRepository {
  create(currentUser: string, data: CreateArticleDto): Promise<any>;
  find(): Promise<ArticleEntity[]>;
  findOne(id: string): Promise<ArticleEntity>;
  updateOne(id: string, data: UpdateArticleDto): Promise<ArticleEntity>;
  deleteOne(id: string): any;
}
