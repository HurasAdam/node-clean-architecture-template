/**
 * @copyright 2026 Adam Huras
 * @license Apache-2.0
 */

import { IArticleResponseVariantRepository } from "../../articleResponseVariants/domain/repository.interface";
import { IProductCategoryRepository } from "../../product-categories/domain/product-category.repository.interface";
import { IProductRepository } from "../../products/domain/product.repository.interface";
import { ITagRepository } from "../../tags/domain/tag.repository.interface";
import { IArticleRepository } from "../domain/article.repository.interface";
import { CreateArticleDto } from "../dto/create-article.dto";

export class ArticleService {
  private articleRepository: IArticleRepository;
  private articleResponseVariantRepository: IArticleResponseVariantRepository;
  private productRepository: IProductRepository;
  private productCategoryRepository: IProductCategoryRepository;
  private tagRepository: ITagRepository;
  constructor(
    articleRepository: IArticleRepository,
    articleResponseVariantRepository: IArticleResponseVariantRepository,
    productRepository: IProductRepository,
    productCategoryRepository: IProductCategoryRepository,
    tagRepository: ITagRepository,
  ) {
    this.articleRepository = articleRepository;
    this.articleResponseVariantRepository = articleResponseVariantRepository;
    this.productRepository = productRepository;
    this.productCategoryRepository = productCategoryRepository;
    this.tagRepository = tagRepository;
  }

  async create(currentUser: string, payload: CreateArticleDto) {
    const article = await this.articleRepository.create(currentUser, payload);
    if (payload.responseVariant) {
      await this.articleResponseVariantRepository.add(currentUser, {
        articleId: article.id,
        variantName: payload.responseVariant.variantName,
        variantContent: payload.responseVariant.variantContent,
      });
    }
  }

  async find() {
    const articles = await this.articleRepository.find();

    const productIds = [...new Set(articles.map((article) => article.product))];
    const categoryIds = [
      ...new Set(articles.map((article) => article.category)),
    ];

    const tagIds = [...new Set(articles.flatMap((article) => article.tags))];

    const [products, categories, tags] = await Promise.all([
      this.productRepository.findByIds(productIds),
      this.productCategoryRepository.findByIds(categoryIds),
      this.tagRepository.findByIds(tagIds),
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

    const tagsMap = new Map(
      tags.map((tag) => [
        tag.id,
        {
          id: tag.id,
          name: tag.name,
        },
      ]),
    );

    return articles.map((article) => ({
      ...article,
      product: productsMap.get(article.product) ?? null,
      category: categoriesMap.get(article.category) ?? null,
      tags: article.tags
        .map((tagId) => tagsMap.get(tagId))
        .filter((tag) => tag !== undefined),
    }));
  }

  async findOne(articleId: string) {
    const article = await this.articleRepository.findOne(articleId);

    if (!article) {
      return null;
    }

    const [product, category, tags, responseVariants] = await Promise.all([
      this.productRepository.findOne(article.product),
      this.productCategoryRepository.findOne(article.category),
      this.tagRepository.findByIds(article.tags),
      this.articleResponseVariantRepository.findByArticleId(article.id),
    ]);

    return {
      ...article,
      product: product
        ? {
            id: product.id,
            name: product.name,
          }
        : null,
      category: category
        ? {
            id: category.id,
            name: category.name,
          }
        : null,
      tags: tags.map((tag) => ({
        id: tag.id,
        name: tag.name,
      })),
      responseVariants: responseVariants,
    };
  }

  updateOne() {}

  deleteOne() {}
}
