/**
 * @copyright 2026 Adam Huras
 * @license Apache-2.0
 */

import ArticleModel from "../../modules/articles/infrastructure/article.model";
import { ArticleRepository } from "../../modules/articles/infrastructure/mongoose/article.repository";
import { ProductCategoryRepository } from "../../modules/product-categories/infrastructure/mongoose/product-category.repository";
import ProductCategoryModel from "../../modules/product-categories/infrastructure/product-category.model";
import { ProductTopicRepository } from "../../modules/product-topics/infrastructure/mongoose/product-topic.repository";
import ProductTopicModel from "../../modules/product-topics/infrastructure/product-topic.model";
import { ProductRepository } from "../../modules/products/infrastructure/mongoose/product.repository";
import ProductModel from "../../modules/products/infrastructure/product.model";
import RoleModel from "../../modules/roles/infrastructure/mongoose/role.model";
import { RoleRepository } from "../../modules/roles/infrastructure/mongoose/role.repository";
import { SessionRepository } from "../../modules/sessions/infrastructure/mongoose/session.repository";
import SessionModel from "../../modules/sessions/infrastructure/session.model";
import { TagRepository } from "../../modules/tags/infrastructure/mongoose/tag.repository";
import TagModel from "../../modules/tags/infrastructure/tag.model";
import { UsefulLinkCategoryModel } from "../../modules/useful-link-categories/infrastructure/mongoose/usefullLinkCategory.model";
import { UsefullLinkCategoryRepository } from "../../modules/useful-link-categories/infrastructure/mongoose/usefullLinkCategory.repository";
import UsefullLinkModel from "../../modules/useful-links/infrastructure/mongoose/usefullLink.model";
import { UsefullLinkRepository } from "../../modules/useful-links/infrastructure/mongoose/usefullLink.repository";
import UserModel from "../../modules/users/infrastructure/mongoose/user.model";
import { UserRepository } from "../../modules/users/infrastructure/mongoose/user.repository";
import WorkspaceModel from "../../modules/workspace/infrastructure/models/mongo";
import { WorkspaceRepository } from "../../modules/workspace/infrastructure/repositories/mongo";
import { IRepositoryProvider } from "../types/  repository-provider.type";

export function createMongoRepositoryProvider(): IRepositoryProvider {
  return {
    userRepository: new UserRepository(UserModel),
    sessionRepository: new SessionRepository(SessionModel),
    roleRepository: new RoleRepository(RoleModel),
    articleRepository: new ArticleRepository(ArticleModel),
    productRepository: new ProductRepository(ProductModel),
    productCategoryRepository: new ProductCategoryRepository(
      ProductCategoryModel,
    ),
    productTopicRepository: new ProductTopicRepository(ProductTopicModel),
    tagRepository: new TagRepository(TagModel),
    usefullLinkRepository: new UsefullLinkRepository(UsefullLinkModel),
    usefullLinkCategoryRepository: new UsefullLinkCategoryRepository(
      UsefulLinkCategoryModel,
    ),
    workspaceRepository: new WorkspaceRepository(WorkspaceModel),
  };
}
