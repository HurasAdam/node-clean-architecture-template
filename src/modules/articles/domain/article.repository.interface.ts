/**
 * @copyright 2026 Adam Huras
 * @license Apache-2.0
 */

import { CreateArticleDto } from "../dto/create-article.dto";
import { UpdateArticleDto } from "../dto/update-article.dto";

export interface IArticleRepository {
  create(userId: string, data: CreateArticleDto): Promise<any>;
  find(): Promise<any>;
  findOne(id: string): Promise<any>;
  updateOne(id: string, data: UpdateArticleDto): Promise<any>;
  deleteOne(id: string): any;
}
