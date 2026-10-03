/**
 * @copyright 2026 Adam Huras
 * @license Apache-2.0
 */

import { IProductCategoryRepository } from "../product-categories/domain/product-category.repository.interface";
import { IProductRepository } from "../products/domain/product.repository.interface";
import { ITagRepository } from "../tags/domain/tag.repository.interface";
import { ArticleService } from "./application/article.service";
import { IArticleRepository } from "./domain/article.repository.interface";
import { ArticleController } from "./presentation/article.controller";

interface deps {
  articleRepository: IArticleRepository;
  productRepository: IProductRepository;
  productCategoryRepository: IProductCategoryRepository;
  tagRepository: ITagRepository;
}

export function createArticleModule(deps: deps) {
  const articleService = new ArticleService(
    deps.articleRepository,
    deps.productRepository,
    deps.productCategoryRepository,
    deps.tagRepository,
  );
  const controller = new ArticleController(articleService);

  return {
    controller,
  };
}
