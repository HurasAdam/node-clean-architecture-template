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
import { IArticleAuditLogRepository } from "../../article-audit-log/domain/repository.interface";
import { IArticleResponseVariantRepository } from "../../articleResponseVariants/domain/repository.interface";
import { IProductCategoryRepository } from "../../product-categories/domain/product-category.repository.interface";
import { IProductRepository } from "../../products/domain/product.repository.interface";
import { ITagRepository } from "../../tags/domain/tag.repository.interface";
import { IUserRepository } from "../../users/domain/user.repository.interface";
import { IArticleRepository } from "../domain/article.repository.interface";
import { CreateArticleDto } from "../dto/create-article.dto";
import { RequestChangesDto } from "../dto/request-changes.dto";
import { UpdateInternalNoteDto } from "../dto/update-internalNote.dto";
import { UpdateProductAndCategoryDto } from "../dto/update-productAndCategory.dto";
import { UpdateArticleTagsDto } from "../dto/update-tags.dto";
import { UpdateArticleTitleDto } from "../dto/update-title.dto";

export class ArticleService {
  private articleRepository: IArticleRepository;
  private articleResponseVariantRepository: IArticleResponseVariantRepository;
  private articleAuditLogRepository: IArticleAuditLogRepository;
  private productRepository: IProductRepository;
  private productCategoryRepository: IProductCategoryRepository;
  private tagRepository: ITagRepository;
  private userRepository: IUserRepository;
  constructor(
    articleRepository: IArticleRepository,
    articleResponseVariantRepository: IArticleResponseVariantRepository,
    articleAuditLogRepository: IArticleAuditLogRepository,
    productRepository: IProductRepository,
    productCategoryRepository: IProductCategoryRepository,
    tagRepository: ITagRepository,
    userRepository: IUserRepository,
  ) {
    this.articleRepository = articleRepository;
    this.articleResponseVariantRepository = articleResponseVariantRepository;
    this.articleAuditLogRepository = articleAuditLogRepository;
    this.productRepository = productRepository;
    this.productCategoryRepository = productCategoryRepository;
    this.tagRepository = tagRepository;
    this.userRepository = userRepository;
  }

  async create(currentUser: string, payload: CreateArticleDto) {
    const [author, product, category, tags] = await Promise.all([
      this.userRepository.findOneById(currentUser),
      this.productRepository.findOne(payload.product),
      this.productCategoryRepository.findOne(payload.category),
      this.tagRepository.findByIds(payload.tags),
    ]);

    appAssert(author, NOT_FOUND, "User not found");
    appAssert(product, NOT_FOUND, "Product not found");
    appAssert(category, NOT_FOUND, "Category not found");

    appAssert(
      category.product === payload.product,
      BAD_REQUEST,
      "The selected category does not belong to the selected product",
    );

    appAssert(
      tags.length === payload.tags.length,
      NOT_FOUND,
      "One or more tags were not found",
    );

    const article = await this.articleRepository.create(
      currentUser,
      payload,
      "DRAFT",
      "UNPUBLISHED",
    );

    const responseVariant = payload.responseVariant
      ? await this.articleResponseVariantRepository.add(currentUser, {
          articleId: article.id,
          variantName: payload.responseVariant.variantName,
          variantContent: payload.responseVariant.variantContent,
        })
      : null;

    await this.articleAuditLogRepository.add({
      articleId: article.id,
      eventType: "ARTICLE_CREATED",
      actorId: author.id,
      actorName: author.name,
      actorSurname: author.surname,
      actorEmail: author.email,
      changes: [
        {
          field: "title",
          before: null,
          after: payload.title,
        },
        {
          field: "internalNote",
          before: null,
          after: payload.internalNote,
        },
        {
          field: "product",
          before: null,
          after: product.name,
        },
        {
          field: "category",
          before: null,
          after: category.name,
        },
        {
          field: "tags",
          before: null,
          after: tags.map((tag) => tag.name),
        },
        ...(responseVariant
          ? [
              {
                field: "responseVariant",
                before: null,
                after: {
                  id: responseVariant.id,
                  variantName: responseVariant.variantName,
                  variantContent: responseVariant.variantContent,
                },
              },
            ]
          : []),
      ],
    });

    return article;
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

    const approver = await this.userRepository.findOneById(currentUserId);

    appAssert(approver, NOT_FOUND, "User not found");

    const now = new Date();

    const updatedArticle = await this.articleRepository.approveOne(
      articleId,
      currentUserId,
      now,
    );

    appAssert(updatedArticle, NOT_FOUND, "Article not found");

    const actor = {
      actorId: approver.id,
      actorName: approver.name,
      actorSurname: approver.surname,
      actorEmail: approver.email,
    };

    await this.articleAuditLogRepository.add({
      articleId: article.id,
      eventType: "ARTICLE_PUBLISHED",
      ...actor,
      changes: [
        {
          field: "publicationStatus",
          before: article.publicationStatus,
          after: updatedArticle.publicationStatus,
        },
      ],
    });

    await this.articleAuditLogRepository.add({
      articleId: article.id,
      eventType: "ARTICLE_VERIFIED",
      ...actor,
      changes: [
        {
          field: "reviewStatus",
          before: article.reviewStatus,
          after: updatedArticle.reviewStatus,
        },
        {
          field: "verifiedBy",
          before: null,
          after: {
            id: approver.id,
            name: approver.name,
            surname: approver.surname,
            email: approver.email,
          },
        },
        {
          field: "lastVerifiedAt",
          before: article.lastVerifiedAt,
          after: updatedArticle.lastVerifiedAt,
        },
      ],
    });

    return updatedArticle;
  }

