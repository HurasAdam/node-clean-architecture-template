/**
 * @copyright 2026 Adam Huras
 * @license Apache-2.0
 */

import { IArticleRepository } from "../domain/article.repository.interface";
import { CreateArticleDto } from "../dto/create-article.dto";

export class ArticleService {
  private articleRepository: IArticleRepository;
  constructor(articleRepository: IArticleRepository) {
    this.articleRepository = articleRepository;
  }

  create(userId: string, payload: CreateArticleDto) {
    this.articleRepository.create(userId, payload);
  }

  find() {}

  findOne() {}

  updateOne() {}

  deleteOne() {}
}
