/**
 * @copyright 2026 Adam Huras
 * @license Apache-2.0
 */

import ArticleModel from "../../modules/articles/infrastructure/article.model";
import { ArticleRepository } from "../../modules/articles/infrastructure/mongoose/article.repository";
import { ContactRecordModel } from "../../modules/contactRegistry/infrastructure/models/mongo";
import { ContactRegistryRepository } from "../../modules/contactRegistry/infrastructure/repositories/mongo";
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
import { WorkspaceArticleResponseVariantModel } from "../../modules/workspace-article-response-variants/infrastructure/models/mongo";
import { WorkspaceArticleResponseVariantRepository } from "../../modules/workspace-article-response-variants/infrastructure/repositories/mongo";
import { WorkspaceArticleModel } from "../../modules/workspace-articles/infrastructure/models/mongo";
import { WorkspaceArticleRepository } from "../../modules/workspace-articles/infrastructure/repositories/mongo";
import { WorkspaceFolderModel } from "../../modules/workspace-folders/infrastructure/models/mongo";
import { workspaceFolderRepository } from "../../modules/workspace-folders/infrastructure/repositories/mongo";
import WorkspaceMemberModel from "../../modules/workspace-members/infrastructure/models/mongo";
import { workspaceMemberRepository } from "../../modules/workspace-members/infrastructure/repositories/mongo";
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
    contactRegistryRepository: new ContactRegistryRepository(
      ContactRecordModel,
    ),
    tagRepository: new TagRepository(TagModel),
    usefullLinkRepository: new UsefullLinkRepository(UsefullLinkModel),
    usefullLinkCategoryRepository: new UsefullLinkCategoryRepository(
      UsefulLinkCategoryModel,
    ),
    workspaceRepository: new WorkspaceRepository(WorkspaceModel),
    workspaceMemberRepository: new workspaceMemberRepository(
      WorkspaceMemberModel,
    ),

    workspaceFolderRepository: new workspaceFolderRepository(
      WorkspaceFolderModel,
    ),

    workspaceArticleRepository: new WorkspaceArticleRepository(
      WorkspaceArticleModel,
    ),

    workspaceArticleResponseVariantRepository:
      new WorkspaceArticleResponseVariantRepository(
        WorkspaceArticleResponseVariantModel,
      ),
  };
}