  async verifyOne(articleId: string, currentUserId: string) {
    const article = await this.articleRepository.findOne(articleId);

    appAssert(article, NOT_FOUND, "Article not found");

    appAssert(
      article.publicationStatus === "PUBLISHED",
      CONFLICT,
      "Only published articles can be verified",
    );

    const isEditedArticle = article.reviewStatus === "PENDING_REVIEW";
    const isPeriodicReverification = article.requiresReverification();

    appAssert(
      isEditedArticle || isPeriodicReverification,
      CONFLICT,
      "The article does not require verification",
    );

    const [verifier, previousVerifier] = await Promise.all([
      this.userRepository.findOneById(currentUserId),
      article.verifiedBy
        ? this.userRepository.findOneById(article.verifiedBy)
        : null,
    ]);

    appAssert(verifier, NOT_FOUND, "User not found");

    const now = new Date();

    const updatedArticle = await this.articleRepository.verifyOne(
      articleId,
      currentUserId,
      now,
    );

    appAssert(updatedArticle, NOT_FOUND, "Article not found");

    await this.articleAuditLogRepository.add({
      articleId: article.id,
      eventType: "ARTICLE_VERIFIED",
      actorId: verifier.id,
      actorName: verifier.name,
      actorSurname: verifier.surname,
      actorEmail: verifier.email,
      changes: [
        {
          field: "reviewStatus",
          before: article.reviewStatus,
          after: updatedArticle.reviewStatus,
        },
        {
          field: "verifiedBy",
          before: previousVerifier
            ? {
                id: previousVerifier.id,
                name: previousVerifier.name,
                surname: previousVerifier.surname,
                email: previousVerifier.email,
              }
            : null,
          after: {
            id: verifier.id,
            name: verifier.name,
            surname: verifier.surname,
            email: verifier.email,
          },
        },
        {
          field: "lastVerifiedAt",
          before: article.lastVerifiedAt,
          after: updatedArticle.lastVerifiedAt,
        },
      ],
    });

    return updatedArticle;
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

  async updateTitle(
    articleId: string,
    currentUserId: string,
    payload: UpdateArticleTitleDto,
  ) {
    const article = await this.articleRepository.findOne(articleId);

    appAssert(article, NOT_FOUND, "Article not found");

    const title = payload.title.trim();

    appAssert(title.length > 0, BAD_REQUEST, "Article title is required");

    appAssert(
      article.title !== title,
      CONFLICT,
      "The article already has this title",
    );

    const existingArticle = await this.articleRepository.findByTitle(title);

    appAssert(
      !existingArticle || existingArticle.id === articleId,
      CONFLICT,
      "An article with this title already exists",
    );

    const actor = await this.userRepository.findOneById(currentUserId);

    appAssert(actor, NOT_FOUND, "User not found");

    const updatedArticle = await this.articleRepository.updateTitle(
      articleId,
      currentUserId,
      title,
    );

    appAssert(updatedArticle, NOT_FOUND, "Article not found");

    await this.articleAuditLogRepository.add({
      articleId,
      eventType: "ARTICLE_TITLE_UPDATED",
      actorId: actor.id,
      actorName: actor.name,
      actorSurname: actor.surname,
      actorEmail: actor.email,
      changes: [
        {
          field: "title",
          before: article.title,
          after: updatedArticle.title,
        },
      ],
    });

    return updatedArticle;
  }
  async updateInternalNote(
    articleId: string,
    currentUserId: string,
    payload: UpdateInternalNoteDto,
  ) {
    const article = await this.articleRepository.findOne(articleId);

    appAssert(article, NOT_FOUND, "Article not found");

    const internalNote = payload.internalNote.trim();

    appAssert(
      internalNote.length > 0,
      BAD_REQUEST,
      "Internal note is required",
    );

    appAssert(
      article.internalNote !== internalNote,
      CONFLICT,
      "The article already has this internal note",
    );

    const actor = await this.userRepository.findOneById(currentUserId);

    appAssert(actor, NOT_FOUND, "User not found");

    const updatedArticle = await this.articleRepository.updateInternalNote(
      articleId,
      currentUserId,
      internalNote,
    );

    appAssert(updatedArticle, NOT_FOUND, "Article not found");

    await this.articleAuditLogRepository.add({
      articleId,
      eventType: "ARTICLE_INTERNAL_NOTE_UPDATED",
      actorId: actor.id,
      actorName: actor.name,
      actorSurname: actor.surname,
      actorEmail: actor.email,
      changes: [
        {
          field: "internalNote",
          before: article.internalNote,
          after: updatedArticle.internalNote,
        },
      ],
    });

    return updatedArticle;
  }

  async updateProductCategory(
    articleId: string,
    currentUserId: string,
    payload: UpdateProductAndCategoryDto,
  ) {
    const article = await this.articleRepository.findOne(articleId);

    appAssert(article, NOT_FOUND, "Article not found");

    const { product, category } = payload;

    const [
      existingProduct,
      existingCategory,
      previousProduct,
      previousCategory,
      actor,
    ] = await Promise.all([
      this.productRepository.findOne(product),
      this.productCategoryRepository.findOne(category),
      this.productRepository.findOne(article.product),
      this.productCategoryRepository.findOne(article.category),
      this.userRepository.findOneById(currentUserId),
    ]);

    appAssert(existingProduct, NOT_FOUND, "Product not found");
    appAssert(existingCategory, NOT_FOUND, "Category not found");
    appAssert(previousProduct, NOT_FOUND, "Previous product not found");
    appAssert(previousCategory, NOT_FOUND, "Previous category not found");
    appAssert(actor, NOT_FOUND, "User not found");

    appAssert(
      existingCategory.product === product,
      BAD_REQUEST,
      "The selected category does not belong to the selected product",
    );

    const isProductChanged = article.product !== product;
    const isCategoryChanged = article.category !== category;

    appAssert(
      isProductChanged || isCategoryChanged,
      CONFLICT,
      "The article already has this product and category",
    );

    const updatedArticle = await this.articleRepository.updateProductCategory(
      articleId,
      currentUserId,
      product,
      category,
    );

    appAssert(updatedArticle, NOT_FOUND, "Article not found");

    const actorData = {
      actorId: actor.id,
      actorName: actor.name,
      actorSurname: actor.surname,
      actorEmail: actor.email,
    };

    if (isProductChanged) {
      await this.articleAuditLogRepository.add({
        articleId,
        eventType: "ARTICLE_PRODUCT_UPDATED",
        ...actorData,
        changes: [
          {
            field: "product",
            before: previousProduct.name,
            after: existingProduct.name,
          },
        ],
      });
    }

    if (isCategoryChanged) {
      await this.articleAuditLogRepository.add({
        articleId,
        eventType: "ARTICLE_CATEGORY_UPDATED",
        ...actorData,
        changes: [
          {
            field: "category",
            before: previousCategory.name,
            after: existingCategory.name,
          },
        ],
      });
    }

    return updatedArticle;
  }

  async updateTags(
    articleId: string,
    currentUserId: string,
    payload: UpdateArticleTagsDto,
  ) {
    const article = await this.articleRepository.findOne(articleId);

    appAssert(article, NOT_FOUND, "Article not found");

    const tags = [...new Set(payload.tags)];

    appAssert(tags.length > 0, BAD_REQUEST, "At least one tag is required");

    const existingTags = await this.tagRepository.findByIds(tags);

    appAssert(
      existingTags.length === tags.length,
      NOT_FOUND,
      "One or more tags were not found",
    );

    appAssert(
      tags.length !== article.tags.length ||
        !tags.every((tag) => article.tags.includes(tag)),
      CONFLICT,
      "The article already has these tags",
    );

    return this.articleRepository.updateTags(articleId, currentUserId, tags);
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
      requiresReverification: article.requiresReverification(),
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
      requiresReverification: article.requiresReverification(),
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
