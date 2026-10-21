/**
 * @copyright 2026 Adam Huras
 * @license Apache-2.0
 */

import {
  BAD_REQUEST,
  CONFLICT,
  FORBIDDEN,
  NOT_FOUND,
} from "../../../constants/http";
import appAssert from "../../../utils/appAssert";
import { IArticleResponseVariantRepository } from "../../articleResponseVariants/domain/repository.interface";
import { IProductCategoryRepository } from "../../product-categories/domain/product-category.repository.interface";
import { IProductRepository } from "../../products/domain/product.repository.interface";
import { ITagRepository } from "../../tags/domain/tag.repository.interface";
import { IUserRepository } from "../../users/domain/user.repository.interface";
import { IArticleRepository } from "../domain/article.repository.interface";
import { CreateArticleDto } from "../dto/create-article.dto";
import { RequestChangesDto } from "../dto/request-changes.dto";

export class ArticleService {
  private articleRepository: IArticleRepository;
  private articleResponseVariantRepository: IArticleResponseVariantRepository;
  private productRepository: IProductRepository;
  private productCategoryRepository: IProductCategoryRepository;
  private tagRepository: ITagRepository;
  private userRepository: IUserRepository;
  constructor(
    articleRepository: IArticleRepository,
    articleResponseVariantRepository: IArticleResponseVariantRepository,
    productRepository: IProductRepository,
    productCategoryRepository: IProductCategoryRepository,
    tagRepository: ITagRepository,
    userRepository: IUserRepository,
  ) {
    this.articleRepository = articleRepository;
    this.articleResponseVariantRepository = articleResponseVariantRepository;
    this.productRepository = productRepository;
    this.productCategoryRepository = productCategoryRepository;
    this.tagRepository = tagRepository;
    this.userRepository = userRepository;
  }

  async create(currentUser: string, payload: CreateArticleDto) {
    const article = await this.articleRepository.create(
      currentUser,
      payload,
      "DRAFT",
      "UNPUBLISHED",
    );
    if (payload.responseVariant) {
      await this.articleResponseVariantRepository.add(currentUser, {
        articleId: article.id,
        variantName: payload.responseVariant.variantName,
        variantContent: payload.responseVariant.variantContent,
      });
    }
  }

  async approveOne(articleId: string, currentUserId: string) {
    const article = await this.articleRepository.findOne(articleId);

    appAssert(article, NOT_FOUND, "Article not found");

    appAssert(
      article.reviewStatus === "DRAFT" &&
        article.publicationStatus === "UNPUBLISHED",
      CONFLICT,
      "Only unpublished draft articles can be approved",
    );

    const now = new Date();

    await this.articleRepository.approveOne(articleId, currentUserId, now);
  }

  async verifyOne(articleId: string, currentUserId: string) {
    const article = await this.articleRepository.findOne(articleId);

    appAssert(article, NOT_FOUND, "Article not found");

    appAssert(
      (article.reviewStatus === "PENDING_REVIEW" ||
        article.reviewStatus === "REQUIRES_REVERIFICATION") &&
        article.publicationStatus === "PUBLISHED",
      CONFLICT,
      "Only published articles requiring verification can be verified",
    );

    const now = new Date();

    return this.articleRepository.verifyOne(articleId, currentUserId, now);
  }

  async requestChanges(
    articleId: string,
    payload: RequestChangesDto,
    currentUserId: string,
  ) {
    const article = await this.articleRepository.findOne(articleId);

    appAssert(article, NOT_FOUND, "Article not found");

    appAssert(
      article.reviewStatus === "DRAFT" &&
        article.publicationStatus === "UNPUBLISHED",
      CONFLICT,
      "Changes can only be requested for unpublished draft articles",
    );

    const reviewNote = payload.reviewNote;

    console.log(reviewNote);

    appAssert(reviewNote.length > 0, BAD_REQUEST, "Review note is required");

    return this.articleRepository.requestChanges(
      articleId,
      currentUserId,
      article.createdBy,
      reviewNote,
    );
  }

  async submitForReview(articleId: string, currentUserId: string) {
    const article = await this.articleRepository.findOne(articleId);
    appAssert(article, NOT_FOUND, "Article not found");

    const isAuthor = article.createdBy === currentUserId;
    appAssert(
      isAuthor,
      FORBIDDEN,
      "Only the author can submit the article for review",
    );

    appAssert(
      article.reviewStatus === "CHANGES_REQUESTED",
      CONFLICT,
      "Only articles requiring changes can be submitted for review",
    );
    return await this.articleRepository.submitForReview(articleId);
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

    const [product, category, tags, responseVariants, author, verifier] =
      await Promise.all([
        this.productRepository.findOne(article.product),
        this.productCategoryRepository.findOne(article.category),
        this.tagRepository.findByIds(article.tags),
        this.articleResponseVariantRepository.findByArticleId(article.id),
        this.userRepository.findOneById(article.createdBy),
        article.verifiedBy
          ? this.userRepository.findOneById(article.verifiedBy)
          : null,
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
      author: author
        ? {
            id: author.id,
            firstName: author.name,
            lastName: author.surname,
          }
        : null,
      verifiedBy: verifier
        ? {
            id: verifier.id,
            name: verifier.name,
            surname: verifier.surname,
          }
        : null,
      responseVariants: responseVariants,
    };
  }

  updateOne() {}

  deleteOne() {}
}
