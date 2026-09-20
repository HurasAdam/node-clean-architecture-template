/**
 * @copyright 2026 Adam Huras
 * @license Apache-2.0
 */

import { IProductCategoryRepository } from "../../product-categories/domain/product-category.repository.interface";
import { IProductRepository } from "../../products/domain/product.repository.interface";
import { IArticleRepository } from "../domain/article.repository.interface";
import { CreateArticleDto } from "../dto/create-article.dto";

export class ArticleService {
  private articleRepository: IArticleRepository;
  private productRepository: IProductRepository;
  private productCategoryRepository: IProductCategoryRepository;
  constructor(
    articleRepository: IArticleRepository,
    productRepository: IProductRepository,
    productCategoryRepository: IProductCategoryRepository,
  ) {
    this.articleRepository = articleRepository;
    this.productRepository = productRepository;
    this.productCategoryRepository = productCategoryRepository;
  }

  create(currentUser: string, payload: CreateArticleDto) {
    this.articleRepository.create(currentUser, payload);
  }

  async find() {
    const articles = await this.articleRepository.find();

    const productIds = [...new Set(articles.map((article) => article.product))];
    const categoryIds = [
      ...new Set(articles.map((article) => article.category)),
    ];

    const [products, categories] = await Promise.all([
      this.productRepository.findByIds(productIds),
      this.productCategoryRepository.findByIds(categoryIds),
    ]);

    const productsMap = new Map(
      products.map((product) => [
        product.id,
        {
          id: product.id,
          name: product.name,
        },
      ]),
    );

    const categoriesMap = new Map(
      categories.map((category) => [
        category.id,
        {
          id: category.id,
          name: category.name,
        },
      ]),
    );

    return articles.map((article) => ({
      ...article,
      product: productsMap.get(article.product) ?? null,
      category: categoriesMap.get(article.category) ?? null,
    }));
  }

  findOne() {}

  updateOne() {}

  deleteOne() {}
}
