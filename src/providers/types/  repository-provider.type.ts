import { IArticleRepository } from "../../modules/articles/domain/article.repository.interface";
import { IProductCategoryRepository } from "../../modules/product-categories/domain/product-category.repository.interface";
import { IProductTopicRepository } from "../../modules/product-topics/domain/product-topic.repository.interface";
import { IProductRepository } from "../../modules/products/domain/product.repository.interface";
import { IRoleRepository } from "../../modules/roles/domain/role.repository.interface";
import { ISessionRepository } from "../../modules/sessions/domain/session.repository.interface";
import { ITagRepository } from "../../modules/tags/domain/tag.repository.interface";
import { IUsefullLinkCategoryRepository } from "../../modules/useful-link-categories/domain/usefullLinkCategory.repository.interface";
import { IUsefullLinkRepository } from "../../modules/useful-links/domain/usefullLink.repository.interface";
import { IUserRepository } from "../../modules/users/domain/user.repository.interface";
import { IWorkspaceRepository } from "../../modules/workspace/domain/repository.interface";

export interface IRepositoryProvider {
  userRepository: IUserRepository;
  sessionRepository: ISessionRepository;
  roleRepository: IRoleRepository;
  articleRepository: IArticleRepository;
  productRepository: IProductRepository;
  productCategoryRepository: IProductCategoryRepository;
  productTopicRepository: IProductTopicRepository;
  tagRepository: ITagRepository;
  usefullLinkRepository: IUsefullLinkRepository;
  usefullLinkCategoryRepository: IUsefullLinkCategoryRepository;
  workspaceRepository: IWorkspaceRepository;
}
